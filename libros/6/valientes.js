// Demostraciones solo para valientes del Libro VI.
const R = String.raw;

export default [
  {
    id: 'v-no-bifurcacion', tema: 'no-bifurcacion', tipo: 'teorema',
    nombre: R`Si $\frac{\partial f}{\partial y} \ne 0$ en el equilibrio, no hay bifurcación`,
    cartelas: [
      R`En un mundo donde los parámetros nunca se quedan quietos…`,
      R`un equilibrio con pendiente se negó a desaparecer…`,
      R`y arrastró consigo a su tipo.`,
    ],
    enunciado: R`Sea $f(\mu, y)$ continua, con $\frac{\partial f}{\partial y}$ continua, en un entorno de $(\mu_0, y_0)$. Si $f(\mu_0, y_0) = 0$ y $\frac{\partial f}{\partial y}(\mu_0, y_0) < 0$, existen $\delta, \eta > 0$ tales que, para todo $\mu$ con $|\mu - \mu_0| < \eta$, la ecuación $\dydt = f(\mu, y)$ tiene <b>exactamente un</b> equilibrio $y_1(\mu)$ en $(y_0 - \delta, y_0 + \delta)$, y es un <b>sumidero</b>. (Con $> 0$: una fuente.) Además, $y_1(\mu) \to y_0$ cuando $\mu \to \mu_0$.<br><b>Corolario.</b> Si en $\mu_0$ hay una bifurcación que afecta a un equilibrio $y_0$, entonces $f(\mu_0, y_0) = 0$ y $\frac{\partial f}{\partial y}(\mu_0, y_0) = 0$.`,
    asume: [
      R`Conservación del signo para funciones continuas de dos variables.`,
      R`Derivada (parcial) negativa en un intervalo ⇒ estrictamente decreciente (valor medio).`,
      R`<b>Bolzano</b>.`,
      R`La clasificación por flechas de la Conferencia 5 (o el teorema de linealización ⚔).`,
    ],
    cuerpo: [
      {
        tipo: 'demostracion', titulo: 'Demostración',
        pasos: [
          { texto: R`Sea $c = \frac{\partial f}{\partial y}(\mu_0, y_0) < 0$. Por continuidad, hay un rectángulo $[\mu_0 - \eta_1, \mu_0 + \eta_1]\times[y_0 - \delta, y_0 + \delta]$ en el que $\frac{\partial f}{\partial y} < \frac c2 < 0$.`, porque: R`conservación del signo` },
          { texto: R`Para cada $\mu$ de ese intervalo, $y \mapsto f(\mu, y)$ es estrictamente decreciente en $[y_0 - \delta, y_0 + \delta]$.`, porque: R`derivada negativa ⇒ estrictamente decreciente` },
          { texto: R`En particular, como $f(\mu_0, y_0) = 0$: $f(\mu_0, y_0 - \delta) > 0 > f(\mu_0, y_0 + \delta)$.`, porque: R`monotonía estricta` },
          { texto: R`Las funciones $\mu \mapsto f(\mu, y_0 \pm \delta)$ son continuas: hay $0 < \eta \le \eta_1$ con $f(\mu, y_0 - \delta) > 0 > f(\mu, y_0 + \delta)$ si $|\mu - \mu_0| < \eta$.`, porque: R`conservación del signo en $\mu$` },
          { texto: R`Para esos $\mu$, Bolzano da un cero $y_1(\mu) \in (y_0 - \delta, y_0 + \delta)$, y es el único porque $f(\mu, \cdot)$ es estrictamente decreciente.`, porque: R`Bolzano; inyectividad` },
          { texto: R`Por la monotonía, $f(\mu, \cdot) > 0$ debajo de $y_1(\mu)$ y $< 0$ encima: las flechas apuntan hacia él, es un sumidero.`, porque: R`clasificación por flechas` },
          { texto: R`Repitiendo el argumento con cualquier $\delta' < \delta$ se obtiene $\eta'$ tal que $|y_1(\mu) - y_0| < \delta'$ si $|\mu - \mu_0| < \eta'$: $y_1(\mu) \to y_0$.`, conclusion: true, porque: R`la unicidad hace que sea el mismo equilibrio` },
        ],
      },
      {
        tipo: 'corolario', titulo: R`Por qué el método busca $f = \frac{\partial f}{\partial y} = 0$`,
        pasos: [
          { texto: R`Si en $(\mu_0, y_0)$ fuera $\frac{\partial f}{\partial y} \ne 0$, el teorema dice que, al mover un poco $\mu$, cerca de $y_0$ sigue habiendo exactamente un equilibrio del mismo tipo: nada cambia cualitativamente allí.`, porque: R`el teorema` },
          { texto: R`Luego, si algo cambia cualitativamente en $\mu_0$ cerca de un equilibrio $y_0$, tiene que ser $\frac{\partial f}{\partial y}(\mu_0, y_0) = 0$ (además de $f = 0$).`, conclusion: true, porque: R`contrarrecíproco` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Necesaria, no suficiente:</b> en la CP6, ejercicio 2, el sistema da $\alpha = 0$ como candidato y sin embargo allí no cambia nada (un sumidero degenerado atraviesa $y = 0$). Este teorema explica por qué hay que buscar en esos puntos; no garantiza que haya bifurcación.` },
    ],
    escena: '6/v-no-bifurcacion',
    escenaTexto: R`En el rectángulo, todas las $f(\mu, \cdot)$ son decrecientes, positivas en el borde inferior y negativas en el superior. Al mover $\mu$, la gráfica se desplaza un poco, pero tiene que cruzar el eje exactamente una vez, y de arriba abajo.`,
    escenaPasos: [
      { texto: R`$\frac{\partial f}{\partial y} < 0$ en un rectángulo alrededor de $(\mu_0, y_0)$: cada $f(\mu, \cdot)$ decrece allí.` },
      { texto: R`En los bordes $y_0 \pm \delta$ los signos son $+$ y $-$, y se mantienen al mover un poco $\mu$.` },
      { texto: R`Un solo cruce (Bolzano + monotonía), de arriba abajo: sumidero. Mueve $\mu$ y míralo seguir.` },
    ],
    claves: [
      { idea: 'Signos en los bordes + monotonía = un único cero', texto: R`Para probar que una ecuación tiene exactamente una solución en un intervalo: signos opuestos en los extremos (existe, por Bolzano) y monotonía estricta (es única).` },
      { idea: 'Perturbar sin romper', texto: R`Las desigualdades estrictas ($> 0$, $< 0$) sobreviven a perturbaciones pequeñas por continuidad: es la base de todos los resultados de «estabilidad estructural».` },
    ],
  },
  {
    id: 'v-lineal-todas', tema: 'linealidad', tipo: 'teorema',
    nombre: R`Las soluciones de una lineal son exactamente $k\,e^{A(t)} + y_p$`,
    cartelas: [
      R`En un mundo donde la conferencia escribió «la solución general»…`,
      R`alguien preguntó: ¿y si hay otras?…`,
      R`No las hay. Y aquí está por qué.`,
    ],
    enunciado: R`Sean $a$ y $b$ continuas en un intervalo $I$, $t_0 \in I$ y $A(t) = \int_{t_0}^t a(s)\,ds$.
    <ol><li>Toda solución de $y' = a(t)y$ en $I$ es $y(t) = k\,e^{A(t)}$ para una constante $k$.</li>
    <li>La función $y_p(t) = e^{A(t)}\int_{t_0}^t b(s)e^{-A(s)}\,ds$ es solución de $y' = a(t)y + b(t)$ en $I$.</li>
    <li>Toda solución de la no homogénea es $y = k\,e^{A(t)} + y_p(t)$; y el PVI con $y(t_0) = y_0$ tiene una única solución, la de $k = y_0$.</li></ol>`,
    asume: [
      R`<b>Teorema fundamental del cálculo</b>: $A' = a$ y $\frac{d}{dt}\int_{t_0}^t g = g(t)$ para $g$ continua.`,
      R`Reglas del producto y de la cadena; $e^{x} \ne 0$.`,
      R`El lema «derivada nula ⇒ constante» (⚔ Libro I).`,
      R`El principio de linealidad extendido (demostrado en la conferencia).`,
    ],
    cuerpo: [
      {
        tipo: 'demostracion', titulo: '1: todas las soluciones de la homogénea',
        pasos: [
          { texto: R`Sea $y$ solución de $y' = a(t)y$ y $Q(t) = y(t)e^{-A(t)}$.`, porque: R`deshacer el factor $e^{A}$, como con $Ce^{kt}$` },
          { texto: R`$Q' = y'e^{-A} - a(t)\,y\,e^{-A} = (y' - a(t)y)e^{-A} = 0$.`, porque: R`producto, cadena, $A' = a$; la EDO` },
          { texto: R`$Q \equiv k$ y $y = k\,e^{A(t)}$.`, conclusion: true, porque: R`derivada nula ⇒ constante (⚔ Libro I)` },
        ],
      },
      {
        tipo: 'demostracion', titulo: '2: una particular explícita',
        pasos: [
          { texto: R`$s \mapsto b(s)e^{-A(s)}$ es continua, así que $F(t) = \int_{t_0}^t b(s)e^{-A(s)}\,ds$ es derivable con $F' = b\,e^{-A}$.`, porque: R`TFC` },
          { texto: R`$y_p = e^{A}F$, luego $y_p' = a\,e^{A}F + e^{A}\,b\,e^{-A} = a\,y_p + b$.`, conclusion: true, porque: R`regla del producto` },
        ],
      },
      {
        tipo: 'demostracion', titulo: '3: todas las soluciones de la no homogénea, y unicidad',
        pasos: [
          { texto: R`Si $y$ es solución de la no homogénea, $y - y_p$ resuelve la homogénea.`, porque: R`principio de linealidad extendido, parte 2` },
          { texto: R`Por 1, $y - y_p = k\,e^{A(t)}$: $y = k\,e^{A(t)} + y_p$. (Y cada una de estas es solución, por la parte 1 del principio extendido.)`, porque: R`parte 1 de este teorema` },
          { texto: R`En $t_0$: $A(t_0) = 0$ e $y_p(t_0) = 0$, así que $y(t_0) = k$. El dato $y(t_0) = y_0$ fuerza $k = y_0$: una única solución.`, conclusion: true, porque: R`evaluar` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Lo que se gana:</b> para ecuaciones lineales, existencia y unicidad son <em>globales</em> (en todo $I$, sin rectángulos ni $\varepsilon$), y la fórmula de la parte 2 es exactamente la de variación de la constante del Libro VII.` },
    ],
    escena: '6/v-lineal-todas',
    escenaTexto: R`Dividir cualquier solución de $y' = (\cos t)y$ entre $e^{\sin t}$ da una recta horizontal: no queda ninguna solución fuera de la familia $k\,e^{\sin t}$.`,
    escenaPasos: [
      { texto: R`Varias soluciones de $y' = (\cos t)\,y$.` },
      { texto: R`Divididas entre $e^{A(t)} = e^{\sin t}$: rectas horizontales $Q = k$.` },
    ],
    claves: [
      { idea: 'El factor $e^{-A}$ es el protagonista', texto: R`Multiplicar por $e^{-\int a}$ convierte la lineal en una derivada exacta. Es el factor integrante del Libro VII.` },
      { idea: 'Construir y verificar', texto: R`Para probar que existe una solución, a veces basta proponer una fórmula y derivarla. La parte 2 lo hace en dos líneas.` },
    ],
  },
];
