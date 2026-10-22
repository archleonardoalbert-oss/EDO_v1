// Libro VI — Conferencia 6: Bifurcaciones y ecuaciones lineales.
// Texto LITERAL de la conferencia (fuentes/conf/conf6.pdf), repartido en temas y pasos.
const R = String.raw;

export default {
  numero: 6, romano: 'VI', color: 'cian',
  titulo: 'Bifurcaciones · Ecuaciones lineales',
  conferencia: 'Clase 6 · Profs. Alicia Pérez Figueredo y Damon Jorge Rubio',
  partes: [{ titulo: 'Parte I · Bifurcaciones', desde: 'bifurcacion' }, { titulo: 'Parte II · Ecuaciones lineales', desde: 'lineales' }],
  temas: [
    {
      id: 'bifurcacion', nombre: '¿Qué es una bifurcación? El modelo logístico con cosecha', diapositivas: [1, 2, 3],
      recuadro: { titulo: 'logístico con cosecha', texto: R`$$\dPdt = kP\left(1 - \frac{P}{N}\right) - C$$ $k$: tasa de crecimiento, $N$: capacidad de carga, $C$: tasa de cosecha (parámetro que podemos ajustar).` },
      explicacion: R`Mover un parámetro casi siempre cambia poco las cosas. Pero a veces un cambio pequeño cambia el destino: con la pesca, pasar cierto umbral hace que la población se extinga. Eso es una bifurcación.`,
      pasos: [
        { texto: R`<b>Bifurcaciones.</b> ¿Cómo cambia el comportamiento de una ecuación diferencial cuando variamos un parámetro?` },
        { texto: R`Una <b>variación mínima en el parámetro</b> usualmente da como resultado una pequeña modificación en la naturaleza de las soluciones. Sin embargo, en ocasiones el nuevo valor puede conducir a un <b>cambio drástico</b> en el comportamiento a largo plazo de las soluciones. A esto se le llama una <b>bifurcación</b>.` },
        { texto: R`<b>Ecuaciones con parámetros.</b> En los modelos reales, los parámetros (tasa de crecimiento, capacidad de carga, tasa de pesca) no son fijos. Pueden variar por causas naturales o por decisiones humanas.` },
        { texto: R`<b>Ejemplo: modelo logístico con cosecha.</b> $\dPdt = kP\left(1 - \frac{P}{N}\right) - C$, con $k$: tasa de crecimiento, $N$: capacidad de carga, $C$: tasa de cosecha (parámetro que podemos ajustar).` },
        { texto: R`¿Qué pasa con la población de peces cuando aumentamos $C$ gradualmente?` },
      ],
      escena: '6/bifurcacion',
      claves: [
        { idea: 'Parámetro = perilla', texto: R`Al estudiar un modelo, pregúntate qué parámetros se pueden mover (por la naturaleza o por decisión humana) y qué pasa si se mueven.` },
        { idea: 'Cambio cualitativo, no cuantitativo', texto: R`Una bifurcación no es «cambia un poco el valor de equilibrio»: es que aparecen o desaparecen equilibrios, o cambian de tipo.` },
      ],
    },
    {
      id: 'familias', nombre: R`Familias de un parámetro: $\dfrac{dy}{dt} = y^2 - 2y + \mu$`, diapositivas: [4, 5, 6, 7, 8, 9],
      recuadro: { titulo: 'familia de un parámetro', texto: R`Una colección de ecuaciones de la forma $\dydt = f_\mu(y)$, donde $\mu$ es el parámetro. Para cada valor de $\mu$ tenemos una ecuación diferente.` },
      explicacion: R`Una familia es una película: cada valor de $\mu$ es un fotograma con su propia línea de fase. Mientras $\mu < 1$ los fotogramas se parecen; al pasar $\mu = 1$, los dos equilibrios desaparecen.`,
      pasos: [
        { texto: R`<b>Familias de un parámetro.</b> Una familia de un parámetro de ecuaciones diferenciales es una colección de ecuaciones de la forma $\dydt = f_\mu(y)$ donde $\mu$ es el parámetro. Para cada valor de $\mu$ tenemos una ecuación diferente.` },
        { texto: R`$\dydt = y^2 - 2y + \mu$. Si $\mu = 0$: $\frac{dy}{dt} = y^2 - 2y$. Si $\mu = -4$: $\frac{dy}{dt} = y^2 - 2y - 4$. Si $\mu = 3$: $\frac{dy}{dt} = y^2 - 2y + 3$.` },
        { texto: R`<b>Análisis para $\mu = -2$.</b> Equilibrios: resolver $y^2 - 2y - 2 = 0$: $y = 1 \pm \sqrt3 \approx -0.73,\ 2.73$. $y = 1 - \sqrt3$ (menor): sumidero. $y = 1 + \sqrt3$ (mayor): fuente.` },
        { texto: R`Para otros valores de $\mu$, seguimos un procedimiento similar y podemos dibujar las líneas de fase.` },
        { texto: R`En los <b>3 primeros casos</b> ($\mu = -4, -2, 0$) la descripción básica es la misma: hay exactamente dos puntos de equilibrio; <b>el menor es un sumidero y el mayor es una fuente</b>. Aunque la posición exacta de esos puntos cambia cuando $\mu$ se incrementa, su posición relativa y tipo no cambian. <small>(La conferencia dice «cuando t se incrementa»: lo que cambia es $\mu$.)</small>`, marca: 'corregido' },
        { texto: R`Si $\mu = 2$ y $\mu = 4$, tenemos algo muy diferente. Aquí <b>no hay puntos de equilibrio</b>. Todas las soluciones tienden a $+\infty$ cuando $t$ crece y a $-\infty$ cuando $t$ decrece.` },
        { texto: R`Como hay un cambio importante en la naturaleza de las soluciones, decimos que ha <b>ocurrido una bifurcación</b> en alguna parte entre $\mu = 0$ y $\mu = 2$. (Figuras 1.78–1.80: líneas de fase y gráficas de las soluciones de $\frac{dy}{dt} = y^2 - 2y + \mu$.)` },
      ],
      escena: '6/familias',
      claves: [
        { idea: 'Una línea de fase por valor del parámetro', texto: R`Dibuja varias líneas de fase en fila, una por $\mu$: la bifurcación se ve donde la fila cambia de aspecto.` },
        { idea: 'Buscar el valor entre dos comportamientos', texto: R`Si para $\mu = 0$ hay dos equilibrios y para $\mu = 2$ ninguno, la bifurcación está entre ambos: búscala con álgebra (siguiente tema).` },
      ],
    },
    {
      id: 'analisis-bifurcacion', nombre: R`Análisis de la bifurcación: $y = 1 \pm \sqrt{1 - \mu}$`, diapositivas: [10, 11],
      explicacion: R`La fórmula de los equilibrios lo dice todo: la raíz $\sqrt{1 - \mu}$ es real mientras $\mu < 1$, vale $0$ en $\mu = 1$ y deja de existir después. Gráficamente, la parábola $f_\mu$ sube con $\mu$ hasta despegarse del eje.`,
      pasos: [
        { texto: R`<b>Equilibrios según el parámetro $\mu$.</b> Las raíces de la ecuación cuadrática $y^2 - 2y + \mu = 0 \Rightarrow y = 1 \pm \sqrt{1 - \mu}$ dependen del valor de $\mu$:` },
        { texto: R`Si $\mu < 1$: dos raíces reales ⇒ dos puntos de equilibrio.` },
        { texto: R`Si $\mu = 1$: una raíz doble ⇒ un punto de equilibrio.` },
        { texto: R`Si $\mu > 1$: ninguna raíz real ⇒ ningún punto de equilibrio.` },
        { texto: R`La naturaleza cualitativa de la línea de fase cambia cuando $\mu = 1$. Decimos que ocurre una <b>bifurcación en $\mu = 1$</b>, y que este es el <b>valor de bifurcación</b>. (Figuras 1.81 y 1.82: gráficas de $f_\mu$ y líneas de fase para $\mu$ ligeramente menor que $1$, igual a $1$ y ligeramente mayor.)` },
      ],
      escena: '6/analisis-bifurcacion',
      claves: [
        { idea: 'El discriminante como detector', texto: R`Cuando los equilibrios son raíces de una cuadrática, la bifurcación ocurre donde el discriminante se anula.` },
        { idea: 'Gráfica de f subiendo', texto: R`Sumar $\mu$ a $f$ desplaza su gráfica hacia arriba: los cortes con el eje (equilibrios) se acercan y se pierden cuando la parábola deja de tocar el eje.` },
      ],
    },
    {
      id: 'definicion-bifurcacion', nombre: 'Definición y cálculo del valor de bifurcación', diapositivas: [12, 13],
      recuadro: { titulo: 'método general', texto: R`Para encontrar los valores de bifurcación de $\dydt = f_\mu(y)$, resolver el sistema $$\begin{cases} f_\mu(y) = 0 & \text{(equilibrio)}\\ \dfrac{\partial f_\mu}{\partial y}(y) = 0 & \text{(tangencia)}\end{cases}$$` },
      explicacion: R`En el instante de la bifurcación, la gráfica de $f_\mu$ toca el eje sin cruzarlo: es tangente. Tangente al eje significa dos condiciones a la vez: valor $0$ y pendiente $0$.`,
      pasos: [
        { texto: R`<b>¿Qué es una bifurcación?</b> Decimos que una familia de ecuaciones diferenciales <b>bifurca</b> si hay un cambio cualitativo en el comportamiento de las soluciones cuando el parámetro cruza un valor crítico.` },
        { texto: R`La bifurcación ocurre cuando $f_\mu$ y su derivada se anulan simultáneamente.` },
        { texto: R`<b>Método general.</b> Para encontrar los valores de bifurcación de $\dydt = f_\mu(y)$: 1. Resolver el sistema $f_\mu(y) = 0$ (equilibrio), $\frac{\partial f_\mu}{\partial y}(y) = 0$ (tangencia). 2. Las soluciones de este sistema son los valores de bifurcación.` },
        { texto: R`<b>Aplicado al ejemplo.</b> $f_\mu(y) = y^2 - 2y + \mu = 0$. $\frac{\partial f_\mu}{\partial y} = 2y - 2 = 0 \Rightarrow y = 1$. Sustituyendo: $1 - 2 + \mu = 0 \Rightarrow \mu = 1$.` },
      ],
      escena: '6/definicion-bifurcacion',
      claves: [
        { idea: 'Dos ecuaciones, dos incógnitas', texto: R`El sistema tiene incógnitas $y$ y $\mu$: de $\frac{\partial f}{\partial y} = 0$ suele salir $y$, y al sustituir en $f = 0$ sale el $\mu$ crítico.` },
        { idea: 'Condición necesaria, no suficiente', texto: R`Si $f'_\mu(y_0) \ne 0$ en un equilibrio, cerca no hay bifurcación (⚔ valientes); por eso hay que buscar donde ambas se anulan. Pero conviene comprobar con las líneas de fase que de verdad cambia algo.` },
      ],
    },
    {
      id: 'diagrama', nombre: 'Diagrama de bifurcación', diapositivas: [14, 15],
      recuadro: { titulo: 'diagrama de bifurcación', texto: R`Representación gráfica que muestra cómo cambian los equilibrios (y su estabilidad) al variar el parámetro. Eje horizontal: el parámetro $\mu$. Eje vertical: los valores de equilibrio $y$.` },
      explicacion: R`Ponemos cada línea de fase vertical en su $\mu$ y juntamos muchas: los equilibrios dibujan curvas (ramas). Aquí, una parábola acostada: rama de abajo estable, de arriba inestable, que se unen en $\mu = 1$.`,
      pasos: [
        { texto: R`El <b>diagrama de bifurcación</b> es una representación gráfica que muestra cómo cambian los equilibrios (y su estabilidad) al variar el parámetro. Eje horizontal: el parámetro $\mu$. Eje vertical: los valores de equilibrio $y$.` },
        { texto: R`Para $\dydt = y^2 - 2y + \mu$: para $\mu < 1$: dos ramas (una estable, una inestable).` },
        { texto: R`Para $\mu = 1$: las ramas se juntan en $y = 1$. Para $\mu > 1$: no hay ramas.` },
        { texto: R`<b>Al aumentar $\mu$, los dos equilibrios se acercan, se fusionan y desaparecen.</b>` },
      ],
      escena: '6/diagrama',
      claves: [
        { idea: 'Diagrama = líneas de fase pegadas', texto: R`Cada columna vertical del diagrama es la línea de fase de ese $\mu$. Los equilibrios forman la curva $f_\mu(y) = 0$ en el plano $(\mu, y)$.` },
        { idea: 'Despejar el parámetro', texto: R`Para dibujar las ramas, a veces es más fácil despejar $\mu$ de $f_\mu(y) = 0$: aquí $\mu = 2y - y^2$, una parábola en $y$.` },
      ],
    },
    {
      id: 'no-bifurcacion', nombre: '¿Cuándo no hay bifurcación?', diapositivas: [16], valiente: 'v-no-bifurcacion',
      recuadro: { titulo: 'principio general', texto: R`Los cambios pequeños en el parámetro usualmente no cambian la naturaleza cualitativa de las soluciones. Las bifurcaciones son la excepción, no la regla.` },
      explicacion: R`Un equilibrio que cruza el eje con pendiente no nula es robusto: si mueves un poco $\mu$, la gráfica se mueve un poco y sigue cruzando, en un punto cercano y del mismo modo.`,
      pasos: [
        { texto: R`<b>Principio general.</b> Los cambios pequeños en el parámetro usualmente no cambian la naturaleza cualitativa de las soluciones. Las bifurcaciones son la excepción, no la regla.` },
        { texto: R`Si $y_0$ es un equilibrio con $f'_{\mu_0}(y_0) \ne 0$, entonces para $\mu$ suficientemente cercano a $\mu_0$: existe un equilibrio $y_1$ cercano a $y_0$.` },
        { texto: R`El tipo de equilibrio (sumidero/fuente) no cambia.` },
      ],
      escena: '6/no-bifurcacion',
      claves: [
        { idea: 'Cruzar el eje es robusto, tocarlo no', texto: R`Una gráfica que cruza el eje con pendiente sigue cruzándolo tras una pequeña perturbación; una que solo lo toca (pendiente $0$) puede despegarse o cortarlo dos veces.` },
        { idea: 'Contrarrecíproco útil', texto: R`Si hay bifurcación en $\mu_0$, entonces algún equilibrio tiene $f'_{\mu_0}(y_0) = 0$: de ahí sale el método de cálculo.` },
      ],
    },
    {
      id: 'lineales', nombre: 'Ecuaciones lineales', diapositivas: [17, 18, 19],
      recuadro: { titulo: 'definición', texto: R`Una ecuación diferencial de primer orden es <b>lineal</b> si se puede escribir en la forma $$\dydt = a(t)y + b(t),$$ donde $a(t)$ y $b(t)$ son funciones de $t$ (posiblemente constantes).` },
      explicacion: R`«Lineal» es en $y$: la incógnita aparece sola, a la primera potencia, multiplicada por algo que solo depende de $t$. Nada de $y^2$, $\sin y$ ni $e^y$.`,
      pasos: [
        { texto: R`<b>PARTE II: Ecuaciones lineales. Definición.</b> Una ecuación diferencial de primer orden es lineal si se puede escribir en la forma $\dydt = a(t)y + b(t)$ donde $a(t)$ y $b(t)$ son funciones de $t$ (posiblemente constantes).` },
        { texto: R`<b>Ejemplos.</b> $\dydt = t^2y + \cos t$ ✓ (lineal). $\dydt = 2y + 8$ ✓ (lineal, autónoma). $\dydt = y^2$ (no lineal). $\dydt = e^t\sin y$ (no lineal).` },
        { texto: R`<b>Observación.</b> El término «lineal» se refiere a que la variable dependiente aparece solo a la primera potencia.` },
        { texto: R`<b>Homogénea:</b> $b(t) = 0$ para todo $t$: $\dydt = a(t)y$. <b>No homogénea:</b> $b(t) \ne 0$: $\dydt = a(t)y + b(t)$.` },
        { texto: R`Ejemplos: $\dydt = (\sin 2t)y$ (homogénea). $\dydt = y + \sin 2t$ (no homogénea).` },
      ],
      escena: '6/lineales',
      claves: [
        { idea: 'Test de linealidad', texto: R`Fija $t$: si el lado derecho es una recta en $y$ (de la forma $ay + b$), es lineal. Para $y^2$ o $\sin y$, la gráfica en $y$ no es una recta.` },
        { idea: 'Homogénea: y ≡ 0 siempre es solución', texto: R`Si $b \equiv 0$, la función nula es solución. Es la primera pista para distinguir homogénea de no homogénea.` },
      ],
    },
    {
      id: 'linealidad', nombre: 'Principio de linealidad y solución de la homogénea', diapositivas: [20, 21, 22], valiente: 'v-lineal-todas',
      recuadro: { titulo: 'principio de linealidad (homogéneas)', texto: R`Si $y_h(t)$ es una solución de la ecuación homogénea $\dydt = a(t)y$, entonces cualquier múltiplo constante $k\,y_h(t)$ también es solución.` },
      explicacion: R`En una homogénea, escalar una solución da otra solución. Basta encontrar una solución no nula, $e^{\int a}$, para tener todas: $k\,e^{\int a}$.`,
      pasos: [
        { texto: R`<b>Principio de linealidad (ec. lineales homogéneas).</b> Si $y_h(t)$ es una solución de la ecuación homogénea $\dydt = a(t)y$, entonces cualquier múltiplo constante $k\,y_h(t)$ también es solución.` },
        { texto: R`<b>Demostración.</b> Si $y_h' = a(t)y_h$, entonces: $(ky_h)' = ky_h' = ka(t)y_h = a(t)(ky_h)$. Por tanto, $ky_h$ también es solución.` },
        { texto: R`Este principio nos permite construir familias de soluciones a partir de una sola.` },
        { texto: R`<b>Solución general de la ecuación homogénea.</b> La solución general de $\dydt = a(t)y$ es $y(t) = k\,e^{\int a(t)\,dt}$ donde $k$ es una constante arbitraria.` },
        { texto: R`La solución de equilibrio $y(t) = 0$ para todo $t$ es solución de cualquier ecuación homogénea.` },
        { texto: R`<b>Ejemplo</b> para $\dydt = (\cos t)y$: $y(t) = k\,e^{\int \cos t\,dt} = k\,e^{\sin t}$. Todas las soluciones son múltiplos constantes de $e^{\sin t}$ (figura 1.93).` },
      ],
      escena: '6/linealidad',
      claves: [
        { idea: 'Escalar soluciones', texto: R`Para comprobar una propiedad «para todo múltiplo», deriva $ky$ y saca $k$ fuera: la linealidad de la derivada hace el resto.` },
        { idea: 'Una solución no nula basta', texto: R`En una homogénea de primer orden, todas las soluciones son múltiplos de una sola no nula (⚔ valientes: no hay otras).` },
      ],
    },
    {
      id: 'limites-linealidad', nombre: 'Advertencia: el principio de linealidad tiene límites', diapositivas: [23],
      explicacion: R`El principio usa que derivar y multiplicar por $a(t)$ respetan las constantes. Con $y^2$, duplicar $y$ cuadruplica el lado derecho pero solo duplica la derivada: deja de cuadrar.`,
      pasos: [
        { texto: R`El Principio de Linealidad aplica solo a ecuaciones lineales homogéneas. No se puede usar en ecuaciones no lineales, aunque la ecuación parezca sencilla.` },
        { texto: R`<b>Ejemplo:</b> $\dydt = y^2$. $y_1(t) = \dfrac{1}{1 - t}$ es solución: $\dfrac{dy_1}{dt} = \dfrac{1}{(1 - t)^2} = \left(\dfrac{1}{1 - t}\right)^2 = y_1^2$ ✓.` },
        { texto: R`$y_2(t) = 2y_1(t) = \dfrac{2}{1 - t}$ <b>no es solución</b>: $\dfrac{dy_2}{dt} = \dfrac{2}{(1 - t)^2} \ne \left(\dfrac{2}{1 - t}\right)^2 = y_2^2$ ✗.` },
      ],
      escena: '6/limites-linealidad',
      claves: [
        { idea: 'Probar con k = 2', texto: R`Para ver si una ecuación respeta múltiplos, sustituye $2y$: si el lado derecho no se duplica exactamente, no es lineal homogénea.` },
        { idea: 'No lineal ⇒ no se superponen', texto: R`En ecuaciones no lineales, ni los múltiplos ni las sumas de soluciones son soluciones en general.` },
      ],
    },
    {
      id: 'linealidad-extendida', nombre: 'Principio de linealidad extendido', diapositivas: [24],
      recuadro: { titulo: 'solución general de la no homogénea', texto: R`$$y(t) = \underbrace{k\,y_h(t)}_{\text{solución homogénea}} + \underbrace{y_p(t)}_{\text{solución particular}}$$` },
      explicacion: R`Todas las soluciones de la no homogénea son «una cualquiera de ellas, más algo que resuelve la homogénea». La diferencia entre dos soluciones no homogéneas siempre es homogénea.`,
      pasos: [
        { texto: R`<b>Principio de linealidad extendido.</b> Consideremos la ecuación no homogénea $\dydt = a(t)y + b(t)$ y su homogénea asociada $\dydt = a(t)y$.` },
        { texto: R`1. Si $y_h$ es solución de la homogénea, $y_p$ es solución de la no homogénea, entonces $y_h + y_p$ también es solución de la no homogénea.` },
        { texto: R`2. Si $y_p$ e $y_q$ son dos soluciones de la no homogénea, entonces $y_p - y_q$ es solución de la homogénea.` },
        { texto: R`La solución general de la no homogénea es: $y(t) = k\,y_h(t) + y_p(t)$ (solución homogénea + solución particular).` },
      ],
      escena: '6/linealidad-extendida',
      claves: [
        { idea: 'Diferencia de dos soluciones', texto: R`$(y_p - y_q)' = a y_p + b - a y_q - b = a(y_p - y_q)$: restar cancela el término $b$. Es la idea que hace funcionar todo el método.` },
        { idea: 'Dos tareas separadas', texto: R`Resolver una lineal = (1) resolver la homogénea (fácil: $e^{\int a}$) + (2) encontrar <em>una</em> particular (coeficientes indeterminados, variación de la constante…).` },
      ],
    },
    {
      id: 'coeficientes-indeterminados', nombre: 'Método de coeficientes indeterminados', diapositivas: [25, 26, 27],
      recuadro: { titulo: 'reglas básicas', texto: R`Si $b(t)$ es un polinomio de grado $n$: proponer $y_p$ polinomio de grado $n$. Si $b(t) = e^{at}$: proponer $y_p = \alpha e^{at}$. Si $b(t) = \cos(\omega t)$ o $\sin(\omega t)$: proponer $y_p = \alpha\cos(\omega t) + \beta\sin(\omega t)$.` },
      explicacion: R`Adivinar con fundamento: si $b(t)$ es de cierta «familia» (polinomios, exponenciales, senos), las derivadas no salen de esa familia, así que una particular de la misma forma con coeficientes por determinar funciona.`,
      pasos: [
        { texto: R`<b>Ejemplo resuelto:</b> $\dydt = -2y + e^t$. <b>Paso 1: solución homogénea.</b> La homogénea es $\dydt = -2y$, cuya solución general es $y_h(t) = k\,e^{-2t}$.` },
        { texto: R`<b>Paso 2: buscar una solución particular.</b> Proponemos $y_p(t) = \alpha e^t$ (método del coeficiente indeterminado). $\alpha e^t + 2\alpha e^t = e^t \Rightarrow 3\alpha = 1 \Rightarrow \alpha = \frac13$. Así, $y_p(t) = \frac13 e^t$.` },
        { texto: R`Solución general: $y(t) = k\,e^{-2t} + \frac13 e^t$.` },
        { texto: R`<b>Idea del método.</b> Para encontrar una solución particular $y_p$ de una ecuación no homogénea, proponemos una forma basada en $b(t)$ y dejamos los coeficientes como incógnitas.` },
        { texto: R`<b>Reglas básicas.</b> Si $b(t)$ es un polinomio de grado $n$: proponer $y_p$ como polinomio de grado $n$. Si $b(t) = e^{at}$: proponer $y_p = \alpha e^{at}$. Si $b(t) = \cos(\omega t)$ o $\sin(\omega t)$: proponer $y_p = \alpha\cos(\omega t) + \beta\sin(\omega t)$.` },
        { texto: R`<b>Ejemplo:</b> $\dydt + 2y = \cos 3t$. Paso 1: $y_h(t) = k\,e^{-2t}$. Paso 2: proponemos $y_p(t) = \alpha\cos 3t + \beta\sin 3t$. $y_p' + 2y_p = (2\alpha + 3\beta)\cos 3t + (-3\alpha + 2\beta)\sin 3t$.` },
        { texto: R`Igualando con $\cos 3t$: $2\alpha + 3\beta = 1$, $-3\alpha + 2\beta = 0$. Solución general: $y(t) = k\,e^{-2t} + \frac{2}{13}\cos 3t + \frac{3}{13}\sin 3t$.` },
      ],
      escena: '6/coeficientes',
      claves: [
        { idea: 'Familias cerradas por derivación', texto: R`Polinomios de grado $\le n$, múltiplos de $e^{at}$ y combinaciones de $\cos\omega t$, $\sin\omega t$ se quedan en su familia al derivar: por eso el método funciona con ellos.` },
        { idea: 'Seno y coseno siempre juntos', texto: R`Aunque $b$ sea solo $\cos 3t$, propón $\alpha\cos 3t + \beta\sin 3t$: la derivada mezcla ambos.` },
        { idea: 'Igualar coeficientes', texto: R`Una igualdad de funciones $A\cos 3t + B\sin 3t = \cos 3t$ para todo $t$ obliga a $A = 1$, $B = 0$ (evalúa en $t = 0$ y en $t = \frac{\pi}{6}$).` },
      ],
    },
  ],
  resumen: {
    titulo: 'Resumen de la clase', diapositivas: [28, 29],
    bloques: [
      { titulo: 'Parte I: Bifurcaciones', items: [
        R`Las familias de un parámetro son ecuaciones de la forma $\frac{dy}{dt} = f_\mu(y)$.`,
        R`Una bifurcación ocurre cuando cambia cualitativamente el comportamiento.`,
        R`El valor de bifurcación se encuentra resolviendo $f_\mu(y) = 0$ y $\frac{\partial f_\mu}{\partial y} = 0$.`,
        R`El diagrama de bifurcación muestra cómo cambian los equilibrios con el parámetro.`,
      ] },
      { titulo: 'Parte II: Ecuaciones lineales', items: [
        R`Forma general: $\frac{dy}{dt} = a(t)y + b(t)$.`,
        R`La solución general es $y = k\,y_h + y_p$.`,
        R`El método de coeficientes indeterminados encuentra $y_p$.`,
      ] },
    ],
  },
};
