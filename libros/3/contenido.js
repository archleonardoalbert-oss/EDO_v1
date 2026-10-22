// Libro III — Conferencia 3: Procedimiento cualitativo. Campos de pendientes.
// Texto LITERAL de la conferencia (fuentes/conf/conf3.pdf), repartido en temas y pasos.
const R = String.raw;

export default {
  numero: 3, romano: 'III', color: 'ambar',
  titulo: 'Campos de pendientes',
  conferencia: 'Clase 3 · Procedimiento cualitativo · Profs. Alicia Pérez Figueredo y Damon Jorge Rubio',
  temas: [
    {
      id: 'por-que', nombre: '¿Por qué estudiar métodos cualitativos?', diapositivas: [1, 2],
      explicacion: R`Las fórmulas fallan a menudo (Libro II). La alternativa es mirar la ecuación como geometría: sin resolverla, ya dice hacia dónde se mueve cada solución.`,
      pasos: [
        { texto: R`<b>Limitaciones del método analítico.</b> No todas las EDOs se pueden resolver por separación de variables.` },
        { texto: R`Muchas EDOs importantes (logística, presa-depredador) no tienen solución explícita.` },
        { texto: R`Incluso cuando existe la fórmula, puede ser difícil de interpretar.` },
        { texto: R`<b>Alternativa:</b> usar la geometría de la ecuación diferencial para entender el comportamiento de las soluciones <b>sin resolverla</b>.` },
      ],
      escena: '3/por-que',
      claves: [
        { idea: 'Pregunta cualitativa antes que cuantitativa', texto: R`Antes de buscar $y(t)$ exacta, pregúntate: ¿crece o decrece?, ¿hacia dónde va a largo plazo?, ¿explota? Muchas veces es lo único que pide el problema.` },
        { idea: 'Una fórmula también se puede «leer» mal', texto: R`$P(t) = \frac{N}{1 + Ae^{-kt}}$ no grita «tiende a $N$» a primera vista; el dibujo sí. Usa ambos.` },
      ],
    },
    {
      id: 'geometria', nombre: R`La geometría de $\dfrac{dy}{dt} = f(t, y)$`, diapositivas: [3],
      recuadro: { titulo: 'observación fundamental', texto: R`Si $y(t)$ es solución de $\dydt = f(t, y)$ y su gráfica pasa por el punto $(t_1, y_1)$, entonces la pendiente de la recta tangente a la gráfica en ese punto es: $$\left.\dydt\right|_{t = t_1} = f(t_1, y_1).$$` },
      explicacion: R`La ecuación es un «mapa de inclinaciones»: en cada punto del plano te dice con qué pendiente debe pasar por ahí cualquier solución que pase por ese punto.`,
      pasos: [
        { texto: R`<b>Observación fundamental.</b> Si $y(t)$ es solución de $\dydt = f(t, y)$ y su gráfica pasa por el punto $(t_1, y_1)$, entonces la pendiente de la recta tangente a la gráfica en ese punto es: $\left.\dydt\right|_{t = t_1} = f(t_1, y_1)$.` },
        { texto: R`<b>Interpretación.</b> El lado derecho de la ecuación diferencial nos da la <b>pendiente de la tangente</b> en cada punto del plano.` },
        { texto: R`<b>Idea clave.</b> Podemos visualizar la ecuación diferencial dibujando pequeñas tangentes en muchos puntos del plano. Ese dibujo se llama <b>campo de pendientes</b>.` },
      ],
      escena: '3/geometria',
      claves: [
        { idea: 'f(t, y) es una pendiente, no una altura', texto: R`Evaluar $f$ en un punto no dice dónde está la solución, sino cómo se inclina si pasa por ahí. Confundir ambos es el error más común al dibujar.` },
        { idea: 'Cada punto, una sola dirección', texto: R`Como $f$ da un único número en cada punto, por cada punto la solución solo puede pasar con una inclinación. Es la semilla de la unicidad (Libro IV).` },
      ],
    },
    {
      id: 'definicion', nombre: 'Definición y procedimiento: el campo de pendientes', diapositivas: [4],
      recuadro: { titulo: 'definición', texto: R`Dada la ecuación diferencial $\dydt = f(t, y)$, el <b>campo de pendientes</b> es el conjunto de segmentos de recta (llamados <b>marcas de pendiente</b>) dibujados en el plano, donde en cada punto $(t, y)$ se traza un pequeño segmento cuya pendiente es $f(t, y)$.` },
      explicacion: R`Tres pasos mecánicos: elegir una cuadrícula, evaluar $f$ en cada punto, dibujar un segmento con esa pendiente. Con suficientes marcas, las soluciones «se ven» antes de calcularlas.`,
      pasos: [
        { texto: R`<b>Definición.</b> Dada la ecuación diferencial $\dydt = f(t, y)$, el campo de pendientes es el conjunto de segmentos de recta (llamados marcas de pendiente) dibujados en el plano, donde en cada punto $(t, y)$ se traza un pequeño segmento cuya pendiente es $f(t, y)$.` },
        { texto: R`<b>Procedimiento para dibujarlo.</b> 1. Seleccionar una cuadrícula de puntos $(t, y)$ en el plano.` },
        { texto: R`2. Para cada punto, calcular $f(t, y)$.` },
        { texto: R`3. Dibujar un pequeño segmento centrado en el punto con pendiente $f(t, y)$.` },
        { texto: R`<em>La gráfica de cualquier solución es una curva tangente al campo de pendientes en cada punto.</em>` },
      ],
      escena: '3/definicion',
      claves: [
        { idea: 'Dibujar a mano: busca primero las isoclinas', texto: R`Donde $f(t, y) = c$ todas las marcas son paralelas (pendiente $c$). Dibuja primero la curva $f = 0$ (marcas horizontales) y luego algunas $f = \pm 1$: el resto se rellena solo.` },
        { idea: 'Marcas cortas y centradas', texto: R`Una marca es un trocito de tangente centrado en el punto, no una flecha que sale de él.` },
      ],
    },
    {
      id: 'ejemplo-y-t', nombre: R`Ejemplo resuelto: $\dfrac{dy}{dt} = y - t$`, diapositivas: [5, 6, 7],
      explicacion: R`Nueve puntos bastan para ver la estructura: sobre la diagonal $y = t$ las marcas son horizontales; por encima, positivas; por debajo, negativas. La recta $y = t + 1$ resulta ser una solución.`,
      pasos: [
        { texto: R`<b>Construcción manual en 9 puntos.</b> Calculamos $f(t, y) = y - t$: $f(-1, 1) = 2$, $f(-1, 0) = 1$, $f(-1, -1) = 0$, $f(0, 1) = 1$, $f(0, 0) = 0$, $f(0, -1) = -1$, $f(1, 1) = 0$, $f(1, 0) = -1$, $f(1, -1) = -2$.` },
        { texto: R`<b>Observación.</b> En la diagonal $y = t$, la pendiente es $0$. Las soluciones cruzan esta línea con tangente horizontal (máximos o mínimos).` },
        { texto: R`(Figuras 1.14 y 1.15 de la conferencia: el campo de pendientes generado por computadora y seis soluciones superpuestas.)` },
        { texto: R`<b>Observaciones geométricas.</b> Por encima de la diagonal $y = t$: $f(t, y) > 0$, las soluciones <b>crecen</b>.` },
        { texto: R`Por debajo de la diagonal $y = t$: $f(t, y) < 0$, las soluciones <b>decrecen</b>.` },
        { texto: R`Sobre la diagonal $y = t$: $f(t, y) = 0$, las soluciones tienen <b>tangente horizontal</b>.` },
      ],
      escena: '3/ejemplo-y-t',
      claves: [
        { idea: 'La isoclina nula separa subidas de bajadas', texto: R`La curva $f(t, y) = 0$ divide el plano en regiones donde las soluciones crecen o decrecen. Las soluciones la cruzan con tangente horizontal: allí están sus máximos y mínimos.` },
        { idea: 'Busca soluciones rectas', texto: R`Si una recta $y = at + b$ tiene pendiente $a$ igual a $f$ sobre toda ella, es una solución. Aquí $y = t + 1$: $f = (t + 1) - t = 1 = a$. Las demás soluciones se separan de ella.` },
      ],
    },
    {
      id: 'caso-f-t', nombre: R`Caso especial 1: $\dfrac{dy}{dt} = f(t)$`, diapositivas: [8, 9],
      recuadro: { titulo: 'propiedad geométrica', texto: R`Si el lado derecho depende solo de $t$, todos los segmentos sobre una misma <b>recta vertical</b> son paralelos, pues la pendiente no depende de $y$, solo de $t$.` },
      explicacion: R`Si la inclinación solo depende de $t$, subir o bajar una solución no cambia sus inclinaciones: cualquier traslación vertical de una solución es otra solución.`,
      pasos: [
        { texto: R`<b>Propiedad geométrica.</b> Si el lado derecho depende solo de $t$, el campo de pendientes tiene la siguiente propiedad: todos los segmentos sobre una misma recta vertical son paralelos, pues la pendiente no depende de $y$, solo de $t$.` },
        { texto: R`Ejemplo: $\dydt = 2t$. Este caso es una antiderivada directa: $y(t) = \int 2t\,dt = t^2 + C$.` },
        { texto: R`Las soluciones son traslaciones verticales unas de otras.` },
      ],
      escena: '3/caso-f-t',
      claves: [
        { idea: 'f(t): integrar y sumar C', texto: R`Si $y' = f(t)$, toda solución es $\int f + C$ (⚔ Libro I: derivada nula ⇒ constante). Geometría: una curva y sus copias verticales.` },
        { idea: 'Columnas paralelas como prueba visual', texto: R`Si al mirar un campo ves columnas de marcas paralelas, la ecuación no depende de $y$.` },
      ],
    },
    {
      id: 'caso-autonomo', nombre: R`Caso especial 2: ecuaciones autónomas; $\dfrac{dy}{dt} = 4y(1 - y)$`, diapositivas: [10, 11, 12], valiente: 'v-traslacion-autonoma',
      recuadro: { titulo: 'propiedad geométrica', texto: R`Si el lado derecho depende solo de $y$, todos los segmentos sobre una misma <b>recta horizontal</b> son paralelos, pues la pendiente depende solo de $y$, no de $t$.` },
      explicacion: R`Si la inclinación solo depende de la altura, desplazar una solución a izquierda o derecha no cambia sus inclinaciones: cualquier traslación horizontal de una solución es otra solución.`,
      pasos: [
        { texto: R`<b>Propiedad geométrica.</b> Si el lado derecho depende solo de $y$, el campo de pendientes tiene la siguiente propiedad: todos los segmentos sobre una misma recta horizontal son paralelos, pues la pendiente depende solo de $y$, no de $t$.` },
        { texto: R`<b>Implicación importante.</b> El hecho de que las ecuaciones autónomas producen campos de pendientes que son paralelos a lo largo de líneas horizontales, indica que podemos obtener un número infinito de soluciones a partir de una solución trasladando meramente la gráfica de la solución dada hacia la izquierda o hacia la derecha.` },
        { texto: R`Ejemplo: $\dydt = 4y(1 - y)$. En $y = 0$: pendiente $0$. En $y = 0.5$: pendiente $1$. En $y = 1$: pendiente $0$. En $y = 1.5$: pendiente $-3$.` },
        { texto: R`Si $y_1(t)$ es solución, entonces $y_1(t + c)$ también es solución (traslación horizontal).` },
        { texto: R`<b>Análisis del campo de pendientes.</b> En $y = 0$ y $y = 1$: pendiente $0$. Las rectas horizontales correspondientes son <b>soluciones de equilibrio</b>.` },
        { texto: R`Si $0 < y < 1$: pendiente positiva, las soluciones crecen. Si $y > 1$ o $y < 0$: pendiente negativa, las soluciones decrecen.` },
        { texto: R`<b>Comportamiento de las soluciones.</b> Las soluciones con $0 < y(0) < 1$ aumentan hacia $y = 1$. Las soluciones con $y(0) > 1$ disminuyen hacia $y = 1$. Las soluciones con $y(0) < 0$ disminuyen sin cota inferior.` },
        { texto: R`$y = 1$ es estable; $y = 0$ es inestable.` },
      ],
      escena: '3/caso-autonomo',
      claves: [
        { idea: 'Autónoma ⇒ basta conocer una solución por «forma»', texto: R`Todas las soluciones que pasan por una misma altura son traslaciones horizontales de una sola. Por eso, para autónomas, el comportamiento depende solo de $y(0)$, no del instante inicial.` },
        { idea: 'Ceros de f(y) = rectas solución', texto: R`En una autónoma, cada raíz $y_0$ de $f$ da la solución constante $y \equiv y_0$. Entre raíces, el signo de $f$ decide si se sube o se baja: es la línea de fase del Libro V.` },
      ],
    },
    {
      id: 'del-campo-a-soluciones', nombre: 'Relación entre el campo y las soluciones', diapositivas: [13],
      recuadro: { titulo: 'propiedad fundamental', texto: R`La gráfica de toda solución de $\dydt = f(t, y)$ es una curva que es <b>tangente</b> al campo de pendientes en cada uno de sus puntos.` },
      explicacion: R`Dibujar una solución a partir del campo es como dejarse llevar por una corriente: partes de un punto y en cada instante sigues la dirección de las marcas cercanas.`,
      pasos: [
        { texto: R`<b>Propiedad fundamental.</b> La gráfica de toda solución de $\dydt = f(t, y)$ es una curva que es tangente al campo de pendientes en cada uno de sus puntos.` },
        { texto: R`<b>Cómo dibujar soluciones a partir del campo.</b> 1. Partir de una condición inicial $(t_0, y_0)$.` },
        { texto: R`2. Avanzar en la dirección indicada por las marcas de pendiente cercanas.` },
        { texto: R`3. La curva resultante es una aproximación de la solución.` },
        { texto: R`Para mayor exactitud, usaremos métodos numéricos en la próxima clase.` },
      ],
      escena: '3/del-campo',
      claves: [
        { idea: 'Seguir el campo hacia adelante y hacia atrás', texto: R`Desde $(t_0, y_0)$ puedes trazar hacia la derecha (futuro) y hacia la izquierda (pasado). Las marcas valen igual en ambos sentidos.` },
        { idea: 'Las soluciones no se cortan', texto: R`Al dibujar varias, si dos se tocan es un aviso: o el dibujo es impreciso o la ecuación tiene algo raro (el teorema de unicidad del Libro IV lo explica).` },
      ],
    },
    {
      id: 'ejemplo-cualitativo', nombre: R`Ejemplo donde el análisis cualitativo es esencial: $\dfrac{dy}{dt} = e^{y^2/10}\sin^2 y$`, diapositivas: [14],
      explicacion: R`Aquí separar no sirve: la integral no es elemental. Pero el campo lo cuenta todo: $\sin^2 y \ge 0$, así que las soluciones nunca bajan; se detienen en los múltiplos de $\pi$ (equilibrios) y entre dos de ellos suben del menor al mayor.`,
      pasos: [
        { texto: R`La ecuación $\dydt = e^{y^2/10}\sin^2 y$ es autónoma y separable, pero la integral no es elemental.` },
        { texto: R`El campo de pendientes revela que las soluciones permanecen entre múltiplos de $\pi$: como $e^{y^2/10}\sin^2 y \ge 0$ y se anula exactamente en $y = n\pi$, cada solución que empieza entre $n\pi$ y $(n+1)\pi$ <b>crece</b> de forma monótona desde $n\pi$ (cuando $t \to -\infty$) hacia $(n+1)\pi$ (cuando $t \to +\infty$). <small>(La conferencia dice que «oscilan entre múltiplos de $\pi$»; no oscilan: nunca decrecen.)</small>`, marca: 'corregido' },
      ],
      escena: '3/ejemplo-cualitativo',
      claves: [
        { idea: 'Signo de f: lo primero que se mira', texto: R`Si $f \ge 0$ siempre, ninguna solución baja nunca. Un cuadrado ($\sin^2$) o una exponencial ($e^{\dots}$) tienen signo fijo: aprovéchalo.` },
        { idea: 'Equilibrios como barreras', texto: R`Las rectas $y = n\pi$ son soluciones; las demás no pueden cruzarlas (unicidad, Libro IV). Quedan atrapadas en una franja entre dos equilibrios consecutivos.` },
      ],
    },
  ],
  resumen: {
    titulo: 'Resumen de la clase',
    bloques: [{ titulo: 'Lo que hemos visto', items: [
      R`El campo de pendientes es una representación geométrica de la EDO.`,
      R`Cada solución es una curva tangente al campo en cada punto.`,
      R`Si $\dydt = f(t)$: segmentos paralelos en cada recta vertical.`,
      R`Si $\dydt = f(y)$: segmentos paralelos en cada recta horizontal (autónomas).`,
      R`El campo revela equilibrios y comportamiento a largo plazo sin resolver la ecuación.`,
    ] }],
  },
};
