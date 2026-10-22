# Biblioteca de EDO · Fase 1 (motor + Libros I–III + CP3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Web local con el motor de escenas fluidas y manipulables, la portada de 7 libros, los Libros I–III completos (todos sus temas), la CP3 y las demostraciones para valientes de esos libros.

**Architecture:** Módulos ES sin frameworks. Contenido (`libros/N/*.js`) separado de escenas (`escenas/N/*.js`, Canvas 2D por fotograma, función pura de entradas/paso/progreso/tiempo) y del motor común (`motor/`). Páginas: `index.html`, `libro.html`, `tema.html`, `ejercicio.html`, `valiente.html`.

**Tech Stack:** HTML/CSS/JS, Canvas 2D, KaTeX 0.18.9 (vendor), Noto Serif + JetBrains Mono (vendor), `node --test`, playwright-core + Chromium de `~/.cache/ms-playwright`.

**Spec:** `docs/superpowers/specs/2026-10-21-biblioteca-edo-design.md`

## Global Constraints

- Texto de la conferencia **literal**; erratas con `marca: 'corregido'`; lo añadido con `marca: 'añadido'`.
- Cada página de `fuentes/conf/confN.pdf` salvo la 1 aparece en `diapositivas` de algún tema del libro N.
- Dentro de `$…$`: ni `/`, ni `*`, ni `∗`. Derivadas `\dfrac{dy}{dt}` (o `\dot x` en la Conf 7, como allí).
- Colores semánticos: solución cian · estable verde · inestable ámbar · nodo violeta · parámetro ciruela · campo gris azulado · numérico ámbar punteado.
- Paleta/fuentes idénticas a TeoriaNumeros (`css/biblioteca.css` de allí es la base).
- Nunca capturar la pantalla del usuario: solo renderizar páginas del proyecto con `herramientas/ver.sh`.
- `prefers-reduced-motion`: transiciones instantáneas (p = 1 directo; la cinemática se reduce a un fundido).

## Review Focus

- f editada inválida o que explota (1/(y−2), tan, y²): la escena no se rompe; aviso junto a la entrada; curvas cortadas en la explosión, sin rayas verticales espurias → test en Task 2 (`rk4` se detiene) y Task 3 (parser rechaza).
- Arrastrar la condición inicial fuera de la vista o sobre un equilibrio → se recorta a la vista; la curva por un equilibrio es la recta → test Task 5.
- Cambiar una entrada a mitad de la animación de un paso → el paso se redibuja en reposo (p = 1) sin parpadeo ni capas duplicadas → test Task 5 (navegador).
- Pantalla estrecha (≤ 760 px): columnas apiladas, canvas reescalado nítido (DPR) → Task 6 render a 700 px.
- Recargar la página con la transición «valientes» → `valiente.html` abre sin cinemática si `?directo=1` o si se pulsa Esc; nunca queda una capa negra encima → test Task 7.

---

### Task 1: Andamiaje

**Files:** Create `abrir-biblioteca`, `vendor/` (copia de TeoriaNumeros), `css/biblioteca.css` (copia + reglas EDO), `motor/dom.js` (`h`, `marca`, `katex`), `motor/macros.js`, `herramientas/ver.sh|ver.cjs`, `tests/navegador.sh`, `.gitignore`, `favicon.svg`.

- [ ] Copiar vendor, `abrir-biblioteca`, `ver.*` de TeoriaNumeros; `NODE_PATH` apunta a `~/Leo/Tutoriales/TeoriaNumeros/.superpowers/dev/node_modules`.
- [ ] `motor/dom.js` exporta `h(tag, props, ...hijos)`, `marca(m)`, `katex(raiz)` (auto-render con `MACROS`, `trust` para `\htmlClass`).
- [ ] Macros: `\d` → `\mathrm{d}`, `\R` → `\mathbb R`, `\dydt` → `\dfrac{dy}{dt}`, `\dPdt`, colores `\cian{}`, `\verde{}`, `\ambar{}`, `\violeta{}`, `\ciruela{}` vía `\htmlClass{c-…}`.
- [ ] Commit `chore: andamiaje`.

### Task 2: Numérica (`motor/numerico.js`)

**Produces:** `rk4(f, t0, y0, t1, {h=0.01, limite=1e6}) → {t:number[], y:number[], corte:'explota'|null}` (t1 < t0 integra hacia atrás); `euler(f, t0, y0, dt, n) → {t[], y[]}`; `raices(g, a, b, {n=400}) → number[]` (cambio de signo + bisección, y mínimos |g| < 1e-9 para raíces dobles); `deriv(g, x, h=1e-5)`; `rk4Sistema(F, t0, Y0, t1, opts)` para presa-depredador.

- [ ] Tests `tests/numerico.test.mjs`: `rk4(y=>2y−1 …)` en t=1 vs (e²+1)/2 a 1e-6; `euler` con Δt=0.1 da 1.1, 1.22, 1.364 (Conf 4); `rk4((t,y)=>1+y*y,0,0,2)` corta con `'explota'` antes de t = π/2 + 0.01; `raices(y=>(y+3)*(y-2),-10,10)` = [−3, 2]; `raices(y=>(y-1)**2, -5,5)` ≈ [1]; logística k=1,N=1 converge a 1.
- [ ] Implementar; pasar; commit.

### Task 3: Expresiones (`motor/expresion.js`)

**Produces:** `compilar(texto, vars=['t','y']) → {f: (...v)=>number, latex: string} | {error: string}`. Gramática: números, variables, parámetros declarados, `+ − * / ^`, unarios, paréntesis, multiplicación implícita (`2y`, `t(y+1)`), funciones `sin cos tan exp ln log sqrt abs arctan`, constantes `pi`, `e`. Sin `eval`/`Function`.

- [ ] Tests: `compilar('y-t').f(1,3) === 2`; `compilar('4y(1-y)').f(0,0.5) === 1`; `compilar('e^(y^2/10)*sin(y)^2')` correcto; `compilar('y +')` → error; `compilar('alert(1)')` → error; `latex` de `'(y+3)(y-2)'` es `(y+3)(y-2)` y de `'1/(y-2)'` contiene `\frac`.
- [ ] Implementar; pasar; commit.

### Task 4: Lienzo y primitivas (`motor/lienzo.js`, `escenas/primitivas.js`)

**Produces:**
- `crearLienzo(contenedor, {ancho, alto}) → {g, dibujar(fn), rotulos, destruir}`: canvas HiDPI, `ResizeObserver`, capa HTML de rótulos KaTeX reconciliada por clave (`rotulos.poner(clave, {x,y,tex,color,alfa,ancla})`, los no puestos en el fotograma se eliminan).
- `plano({x, y, w, h}, {t:[a,b], y:[c,d]})` → `{aPx(t,y), aMundo(px,py), …}`.
- Primitivas `(g, plano, opts)`: `ejes`, `rejilla`, `campo(f, {densidad, p})` (marcas que giran a su pendiente con p), `curva(puntos, {p, color, ancho})` (trazado hasta fracción p, cortes por NaN/explosión), `solucion(f, t0, y0, {p})` (rk4 adelante y atrás dentro de la vista), `punto`, `flecha`, `segmento`, `equilibrio(y, tipo)`, `lineaFase({x, plano, f, raices, p, particulas:τ, orientacion:'vertical'|'horizontal'})`, `grafica(g, fn)`, `rotulo`.
- `ease(p)` (cúbica suave), `tramo(p, a, b)` (sub-progreso en [a,b]).

- [ ] Tests unitarios de `plano` (ida y vuelta) y de `tramo`/`ease`; test de que `lineaFase` clasifica (y+3)(y−2): −3 sumidero, 2 fuente; y³ en 0: fuente; (1+y)² en −1: nodo.
- [ ] Implementar; commit.

### Task 5: Estudio animado (`motor/estudio.js`, `motor/entradas.js`)

**Consumes:** Task 4. **Produces:** `crearEstudio({pasos, escena, nombre, rotulo, ocultarFuturos, teclado, alPaso}) → {raiz, iniciar, ir, paso}`.

Contrato de escena (`definirEscena` en `escenas/comun.js`):
```js
definirEscena({
  entradas: [{ id, tipo: 'deslizador'|'funcion'|'numero', etiqueta, valor, min, max, paso }],
  vista: { t: [a, b], y: [c, d] } | (e) => …,  alto: 360,
  validar: (e) => mensaje|null,
  preparar: (e) => ctx,                         // cálculos compartidos
  capas: [(g, ctx, { p, tiempo, actual }) => void, …],   // una por paso; p=1 si pasado
  duracion: [ms por capa] | ms,  bucle: [índices de capas en bucle],
  asas: (ctx, paso) => [{ id, x, y, mover: (t, y) => ({ entradaId: valor }) }],
  leyenda: { cian: '…' },
})
```
- [ ] Bucle `requestAnimationFrame` solo mientras haya movimiento (p < 1 o capa en bucle visible); p avanza en `duracion`; ↻ reinicia p; ◀ ▶ ⏮, ← →, clic en paso, tira de miniaturas (render estático p = 1, τ = 0).
- [ ] Entradas: deslizador con valor visible; campo de función con aviso de error de `compilar`; arrastre de asas (puntero) con recorte a la vista; durante arrastre o cambio de entrada p = 1.
- [ ] Test navegador (Task 14) cubre: avanzar todos los pasos sin errores, cambiar entrada a mitad, arrastrar asa.
- [ ] Commit.

### Task 6: Páginas (portada, libro, tema)

**Files:** `index.html`, `libro.html`, `tema.html`, `motor/portada.js`, `motor/libro.js`, `motor/tema.js`, `libros/catalogo.js`.

Formato de contenido `libros/N/contenido.js`:
```js
export default { numero, romano, titulo, color, conferencia: 'Clase N: …', profesores,
  partes?: [{ titulo, desde: idTema }],
  temas: [{ id, nombre, diapositivas: [n…], recuadro?, explicacion, pasos: [{ texto, marca? }], escena: 'N/id', claves: [{ idea, texto }], valiente?: idDemo }],
  resumen: [{ titulo, items: [texto] }] }
```
- [ ] Portada con 7 libros (I–III disponibles, IV–VII visibles pero «en preparación»), ilustraciones del spec §5.
- [ ] Índice de libro: temas (por partes), valientes, CP, resumen literal.
- [ ] Página de tema: migas, título, recuadro, explicación, estudio, claves, botón valientes, «se practica en», vecinos.
- [ ] Commit.

### Task 7: Valientes (`valiente.html`, `motor/valiente.js`, `css/valiente.css`, `libros/N/valientes.js`)

Formato: `{ id, nombre, tema, enunciado, asume: [texto], cuerpo: [{ tipo: 'lema'|'paso'|'conclusion'|'nota', titulo?, texto, porque? }], escena: 'N/v-id', claves }`.
- [ ] Cinemática (≈ 9 s, saltable con Esc/clic, `?directo=1` la omite): negro → iris → cartelas tipo tráiler (3) → vuelo por un campo de pendientes en canvas → título cae con sacudida y polvo → se revela la página.
- [ ] Página: enunciado arriba-izquierda, demostración debajo, escena amplia (ancho completo) con su estudio, claves.
- [ ] Commit.

### Task 8: Ejercicios de CP (`ejercicio.html`, `motor/ejercicio.js`, `motor/practicas.js`, `motor/progreso.js`)

Portar de TeoriaNumeros (mismo formato §17 de su spec) con la solución pudiendo tener `escena` animada (ejercicios de esbozar: capas = red de marcas → equilibrios → flechas → soluciones).
- [ ] Commit.

### Tasks 9–11: Libros I, II, III (contenido + escenas + claves)

Para cada libro: transcribir del PDF renderizado (`pdftoppm -r 110`), un tema por entrada del inventario, todas las diapositivas cubiertas, una escena por tema con tantas capas como pasos, entradas manipulables donde tenga sentido, ≥ 2 claves por tema. Commit por libro.

### Task 12: CP3 (`libros/3/practica.js`, `escenas/cp3/*`)

7 ejercicios (1.1–1.4, 2, 3, 4, 5, 6, 7). Primera pista = tema de la Conf 3 (o de la Conf 5 si es línea de fase; enlazar a la Conf 3 cuando el concepto es el campo). Soluciones de esbozo animadas. Velocidad terminal mg/k verificada por código.

### Task 13: Valientes de I–III

`v-familia-exponencial` (toda solución de P′ = kP es Ceᵏᵗ), `v-logistica-tiende-a-N`, `v-separacion-todas` (separación de variables da todas las soluciones fuera de los ceros de h; con h continua y la solución que toca un cero… se trata con cuidado: se demuestra que en cada intervalo donde h(y(t)) ≠ 0 vale la fórmula), `v-traslacion-autonoma`.

### Task 14: Pruebas globales

- [ ] `tests/contenidos.test.mjs`: estructura, ids únicos, escena existe con nº de capas = nº de pasos, cobertura de diapositivas (nº de páginas con `pdfinfo` guardado en `fuentes/paginas.json`), notación, KaTeX `renderToString` sin errores, claves ≥ 2.
- [ ] `tests/navegador.cjs`: recorre cada tema, cada paso, cada ejercicio y valiente sin `pageerror` ni `console.error`; cambia una entrada a mitad de animación; arrastra un asa; abre valiente y pulsa Esc.
- [ ] README. Commit.
