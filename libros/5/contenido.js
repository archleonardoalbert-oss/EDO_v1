// Libro V — Conferencia 5: Equilibrios y línea de fase. Ecuaciones autónomas.
// Texto LITERAL de la conferencia (fuentes/conf/conf5.pdf), repartido en temas y pasos.
const R = String.raw;

export default {
  numero: 5, romano: 'V', color: 'violeta',
  titulo: 'Equilibrios · Línea de fase',
  conferencia: 'Clase 5 · Ecuaciones autónomas · Profs. Alicia Pérez Figueredo y Damon Jorge Rubio',
  temas: [
    {
      id: 'autonomas', nombre: 'Ecuaciones autónomas', diapositivas: [1, 2, 3, 4],
      recuadro: { titulo: 'definición', texto: R`Una ecuación diferencial de primer orden es <b>autónoma</b> si el lado derecho depende únicamente de la variable dependiente: $$\dydt = f(y).$$ Es decir, no aparece explícitamente la variable independiente $t$.` },
      explicacion: R`En una autónoma, el campo de pendientes se repite idéntico en cada columna. Toda la información cabe en una sola recta vertical: la de $t = 0$.`,
      pasos: [
        { texto: R`<b>Recordatorio.</b> En la Clase 3 vimos que el campo de pendientes nos da información geométrica sobre las soluciones. Para ecuaciones autónomas, ese campo tiene una estructura muy especial que permite simplificar el análisis.` },
        { texto: R`<b>Propiedad geométrica.</b> Si el lado derecho depende solo de $y$, en el campo de pendientes todos los segmentos sobre una misma recta horizontal son paralelos, pues la pendiente depende solo de $y$, no de $t$. Podemos obtener un número infinito de soluciones a partir de una solución dada, simplemente trasladando su gráfica hacia la izquierda o hacia la derecha.` },
        { texto: R`<b>Definición.</b> Una ecuación diferencial de primer orden es autónoma si el lado derecho depende únicamente de la variable dependiente: $\dydt = f(y)$. Es decir, no aparece explícitamente la variable independiente $t$.` },
        { texto: R`<b>Ejemplos.</b> $\dydt = y(1 - y)$ ✓ (autónoma). $\dydt = kP\left(1 - \frac{P}{N}\right)$ ✓ (logística, autónoma). $\dydt = y - t$ (no autónoma, aparece $t$).` },
        { texto: R`<b>¿Por qué importan?</b> Muchos modelos físicos, biológicos y económicos son autónomos porque las leyes que los gobiernan no cambian con el tiempo.` },
        { texto: R`Si conocemos el campo en una sola recta vertical (por ejemplo, $t = 0$), conocemos todo el campo (pues todos los segmentos sobre una misma recta horizontal son paralelos). La información es <b>redundante</b>.` },
      ],
      escena: '5/autonomas',
      claves: [
        { idea: '¿Aparece t? Esa es toda la prueba', texto: R`Para saber si es autónoma, mira si $t$ aparece explícitamente en el lado derecho (cuidado: $\frac{dP}{dt}$ con $P$ en el lado derecho sí es autónoma).` },
        { idea: 'Comprimir información', texto: R`Si una columna del campo determina todas, basta estudiar esa columna: es exactamente lo que hace la línea de fase.` },
      ],
    },
    {
      id: 'linea-fase', nombre: 'La línea de fase', diapositivas: [5, 6],
      recuadro: { titulo: 'definición', texto: R`La <b>línea de fase</b> de una ecuación autónoma $\dydt = f(y)$ es una representación sobre la recta real (el eje $y$) que indica: los <b>puntos de equilibrio</b> ($f(y) = 0$); las <b>regiones de crecimiento</b> ($f(y) > 0$, flechas hacia arriba); las <b>regiones de decrecimiento</b> ($f(y) < 0$, flechas hacia abajo).` },
      explicacion: R`La línea de fase es la columna del campo «resumida»: en lugar de cada pendiente, solo su signo (flecha) y los ceros (puntos). Se pierde la rapidez, pero se conserva el destino.`,
      pasos: [
        { texto: R`<b>Definición.</b> La línea de fase de una ecuación autónoma $\dydt = f(y)$ es una representación sobre la recta real (el eje $y$) que indica:` },
        { texto: R`Los <b>puntos de equilibrio</b>: valores $y$ donde $f(y) = 0$.` },
        { texto: R`Las <b>regiones de crecimiento</b>: intervalos donde $f(y) > 0$ (flechas hacia arriba).` },
        { texto: R`Las <b>regiones de decrecimiento</b>: intervalos donde $f(y) < 0$ (flechas hacia abajo).` },
        { texto: R`<b>Comparación de línea de fase y campo de pendientes</b> (figuras 1.53 y 1.54 de la conferencia, para $\dydt = (1 - y)y$).` },
      ],
      escena: '5/linea-fase',
      claves: [
        { idea: 'Puntos y flechas, nada más', texto: R`Una línea de fase se dibuja con tres cosas: los ceros de $f$ (puntos) y el signo de $f$ en cada intervalo (flecha). No hace falta saber cuánto vale $f$.` },
        { idea: 'Del dibujo vertical al plano', texto: R`Cada flecha de la línea de fase es el resumen de una fila entera de marcas del campo: las soluciones suben o bajan según la flecha de su altura.` },
      ],
    },
    {
      id: 'como-dibujar', nombre: 'Cómo dibujar la línea de fase: dos ejemplos', diapositivas: [7, 8, 9],
      recuadro: { titulo: 'procedimiento', texto: R`Para $\dydt = f(y)$: 1. dibujar la recta vertical $y$; 2. encontrar los equilibrios ($f(y) = 0$) y marcarlos con puntos; 3. en cada intervalo entre equilibrios, determinar el signo de $f(y)$: si $f(y) > 0$, flecha hacia arriba; si $f(y) < 0$, flecha hacia abajo.` },
      explicacion: R`El procedimiento es una tabla de signos convertida en dibujo. Basta un valor de prueba por intervalo.`,
      pasos: [
        { texto: R`<b>Procedimiento.</b> Para la ecuación autónoma $\dydt = f(y)$: 1. Dibujar la recta vertical $y$. 2. Encontrar los equilibrios: resolver $f(y) = 0$. Marcarlos con puntos. 3. En cada intervalo entre equilibrios, determinar el signo de $f(y)$: si $f(y) > 0$: flecha hacia arriba; si $f(y) < 0$: flecha hacia abajo.` },
        { texto: R`<b>Observación.</b> Para determinar el signo, basta con evaluar $f$ en un punto cualquiera del intervalo.` },
        { texto: R`<b>Ejemplo:</b> $\dydt = (1 - y)y$. 1. Buscar puntos de equilibrio: $f(y) = (1 - y)y = 0 \Rightarrow y = 0$, $y = 1$.` },
        { texto: R`2. Signos de $f(y)$: si $y < 0$: $y < 0$ y $(1 - y) > 0$, entonces $f(y) < 0$. Si $0 < y < 1$: $y > 0$ y $(1 - y) > 0$, entonces $f(y) > 0$. Si $y > 1$: $y > 0$ y $(1 - y) < 0$, entonces $f(y) < 0$.` },
        { texto: R`<b>Ejemplo:</b> $\dydt = (y + 3)(y - 2)$. 1. Buscar puntos de equilibrio: $f(y) = (y + 3)(y - 2) = 0 \Rightarrow y = -3$, $y = 2$.` },
        { texto: R`2. Signos de $f(y)$: si $y < -3$: $(y + 3) < 0$, $(y - 2) < 0$, entonces $f(y) > 0$. Si $-3 < y < 2$: $(y + 3) > 0$, $(y - 2) < 0$, entonces $f(y) < 0$. Si $y > 2$: $(y + 3) > 0$, $(y - 2) > 0$, entonces $f(y) > 0$.` },
      ],
      escena: '5/como-dibujar',
      claves: [
        { idea: 'Tabla de signos de factores', texto: R`Con $f$ factorizada, el signo de cada factor en cada intervalo se lee directo; el producto de los signos da la flecha.` },
        { idea: 'Valor de prueba', texto: R`Si no sabes factorizar, evalúa $f$ en un punto de cada intervalo entre raíces: como $f$ es continua, no cambia de signo dentro del intervalo (Bolzano).` },
      ],
    },
    {
      id: 'clasificacion', nombre: 'Clasificación: sumidero, fuente y nodo', diapositivas: [10, 11],
      explicacion: R`El tipo de un equilibrio se lee en las dos flechas que lo rodean: si ambas apuntan hacia él, atrae; si ambas se alejan, repele; si van en la misma dirección, atrae por un lado y repele por el otro.`,
      pasos: [
        { texto: R`<b>Definiciones.</b> Sea $y_0$ un punto de equilibrio de $\dydt = f(y)$. <b>Sumidero (estable):</b> las soluciones que comienzan cerca de $y_0$ tienden a $y_0$ cuando $t \to \infty$.` },
        { texto: R`<b>Fuente (inestable):</b> las soluciones que comienzan cerca de $y_0$ se alejan de $y_0$ cuando $t \to \infty$.` },
        { texto: R`<b>Nodo</b> (cuando no es ni fuente ni sumidero): las soluciones se comportan de manera distinta a cada lado de $y_0$.` },
        { texto: R`<b>Cómo distinguirlos en la línea de fase.</b> Sumidero: flechas apuntan hacia el punto desde ambos lados. Fuente: flechas apuntan alejándose desde ambos lados. Nodo: flechas apuntan en la misma dirección a ambos lados (por un lado se acercan y por el otro se alejan).` },
        { texto: R`<b>Representación de los tres tipos.</b> Sumidero $\downarrow\bullet\uparrow$ (estable): las soluciones cercanas tienden al punto. Fuente $\uparrow\bullet\downarrow$ (inestable): las soluciones cercanas se alejan. Nodo $\downarrow\bullet\downarrow$ (semiestable): las soluciones se alejan por un lado y se acercan por el otro.` },
        { texto: R`«La dirección de las flechas en la línea de fase determina el tipo de equilibrio.»` },
      ],
      escena: '5/clasificacion',
      claves: [
        { idea: 'Dos flechas, tres tipos', texto: R`Mira solo las flechas inmediatamente encima y debajo del punto: hacia él / hacia él = sumidero; fuera / fuera = fuente; misma dirección = nodo.` },
        { idea: 'Estabilidad = robustez', texto: R`Un sumidero describe un estado que se recupera tras una pequeña perturbación (la población en $N$); una fuente, un estado que una perturbación arruina.` },
      ],
    },
    {
      id: 'linealizacion', nombre: 'El teorema de linealización', diapositivas: [12, 13], valiente: 'v-linealizacion',
      recuadro: { titulo: 'teorema de linealización', texto: R`Sea $y_0$ un punto de equilibrio de $\dydt = f(y)$, donde $f$ es continuamente diferenciable. Si $f'(y_0) < 0$: $y_0$ es un <b>sumidero</b>. Si $f'(y_0) > 0$: $y_0$ es una <b>fuente</b>. Si $f'(y_0) = 0$: el criterio no decide.` },
      explicacion: R`La derivada en el equilibrio dice cómo cruza $f$ el eje: si baja (de positiva a negativa), las flechas apuntan hacia el punto; si sube, apuntan hacia fuera.`,
      pasos: [
        { texto: R`A veces no es fácil analizar el signo de $f(y)$ alrededor de un equilibrio. La derivada nos da una herramienta más directa.` },
        { texto: R`<b>Teorema de linealización.</b> Sea $y_0$ un punto de equilibrio de $\dydt = f(y)$, donde $f$ es continuamente diferenciable. Entonces: si $f'(y_0) < 0$: $y_0$ es un sumidero (estable).` },
        { texto: R`Si $f'(y_0) > 0$: $y_0$ es una fuente (inestable). Si $f'(y_0) = 0$: el criterio no decide; se requiere análisis adicional.` },
        { texto: R`<b>Interpretación geométrica.</b> La derivada $f'(y_0)$ mide la pendiente de la gráfica de $f$ en el equilibrio. Si $f$ cruza el eje $y$ de arriba hacia abajo, el equilibrio es sumidero.` },
        { texto: R`Si $f$ cruza de abajo hacia arriba, es fuente.` },
        { texto: R`<b>Caso $f'(y_0) = 0$.</b> Si la derivada se anula en el equilibrio, la linealización no da información. Los tres tipos son posibles.` },
      ],
      escena: '5/linealizacion',
      claves: [
        { idea: 'Derivar en lugar de tabular', texto: R`Para clasificar un equilibrio basta el signo de $f'(y_0)$: un cálculo en lugar de una tabla de signos.` },
        { idea: 'El eje «y» de la gráfica de f', texto: R`Al dibujar $f$ contra $y$, el eje horizontal es el eje $y$ (la línea de fase acostada): «cruza el eje de arriba abajo» = $f$ pasa de positiva a negativa.` },
      ],
    },
    {
      id: 'caso-cero', nombre: R`El caso $f'(y_0) = 0$`, diapositivas: [14],
      explicacion: R`Con $f'(y_0) = 0$ hay que volver al signo de $f$. La conferencia lo hace con $y^3$; añadimos los otros dos tipos posibles, para ver que de verdad el criterio no decide.`,
      pasos: [
        { texto: R`<b>Ejemplo:</b> $f(y) = y^3$. Equilibrio: $y = 0$.` },
        { texto: R`$f'(0) = 0$, el teorema no decide.` },
        { texto: R`Análisis de signos: $f(y) = y^3 > 0$ si $y > 0$, $f(y) < 0$ si $y < 0$. ⇒ $y = 0$ es una <b>fuente</b>.` },
        { texto: R`Los otros dos tipos con $f'(0) = 0$: $f(y) = -y^3$ da un <b>sumidero</b> (los signos se invierten) y $f(y) = y^2$ da un <b>nodo</b> ($f \ge 0$ a ambos lados).`, marca: 'añadido' },
      ],
      escena: '5/caso-cero',
      claves: [
        { idea: 'Si la derivada calla, mira el signo', texto: R`Con $f'(y_0) = 0$, vuelve a la tabla de signos de $f$ a cada lado del equilibrio (o a la primera derivada no nula: ver CP5, ejercicio 6).` },
        { idea: 'Potencias impares y pares', texto: R`Cerca de un cero de orden impar, $f$ cambia de signo (fuente o sumidero); de orden par, no cambia (nodo).` },
      ],
    },
    {
      id: 'graficar', nombre: 'Cómo usar la línea de fase para graficar soluciones', diapositivas: [15], valiente: 'v-monotona-equilibrio',
      explicacion: R`Con la línea de fase, cada solución se dibuja sola: recta si empieza en un equilibrio; si no, sube o baja según su flecha y se acerca al equilibrio hacia el que apunta (o escapa al infinito), sin cruzar nunca a nadie.`,
      pasos: [
        { texto: R`1. Dibujar los equilibrios como rectas horizontales.` },
        { texto: R`2. Para cada región, saber si la solución crece o decrece.` },
        { texto: R`3. Las soluciones se acercan o alejan de los equilibrios según las flechas.` },
        { texto: R`4. Los gráficos no se cruzan (unicidad).` },
        { texto: R`Podemos esbozar todas las soluciones posibles con solo mirar la línea de fase.` },
      ],
      escena: '5/graficar',
      claves: [
        { idea: 'Cuatro reglas bastan', texto: R`Rectas en los equilibrios, monotonía por región, destino según las flechas, no cruzarse: con eso el esbozo es correcto cualitativamente.` },
        { idea: 'Lo que la línea de fase no dice', texto: R`No dice la rapidez ni si se llega al infinito en tiempo finito; para eso hay que mirar $f$ (tema siguiente).` },
      ],
    },
    {
      id: 'ejemplo-cuadrado', nombre: R`Ejemplo: $\dfrac{dy}{dt} = (1 + y)^2$`, diapositivas: [16],
      explicacion: R`$(1 + y)^2 \ge 0$: nadie baja nunca. $y = -1$ es un nodo: por debajo, las soluciones suben hacia él; por encima, suben y se alejan. Y la fórmula revela algo que la línea de fase no ve: explotan en tiempo finito.`,
      pasos: [
        { texto: R`<b>Ejemplo:</b> $\dydt = (1 + y)^2$, con equilibrio en $y = -1$.` },
        { texto: R`Si $y > -1$: la solución crece y se aproxima a $+\infty$.` },
        { texto: R`Si $y < -1$: la solución <b>crece</b> y se aproxima a $-1$ (pues $(1 + y)^2 > 0$). <small>(La conferencia dice «decrece y se aproxima a $-\infty$»: no puede decrecer, porque el lado derecho es un cuadrado. $y = -1$ es un nodo.)</small>`, marca: 'corregido' },
        { texto: R`<b>Solución analítica.</b> Separando variables: $y(t) = -1 - \dfrac{1}{t + C}$. La solución explota en $t = -C$ (tiempo finito).` },
        { texto: R`La línea de fase no revela que las soluciones explotan en tiempo finito. Para saberlo, hay que resolver o analizar con más cuidado.` },
      ],
      escena: '5/ejemplo-cuadrado',
      claves: [
        { idea: 'Cuadrado ⇒ monotonía', texto: R`Si $f(y)$ es un cuadrado (o cualquier cosa $\ge 0$), todas las soluciones son no decrecientes: ningún equilibrio puede ser sumidero ni fuente, solo nodo.` },
        { idea: 'Rapidez: compara con $y^2$', texto: R`Si $f$ crece como $y^p$ con $p > 1$ para $y$ grande, la solución llega a $\infty$ en tiempo finito; la línea de fase solo dice «sube».` },
      ],
    },
  ],
  resumen: {
    titulo: 'Resumen de la clase',
    bloques: [{ titulo: 'Lo que hemos visto', items: [
      R`Una ecuación autónoma tiene la forma $\dydt = f(y)$.`,
      R`La línea de fase resume el comportamiento cualitativo.`,
      R`Los equilibrios se clasifican como sumideros, fuentes o nodos.`,
      R`El teorema de linealización clasifica usando $f'(y_0)$.`,
    ] }],
  },
};
