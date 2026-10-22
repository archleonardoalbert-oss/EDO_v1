// Clase Práctica 5 (fuentes/cp/cp5.pdf): líneas de fase y clasificación de equilibrios.
const R = String.raw;
const C = (t, l = 5) => ({ l, t });

export default {
  numero: 5,
  ejercicios: [
    {
      id: 'cp5-1', numero: 1, nombre: 'Líneas de fase y clasificación',
      enunciado: R`Esboce las líneas de fase para la ecuación diferencial dada. Identifique los puntos de equilibrio como sumideros, fuentes o nodos. 1.1 $\dydt = y^2 - 6y - 16$; 1.2 $\dydt = \cos y$; 1.3 $\dydt = \dfrac{1}{y - 2}$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Procedimiento para dibujar la línea de fase y clasificación de equilibrios por la dirección de las flechas (o por el teorema de linealización).`, enlaces: [C('como-dibujar'), C('clasificacion'), C('linealizacion')] },
          { tipo: 'estrategia', texto: R`En cada caso: (1) resuelve $f(y) = 0$; (2) signo de $f$ entre ceros; (3) lee el tipo en las flechas vecinas.` },
          { tipo: 'arranque', texto: R`1.1: factoriza $y^2 - 6y - 16$ (dos números que multiplican $-16$ y suman $-6$). 1.2: ¿dónde se anula $\cos y$ y cómo cambia de signo al cruzar cada cero?` },
          { tipo: 'desbloqueo', texto: R`1.3: $\frac{1}{y - 2}$ nunca vale $0$, pero no está definida en $y = 2$. ¿Qué hacen las flechas a cada lado de ese punto?` },
        ],
        solucion: { escena: 'cp5/1', pasos: [
          { texto: R`1.1: $y^2 - 6y - 16 = (y - 8)(y + 2)$. Equilibrios $-2$ y $8$. Signos: $+$ si $y < -2$, $-$ entre ambos, $+$ si $y > 8$. Luego $-2$ es <b>sumidero</b> y $8$ es <b>fuente</b> (también: $f'(y) = 2y - 6$, $f'(-2) = -10 < 0$, $f'(8) = 10 > 0$).` },
          { texto: R`1.2: $\cos y = 0 \iff y = \frac{\pi}{2} + n\pi$. Como $f'(y) = -\sin y$: en $\frac{\pi}{2} + 2n\pi$, $f' = -1 < 0$ (<b>sumideros</b>); en $-\frac{\pi}{2} + 2n\pi$, $f' = 1 > 0$ (<b>fuentes</b>). Se alternan.` },
          { texto: R`1.3: no hay equilibrios ($\frac{1}{y - 2} \ne 0$). Si $y > 2$, $f > 0$ (sube); si $y < 2$, $f < 0$ (baja): las soluciones se alejan de $y = 2$, donde la ecuación no está definida (no es un equilibrio).` },
        ] },
        aprendes: { resultado: R`1.1: $-2$ sumidero, $8$ fuente. 1.2: sumideros en $\frac{\pi}{2} + 2n\pi$, fuentes en $-\frac{\pi}{2} + 2n\pi$. 1.3: sin equilibrios; todo se aleja de $y = 2$.`, ideas: [
          { idea: 'Linealización como atajo', texto: R`Cuando hay infinitos equilibrios (como en $\cos y$), el signo de $f'$ los clasifica todos de una vez.` },
          { idea: 'Punto no definido ≠ equilibrio', texto: R`Si $f$ no está definida en un valor, ahí no hay solución constante; las flechas igualmente indican qué pasa a cada lado.` },
        ] },
      }],
    },
    {
      id: 'cp5-2', numero: 2, nombre: R`Largo plazo de $y' = y^2 - 4y + 2$ con $y(0) = 0$`,
      enunciado: R`Describa el comportamiento a largo plazo de la solución de la ecuación diferencial $\dydt = y^2 - 4y + 2$ con la condición inicial dada: $y(0) = 0$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Usar la línea de fase para graficar soluciones: la solución se mueve en la dirección de su flecha hacia el equilibrio siguiente.`, enlaces: [C('graficar'), C('como-dibujar')] },
          { tipo: 'estrategia', texto: R`Halla los equilibrios con la fórmula cuadrática y ubica $y = 0$ entre ellos.` },
          { tipo: 'arranque', texto: R`$y = 2 \pm \sqrt2$. ¿Cuánto vale $f(0)$? ¿Hacia cuál de los dos equilibrios apunta la flecha?` },
        ],
        solucion: { escena: 'cp5/2', pasos: [
          { texto: R`Campo de $y^2 - 4y + 2$.` },
          { texto: R`Equilibrios $2 - \sqrt2 \approx 0.586$ (sumidero: $f' = 2y - 4 < 0$) y $2 + \sqrt2 \approx 3.414$ (fuente).` },
          { texto: R`$y(0) = 0 < 2 - \sqrt2$ y $f(0) = 2 > 0$: la solución crece y, sin poder cruzarlo, tiende a $2 - \sqrt2$ cuando $t \to \infty$.` },
        ] },
        aprendes: { resultado: R`$y(t) \to 2 - \sqrt2$ cuando $t \to \infty$.`, ideas: [
          { idea: 'Ubicar el dato entre equilibrios', texto: R`El largo plazo de una autónoma solo depende de entre qué equilibrios está el dato y de la flecha de ese intervalo.` },
          { idea: 'No hace falta resolver', texto: R`La fórmula existe, pero la pregunta «a largo plazo» se contesta con la línea de fase.` },
        ] },
      }],
    },
    {
      id: 'cp5-3', numero: 3, nombre: R`Sabiendo solo $f(-1) = f(2) = 0$`,
      enunciado: R`Considere la ecuación autónoma $\dydt = f(y)$. Suponga que sabemos que $f(-1) = f(2) = 0$. 3.1 Escriba todos los posibles comportamientos de la solución $y(t)$ que satisface la condición inicial $y(0) = 1$. 3.2 Suponga también que $f(y) > 0$ para $-1 < y < 2$. Describa todos los posibles comportamientos de la solución $y(t)$ que satisface la condición inicial $y(0) = 1$.`,
      nota: R`Suponemos $f$ continuamente diferenciable (para poder usar la unicidad: las soluciones no cruzan los equilibrios).`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Equilibrios como barreras (unicidad) y monotonía de las soluciones de una autónoma: la línea de fase decide el comportamiento.`, enlaces: [C('graficar'), { l: 4, t: 'acotadas' }] },
          { tipo: 'estrategia', texto: R`Como $y \equiv -1$ y $y \equiv 2$ son soluciones, la de $y(0) = 1$ queda en $(-1, 2)$. Dentro, ¿qué opciones da el signo de $f$ (que no conocemos en 3.1)?` },
          { tipo: 'arranque', texto: R`En 3.1 piensa en tres casos: $f(1) = 0$, $f(1) > 0$ y $f(1) < 0$.` },
          { tipo: 'desbloqueo', texto: R`Si $f(1) > 0$ la solución sube; ¿puede detenerse antes de $2$? Sí, si hay otro cero de $f$ entre $1$ y $2$.` },
        ],
        solucion: { escena: 'cp5/3', pasos: [
          { texto: R`3.1: la solución vive en $(-1, 2)$ (no cruza los equilibrios). Si $f(1) = 0$: es constante $y \equiv 1$. Si $f(1) > 0$: crece y tiende al menor cero de $f$ mayor que $1$ (que es $2$ o uno intermedio). Si $f(1) < 0$: decrece y tiende al mayor cero menor que $1$ (que es $-1$ o uno intermedio).` },
          { texto: R`3.2: con $f > 0$ en $(-1, 2)$ no hay ceros intermedios y la flecha apunta hacia arriba.` },
          { texto: R`Por tanto $y(t)$ es creciente, $y(t) \to 2$ cuando $t \to \infty$ y $y(t) \to -1$ cuando $t \to -\infty$.` },
        ] },
        aprendes: { resultado: R`3.1: constante, crece hacia un equilibrio en $(1, 2]$ o decrece hacia uno en $[-1, 1)$. 3.2: crece de $-1$ a $2$.`, ideas: [
          { idea: 'Enumerar casos por el signo', texto: R`Sin conocer $f$, el comportamiento se clasifica por el signo de $f$ en el dato: cero, positivo o negativo.` },
          { idea: 'Destino = siguiente equilibrio en la dirección de la flecha', texto: R`Una solución acotada y monótona de una autónoma tiende a un equilibrio (⚔ valientes del Libro V).` },
        ] },
      }],
    },
    {
      id: 'cp5-4', numero: 4, nombre: 'Existencia de equilibrios y de sumideros',
      enunciado: R`Sea $f(y)$ una función continua. 4.1 Suponga que $f(-10) > 0$ y $f(10) < 0$. Demuestre que hay un punto de equilibrio para $\dydt = f(y)$ entre $y = -10$ y $y = 10$. 4.2 Considere que $f(-10) > 0$, que $f(10) < 0$ y que hay finitos puntos de equilibrio entre $y = -10$ y $y = 10$. Si $y = 1$ es una fuente, demuestre que $\dydt = f(y)$ debe tener por lo menos dos sumideros entre $y = -10$ y $y = 10$.`,
      nota: R`El PDF dice «muchos puntos de equilibrio finitos»: se entiende «un número finito de puntos de equilibrio».`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Equilibrios = ceros de $f$; clasificación por las flechas: sumidero = $f$ pasa de $+$ a $-$ al cruzarlo.`, enlaces: [C('clasificacion'), C('como-dibujar')] },
          { tipo: 'estrategia', texto: R`4.1 es el teorema de Bolzano. En 4.2, estudia por separado el intervalo $(1, 10)$ y el $(-10, 1)$.` },
          { tipo: 'arranque', texto: R`Fuente en $1$: justo encima de $1$, $f > 0$; y en $10$, $f < 0$. Entre los ceros finitos de $(1, 10)$, $f$ tiene signo constante en cada tramo. ¿Dónde está el primer tramo negativo?` },
          { tipo: 'desbloqueo', texto: R`El cero que separa el último tramo positivo del primer tramo negativo tiene $+$ debajo y $-$ encima: es un sumidero. Haz lo mismo a la izquierda de $1$.` },
        ],
        solucion: { escena: 'cp5/4', pasos: [
          { texto: R`4.1: $f$ es continua en $[-10, 10]$ con $f(-10) > 0 > f(10)$; por Bolzano existe $y_0 \in (-10, 10)$ con $f(y_0) = 0$: un equilibrio.` },
          { texto: R`4.2: sean $1 < z_1 < \dots < z_m < 10$ los ceros de $f$ en $(1, 10)$ (finitos; hay al menos uno por Bolzano, pues $f > 0$ justo encima de $1$ y $f(10) < 0$). En cada tramo entre ceros consecutivos $f$ tiene signo constante; el primer tramo $(1, z_1)$ es positivo y el último $(z_m, 10]$ es negativo. Sea $z_j$ el primer cero tras el cual $f$ es negativa: debajo de $z_j$ es positiva. Entonces $z_j$ es un <b>sumidero</b>.` },
          { texto: R`Simétricamente en $(-10, 1)$: $f(-10) > 0$ y $f < 0$ justo debajo de $1$ (fuente); el último cero antes del cual $f$ es positiva, con $f$ negativa después, es un sumidero en $(-10, 1)$. En total, al menos <b>dos sumideros</b>.` },
        ] },
        aprendes: { resultado: R`Hay un equilibrio en $(-10, 10)$; y si $1$ es fuente, hay un sumidero a cada lado de $1$.`, ideas: [
          { idea: 'Cambio de signo ⇒ cero (Bolzano)', texto: R`Toda pregunta «demuestre que hay un equilibrio» con datos de signo se resuelve con Bolzano.` },
          { idea: 'El primer cambio de signo en una dirección', texto: R`Con finitos ceros, recorre los tramos de signo: el primer paso de $+$ a $-$ es un sumidero, el primero de $-$ a $+$ una fuente.` },
        ] },
      }],
    },
    {
      id: 'cp5-5', numero: 5, nombre: 'La suma de los índices',
      enunciado: R`Considere la ecuación diferencial $\dydt = f(y)$. Suponga que $y_0$ es un punto de equilibrio aislado. Definimos el índice de $y_0$ como: $+1$ si $y_0$ es una fuente; $-1$ si $y_0$ es un sumidero; $0$ si $y_0$ es un nodo. 5.1 Suponga que hay finitos puntos de equilibrio en el intervalo $-100 < y < 100$ y que $f(-100) < 0$ y $f(100) > 0$. Demuestre que la suma de los índices de todos los equilibrios en $(-100, 100)$ es $+1$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Clasificación de equilibrios por las flechas vecinas (signos de $f$ a cada lado).`, enlaces: [C('clasificacion')] },
          { tipo: 'estrategia', texto: R`Codifica el signo de $f$ en cada tramo entre equilibrios como $s = \pm1$ y escribe el índice de cada equilibrio en función de los dos signos que lo rodean.` },
          { tipo: 'arranque', texto: R`Fuente: $s_{\text{izq}} = -1$, $s_{\text{der}} = +1$; sumidero: $+1$, $-1$; nodo: iguales. ¿Qué fórmula da $+1, -1, 0$ en esos casos?` },
          { tipo: 'desbloqueo', texto: R`$\text{índice} = \frac{s_{\text{der}} - s_{\text{izq}}}{2}$. Al sumar sobre todos los equilibrios, ¿qué se cancela?` },
        ],
        solucion: { escena: 'cp5/5', pasos: [
          { texto: R`Sean $e_1 < \dots < e_k$ los equilibrios y $s_0, s_1, \dots, s_k \in \{\pm1\}$ los signos de $f$ en los tramos $(-100, e_1), (e_1, e_2), \dots, (e_k, 100)$ (constantes en cada tramo por Bolzano). Por hipótesis, $s_0 = -1$ y $s_k = +1$.` },
          { texto: R`Por las flechas: $\text{índice}(e_i) = \frac{s_i - s_{i-1}}{2}$ (fuente: $\frac{1 - (-1)}{2} = 1$; sumidero: $\frac{-1 - 1}{2} = -1$; nodo: $0$).` },
          { texto: R`Suma telescópica: $\sum_{i=1}^{k}\frac{s_i - s_{i-1}}{2} = \frac{s_k - s_0}{2} = \frac{1 - (-1)}{2} = 1$.` },
        ] },
        aprendes: { resultado: R`La suma de los índices es $+1$.`, ideas: [
          { idea: 'Codificar con ±1 y telescopiar', texto: R`Cuando una cantidad local depende de «lo que hay a cada lado», escríbela como diferencia: la suma se telescopia y solo quedan los extremos.` },
          { idea: 'Información global con datos de borde', texto: R`Solo con los signos en $\pm100$ se sabe la suma de índices, sin conocer cuántos equilibrios hay.` },
        ] },
      }],
    },
    {
      id: 'cp5-6', numero: 6, nombre: R`$f' = f'' = 0$ y $f''' > 0$`,
      enunciado: R`Digamos que $\dydt = f(y)$ tiene un punto de equilibrio en $y = y_0$ y 6.1 $f'(y_0) = 0$, $f''(y_0) = 0$ y $f'''(y_0) > 0$: ¿es $y_0$ una fuente, un sumidero o un nodo?`,
      nota: R`Suponemos $f'''$ continua cerca de $y_0$.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`El caso $f'(y_0) = 0$: la linealización no decide y hay que mirar el signo de $f$ (como con $y^3$ en la conferencia).`, enlaces: [C('caso-cero'), C('linealizacion')] },
          { tipo: 'estrategia', texto: R`Usa el desarrollo de Taylor de $f$ en $y_0$ hasta la primera derivada no nula.` },
          { tipo: 'arranque', texto: R`$f(y) = f(y_0) + f'(y_0)(y - y_0) + \frac{f''(y_0)}{2}(y - y_0)^2 + \frac{f'''(\xi)}{6}(y - y_0)^3$. ¿Qué sobrevive?` },
        ],
        solucion: { escena: 'cp5/6', pasos: [
          { texto: R`Por Taylor con resto de Lagrange: $f(y) = \frac{f'''(\xi)}{6}(y - y_0)^3$ con $\xi$ entre $y_0$ e $y$; como $f'''$ es continua y $f'''(y_0) > 0$, cerca de $y_0$ es $f'''(\xi) > 0$.` },
          { texto: R`Así $f$ tiene el signo de $(y - y_0)^3$: negativo debajo de $y_0$ y positivo encima. Las flechas se alejan: $y_0$ es una <b>fuente</b>.` },
        ] },
        aprendes: { resultado: R`$y_0$ es una fuente.`, ideas: [
          { idea: 'Primera derivada no nula', texto: R`Si la primera derivada no nula en $y_0$ es de orden impar, hay cambio de signo (fuente si es positiva, sumidero si es negativa); si es de orden par, nodo.` },
          { idea: 'Taylor para signos locales', texto: R`Cerca de un punto, el término dominante de Taylor decide el signo de la función.` },
        ] },
      }],
    },
    {
      id: 'cp5-7', numero: 7, nombre: R`Línea de fase y fórmula: $\dfrac{1}{(y - 2)(y + 1)}$`,
      enunciado: R`7.1 Esboce la línea de fase para la ecuación diferencial $\dydt = \dfrac{1}{(y - 2)(y + 1)}$ y analice el comportamiento de la solución con la condición inicial $y(0) = \frac12$. 7.2 Aplique procedimientos analíticos al problema de valor inicial y compare sus resultados con su análisis en el inciso anterior.`,
      partes: [{
        id: 'a',
        pistas: [
          { tipo: 'concepto', texto: R`Línea de fase (signos de $f$; puntos donde $f$ no está definida) y separación de variables (Conf 2).`, enlaces: [C('como-dibujar'), { l: 2, t: 'metodo' }] },
          { tipo: 'estrategia', texto: R`Primero el cualitativo: signos de $f$ en los tres intervalos que dejan $y = -1$ e $y = 2$. Luego separa: $(y - 2)(y + 1)\,dy = dt$.` },
          { tipo: 'arranque', texto: R`$f(\frac12) = \frac{1}{(-\frac32)(\frac32)} < 0$: baja. ¿Hacia dónde, y qué pasa al llegar a $y = -1$?` },
          { tipo: 'desbloqueo', texto: R`Integrando: $\frac{y^3}{3} - \frac{y^2}{2} - 2y = t + C$. Evalúa en $y = -1$ para saber cuándo llega.` },
        ],
        solucion: { escena: 'cp5/7', pasos: [
          { texto: R`7.1: no hay equilibrios. Signos: $+$ si $y < -1$, $-$ si $-1 < y < 2$, $+$ si $y > 2$; en $y = -1$ e $y = 2$, $f$ no está definida.` },
          { texto: R`Con $y(0) = \frac12$ la solución decrece hacia $-1$; como $|f| \to \infty$ cerca de $-1$, llega con pendiente infinita y no puede continuar (allí la ecuación no tiene sentido).` },
          { texto: R`7.2: $\frac{y^3}{3} - \frac{y^2}{2} - 2y = t + C$, con $C = \frac{1}{24} - \frac18 - 1 = -\frac{13}{12}$. En $y = -1$: $t = \frac76 + \frac{13}{12} = \frac94$; en $y = 2$: $t = -\frac94$. Como el lado izquierdo es estrictamente decreciente en $(-1, 2)$, la solución es su inversa: va de $2$ (en $t = -\frac94$) a $-1$ (en $t = \frac94$). Dominio $\left(-\frac94, \frac94\right)$. Coincide con el análisis cualitativo y además da los instantes.` },
        ] },
        aprendes: { resultado: R`$y(t)$ decrece de $2$ a $-1$ en el intervalo $\left(-\frac94, \frac94\right)$ y no se extiende más allá.`, ideas: [
          { idea: 'Cualitativo y analítico se complementan', texto: R`La línea de fase dice hacia dónde va; la fórmula dice cuándo llega. Usa ambas.` },
          { idea: 'Llegar a donde f explota', texto: R`Si $f \to \pm\infty$ en un valor, las soluciones pueden alcanzarlo en tiempo finito con tangente vertical: allí termina su dominio.` },
        ] },
      }],
    },
  ],
};
