// Libro II — Conferencia 2: Procedimiento analítico. Separación de variables.
// Texto LITERAL de la conferencia (fuentes/conf/conf2.pdf), repartido en temas y pasos.
const R = String.raw;

export default {
  numero: 2, romano: 'II', color: 'ciruela',
  titulo: 'Separación de variables',
  conferencia: 'Clase 2 · Procedimiento analítico · Prof. Alicia Pérez Figueredo',
  temas: [
    {
      id: 'solucion', nombre: '¿Qué es una solución de una EDO?', diapositivas: [1, 2],
      recuadro: { titulo: 'definición', texto: R`Una <b>solución</b> de una EDO es una función $y(t)$ que, al sustituirla en la ecuación, la satisface para todos los valores de $t$ en un intervalo.` },
      explicacion: R`Ser solución es una comprobación local que se repite en cada instante: en cada punto de la curva, su inclinación tiene que coincidir con la que manda la ecuación. Para comprobarlo no hace falta saber de dónde salió la fórmula.`,
      pasos: [
        { texto: R`<b>Definición.</b> Una solución de una EDO es una función $y(t)$ que, al sustituirla en la ecuación, la satisface para todos los valores de $t$ en un intervalo.` },
        { texto: R`Ejemplo: verificar si $y(t) = 3e^{t}$ es solución de $\dydt = y$.` },
        { texto: R`Calculamos la derivada: $\dydt = 3e^{t}$.` },
        { texto: R`Sustituimos en la ecuación: $3e^{t} = 3e^{t}$ ✓.` },
        { texto: R`La función satisface la ecuación para todo $t$. Por tanto, es solución.` },
        { texto: R`<b>Observación:</b> podemos comprobar si una función es solución, aunque no sepamos cómo encontrarla.` },
      ],
      escena: '2/solucion',
      claves: [
        { idea: 'Verificar = derivar y sustituir', texto: R`Calcula $y'(t)$ por un lado y $f(t, y(t))$ por otro; si coinciden para todo $t$ del intervalo, es solución. Si fallan en un solo $t$, no lo es.` },
        { idea: 'El intervalo forma parte de la respuesta', texto: R`Una fórmula puede ser solución en un intervalo y no existir fuera (por ejemplo, si se divide entre $0$). Di siempre dónde vale.` },
      ],
    },
    {
      id: 'pvi', nombre: 'Problema de valor inicial y solución general', diapositivas: [3, 4, 5],
      recuadro: { titulo: 'problema de valor inicial (problema de Cauchy)', texto: R`$$\dydt = f(t, y), \qquad y(t_0) = y_0.$$` },
      explicacion: R`Cuando el lado derecho depende solo de $t$, resolver es integrar. Sale una familia con una constante $C$ (la <b>solución general</b>); la condición inicial fija $C$ y elige una curva (la <b>solución particular</b>).`,
      pasos: [
        { texto: R`<b>Definición.</b> Un problema de valor inicial o problema de Cauchy consiste en una EDO junto con una condición inicial: $\dydt = f(t, y)$, $y(t_0) = y_0$.` },
        { texto: R`Ejemplo resuelto: resolver $\dydt = 12t^3 - 2\sin t$, $y(0) = 3$.` },
        { texto: R`Como el MD (miembro derecho) depende solamente de $t$, integramos directamente: $y(t) = \int (12t^3 - 2\sin t)\,dt = 3t^4 + 2\cos t + C$.` },
        { texto: R`Aplicamos la condición inicial: $3 = y(0) = 0 + 2(1) + C \Rightarrow C = 1$.` },
        { texto: R`Solución particular: $y(t) = 3t^4 + 2\cos t + 1$.` },
        { texto: R`<b>Solución general.</b> La expresión $y(t) = 3t^4 + 2\cos t + C$ se llama solución general de la EDO anterior, porque podemos usarla para resolver cualquier problema de valor inicial.` },
        { texto: R`Ejemplo: si la condición inicial es $y(0) = \pi$, teniendo la solución general $y(t) = 3t^4 + 2\cos t + C$ podemos buscar $C$: $\pi = y(0) = 0 + 2(1) + C \Rightarrow C = \pi - 2$.` },
        { texto: R`Luego la solución particular del PVI $\dydt = 12t^3 - 2\sin t$, $y(0) = \pi$ es: $y(t) = 3t^4 + 2\cos t + \pi - 2$.` },
      ],
      escena: '2/pvi',
      claves: [
        { idea: 'Primero la familia, después la constante', texto: R`Integra con $+C$ y solo al final sustituye el dato inicial. Así una misma cuenta sirve para cualquier condición inicial.` },
        { idea: '$y\' = f(t)$: las soluciones son traslaciones verticales', texto: R`Dos soluciones difieren en una constante: sus gráficas son la misma curva subida o bajada (lo verás en el campo de pendientes del Libro III).` },
      ],
    },
    {
      id: 'separables', nombre: 'Ecuaciones separables', diapositivas: [6, 7, 8],
      recuadro: { titulo: 'definición', texto: R`Una EDO es <b>separable</b> si se puede escribir como $$\dydt = g(t)\cdot h(y),$$ es decir, el lado derecho es el <b>producto</b> de una función de $t$ y una función de $y$.` },
      explicacion: R`En una separable, el lado derecho es como una tabla de multiplicar: el valor en $(t, y)$ es (número de la columna $t$) × (número de la fila $y$). Por eso sus ceros forman rectas verticales y horizontales, y nunca una diagonal como en $y + t$.`,
      pasos: [
        { texto: R`¿Cómo obtenemos una solución? Es raro el caso en que podemos encontrar soluciones explícitas para una ecuación diferencial. Puesto que muchas de estas igualdades tienen soluciones que no pueden expresarse en términos de funciones conocidas como polinomios, exponenciales o funciones trigonométricas.` },
        { texto: R`Sin embargo, existen unos pocos tipos especiales de ecuaciones diferenciales para las cuales podemos obtener soluciones explícitas, y en esta clase analizaremos uno de esos tipos de ecuaciones: <b>Ecuaciones de Variables Separables</b>.` },
        { texto: R`<b>Definición.</b> Una EDO es separable si se puede escribir como $\dydt = g(t)\cdot h(y)$. Es decir, el lado derecho es el producto de una función de $t$ y una función de $y$.` },
        { texto: R`Ejemplos: $\dydt = y\cdot t$ ✓ (separable). $\dydt = y + t$ (no separable). $\dydt = \dfrac{t+1}{t(y+1)} = \left(\dfrac{t+1}{t}\right)\cdot\left(\dfrac{1}{y+1}\right)$ ✓ (separable).` },
        { texto: R`<b>Caso especial: ecuaciones autónomas.</b> Si $\dydt = h(y)$, también es separable (con $g(t) = 1$).` },
        { texto: R`Muchas de las ecuaciones diferenciales de primer orden más importantes que surgen en aplicaciones son autónomas. Por ejemplo, la ecuación logística, que su lado derecho sólo depende de la variable $P$: $\dPdt = kP\left(1 - \frac{P}{N}\right)$.` },
      ],
      escena: '2/separables',
      claves: [
        { idea: 'Prueba rápida de separabilidad', texto: R`Si $f(t, y) = g(t)h(y)$, entonces $f(t_1, y_1)\,f(t_2, y_2) = f(t_1, y_2)\,f(t_2, y_1)$ para cualesquiera puntos. Si encuentras cuatro puntos donde falla, no es separable.` },
        { idea: 'Factoriza antes de rendirte', texto: R`$\frac{t+1}{t(y+1)}$ no parece un producto hasta que separas los factores de $t$ y de $y$. Busca factor común, separa fracciones, usa $e^{a+b} = e^ae^b$.` },
      ],
    },
    {
      id: 'metodo', nombre: 'El método de separación de variables', diapositivas: [9, 10], valiente: 'v-separacion-todas',
      recuadro: { titulo: 'procedimiento', texto: R`Dada $\dydt = g(t)h(y)$ con $h(y) \ne 0$: $$\int \frac{1}{h(y)}\,dy = \int g(t)\,dt.$$` },
      explicacion: R`Separar e integrar dice: «el área bajo $\frac{1}{h}$ que recorre $y$ es igual al área bajo $g$ que recorre $t$». Cuando $t$ avanza, el área de la derecha crece, y $y$ tiene que avanzar justo lo necesario para que el área de la izquierda la iguale.`,
      pasos: [
        { texto: R`<b>Procedimiento.</b> Dada $\dydt = g(t)h(y)$ con $h(y) \ne 0$:` },
        { texto: R`1. Separar las variables: $\dfrac{1}{h(y)}\,dy = g(t)\,dt$.` },
        { texto: R`2. Integrar ambos lados: $\displaystyle\int \frac{1}{h(y)}\,dy = \int g(t)\,dt$.` },
        { texto: R`3. Obtener la solución general.` },
        { texto: R`<b>Justificación del método.</b> El método se basa en la regla de la cadena. Si $y(t)$ es solución, entonces $\dfrac{1}{h(y(t))}\dydt = g(t)$. Integrando respecto a $t$ y haciendo la sustitución $u = y(t)$, obtenemos la misma integral.` },
      ],
      escena: '2/metodo',
      claves: [
        { idea: '«dy» y «dt» no son números, pero el atajo funciona', texto: R`Separar «$dy$» de «$dt$» es una abreviatura de la regla de la cadena: $\frac{d}{dt}H(y(t)) = H'(y)\,y'$. Si dudas, deriva el resultado y comprueba.` },
        { idea: 'Una sola constante basta', texto: R`Las dos integrales dan dos constantes, pero su diferencia es otra constante: escribe solo una $C$ en un lado.` },
      ],
    },
    {
      id: 'ejemplo-t-y2', nombre: R`Ejemplo resuelto: $\dfrac{dy}{dt} = \dfrac{t}{y^2}$`, diapositivas: [11, 12],
      explicacion: R`Las tres operaciones del método, una a una. Al final aparece una familia con una constante $K$; cada condición inicial elige un miembro.`,
      pasos: [
        { texto: R`1. Separamos variables: $y^2\,dy = t\,dt$.` },
        { texto: R`2. Integramos: $\displaystyle\int y^2\,dy = \int t\,dt \;\Rightarrow\; \frac{y^3}{3} = \frac{t^2}{2} + C$.` },
        { texto: R`3. Despejamos $y$: $y(t) = \left(\dfrac{3t^2}{2} + K\right)^{1/3}$, $K = 3C$.` },
        { texto: R`<b>Solución general.</b> La familia de soluciones es $y(t) = \left(\dfrac{3t^2}{2} + K\right)^{1/3}$.` },
        { texto: R`El valor de las constantes depende de la condición inicial dada en el <b>PVI</b>.` },
      ],
      escena: '2/ejemplo-t-y2',
      claves: [
        { idea: 'Renombrar constantes sin miedo', texto: R`$3C$ es «otra constante cualquiera»: llámala $K$. Lo que importa es que recorre todos los reales.` },
        { idea: 'Raíz cúbica real', texto: R`$(\cdot)^{1/3}$ está definida también para negativos ($\sqrt[3]{-8} = -2$). Pero donde $y = 0$ la ecuación $\frac{t}{y^2}$ no tiene sentido: una solución no puede cruzar $y = 0$.` },
      ],
    },
    {
      id: 'perdidas', nombre: 'Soluciones perdidas al dividir', diapositivas: [13, 14],
      explicacion: R`Para separar dividimos entre $h(y)$. Si $h(y_0) = 0$, ese paso es ilegal justo en $y = y_0$, y la recta $y = y_0$ (que sí es solución) se escapa de la fórmula.`,
      pasos: [
        { texto: R`Ejemplo: $\dydt = y^2$. Separamos e integramos: $\displaystyle\int \frac{dy}{y^2} = \int dt \;\Rightarrow\; -\frac{1}{y} = t + C \;\Rightarrow\; y(t) = -\frac{1}{t + C}$.` },
        { texto: R`Pero si $y = 0$, entonces $\dydt = 0$. La función constante $y(t) = 0$ también es solución (solución de equilibrio, ver Clase 1).` },
        { texto: R`Al dividir por $h(y)$ podemos perder soluciones de equilibrio. Siempre hay que considerar por separado los valores que anulan $h(y)$.` },
        { texto: R`<b>Conclusión.</b> Además de las soluciones que obtenemos usando el método de separación de variables, algunas ecuaciones diferenciales poseen soluciones de equilibrio.` },
        { texto: R`Aun cuando están ausentes de la familia de soluciones que obtuvimos al separar variables, las necesitamos si queremos resolver todo problema de valor inicial de la ecuación diferencial.` },
      ],
      escena: '2/perdidas',
      claves: [
        { idea: 'Antes de dividir, apunta los ceros', texto: R`Resuelve $h(y) = 0$ primero. Cada raíz $y_0$ es una solución constante $y \equiv y_0$ que debes añadir a mano a la familia.` },
        { idea: 'Límite de la familia ≠ miembro de la familia', texto: R`$-\frac{1}{t+C} \to 0$ cuando $C \to \pm\infty$, pero ningún $C$ real da $y \equiv 0$. Comprueba siempre si la familia cubre todos los datos iniciales.` },
      ],
    },
    {
      id: 'implicitas', nombre: 'Soluciones implícitas', diapositivas: [15, 16],
      explicacion: R`A veces, tras integrar, no se puede despejar $y$. La relación $F(t, y) = C$ sigue describiendo las soluciones: cada curva de nivel de $F$ es la gráfica de una solución.`,
      pasos: [
        { texto: R`Ejemplo: $\dydt = \dfrac{y}{1 + y^2}$. Separamos: $\displaystyle\int \frac{1 + y^2}{y}\,dy = \int dt$.` },
        { texto: R`Integramos: $\displaystyle\int \left(\frac{1}{y} + y\right)dy = t + C \;\Rightarrow\; \ln|y| + \frac{y^2}{2} = t + C$.` },
        { texto: R`No es posible despejar $y$ explícitamente.` },
        { texto: R`<b>Solución implícita.</b> La expresión $\ln|y| + \frac{y^2}{2} = t + C$ define implícitamente las soluciones (a veces una solución implícita es lo máximo que podemos obtener). Además, $y = 0$ es solución de equilibrio.` },
        { texto: R`<b>Observación.</b> Hay otro problema que surge con este método. A menudo es imposible llevar a cabo las integraciones requeridas.` },
        { texto: R`No podremos confiar meramente en herramientas analíticas y soluciones explícitas al estudiar ecuaciones diferenciales, aunque podamos separar las variables.` },
      ],
      escena: '2/implicitas',
      claves: [
        { idea: 'Una solución implícita también se verifica', texto: R`Deriva $F(t, y(t)) = C$ respecto a $t$ (derivación implícita) y despeja $y'$: si sale la ecuación, la relación es correcta.` },
        { idea: 'Curvas de nivel = soluciones', texto: R`Si $F(t, y) = C$ es una solución implícita, dibujar las curvas de nivel de $F$ es dibujar todas las soluciones a la vez.` },
      ],
    },
  ],
  resumen: {
    titulo: 'Resumen de la clase',
    bloques: [{ titulo: 'Lo que hemos visto', items: [
      R`Una solución se comprueba sustituyendo.`,
      R`Las EDOs separables $\dydt = g(t)\cdot h(y)$ se resuelven con: $\displaystyle\int \frac{1}{h(y)}\,dy = \int g(t)\,dt$.`,
      R`Cuidado con las soluciones perdidas al dividir. Siempre deben tener en cuenta las soluciones de equilibrio.`,
      R`A veces obtenemos soluciones implícitas.`,
      R`Recuerden siempre verificar sus soluciones.`,
    ] }],
  },
};
