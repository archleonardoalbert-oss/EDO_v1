// Demostraciones solo para valientes del Libro I: lo que la Conferencia 1 afirma sin demostrar.
const R = String.raw;

export default [
  {
    id: 'v-familia-exponencial', tema: 'influencia', tipo: 'teorema',
    nombre: R`Las curvas $Ce^{kt}$ son <em>todas</em> las soluciones de $P' = kP$`,
    cartelas: [
      R`En un mundo donde todas las poblaciones crecen como $e^{kt}$…`,
      R`la conferencia dijo «la solución general es $Ce^{kt}$»…`,
      R`pero nadie demostró que no hubiera <em>otra</em>.`,
    ],
    enunciado: R`Sean $k \in \R$ y $I$ un intervalo. Una función derivable $P : I \to \R$ cumple $P'(t) = kP(t)$ para todo $t \in I$ <b>si y solo si</b> existe una constante $C \in \R$ tal que $P(t) = Ce^{kt}$ para todo $t \in I$. En particular, si $0 \in I$, el problema $P' = kP$, $P(0) = P_0$ tiene <b>una única</b> solución en $I$: $P(t) = P_0e^{kt}$.`,
    asume: [
      R`Reglas de derivación: producto, cadena y $(e^{x})' = e^{x}$.`,
      R`$e^{x} \ne 0$ para todo $x$ y $e^{a}e^{b} = e^{a+b}$.`,
      R`<b>Teorema del valor medio</b> (Lagrange): si $Q$ es continua en $[a, b]$ y derivable en $(a, b)$, existe $c \in (a, b)$ con $Q(b) - Q(a) = Q'(c)(b - a)$.`,
    ],
    cuerpo: [
      {
        tipo: 'lema', titulo: 'Derivada nula en un intervalo ⇒ función constante',
        enunciado: R`Si $Q : I \to \R$ es derivable y $Q'(t) = 0$ para todo $t \in I$, entonces $Q$ es constante en $I$.`,
        pasos: [
          { texto: R`Sean $a < b$ dos puntos cualesquiera de $I$. Como $I$ es un intervalo, $[a, b] \subseteq I$.`, porque: R`definición de intervalo` },
          { texto: R`$Q$ es derivable en $I$, luego continua en $[a, b]$ y derivable en $(a, b)$.`, porque: R`derivable ⇒ continua` },
          { texto: R`Existe $c \in (a, b)$ con $Q(b) - Q(a) = Q'(c)(b - a)$.`, porque: R`teorema del valor medio` },
          { texto: R`Pero $Q'(c) = 0$, así que $Q(b) - Q(a) = 0$, es decir, $Q(a) = Q(b)$.`, porque: R`hipótesis $Q' \equiv 0$` },
          { texto: R`Como $a$ y $b$ eran arbitrarios, $Q$ toma el mismo valor en todos los puntos de $I$.`, conclusion: true },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`($\Leftarrow$) Toda $Ce^{kt}$ es solución`,
        pasos: [
          { texto: R`Sea $P(t) = Ce^{kt}$. Entonces $P'(t) = C\cdot ke^{kt}$.`, porque: R`regla de la cadena: $(e^{kt})' = ke^{kt}$` },
          { texto: R`$C\cdot ke^{kt} = k\cdot\left(Ce^{kt}\right) = kP(t)$ para todo $t \in I$.`, conclusion: true, porque: R`reordenar el producto` },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`($\Rightarrow$) Toda solución es de la forma $Ce^{kt}$`,
        pasos: [
          { texto: R`Sea $P$ derivable con $P' = kP$ en $I$. Definimos $Q(t) = P(t)\,e^{-kt}$.`, porque: R`la idea: «deshacer» el crecimiento $e^{kt}$ para ver si queda algo constante` },
          { texto: R`$Q$ es derivable en $I$ y $Q'(t) = P'(t)e^{-kt} + P(t)\cdot(-k)e^{-kt}$.`, porque: R`regla del producto y de la cadena` },
          { texto: R`$Q'(t) = \left(P'(t) - kP(t)\right)e^{-kt}$.`, porque: R`sacar factor común $e^{-kt}$` },
          { texto: R`$Q'(t) = 0\cdot e^{-kt} = 0$ para todo $t \in I$.`, porque: R`hipótesis $P' = kP$` },
          { texto: R`Por el lema, existe $C \in \R$ con $Q(t) = C$ para todo $t \in I$.`, porque: R`lema (derivada nula ⇒ constante)` },
          { texto: R`Multiplicando por $e^{kt}$: $P(t) = P(t)e^{-kt}e^{kt} = Q(t)e^{kt} = Ce^{kt}$.`, conclusion: true, porque: R`$e^{-kt}e^{kt} = e^{0} = 1$` },
        ],
      },
      {
        tipo: 'corolario', titulo: 'Unicidad para la condición inicial',
        pasos: [
          { texto: R`Si $P' = kP$ en $I \ni 0$ y $P(0) = P_0$, por lo anterior $P(t) = Ce^{kt}$ para cierto $C$.`, porque: R`el teorema` },
          { texto: R`Evaluando en $0$: $P_0 = P(0) = Ce^{0} = C$.`, porque: R`$e^{0} = 1$` },
          { texto: R`Luego $P(t) = P_0e^{kt}$: cualquier solución con ese dato inicial es exactamente esta.`, conclusion: true },
        ],
      },
      { tipo: 'nota', texto: R`<b>Por qué importa.</b> «La solución general es una familia» solo es verdad si la familia no se deja a nadie fuera. Aquí lo demostramos para $P' = kP$; el caso general (cualquier $f$ con $\partial f / \partial y$ continua) es el <b>teorema de unicidad</b> del Libro IV. El truco de multiplicar por $e^{-kt}$ reaparece en el Libro VII con nombre propio: <b>factor integrante</b>.` },
    ],
    escena: '1/v-familia-exponencial',
    escenaTexto: R`Si $P$ es solución, la curva $Q(t) = P(t)e^{-kt}$ es una recta horizontal: el factor $e^{-kt}$ deshace exactamente el crecimiento. Si $P$ no es solución, $Q$ se tuerce.`,
    escenaPasos: [
      { texto: R`Una solución $P(t) = Ce^{kt}$ de $P' = kP$ (arrastra su punto inicial).` },
      { texto: R`El factor $e^{-kt}$: decrece justo al ritmo al que $P$ crece.` },
      { texto: R`El producto $Q(t) = P(t)e^{-kt}$ es la recta horizontal $Q = C$: su derivada es $0$.` },
      { texto: R`Una función que <em>no</em> es solución (con una pequeña oscilación): su $Q$ se tuerce, $Q' \ne 0$.` },
    ],
    claves: [
      { idea: 'Para probar que algo es constante, deriva y obtén 0', texto: R`Es la forma estándar de demostrar unicidad: construye una cantidad que «debería» ser constante y comprueba que su derivada se anula; el teorema del valor medio hace el resto.` },
      { idea: 'Dividir entre la solución esperada', texto: R`Si sospechas que toda solución es $C\cdot g(t)$, estudia $P(t)/g(t)$ (aquí $P e^{-kt}$). Si su derivada es $0$, has terminado.` },
      { idea: 'Si y solo si = dos demostraciones', texto: R`Separa siempre ($\Leftarrow$): «estas son soluciones» (derivar y sustituir) de ($\Rightarrow$): «no hay otras» (la parte difícil).` },
    ],
  },
  {
    id: 'v-logistica-tiende-a-n', tema: 'logistico-analisis', tipo: 'teorema',
    nombre: R`Toda solución logística con $P(0) > 0$ tiende a $N$`,
    cartelas: [
      R`En un mundo con capacidad de carga $N$…`,
      R`la conferencia lo citó entre comillas, como un rumor…`,
      R`hoy, el rumor se convierte en teorema.`,
    ],
    enunciado: R`Sean $k > 0$, $N > 0$ y $P_0 > 0$. Si $P$ es derivable en $[0, T)$ (con $0 < T \le \infty$), cumple $P' = kP\left(1 - \frac{P}{N}\right)$ y $P(0) = P_0$, entonces para todo $t \in [0, T)$: $$P(t) = \frac{N}{1 + \left(\frac{N}{P_0} - 1\right)e^{-kt}}.$$ Esta fórmula define una solución en todo $[0, \infty)$, y $\displaystyle\lim_{t \to \infty} P(t) = N$.`,
    asume: [
      R`Reglas de derivación (cociente y cadena).`,
      R`<b>Teorema del valor intermedio</b> (Bolzano): una función continua en $[a, b]$ con signos opuestos en los extremos se anula en algún punto intermedio.`,
      R`Existencia del <b>ínfimo</b> de un conjunto no vacío y acotado inferiormente de $\R$.`,
      R`Continuidad: si $P$ es continua y $P(t) \to L$ cuando $t \to t_1^-$, entonces $P(t_1) = L$.`,
      R`$e^{-kt} \to 0$ cuando $t \to \infty$ si $k > 0$.`,
      R`El teorema anterior (⚔ las curvas $Ce^{kt}$ son todas las soluciones de $y' = ky$).`,
    ],
    cuerpo: [
      {
        tipo: 'lema', titulo: R`Donde $P > 0$, el recíproco $u = \frac{1}{P}$ cumple una ecuación lineal`,
        enunciado: R`Si en un intervalo $J \ni 0$ se tiene $P(t) > 0$, entonces $u(t) = \frac{1}{P(t)}$ cumple $u' = -ku + \frac{k}{N}$ en $J$, y $u(t) = \frac{1}{N} + \left(\frac{1}{P_0} - \frac{1}{N}\right)e^{-kt}$.`,
        pasos: [
          { texto: R`$u$ es derivable en $J$ y $u' = -\dfrac{P'}{P^2}$.`, porque: R`regla del cociente; $P \ne 0$ en $J$` },
          { texto: R`$u' = -\dfrac{kP\left(1 - \frac{P}{N}\right)}{P^2} = -\dfrac{k}{P} + \dfrac{k}{N} = -ku + \dfrac{k}{N}$.`, porque: R`sustituir la EDO y simplificar $P$` },
          { texto: R`Sea $v = u - \frac{1}{N}$. Entonces $v' = u' = -k\left(v + \frac{1}{N}\right) + \frac{k}{N} = -kv$.`, porque: R`la constante $\frac{1}{N}$ tiene derivada $0$` },
          { texto: R`Por el teorema anterior (con $-k$ en lugar de $k$), $v(t) = Ce^{-kt}$, y en $t = 0$: $C = v(0) = \frac{1}{P_0} - \frac{1}{N}$.`, porque: R`⚔ familia exponencial: todas las soluciones de $v' = -kv$` },
          { texto: R`Luego $u(t) = \frac{1}{N} + \left(\frac{1}{P_0} - \frac{1}{N}\right)e^{-kt}$ en $J$.`, conclusion: true },
        ],
      },
      {
        tipo: 'lema', titulo: R`$P$ nunca se anula en $[0, T)$`,
        enunciado: R`$P(t) > 0$ para todo $t \in [0, T)$.`,
        pasos: [
          { texto: R`Supongamos lo contrario: existe $s \in [0, T)$ con $P(s) \le 0$. Como $P(0) = P_0 > 0$, es $s > 0$.`, porque: R`reducción al absurdo` },
          { texto: R`Por Bolzano en $[0, s]$, $P$ se anula en algún punto de $(0, s]$. Así $Z = \{t \in (0, T) : P(t) = 0\}$ no es vacío; sea $t_1 = \inf Z$.`, porque: R`teorema del valor intermedio; existencia del ínfimo` },
          { texto: R`$P(t_1) = 0$ y $t_1 > 0$; y $P > 0$ en $[0, t_1)$.`, porque: R`continuidad (hay ceros tan cerca de $t_1$ como se quiera; $P > 0$ cerca de $0$); si $P(r) \le 0$ con $r < t_1$, Bolzano daría un cero antes de $t_1$` },
          { texto: R`En $J = [0, t_1)$, el primer lema da $\dfrac{1}{P(t)} = \dfrac{1}{N}\left(1 - e^{-kt}\right) + \dfrac{1}{P_0}e^{-kt}$.`, porque: R`primer lema` },
          { texto: R`Cuando $t \to t_1^-$, el lado derecho tiende a $\dfrac{1}{N}\left(1 - e^{-kt_1}\right) + \dfrac{1}{P_0}e^{-kt_1} = L > 0$, luego $P(t) \to \dfrac{1}{L} > 0$.`, porque: R`ambos sumandos son $\ge 0$ y el segundo es $> 0$` },
          { texto: R`Por continuidad, $P(t_1) = \frac{1}{L} > 0$, contradicción con $P(t_1) = 0$.`, conclusion: true, porque: R`continuidad de $P$ en $t_1$` },
        ],
      },
      {
        tipo: 'demostracion', titulo: 'La fórmula y el límite',
        pasos: [
          { texto: R`Por el segundo lema, $P > 0$ en todo $[0, T)$; por el primero (con $J = [0, T)$), $\dfrac{1}{P(t)} = \dfrac{1}{N} + \left(\dfrac{1}{P_0} - \dfrac{1}{N}\right)e^{-kt}$.`, porque: R`los dos lemas` },
          { texto: R`Multiplicando numerador y denominador por $N$: $P(t) = \dfrac{N}{1 + \left(\frac{N}{P_0} - 1\right)e^{-kt}}$.`, porque: R`álgebra` },
          { texto: R`El denominador es $(1 - e^{-kt}) + \frac{N}{P_0}e^{-kt} > 0$ para todo $t \ge 0$: la fórmula está definida en todo $[0, \infty)$ y, derivando, cumple la EDO (comprobación directa).`, porque: R`$1 - e^{-kt} \ge 0$ y $\frac{N}{P_0}e^{-kt} > 0$` },
          { texto: R`Como $k > 0$, $e^{-kt} \to 0$; luego el denominador tiende a $1$ y $P(t) \to N$.`, conclusion: true, porque: R`límite de un cociente` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Lo que esta demostración no usa:</b> el teorema de unicidad general (Libro IV). Lo sustituye un argumento de <b>primer cero</b>: mientras $P > 0$ todo está bajo control, y el primer instante en que dejaría de serlo lleva a contradicción. La misma idea demuestra en el Libro IV que dos soluciones nunca se cruzan.` },
    ],
    escena: '1/v-logistica',
    escenaTexto: R`El cambio $u = \frac{1}{P}$ «endereza» la logística: las curvas en S se convierten en exponenciales que caen hacia $\frac{1}{N}$. Volver con $P = \frac{1}{u}$ manda todo hacia $N$.`,
    escenaPasos: [
      { texto: R`Varias soluciones logísticas con $P(0) > 0$.` },
      { texto: R`Sus recíprocos $u = \frac{1}{P}$: exponenciales que se acercan a $\frac{1}{N}$.` },
      { texto: R`$u - \frac{1}{N} = Ce^{-kt} \to 0$: la distancia a $\frac{1}{N}$ se reduce a la mitad cada $\frac{\ln 2}{k}$.` },
      { texto: R`De vuelta: $P = \frac{1}{u} \to N$. El denominador nunca llega a $0$: $P$ nunca se anula.` },
    ],
    claves: [
      { idea: 'Un cambio de variable puede linealizar', texto: R`$u = \frac{1}{P}$ convierte la logística (no lineal) en $u' = -ku + \frac{k}{N}$ (lineal). Es un caso de Bernoulli (Libro VII).` },
      { idea: 'El argumento del primer cero', texto: R`Para probar que algo nunca pasa (aquí, $P = 0$): toma el primer instante en que pasaría (un ínfimo), usa que antes todo va bien, y llega a contradicción por continuidad.` },
      { idea: 'Restar el valor límite', texto: R`Ante $u' = -ku + c$, la variable $v = u - \frac{c}{k}$ cumple $v' = -kv$: restar el equilibrio deja una exponencial pura.` },
    ],
  },
];
