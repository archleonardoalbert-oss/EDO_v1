// Demostraciones solo para valientes del Libro V.
const R = String.raw;

export default [
  {
    id: 'v-linealizacion', tema: 'linealizacion', tipo: 'teorema',
    nombre: R`Teorema de linealización: el signo de $f'(y_0)$ decide`,
    cartelas: [
      R`En un mundo donde mirar las flechas era demasiado trabajo…`,
      R`una sola derivada prometió decidirlo todo…`,
      R`y cumplió.`,
    ],
    enunciado: R`Sea $f$ de clase $C^1$ en un intervalo abierto y $y_0$ un equilibrio ($f(y_0) = 0$).
    <ol><li>Si $f'(y_0) < 0$, existe $\delta > 0$ tal que toda solución con $y(0) \in (y_0 - \delta, y_0 + \delta)$ está definida para todo $t \ge 0$ y $y(t) \to y_0$ cuando $t \to \infty$ (<b>sumidero</b>).</li>
    <li>Si $f'(y_0) > 0$, existe $\delta > 0$ tal que toda solución con $y(0) \in (y_0 - \delta, y_0 + \delta)$, $y(0) \ne y_0$, sale de ese intervalo en un tiempo finito (<b>fuente</b>).</li></ol>`,
    asume: [
      R`Conservación del signo: si $g$ es continua y $g(y_0) < 0$, entonces $g < 0$ en un intervalo alrededor de $y_0$.`,
      R`<b>Valor medio</b>; derivada $< 0$ ⇒ estrictamente decreciente; máximo en un compacto.`,
      R`$\int_{\varepsilon}^{1}\frac{du}{u} = -\ln\varepsilon \to +\infty$ cuando $\varepsilon \to 0^+$.`,
      R`⚔ «Separación de variables da todas las soluciones» (Libro II), con $g \equiv 1$ y $h = f$: si $f \ne 0$ en $J$, las soluciones con valores en $J$ cumplen $H(y(t)) = t + C$ con $H' = \frac{1}{f}$, y $y(t) = H^{-1}(t + C)$.`,
      R`El teorema de unicidad (⚔ Libro IV): ninguna solución cruza la solución constante $y \equiv y_0$.`,
    ],
    cuerpo: [
      {
        tipo: 'lema', titulo: R`Cerca de $y_0$, $f$ tiene signo opuesto a cada lado y $|f(y)| \le K|y - y_0|$`,
        enunciado: R`Si $f'(y_0) < 0$, existe $\delta > 0$ con $f > 0$ en $[y_0 - \delta, y_0)$, $f < 0$ en $(y_0, y_0 + \delta]$ y $|f(y)| \le K|y - y_0|$ en $[y_0 - \delta, y_0 + \delta]$, siendo $K = \max|f'|$ allí.`,
        pasos: [
          { texto: R`$f'$ es continua y $f'(y_0) < 0$: hay $\delta > 0$ con $f' < 0$ en $[y_0 - \delta, y_0 + \delta]$.`, porque: R`conservación del signo` },
          { texto: R`Entonces $f$ es estrictamente decreciente ahí y $f(y_0) = 0$: positiva a la izquierda, negativa a la derecha.`, porque: R`derivada negativa ⇒ estrictamente decreciente` },
          { texto: R`Por el valor medio, $f(y) = f(y) - f(y_0) = f'(\xi)(y - y_0)$, y así $|f(y)| \le K|y - y_0|$.`, conclusion: true, porque: R`valor medio; $K$ es el máximo de $|f'|$ en el compacto` },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`1: si $f'(y_0) < 0$, las soluciones cercanas tienden a $y_0$`,
        pasos: [
          { texto: R`Si $y(0) = y_0$, $y \equiv y_0$ y no hay nada que probar. Sea $y(0) \in (y_0, y_0 + \delta)$ (el otro lado es simétrico) y $J = (y_0, y_0 + \delta)$: allí $f < 0$, así que $f \ne 0$.`, porque: R`lema` },
          { texto: R`Sea $H(y) = \int_{y(0)}^{y}\frac{du}{f(u)}$ en $J$. Como $f < 0$, $H$ es estrictamente decreciente y, para $y \to y_0^+$: $H(y) = \int_{y}^{y(0)}\frac{du}{|f(u)|} \ge \int_{y}^{y(0)}\frac{du}{K(u - y_0)} = \frac1K\ln\frac{y(0) - y_0}{y - y_0} \to +\infty$.`, porque: R`$|f(u)| \le K(u - y_0)$; integral del logaritmo` },
          { texto: R`Así $H$ es una biyección continua y decreciente de $(y_0, y(0)]$ sobre $[0, +\infty)$.`, porque: R`$H(y(0)) = 0$; monotonía; límite infinito; imagen de un intervalo` },
          { texto: R`Por separación (⚔ Libro II), la solución cumple $H(y(t)) = t$ mientras está en $J$: $y(t) = H^{-1}(t)$, definida para <b>todo</b> $t \ge 0$, con valores en $(y_0, y(0)]$.`, porque: R`separación con $g \equiv 1$; $H(y(0)) = 0$ fija $C = 0$` },
          { texto: R`Cuando $t \to \infty$, $H^{-1}(t) \to y_0$ (la inversa de una biyección decreciente que tiende a $+\infty$ en $y_0$).`, conclusion: true, porque: R`monotonía de la inversa` },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`2: si $f'(y_0) > 0$, las soluciones cercanas se van`,
        pasos: [
          { texto: R`Ahora $f' > 0$ en $[y_0 - \delta, y_0 + \delta]$: $f > 0$ en $(y_0, y_0 + \delta]$ y $f < 0$ en $[y_0 - \delta, y_0)$.`, porque: R`el lema con los signos invertidos` },
          { texto: R`Sea $y(0) \in (y_0, y_0 + \delta)$. Mientras $y(t) \in (y_0, y_0 + \delta]$, $H(y(t)) = t$ con $H(y) = \int_{y(0)}^{y}\frac{du}{f(u)}$, creciente.`, porque: R`separación` },
          { texto: R`$H(y_0 + \delta) = T$ es un número finito (integral de una continua en un compacto) y $T > 0$. Como $y(t) = H^{-1}(t)$, en $t = T$ la solución vale $y_0 + \delta$: llega al borde en tiempo finito.`, porque: R`continuidad de $\frac1f$ en $[y(0), y_0 + \delta]$` },
          { texto: R`No puede volver a bajar a $y_0$ (no cruza $y \equiv y_0$, y en $(y_0, y_0 + \delta]$ es creciente): se aleja. Igual por debajo.`, conclusion: true, porque: R`unicidad; $f > 0$` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Bonus que el teorema da gratis:</b> en un sumidero con $f'(y_0) \ne 0$, la solución <em>nunca</em> llega a $y_0$: tarda un tiempo infinito, porque $\int\frac{du}{|f|}$ diverge como un logaritmo. Si $f$ fuera como $\sqrt{|y - y_0|}$ (no derivable), la integral convergería y se llegaría en tiempo finito: es lo que pasa en $3y^{2/3}$ (Libro IV).` },
    ],
    escena: '5/v-linealizacion',
    escenaTexto: R`Cerca de un sumidero, $f$ está atrapada entre las rectas $\pm K(y - y_0)$. El tiempo para llegar a $y_0$ es el área bajo $\frac{1}{|f|}$, que crece sin límite: la solución se acerca para siempre sin llegar.`,
    escenaPasos: [
      { texto: R`$f'(y_0) < 0$: en una franja alrededor de $y_0$, $f$ decrece (positiva a la izquierda, negativa a la derecha).` },
      { texto: R`$|f(y)| \le K|y - y_0|$: la gráfica queda dentro del cono de pendientes $\pm K$.` },
      { texto: R`El tiempo $t = \int \frac{du}{|f(u)|}$ crece sin límite al acercarse a $y_0$: la solución está definida para siempre y tiende a $y_0$.` },
    ],
    claves: [
      { idea: 'Tiempo = integral de 1/f', texto: R`En una autónoma, el tiempo para ir de $a$ a $b$ es $\int_a^b\frac{dy}{f(y)}$. Si diverge, no se llega nunca; si converge, se llega en tiempo finito.` },
      { idea: 'Conservación del signo de la derivada', texto: R`$f'(y_0) \ne 0$ y $f'$ continua ⇒ $f$ es estrictamente monótona cerca de $y_0$: de ahí salen los signos a cada lado.` },
    ],
  },
  {
    id: 'v-monotona-equilibrio', tema: 'graficar', tipo: 'teorema',
    nombre: 'Una solución monótona y acotada tiende a un equilibrio',
    cartelas: [
      R`En un mundo donde las soluciones se acercaban sin decir a qué…`,
      R`la conferencia dibujó la flecha…`,
      R`hoy demostramos dónde termina.`,
    ],
    enunciado: R`Sea $f$ continua y $y$ una solución de $y' = f(y)$ definida en $[t_0, \infty)$, monótona y acotada. Entonces existe $L = \lim_{t \to \infty} y(t)$ y $f(L) = 0$: el límite es un equilibrio.`,
    asume: [
      R`<b>Convergencia monótona:</b> una función monótona y acotada en $[t_0, \infty)$ tiene límite cuando $t \to \infty$.`,
      R`Continuidad de $f$ (y de la composición) y conservación del signo.`,
      R`<b>Valor medio</b>.`,
    ],
    cuerpo: [
      {
        tipo: 'demostracion', titulo: 'Demostración',
        pasos: [
          { texto: R`Por convergencia monótona existe $L = \lim_{t \to \infty} y(t)$, y como $y$ está acotada, $L$ es finito.`, porque: R`convergencia monótona` },
          { texto: R`Por continuidad de $f$: $y'(t) = f(y(t)) \to f(L)$ cuando $t \to \infty$.`, porque: R`continuidad de $f$ y la EDO` },
          { texto: R`Supongamos $f(L) > 0$. Existe $T$ tal que $y'(t) > \frac{f(L)}{2}$ para $t \ge T$.`, porque: R`definición de límite con $\varepsilon = \frac{f(L)}{2}$` },
          { texto: R`Por el valor medio, $y(t) - y(T) = y'(\xi)(t - T) > \frac{f(L)}{2}(t - T)$ para $t > T$, que tiende a $+\infty$.`, porque: R`valor medio` },
          { texto: R`Eso contradice que $y$ está acotada. Con $f(L) < 0$ se llega a $y \to -\infty$, igual de imposible. Luego $f(L) = 0$.`, conclusion: true, porque: R`reducción al absurdo` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Por qué es exactamente lo que necesita la línea de fase:</b> en una autónoma con $f \in C^1$ toda solución es monótona (no tiene extremos, CP4 ejercicio 7) y, si empieza entre dos equilibrios, queda atrapada entre ellos (unicidad). Este teorema dice entonces a qué tiende: al equilibrio hacia el que apunta la flecha (no puede ser otro, porque entre ambos $f$ no se anula).` },
    ],
    escena: '5/v-monotona',
    escenaTexto: R`Si la solución se acercara a una altura $L$ con $f(L) > 0$, su pendiente acabaría siendo al menos $\frac{f(L)}{2}$ para siempre, y una recta de esa pendiente rompe cualquier techo. Solo un $L$ con $f(L) = 0$ es compatible con estar acotada.`,
    escenaPasos: [
      { texto: R`Una solución monótona y acotada: tiene un límite $L$.` },
      { texto: R`Si $f(L) > 0$, a partir de cierto $T$ la pendiente es $> \frac{f(L)}{2}$: la solución tendría que estar por encima de una recta que se escapa (contradicción).` },
      { texto: R`Por tanto $f(L) = 0$: el límite es un equilibrio.` },
    ],
    claves: [
      { idea: 'Derivada con límite no nulo ⇒ no acotada', texto: R`Si $y' \to c \ne 0$, entonces $y$ crece (o decrece) al menos linealmente: no puede tener límite finito.` },
      { idea: 'Monótona + acotada = convergente', texto: R`Es la herramienta para probar que algo tiene límite sin saber cuál; luego se identifica el límite con la ecuación.` },
    ],
  },
];
