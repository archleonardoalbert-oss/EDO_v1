# Biblioteca de EDO — diseño

Fecha: 2026-10-21 · Carpeta: `~/Leo/Tutoriales/EDO` · Proyecto hermano: `~/Leo/Tutoriales/TeoriaNumeros`.

## 1. Qué es y por qué

Una web local que acompaña las **7 conferencias de Ecuaciones Diferenciales Ordinarias** (Universidad de La Habana,
Ciencias de la Computación) y sus **clases prácticas CP3–CP6**, con una presencia visual **mucho más fuerte** que la
Biblioteca de Teoría de Números. En EDO casi todo se ve: campos de pendientes, soluciones que fluyen, líneas de
fase, bifurcaciones, pasos de Euler. El contenido matemático sigue siendo **fundamental**: la animación acompaña al
texto de la conferencia, no lo sustituye.

**Éxito**: al terminar un tema, el usuario puede reproducir la idea con los ojos cerrados y relacionarla con el dibujo
de la conferencia. Ninguna idea de la conferencia se ha perdido.

## 2. Fuentes (decisión del usuario)

- Base **completa**: `fuentes/conf/conf1..7.pdf` (copias de `~/Descargas/Telegram Desktop/EDO/Conf`) y
  `fuentes/cp/cp3..6.pdf`. La CP n acompaña a la Conferencia n. Las Conf 1, 2 y 7 no tienen CP.
- Libros (`~/Descargas/…/EDO/Libros`, Blanchard–Devaney–Hall en español y en inglés): **solo complementarios** y **no
  se citan** salvo que haga mucha falta. Ojo: `Libros/Clase1 modelacion.pdf` es el Blanchard 4.ª ed. en inglés.
- Leer las fórmulas **del PDF renderizado**, no de `pdftotext`.

## 3. Objetivos, no-objetivos, anti-objetivos

**Objetivos**
- Las 7 conferencias divididas en **temas**. **No se omite nada** de ninguna conferencia: cada diapositiva cae en
  algún tema y su texto aparece (literal, con erratas corregidas y marcadas). Se puede ampliar y complementar.
- Cada tema: pasos con el texto de la conferencia + animación fluida y manipulable.
- CP3–CP6 integradas con pistas, solución animada y «qué te llevas».
- «Demostraciones solo para valientes» para lo que la conferencia enuncia sin probar.
- Funciona sin internet.

**No-objetivos**: Runge-Kutta (la Conf 4 lo promete pero no se da), escribir/verificar soluciones propias en la web,
material que no esté en las conferencias salvo ampliaciones marcadas.

**Anti-objetivos**
- Perder cualquier explicación de la conferencia.
- Inventar representaciones distintas de las de la conferencia cuando la conferencia ya modela una (línea de fase,
  sumidero/fuente/nodo, campo, diagrama de bifurcación, pasos de Euler).
- Animaciones cargadas, o que obliguen a recordar datos que ya no están en pantalla.
- Notación matemática descuidada (nada de «/» ni «*» en fórmulas; `\frac`, `\cdot`, `\dfrac{dy}{dt}`, `\dot x`).

## 4. Decisiones del usuario (no deshacer)

1. **Misma identidad que TeoriaNumeros**: fondo negro, serif de lectura (Noto Serif), mono para etiquetas
   (JetBrains Mono), acentos apagados (cian `#3aa9bb`, ciruela `#b8509f`, ámbar `#c99448`, verde `#4aa97c`,
   violeta `#7d6cc4`; texto hueso `#d6d1c2`), portada con **libros de frente** (uno por conferencia), KaTeX.
2. **Libro = conferencia** (+ su CP si existe). Inventario de temas aprobado (§6).
3. **Pasos controlados por el usuario** (◀ ▶, teclado ← →) y **dentro de cada paso, animación fluida**. Al terminar el
   movimiento la escena queda en reposo con todo escrito («la memoria vive en el dibujo»). ◀ restaura el estado
   exacto. ↻ repite el movimiento del paso. Los movimientos continuos por naturaleza (flujo, barrido de µ) quedan
   en **bucle suave** dentro de su paso.
4. **Manipulable**: arrastrar condiciones iniciales, deslizadores (µ, k, N, Δt, P₀…), **editar f** (expresión en
   t, y). La animación responde en vivo.
5. **Erratas corregidas y marcadas** («corregido»); lo añadido se marca («añadido · no está en la conferencia»).
6. **CP como en TeoriaNumeros**: pistas una a una; la **primera siempre es el tema de la conferencia** (enlace);
   mayoría de pistas de arranque; solución paso a paso con cada implicación justificada; «Qué te llevas».
   Ejercicios de **esbozar**: «ver solución» = el gráfico construido con una animación elegante, capa a capa en el
   orden en que se haría a mano, con el porqué cuando lo amerite. Euler: tabla que se llena a la par del trazo.
7. **«Demostración solo para valientes»** (§8): página propia, transición cinematográfica épica (y cómica),
   demostración exhaustiva, animación amplia al final.
8. **Entrega**: primero Libros I–III (Conf 1–3 + CP3) para revisarlos; luego el resto.

## 5. Estructura

- `index.html` — portada: 7 libros de frente con mini-ilustración (I: curvas exponencial/logística; II: dos integrales
  ∫ = ∫; III: campo de pendientes; IV: escalera de Euler; V: línea de fase ↑•↓; VI: diagrama de bifurcación en
  parábola; VII: la constante c → c(t)).
- `libro.html?l=N` — índice: temas en orden (por partes si la conferencia las tiene: «Parte I: Bifurcaciones»…), luego
  «Demostraciones para valientes» del libro, luego «Clase práctica N», y el **Resumen de la clase** literal.
- `tema.html?l=N&t=id` — página de tema:
  - migas · título · (si la conferencia lo tiene) recuadro con la idea/definición central;
  - **explicación** breve (no es de la conferencia);
  - bloque «pasos | escena»: izquierda el texto **literal** de la conferencia repartido en pasos (paso actual
    resaltado, pulsar salta), derecha la escena con leyenda, controles ◀ ↻ ▶ y entradas (deslizadores, campos de f);
  - «ideas que te llevas»; botón «Demostración solo para valientes» si el tema tiene una; «Se practica en»;
    anterior/siguiente.
- `ejercicio.html?l=N&x=id` — ejercicio de CP.
- `valiente.html?l=N&d=id` — demostración para valientes.

## 6. Inventario de temas (aprobado)

**I · Modelación** (sin CP): ¿Qué es una EDO? · Elementos de una EDO · Modelar: pasos y diccionario · Modelo
exponencial · Análisis del exponencial (equilibrio, signos, condición inicial) · Influencia de P₀ y k; familia Ceᵏᵗ ·
Logístico: construcción · Logístico: no linealidad, f(P), equilibrios, comparación · Presa-depredador · Los tres
enfoques + estudio independiente (exploración guiada del sistema presa-depredador).

**II · Separación de variables** (sin CP): ¿Qué es una solución? · PVI y solución general · Ecuaciones separables
(+ autónomas) · Método y justificación · Ejemplo t/y² · Soluciones perdidas al dividir · Soluciones implícitas.

**III · Campos de pendientes** (+ CP3): Por qué métodos cualitativos · Geometría de dy/dt = f(t,y) · Definición y
procedimiento · Ejemplo y − t · Caso f(t) · Caso autónomo, 4y(1−y) · Del campo a las soluciones ·
e^{y²/10} sin² y (corregido).

**IV · Euler, existencia y unicidad** (+ CP4): Por qué numéricos e idea geométrica · Euler: esquema y obtención ·
Ejemplo 2y − 1 y comparación · Error y tamaño de paso · Limitaciones (eᵗ sin y) y validación · Existencia; tan t ·
Unicidad · Acotadas por equilibrios · Falta de unicidad 3y^{2/3} · Unicidad y método numérico.

**V · Línea de fase** (+ CP5): Autónomas · Línea de fase vs campo · Cómo dibujarla (2 ejemplos) · Sumidero, fuente,
nodo · Linealización · f′(y₀) = 0 (y³, + ejemplos añadidos de los otros tipos) · Graficar desde la línea de fase ·
(1+y)² (corregido).

**VI · Bifurcaciones y lineales** (+ CP6): Bifurcación y cosecha · Familias de un parámetro · Análisis 1 ± √(1−µ) ·
Definición y cálculo · Diagrama de bifurcación · Cuándo no hay bifurcación · Ecuaciones lineales · Principio de
linealidad y solución homogénea · Sus límites (y²) · Linealidad extendida · Coeficientes indeterminados.

**VII · Variación de la constante, factor integrante, cambio de variable** (sin CP): Idea · Derivación · Ejemplo
ẋ + 2x = e³ᵗ · Idea del factor integrante · Derivación · Ejemplo 2/t · Cambio de variable · Ejemplo u = y − 2t ·
Bernoulli · Ejemplo de Bernoulli.

Cada tema declara qué diapositivas cubre (`diapositivas: [n…]`); un test exige que **todas** las páginas de la
conferencia (salvo la portada) estén cubiertas.

### Erratas detectadas (corregir y marcar)
- Conf 1: «velocidad como la derivada respecto a la posición» → derivada de la posición respecto al tiempo (idem
  aceleración).
- Conf 3: e^{y²/10} sin² y: «las soluciones oscilan entre múltiplos de π» → son monótonas crecientes y van de un
  equilibrio nπ al siguiente (los nπ son nodos).
- Conf 5: (1+y)²: «si y < −1 decrece y se aproxima a −∞» → crece y tiende a −1 (nodo).
- Conf 6: «la posición cambia cuando t se incrementa» → µ.
- Conf 7: Bernoulli con n = 0 también es lineal; e^{2 ln t} = t² requiere t > 0.

## 7. Lenguaje visual

Se respeta lo que dibuja la conferencia y se le da vida:
- **Plano t–y** con ejes rotulados; **campo de pendientes** con marcas cortas de color tenue; las marcas aparecen
  «girando» hasta su pendiente.
- **Soluciones** = curvas cian que **se trazan** desde su condición inicial (punto arrastrable).
- **Línea de fase** como en la conferencia: recta vertical (y también la horizontal de la Conf 5 cuando se usa así),
  equilibrios como puntos, flechas ↑ ↓ en cada intervalo; **partículas** que corren por la línea hacia/desde los
  equilibrios; símbolos sumidero ↓•↑, fuente ↑•↓, nodo ↓•↓.
- **Gráfica de f(y)** junto a la línea de fase (la parábola de f(P) de la Conf 1, «cruza de arriba abajo» de la Conf 5).
- **Diagrama de bifurcación**: líneas de fase en fila para varios µ que se «funden» en el diagrama.
- **Euler**: segmentos que se trazan sobre el campo, punto a punto, con su tabla.

**Colores con significado** (fijos en toda la web, leyenda bajo cada escena): solución = **cian**; equilibrio
estable/sumidero = **verde**; inestable/fuente = **ámbar**; nodo = **violeta**; parámetro/lo que se ajusta = **ciruela**;
campo de pendientes = gris azulado tenue; aproximación numérica = ámbar punteado. Las fórmulas comparten colores
con el dibujo (`\htmlClass`).

## 8. Demostraciones solo para valientes

- **Cuáles**: lo que la conferencia enuncia o usa sin probar. Lista mínima: existencia (Picard), unicidad, «las
  soluciones no se cruzan», linealización, «solución acotada y monótona de una autónoma tiende a un equilibrio»,
  error de Euler ∝ Δt, «toda solución de y′ = a(t)y es k e^{∫a}», condición f = ∂f/∂y = 0 y «cuándo no hay
  bifurcación», equivalencia factor integrante ↔ variación de la constante. En los libros I–III (decisión del
  constructor): «la familia Ceᵏᵗ son todas las soluciones», «toda solución logística con P(0) > 0 tiende a N»,
  «separación de variables da todas las soluciones» y «traslaciones de soluciones autónomas son soluciones».
- **Botón**: «Demostración solo para valientes».
- **Transición**: exagerada a propósito, cómica: oscurecimiento total, iris que se cierra, cartelas de tráiler («En un
  mundo donde f es continua…», «Un teorema… se atrevió a garantizar…»), cámara que atraviesa el campo de
  pendientes, título que cae con impacto y polvo. Saltable con Esc / clic; respeta `prefers-reduced-motion`.
- **Formato**: arriba a la izquierda el enunciado; debajo la demostración exhaustiva y organizada (lemas numerados,
  pasos con su justificación); abajo, a todo lo ancho, una animación amplia del significado; «ideas que te llevas».
- **Rigor**: se demuestra todo lo que no se dio en conferencia. Solo se asumen resultados de Análisis de primer año,
  **nombrados** al usarlos (valor medio, teorema fundamental del cálculo, máximo en un compacto, valor intermedio,
  límite uniforme de continuas, convergencia monótona…).

## 9. Construcción (decisiones del constructor)

- HTML + CSS + JS (módulos ES) sin frameworks; KaTeX 0.18.9 y fuentes vendorizadas (copiadas de TeoriaNumeros);
  `./abrir-biblioteca` (servidor local) como en TeoriaNumeros.
- **Escenas en Canvas 2D** (HiDPI) redibujadas por fotograma —necesario para flujo continuo, campos con cientos de
  marcas y arrastre—, con una capa HTML superpuesta para rótulos KaTeX.
- Una escena = `capas` (una por paso). Estado dibujado = función pura de (entradas, paso, progreso p ∈ [0,1] del paso
  actual, tiempo τ para bucles). Los pasos anteriores se dibujan con p = 1. Determinista: ◀ y la tira funcionan.
- Numérica propia: RK4 de paso fino con parada en explosión/salida de la vista (para las curvas «exactas»), Euler,
  raíces por cambio de signo + bisección, derivada numérica. Parser seguro de expresiones (sin `eval`) para f(t, y)
  editable, que además produce LaTeX.
- Tests: numérica y parser (contra soluciones exactas), estructura del contenido, cobertura de diapositivas, KaTeX
  sin errores, notación (ni «/» ni «*» en fórmulas), cuentas de los ejemplos y de las CP; recorrido en Chromium sin
  errores de consola. Revisión visual renderizando solo páginas del proyecto (nunca la pantalla del usuario).
