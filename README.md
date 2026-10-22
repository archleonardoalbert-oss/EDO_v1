# Biblioteca de EDO

Herramienta de estudio, visual e interactiva, para la asignatura **Ecuaciones Diferenciales Ordinarias** de la
Licenciatura en Ciencias de la Computación de la **Universidad de La Habana**.

Para construir la web se utilizaron las **conferencias y clases prácticas reales** del curso: siete conferencias y las
clases prácticas que las acompañan. Los textos, los ejemplos y los ejercicios son los mismos que se trabajan en
clase y siguen su orden.

> **Aviso importante.** No es material oficial de la asignatura ni sustituye a las conferencias, las clases prácticas
> ni la orientación del profesorado: es un complemento para estudiar. Ante cualquier discrepancia, manda el material
> del curso.

## Contenido

Cada conferencia es un **libro**. Una conferencia no es una lista de teoremas, sino una explicación continua; por eso
cada libro se divide en **temas** que cubren entre todos **cada diapositiva** de la conferencia (lo comprueba un test).

| Libro | Conferencia | Temas | Clase práctica |
|---|---|---|---|
| **I** | ¿Qué son las EDO? Modelación: exponencial, logístico, presa-depredador | 10 | — |
| **II** | Separación de variables: soluciones, PVI, separables, soluciones perdidas e implícitas | 7 | — |
| **III** | Campos de pendientes | 8 | CP 3 · 7 ejercicios |
| **IV** | Método de Euler · existencia y unicidad | 10 | CP 4 · 7 ejercicios |
| **V** | Equilibrios · línea de fase | 8 | CP 5 · 7 ejercicios |
| **VI** | Bifurcaciones · ecuaciones lineales | 11 | CP 6 · 8 ejercicios |
| **VII** | Variación de la constante · factor integrante · cambio de variable | 10 | — |

En total: **64 temas**, **29 ejercicios** de clase práctica y **12 demostraciones para valientes**.

## Cómo está pensada

### La página de un tema

- **Arriba**: el título y, si la conferencia lo destaca, el recuadro con la definición o la idea central. Debajo, una
  explicación breve en lenguaje llano (marcada como no perteneciente a la conferencia).
- **A la izquierda**: el texto de la conferencia, repartido en pasos.
- **A la derecha**: la escena.
  - Avanza **solo cuando lo pides** (◀ ▶ o las flechas del teclado).
  - **Dentro de cada paso, el movimiento es fluido**: las marcas del campo giran hasta su pendiente, las soluciones
    se trazan desde su condición inicial y las partículas recorren la línea de fase.
  - Al terminar, el paso queda en reposo con todo escrito.
  - ↻ repite el movimiento y ◀ restaura el paso anterior exactamente.
- **Todo se puede tocar**: arrastrar la condición inicial, mover parámetros con deslizadores y **escribir tu propia
  ecuación** $f(t, y)$.
- **Al final**: «ideas que te llevas» y los ejercicios de la clase práctica que usan el tema.

### El lenguaje visual

Se respeta cómo dibuja la conferencia: campo de pendientes, línea de fase con puntos y flechas, sumideros, fuentes y
nodos. Los colores tienen el mismo significado en toda la web:

| Color | Significado |
|---|---|
| cian | soluciones |
| verde | equilibrio estable |
| ámbar | equilibrio inestable |
| violeta | nodo |
| ciruela | parámetro (lo que ajustas) |
| gris azulado | campo de pendientes |

### Demostraciones solo para valientes

Lo que la conferencia enuncia o usa **sin demostrar** tiene una demostración completa, a la que se entra por la
puerta «⚔ Demostración solo para valientes»:

- La entrada es una cinemática de tráiler, exagerada a propósito: se salta con Esc y tiene un botón de sonido.
- La página muestra el enunciado, lo único que se da por sabido (resultados de Análisis de primer año, nombrados),
  la demostración entera en lemas y pasos con su porqué, y una animación amplia de su significado.

### Clases prácticas

Cada ejercicio se resuelve con **pistas a petición**:

- La primera pista es siempre el tema de la conferencia que se aplica.
- Después, la solución modelo paso a paso. En los ejercicios de «esboce…» es un dibujo que se construye en el orden
  en que se haría a mano.
- Al final, «qué te llevas».

## Uso

```sh
./abrir-biblioteca          # sirve la web en local y abre el navegador (Python 3)
```

Funciona **sin conexión**: KaTeX y las fuentes están incluidos en `vendor/`.

## Fidelidad al material del curso

- El texto de la conferencia es **literal**, con dos tipos de marca:
  - «**corregido**»: erratas corregidas, con una nota que explica el cambio;
  - «**añadido**»: lo que no está en la conferencia (por ejemplo, el análisis guiado del estudio independiente de
    presa-depredador).
- Los libros de texto de la asignatura no se citan: todo sale de las conferencias.

## Estructura del proyecto

| Ruta | Qué contiene |
|---|---|
| `libros/N/contenido.js` | Temas del libro N: texto literal, pasos, diapositivas que cubre, ideas que te llevas |
| `libros/N/practica.js` | Clase práctica N |
| `libros/N/valientes.js` | Demostraciones para valientes del libro N |
| `escenas/N/*.js` | Una escena por tema (Canvas 2D), definida con `definirEscena` (`escenas/comun.js`) |
| `escenas/primitivas.js` | Campo, soluciones, línea de fase, ejes… |
| `escenas/piezas.js` | Tangentes, fórmulas, paneles… |
| `escenas/esbozos.js` | Fábricas para las soluciones de «esboce…» |
| `motor/` | Lienzo, estudio animado, entradas manipulables, numérica, expresiones, páginas, cinemática |

## Desarrollo

```sh
node --test 'tests/*.test.mjs'     # numérica, expresiones y TODO el contenido (cobertura, notación, KaTeX, escenas)
tests/navegador.sh                 # recorre cada paso, ejercicio y demostración en Chromium sin ventana
herramientas/pasos.sh 'tema.html?l=1&t=influencia' hoja.png .lienzo   # hoja con todos los pasos de una escena
```

## Créditos y licencias

- [KaTeX](https://katex.org) (MIT).
- Noto Serif y JetBrains Mono (SIL Open Font License).
