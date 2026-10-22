// Clase Práctica 4 (fuentes/cp/cp4.pdf): método de Euler, existencia y unicidad.
const R = String.raw;
const C = (t, l = 4) => ({ l, t });

const parteEuler = (id, etiqueta, enunciado, escena, pasos, resultado, extra) => ({
  id, etiqueta, enunciado,
  pistas: [
    { tipo: 'concepto', texto: R`Es el esquema iterativo de Euler: $t_{k+1} = t_k + \Delta t$, $y_{k+1} = y_k + f(t_k, y_k)\Delta t$.`, enlaces: [C('formula-euler'), C('ejemplo-euler')] },
    { tipo: 'estrategia', texto: R`Organiza una tabla con columnas $k$, $t_k$, $y_k$ y $f(t_k, y_k)$: cada fila sale de la anterior.` },
    { tipo: 'arranque', texto: R`¿Cuántos pasos hacen falta para cubrir el intervalo con ese $\Delta t$? Empieza calculando la pendiente en el dato inicial.` },
    ...(extra ? [{ tipo: 'desbloqueo', texto: extra }] : []),
  ],
  solucion: { escena, pasos },
  aprendes: { resultado, ideas: [
    { idea: 'La tabla es el método', texto: R`Pendiente en el punto actual × paso = subida. Con la tabla bien ordenada, Euler es mecánico.` },
    { idea: 'Compara siempre con el campo', texto: R`Si los puntos de Euler contradicen el campo (cruzan un equilibrio, oscilan donde no debería), el paso es demasiado grande.` },
  ] },
});

export default {
  numero: 4,
  ejercicios: [
    {
      id: 'cp4-1', numero: 1, nombre: 'Euler a mano: tabla y bosquejo',
      enunciado: R`Use el Método de Euler con el tamaño de paso $\Delta t$ dado para cada uno de los siguientes problemas de valor inicial en el intervalo indicado. Para cada inciso, su respuesta debe incluir una tabla de los valores aproximados de la variable dependiente y un bosquejo de la gráfica de la solución aproximada.`,
      partes: [
        parteEuler('a', '1.1', R`$\dydt = 2y + 1$, $y(0) = 3$, $0 \le t \le 2$, $\Delta t = 0.5$`, 'cp4/1-1', [
          { texto: R`Campo de $2y + 1$ y el dato $(0, 3)$. Hacen falta $\frac{2}{0.5} = 4$ pasos.` },
          { texto: R`Tabla: $y_1 = 3 + 7(0.5) = 6.5$; $y_2 = 6.5 + 14(0.5) = 13.5$; $y_3 = 13.5 + 28(0.5) = 27.5$; $y_4 = 27.5 + 56(0.5) = 55.5$.` },
          { texto: R`Bosquejo: puntos que crecen cada vez más rápido. La solución verdadera ($y = \frac72 e^{2t} - \frac12$, $y(2) \approx 190.6$) queda muy por encima: con $\Delta t = 0.5$ el error es enorme.` },
        ], R`$y(2) \approx 55.5$ (Euler); la solución verdadera vale $\approx 190.6$.`, R`Cada pendiente es $2y_k + 1$: no depende de $t$, solo del último valor.`),
        parteEuler('b', '1.2', R`$\dydt = t - y^2$, $y(0) = 1$, $0 \le t \le 1$, $\Delta t = 0.25$`, 'cp4/1-2', [
          { texto: R`Campo de $t - y^2$ y el dato $(0, 1)$. Cuatro pasos.` },
          { texto: R`Tabla: $y_1 = 1 + (0 - 1)(0.25) = 0.75$; $y_2 = 0.75 + (0.25 - 0.5625)(0.25) \approx 0.6719$; $y_3 \approx 0.6840$; $y_4 \approx 0.7545$.` },
          { texto: R`Bosquejo: baja mientras $y^2 > t$ y vuelve a subir cuando cruza la isoclina $y = \sqrt t$ (donde la pendiente es $0$).` },
        ], R`$y(1) \approx 0.7545$; la aproximación baja hasta $\approx 0.67$ y vuelve a subir.`, R`Aquí la pendiente depende de $t$ y de $y$: calcula $t_k - y_k^2$ con cuidado en cada fila.`),
        parteEuler('c', '1.3', R`$\dfrac{dw}{dt} = (3 - w)(w + 1)$, $w(0) = 0$, $0 \le t \le 5$, $\Delta t = 0.5$`, 'cp4/1-3', [
          { texto: R`Campo de $(3 - w)(w + 1)$ y el dato $(0, 0)$. Diez pasos. Equilibrios: $w = 3$ (estable) y $w = -1$.` },
          { texto: R`Tabla: $w_1 = 1.5$, $w_2 = 3.375$, $w_3 \approx 2.5547$, $w_4 \approx 3.3462$, $w_5 \approx 2.5939$, …, $w_{10} \approx 3.29$: <b>oscila</b> alrededor de $3$.` },
          { texto: R`La solución verdadera sube de forma monótona hacia $3$ sin cruzarlo (unicidad: $w \equiv 3$ es solución). La oscilación es un artefacto de $\Delta t = 0.5$, demasiado grande: compáralo con la «limitación» $e^t\sin y$ de la conferencia.` },
        ], R`Euler oscila alrededor de $w = 3$ y se queda allí; la solución real tiende a $3$ sin cruzarlo.`, R`En el segundo paso ya te pasas de $3$: ¿qué dice el campo que debería pasar con una solución que empieza en $0$?`),
      ],
    },
    {
      id: 'cp4-2', numero: 2, nombre: 'El paracaidista: 95 % de la velocidad terminal',
      enunciado: R`La velocidad $v$ de un paracaidista en caída libre está bien modelada por la ecuación diferencial $m\dfrac{dv}{dt} = mg - kv^2$. Considere un paracaidista de masa $m = 54$ kg ($120$ lb) con un coeficiente de arrastre $k = 0.18$ kg/m. Use el Método de Euler para determinar cuánto tiempo tardará el paracaidista en alcanzar el $95\,\%$ de su velocidad terminal después de saltar del avión.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Dos herramientas: la velocidad terminal es el equilibrio estable de una autónoma (Conf 3, ejercicio 7 de la CP3), y el tiempo se estima con el método de Euler.`, enlaces: [C('caso-autonomo', 3), C('formula-euler')] },
          { tipo: 'estrategia', texto: R`Primero calcula la velocidad terminal (donde $\frac{dv}{dt} = 0$), luego el objetivo $0.95\,v_T$, y por último itera Euler desde $v(0) = 0$ hasta superarlo.` },
          { tipo: 'arranque', texto: R`Divide entre $m$: $\frac{dv}{dt} = g - \frac{k}{m}v^2$. ¿Para qué $v > 0$ se anula?` },
          { tipo: 'desbloqueo', texto: R`Toma $g = 9.8$ y un paso como $\Delta t = 0.1$ s (con un programa o una hoja de cálculo); comprueba que con $\Delta t$ menor el tiempo apenas cambia.` },
        ],
        solucion: { escena: 'cp4/2', pasos: [
          { texto: R`$v_T = \sqrt{\frac{mg}{k}} = \sqrt{\frac{54\cdot 9.8}{0.18}} = \sqrt{2940} \approx 54.22$ m/s; el objetivo es $0.95\,v_T \approx 51.51$ m/s.` },
          { texto: R`Euler desde $v(0) = 0$ con $\Delta t = 0.1$: $v_{k+1} = v_k + \left(9.8 - \frac{0.18}{54}v_k^2\right)(0.1)$. La velocidad crece cada vez más despacio.` },
          { texto: R`Se supera $51.51$ m/s en $t \approx 10.1$ s ($\Delta t = 0.5$ da $10.0$; $\Delta t = 0.01$ da $10.13$; la fórmula exacta $v = v_T\tanh\frac{gt}{v_T}$ da $10.13$ s).` },
        ] },
        aprendes: { resultado: R`Unos $10.1$ segundos.`, ideas: [
          { idea: 'Equilibrio primero, numérico después', texto: R`El análisis cualitativo da el objetivo ($v_T$) sin cálculo; Euler solo hace falta para el «cuánto tarda».` },
          { idea: 'Validar refinando el paso', texto: R`Si al reducir $\Delta t$ la respuesta casi no cambia, puedes confiar en ella (tema «unicidad y método numérico»).` },
        ] },
      }],
    },
    {
      id: 'cp4-3', numero: 3, nombre: R`$\dfrac{dy}{dt} = \sqrt y$ con tres pasos distintos`,
      enunciado: R`Considere el problema de valor inicial $\dydt = \sqrt y$, $y(0) = 1$. Usando el Método de Euler, calcule tres soluciones aproximadas diferentes correspondientes a $\Delta t = 1.0$, $0.5$ y $0.25$ en el intervalo $0 \le t \le 4$. Grafique las tres soluciones. ¿Qué predicciones hace sobre la solución real del problema de valor inicial?`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Euler y su error: al reducir $\Delta t$ el error disminuye proporcionalmente, y aproximaciones con $\Delta t$ cada vez menores se acercan a la solución única.`, enlaces: [C('error-euler'), C('unicidad-numerico')] },
          { tipo: 'estrategia', texto: R`Haz las tres tablas y mira qué pasa con el valor en $t = 4$ al dividir el paso entre dos.` },
          { tipo: 'arranque', texto: R`Con $\Delta t = 1$: $y_1 = 1 + \sqrt1\cdot 1 = 2$. Sigue igual con las otras.` },
          { tipo: 'desbloqueo', texto: R`La solución es creciente y convexa (su pendiente $\sqrt y$ aumenta): ¿los segmentos de Euler quedan por encima o por debajo?` },
        ],
        solucion: { escena: 'cp4/3', pasos: [
          { texto: R`Valores en $t = 4$: $\Delta t = 1$: $7.56$; $\Delta t = 0.5$: $8.23$; $\Delta t = 0.25$: $8.60$.` },
          { texto: R`Al reducir el paso, los valores aumentan y la diferencia se reduce aproximadamente a la mitad cada vez ($0.67$, $0.37$): convergen.` },
          { texto: R`Predicción: la solución real está por encima de las tres y vale algo más de $8.6$ en $t = 4$. (Separando: $2\sqrt y = t + 2$, $y = \left(\frac{t}{2} + 1\right)^2$, $y(4) = 9$.)` },
        ] },
        aprendes: { resultado: R`Las aproximaciones crecen hacia la solución real $y = \left(\frac{t}{2} + 1\right)^2$; $y(4) = 9$.`, ideas: [
          { idea: 'Extrapolar con el orden del método', texto: R`Si el error es $\approx C\Delta t$, las diferencias entre aproximaciones sucesivas se reducen a la mitad: puedes estimar el límite.` },
          { idea: 'Convexidad y signo del error', texto: R`Solución convexa ⇒ Euler queda por debajo. Mira la segunda derivada antes de interpretar los números.` },
        ] },
      }],
    },
    {
      id: 'cp4-4', numero: 4, nombre: R`¿Qué dice el teorema? $y(0) = 4$`,
      enunciado: R`Se da una condición inicial para la ecuación diferencial $\dydt = y(y - 1)(y - 3)$. ¿Qué dice el Teorema de Existencia y Unicidad sobre la solución correspondiente? $y(0) = 4$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Teoremas de existencia (f continua) y de unicidad ($f$ y $\frac{\partial f}{\partial y}$ continuas); consecuencia: las soluciones no se cruzan, y los equilibrios acotan.`, enlaces: [C('existencia'), C('unicidad'), C('acotadas')] },
          { tipo: 'estrategia', texto: R`Comprueba las hipótesis y luego busca soluciones conocidas cerca del dato inicial que sirvan de barrera.` },
          { tipo: 'arranque', texto: R`¿Qué soluciones constantes tiene la ecuación? ¿Cuál está más cerca de $y = 4$?` },
        ],
        solucion: { escena: 'cp4/4', pasos: [
          { texto: R`$f(t, y) = y(y - 1)(y - 3)$ y $\frac{\partial f}{\partial y} = 3y^2 - 8y + 3$ son polinomios: continuas en todo el plano. Existe solución y es única.` },
          { texto: R`$y \equiv 0$, $y \equiv 1$ y $y \equiv 3$ son soluciones de equilibrio.` },
          { texto: R`Como $y(0) = 4 > 3$ y no puede tocar a $y \equiv 3$, se tiene $y(t) > 3$ en todo su dominio. Además $f(4) = 12 > 0$: crece (de hecho explota en tiempo finito), y hacia atrás se acerca a $3$.` },
        ] },
        aprendes: { resultado: R`Existe una única solución, y cumple $y(t) > 3$ en todo su dominio.`, ideas: [
          { idea: 'Polinomios: hipótesis gratis', texto: R`Si $f$ es un polinomio en $t$ e $y$, existencia y unicidad se cumplen en todo el plano.` },
          { idea: 'El teorema dice poco, pero firme', texto: R`No da la fórmula, pero sí: una sola solución y su orden respecto a los equilibrios.` },
        ] },
      }],
    },
    {
      id: 'cp4-5', numero: 5, nombre: 'Encerrada entre dos soluciones',
      enunciado: R`Considere la ecuación $\dydt = -y^2 + y + 2yt^2 + 2t - t^2 - t^4$.`,
      partes: [
        {
          id: 'a', etiqueta: '5.1', enunciado: R`Demuestre que $y_1(t) = t^2$ y $y_2(t) = t^2 + 1$ son soluciones.`,
          pistas: [
            { tipo: 'concepto', texto: R`Una solución se comprueba sustituyendo (Conf 2).`, enlaces: [{ l: 2, t: 'solucion' }] },
            { tipo: 'estrategia', texto: R`Calcula por separado $y'$ y el lado derecho con $y = t^2$; luego con $y = t^2 + 1$.` },
            { tipo: 'arranque', texto: R`Para $y_2$, desarrolla $(t^2 + 1)^2 = t^4 + 2t^2 + 1$ y agrupa por potencias de $t$.` },
          ],
          solucion: { pasos: [
            { texto: R`$y_1 = t^2$: $y_1' = 2t$ y el lado derecho es $-t^4 + t^2 + 2t^4 + 2t - t^2 - t^4 = 2t$ ✓.` },
            { texto: R`$y_2 = t^2 + 1$: $y_2' = 2t$ y el lado derecho es $-(t^4 + 2t^2 + 1) + (t^2 + 1) + 2(t^2 + 1)t^2 + 2t - t^2 - t^4$.` },
            { texto: R`Agrupando: $t^4(-1 + 2 - 1) + t^2(-2 + 1 + 2 - 1) + (-1 + 1) + 2t = 2t$ ✓.` },
          ] },
          aprendes: { resultado: R`Ambas son soluciones (en todo $\R$).`, ideas: [
            { idea: 'Agrupar por potencias', texto: R`Al verificar con polinomios, ordena por potencias: los términos se cancelan por grupos y es fácil no equivocarse.` },
            { idea: 'Sustituir es suficiente', texto: R`No hace falta saber de dónde salieron las soluciones para comprobarlas.` },
          ] },
        },
        {
          id: 'b', etiqueta: '5.2', enunciado: R`Demuestre que si $y(t)$ es una solución de la ecuación del inciso anterior y si $0 < y(0) < 1$, entonces $t^2 < y(t) < t^2 + 1$ para todo $t$.`,
          pistas: [
            { tipo: 'concepto', texto: R`Teorema de unicidad: las gráficas de soluciones distintas nunca se cruzan (aplicación «soluciones acotadas por equilibrios»).`, enlaces: [C('unicidad'), C('acotadas')] },
            { tipo: 'estrategia', texto: R`Compara los valores en $t = 0$ de $y$, $y_1$ y $y_2$. ¿Qué tendría que ocurrir para que $y$ saliera de la franja?` },
            { tipo: 'arranque', texto: R`Comprueba que $f$ y $\frac{\partial f}{\partial y}$ son continuas, y usa Bolzano con $y - y_1$ si $y$ llegara a estar por debajo de $y_1$.` },
          ],
          solucion: { escena: 'cp4/5', pasos: [
            { texto: R`$f$ y $\frac{\partial f}{\partial y} = -2y + 1 + 2t^2$ son polinomios, continuas en todo el plano: hay unicidad en todo punto. En $t = 0$: $y_1(0) = 0 < y(0) < 1 = y_2(0)$.` },
            { texto: R`Si en algún $t$ fuera $y(t) \le y_1(t)$, la función continua $y - y_1$ (positiva en $0$) se anularía en algún instante $s$ (Bolzano): $y(s) = y_1(s)$, y por unicidad $y \equiv y_1$, contradiciendo $y(0) \ne y_1(0)$. Igual con $y_2$. Luego $t^2 < y(t) < t^2 + 1$ para todo $t$ del dominio.` },
          ] },
          aprendes: { resultado: R`La solución queda atrapada: $t^2 < y(t) < t^2 + 1$.`, ideas: [
            { idea: 'Sándwich de soluciones', texto: R`Dos soluciones conocidas que encierran el dato inicial encierran toda la solución (con unicidad).` },
            { idea: 'Bolzano + unicidad', texto: R`Para probar que dos soluciones no se cruzan: si su diferencia cambiara de signo, se anularía en un punto, y ahí la unicidad las haría iguales.` },
          ] },
        },
      ],
    },
    {
      id: 'cp4-6', numero: 6, nombre: 'Fórmula, dominio y por qué no se extiende',
      enunciado: R`Para cada uno de los siguientes problemas de valor inicial: 6.1 encuentre una fórmula para la solución; 6.2 indique el dominio de definición de la solución; 6.3 describa qué sucede con la solución cuando se aproxima a los límites de su dominio de definición. ¿Por qué no se puede extender la solución por más tiempo? (a) $\dydt = y^3$, $y(0) = 1$; (b) $\dydt = \dfrac{1}{(y + 1)(t - 2)}$, $y(0) = 0$.`,
      partes: [
        {
          id: 'a', etiqueta: '(a)', enunciado: R`$\dydt = y^3$, $y(0) = 1$`,
          pistas: [
            { tipo: 'concepto', texto: R`Separación de variables (Conf 2) y la solución que explota en tiempo finito ($\tan t$, Conf 4).`, enlaces: [{ l: 2, t: 'metodo' }, C('existencia')] },
            { tipo: 'estrategia', texto: R`Separa: $y^{-3}dy = dt$. Integra, usa el dato y despeja con el signo correcto de la raíz.` },
            { tipo: 'arranque', texto: R`$\int y^{-3}dy = -\frac{1}{2y^2}$. ¿Cuánto vale $C$ con $y(0) = 1$?` },
          ],
          solucion: { pasos: [
            { texto: R`$-\frac{1}{2y^2} = t + C$; con $y(0) = 1$: $C = -\frac12$. Luego $y^2 = \frac{1}{1 - 2t}$ y, como $y(0) = 1 > 0$, $y(t) = \dfrac{1}{\sqrt{1 - 2t}}$.` },
            { texto: R`Dominio: $1 - 2t > 0$, es decir $t \in \left(-\infty, \frac12\right)$.` },
            { texto: R`Cuando $t \to \frac12^-$, $y \to +\infty$: explota en tiempo finito; no hay valor que darle en $t = \frac12$. Cuando $t \to -\infty$, $y \to 0^+$.` },
          ] },
          aprendes: { resultado: R`$y = \frac{1}{\sqrt{1 - 2t}}$ en $\left(-\infty, \frac12\right)$; explota en $t = \frac12$.`, ideas: [
            { idea: 'Crecimiento superlineal ⇒ explosión', texto: R`Si $f \sim y^p$ con $p > 1$, espera que la solución explote en tiempo finito.` },
            { idea: 'El dato elige el signo', texto: R`Al despejar una raíz, el signo lo decide la condición inicial.` },
          ] },
        },
        {
          id: 'b', etiqueta: '(b)', enunciado: R`$\dydt = \dfrac{1}{(y + 1)(t - 2)}$, $y(0) = 0$`,
          pistas: [
            { tipo: 'concepto', texto: R`Separación de variables y el teorema de existencia: fuera de donde $f$ es continua no hay garantías.`, enlaces: [{ l: 2, t: 'metodo' }, C('existencia')] },
            { tipo: 'estrategia', texto: R`Separa: $(y + 1)\,dy = \frac{dt}{t - 2}$. Integra ambos lados.` },
            { tipo: 'arranque', texto: R`Cerca de $t = 0$ es $t < 2$, así que $\ln|t - 2| = \ln(2 - t)$. Al despejar $y + 1$, ¿qué signo de la raíz corresponde a $y(0) = 0$?` },
            { tipo: 'desbloqueo', texto: R`La raíz $\sqrt{1 + 2\ln\frac{2 - t}{2}}$ necesita que el radicando sea positivo: de ahí sale el borde derecho del dominio.` },
          ],
          solucion: { escena: 'cp4/6', pasos: [
            { texto: R`(a) Recordatorio: $y = \frac{1}{\sqrt{1 - 2t}}$ explota en $t = \frac12$.` },
            { texto: R`(b) $\frac{(y+1)^2}{2} = \ln(2 - t) + C$; con $y(0) = 0$: $C = \frac12 - \ln 2$. Como $y + 1 = 1 > 0$: $y(t) = -1 + \sqrt{1 + 2\ln\frac{2 - t}{2}}$. Dominio: $1 + 2\ln\frac{2 - t}{2} > 0 \iff t < 2 - 2e^{-1/2} \approx 0.787$; es decir, $\left(-\infty,\ 2 - 2e^{-1/2}\right)$. En el borde derecho $y \to -1$ con pendiente infinita: allí $f$ no está definida ($y + 1 = 0$), así que la solución no puede continuar.` },
          ] },
          aprendes: { resultado: R`$y = -1 + \sqrt{1 + 2\ln\frac{2 - t}{2}}$ en $\left(-\infty,\ 2 - 2e^{-1/2}\right)$; termina al llegar a $y = -1$.`, ideas: [
            { idea: 'Dos maneras de terminar', texto: R`Una solución puede dejar de existir porque explota ($y \to \infty$) o porque llega a un punto donde $f$ no está definida.` },
            { idea: 'Valor absoluto del logaritmo', texto: R`$\int \frac{dt}{t - 2} = \ln|t - 2|$: decide el signo según el lado de $t = 2$ en el que está el dato.` },
          ] },
        },
      ],
    },
    {
      id: 'cp4-7', numero: 7, nombre: 'Las autónomas no tienen máximos (salvo las constantes)',
      enunciado: R`Considere una ecuación diferencial de la forma $\dydt = f(y)$, una ecuación autónoma, y suponga que la función $f(y)$ es continuamente diferenciable. 7.1 Suponga que $y_1(t)$ es una solución y que $y_1(t)$ tiene un máximo local en $t = t_0$. Sea $y_0 = y_1(t_0)$. Demuestre que $f(y_0) = 0$. 7.2 Use la información de 7.1 para bosquejar el campo de pendientes a lo largo de la recta $y = y_0$ en el plano $ty$. 7.3 Demuestre que la función constante $y_2(t) = y_0$ es una solución. 7.4 Demuestre que $y_1(t) = y_0$ para todo $t$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Teorema de unicidad ($f$ de clase $C^1$) y la propiedad de las autónomas: marcas paralelas en cada recta horizontal.`, enlaces: [C('unicidad'), C('caso-autonomo', 3)] },
          { tipo: 'estrategia', texto: R`7.1 es Cálculo I: en un extremo local interior de una función derivable, la derivada vale $0$.` },
          { tipo: 'arranque', texto: R`$y_1'(t_0) = 0$ y la ecuación dice $y_1'(t_0) = f(y_1(t_0))$. Para 7.2, ¿depende $f(y_0)$ de $t$?` },
          { tipo: 'desbloqueo', texto: R`En 7.4: $y_1$ e $y_2$ pasan por el mismo punto $(t_0, y_0)$, y $f$ es $C^1$.` },
        ],
        solucion: { escena: 'cp4/7', pasos: [
          { texto: R`7.1: $t_0$ es un máximo local interior y $y_1$ es derivable ⇒ $y_1'(t_0) = 0$ (Fermat). Pero $y_1'(t_0) = f(y_1(t_0)) = f(y_0)$; luego $f(y_0) = 0$.` },
          { texto: R`7.2: como la ecuación es autónoma, en cada punto $(t, y_0)$ la pendiente es $f(y_0) = 0$: marcas horizontales a lo largo de toda la recta $y = y_0$.` },
          { texto: R`7.3: $y_2(t) = y_0$ cumple $y_2' = 0 = f(y_0) = f(y_2(t))$: es solución.` },
          { texto: R`7.4: $y_1$ e $y_2$ son soluciones con $y_1(t_0) = y_0 = y_2(t_0)$; $f$ es $C^1$, así que $f$ y $\frac{\partial f}{\partial y} = f'$ son continuas: por unicidad, $y_1 = y_2 = y_0$.` },
        ] },
        aprendes: { resultado: R`Una solución no constante de una autónoma ($f \in C^1$) no tiene máximos ni mínimos locales: es monótona.`, ideas: [
          { idea: 'Derivada cero en un extremo + la EDO', texto: R`En un extremo, $y' = 0$, así que la EDO dice $f(\text{valor}) = 0$: los extremos solo pueden estar en equilibrios.` },
          { idea: 'Unicidad convierte «toca» en «es»', texto: R`Si una solución toca una solución conocida, es esa solución. Úsalo para descartar comportamientos.` },
        ] },
      }],
    },
  ],
};
