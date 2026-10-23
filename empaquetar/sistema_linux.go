package main

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
	"syscall"
	"time"
)

func desligar(cmd *exec.Cmd) { cmd.SysProcAttr = &syscall.SysProcAttr{Setsid: true} }

// Cada distro y cada escritorio abre las URL a su manera: se prueban en orden, del más
// estándar (xdg-open, freedesktop.org) a los navegadores concretos.
func abrirNavegador(u string) error {
	var candidatos [][]string
	for _, b := range strings.Split(os.Getenv("BROWSER"), ":") {
		if b = strings.TrimSpace(b); b != "" {
			candidatos = append(candidatos, strings.Fields(b))
		}
	}
	candidatos = append(candidatos,
		[]string{"xdg-open"}, []string{"gio", "open"}, []string{"kde-open"}, []string{"kde-open5"},
		[]string{"exo-open", "--launch", "WebBrowser"}, []string{"gnome-open"}, []string{"sensible-browser"},
		[]string{"x-www-browser"}, []string{"firefox"}, []string{"librewolf"}, []string{"chromium"},
		[]string{"chromium-browser"}, []string{"google-chrome"}, []string{"google-chrome-stable"},
		[]string{"brave-browser"}, []string{"brave"}, []string{"microsoft-edge"}, []string{"vivaldi"},
		[]string{"opera"}, []string{"epiphany"}, []string{"falkon"}, []string{"konqueror"},
		[]string{"flatpak", "run", "org.mozilla.firefox"}, []string{"flatpak", "run", "com.google.Chrome"},
		[]string{"flatpak", "run", "org.chromium.Chromium"}, []string{"flatpak", "run", "com.brave.Browser"},
	)
	for _, c := range candidatos {
		if _, err := exec.LookPath(c[0]); err != nil {
			continue
		}
		if lanzado(exec.Command(c[0], append(c[1:], u)...)) {
			return nil
		}
	}
	return fmt.Errorf("no se encontró ningún navegador. Abre a mano esta dirección:\n%s", u)
}

// lanzado: terminó bien, o sigue vivo pasado un rato (algunos navegadores no regresan).
func lanzado(cmd *exec.Cmd) bool {
	desligar(cmd)
	if cmd.Start() != nil {
		return false
	}
	hecho := make(chan error, 1)
	go func() { hecho <- cmd.Wait() }()
	select {
	case err := <-hecho:
		return err == nil
	case <-time.After(4 * time.Second):
		return true
	}
}

func avisar(texto string) {
	fmt.Fprintln(os.Stderr, texto)
	for _, c := range [][]string{
		{"zenity", "--error", "--title=Biblioteca de EDO", "--text=" + texto},
		{"kdialog", "--title", "Biblioteca de EDO", "--error", texto},
		{"yad", "--error", "--title=Biblioteca de EDO", "--text=" + texto},
		{"notify-send", "Biblioteca de EDO", texto},
		{"xmessage", texto},
	} {
		if _, err := exec.LookPath(c[0]); err == nil && exec.Command(c[0], c[1:]...).Run() == nil {
			return
		}
	}
}
