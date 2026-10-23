// Lanzador de la Biblioteca de EDO: lleva la web dentro, la sirve en local y abre el navegador.
//
// Un doble clic arranca este programa en modo «lanzador»: si ya hay un servidor de esta misma
// versión escuchando, solo abre el navegador; si no, se relanza a sí mismo en modo «servidor»
// (desligado, sin ventana), espera a que responda, abre el navegador y termina. Así cada doble
// clic funciona aunque el sistema crea que la aplicación ya está abierta (macOS).
//
// El servidor se apaga solo unos minutos después de cerrar la última pestaña: cada página
// servida lleva un latido que lo mantiene vivo.
package main

import (
	"embed"
	"fmt"
	"io"
	"io/fs"
	"net"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"sync/atomic"
	"time"
)

//go:embed all:sitio
var empaquetado embed.FS

// Version se fija al compilar: -ldflags "-X main.Version=1.0".
var Version = "dev"

const (
	primerPuerto = 8780 // fijo a propósito: el progreso vive en localStorage, que depende del puerto
	ultimoPuerto = 8829
	rutaQuien    = "/__matcom_edo"
	rutaLatido   = "/__latido"
	rutaSalir    = "/__salir"
	gracia       = 3 * time.Minute // sin ninguna página abierta todavía
	silencio     = 6 * time.Minute // sin latidos (las pestañas ocultas laten como mucho una vez por minuto)
)

func identidad() string { return "MatCom_EDO " + Version }

func main() {
	if len(os.Args) == 3 && os.Args[1] == "--servir" {
		puerto, err := strconv.Atoi(os.Args[2])
		if err != nil {
			os.Exit(2)
		}
		servir(puerto)
		return
	}
	if err := lanzar(); err != nil {
		avisar("No se pudo abrir la Biblioteca de EDO:\n\n" + err.Error())
		os.Exit(1)
	}
}

// ── lanzador ───────────────────────────────────────────────────────────────

func lanzar() error {
	cliente := &http.Client{Timeout: 700 * time.Millisecond}
	for p := primerPuerto; p <= ultimoPuerto; p++ {
		quien := preguntar(cliente, p)
		switch {
		case quien == identidad():
			return abrirNavegador(url(p))
		case strings.HasPrefix(quien, "MatCom_EDO "):
			// otra versión ocupa el puerto: se le pide que se vaya para heredar su puerto (y el progreso)
			cliente.Get(fmt.Sprintf("http://127.0.0.1:%d%s", p, rutaSalir))
			for i := 0; i < 20 && !libre(p); i++ {
				time.Sleep(100 * time.Millisecond)
			}
			if libre(p) {
				return arrancar(cliente, p)
			}
		case quien == "" && libre(p):
			return arrancar(cliente, p)
		}
	}
	return fmt.Errorf("todos los puertos entre %d y %d están ocupados", primerPuerto, ultimoPuerto)
}

func arrancar(cliente *http.Client, p int) error {
	yo, err := os.Executable()
	if err != nil {
		return err
	}
	cmd := exec.Command(yo, "--servir", strconv.Itoa(p))
	desligar(cmd)
	if err := cmd.Start(); err != nil {
		return err
	}
	cmd.Process.Release()
	for i := 0; i < 100; i++ {
		if preguntar(cliente, p) == identidad() {
			return abrirNavegador(url(p))
		}
		time.Sleep(100 * time.Millisecond)
	}
	return fmt.Errorf("el servidor local no respondió en el puerto %d", p)
}

func preguntar(c *http.Client, p int) string {
	r, err := c.Get(fmt.Sprintf("http://127.0.0.1:%d%s", p, rutaQuien))
	if err != nil {
		return ""
	}
	defer r.Body.Close()
	b, _ := io.ReadAll(io.LimitReader(r.Body, 200))
	return string(b)
}

func libre(p int) bool {
	l, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", p))
	if err != nil {
		return false
	}
	l.Close()
	return true
}

func url(p int) string { return fmt.Sprintf("http://127.0.0.1:%d/", p) }

// ── servidor ───────────────────────────────────────────────────────────────

const latido = `<script>(()=>{const l=()=>fetch('` + rutaLatido + `',{cache:'no-store'}).catch(()=>{});` +
	`l();setInterval(l,20000);document.addEventListener('visibilitychange',l);})();</script>`

func servir(puerto int) {
	sitio, _ := fs.Sub(empaquetado, "sitio")
	archivos := http.FileServer(http.FS(sitio))

	var ultimo atomic.Int64
	var visto atomic.Bool
	ultimo.Store(time.Now().UnixNano())

	mux := http.NewServeMux()
	mux.HandleFunc(rutaQuien, func(w http.ResponseWriter, _ *http.Request) { io.WriteString(w, identidad()) })
	mux.HandleFunc(rutaLatido, func(w http.ResponseWriter, _ *http.Request) {
		visto.Store(true)
		ultimo.Store(time.Now().UnixNano())
		w.WriteHeader(http.StatusNoContent)
	})
	mux.HandleFunc(rutaSalir, func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusNoContent)
		go func() { time.Sleep(100 * time.Millisecond); os.Exit(0) }()
	})
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "no-store")
		ruta := strings.TrimPrefix(r.URL.Path, "/")
		if ruta == "" {
			ruta = "index.html"
		}
		if strings.HasSuffix(ruta, ".html") {
			if b, err := fs.ReadFile(sitio, ruta); err == nil {
				w.Header().Set("Content-Type", "text/html; charset=utf-8")
				html := strings.Replace(string(b), "</body>", latido+"</body>", 1)
				io.WriteString(w, html)
				return
			}
		}
		if strings.HasSuffix(ruta, ".js") || strings.HasSuffix(ruta, ".mjs") {
			w.Header().Set("Content-Type", "text/javascript; charset=utf-8")
		}
		archivos.ServeHTTP(w, r)
	})

	go func() {
		for range time.Tick(15 * time.Second) {
			quieto := time.Since(time.Unix(0, ultimo.Load()))
			if (visto.Load() && quieto > silencio) || (!visto.Load() && quieto > gracia) {
				os.Exit(0)
			}
		}
	}()

	l, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", puerto))
	if err != nil {
		os.Exit(1)
	}
	http.Serve(l, mux)
}
