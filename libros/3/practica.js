// Clase Práctica 3 (fuentes/cp/cp3.pdf): campos de pendientes. Pistas una a una (la primera, el tema de la
// conferencia), solución modelo y «qué te llevas».
const R = String.raw;
const C = (t) => ({ l: 3, t });

const esbozoPartes = [
  {
    id: 'a', etiqueta: '1.1', enunciado: R`$\dydt = t^2 + t$`, escena: 'cp3/1-1',
    concepto: R`El lado derecho solo depende de $t$: es el <b>caso especial 1</b> (marcas paralelas en cada recta vertical). El procedimiento general del campo está en la definición.`,
    enlaces: [C('definicion'), C('caso-f-t')],
    pistas: [
      { tipo: 'estrategia', texto: R`No calcules punto por punto a ciegas: busca primero dónde la pendiente es $0$ (la <b>isoclina nula</b>) y dónde es fácil, como $f = 2$.` },
      { tipo: 'arranque', texto: R`$t^2 + t = t(t + 1)$. ¿Para qué $t$ se anula? ¿Qué forma tienen esas «curvas» en el plano $ty$ si no depende de $y$?` },
      { tipo: 'desbloqueo', texto: R`Una vez dibujada una columna, las demás de la misma $t$ son iguales: copia hacia arriba y hacia abajo.` },
    ],
    pasos: [
      { texto: R`Red de la conferencia: en $t = -2, -1, 0, 1, 2$ la pendiente vale $2, 0, 0, 2, 6$, sin importar $y$ (la escribimos en cada punto).` },
      { texto: R`Dibujamos las 25 marcas: en cada columna vertical, todas paralelas.` },
      { texto: R`Isoclinas: $f = 0 \iff t(t + 1) = 0 \iff t = 0$ o $t = -1$ (rectas verticales con marcas horizontales); $f = 2 \iff t = 1$ o $t = -2$.` },
      { texto: R`Rellenamos con más marcas: pendientes grandes y positivas para $|t|$ grande; ligeramente negativas entre $-1$ y $0$ (mínimo $-\frac14$ en $t = -\frac12$).` },
      { texto: R`Las soluciones son $y = \frac{t^3}{3} + \frac{t^2}{2} + C$: traslaciones verticales unas de otras, con un máximo local en $t = -1$ y un mínimo en $t = 0$.` },
    ],
    resultado: R`Campo con columnas paralelas; soluciones $y = \frac{t^3}{3} + \frac{t^2}{2} + C$, todas la misma curva desplazada en vertical.`,
    ideas: [
      { idea: 'f(t): una columna basta', texto: R`Si $f$ no depende de $y$, calcula una sola marca por cada $t$ y cópiala en toda la columna.` },
      { idea: 'Isoclina nula = extremos', texto: R`Las soluciones cruzan $f = 0$ con tangente horizontal: allí tienen sus máximos y mínimos.` },
    ],
  },
  {
    id: 'b', etiqueta: '1.2', enunciado: R`$\dydt = 1 - 2y$`, escena: 'cp3/1-2',
    concepto: R`El lado derecho solo depende de $y$: es una <b>autónoma</b> (caso especial 2): marcas paralelas en cada recta horizontal, y cada cero de $f$ da una solución de equilibrio.`,
    enlaces: [C('definicion'), C('caso-autonomo')],
    pistas: [
      { tipo: 'estrategia', texto: R`En una autónoma, el campo es el mismo en todas las columnas: calcula la pendiente para cada altura $y$ y extiéndela en horizontal.` },
      { tipo: 'arranque', texto: R`¿A qué altura es $1 - 2y = 0$? Esa recta horizontal es especial: ¿qué tipo de solución es?` },
      { tipo: 'desbloqueo', texto: R`Mira el signo de $1 - 2y$ por encima y por debajo de esa altura: ¿las soluciones se acercan o se alejan de ella?` },
    ],
    pasos: [
      { texto: R`Red: para $y = -2, -1, 0, 1, 2$ la pendiente es $5, 3, 1, -1, -3$ en todas las columnas.` },
      { texto: R`Las 25 marcas: en cada fila horizontal, todas paralelas.` },
      { texto: R`Isoclinas (rectas horizontales): $f = 0 \iff y = \frac12$ (equilibrio); $f = 1 \iff y = 0$; $f = -1 \iff y = 1$.` },
      { texto: R`Campo completo: por encima de $y = \frac12$ las marcas bajan; por debajo, suben. Cuanto más lejos, más empinadas.` },
      { texto: R`Todas las soluciones tienden a $y = \frac12$: es un equilibrio estable.` },
    ],
    resultado: R`Equilibrio $y = \frac12$, estable; las demás soluciones se acercan a él desde arriba (bajando) o desde abajo (subiendo).`,
    ideas: [
      { idea: 'Autónoma: piensa en filas', texto: R`La pendiente depende solo de la altura. Una tabla «$y$ ↦ pendiente» describe el campo entero.` },
      { idea: 'Signo a cada lado del equilibrio', texto: R`Si por encima baja y por debajo sube, el equilibrio atrae (estable). Es la línea de fase del Libro V.` },
    ],
  },
  {
    id: 'c', etiqueta: '1.3', enunciado: R`$\dydt = 2y(1 - y)$`, escena: 'cp3/1-3',
    concepto: R`Autónoma como el ejemplo $4y(1 - y)$ de la conferencia (caso especial 2): equilibrios en los ceros, crecimiento entre ellos.`,
    enlaces: [C('caso-autonomo')],
    pistas: [
      { tipo: 'estrategia', texto: R`Compárala con el ejemplo resuelto de la conferencia: ¿qué cambia al pasar de $4$ a $2$?` },
      { tipo: 'arranque', texto: R`Resuelve $2y(1 - y) = 0$ y estudia el signo en los tres intervalos que quedan.` },
      { tipo: 'desbloqueo', texto: R`El factor $2$ en lugar de $4$ no cambia signos ni equilibrios, solo hace las marcas menos empinadas: las soluciones son las mismas «estiradas» en el tiempo.` },
    ],
    pasos: [
      { texto: R`Red: para $y = -2, -1, 0, 1, 2$ la pendiente es $-12, -4, 0, 0, -4$.` },
      { texto: R`Marcas paralelas en cada fila.` },
      { texto: R`Isoclina nula: $y = 0$ y $y = 1$ (equilibrios).` },
      { texto: R`Signos: $f > 0$ si $0 < y < 1$; $f < 0$ si $y < 0$ o $y > 1$.` },
      { texto: R`Las soluciones con $0 < y(0) < 1$ suben hacia $1$; con $y(0) > 1$ bajan hacia $1$; con $y(0) < 0$ bajan sin cota. $y = 1$ estable, $y = 0$ inestable.` },
    ],
    resultado: R`Mismo dibujo cualitativo que $4y(1 - y)$, pero más lento: $y = 1$ estable, $y = 0$ inestable.`,
    ideas: [
      { idea: 'Multiplicar f por una constante positiva', texto: R`$y' = cf(y)$ con $c > 0$ tiene los mismos equilibrios, signos y forma de soluciones; solo cambia la velocidad.` },
      { idea: 'Reconocer un modelo conocido', texto: R`$2y(1 - y)$ es logística con $k = 2$, $N = 1$: puedes reutilizar todo lo del Libro I.` },
    ],
  },
  {
    id: 'd', etiqueta: '1.4', enunciado: R`$\dydt = y + t + 1$`, escena: 'cp3/1-4',
    concepto: R`Como en el ejemplo resuelto $y - t$, el lado derecho es lineal en $t$ e $y$: las isoclinas son rectas diagonales.`,
    enlaces: [C('ejemplo-y-t'), C('definicion')],
    pistas: [
      { tipo: 'estrategia', texto: R`Las isoclinas $y + t + 1 = c$ son rectas. Dibuja varias ($c = 0, -1, 1$) con sus marcas.` },
      { tipo: 'arranque', texto: R`¿Dónde es $f = 0$? Escribe la recta $y = \dots$ y piensa: ¿por encima la pendiente es positiva o negativa?` },
      { tipo: 'desbloqueo', texto: R`Mira la isoclina $f = -1$: es la recta $y = -t - 2$, que tiene pendiente $-1$… igual que sus marcas. ¿Qué significa eso?` },
    ],
    pasos: [
      { texto: R`Red: $f(t, y) = y + t + 1$ en los 25 puntos (escritos en el dibujo; por ejemplo $f(0, 0) = 1$, $f(-2, -2) = -3$).` },
      { texto: R`Las 25 marcas.` },
      { texto: R`Isoclinas: $f = 0 \iff y = -t - 1$ (marcas horizontales); $f = -1 \iff y = -t - 2$: esa recta tiene pendiente $-1$, la misma que sus marcas, así que <b>es una solución</b>.` },
      { texto: R`Por encima de $y = -t - 1$ las soluciones crecen; por debajo, decrecen.` },
      { texto: R`Las soluciones se separan de la recta solución $y = -t - 2$: por encima crecen cada vez más rápido; por debajo caen. (Es la ecuación $y - t$ de la conferencia reflejada.)` },
    ],
    resultado: R`Isoclinas rectas; $y = -t - 2$ es una solución recta y las demás se alejan de ella.`,
    ideas: [
      { idea: 'Isoclina con su propia pendiente = solución', texto: R`Si una isoclina $f = c$ es una recta de pendiente $c$, es una solución. Busca ese caso siempre que $f$ sea lineal.` },
      { idea: 'Relaciona con ejemplos resueltos', texto: R`$y + t + 1$ y $y - t$ tienen la misma estructura (lineal); el dibujo es análogo con otra diagonal.` },
    ],
  },
];

export default {
  numero: 3,
  ejercicios: [
    {
      id: 'cp3-1', numero: 1, nombre: 'Esbozar campos de pendientes',
      enunciado: R`Esboce los campos de pendientes para las ecuaciones diferenciales dadas. Comience con una red de puntos $(t, y)$ con $t = -2, -1, 0, 1, 2$ y $y = -2, -1, 0, 1, 2$, luego agregue más marcas de pendiente a otros puntos importantes en el plano $t$–$y$. (Deberá calcular el campo de pendientes en muchos más puntos para obtener una gráfica más exacta.)`,
      nota: R`El PDF escribe «$y = -2, -1, -0, 1, 2$»: el «$-0$» es $0$.`,
      partes: esbozoPartes.map((x) => ({
        id: x.id, etiqueta: x.etiqueta, enunciado: x.enunciado,
        pistas: [{ tipo: 'concepto', texto: x.concepto, enlaces: x.enlaces }, ...x.pistas],
        solucion: { pasos: x.pasos.map((t) => ({ texto: t.texto })), escena: x.escena },
        aprendes: { resultado: x.resultado, ideas: x.ideas },
      })),
    },
    {
      id: 'cp3-2', numero: 2, nombre: R`Si $f(t, 3) = -1$ para todo $t$`,
      enunciado: R`Suponga que sabemos que la función $f(t, y)$ es continua y que $f(t, 3) = -1$ para todo $t$.`,
      partes: [
        {
          id: 'a', etiqueta: '2.1', enunciado: R`¿Qué nos dice esta información sobre el campo de pendientes para la ecuación diferencial $\dydt = f(t, y)$?`,
          pistas: [
            { tipo: 'concepto', texto: R`El campo dibuja en cada punto una marca de pendiente $f(t, y)$ (definición del campo de pendientes).`, enlaces: [C('definicion'), C('geometria')] },
            { tipo: 'estrategia', texto: R`¿Qué puntos del plano tienen $y = 3$? Dibuja ese conjunto.` },
            { tipo: 'arranque', texto: R`En cada uno de esos puntos, ¿qué pendiente tiene la marca? ¿Y fuera de ellos, se sabe algo?` },
          ],
          solucion: { pasos: [
            { texto: R`Los puntos con $y = 3$ forman la recta horizontal $y = 3$.` },
            { texto: R`En cada punto $(t, 3)$ la marca tiene pendiente $f(t, 3) = -1$: a lo largo de toda la recta, marcas paralelas inclinadas hacia abajo $45°$ (en escala igual).` },
            { texto: R`Fuera de esa recta no sabemos nada concreto, salvo que, por continuidad, cerca de $y = 3$ las pendientes son cercanas a $-1$ (negativas).` },
          ] },
          aprendes: { resultado: R`Sobre $y = 3$ todas las marcas tienen pendiente $-1$; por continuidad, cerca de ella también son negativas.`, ideas: [
            { idea: 'Un dato sobre una curva = marcas sobre esa curva', texto: R`Información del tipo «$f$ vale tal en este conjunto» se traduce en marcas sobre ese conjunto del plano.` },
            { idea: 'Continuidad extiende a los alrededores', texto: R`Si $f(t, 3) = -1 < 0$ y $f$ es continua, hay una franja alrededor de $y = 3$ donde $f < 0$.` },
          ] },
        },
        {
          id: 'b', etiqueta: '2.2', enunciado: R`¿Qué podemos concluir sobre las soluciones $y(t)$ de $\dydt = f(t, y)$? Por ejemplo, si $y(0) < 3$, ¿puede $y(t) \to \infty$ cuando $t$ aumenta?`,
          pistas: [
            { tipo: 'concepto', texto: R`Toda solución es tangente al campo en cada punto: si pasa por $(t_1, 3)$, su pendiente allí es $-1$ (observación fundamental).`, enlaces: [C('geometria'), C('del-campo-a-soluciones')] },
            { tipo: 'estrategia', texto: R`Para que $y(t) \to \infty$ partiendo de abajo de $3$, la solución tendría que cruzar $y = 3$ en algún momento. Busca una contradicción en el <b>primer</b> momento en que llega a $3$.` },
            { tipo: 'arranque', texto: R`Si $t_1$ es el primer instante con $y(t_1) = 3$ y antes $y < 3$, compara $y(t) - y(t_1)$ (negativo) con $t - t_1$ (negativo) para $t < t_1$: ¿qué signo tiene el cociente, y por tanto el límite $y'(t_1)$?` },
            { tipo: 'desbloqueo', texto: R`Ese límite es $\ge 0$; pero la ecuación dice $y'(t_1) = f(t_1, 3) = -1$.` },
          ],
          solucion: { escena: 'cp3/2', pasos: [
            { texto: R`Sobre la recta $y = 3$ el campo obliga a <b>bajar</b>: pendiente $-1$.` },
            { texto: R`Supongamos $y(0) < 3$ y que existe $t > 0$ con $y(t) \ge 3$. Por Bolzano hay instantes con $y = 3$; sea $t_1 > 0$ el primero (ínfimo). Para $0 \le t < t_1$, $y(t) < 3$, así que $\frac{y(t) - y(t_1)}{t - t_1} > 0$ (cociente de dos negativos) y, en el límite, $y'(t_1) \ge 0$. Pero $y'(t_1) = f(t_1, 3) = -1 < 0$: contradicción.` },
            { texto: R`Luego $y(t) < 3$ para todo $t \ge 0$ del dominio: la solución está acotada superiormente por $3$ y <b>no puede</b> tender a $\infty$.` },
          ] },
          aprendes: { resultado: R`Si $y(0) < 3$, entonces $y(t) < 3$ para todo $t \ge 0$; en particular, no puede tender a $\infty$.`, ideas: [
            { idea: 'Barrera: el campo apunta hacia un lado', texto: R`Si sobre una curva el campo empuja siempre hacia abajo, ninguna solución puede cruzarla de abajo arriba. Es una «barrera».` },
            { idea: 'Argumento del primer contacto', texto: R`Toma el primer instante en que pasaría lo prohibido y mira el signo de la derivada desde la izquierda: es la herramienta para probar que algo nunca ocurre (⚔ Libro I, logística).` },
          ] },
        },
      ],
    },
    {
      id: 'cp3-3', numero: 3, nombre: R`Si $y(t) = 2$ es solución`,
      enunciado: R`Suponga que la función constante $y(t) = 2$ para todo $t$ es una solución de la ecuación diferencial $\dydt = f(t, y)$.`,
      partes: [
        {
          id: 'a', etiqueta: '3.1', enunciado: R`¿Qué le dice esto sobre el campo de pendientes? En otras palabras, ¿cuánto del campo de pendientes puede esbozar usando esta información?`,
          pistas: [
            { tipo: 'concepto', texto: R`Ser solución = cumplir la ecuación en todo $t$; y la pendiente de la solución en cada punto es la marca del campo.`, enlaces: [C('geometria')] },
            { tipo: 'estrategia', texto: R`Sustituye $y(t) = 2$ en la ecuación. ¿Cuánto vale $\dydt$ para una constante?` },
            { tipo: 'arranque', texto: R`Obtendrás una igualdad sobre $f(t, 2)$. ¿En qué puntos del plano te dice algo?` },
          ],
          solucion: { pasos: [
            { texto: R`$y(t) = 2$ ⇒ $y'(t) = 0$; sustituyendo: $0 = f(t, 2)$ para todo $t$.` },
            { texto: R`Por tanto, sobre la recta $y = 2$ todas las marcas son horizontales.` },
            { texto: R`Es todo lo que se puede esbozar: fuera de $y = 2$ el campo es desconocido.` },
          ] },
          aprendes: { resultado: R`$f(t, 2) = 0$ para todo $t$: marcas horizontales sobre $y = 2$ y nada más.`, ideas: [
            { idea: 'Solución constante ⇔ f se anula a esa altura', texto: R`$y \equiv c$ es solución si y solo si $f(t, c) = 0$ para todo $t$.` },
            { idea: 'No sobreinterpretar', texto: R`Un dato sobre una recta no dice nada del resto del plano (salvo por continuidad, cerca).` },
          ] },
        },
        {
          id: 'b', etiqueta: '3.2', enunciado: R`¿Qué le dice esto sobre las soluciones con condiciones iniciales $y(0) \ne 2$?`,
          pistas: [
            { tipo: 'concepto', texto: R`Una solución de equilibrio es una recta horizontal del dibujo; las soluciones son curvas tangentes al campo que, al dibujarlas, no se cortan.`, enlaces: [C('del-campo-a-soluciones'), C('caso-autonomo')] },
            { tipo: 'estrategia', texto: R`Piensa qué pasaría si una solución con $y(0) > 2$ llegara a tocar $y = 2$: en ese punto habría dos soluciones pasando por el mismo punto.` },
            { tipo: 'arranque', texto: R`¿Qué teorema prohíbe que dos soluciones distintas pasen por el mismo punto, y qué pide sobre $f$? (Se ve en la próxima conferencia.)` },
          ],
          solucion: { escena: 'cp3/3', pasos: [
            { texto: R`Sabemos que $y = 2$ es solución (marcas horizontales sobre la recta) y nada más del campo.` },
            { texto: R`Si $f$ y $\frac{\partial f}{\partial y}$ son continuas (teorema de unicidad, Libro IV), dos soluciones no pueden tocarse: las de $y(0) > 2$ quedan siempre por encima de $2$, y las de $y(0) < 2$, siempre por debajo. Sin esa hipótesis no se puede asegurar (ver $3y^{2/3}$ en el Libro IV).` },
          ] },
          aprendes: { resultado: R`Con unicidad, $y = 2$ es una barrera: $y(0) > 2 \Rightarrow y(t) > 2$ y $y(0) < 2 \Rightarrow y(t) < 2$. No se sabe si se acercan o se alejan.`, ideas: [
            { idea: 'Los equilibrios dividen el plano', texto: R`Con unicidad, una solución constante separa el plano en dos regiones que ninguna solución puede abandonar.` },
            { idea: 'Distingue lo que sabes de lo que no', texto: R`El dato no dice si las demás soluciones se acercan o se alejan de $y = 2$: para eso hace falta el signo de $f$ a cada lado.` },
          ] },
        },
      ],
    },
    {
      id: 'cp3-4', numero: 4, nombre: R`$\tfrac{dS}{dt} = S^3 - 2S^2 + S$`,
      enunciado: R`Considere la ecuación diferencial autónoma $\dfrac{dS}{dt} = S^3 - 2S^2 + S$.`,
      partes: [
        {
          id: 'a', etiqueta: '4.1', enunciado: R`Haga un esbozo aproximado del campo de pendientes sin usar tecnología.`,
          pistas: [
            { tipo: 'concepto', texto: R`Autónoma: marcas paralelas en cada fila horizontal; los ceros de $f$ son soluciones de equilibrio (caso especial 2).`, enlaces: [C('caso-autonomo')] },
            { tipo: 'estrategia', texto: R`Factoriza el lado derecho: así ves de golpe ceros y signos.` },
            { tipo: 'arranque', texto: R`Saca factor común $S$. ¿Qué queda dentro? ¿Lo reconoces como un cuadrado?` },
            { tipo: 'desbloqueo', texto: R`$S(S - 1)^2$: el cuadrado no cambia de signo al cruzar $S = 1$. ¿Qué signo tiene $f$ justo por encima y justo por debajo de $1$?` },
          ],
          solucion: { pasos: [
            { texto: R`$S^3 - 2S^2 + S = S(S^2 - 2S + 1) = S(S - 1)^2$.` },
            { texto: R`Ceros: $S = 0$ y $S = 1$ (doble). Rectas horizontales de marcas planas: soluciones de equilibrio.` },
            { texto: R`Signo: $(S - 1)^2 \ge 0$, así que el signo es el de $S$: negativo si $S < 0$; positivo si $0 < S < 1$ y si $S > 1$.` },
            { texto: R`Las marcas suben en ambas franjas por encima de $0$ (más planas cerca de $1$) y bajan por debajo de $0$; crecen muy rápido para $|S|$ grande (término $S^3$).` },
          ] },
          aprendes: { resultado: R`Equilibrios $S = 0$ y $S = 1$; $f < 0$ si $S < 0$, $f > 0$ si $S > 0$ y $S \ne 1$.`, ideas: [
            { idea: 'Factorizar antes de dibujar', texto: R`Los ceros y el signo de un polinomio se leen de su factorización; un factor al cuadrado no cambia el signo.` },
            { idea: 'Raíz doble ⇒ el signo no cambia', texto: R`Alrededor de $S = 1$, $f$ es positivo a ambos lados: será un equilibrio de tipo «nodo» (Libro V).` },
          ] },
        },
        {
          id: 'b', etiqueta: '4.2', enunciado: R`Usando este dibujo, trace las gráficas de las soluciones $S(t)$ con las condiciones iniciales $S(0) = \frac12$, $S(1) = \frac12$, $S(0) = 1$, $S(0) = \frac32$ y $S(0) = -\frac12$.`,
          pistas: [
            { tipo: 'concepto', texto: R`Las soluciones son tangentes al campo; en una autónoma, las que pasan por la misma altura son traslaciones horizontales unas de otras.`, enlaces: [C('del-campo-a-soluciones'), C('caso-autonomo')] },
            { tipo: 'estrategia', texto: R`Para cada condición inicial: ¿en qué franja (entre qué equilibrios) empieza? ¿sube o baja allí? ¿hacia dónde va?` },
            { tipo: 'arranque', texto: R`$S(0) = \frac12$ y $S(1) = \frac12$ empiezan a la misma altura en distintos instantes. ¿Qué relación tienen sus gráficas?` },
            { tipo: 'desbloqueo', texto: R`Por encima de $1$ el campo sigue subiendo y cada vez más rápido ($\approx S^3$): la solución no se queda acotada.` },
          ],
          solucion: { escena: 'cp3/4', pasos: [
            { texto: R`El campo (signos del apartado anterior).` },
            { texto: R`Equilibrios $S = 0$ (fuente: por debajo baja, por encima sube) y $S = 1$ (nodo: sube a ambos lados).` },
            { texto: R`$S(0) = \frac12$: entre $0$ y $1$ sube; tiende a $1$ cuando $t \to \infty$ y a $0$ cuando $t \to -\infty$.` },
            { texto: R`$S(1) = \frac12$: la misma curva trasladada $1$ unidad a la derecha (autónoma).` },
            { texto: R`$S(0) = 1$: el equilibrio $S(t) = 1$.` },
            { texto: R`$S(0) = \frac32$: por encima de $1$ sube cada vez más rápido y se va a $+\infty$ (de hecho en tiempo finito); hacia atrás, se acerca a $1$.` },
            { texto: R`$S(0) = -\frac12$: por debajo de $0$ baja y se va a $-\infty$; hacia atrás, se acerca a $0$.` },
          ] },
          aprendes: { resultado: R`Entre $0$ y $1$: suben de $0$ a $1$; por encima de $1$: escapan a $+\infty$; por debajo de $0$: escapan a $-\infty$; $S(1) = \frac12$ es la de $S(0) = \frac12$ desplazada.`, ideas: [
            { idea: 'Franja → comportamiento', texto: R`En una autónoma, saber entre qué equilibrios empieza la solución y el signo de $f$ en esa franja determina su comportamiento cualitativo.` },
            { idea: 'Mismo valor, distinto instante = traslación', texto: R`Para autónomas, cambiar el instante inicial solo desliza la gráfica (⚔ Libro III).` },
          ] },
        },
      ],
    },
    {
      id: 'cp3-5', numero: 5, nombre: R`$\tfrac{dy}{dx} = y - y^3$`,
      enunciado: R`Considere la ecuación diferencial autónoma de primer orden $\dfrac{dy}{dx} = y - y^3$ y la condición inicial $y(0) = y_0$. A mano, trace la gráfica de una solución típica $y(x)$ cuando $y_0$ toma los valores dados: (a) $y_0 > 1$; (b) $0 < y_0 < 1$; (c) $-1 < y_0 < 0$; (d) $y_0 < -1$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Autónoma: equilibrios en los ceros y, entre ellos, crecimiento o decrecimiento según el signo (como $4y(1 - y)$).`, enlaces: [C('caso-autonomo')] },
          { tipo: 'estrategia', texto: R`Factoriza $y - y^3$ por completo y haz una tabla de signos con los ceros.` },
          { tipo: 'arranque', texto: R`$y - y^3 = y(1 - y^2) = y(1 - y)(1 + y)$. Ordena los tres ceros y prueba un valor en cada uno de los cuatro intervalos.` },
          { tipo: 'desbloqueo', texto: R`Fíjate en que la variable independiente se llama $x$: el dibujo es el mismo con $x$ en el eje horizontal.` },
        ],
        solucion: { escena: 'cp3/5', pasos: [
          { texto: R`Campo de $y - y^3$ (autónoma, filas paralelas).` },
          { texto: R`Ceros: $-1, 0, 1$. Signos: $+$ si $y < -1$; $-$ si $-1 < y < 0$; $+$ si $0 < y < 1$; $-$ si $y > 1$. Luego $\pm 1$ atraen y $0$ repele.` },
          { texto: R`(a) $y_0 > 1$: decrece hacia $1$.` },
          { texto: R`(b) $0 < y_0 < 1$: crece hacia $1$.` },
          { texto: R`(c) $-1 < y_0 < 0$: decrece hacia $-1$.` },
          { texto: R`(d) $y_0 < -1$: crece hacia $-1$.` },
        ] },
        aprendes: { resultado: R`$y = \pm 1$ estables, $y = 0$ inestable: las soluciones con $y_0 > 0$ tienden a $1$ y las de $y_0 < 0$ a $-1$.`, ideas: [
          { idea: 'Tabla de signos de un producto', texto: R`Con la factorización completa, el signo cambia en cada raíz simple: basta un valor de prueba por intervalo.` },
          { idea: 'Alternancia en raíces simples', texto: R`Con raíces simples, los equilibrios alternan estable/inestable.` },
        ] },
      }],
    },
    {
      id: 'cp3-6', numero: 6, nombre: R`$\tfrac{dy}{dx} = y^2 - y^4$`,
      enunciado: R`Considere la ecuación diferencial autónoma de primer orden $\dfrac{dy}{dx} = y^2 - y^4$ y la condición inicial $y(0) = y_0$. A mano, trace la gráfica de una solución típica $y(x)$ cuando $y_0$ toma los valores dados: (a) $y_0 > 1$; (b) $0 < y_0 < 1$; (c) $-1 < y_0 < 0$; (d) $y_0 < -1$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Autónoma: equilibrios y signos (caso especial 2).`, enlaces: [C('caso-autonomo')] },
          { tipo: 'estrategia', texto: R`Factoriza: $y^2 - y^4 = y^2(1 - y^2)$. ¿Qué hace el factor $y^2$ con el signo?` },
          { tipo: 'arranque', texto: R`Los ceros son $-1, 0, 1$ pero $0$ es doble: el signo no cambia al cruzar $0$. Prueba un valor en cada intervalo.` },
          { tipo: 'desbloqueo', texto: R`Para $y_0 < -1$: la solución baja, y lo hace cada vez más rápido ($\approx -y^4$). ¿Puede quedarse acotada?` },
        ],
        solucion: { escena: 'cp3/6', pasos: [
          { texto: R`Campo de $y^2 - y^4$.` },
          { texto: R`Ceros: $-1$, $0$ (doble), $1$. Signos: $-$ si $|y| > 1$; $+$ si $0 < |y| < 1$. Luego $1$ atrae, $-1$ repele, y $0$ es un nodo (sube a ambos lados).` },
          { texto: R`(a) $y_0 > 1$: decrece hacia $1$.` },
          { texto: R`(b) $0 < y_0 < 1$: crece hacia $1$.` },
          { texto: R`(c) $-1 < y_0 < 0$: crece hacia $0$ (sin cruzarlo).` },
          { texto: R`(d) $y_0 < -1$: decrece sin cota (escapa a $-\infty$; hacia atrás se acerca a $-1$).` },
        ] },
        aprendes: { resultado: R`$1$ estable, $-1$ inestable, $0$ nodo: (a), (b) → $1$; (c) → $0$; (d) → $-\infty$.`, ideas: [
          { idea: 'Raíz doble = nodo', texto: R`En un cero doble, $f$ no cambia de signo: las soluciones se acercan por un lado y se alejan por el otro.` },
          { idea: 'Compara con el ejercicio anterior', texto: R`$y - y^3$ y $y^2 - y^4$ tienen los mismos ceros pero distinta multiplicidad en $0$: cambia el tipo de ese equilibrio y con él el dibujo.` },
        ] },
      }],
    },
    {
      id: 'cp3-7', numero: 7, nombre: 'Velocidad terminal',
      enunciado: R`Sea la ecuación diferencial autónoma $m\dfrac{dv}{dt} = mg - kv$, donde $k$ es una constante positiva y $g$ es la aceleración debida a la gravedad, un modelo para la velocidad $v$ de un cuerpo de masa $m$ que cae bajo la influencia de la gravedad. Debido a que el término $-kv$ representa la resistencia del aire, la velocidad de un cuerpo que cae desde una gran altura no aumenta sin límite cuando el tiempo $t$ aumenta. Use un retrato de fase de la ecuación diferencial para encontrar la velocidad límite o terminal del cuerpo. Explique su razonamiento.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Es una autónoma en $v$: su equilibrio es la solución constante y el signo del lado derecho dice si $v$ sube o baja (como en el logístico: equilibrio estable = valor al que se tiende).`, enlaces: [C('caso-autonomo'), { l: 1, t: 'logistico-analisis' }] },
          { tipo: 'estrategia', texto: R`Despeja $\frac{dv}{dt} = g - \frac{k}{m}v$ y busca el valor de $v$ donde se anula.` },
          { tipo: 'arranque', texto: R`Ese valor es un equilibrio. Mira el signo de $g - \frac{k}{m}v$ por debajo y por encima de él.` },
          { tipo: 'desbloqueo', texto: R`Si por debajo $v$ sube y por encima baja, todas las soluciones se acercan a ese valor: es la velocidad límite.` },
        ],
        solucion: { escena: 'cp3/7', pasos: [
          { texto: R`$\frac{dv}{dt} = g - \frac{k}{m}v$ (autónoma). El campo, con $g = 9.8$ y $\frac{k}{m} = 0.5$ como ejemplo.` },
          { texto: R`Equilibrio: $g - \frac{k}{m}v = 0 \iff v = \frac{mg}{k}$. Si $v < \frac{mg}{k}$, $\frac{dv}{dt} > 0$ (sube); si $v > \frac{mg}{k}$, $\frac{dv}{dt} < 0$ (baja): es un sumidero.` },
          { texto: R`Un cuerpo que se suelta en reposo ($v(0) = 0$) acelera, pero cada vez menos, y $v(t) \to \frac{mg}{k}$.` },
          { texto: R`Si empezara más rápido que $\frac{mg}{k}$, frenaría hacia el mismo valor. La <b>velocidad terminal</b> es $v_T = \frac{mg}{k}$.` },
        ] },
        aprendes: { resultado: R`$v_T = \dfrac{mg}{k}$, equilibrio estable de $\frac{dv}{dt} = g - \frac{k}{m}v$.`, ideas: [
          { idea: 'Valor límite = equilibrio estable', texto: R`Cuando un enunciado pregunta «a qué valor tiende», busca el equilibrio de la autónoma y comprueba que atrae.` },
          { idea: 'Velocidad = derivada (diccionario)', texto: R`$m\frac{dv}{dt}$ es masa por aceleración: la ecuación es la segunda ley de Newton con gravedad y rozamiento.` },
        ] },
      }],
    },
  ],
};
