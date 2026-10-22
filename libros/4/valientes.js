// Demostraciones solo para valientes del Libro IV: existencia (Peano), unicidad y el error de Euler.
const R = String.raw;

export default [
  {
    id: 'v-unicidad', tema: 'unicidad', tipo: 'teorema',
    nombre: 'Teorema de unicidad (y por qué las soluciones no se cruzan)',
    cartelas: [
      R`En un mundo donde dos futuros podían salir del mismo instante…`,
      R`una derivada parcial continua se interpuso…`,
      R`y solo uno sobrevivió.`,
    ],
    enunciado: R`Sea $R = (a, b)\times(c, d)$ y sean $f$ y $\frac{\partial f}{\partial y}$ continuas en $R$. Si $y_1, y_2$ son soluciones de $y' = f(t, y)$ en un intervalo $I \ni t_0$, con gráficas en $R$ y $y_1(t_0) = y_2(t_0) = y_0$, entonces $y_1(t) = y_2(t)$ para todo $t \in I$.<br><b>Corolario.</b> Si dos soluciones (con gráficas en $R$) coinciden en un instante, coinciden en todo intervalo común que lo contenga: las gráficas de soluciones distintas nunca se cruzan.`,
    asume: [
      R`<b>Máximo en un compacto</b> (Weierstrass): una función continua en un rectángulo cerrado alcanza su máximo.`,
      R`<b>Valor medio</b> (Lagrange) y regla de la cadena.`,
      R`<b>Teorema fundamental del cálculo</b>: si $g$ es continua, $\frac{d}{dt}\int_{t_0}^t g = g(t)$; y si $y'$ es continua, $y(t) = y(t_0) + \int_{t_0}^t y'$.`,
      R`Monotonía de la integral: $g \ge 0 \Rightarrow \int_{t_0}^t g \ge 0$ (para $t \ge t_0$) y $\left|\int g\right| \le \int |g|$.`,
      R`Derivada $\le 0$ en un intervalo ⇒ función no creciente (consecuencia del valor medio).`,
    ],
    cuerpo: [
      {
        tipo: 'lema', titulo: 'Lipschitz en un rectángulo cerrado',
        enunciado: R`Si $K = [\alpha, \beta]\times[\gamma, \delta] \subseteq R$, existe $L \ge 0$ tal que $|f(t, u) - f(t, v)| \le L|u - v|$ para todos $t \in [\alpha, \beta]$, $u, v \in [\gamma, \delta]$.`,
        pasos: [
          { texto: R`$\left|\frac{\partial f}{\partial y}\right|$ es continua en el compacto $K$: alcanza un máximo $L$.`, porque: R`Weierstrass` },
          { texto: R`Fijados $t$ y $u < v$ en $[\gamma, \delta]$, la función $s \mapsto f(t, s)$ es derivable en $[u, v] \subseteq [\gamma, \delta]$ con derivada $\frac{\partial f}{\partial y}(t, s)$.`, porque: R`definición de derivada parcial` },
          { texto: R`Existe $\xi \in (u, v)$ con $f(t, v) - f(t, u) = \frac{\partial f}{\partial y}(t, \xi)(v - u)$.`, porque: R`valor medio` },
          { texto: R`Como $(t, \xi) \in K$: $|f(t, v) - f(t, u)| \le L|v - u|$.`, conclusion: true, porque: R`definición de $L$` },
        ],
      },
      {
        tipo: 'lema', titulo: 'Desigualdad de Grönwall (caso que necesitamos)',
        enunciado: R`Si $w$ es continua y $w \ge 0$ en $[t_0, t_1]$, y $w(t) \le L\int_{t_0}^t w(s)\,ds$ para todo $t \in [t_0, t_1]$, entonces $w \equiv 0$.`,
        pasos: [
          { texto: R`Sea $W(t) = \int_{t_0}^t w$. Es derivable con $W' = w$, $W(t_0) = 0$ y $W \ge 0$.`, porque: R`TFC; $w \ge 0$` },
          { texto: R`La hipótesis dice $W'(t) \le L\,W(t)$.`, porque: R`$w(t) = W'(t)$` },
          { texto: R`Sea $V(t) = W(t)e^{-L(t - t_0)}$. Entonces $V' = (W' - LW)e^{-L(t - t_0)} \le 0$: $V$ es no creciente.`, porque: R`regla del producto; $e^{\dots} > 0$` },
          { texto: R`$V(t_0) = 0$ y $V$ no crece ⇒ $V(t) \le 0$; como $e^{\dots} > 0$, $W(t) \le 0$. Junto con $W \ge 0$: $W \equiv 0$.`, porque: R`monotonía` },
          { texto: R`Por tanto $w(t) \le L\,W(t) = 0$, y como $w \ge 0$: $w \equiv 0$.`, conclusion: true },
        ],
      },
      {
        tipo: 'demostracion', titulo: 'Demostración del teorema',
        pasos: [
          { texto: R`Sea $t_1 \in I$, $t_1 > t_0$ (el caso $t_1 < t_0$ es simétrico). En $J = [t_0, t_1]$, $y_1$ y $y_2$ son continuas: alcanzan mínimo y máximo; sean $\gamma$ el menor de los mínimos y $\delta$ el mayor de los máximos.`, porque: R`Weierstrass` },
          { texto: R`$K = [t_0, t_1]\times[\gamma, \delta] \subseteq R$: los valores extremos son valores de las soluciones (en $(c, d)$) y $J \subseteq I \subseteq (a, b)$.`, porque: R`gráficas en $R$; $R$ es un producto de intervalos` },
          { texto: R`Las soluciones tienen derivada continua ($y_i' = f(t, y_i(t))$, composición de continuas), así que $y_i(t) = y_0 + \int_{t_0}^t f(s, y_i(s))\,ds$.`, porque: R`TFC` },
          { texto: R`Sea $w = |y_1 - y_2|$, continua y $\ge 0$. Restando: $w(t) \le \int_{t_0}^t |f(s, y_1(s)) - f(s, y_2(s))|\,ds \le L\int_{t_0}^t w(s)\,ds$.`, porque: R`$\left|\int g\right| \le \int|g|$; lema de Lipschitz en $K$` },
          { texto: R`Por Grönwall, $w \equiv 0$ en $J$: $y_1(t_1) = y_2(t_1)$. Como $t_1$ era arbitrario, $y_1 = y_2$ en $I$.`, conclusion: true, porque: R`lema de Grönwall` },
        ],
      },
      {
        tipo: 'corolario', titulo: 'Las gráficas no se cruzan',
        pasos: [
          { texto: R`Si $y_1(s) = y_2(s)$ en algún instante $s$, ambas resuelven el PVI con dato en $s$; por el teorema (con $t_0 = s$), coinciden en todo intervalo común que contenga a $s$.`, porque: R`el teorema` },
          { texto: R`Por tanto dos soluciones distintas no tienen ningún punto en común: si $y_1(t_0) < y_2(t_0)$, entonces $y_1 < y_2$ en todo el intervalo común (si no, por Bolzano su diferencia se anularía).`, conclusion: true, porque: R`contrarrecíproco + Bolzano` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Dónde falla sin la hipótesis:</b> con $f = 3y^{2/3}$ no hay cota $L$ cerca de $y = 0$ (la derivada $2y^{-1/3}$ se dispara), el lema de Lipschitz no vale y, en efecto, $0$ y $t^3$ salen del mismo punto.` },
    ],
    escena: '4/v-unicidad',
    escenaTexto: R`La distancia $w(t)$ entre dos soluciones solo puede crecer a un ritmo proporcional a sí misma ($w' \le Lw$). Si empieza en $0$, el «interés compuesto» de cero es cero: se queda en $0$ para siempre.`,
    escenaPasos: [
      { texto: R`Dos soluciones con datos iniciales cercanos (arrastra la segunda).` },
      { texto: R`Su distancia $w(t)$ crece como mucho como $w(t_0)e^{L(t - t_0)}$: la banda de Grönwall.` },
      { texto: R`Si $w(t_0) = 0$, la banda se cierra en un solo punto: la misma solución.` },
    ],
    claves: [
      { idea: 'Lipschitz = derivada acotada', texto: R`Para controlar $|f(u) - f(v)|$ por $|u - v|$, acota la derivada y usa el valor medio. Es la herramienta estándar para comparar soluciones.` },
      { idea: 'Grönwall: crecer proporcional a uno mismo', texto: R`Si una cantidad $\ge 0$ está acotada por $L$ veces su propia integral y empieza en $0$, es $0$. Multiplicar por $e^{-Lt}$ (factor integrante) es el truco.` },
      { idea: 'Compacto para conseguir constantes', texto: R`Las constantes ($L$, $M$) salen de máximos en rectángulos cerrados: por eso los teoremas se restringen a un compacto alrededor de las soluciones.` },
    ],
  },
  {
    id: 'v-existencia', tema: 'existencia', tipo: 'teorema (de Peano)',
    nombre: 'Teorema de existencia: las poligonales de Euler convergen a una solución',
    cartelas: [
      R`En un mundo donde solo sabíamos que $f$ es continua…`,
      R`Euler dibujó poligonales cada vez más finas…`,
      R`y de su límite nació una solución.`,
    ],
    enunciado: R`Sea $f$ continua en $R = (a, b)\times(c, d)$ y $(t_0, y_0) \in R$. Existen $\varepsilon > 0$ y una función derivable $y$ en $(t_0 - \varepsilon, t_0 + \varepsilon)$ con $y' = f(t, y)$ e $y(t_0) = y_0$.`,
    asume: [
      R`<b>Máximo en un compacto</b> (Weierstrass) y <b>continuidad uniforme</b> en un compacto (Heine–Cantor).`,
      R`<b>Bolzano–Weierstrass:</b> toda sucesión acotada de reales tiene una subsucesión convergente.`,
      R`Completitud de $\R$ (toda sucesión de Cauchy converge) y que el límite uniforme de funciones continuas es continua.`,
      R`<b>Teorema fundamental del cálculo</b> y la cota $\left|\int_{t_0}^t g\right| \le |t - t_0|\cdot\sup|g|$.`,
      R`Los racionales de un intervalo forman un conjunto numerable y denso.`,
    ],
    cuerpo: [
      {
        tipo: 'paso', etiqueta: 'Preparación', titulo: 'Un rectángulo cerrado, una cota y el embudo',
        pasos: [
          { texto: R`Elegimos $\alpha, \beta > 0$ con $K = [t_0 - \alpha, t_0 + \alpha]\times[y_0 - \beta, y_0 + \beta] \subseteq R$.`, porque: R`$R$ es abierto` },
          { texto: R`$|f| \le M$ en $K$ para cierto $M > 0$, y $f$ es uniformemente continua en $K$.`, porque: R`Weierstrass; Heine–Cantor` },
          { texto: R`Tomamos $\varepsilon = \min\left(\alpha, \frac{\beta}{M}\right)$. Probamos la existencia en $[t_0, t_0 + \varepsilon]$; el lado izquierdo es simétrico (Euler hacia atrás) y al final se pegan.`, porque: R`elección del intervalo` },
        ],
        qed: false,
      },
      {
        tipo: 'lema', titulo: R`Las poligonales de Euler no salen de $K$ y son $M$-lipschitzianas`,
        enunciado: R`Para $h = \frac{\varepsilon}{n}$, sea $\varphi_n$ la poligonal de Euler en $[t_0, t_0 + \varepsilon]$: vértices $t_k = t_0 + kh$, $y_{k+1} = y_k + f(t_k, y_k)h$, unidos por segmentos. Entonces $|\varphi_n(t) - y_0| \le M(t - t_0) \le \beta$ y $|\varphi_n(t) - \varphi_n(s)| \le M|t - s|$.`,
        pasos: [
          { texto: R`Por inducción en $k$: si los vértices $y_0, \dots, y_k$ están en el embudo $|y - y_0| \le M(t - t_0)$, todos los $(t_j, y_j)$ con $j \le k$ están en $K$ (pues $M(t_j - t_0) \le M\varepsilon \le \beta$).`, porque: R`hipótesis de inducción y $\varepsilon \le \frac{\beta}{M}$` },
          { texto: R`Entonces $|f(t_k, y_k)| \le M$: el segmento siguiente tiene pendiente de valor absoluto $\le M$, y $|y_{k+1} - y_0| \le |y_k - y_0| + Mh \le M(t_{k+1} - t_0)$.`, porque: R`cota de $f$ en $K$; desigualdad triangular` },
          { texto: R`Una poligonal cuyos tramos tienen pendientes $\le M$ en valor absoluto cumple $|\varphi_n(t) - \varphi_n(s)| \le M|t - s|$.`, conclusion: true, porque: R`sumar las variaciones tramo a tramo` },
        ],
      },
      {
        tipo: 'lema', titulo: 'Forma integral de la poligonal',
        enunciado: R`Sea $\tau_n(s) = t_k$ si $s \in [t_k, t_{k+1})$ (el último vértice antes de $s$). Entonces $\varphi_n(t) = y_0 + \int_{t_0}^t f\big(\tau_n(s), \varphi_n(\tau_n(s))\big)\,ds$, y $|\varphi_n(s) - \varphi_n(\tau_n(s))| \le Mh$.`,
        pasos: [
          { texto: R`En cada tramo $[t_k, t_{k+1})$, la derivada de $\varphi_n$ es la constante $f(t_k, y_k) = f(\tau_n(s), \varphi_n(\tau_n(s)))$.`, porque: R`construcción de Euler` },
          { texto: R`Sumando las integrales tramo a tramo (función escalonada) se recupera $\varphi_n(t) - y_0$.`, porque: R`TFC en cada tramo` },
          { texto: R`$|s - \tau_n(s)| \le h$ y el lema anterior dan $|\varphi_n(s) - \varphi_n(\tau_n(s))| \le Mh$.`, conclusion: true },
        ],
      },
      {
        tipo: 'lema', titulo: 'Una subsucesión converge uniformemente (Arzelà–Ascoli, demostrado aquí)',
        enunciado: R`Existen una subsucesión $(\varphi_{n_j})$ y una función continua $\varphi$ en $[t_0, t_0 + \varepsilon]$ con $\sup_t |\varphi_{n_j}(t) - \varphi(t)| \to 0$.`,
        pasos: [
          { texto: R`Sea $q_1, q_2, \dots$ una enumeración de los racionales de $[t_0, t_0 + \varepsilon]$ (y $t_0 + \varepsilon$). Todas las $\varphi_n(q_i)$ están en $[y_0 - \beta, y_0 + \beta]$.`, porque: R`primer lema` },
          { texto: R`Por Bolzano–Weierstrass, hay una subsucesión que converge en $q_1$; de ella, otra que converge también en $q_2$; y así sucesivamente.`, porque: R`Bolzano–Weierstrass, repetido` },
          { texto: R`<b>Diagonal:</b> tomando el $j$-ésimo término de la $j$-ésima subsucesión se obtiene $(\psi_j)$ que converge en <em>todos</em> los $q_i$ (desde $j \ge i$ es subsucesión de la $i$-ésima).`, porque: R`argumento diagonal de Cantor` },
          { texto: R`Sea $\eta > 0$. Elegimos finitos racionales $q_{i_1}, \dots, q_{i_r}$ tales que todo $t$ dista menos de $\frac{\eta}{3M}$ de alguno, y $N$ con $|\psi_j(q_{i_s}) - \psi_l(q_{i_s})| < \frac{\eta}{3}$ para $j, l \ge N$ y todo $s$.`, porque: R`densidad; convergencia ⇒ Cauchy en finitos puntos` },
          { texto: R`Para cualquier $t$, con $q$ uno de esos racionales cercano: $|\psi_j(t) - \psi_l(t)| \le |\psi_j(t) - \psi_j(q)| + |\psi_j(q) - \psi_l(q)| + |\psi_l(q) - \psi_l(t)| < \frac{\eta}{3} + \frac{\eta}{3} + \frac{\eta}{3}$.`, porque: R`desigualdad triangular; $M$-Lipschitz` },
          { texto: R`Así $(\psi_j)$ es uniformemente de Cauchy: converge en cada punto (completitud) a una $\varphi$, uniformemente, y $\varphi$ es continua.`, conclusion: true, porque: R`completitud; límite uniforme de continuas` },
        ],
      },
      {
        tipo: 'demostracion', titulo: 'El límite es una solución',
        pasos: [
          { texto: R`Sea $\eta > 0$. Por continuidad uniforme de $f$ en $K$, hay $\rho > 0$ con $|f(p) - f(p')| < \eta$ si $|p - p'| < \rho$ en $K$.`, porque: R`Heine–Cantor` },
          { texto: R`Para $j$ grande, $h_j < \frac{\rho}{2}$, $Mh_j < \frac{\rho}{4}$ y $\|\psi_j - \varphi\|_\infty < \frac{\rho}{4}$; entonces $|\tau(s) - s| < \frac{\rho}{2}$ y $|\psi_j(\tau(s)) - \varphi(s)| \le Mh_j + \|\psi_j - \varphi\|_\infty < \frac{\rho}{2}$.`, porque: R`lemas anteriores` },
          { texto: R`Luego $|f(\tau(s), \psi_j(\tau(s))) - f(s, \varphi(s))| < \eta$ para todo $s$ (ambos puntos están en $K$: $\varphi$ hereda el embudo).`, porque: R`continuidad uniforme` },
          { texto: R`Integrando: $\left|\psi_j(t) - y_0 - \int_{t_0}^t f(s, \varphi(s))\,ds\right| \le \varepsilon\eta$. Haciendo $j \to \infty$ y luego $\eta \to 0$: $\varphi(t) = y_0 + \int_{t_0}^t f(s, \varphi(s))\,ds$.`, porque: R`forma integral de la poligonal; cota de la integral` },
          { texto: R`El integrando $s \mapsto f(s, \varphi(s))$ es continuo, así que $\varphi$ es derivable con $\varphi' = f(t, \varphi)$ y $\varphi(t_0) = y_0$.`, porque: R`TFC` },
          { texto: R`Lo mismo hacia la izquierda en $[t_0 - \varepsilon, t_0]$. Pegando ambas en $t_0$ (las dos derivadas laterales valen $f(t_0, y_0)$) se obtiene la solución en $(t_0 - \varepsilon, t_0 + \varepsilon)$.`, conclusion: true, porque: R`derivadas laterales iguales ⇒ derivable` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Lo que la demostración no da:</b> unicidad. Con $f$ solo continua puede haber varias soluciones (distintas subsucesiones podrían converger a límites distintos, como en $3y^{2/3}$). Si además $\frac{\partial f}{\partial y}$ es continua, el teorema de unicidad asegura que el límite es el mismo y que <em>toda</em> la sucesión de poligonales converge.` },
    ],
    escena: '4/v-existencia',
    escenaTexto: R`Todas las poligonales de Euler viven en el embudo $|y - y_0| \le M|t - t_0|$ y tienen pendientes acotadas por $M$. Al refinar el paso se aprietan unas contra otras y su límite es una curva tangente al campo en cada punto: la solución.`,
    escenaPasos: [
      { texto: R`El rectángulo $K$ y el embudo de pendientes $\pm M$: ninguna poligonal puede salir de él.` },
      { texto: R`Poligonales de Euler con $h = \frac{\varepsilon}{2}, \frac{\varepsilon}{4}, \dots$` },
      { texto: R`Se aprietan: convergen uniformemente a una curva.` },
      { texto: R`La curva límite es tangente al campo: es una solución.` },
    ],
    claves: [
      { idea: 'Aproximar y pasar al límite', texto: R`Para probar que algo existe, construye aproximaciones (aquí, Euler), demuestra que tienen un límite y que el límite cumple la propiedad. Es el esquema de casi todos los teoremas de existencia.` },
      { idea: 'Forma integral', texto: R`$y' = f(t, y)$, $y(t_0) = y_0$ equivale a $y = y_0 + \int f(s, y(s))\,ds$. Las integrales se llevan mejor con los límites que las derivadas.` },
      { idea: 'Diagonal de Cantor', texto: R`Si puedes extraer subsucesiones convergentes en cada punto de un conjunto numerable, el truco diagonal da una sola subsucesión que converge en todos.` },
    ],
  },
  {
    id: 'v-error-euler', tema: 'error-euler', tipo: 'teorema',
    nombre: R`El error de Euler es como mucho $C\cdot\Delta t$`,
    cartelas: [
      R`En un mundo donde cada paso cometía un pequeño error…`,
      R`los errores se acumulaban, se amplificaban…`,
      R`pero nunca más que $C\cdot\Delta t$.`,
    ],
    enunciado: R`Sean $f$, $\frac{\partial f}{\partial t}$ y $\frac{\partial f}{\partial y}$ continuas en la franja $S = [t_0, T]\times\R$, con $\left|\frac{\partial f}{\partial y}\right| \le L$ en $S$ ($L > 0$), y sea $y$ la solución del PVI en $[t_0, T]$. Si $y_0, y_1, \dots, y_n$ son las aproximaciones de Euler con paso $h$ ($nh \le T - t_0$) y $M_2 = \max_{[t_0, T]}|y''|$, entonces $$|y(t_n) - y_n| \le \frac{M_2}{2L}\left(e^{L(T - t_0)} - 1\right)\cdot h.$$`,
    asume: [
      R`<b>Taylor con resto de Lagrange</b> (orden 2): si $y \in C^2$, $y(t + h) = y(t) + hy'(t) + \frac{h^2}{2}y''(\xi)$ con $\xi \in (t, t + h)$.`,
      R`Regla de la cadena en dos variables: $\frac{d}{dt}f(t, y(t)) = \frac{\partial f}{\partial t} + \frac{\partial f}{\partial y}\,y'$.`,
      R`<b>Valor medio</b> y máximo en un compacto (Weierstrass).`,
      R`Suma de una progresión geométrica y la desigualdad $1 + x \le e^x$.`,
    ],
    cuerpo: [
      {
        tipo: 'lema', titulo: 'Error local: lo que se pierde en un solo paso',
        enunciado: R`$y(t_{k+1}) = y(t_k) + h\,f(t_k, y(t_k)) + \frac{h^2}{2}y''(\xi_k)$ con $|y''(\xi_k)| \le M_2$.`,
        pasos: [
          { texto: R`$y' = f(t, y(t))$ es derivable (regla de la cadena) con $y'' = \frac{\partial f}{\partial t} + \frac{\partial f}{\partial y}f$, continua: $y \in C^2$ y $M_2$ existe.`, porque: R`regla de la cadena; Weierstrass en $[t_0, T]$` },
          { texto: R`Taylor en $t_k$: $y(t_{k+1}) = y(t_k) + hy'(t_k) + \frac{h^2}{2}y''(\xi_k)$ y $y'(t_k) = f(t_k, y(t_k))$.`, conclusion: true, porque: R`Taylor con resto de Lagrange; la EDO` },
        ],
      },
      {
        tipo: 'lema', titulo: 'Recurrencia del error',
        enunciado: R`Con $e_k = y(t_k) - y_k$: $|e_{k+1}| \le (1 + hL)|e_k| + \frac{M_2h^2}{2}$.`,
        pasos: [
          { texto: R`Restando el lema anterior y la fórmula de Euler $y_{k+1} = y_k + hf(t_k, y_k)$: $e_{k+1} = e_k + h\big(f(t_k, y(t_k)) - f(t_k, y_k)\big) + \frac{h^2}{2}y''(\xi_k)$.`, porque: R`restar` },
          { texto: R`Por el valor medio en $y$: $|f(t_k, y(t_k)) - f(t_k, y_k)| \le L|e_k|$.`, porque: R`$\left|\frac{\partial f}{\partial y}\right| \le L$ en la franja` },
          { texto: R`Desigualdad triangular: $|e_{k+1}| \le |e_k| + hL|e_k| + \frac{M_2h^2}{2}$.`, conclusion: true },
        ],
      },
      {
        tipo: 'demostracion', titulo: 'Sumando la recurrencia',
        pasos: [
          { texto: R`Por inducción, con $e_0 = 0$: $|e_n| \le \frac{M_2h^2}{2}\sum_{j=0}^{n-1}(1 + hL)^j$.`, porque: R`aplicar la recurrencia $n$ veces` },
          { texto: R`Suma geométrica: $\sum_{j=0}^{n-1}(1 + hL)^j = \frac{(1 + hL)^n - 1}{hL}$, así que $|e_n| \le \frac{M_2h}{2L}\left((1 + hL)^n - 1\right)$.`, porque: R`progresión geométrica` },
          { texto: R`Como $1 + hL \le e^{hL}$: $(1 + hL)^n \le e^{nhL} \le e^{L(T - t_0)}$.`, porque: R`$1 + x \le e^x$; $nh \le T - t_0$` },
          { texto: R`Luego $|e_n| \le \frac{M_2}{2L}\left(e^{L(T - t_0)} - 1\right)h = C\cdot h$.`, conclusion: true },
        ],
      },
      { tipo: 'nota', texto: R`<b>Lectura.</b> Cada paso pierde $O(h^2)$ (error local), pero hay $\frac{T - t_0}{h}$ pasos y cada error se amplifica a lo sumo por $(1 + hL)$: el total es $O(h)$. Por eso Euler es de <b>primer orden</b>. En $y' = 2y - 1$ en $[0, 1]$ la cota da $C \approx 23.6$; el error real es $\approx 7\,h$: la cota es segura, no ajustada.` },
    ],
    escena: '4/v-error-euler',
    escenaTexto: R`Cada paso de Euler añade un pequeño error local (la curvatura que la tangente no ve). Los errores previos se arrastran y se amplifican un poco en cada paso. Al dividir el paso entre dos, el error final se divide (aproximadamente) entre dos.`,
    escenaPasos: [
      { texto: R`Un paso: la tangente se separa de la curva una cantidad $\approx \frac{h^2}{2}|y''|$.` },
      { texto: R`Los errores se acumulan: cada barra es el error tras $k$ pasos.` },
      { texto: R`Con $\frac{h}{2}$: el doble de pasos, cada uno con un cuarto de error local: el total, la mitad.` },
    ],
    claves: [
      { idea: 'Local frente a global', texto: R`Error local $O(h^2)$ por paso × $O(\frac1h)$ pasos = error global $O(h)$. Así se calcula el orden de cualquier método.` },
      { idea: 'Recurrencias $a_{k+1} \le (1 + \lambda)a_k + b$', texto: R`Se resuelven sumando una geométrica y acotando $(1 + \lambda)^n \le e^{n\lambda}$: es la versión discreta de Grönwall.` },
    ],
  },
];
