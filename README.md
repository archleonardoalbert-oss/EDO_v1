# Biblioteca de EDO

Herramienta de estudio visual e interactiva para la asignatura **Ecuaciones Diferenciales Ordinarias** de la
**Universidad de La Habana** (Licenciaturas en Ciencias de la Computación y en Ciencias de Datos).

Cada conferencia es un **libro**, y cada libro se divide en **temas**. En cada tema, el texto de la conferencia
se recorre **paso a paso** junto a una escena animada que se puede **manipular**:
- arrastrar condiciones iniciales;
- mover parámetros;
- escribir una ecuación propia.

Además, cada libro incluye su **clase práctica** (cuando la conferencia la tiene): ejercicios con pistas
graduadas, una solución modelo y un resumen de las ideas reutilizables. Lo que las conferencias enuncian sin
demostrar se demuestra en páginas aparte, las **demostraciones solo para valientes**.

La web se construyó a partir de las **conferencias y clases prácticas reales** de la asignatura: siete
conferencias y cuatro clases prácticas. Los textos, los ejemplos y los ejercicios son los mismos que se trabajan
en clase y siguen su orden.

> **Aviso importante.** No es material oficial de la asignatura ni sustituye a las conferencias, las clases
> prácticas ni la orientación del profesorado. Es un complemento para estudiar.
>
> Ante cualquier discrepancia, manda el material del curso y lo que indiquen los profesores. Si encuentras
> un error, repórtalo (ver [Reportar errores](#reportar-errores)).

---

## Índice

- [Contenido](#contenido)
- [Cómo está pensada](#cómo-está-pensada)
- [Uso](#uso)
- [Cómo estudiar con la biblioteca](#cómo-estudiar-con-la-biblioteca)
- [Fidelidad al material del curso](#fidelidad-al-material-del-curso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Desarrollo](#desarrollo)
- [Créditos y licencias](#créditos-y-licencias)
- [Reportar errores](#reportar-errores)

---

## Contenido

| Libro | Conferencia | Temas | Clase práctica | Para valientes |
|---|---|---|---|---|
| **I** | ¿Qué son las EDO? Modelación: elementos de una EDO, modelos exponencial y logístico, presa-depredador, los tres enfoques | 10 | — | 2 |
| **II** | Separación de variables: qué es una solución, problema de valor inicial, ecuaciones separables, soluciones perdidas, soluciones implícitas | 7 | — | 1 |
| **III** | Campos de pendientes: geometría de $y' = f(t, y)$, construcción del campo, casos $f(t)$ y autónomo, del campo a las soluciones | 8 | CP 3 · 7 ejercicios | 1 |
| **IV** | Método de Euler · existencia y unicidad: fórmula, error, limitaciones, teoremas de existencia y de unicidad, soluciones acotadas, falta de unicidad | 10 | CP 4 · 7 ejercicios | 3 |
| **V** | Equilibrios · línea de fase: ecuaciones autónomas, sumideros, fuentes y nodos, teorema de linealización, gráficas desde la línea de fase | 8 | CP 5 · 7 ejercicios | 2 |
| **VI** | Bifurcaciones · ecuaciones lineales: familias de un parámetro, valor y diagrama de bifurcación, principio de linealidad, coeficientes indeterminados | 11 | CP 6 · 8 ejercicios | 2 |
| **VII** | Variación de la constante · factor integrante · cambio de variable: derivaciones, ejemplos, ecuaciones de Bernoulli | 10 | — | 1 |

En total: **64 temas**, **29 ejercicios** de las clases prácticas y **12 demostraciones para valientes**.

Las demostraciones para valientes cubren:
- **Libro I:** la familia $Ce^{kt}$ contiene todas las soluciones de $P' = kP$; toda solución logística con
  $P(0) > 0$ tiende a $N$.
- **Libro II:** la separación de variables da todas las soluciones lejos de los ceros de $h$.
- **Libro III:** las soluciones de una autónoma son traslaciones horizontales unas de otras.
- **Libro IV:** el teorema de existencia (Peano, con poligonales de Euler), el teorema de unicidad (Grönwall) y
  la cota del error de Euler.
- **Libro V:** el teorema de linealización; una solución monótona y acotada tiende a un equilibrio.
- **Libro VI:** si $\frac{\partial f}{\partial y} \ne 0$ no hay bifurcación; las soluciones de una lineal son
  exactamente $k\,e^{A(t)} + y_p$.
- **Libro VII:** el factor integrante y la variación de la constante son el mismo método.

---

## Cómo está pensada

### La página de un tema

Las conferencias de la asignatura no son listas de teoremas: combinan explicaciones, ejemplos, gráficos y
resultados. Por eso cada conferencia se divide en **temas**, y entre todos los temas cubren **cada diapositiva**
de la conferencia (una prueba automática lo comprueba).

- **Arriba**: el título del tema, el recuadro con la definición o el resultado central (si la conferencia lo
  destaca) y una explicación breve en lenguaje llano.
- **A la izquierda**: el texto de la conferencia, repartido en pasos.
  - El paso actual está resaltado y los anteriores siguen legibles.
  - Pulsar una línea salta a ese paso.
- **A la derecha**: la escena.
  - Avanza **solo cuando el estudiante lo pide** (◀ ▶ o las flechas del teclado).
  - **Dentro de cada paso, el movimiento es fluido**: las marcas del campo de pendientes giran hasta su
    inclinación, las soluciones se trazan desde su condición inicial y las partículas recorren la línea de fase.
  - Al terminar el movimiento, la escena queda **en reposo con todo escrito**: ningún dato necesario desaparece.
  - **↻** repite el movimiento del paso; **◀** restaura exactamente el estado del paso anterior.
  - La vista de **tira** muestra todos los pasos en miniatura.
- **Debajo de la escena**: las **entradas manipulables**.
  - Deslizadores para los parámetros ($k$, $N$, $\mu$, $\Delta t$, la condición inicial…).
  - Campos donde se puede **escribir una ecuación** (por ejemplo `y^2 - t` o `sin(t y)`), con ejemplos de un clic.
  - En muchas escenas, los puntos marcados (condiciones iniciales, parámetros) **se pueden arrastrar** con el ratón.
- **Al final**:
  - «ideas que te llevas», las técnicas reutilizables del tema;
  - el acceso a la **demostración para valientes**, si el tema la tiene;
  - **«Se practica en»**, los ejercicios de la clase práctica que usan el tema.

### El lenguaje visual

Las escenas respetan las representaciones de las conferencias:
- el **campo de pendientes** como marcas cortas en una cuadrícula;
- la **línea de fase** como una recta con los equilibrios marcados por puntos y una flecha por intervalo (vertical
  u horizontal, como en la conferencia correspondiente);
- los símbolos de **sumidero** ($\downarrow\bullet\uparrow$), **fuente** ($\uparrow\bullet\downarrow$) y
  **nodo** ($\downarrow\bullet\downarrow$);
- el **diagrama de bifurcación** como líneas de fase verticales colocadas una junto a otra;
- el **método de Euler** como una poligonal que avanza sobre el campo, junto a su tabla de valores.

Los **colores tienen un significado fijo** en toda la web:

| Color | Significado |
|---|---|
| cian | soluciones |
| verde | equilibrio estable (sumidero) |
| ámbar | equilibrio inestable (fuente); aproximaciones numéricas |
| violeta | nodo; elementos auxiliares |
| ciruela | parámetros y lo que el estudiante ajusta |
| gris azulado | campo de pendientes |
| rojo | lo que no está definido o es imposible |

Las fórmulas usan los mismos colores que el dibujo, y cada escena muestra su leyenda.

### Las demostraciones solo para valientes

Lo que una conferencia **enuncia o usa sin demostrar** tiene una demostración completa en una página propia, a
la que se entra con el botón **«Demostración solo para valientes»**. La entrada es una breve cinemática de
tráiler, exagerada a propósito; se puede saltar con `Esc` y su sonido se puede desactivar.

La página contiene:
- el **enunciado** del resultado;
- **lo único que se da por sabido**: resultados de Análisis de primer año (valor medio, teorema fundamental del
  cálculo, Bolzano, máximo en un compacto…), siempre nombrados al usarlos;
- la **demostración entera**, organizada en lemas y pasos, cada uno con su justificación al margen;
- una **animación amplia** que muestra el significado de lo demostrado;
- las **ideas que te llevas**.

### La página de un ejercicio (clase práctica)

Su papel es **acompañar a quien resuelve, no darle la solución**:

1. **Enunciado** del ejercicio y, si hace falta, una **aclaración** (erratas, hipótesis implícitas).
2. **Pistas a petición, una a una**. El botón anuncia de qué tipo es la siguiente:
   - la **primera** es siempre **el tema de la conferencia** que se aplica, con enlace a su página;
   - después vienen **estrategia**, **arranque** (la mayoría, porque empezar suele ser lo más difícil) y
     **desbloqueos** para los atascos siguientes;
   - ninguna pista hace la cuenta clave.
3. **«Ver solución»**: una solución modelo que se revela **paso a paso**, sin mostrar el siguiente, para que se
   pueda intentar adivinarlo. Cada implicación está justificada.
   - En los ejercicios de **«esboce…»**, la solución es una escena que construye el dibujo en el orden en que se
     haría a mano: la red de puntos con sus valores, las marcas, las isoclinas, los equilibrios y las soluciones.
   - En los ejercicios del **método de Euler**, la tabla se llena a la par que la poligonal crece.
4. **«Qué te llevas»**: al terminar la solución, el resultado y los métodos o formas de pensar que sirven en otros
   problemas, con indicaciones de cuándo reconocerlos.

El progreso (pistas abiertas, solución vista) se guarda **solo en el navegador** de quien lo usa. No se envía a
ningún sitio y se puede borrar con «empezar de cero».

---

## Uso

### La forma más sencilla: los ejecutables

Hay un ejecutable por sistema operativo, `MatCom_EDO_v<versión>_<sistema>`, que lleva la web dentro. Con un
doble clic abre tu navegador predeterminado en la biblioteca, sin instalar nada ni necesitar internet:

| Sistema | Archivo | Funciona en |
|---|---|---|
| Windows | `MatCom_EDO_v1.0_Windows.exe` | Windows 10 y 11 de 64 bits |
| macOS | `MatCom_EDO_v1.0_Mac.app` | macOS 11 o posterior, Intel y Apple Silicon |
| Linux | `MatCom_EDO_v1.0_Linux` | cualquier distribución de 64 bits (binario estático: no depende de la libc) |

Otro doble clic con la biblioteca ya abierta solo abre otra pestaña. Al cerrar todas las pestañas, el programa
se apaga solo a los pocos minutos. Los ejecutables no están firmados por Microsoft ni por Apple, así que la primera
vez el sistema avisa; el `LÉEME.txt` que los acompaña explica cómo abrirlos igualmente.

Si prefieres trabajar con el código fuente, sigue los pasos de abajo.

### Requisitos

- **Python 3** (cualquier versión actual), solo para servir los archivos en local.
- Un **navegador moderno**: Firefox, Chrome, Chromium o Edge.
- **No necesita internet.** KaTeX y las fuentes vienen incluidos en `vendor/`.

### Abrir la biblioteca

Desde la carpeta del proyecto:

```sh
# Linux / macOS
./abrir-biblioteca

# Windows (o si el archivo no es ejecutable)
python abrir-biblioteca
```

El script levanta un servidor local en `http://localhost:8780/` (o el siguiente puerto libre) y abre el
navegador. Si el navegador no se abre solo, copia en él la dirección que aparece en la terminal. Para cerrar,
pulsa `Ctrl+C`.

Las páginas no funcionan abriendo los `.html` directamente (`file://`): los módulos de JavaScript necesitan el
servidor local.

### Atajos

| Acción | Efecto |
|---|---|
| `→` / `←` | paso siguiente / anterior |
| clic en una línea del texto | ir a ese paso |
| ↻ | repetir el movimiento del paso actual |
| arrastrar un punto resaltado | cambiar la condición inicial o el parámetro que representa |
| `Esc` | cerrar la vista de tira; saltar la entrada de una demostración para valientes |

---

## Cómo estudiar con la biblioteca

Una recomendación, basada en cómo está construida:

1. **Primero la conferencia**, en clase o en el material del curso. Después, el tema en la biblioteca para *ver*
   la idea: avanza paso a paso y, al terminar, **mueve los parámetros y las condiciones iniciales** para comprobar
   que puedes predecir lo que va a pasar antes de verlo.
2. Usa los campos de ecuación para **probar tus propios ejemplos**: dibuja a mano una línea de fase o un campo y
   compáralo con la escena.
3. Lee las **«ideas que te llevas»** de cada tema: ahí está lo que se puede reutilizar en otros ejercicios.
4. En la clase práctica, **intenta el ejercicio con papel y lápiz antes de pedir ninguna pista**.
5. Pide **una pista cada vez**. La primera solo te dice qué tema de la conferencia aplicar, y a menudo con eso
   basta. Vuelve a intentarlo antes de pedir la siguiente.
6. Abre la solución cuando la hayas terminado o cuando de verdad estés bloqueado. Antes de pulsar «siguiente
   paso», intenta adivinar cuál será.
7. Las **demostraciones para valientes** son opcionales: sirven para entender *por qué* funcionan los
   teoremas que se usan en clase.
8. Contrasta siempre tus soluciones con las de la clase práctica y consulta las dudas con los profesores.

---

## Fidelidad al material del curso

- El **texto de las conferencias** se transcribe literalmente, con su notación (incluida la notación $\dot x$ de
  la Conferencia 7). En las clases prácticas, el enunciado se transcribe literal con notación matemática cuidada.
- **No se omite nada** de ninguna conferencia: cada diapositiva está asignada a un tema y una prueba automática
  lo verifica. El «resumen de la clase» aparece al final del índice de cada libro.
- Todo lo que **no** está en el material original va marcado:
  - **«corregido»**: una errata corregida, con una nota que explica el cambio;
  - **«añadido · no está en la conferencia»**: aclaraciones o desarrollos que la conferencia no incluye (por
    ejemplo, el análisis guiado del «estudio independiente» de presa-depredador en el Libro I);
  - las explicaciones, las escenas, las pistas, las soluciones de las clases prácticas, las demostraciones para
    valientes y las secciones de ideas son elaboración propia de esta herramienta, **no del profesorado**.
- Las **cuentas de los ejemplos y de las soluciones** están **verificadas por código**: los valores de Euler, las
  raíces y la clasificación de los equilibrios, y las soluciones de las ecuaciones lineales (que se sustituyen en la
  ecuación y dan residuo nulo).

### Erratas corregidas en las conferencias

| Conferencia | Texto original | Corrección |
|---|---|---|
| 1 | «velocidad como la derivada respecto a la posición» (y análogo para la aceleración) | La velocidad es la derivada de la posición respecto al tiempo; la aceleración, la de la velocidad. |
| 3 | Las soluciones de $y' = e^{y^2/10}\sin^2 y$ «oscilan entre múltiplos de $\pi$» | No oscilan: como el lado derecho es $\ge 0$, crecen de forma monótona de un equilibrio $n\pi$ al siguiente. |
| 5 | En $y' = (1 + y)^2$, «si $y < -1$ la solución decrece y se aproxima a $-\infty$» | Crece y se aproxima a $-1$, porque $(1 + y)^2 > 0$; $y = -1$ es un nodo. |
| 6 | «su posición cambia cuando $t$ se incrementa» | Lo que se incrementa es el parámetro $\mu$. |
| 7 | $\int t\sin(t^2)\,dt \to \int \sin u\,du$ | Falta el factor $\frac12$ ($du = 2t\,dt$); el resultado final de la conferencia sí es correcto. |
| 7 | Bernoulli: «si $n = 1$, es lineal; si $n \ge 2$, no lineal» | Con $n = 0$ también es lineal; el cambio de variable funciona para todo $n \ne 1$. |

### Observaciones sobre los enunciados de las clases prácticas

Explicadas en la página de cada ejercicio:

| Ejercicio | Observación |
|---|---|
| CP 3 · 1 | La red de puntos dice «$y = -2, -1, -0, 1, 2$»: el «$-0$» es $0$. |
| CP 3 · 3 | Que las demás soluciones no crucen $y = 2$ requiere las hipótesis del teorema de unicidad (Conferencia 4). |
| CP 5 · 3 | Se supone $f$ continuamente diferenciable, para poder usar la unicidad. |
| CP 5 · 4 | «Muchos puntos de equilibrio finitos» se interpreta como «un número finito de puntos de equilibrio». |
| CP 5 · 6 | Se supone $f'''$ continua cerca del equilibrio. |
| CP 6 · 2 | El método da dos candidatos ($\alpha = 0$ y $\alpha = 1$), pero solo en $\alpha = 1$ cambia la línea de fase; la solución lo explica. |

---

## Estructura del proyecto

```
index.html, libro.html, tema.html,           páginas (portada, índice de un libro, tema,
ejercicio.html, valiente.html                ejercicio, demostración para valientes)
abrir-biblioteca          servidor local + abre el navegador (Python 3, sin dependencias)
css/                      estilos: biblioteca.css (tema oscuro, tipografía de lectura), valiente.css
motor/                    lógica común:
  lienzo.js               lienzo Canvas nítido en cualquier pantalla, con rótulos KaTeX superpuestos
  estudio.js              bloque «pasos | escena»: pasos, movimiento fluido, tira, arrastre
  entradas.js             deslizadores, campos de ecuación y números
  expresion.js            intérprete seguro de ecuaciones escritas por el usuario (sin eval)
  numerico.js             Runge-Kutta adaptativo, Euler, raíces y clasificación de equilibrios
  plano.js                el plano t–y, curvas de movimiento y caché de soluciones
  tema.js, libro.js, portada.js, ejercicio.js, valiente.js   las páginas
  cinematica.js           la entrada de las demostraciones para valientes
libros/catalogo.js        los siete libros (portada) y qué tiene cada uno
libros/<n>/contenido.js   temas de la conferencia n: texto, pasos, diapositivas que cubre, ideas
libros/<n>/practica.js    clase práctica n: enunciados, pistas, soluciones, «qué te llevas»
libros/<n>/valientes.js   demostraciones para valientes del libro n
escenas/<n>/<id>.js       una escena por tema o demostración
escenas/cp<n>/            escenas de las soluciones de la clase práctica n
escenas/primitivas.js     campo, soluciones, línea de fase, equilibrios, ejes…
escenas/piezas.js         tangentes, fórmulas, paneles, poligonal y tabla de Euler…
escenas/esbozos.js        fábricas de escenas para las soluciones de «esboce…», Euler y lineales
vendor/                   KaTeX 0.18.9 y fuentes (Noto Serif, JetBrains Mono), para funcionar sin conexión
fuentes/                  PDF de las conferencias y de las clases prácticas usados como fuente
tests/                    pruebas unitarias (node:test) y de navegador (Chromium)
herramientas/             render de páginas y de todos los pasos de una escena a PNG
empaquetar/               lanzador en Go que genera los ejecutables de doble clic
LICENSE                   licencia MIT del código
```

La arquitectura separa tres cosas:
- el **contenido**: textos en `libros/`;
- las **escenas**: dibujos parametrizados en `escenas/`;
- el **motor**, común a todo.

Una escena se define con `definirEscena` (`escenas/comun.js`) y es una **función pura** de las entradas, el número
de paso, el progreso del movimiento dentro del paso y el tiempo. Por eso avanzar, retroceder, cambiar un parámetro
o mirar la tira dan siempre el mismo dibujo.

---

## Desarrollo

### Pruebas

Las pruebas unitarias solo necesitan **Node.js** (18 o posterior):

```sh
node --test 'tests/*.test.mjs'
```

Comprueban, entre otras cosas:
- la numérica (Runge-Kutta, Euler, raíces, clasificación de equilibrios) contra soluciones exactas, incluidas las
  explosiones en tiempo finito;
- el intérprete de ecuaciones (precedencias, multiplicación implícita, rechazo de código);
- en todo el contenido:
  - que **cada diapositiva** de cada conferencia pertenece a algún tema;
  - que **todas las fórmulas compilan en KaTeX** y que no hay `*` ni `/` en las fórmulas (salvo en exponentes,
    como $y^{2/3}$);
  - que cada escena tiene tantos pasos como su texto y **se dibuja sin errores** en todos ellos;
- en las clases prácticas:
  - que la primera pista de cada apartado es el tema de la conferencia y enlaza a un tema existente;
  - que hay al menos tres pistas y una solución completa;
  - las respuestas numéricas.

Las pruebas de navegador recorren cada paso de cada tema, cada ejercicio (pistas y solución) y cada demostración
para valientes en Chromium sin ventana. También comprueban que la entrada cinematográfica se salta con `Esc`.
Necesitan `playwright-core` y un Chromium:

```sh
npm install --prefix .superpowers/dev playwright-core
npx --prefix .superpowers/dev playwright install chromium     # o usa un Chromium ya instalado
CHROMIUM=/ruta/a/chrome tests/navegador.sh                     # filtro opcional: tests/navegador.sh "ejercicio"
```

`tests/navegador.sh` usa por defecto `NODE_PATH=.superpowers/dev/node_modules`. Puedes cambiarlo exportando
`NODE_PATH` y `CHROMIUM`.

### Herramientas de revisión

```sh
herramientas/ver.sh 'tema.html?l=5&t=linealizacion' salida.png 3            # página completa, tras 3 pasos
herramientas/pasos.sh 'tema.html?l=5&t=linealizacion' hoja.png .lienzo       # todos los pasos de la escena, en una hoja
herramientas/pasos.sh 'tests/paginas/escena.html?e=cp3/4' hoja.png .lienzo   # una escena suelta (p. ej. de una solución)
```

### Añadir o corregir contenido

- **Transcribe mirando el PDF renderizado** (`pdftoppm -png`): la extracción de texto pierde exponentes, subíndices
  e integrales.
- Asigna cada diapositiva a un tema (`diapositivas: [...]`) y escribe una escena con tantas capas como pasos.
- Marca todo lo corregido (`marca: 'corregido'`) o añadido (`marca: 'añadido'`).
- En las demostraciones, justifica cada implicación (campo `porque`) y nombra lo que se da por sabido.
- Verifica cada número con un test.

### Generar los ejecutables

```sh
empaquetar/construir.sh 1.1 ../ejecutables/EDO
```

`empaquetar/` contiene un pequeño servidor en Go que incrusta la web y abre el navegador. El script lo compila para
Windows, Linux (estático) y macOS (binario universal dentro de una `.app` firmada ad hoc con
[rcodesign](https://github.com/indygreg/apple-platform-rs)). Necesita Go ≥ 1.22, `llvm-lipo` (o `lipo`),
`rsvg-convert` y Python 3.

Todas las versiones usan el puerto 8780, porque el progreso se guarda en el navegador por dirección: así se conserva
al actualizar. Si al abrir una versión nueva sigue abierta una anterior, la nueva le pide que se cierre y ocupa su
lugar.

---

## Créditos y licencias

- **Contenido matemático original**: las conferencias y clases prácticas de Ecuaciones Diferenciales Ordinarias de
  la Universidad de La Habana pertenecen a sus autores, el profesorado de la asignatura. Esta herramienta las
  reproduce con fines exclusivamente de estudio.
- **Bibliotecas y fuentes incluidas**:
  - [KaTeX](https://katex.org/) 0.18.9, licencia MIT;
  - [Noto Serif](https://fonts.google.com/noto/specimen/Noto+Serif) y
    [JetBrains Mono](https://www.jetbrains.com/lp/mono/), SIL Open Font License 1.1 (textos en `vendor/fuentes/`).
- **Código de esta herramienta** (motor, escenas, estilos, textos de los libros y pruebas): licencia
  [MIT](LICENSE). Puedes usarlo, copiarlo, modificarlo y redistribuirlo libremente, conservando el aviso de
  copyright. La licencia MIT cubre solo el código y los textos propios de la herramienta, no el material
  original de la asignatura (primer punto) ni las bibliotecas y fuentes de terceros (segundo punto), que
  mantienen sus propias licencias.

---

## Reportar errores

Un error matemático en una herramienta de estudio puede costar horas de confusión a quien la usa. Si encuentras
uno, por favor repórtalo. Pueden ser:
- una errata;
- un paso mal justificado;
- una cuenta incorrecta;
- una pista engañosa;
- una escena que no se corresponde con el texto.

Indica:
- el libro y el tema o ejercicio (la dirección de la página basta);
- el paso concreto;
- los valores de los parámetros, si la escena es manipulable;
- qué esperabas y qué aparece.

Cada corrección debería venir con su prueba: un test que falle con el error y pase con la corrección.
