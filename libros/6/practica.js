// Clase Práctica 6 (fuentes/cp/cp6.pdf): bifurcaciones y ecuaciones lineales.
const R = String.raw;
const C = (t, l = 6) => ({ l, t });
const ideasLineal = [
  { idea: 'Homogénea + particular', texto: R`Toda lineal se resuelve en dos tareas independientes: $y_h = k\,e^{\int a}$ y una sola $y_p$. Luego $y = y_h + y_p$.` },
  { idea: 'La forma de b dicta la forma de y_p', texto: R`Exponencial → exponencial; seno o coseno → ambos; polinomio → polinomio del mismo grado; suma → suma de propuestas.` },
];

export default {
  numero: 6,
  ejercicios: [
    {
      id: 'cp6-1', numero: 1, nombre: 'Valores de bifurcación y líneas de fase',
      enunciado: R`Localice los valores de bifurcación para la familia paramétrica y dibuje las líneas de fase para valores del parámetro ligeramente menores que, ligeramente mayores que, y en el valor de la bifurcación.`,
      partes: [
        {
          id: 'a', etiqueta: '1.1', enunciado: R`$\dydt = y^2 + 3y + \alpha$`,
          pistas: [
            { tipo: 'concepto', texto: R`Cálculo del valor de bifurcación: resolver $f_\alpha(y) = 0$ y $\frac{\partial f_\alpha}{\partial y} = 0$ a la vez; y el ejemplo $y^2 - 2y + \mu$ de la conferencia.`, enlaces: [C('definicion-bifurcacion'), C('analisis-bifurcacion')] },
            { tipo: 'estrategia', texto: R`De $\frac{\partial f}{\partial y} = 0$ despeja $y$; sustitúyelo en $f = 0$ para obtener $\alpha$.` },
            { tipo: 'arranque', texto: R`$\frac{\partial f}{\partial y} = 2y + 3$. ¿Para qué $y$ se anula?` },
          ],
          solucion: { escena: 'cp6/1-1', pasos: [
            { texto: R`$2y + 3 = 0 \Rightarrow y = -\frac32$; $f\left(-\frac32\right) = \frac94 - \frac92 + \alpha = 0 \Rightarrow \alpha = \frac94$.` },
            { texto: R`$\alpha < \frac94$: dos equilibrios $y = \frac{-3 \pm \sqrt{9 - 4\alpha}}{2}$; el menor es sumidero y el mayor fuente. $\alpha = \frac94$: un solo equilibrio $y = -\frac32$ (nodo).` },
            { texto: R`$\alpha > \frac94$: ningún equilibrio; todas las soluciones crecen (a $+\infty$).` },
          ] },
          aprendes: { resultado: R`Bifurcación en $\alpha = \frac94$: dos equilibrios se funden en $y = -\frac32$ y desaparecen.`, ideas: [
            { idea: 'Cuadráticas: discriminante', texto: R`Con $f$ cuadrática, el valor de bifurcación anula el discriminante: $9 - 4\alpha = 0$.` },
            { idea: 'Tres líneas de fase', texto: R`Antes, en y después del valor crítico: así se ve el cambio cualitativo.` },
          ] },
        },
        {
          id: 'b', etiqueta: '1.2', enunciado: R`$\dydt = y^3 + \alpha y^2$`,
          pistas: [
            { tipo: 'concepto', texto: R`Valor de bifurcación por el sistema $f = 0$, $\frac{\partial f}{\partial y} = 0$, y comprobación con las líneas de fase.`, enlaces: [C('definicion-bifurcacion'), C('familias')] },
            { tipo: 'estrategia', texto: R`Factoriza $f = y^2(y + \alpha)$: los equilibrios son $0$ (doble) y $-\alpha$. ¿Cuándo coinciden?` },
            { tipo: 'arranque', texto: R`Estudia el signo de $y^2(y + \alpha)$: el factor $y^2$ no cambia de signo; solo importa $y + \alpha$.` },
          ],
          solucion: { escena: 'cp6/1-2', pasos: [
            { texto: R`Equilibrios $y = 0$ y $y = -\alpha$; se funden cuando $\alpha = 0$ (allí $f = y^3$). Valor de bifurcación: $\alpha = 0$.` },
            { texto: R`$\alpha < 0$: $0$ es un nodo (las flechas apuntan hacia abajo a ambos lados) y $-\alpha > 0$ es una fuente. $\alpha = 0$: un único equilibrio, $0$, fuente ($y^3$).` },
            { texto: R`$\alpha > 0$: $-\alpha < 0$ es una fuente y $0$ es un nodo (flechas hacia arriba a ambos lados). Al cruzar $\alpha = 0$, la fuente pasa de un lado de $0$ al otro y el nodo cambia de sentido.` },
          ] },
          aprendes: { resultado: R`Bifurcación en $\alpha = 0$: la fuente $-\alpha$ atraviesa el nodo $0$.`, ideas: [
            { idea: 'Factorizar los equilibrios', texto: R`Con $f$ factorizada, cada equilibrio es una función del parámetro; la bifurcación ocurre donde dos de esas funciones se cruzan.` },
            { idea: 'Factor al cuadrado = nodo', texto: R`$y^2$ no cambia de signo: el equilibrio $0$ es un nodo mientras no coincida con otro.` },
          ] },
        },
      ],
    },
    {
      id: 'cp6-2', numero: 2, nombre: R`Bifurcaciones de $y^6 - 2y^3 + \alpha$`,
      enunciado: R`Para la familia paramétrica dada identifique los valores de bifurcación de $\alpha$ y describa las bifurcaciones que se presentan cuando $\alpha$ se incrementa: $\dydt = y^6 - 2y^3 + \alpha$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Método general (sistema $f = 0$, $\frac{\partial f}{\partial y} = 0$) y diagrama de bifurcación.`, enlaces: [C('definicion-bifurcacion'), C('diagrama')] },
          { tipo: 'estrategia', texto: R`Resuelve $\frac{\partial f}{\partial y} = 6y^5 - 6y^2 = 6y^2(y^3 - 1) = 0$ y sustituye cada $y$ en $f = 0$. Después, comprueba con líneas de fase si de verdad cambia algo.` },
          { tipo: 'arranque', texto: R`Con $u = y^3$, $f = u^2 - 2u + \alpha$: los equilibrios son $y = \sqrt[3]{1 \pm \sqrt{1 - \alpha}}$.` },
          { tipo: 'desbloqueo', texto: R`En $\alpha = 0$ uno de los equilibrios pasa por $y = 0$. Mira el tipo justo antes y justo después: ¿cambia?` },
        ],
        solucion: { escena: 'cp6/2', pasos: [
          { texto: R`$\frac{\partial f}{\partial y} = 0 \iff y = 0$ o $y = 1$. Con $y = 0$: $f = \alpha = 0$; con $y = 1$: $1 - 2 + \alpha = 0$. Candidatos: $\alpha = 0$ y $\alpha = 1$.` },
          { texto: R`Equilibrios $y = \sqrt[3]{1 - \sqrt{1 - \alpha}}$ (sumidero) y $y = \sqrt[3]{1 + \sqrt{1 - \alpha}}$ (fuente), para $\alpha < 1$.` },
          { texto: R`Al crecer $\alpha$: en $\alpha = 0$ el sumidero atraviesa $y = 0$, pero sigue habiendo un sumidero y una fuente (la línea de fase no cambia cualitativamente). En $\alpha = 1$ ambos se funden en $y = 1$ y para $\alpha > 1$ desaparecen: todas las soluciones crecen. La bifurcación genuina es $\alpha = 1$.` },
        ] },
        aprendes: { resultado: R`Candidatos $\alpha = 0$ y $\alpha = 1$; solo en $\alpha = 1$ hay bifurcación (silla-nodo: dos equilibrios se funden y desaparecen).`, ideas: [
          { idea: 'Condición necesaria ≠ suficiente', texto: R`El sistema $f = \frac{\partial f}{\partial y} = 0$ da candidatos; confirma con las líneas de fase antes y después.` },
          { idea: 'Sustitución para bajar el grado', texto: R`$y^6 - 2y^3$ es cuadrática en $u = y^3$: busca estas estructuras antes de enfrentarte a un polinomio de grado alto.` },
        ] },
      }],
    },
    {
      id: 'cp6-3', numero: 3, nombre: 'Población con cosecha',
      enunciado: R`Considera el modelo de población con cosecha: $\dPdt = kP\left(1 - \frac{P}{N}\right) - C$ donde $P$ es la población, $k$ es la tasa de crecimiento, $N$ es la capacidad de carga y $C$ es la tasa de cosecha. 3.1 ¿Ocurre una bifurcación cuando el parámetro $C$ varía? En caso afirmativo, encuentra el valor de bifurcación. 3.2 Describe el comportamiento a largo plazo de la población $P(t)$ para $P(0) > 0$ antes y después de la bifurcación.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`El logístico con cosecha de la conferencia y el cálculo del valor de bifurcación.`, enlaces: [C('bifurcacion'), C('definicion-bifurcacion')] },
          { tipo: 'estrategia', texto: R`Deriva respecto de $P$, iguala a $0$ y sustituye en $f_C = 0$.` },
          { tipo: 'arranque', texto: R`$\frac{\partial f_C}{\partial P} = k - \frac{2k}{N}P$. ¿En qué $P$ se anula?` },
          { tipo: 'desbloqueo', texto: R`Antes de la bifurcación hay dos equilibrios $P_- < P_+$: ¿cuál es estable? ¿qué pasa si $P(0)$ está por debajo de $P_-$?` },
        ],
        solucion: { escena: 'cp6/3', pasos: [
          { texto: R`$\frac{\partial f_C}{\partial P} = 0 \iff P = \frac N2$; $f_C\left(\frac N2\right) = \frac{kN}{4} - C = 0 \iff C = \frac{kN}{4}$. Sí hay bifurcación, en $C = \frac{kN}{4}$.` },
          { texto: R`Si $C < \frac{kN}{4}$: equilibrios $P_\pm = \frac N2\left(1 \pm \sqrt{1 - \frac{4C}{kN}}\right)$, $P_+$ sumidero y $P_-$ fuente. Con $P(0) > P_-$ la población tiende a $P_+$; con $0 < P(0) < P_-$ decrece y se extingue (llega a $0$).` },
          { texto: R`Si $C > \frac{kN}{4}$: no hay equilibrios y $\dPdt < 0$ siempre: toda población se extingue, cualquiera que sea $P(0)$.` },
        ] },
        aprendes: { resultado: R`Bifurcación en $C = \frac{kN}{4}$. Antes: supervivencia si $P(0) > P_-$. Después: extinción siempre.`, ideas: [
          { idea: 'Umbral de explotación', texto: R`$\frac{kN}{4}$ es el máximo de $kP\left(1 - \frac PN\right)$: la cosecha no puede superar el máximo crecimiento natural.` },
          { idea: 'Dos destinos según el dato', texto: R`Con una fuente entre dos comportamientos, el dato inicial decide el destino: la fuente es un umbral.` },
        ] },
      }],
    },
    {
      id: 'cp6-4', numero: 4, nombre: '¿Por qué hace falta el veto?',
      enunciado: R`En la ecuación diferencial que modela poblaciones de peces con recolección, $\dPdt = f_C(P) = kP\left(1 - \frac PN\right) - C$, vemos que si $C > \frac{kN}{4}$ la población de peces se extinguirá. Si dicha población llega casi a cero debido a que el nivel de pesca es ligeramente mayor que $\frac{kN}{4}$, ¿por qué debe implementarse el veto para que la población se recupere? Es decir, si un nivel de pesca justamente arriba de $C = \frac{kN}{4}$ ocasiona un colapso de la población, ¿por qué no puede ser restituida la población reduciendo el nivel de pesca justamente abajo de $C = \frac{kN}{4}$?`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Diagrama de bifurcación del logístico con cosecha: la rama inestable $P_-$ es un umbral.`, enlaces: [C('diagrama'), C('bifurcacion')] },
          { tipo: 'estrategia', texto: R`Calcula dónde está $P_-$ cuando $C$ es apenas menor que $\frac{kN}{4}$, y compáralo con una población casi nula.` },
          { tipo: 'arranque', texto: R`$P_- = \frac N2\left(1 - \sqrt{1 - \frac{4C}{kN}}\right)$. Si $\frac{4C}{kN} \approx 1$, ¿cuánto vale aproximadamente?` },
        ],
        solucion: { escena: 'cp6/4', pasos: [
          { texto: R`El diagrama de bifurcación (rama estable $P_+$, inestable $P_-$) y las direcciones del flujo.` },
          { texto: R`Para $C$ justo debajo de $\frac{kN}{4}$, $P_- \approx \frac N2$. Una población casi nula está muy por debajo de $P_-$, en la región donde $\dPdt < 0$: sigue decreciendo hacia la extinción.` },
          { texto: R`Para recuperarse, $P$ tiene que quedar por encima de $P_-$, que es pequeño solo si $C$ es pequeño ($P_- \approx \frac Ck$ para $C$ cerca de $0$). Por eso hace falta reducir la pesca drásticamente (veto, $C \approx 0$): el sistema tiene <b>histéresis</b>.` },
        ] },
        aprendes: { resultado: R`Bajar $C$ un poco no basta: con $P \approx 0 < P_- \approx \frac N2$ la población sigue cayendo; solo un veto (C cercano a $0$) la recupera.`, ideas: [
          { idea: 'Histéresis', texto: R`Tras una bifurcación silla-nodo, deshacer el cambio del parámetro no deshace el efecto: el estado ya está del otro lado del umbral.` },
          { idea: 'Leer el diagrama como un mapa', texto: R`Sigue el punto $(C, P)$ por el diagrama: los movimientos verticales los dicta el flujo; los horizontales, las decisiones.` },
        ] },
      }],
    },
    {
      id: 'cp6-5', numero: 5, nombre: 'Solución general (coeficientes indeterminados)',
      enunciado: R`Encuentre la solución general de la ecuación diferencial especificada. 5.1 $\dydt = -4y + 9e^{-t}$; 5.2 $\dydt = -3y + 4\cos 2t$.`,
      partes: [
        {
          id: 'a', etiqueta: '5.1', enunciado: R`$\dydt = -4y + 9e^{-t}$`,
          pistas: [
            { tipo: 'concepto', texto: R`Linealidad extendida ($y = k\,y_h + y_p$) y coeficientes indeterminados con $b(t) = e^{at}$.`, enlaces: [C('linealidad-extendida'), C('coeficientes-indeterminados')] },
            { tipo: 'estrategia', texto: R`Homogénea: $y' = -4y$. Particular: propón $y_p = \alpha e^{-t}$.` },
            { tipo: 'arranque', texto: R`Sustituye $y_p = \alpha e^{-t}$: $-\alpha e^{-t} = -4\alpha e^{-t} + 9e^{-t}$. Divide entre $e^{-t}$.` },
          ],
          solucion: { escena: 'cp6/l51', pasos: [
            { texto: R`$y_h = k\,e^{-4t}$.` },
            { texto: R`$-\alpha = -4\alpha + 9 \Rightarrow 3\alpha = 9 \Rightarrow \alpha = 3$: $y_p = 3e^{-t}$.` },
            { texto: R`$y(t) = k\,e^{-4t} + 3e^{-t}$.` },
          ] },
          aprendes: { resultado: R`$y = k\,e^{-4t} + 3e^{-t}$.`, ideas: ideasLineal },
        },
        {
          id: 'b', etiqueta: '5.2', enunciado: R`$\dydt = -3y + 4\cos 2t$`,
          pistas: [
            { tipo: 'concepto', texto: R`Coeficientes indeterminados con $b(t) = \cos\omega t$: proponer seno y coseno juntos.`, enlaces: [C('coeficientes-indeterminados')] },
            { tipo: 'estrategia', texto: R`Propón $y_p = \alpha\cos 2t + \beta\sin 2t$ y separa los coeficientes de $\cos 2t$ y de $\sin 2t$.` },
            { tipo: 'arranque', texto: R`$y_p' = -2\alpha\sin 2t + 2\beta\cos 2t$. Iguala con $-3y_p + 4\cos 2t$.` },
          ],
          solucion: { escena: 'cp6/l52', pasos: [
            { texto: R`$y_h = k\,e^{-3t}$.` },
            { texto: R`Coseno: $2\beta = -3\alpha + 4$; seno: $-2\alpha = -3\beta$. Luego $\alpha = \frac{3\beta}{2}$, $2\beta + \frac{9\beta}{2} = 4$, $\beta = \frac{8}{13}$, $\alpha = \frac{12}{13}$.` },
            { texto: R`$y(t) = k\,e^{-3t} + \frac{12}{13}\cos 2t + \frac{8}{13}\sin 2t$.` },
          ] },
          aprendes: { resultado: R`$y = k\,e^{-3t} + \frac{12}{13}\cos 2t + \frac{8}{13}\sin 2t$.`, ideas: ideasLineal },
        },
      ],
    },
    {
      id: 'cp6-6', numero: 6, nombre: 'Un problema de valor inicial',
      enunciado: R`Resuelva el problema de valor inicial dado: $\dydt + 2y = e^{t/3}$, $y(0) = 1$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Solución general $y = k\,y_h + y_p$ (coeficientes indeterminados) y luego la constante con el dato (como en el PVI de la Conf 2).`, enlaces: [C('coeficientes-indeterminados'), { l: 2, t: 'pvi' }] },
          { tipo: 'estrategia', texto: R`Escríbela como $y' = -2y + e^{t/3}$; propón $y_p = \alpha e^{t/3}$.` },
          { tipo: 'arranque', texto: R`$\frac{\alpha}{3}e^{t/3} + 2\alpha e^{t/3} = e^{t/3}$. Después, usa $y(0) = 1$ para hallar $k$.` },
        ],
        solucion: { escena: 'cp6/l6', pasos: [
          { texto: R`$y_h = k\,e^{-2t}$.` },
          { texto: R`$\frac{7\alpha}{3} = 1 \Rightarrow \alpha = \frac37$: $y_p = \frac37 e^{t/3}$.` },
          { texto: R`$y = k\,e^{-2t} + \frac37 e^{t/3}$.` },
          { texto: R`$y(0) = k + \frac37 = 1 \Rightarrow k = \frac47$: $y(t) = \frac47 e^{-2t} + \frac37 e^{t/3}$.` },
        ] },
        aprendes: { resultado: R`$y(t) = \frac47 e^{-2t} + \frac37 e^{t/3}$.`, ideas: [...ideasLineal, { idea: 'La constante al final', texto: R`El dato inicial se usa sobre la solución <em>general</em> completa ($y_h + y_p$), no sobre $y_h$ sola.` }] },
      }],
    },
    {
      id: 'cp6-7', numero: 7, nombre: 'Particular polinómica',
      enunciado: R`Considere la ecuación lineal no homogénea $\dydt + 2y = 3t^2 + 2t - 1$. Para encontrar la solución general, debemos proponer una solución particular $y_p(t)$. Dado que el lado derecho es un polinomio cuadrático, es razonable proponer un polinomio cuadrático para $y_p(t)$, así que sea $y_p(t) = at^2 + bt + c$, donde $a$, $b$ y $c$ son constantes. Determina los valores para estas constantes de modo que $y_p(t)$ sea una solución.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Coeficientes indeterminados con $b(t)$ polinomio: proponer un polinomio del mismo grado.`, enlaces: [C('coeficientes-indeterminados')] },
          { tipo: 'estrategia', texto: R`Sustituye $y_p$ y agrupa por potencias de $t$; iguala coeficientes con $3t^2 + 2t - 1$.` },
          { tipo: 'arranque', texto: R`$y_p' + 2y_p = 2at + b + 2at^2 + 2bt + 2c$. ¿Qué coeficiente acompaña a $t^2$?` },
        ],
        solucion: { escena: 'cp6/l7', pasos: [
          { texto: R`$y_h = k\,e^{-2t}$ (la homogénea $y' = -2y$).` },
          { texto: R`$t^2$: $2a = 3 \Rightarrow a = \frac32$. $t$: $2a + 2b = 2 \Rightarrow b = -\frac12$. Constante: $b + 2c = -1 \Rightarrow c = -\frac14$.` },
          { texto: R`$y_p = \frac32 t^2 - \frac12 t - \frac14$ y $y = k\,e^{-2t} + y_p$.` },
        ] },
        aprendes: { resultado: R`$a = \frac32$, $b = -\frac12$, $c = -\frac14$.`, ideas: [
          { idea: 'Sistema triangular', texto: R`Al igualar potencias de mayor a menor, cada ecuación tiene una incógnita nueva: se resuelve de arriba abajo.` },
          ideasLineal[0],
        ] },
      }],
    },
    {
      id: 'cp6-8', numero: 8, nombre: 'Suma de términos forzantes',
      enunciado: R`Encuentra la solución general y la solución que satisface la condición inicial $y(0) = 0$: $\dydt + 2y = t^2 + 2t + 1 + e^{4t}$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Linealidad extendida y coeficientes indeterminados: con $b$ suma de polinomio y exponencial, la particular es la suma de las propuestas.`, enlaces: [C('linealidad-extendida'), C('coeficientes-indeterminados')] },
          { tipo: 'estrategia', texto: R`Propón $y_p = at^2 + bt + c + \alpha e^{4t}$ (o halla una particular para cada sumando y súmalas).` },
          { tipo: 'arranque', texto: R`Para $e^{4t}$: $4\alpha + 2\alpha = 1$. Para el polinomio: iguala potencias como en el ejercicio 7.` },
        ],
        solucion: { escena: 'cp6/l8', pasos: [
          { texto: R`$y_h = k\,e^{-2t}$.` },
          { texto: R`Polinomio: $2a = 1$, $2a + 2b = 2$, $b + 2c = 1$, de donde $a = \frac12$, $b = \frac12$, $c = \frac14$. Exponencial: $6\alpha = 1$, $\alpha = \frac16$.` },
          { texto: R`Solución general: $y = k\,e^{-2t} + \frac{t^2}{2} + \frac t2 + \frac14 + \frac16 e^{4t}$.` },
          { texto: R`$y(0) = k + \frac14 + \frac16 = 0 \Rightarrow k = -\frac{5}{12}$.` },
        ] },
        aprendes: { resultado: R`$y = -\frac{5}{12}e^{-2t} + \frac{t^2}{2} + \frac t2 + \frac14 + \frac16 e^{4t}$.`, ideas: [
          { idea: 'Superposición de forzantes', texto: R`Si $b = b_1 + b_2$, una particular es $y_{p1} + y_{p2}$, con $y_{pi}$ particular para $b_i$ (la ecuación es lineal).` },
          ideasLineal[0],
        ] },
      }],
    },
  ],
};
