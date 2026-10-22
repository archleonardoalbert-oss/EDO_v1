// Libro IV — Conferencia 4: Técnica numérica. Método de Euler. Existencia y unicidad.
// Texto LITERAL de la conferencia (fuentes/conf/conf4.pdf), repartido en temas y pasos.
const R = String.raw;

export default {
  numero: 4, romano: 'IV', color: 'verde',
  titulo: 'Método de Euler · Existencia y unicidad',
  conferencia: 'Clase 4 · Técnica numérica · Profs. Alicia Pérez Figueredo y Damon Jorge Rubio',
  temas: [
    {
      id: 'por-que-numericos', nombre: '¿Por qué métodos numéricos? La idea geométrica de Euler', diapositivas: [1, 2, 3, 4],
      recuadro: { titulo: 'idea clave', texto: R`En lugar de resolver la ecuación diferencial, <b>aproximamos</b> la solución con pequeños segmentos de recta que siguen la dirección del campo. Mientras más pequeño $\Delta t$, mejor será la aproximación.` },
      explicacion: R`Euler hace lo mismo que tú al dibujar soluciones a mano sobre el campo (Libro III), pero con una regla exacta: un trozo de recta con la pendiente del punto donde estás, de longitud horizontal $\Delta t$, y repetir.`,
      pasos: [
        { texto: R`<b>Pregunta natural.</b> ¿Qué hacemos si queremos un valor numérico concreto de la solución, por ejemplo $y(2)$, pero no podemos resolver la ecuación analíticamente?` },
        { texto: R`Usamos <b>métodos numéricos</b>. Estos aproximan la solución paso a paso. <em>En la práctica, los métodos numéricos son una de las herramientas que van a utilizar con mayor frecuencia.</em>` },
        { texto: R`<b>Recuerden:</b> la gráfica de toda solución es una curva tangente al campo de pendientes en cada punto (ver clase 3).` },
        { texto: R`<b>Estrategia de Euler.</b> 1. Partir del punto inicial $(t_0, y_0)$ (la condición inicial del PVI). 2. Dar un paso pequeño $\Delta t$ en la dirección de la pendiente $f(t_0, y_0)$.` },
        { texto: R`3. Llegar a un nuevo punto $(t_1, y_1)$. 4. Repetir el mismo proceso desde $(t_1, y_1)$.` },
        { texto: R`<b>Idea clave.</b> En lugar de resolver la ecuación diferencial, aproximamos la solución con pequeños segmentos de recta que siguen la dirección del campo. Mientras más pequeño $\Delta t$ mejor será la aproximación.` },
      ],
      escena: '4/por-que-numericos',
      claves: [
        { idea: 'Un método numérico es una receta repetible', texto: R`Lo que hacías «a ojo» sobre el campo se convierte en una regla exacta que un programa puede repetir miles de veces.` },
        { idea: 'Precisión a cambio de trabajo', texto: R`Pasos más pequeños dan mejores aproximaciones pero exigen más pasos: para llegar a $t = 2$ con $\Delta t = 0.01$ hacen falta 200.` },
      ],
    },
    {
      id: 'formula-euler', nombre: 'El método de Euler: definición y obtención de la fórmula', diapositivas: [5, 6, 7, 8, 9, 10],
      recuadro: { titulo: 'esquema iterativo', texto: R`Dado el PVI $\dydt = f(t, y)$, $y(t_0) = y_0$, elegimos un tamaño de paso $\Delta t$ y calculamos $$t_{k+1} = t_k + \Delta t, \qquad y_{k+1} = y_k + f(t_k, y_k)\cdot\Delta t, \qquad k = 0, 1, 2, 3, \dots$$` },
      explicacion: R`La fórmula sale de una sola suposición: el siguiente punto está sobre la recta tangente. «Pendiente = subida entre avance», con avance $\Delta t$, da la subida $f(t_k, y_k)\cdot\Delta t$.`,
      pasos: [
        { texto: R`<b>Problema a resolver.</b> Dado el problema de valor inicial $\dydt = f(t, y)$, $y(t_0) = y_0$.` },
        { texto: R`<b>Esquema iterativo.</b> Elegimos un tamaño de paso $\Delta t$ y calculamos: $t_{k+1} = t_k + \Delta t$, $y_{k+1} = y_k + f(t_k, y_k)\cdot\Delta t$, para $k = 0, 1, 2, 3, \dots$` },
        { texto: R`<b>Obtención de la fórmula. Punto de partida.</b> Conocemos la pendiente de la solución en cada punto (está dada por la EDO): $\dydt = f(t, y)$. En particular, en el punto $(t_k, y_k)$, la pendiente es $f(t_k, y_k)$.` },
        { texto: R`<b>Suposición geométrica.</b> Euler supone que el siguiente punto de la solución $(t_{k+1}, y_{k+1})$ se encuentra sobre la <b>recta tangente</b> que pasa por $(t_k, y_k)$ con pendiente $f(t_k, y_k)$.` },
        { texto: R`La pendiente de la recta que une $(t_k, y_k)$ con $(t_{k+1}, y_{k+1})$ es: $$\frac{y_{k+1} - y_k}{t_{k+1} - t_k} = f(t_k, y_k)$$` },
        { texto: R`<b>Sustituir el tamaño de paso.</b> Como $t_{k+1} - t_k = \Delta t$, la ecuación queda: $$\frac{y_{k+1} - y_k}{\Delta t} = f(t_k, y_k)$$` },
        { texto: R`<b>Despejando $y_{k+1}$ se obtiene la fórmula iterativa del método de Euler:</b> $$y_{k+1} = y_k + f(t_k, y_k)\,\Delta t$$` },
      ],
      escena: '4/formula-euler',
      claves: [
        { idea: 'Nuevo = viejo + pendiente × paso', texto: R`Toda la fórmula es «avanzar $\Delta t$ en horizontal sube pendiente·$\Delta t$ en vertical». Si la olvidas, la reconstruyes del triángulo.` },
        { idea: 'La pendiente se evalúa al principio del paso', texto: R`Euler usa $f(t_k, y_k)$, la del punto de partida, durante todo el paso. Por eso se queda atrás cuando la curva se tuerce (y por eso existen métodos mejores, como Runge-Kutta).` },
      ],
    },
    {
      id: 'ejemplo-euler', nombre: R`Ejemplo: $\dfrac{dy}{dt} = 2y - 1$, $y(0) = 1$ con $\Delta t = 0.1$`, diapositivas: [11, 12, 13, 14],
      explicacion: R`Tres pasos a mano, con la tabla que se llena y el dibujo que crece. Luego se compara con la solución exacta, que queda por encima: los segmentos de Euler se quedan cortos porque la curva se empina.`,
      pasos: [
        { texto: R`Sea el PVI $\dydt = 2y - 1$, $y(0) = 1$. Usamos $\Delta t = 0.1$ para aproximar $y(1)$. $f(t, y) = 2y - 1$, $y(0) = y_0 = 1$.` },
        { texto: R`Usando $y_{k+1} = y_k + f(t_k, y_k)\,\Delta t$: $t_1 = 0.1 \Rightarrow y_1 = 1 + (2\cdot 1 - 1)(0.1) = 1 + 0.1 = 1.1$` },
        { texto: R`$t_2 = 0.2 \Rightarrow y_2 = 1.1 + (2\cdot 1.1 - 1)(0.1) = 1.1 + 0.12 = 1.22$` },
        { texto: R`$t_3 = 0.3 \Rightarrow y_3 = 1.22 + (2\cdot 1.22 - 1)(0.1) = 1.364$` },
        { texto: R`<b>Comparación con la solución exacta.</b> La solución analítica es $y(t) = \dfrac{e^{2t} + 1}{2}$. ¡Compruébalo! (Derivando: $y' = e^{2t}$ y $2y - 1 = e^{2t} + 1 - 1 = e^{2t}$ ✓.)` },
      ],
      escena: '4/ejemplo-euler',
      claves: [
        { idea: 'Tabla de tres columnas', texto: R`Lleva siempre $k$, $t_k$, $y_k$ y la pendiente $f(t_k, y_k)$ en una tabla: cada fila sale de la anterior con una multiplicación y una suma.` },
        { idea: 'Si la solución es convexa, Euler subestima', texto: R`Cuando la curva se curva hacia arriba, la tangente queda por debajo y cada paso de Euler se queda corto. Mirar la convexidad dice el signo del error.` },
      ],
    },
    {
      id: 'error-euler', nombre: 'Error y tamaño de paso', diapositivas: [15], valiente: 'v-error-euler',
      recuadro: { titulo: 'fórmula del error', texto: R`El error total después de $n$ pasos es aproximadamente $$e_n \approx C\cdot\Delta t,$$ donde $C$ es una constante que depende del problema y del intervalo de integración.` },
      explicacion: R`Dividir el paso entre $2$ divide el error (aproximadamente) entre $2$. Por eso Euler se llama un método de primer orden: el error es proporcional a $\Delta t^1$.`,
      pasos: [
        { texto: R`<b>Observación clave.</b> Al reducir $\Delta t$, el error del método de Euler disminuye. ¿Cómo? <b>Proporcionalmente.</b>` },
        { texto: R`<b>Fórmula del error.</b> El error total después de $n$ pasos es aproximadamente $e_n \approx C\cdot\Delta t$, donde $C$ es una constante que depende del problema y del intervalo de integración.` },
        { texto: R`Próximamente veremos cómo reducir este error con el método de Runge-Kutta.` },
      ],
      escena: '4/error-euler',
      claves: [
        { idea: 'Comprobar el orden de un método', texto: R`Calcula con $\Delta t$ y con $\frac{\Delta t}{2}$: si el error se reduce a la mitad, es de primer orden. Si se reduce a la cuarta parte, de segundo orden.` },
        { idea: 'El error crece con el intervalo', texto: R`$C$ depende de cuánto integras: errores pequeños en cada paso se acumulan (y pueden amplificarse) a lo largo de muchos pasos.` },
      ],
    },
    {
      id: 'limitaciones', nombre: R`Limitaciones de Euler: $\dfrac{dy}{dt} = e^t\sin y$, y cuándo confiar`, diapositivas: [16, 17, 18],
      explicacion: R`Cuando las pendientes son enormes, un paso fijo «se pasa de largo»: salta por encima del equilibrio al que la solución verdadera nunca llegaría. Reducir $\Delta t$ solo retrasa el desastre.`,
      pasos: [
        { texto: R`<b>Caso problemático:</b> $\dydt = e^t\sin y$. Los equilibrios son $y = n\pi$ para todo entero $n$.` },
        { texto: R`<b>Comportamiento numérico inesperado.</b> Con $y(0) = 5$ y $\Delta t = 0.1$: al principio, la solución numérica tiende hacia $y = \pi$.` },
        { texto: R`Pero cerca de $t = 5$, ¡la solución numérica salta bruscamente!` },
        { texto: R`Al reducir $\Delta t$ a $0.05$, el salto ocurre un poco más tarde, pero sigue apareciendo. <b>Resuelve numéricamente este PVI para distintos valores de $\Delta t$.</b>` },
        { texto: R`<b>¿Qué está pasando?</b> El término $e^t$ crece muy rápido. Cuando $t$ es grande, las pendientes del campo son enormes, y Euler «se pasa» de largo, alejándose de la solución verdadera. <b>El método numérico falla.</b>` },
        { texto: R`<b>¿Cuándo podemos confiar en el método numérico? Herramientas para validar:</b> 1. Reducir $\Delta t$: si la solución cambia mucho, el método no es confiable. 2. Comparar con la solución analítica (si la conocemos). 3. Verificar el comportamiento cualitativo: ¿la solución respeta los equilibrios y las regiones del campo?` },
        { texto: R`Los métodos numéricos son muy útiles, pero <b>no son infalibles</b>. Siempre hay que validar los resultados con teoría.` },
      ],
      escena: '4/limitaciones',
      claves: [
        { idea: 'Paso × pendiente debe ser pequeño', texto: R`Euler es fiable cuando $\Delta t\cdot|f|$ (y $\Delta t\cdot\left|\frac{\partial f}{\partial y}\right|$) son pequeños frente a la escala del problema. Si las pendientes crecen sin límite, ningún paso fijo basta.` },
        { idea: 'Que la teoría vigile al ordenador', texto: R`Si la aproximación cruza un equilibrio, la unicidad (tema 7) dice que eso es imposible para la solución verdadera: el error es numérico.` },
      ],
    },
    {
      id: 'existencia', nombre: 'Existencia de soluciones; una solución que explota', diapositivas: [19, 20, 21, 22, 23], valiente: 'v-existencia',
      recuadro: { titulo: 'teorema de existencia', texto: R`Sea $f(t, y)$ una función continua en un rectángulo $R = \{(t, y) : a < t < b,\ c < y < d\}$ del plano $ty$. Si $(t_0, y_0)$ es un punto de $R$, entonces existe un $\varepsilon > 0$ y una función $y(t)$ definida para $t_0 - \varepsilon < t < t_0 + \varepsilon$ que satisface el PVI $\dydt = f(t, y)$, $y(t_0) = y_0$.` },
      explicacion: R`El teorema garantiza que hay solución cerca del punto inicial, aunque no sepamos cuál es. Solo promete un intervalo pequeño: $y' = 1 + y^2$ tiene $f$ continua en todo el plano y aun así su solución explota en $t = \frac{\pi}{2}$.`,
      pasos: [
        { texto: R`<b>¿Cómo sabemos que hay soluciones?</b> Si no existen soluciones a las ecuaciones diferenciales, no tiene caso tratar de encontrarlas o aproximarlas. Más importante aún es que si una ecuación diferencial modela supuestamente un sistema físico, pero no existen soluciones para la ecuación diferencial, entonces deberíamos tener serias dudas sobre la validez del modelo.` },
        { texto: R`Si nos dan un PVI $\dydt = f(t, y)$, $y(t_0) = y_0$, podemos preguntar si existe una solución. Esto es diferente a preguntar cuál es ella o cómo se ve la gráfica de la ecuación. Podemos decir que hay una solución sin tener ningún conocimiento de una fórmula para ésta.` },
        { texto: R`<b>Teorema de Existencia.</b> Sea $f(t, y)$ una función continua en un rectángulo $R = \{(t, y) : a < t < b,\ c < y < d\}$ del plano $ty$. Si $(t_0, y_0)$ es un punto de $R$, entonces existe un $\varepsilon > 0$ y una función $y(t)$ definida para $t_0 - \varepsilon < t < t_0 + \varepsilon$ que satisface el PVI.` },
        { texto: R`El teorema garantiza que hay solución, pero <b>solo en un intervalo pequeño</b>. La solución puede dejar de existir después (por ejemplo, si «explota»).` },
        { texto: R`<b>Ejemplo: solución que explota en tiempo finito.</b> $\dydt = 1 + y^2$, $y(0) = 0$. Separando e integrando: $\displaystyle\int \frac{dy}{1 + y^2} = \int dt \Rightarrow \arctan y = t + C$. Con $y(0) = 0$: $C = 0$, por lo que $y(t) = \tan t$.` },
        { texto: R`<b>Dominio de definición.</b> La solución $y(t) = \tan t$ tiene asíntotas verticales en $t = \pm\frac{\pi}{2}$. Por tanto, solo está definida en el intervalo $\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$. Cuando $t \to \frac{\pi}{2}^-$, la solución tiende a $+\infty$ en <b>tiempo finito</b>.` },
        { texto: R`Por el teorema de existencia sabemos que hay una solución, pero ¿cómo sabemos que hay sólo una?` },
      ],
      escena: '4/existencia',
      claves: [
        { idea: 'Existencia ≠ fórmula', texto: R`El teorema solo pide continuidad de $f$; no dice cómo es la solución ni da una fórmula. Es una garantía, no un método.` },
        { idea: 'Local quiere decir local', texto: R`«Existe en $(t_0 - \varepsilon, t_0 + \varepsilon)$» no significa «existe para siempre». Si $f$ crece como $y^2$ o más, sospecha de explosión en tiempo finito.` },
      ],
    },
    {
      id: 'unicidad', nombre: 'Unicidad: las soluciones no se cruzan', diapositivas: [24, 25], valiente: 'v-unicidad',
      recuadro: { titulo: 'teorema de unicidad', texto: R`Sea $f(t, y)$ y su derivada parcial $\frac{\partial f}{\partial y}$ funciones continuas en un rectángulo $R$. Si $(t_0, y_0) \in R$ y si $y_1(t)$ e $y_2(t)$ son dos soluciones del PVI $\dydt = f(t, y)$, $y(t_0) = y_0$ para $t$ en un intervalo alrededor de $t_0$, entonces $y_1(t) = y_2(t)$ para todo $t$ en ese intervalo.` },
      explicacion: R`Si $f$ es «suave en $y$», por cada punto pasa una sola solución. Consecuencia visual: dos gráficas de soluciones distintas nunca se tocan.`,
      pasos: [
        { texto: R`<b>¿Cómo sabemos que la solución es única?</b> Saber que la solución de un problema de valor inicial es única es muy valioso, tanto desde el punto de vista teórico como práctico. Si no fuesen únicas, tendríamos entonces que preocuparnos por todas las posibles soluciones. Soluciones diferentes podrían dar predicciones completamente distintas acerca de cómo trabaja el sistema.` },
        { texto: R`<b>Teorema de Unicidad.</b> Sea $f(t, y)$ y su derivada parcial $\frac{\partial f}{\partial y}$ funciones continuas en un rectángulo $R$. Si $(t_0, y_0) \in R$ y si $y_1(t)$ e $y_2(t)$ son dos soluciones del PVI para $t$ en un intervalo alrededor de $t_0$, entonces $y_1(t) = y_2(t)$ para todo $t$ en ese intervalo.` },
        { texto: R`Dos soluciones que pasan por el mismo punto son <b>la misma solución</b>. Las gráficas de soluciones distintas nunca se cruzan. Si dos soluciones tocan el mismo punto, son idénticas.` },
      ],
      escena: '4/unicidad',
      claves: [
        { idea: 'Comprobar la hipótesis: deriva respecto a y', texto: R`Calcula $\frac{\partial f}{\partial y}$ y mira dónde es continua. Fuera de esos puntos (como $y = 0$ en $3y^{2/3}$) la unicidad puede fallar.` },
        { idea: 'No cruzarse = ordenar', texto: R`Si $y_1(t_0) < y_2(t_0)$, entonces $y_1(t) < y_2(t)$ en todo el intervalo común: las soluciones conservan su orden. Es lo que permite acotar soluciones con otras (tema 8).` },
      ],
    },
    {
      id: 'acotadas', nombre: 'Aplicación: soluciones acotadas por equilibrios', diapositivas: [26],
      explicacion: R`No hace falta resolver nada: una solución de equilibrio es una pared que las demás no pueden atravesar.`,
      pasos: [
        { texto: R`<b>Ejemplo.</b> Considere el PVI $\dydt = \dfrac{(y^2 - 4)(\sin^2 y^3 + \cos y - 2)}{2}$, $y(0) = \frac12$.` },
        { texto: R`<b>Análisis.</b> $y(t) = 2$ es una solución de equilibrio (constante).` },
        { texto: R`Como $y(0) = \frac12 < 2$, por unicidad la solución nunca puede tocar $y = 2$.` },
        { texto: R`Por tanto, $y(t) < 2$ para todo $t$ en el dominio de definición.` },
        { texto: R`Sin resolver la ecuación, obtuvimos una cota superior para la solución. ¡El teorema de unicidad es muy poderoso!` },
      ],
      escena: '4/acotadas',
      claves: [
        { idea: 'Equilibrios como cotas', texto: R`Para acotar una solución, busca soluciones conocidas (equilibrios u otras) por encima y por debajo de su dato inicial: con unicidad, quedará atrapada entre ellas.` },
        { idea: 'Revisa las hipótesis antes de usar unicidad', texto: R`Aquí $f$ es un producto de funciones derivables: $f$ y $\frac{\partial f}{\partial y}$ son continuas en todo el plano. Sin esa comprobación, el argumento no vale.` },
      ],
    },
    {
      id: 'falta-unicidad', nombre: R`Ejemplo: falta de unicidad, $\dfrac{dy}{dt} = 3y^{2/3}$`, diapositivas: [27],
      explicacion: R`Si $\frac{\partial f}{\partial y}$ no es continua, el teorema no promete nada, y de hecho por $(0, 0)$ pasan dos soluciones (en realidad, infinitas): la que se queda en $0$ y las que despegan.`,
      pasos: [
        { texto: R`<b>Problema.</b> $\dydt = 3y^{2/3}$, $y(0) = 0$.` },
        { texto: R`<b>Análisis de hipótesis.</b> $f(t, y) = 3y^{2/3}$ es continua en todo el plano. Pero $\frac{\partial f}{\partial y} = 2y^{-1/3}$ no existe en $y = 0$. El teorema de unicidad no aplica en este caso.` },
        { texto: R`<b>Dos soluciones diferentes.</b> $y_1(t) = 0$ para todo $t$ (equilibrio).` },
        { texto: R`$y_2(t) = t^3$ (solución que también satisface $y(0) = 0$).` },
        { texto: R`El PVI tiene dos soluciones distintas. <b>La unicidad falla.</b>` },
      ],
      escena: '4/falta-unicidad',
      claves: [
        { idea: 'Raíces de y: sospecha', texto: R`Términos como $y^{2/3}$ o $\sqrt{|y|}$ tienen derivada infinita en $y = 0$: allí la unicidad suele fallar y aparecen soluciones que «despegan» del equilibrio.` },
        { idea: 'Construir infinitas soluciones', texto: R`Pegando $0$ hasta un instante $c$ y luego $(t - c)^3$ se obtienen infinitas soluciones con $y(0) = 0$ (compruébalo derivando cada trozo).` },
      ],
    },
    {
      id: 'unicidad-numerico', nombre: 'Unicidad y método numérico', diapositivas: [28],
      explicacion: R`La unicidad le da un árbitro al ordenador: si hay una sola solución verdadera, dos aproximaciones distintas deberían acercarse al refinar el paso. Si no lo hacen, algo falla.`,
      pasos: [
        { texto: R`El teorema de unicidad nos dice que, si las hipótesis se cumplen, existe una única solución verdadera. Esto significa que cualquier discrepancia entre dos aproximaciones numéricas (con distintos $\Delta t$) es <b>error numérico</b>, no una solución alternativa.` },
        { texto: R`<b>Uso práctico.</b> Si dos aproximaciones con $\Delta t$ distintos no se acercan entre sí al reducir $\Delta t$, entonces algo va mal:` },
        { texto: R`O bien el método numérico falla (como en $\dydt = e^t\sin y$).` },
        { texto: R`O bien la ecuación no satisface las hipótesis del teorema.` },
      ],
      escena: '4/unicidad-numerico',
      claves: [
        { idea: 'Prueba de convergencia', texto: R`Calcula con $\Delta t$, $\frac{\Delta t}{2}$, $\frac{\Delta t}{4}$: las aproximaciones deben acercarse entre sí. Es la forma práctica de confiar en un resultado numérico.` },
        { idea: 'Diagnóstico en dos ramas', texto: R`Si no convergen: o el método es inadecuado para el problema (pendientes enormes), o el problema no tiene solución única. Comprueba las hipótesis del teorema para decidir.` },
      ],
    },
  ],
  resumen: {
    titulo: 'Resumen de la clase',
    bloques: [{ titulo: 'Lo que hemos visto', items: [
      R`<b>Método de Euler:</b> aproxima soluciones avanzando por el campo de pendientes.`,
      R`<b>Fórmula:</b> $y_{k+1} = y_k + f(t_k, y_k)\Delta t$.`,
      R`<b>Error:</b> proporcional a $\Delta t$ (método de primer orden).`,
      R`<b>Existencia:</b> si $f$ es continua, existe al menos una solución local.`,
      R`<b>Unicidad:</b> si además $\frac{\partial f}{\partial y}$ es continua, la solución es única.`,
      R`<b>Consecuencia:</b> las gráficas de soluciones distintas nunca se cruzan.`,
    ] }],
  },
};
