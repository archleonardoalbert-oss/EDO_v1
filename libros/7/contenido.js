// Libro VII — Conferencia 7: Variación de la constante, factor integrante y cambio de variables.
// Texto LITERAL de la conferencia (fuentes/conf/conf7.pdf), repartido en temas y pasos.
const R = String.raw;

export default {
  numero: 7, romano: 'VII', color: 'ciruela',
  titulo: 'Variación de la constante · Factor integrante · Cambio de variable',
  conferencia: 'Clase 7 · Profs. Alicia Pérez Figueredo y Damon Jorge Rubio',
  partes: [
    { titulo: 'Parte I · Variación de la constante', desde: 'idea-variacion' },
    { titulo: 'Parte II · Factor integrante', desde: 'idea-factor' },
    { titulo: 'Parte III · Cambio de variables', desde: 'cambio-variable' },
  ],
  temas: [
    {
      id: 'idea-variacion', nombre: 'La idea de «variar la constante»', diapositivas: [1, 2, 3, 4],
      recuadro: { titulo: 'la idea', texto: R`En lugar de buscar $x_p$ adivinando, proponemos que la <b>constante</b> $c$ de la solución homogénea se convierta en una <b>función</b> $c(t)$: $$x(t) = c(t)\exp\left(-\int_{t_0}^t a(\theta)\,d\theta\right).$$` },
      explicacion: R`Las soluciones de la homogénea forman una familia de curvas, una por cada $c$. Una solución de la no homogénea va cruzando esas curvas: en cada instante está sobre la curva de algún $c$. Ese $c$ que cambia con el tiempo es $c(t)$. (Ojo con la notación: aquí la ecuación se escribe $\dot x + a(t)x = b(t)$, con $\dot x = \frac{dx}{dt}$; el signo de $a$ es el opuesto al de la Conferencia 6.)`,
      pasos: [
        { texto: R`<b>PARTE I: Variación de la constante.</b> Otra vía para resolver ecuaciones lineales no homogéneas. El método de variación de la constante aprovecha la estructura de la solución de la ecuación homogénea asociada.` },
        { texto: R`En lugar de buscar una solución particular adivinando su forma, se propone que la constante arbitraria de la solución homogénea se convierta en una función de $t$, que se determina sustituyendo en la ecuación original.` },
        { texto: R`<b>Recordatorio.</b> Queremos resolver la ecuación lineal no homogénea: $\dot x + a(t)\,x = b(t)$.` },
        { texto: R`Su ecuación homogénea asociada es $\dot x + a(t)\,x = 0$, que es separable y su solución general es: $x_h(t) = c\,e^{-\int_{t_0}^t a(\theta)\,d\theta}$, donde $c$ es una constante arbitraria.` },
        { texto: R`<b>¿Cómo aprovechar la estructura de $x_h$ para resolver la ecuación no homogénea?</b> La solución general de la no homogénea es la suma de la solución homogénea y una particular: $x(t) = x_h(t) + x_p(t)$.` },
        { texto: R`<b>La idea de «variar la constante».</b> En lugar de buscar $x_p$ adivinando, proponemos que la constante $c$ de la solución homogénea se convierta en una función $c(t)$: $x(t) = c(t)\exp\left(-\int_{t_0}^t a(\theta)\,d\theta\right)$.` },
        { texto: R`La función $c(t)$ se determina sustituyendo en la ecuación original. El método funciona para cualquier $b(t)$ continua.` },
      ],
      escena: '7/idea-variacion',
      claves: [
        { idea: 'Convertir una constante en incógnita', texto: R`Cuando una fórmula resuelve un caso más simple con una constante libre, prueba a dejar que esa constante dependa de $t$: la ecuación original te dirá cómo debe variar.` },
        { idea: 'Leer c(t) en el dibujo', texto: R`$c(t) = \frac{x(t)}{x_h^{(1)}(t)}$ (con $x_h^{(1)}$ la homogénea de $c = 1$) dice sobre qué curva de la familia está la solución en cada instante.` },
      ],
    },
    {
      id: 'derivacion-variacion', nombre: 'Variación de la constante: derivación paso a paso', diapositivas: [5, 6], valiente: 'v-factor-variacion',
      recuadro: { titulo: 'solución general', texto: R`$$x(t) = \left(c_0 + \int_{t_0}^t b(\tau)\,e^{\int_{t_0}^{\tau} a(\theta)\,d\theta}\,d\tau\right)e^{-\int_{t_0}^t a(\theta)\,d\theta}$$` },
      explicacion: R`Al sustituir, los dos términos con $c(t)$ se cancelan exactamente (porque $x_h$ resuelve la homogénea), y solo queda $\dot c$: una ecuación que se resuelve integrando.`,
      pasos: [
        { texto: R`<b>Paso 1: derivar la propuesta.</b> Sea $x(t) = c(t)\,e^{-A(t)}$, con $A(t) = \int_{t_0}^t a(\theta)\,d\theta$. Por la regla del producto: $\dot x(t) = \dot c(t)\,e^{-A(t)} - a(t)\,c(t)\,e^{-A(t)}$.` },
        { texto: R`<b>Paso 2: sustituir en la ecuación no homogénea.</b> $\dot x + a(t)x = b(t)$: $$\underbrace{\dot c(t)\,e^{-A(t)} - a(t)\,c(t)\,e^{-A(t)}}_{\dot x} + a(t)\underbrace{c(t)\,e^{-A(t)}}_{x} = b(t)$$` },
        { texto: R`Los términos con $c(t)$ se cancelan: $\dot c(t)\,e^{-A(t)} = b(t)$, es decir, $\dot c(t) = b(t)\,e^{A(t)}$.` },
        { texto: R`<b>Paso 3: integrar para obtener $c(t)$.</b> $$c(t) = c_0 + \int_{t_0}^t b(\tau)\exp\left(\int_{t_0}^{\tau} a(\theta)\,d\theta\right)d\tau$$` },
        { texto: R`<b>Paso 4: solución general.</b> $$x(t) = \left(c_0 + \int_{t_0}^t b(\tau)\,e^{\int_{t_0}^{\tau} a(\theta)\,d\theta}\,d\tau\right)e^{-\int_{t_0}^t a(\theta)\,d\theta}$$` },
      ],
      escena: '7/derivacion-variacion',
      claves: [
        { idea: 'La cancelación no es casualidad', texto: R`Siempre que propones $x = c(t)\,x_h$ con $x_h$ solución de la homogénea, los términos sin derivar de $c$ se cancelan. Si al sustituir no se cancelan, hay un error de cuentas.` },
        { idea: 'Variables mudas', texto: R`$\theta$ y $\tau$ son variables de integración: distintas letras para no confundir el límite superior con la variable que se integra.` },
      ],
    },
    {
      id: 'ejemplo-variacion', nombre: R`Ejemplo resuelto: $\dot x + 2x = e^{3t}$`, diapositivas: [7, 8],
      explicacion: R`Los cuatro pasos con números: $c(t)$ resulta ser $\frac{e^{5t}}{5} + C$, y la verificación cierra el círculo.`,
      pasos: [
        { texto: R`<b>Paso 1: solución homogénea.</b> La homogénea es $\dot x + 2x = 0$, cuya solución es $x_h(t) = c\,e^{-2t}$.` },
        { texto: R`<b>Paso 2: variar la constante.</b> Proponemos $x(t) = c(t)\,e^{-2t}$. Derivando: $\dot x = \dot c\,e^{-2t} - 2c\,e^{-2t}$. Sustituyendo en la ecuación: $\dot c\,e^{-2t} - 2c\,e^{-2t} + 2c\,e^{-2t} = e^{3t}$, $\dot c\,e^{-2t} = e^{3t} \Rightarrow \dot c = e^{5t}$.` },
        { texto: R`<b>Paso 3: integrar $c(t)$.</b> $c(t) = \int e^{5t}\,dt = \dfrac{e^{5t}}{5} + C$.` },
        { texto: R`<b>Paso 4: solución general.</b> $x(t) = \left(\dfrac{e^{5t}}{5} + C\right)e^{-2t} = \dfrac{e^{3t}}{5} + C\,e^{-2t}$.` },
        { texto: R`<b>Verificación.</b> $\dot x = \dfrac{3e^{3t}}{5} - 2C\,e^{-2t}$. $\dot x + 2x = \dfrac{3e^{3t}}{5} - 2C\,e^{-2t} + \dfrac{2e^{3t}}{5} + 2C\,e^{-2t} = e^{3t}$ ✓.` },
      ],
      escena: '7/ejemplo-variacion',
      claves: [
        { idea: 'Comparar con coeficientes indeterminados', texto: R`Proponer $x_p = \alpha e^{3t}$ daría $5\alpha = 1$, el mismo $\frac15 e^{3t}$. Variación de la constante llega sin adivinar la forma.` },
        { idea: 'Verificar siempre', texto: R`Derivar el resultado y sustituir cuesta dos líneas y detecta cualquier error de signo o de integración.` },
      ],
    },
    {
      id: 'idea-factor', nombre: 'La idea del factor integrante', diapositivas: [9, 10],
      recuadro: { titulo: 'regla del producto', texto: R`$$\frac{d}{dt}\left[\mu(t)\,y(t)\right] = \mu(t)\frac{dy}{dt} + \frac{d\mu}{dt}\,y(t)$$` },
      explicacion: R`El lado izquierdo $y' + g(t)y$ «casi» es la derivada de un producto. Multiplicando por la función adecuada $\mu$, se convierte exactamente en $(\mu y)'$, y entonces basta integrar.`,
      pasos: [
        { texto: R`<b>PARTE II: Factor integrante.</b> Un método para ecuaciones lineales. El método de coeficientes indeterminados requiere adivinar la forma de $y_p$. El factor integrante evita esa adivinanza, a cambio de calcular una integral.` },
        { texto: R`<b>Reescribir la ecuación.</b> Consideremos la ecuación lineal no homogénea $\dydt + g(t)y = b(t)$, donde $g(t) = -a(t)$.` },
        { texto: R`La expresión $\dydt + g(t)y$ se parece al resultado de aplicar la regla del producto: $\dfrac{d}{dt}\left[\mu(t)\,y(t)\right] = \mu(t)\dydt + \dfrac{d\mu}{dt}\,y(t)$,` },
        { texto: R`por lo que buscamos una función $\mu(t)$ (<b>factor integrante</b>) tal que al multiplicar la ecuación por ella, el lado izquierdo se convierta en una <b>derivada exacta</b>.` },
      ],
      escena: '7/idea-factor',
      claves: [
        { idea: 'Reconocer derivadas de productos', texto: R`Ante una combinación $u\,v' + u'\,v$, piensa en $(uv)'$. Muchas ecuaciones se resuelven haciendo aparecer una derivada exacta.` },
        { idea: 'Integrar una derivada exacta', texto: R`Si consigues $\frac{d}{dt}[\text{algo}] = \text{conocido}$, integras ambos lados y despejas: el problema diferencial se vuelve una integral.` },
      ],
    },
    {
      id: 'derivacion-factor', nombre: 'Derivación del factor integrante', diapositivas: [11, 12],
      recuadro: { titulo: 'factor integrante', texto: R`$$\mu(t) = e^{\int g(t)\,dt}, \qquad y(t) = \frac{1}{\mu(t)}\int \mu(t)\,b(t)\,dt$$` },
      explicacion: R`Pedir que $\mu\,y' + \mu g\,y$ sea $(\mu y)'$ obliga a $\mu' = \mu g$: una ecuación separable cuya solución es $e^{\int g}$.`,
      pasos: [
        { texto: R`<b>Paso 1: multiplicar por $\mu(t)$.</b> $\mu(t)\dydt + \mu(t)g(t)y = \mu(t)b(t)$.` },
        { texto: R`<b>Paso 2: forzar la regla del producto.</b> Queremos $\dfrac{d}{dt}\left[\mu(t)\,y(t)\right] = \mu(t)\dydt + \mu(t)g(t)y$. Esto exige: $\dfrac{d\mu}{dt} = \mu(t)g(t)$.` },
        { texto: R`<b>Paso 3: resolver para $\mu(t)$.</b> Es una ecuación separable: $\mu(t) = e^{\int g(t)\,dt}$.` },
        { texto: R`<b>Paso 4: integrar.</b> $\dfrac{d}{dt}\left[\mu(t)\,y\right] = \mu(t)b(t) \Rightarrow y(t) = \dfrac{1}{\mu(t)}\displaystyle\int \mu(t)\,b(t)\,dt$.` },
      ],
      escena: '7/derivacion-factor',
      claves: [
        { idea: 'Basta un factor', texto: R`Cualquier $\mu$ con $\mu' = g\mu$ sirve; no hace falta la constante de integración en $\int g$ (multiplicaría $\mu$ por una constante que se cancela).` },
        { idea: 'La constante va en la segunda integral', texto: R`La $+C$ importante aparece al integrar $\mu b$: da el término $\frac{C}{\mu}$, que es la solución homogénea.` },
      ],
    },
    {
      id: 'ejemplo-factor', nombre: R`Ejemplo: $\dfrac{dy}{dt} + \dfrac{2}{t}\,y = t - 1$`, diapositivas: [13, 14],
      explicacion: R`Aquí $\mu = t^2$: multiplicar por $t^2$ convierte el lado izquierdo en $(t^2y)'$. La solución se separa sola en homogénea $\frac{C}{t^2}$ más particular.`,
      pasos: [
        { texto: R`1. Busquemos el factor integrante: $g(t) = \frac2t \Rightarrow \mu(t) = e^{\int g(t)\,dt} = e^{\int \frac2t\,dt} = e^{2\ln t} = t^2$. <small>(Tomamos $t > 0$, donde $\ln t$ está definido y la ecuación tiene sentido; para $t < 0$ sale igualmente $\mu = t^2$ con $\ln|t|$.)</small>`, marca: 'añadido' },
        { texto: R`2. Multiplicar por $\mu(t)$: $t^2\dydt + 2ty = t^2(t - 1)$, es decir, $\dfrac{d}{dt}\left[t^2y\right] = t^3 - t^2$.` },
        { texto: R`3. Integrar y despejar: $\displaystyle\int \frac{d}{dt}\left[t^2y\right]dt = \int (t^3 - t^2)\,dt$, $t^2y = \dfrac{t^4}{4} - \dfrac{t^3}{3} + C$, $y(t) = \dfrac{t^2}{4} - \dfrac t3 + \dfrac{C}{t^2}$.` },
        { texto: R`<b>Solución general:</b> $y(t) = \underbrace{\dfrac{t^2}{4} - \dfrac t3}_{y_p} + \underbrace{\dfrac{C}{t^2}}_{y_h}$. Se descompone en $y_h(t) = \frac{C}{t^2}$ (homogénea) y $y_p(t) = \frac{t^2}{4} - \frac t3$ (particular), como predice la Linealidad Extendida.` },
      ],
      escena: '7/ejemplo-factor',
      claves: [
        { idea: 'Simplificar $e^{\ln}$', texto: R`Cuando $\int g$ es un logaritmo, $\mu = e^{k\ln t} = t^k$: el factor integrante es una potencia.` },
        { idea: 'Cuidado con el dominio', texto: R`Si $g$ no está definida en un punto ($t = 0$ aquí), la solución vive a un lado; $\frac{C}{t^2}$ explota en $t = 0$ salvo si $C = 0$.` },
      ],
    },
    {
      id: 'cambio-variable', nombre: 'Cambio de variables: transformar el problema en uno conocido', diapositivas: [15, 16],
      explicacion: R`Como en las integrales, se elige una nueva incógnita $u = g(t, y)$ que convierta la ecuación en una de las que ya sabemos tratar. Lo único delicado es derivar $u$ con la regla de la cadena.`,
      pasos: [
        { texto: R`<b>PARTE III: Cambio de variables.</b> Transformar el problema en uno conocido. Muchas ecuaciones diferenciales no encajan en ninguna forma estándar. Un cambio de variable adecuado las transforma en una ecuación separable, lineal o autónoma que ya sabemos resolver.` },
        { texto: R`<b>Recordatorio: u-sustitución.</b> Dada una integral complicada, definimos una nueva variable $u = g(t)$ para simplificarla: $\displaystyle\int t\sin(t^2)\,dt \xrightarrow{u = t^2} \int \frac12\sin u\,du = -\frac{\cos(t^2)}{2} + C$. <small>(La conferencia escribe $\int \sin u\,du$ en el paso intermedio: falta el factor $\frac12$, que viene de $du = 2t\,dt$; el resultado final sí es correcto.)</small>`, marca: 'corregido' },
        { texto: R`<b>Aplicación a EDOs.</b> Para una ecuación $\dydt = f(t, y)$, definimos una nueva variable $u = g(t, y)$ y reescribimos la ecuación en términos de $u$.` },
        { texto: R`Si $u = y - 2t$: $\dfrac{du}{dt} = \dydt - 2$. Si $u = ty$: $\dfrac{du}{dt} = y + t\dydt$. Si $u = e^y$: $\dfrac{du}{dt} = e^y\dydt$.` },
      ],
      escena: '7/cambio-variable',
      claves: [
        { idea: 'Derivar el cambio con la cadena', texto: R`$u = g(t, y(t))$ ⇒ $u' = \frac{\partial g}{\partial t} + \frac{\partial g}{\partial y}\,y'$. Sustituye $y'$ por $f(t, y)$ y $y$ por su expresión en $u$.` },
        { idea: 'Buscar la combinación que se repite', texto: R`Si el lado derecho depende de $t$ e $y$ solo a través de una combinación ($y - 2t$, $ty$, $\frac yt$…), esa combinación es el candidato natural a $u$.` },
      ],
    },
    {
      id: 'ejemplo-cambio', nombre: R`Ejemplo: $\dfrac{dy}{dt} = y^2 - 4ty + 4t^2 - 4y + 8t - 3$`, diapositivas: [17],
      explicacion: R`El lado derecho solo depende de $y - 2t$. Con $u = y - 2t$ la ecuación se vuelve autónoma: su línea de fase en $u$ se traduce en rectas $y = 2t + u_0$ en el plano $ty$.`,
      pasos: [
        { texto: R`<b>Reescribir el lado derecho:</b> $\dydt = (y - 2t)^2 - 4(y - 2t) - 3$.` },
        { texto: R`Sea $u = y - 2t$. Entonces: $\dfrac{du}{dt} = \dydt - 2$.` },
        { texto: R`Sustituyendo: $\dfrac{du}{dt} + 2 = u^2 - 4u - 3 \Rightarrow \dfrac{du}{dt} = u^2 - 4u - 5$.` },
        { texto: R`La nueva ecuación es <b>autónoma y separable</b>. Su línea de fase muestra equilibrios en $u = -1$ (sumidero) y $u = 5$ (fuente).` },
        { texto: R`En el plano $ty$, las soluciones tienden a $y = 2t - 1$ y se alejan de $y = 2t + 5$.` },
      ],
      escena: '7/ejemplo-cambio',
      claves: [
        { idea: 'Completar cuadrados en dos variables', texto: R`$y^2 - 4ty + 4t^2 = (y - 2t)^2$: agrupar términos cuadráticos suele revelar la combinación clave.` },
        { idea: 'Equilibrios en u = rectas en y', texto: R`Un equilibrio $u \equiv u_0$ de la nueva ecuación es una solución $y = 2t + u_0$ de la original: rectas solución que organizan todo el plano.` },
      ],
    },
    {
      id: 'bernoulli', nombre: 'Ecuaciones de Bernoulli', diapositivas: [18, 19],
      recuadro: { titulo: 'definición', texto: R`Una ecuación de Bernoulli es una EDO de la forma $$\dydt = r(t)\,y + a(t)\,y^n$$ donde $n$ es un entero.` },
      explicacion: R`Bernoulli es «lineal salvo un término $y^n$». El cambio $z = y^{1-n}$ convierte ese término en uno sin $y$ y la ecuación en lineal en $z$.`,
      pasos: [
        { texto: R`<b>Definición.</b> Una ecuación de Bernoulli es una EDO de la forma $\dydt = r(t)\,y + a(t)\,y^n$ donde $n$ es un entero.` },
        { texto: R`Si $n = 1$, la ecuación es lineal y separable. Si $n \ge 2$, es no lineal. <small>(Además, con $n = 0$ es lineal: $y' = r(t)y + a(t)$; y con $n$ negativo, no lineal. El cambio de variable funciona para todo $n \ne 1$.)</small>`, marca: 'corregido' },
        { texto: R`<b>Ejemplo.</b> $\dydt = y + e^{-2t}y^2$. Aquí $n = 2$, $r(t) = 1$, $a(t) = e^{-2t}$.` },
        { texto: R`<b>Observación.</b> Las ecuaciones de Bernoulli <b>no son separables</b> en general, pero se pueden transformar en <b>lineales mediante un cambio de variable</b>.` },
        { texto: R`<b>Cambio de variable.</b> Para $\dydt = r(t)y + a(t)y^n$, definimos $z = y^{1-n}$: $\dfrac{dz}{dt} = (1 - n)y^{-n}\dydt = (1 - n)y^{-n}\left(r(t)y + a(t)y^n\right)$` },
        { texto: R`$= (1 - n)\left(r(t)y^{1-n} + a(t)\right) = (1 - n)\left(r(t)z + a(t)\right) = (1 - n)r(t)\,z + (1 - n)a(t)$. La ecuación resultante es <b>lineal en $z$</b>.` },
      ],
      escena: '7/bernoulli',
      claves: [
        { idea: 'Dividir entre $y^n$', texto: R`Otra forma de verlo: divide la ecuación entre $y^n$: $y^{-n}y' = r\,y^{1-n} + a$; el lado izquierdo es $\frac{z'}{1-n}$. (Al dividir, apunta $y \equiv 0$ como posible solución perdida.)` },
        { idea: 'Reconocer Bernoulli', texto: R`Lineal más un único término con $y^n$: $y' = ry + ay^n$. La logística $y' = ky - \frac kN y^2$ es Bernoulli con $n = 2$ (⚔ Libro I usó $u = \frac1P$).` },
      ],
    },
    {
      id: 'ejemplo-bernoulli', nombre: R`Ejemplo: $\dfrac{dy}{dt} = y + e^{-2t}y^2$`, diapositivas: [20],
      explicacion: R`Con $z = \frac1y$ la ecuación se vuelve lineal, se resuelve con factor integrante $e^t$, y al volver ($y = \frac1z$) aparece la explosión donde $z$ se anula, y la solución $y \equiv 0$ que se perdió al dividir.`,
      pasos: [
        { texto: R`Es una ec. de Bernoulli donde $n = 2$, $r(t) = 1$, $a(t) = e^{-2t}$. Hacemos el cambio de variable $z = y^{1-n} = y^{-1}$.` },
        { texto: R`Entonces: $\dfrac{dz}{dt} = -z - e^{-2t}$. Esta es una ecuación lineal en $z$.` },
        { texto: R`Factor integrante: $\mu(t) = e^{\int 1\,dt} = e^t$. $\dfrac{d}{dt}\left[e^tz\right] = -e^{-t} \Rightarrow e^tz = e^{-t} + C$.` },
        { texto: R`$z(t) = Ce^{-t} + e^{-2t}$, $\;y(t) = \dfrac{1}{z(t)} = \dfrac{1}{Ce^{-t} + e^{-2t}}$.` },
        { texto: R`La solución $y(t) = 0$ es un equilibrio que se perdió al dividir.` },
      ],
      escena: '7/ejemplo-bernoulli',
      claves: [
        { idea: 'Volver a la variable original', texto: R`Resolver en $z$ no es el final: deshaz el cambio y estudia dónde la vuelta falla ($z = 0$ ⇒ $y$ explota).` },
        { idea: 'Las soluciones perdidas de siempre', texto: R`Todo cambio que divide entre $y$ (o eleva a una potencia negativa) pierde $y \equiv 0$: añádela a mano, como en separables.` },
      ],
    },
  ],
  resumen: {
    titulo: 'Resumen de la clase',
    bloques: [{ titulo: 'Lo que hemos visto', items: [
      R`<b>Variación de la constante:</b> se propone que la constante $c$ de la solución homogénea se convierta en una función $c(t)$. Al sustituir en la ecuación no homogénea, se obtiene una fórmula para la solución general, sin necesidad de adivinar la particular.`,
      R`<b>Factor integrante:</b> se multiplica la ecuación lineal por una función $\mu(t) = e^{\int g(t)\,dt}$ para convertir el lado izquierdo en una derivada exacta. Es equivalente a la variación de la constante, pero con una interpretación geométrica distinta.`,
      R`<b>Cambio de variables:</b> transforma ecuaciones que no encajan en formas estándar en ecuaciones separables, lineales o autónomas.`,
    ] }],
  },
};
