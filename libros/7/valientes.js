// Demostraciones solo para valientes del Libro VII.
const R = String.raw;

export default [
  {
    id: 'v-factor-variacion', tema: 'derivacion-variacion', tipo: 'teorema',
    nombre: 'Factor integrante y variación de la constante son el mismo método',
    cartelas: [
      R`En un mundo con dos métodos para la misma ecuación…`,
      R`la conferencia susurró: «son equivalentes»…`,
      R`hoy se quitan la máscara.`,
    ],
    enunciado: R`Sean $a$ y $b$ continuas en un intervalo $I$, $t_0 \in I$, $A(t) = \int_{t_0}^t a(\theta)\,d\theta$, y consideremos $\dot x + a(t)x = b(t)$ (es decir, $g = a$ en la notación del factor integrante).
    <ol><li>$\mu(t) = e^{A(t)}$ cumple $\dot\mu = a\mu$, y una función derivable $x$ es solución si y solo si $\frac{d}{dt}[\mu x] = \mu b$.</li>
    <li>Las soluciones son exactamente $x(t) = e^{-A(t)}\left(c_0 + \int_{t_0}^t b(\tau)e^{A(\tau)}\,d\tau\right)$, $c_0 \in \R$: la fórmula de variación de la constante.</li>
    <li>Si $x_h(t) = e^{-A(t)}$ es la homogénea con $c = 1$, entonces $\mu = \frac{1}{x_h}$ y, para cualquier solución, $c(t) = \mu(t)\,x(t)$: «variar la constante» y «multiplicar por el factor integrante» son la misma operación.</li></ol>`,
    asume: [
      R`<b>Teorema fundamental del cálculo</b> ($A' = a$; derivada de una integral con límite variable).`,
      R`Reglas del producto y de la cadena; $e^{x} > 0$.`,
      R`El lema «derivada nula ⇒ constante» (⚔ Libro I), en la forma: si $F' = G'$ en un intervalo, $F - G$ es constante.`,
    ],
    cuerpo: [
      {
        tipo: 'demostracion', titulo: '1: el factor integrante funciona',
        pasos: [
          { texto: R`$\dot\mu = A'\,e^{A} = a\,\mu$.`, porque: R`regla de la cadena; TFC` },
          { texto: R`Para $x$ derivable: $\frac{d}{dt}[\mu x] = \mu\dot x + \dot\mu x = \mu(\dot x + a x)$.`, porque: R`regla del producto; el paso anterior` },
          { texto: R`Como $\mu > 0$, $\dot x + ax = b \iff \mu(\dot x + ax) = \mu b \iff \frac{d}{dt}[\mu x] = \mu b$.`, conclusion: true, porque: R`multiplicar o dividir por $\mu \ne 0$` },
        ],
      },
      {
        tipo: 'demostracion', titulo: '2: todas las soluciones',
        pasos: [
          { texto: R`Sea $F(t) = \int_{t_0}^t b(\tau)e^{A(\tau)}\,d\tau$; es derivable con $F' = \mu b$.`, porque: R`TFC ($\mu b$ es continua)` },
          { texto: R`Si $x$ es solución, $(\mu x)' = \mu b = F'$, así que $\mu x - F$ es constante: $\mu x = c_0 + F$.`, porque: R`parte 1; derivada nula ⇒ constante` },
          { texto: R`Despejando: $x = e^{-A}(c_0 + F)$, que es la fórmula de variación de la constante.`, porque: R`$\frac1\mu = e^{-A}$` },
          { texto: R`Recíprocamente, para cada $c_0$ esa $x$ cumple $\mu x = c_0 + F$, luego $(\mu x)' = \mu b$ y es solución.`, conclusion: true, porque: R`parte 1` },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`3: $c(t)$ es $\mu\,x$`,
        pasos: [
          { texto: R`$x_h = e^{-A}$ cumple $\dot x_h = -a x_h$: es la homogénea con $c = 1$, y $\mu = e^{A} = \frac{1}{x_h}$.`, porque: R`regla de la cadena` },
          { texto: R`En variación de la constante se escribe $x = c(t)\,x_h$; luego $c(t) = \frac{x}{x_h} = \mu\,x$.`, porque: R`despejar` },
          { texto: R`La ecuación $\dot c = b\,e^{A}$ de la conferencia es exactamente $\frac{d}{dt}[\mu x] = \mu b$: los dos métodos resuelven la misma ecuación para la misma cantidad.`, conclusion: true, porque: R`parte 1` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Las dos «interpretaciones geométricas»:</b> el factor integrante mira la ecuación como una derivada de un producto que hay que hacer aparecer; la variación de la constante la mira como un viaje a través de la familia de soluciones homogéneas, y $c(t)$ dice en qué curva estás. Son la misma cantidad, $\mu x$, vista de dos maneras.` },
    ],
    escena: '7/v-factor-variacion',
    escenaTexto: R`A la izquierda, la solución $x(t)$ cruzando la familia $c\,x_h$. A la derecha, la cantidad $\mu(t)x(t)$: coincide punto por punto con la «constante variable» $c(t)$.`,
    escenaPasos: [
      { texto: R`La solución $x(t)$ de $\dot x + x = 2\sin 2t + 1$ y la familia homogénea $c\,e^{-t}$.` },
      { texto: R`$\mu x = e^{t}x$ (curva ámbar) y $c(t)$ (puntos ciruela): son la misma función.` },
    ],
    claves: [
      { idea: 'Dos métodos, una cantidad', texto: R`Cuando dos métodos dan la misma fórmula, busca la cantidad que ambos calculan (aquí, $\mu x$). Entenderla une los métodos y facilita recordar ambos.` },
      { idea: 'Equivalencias con «si y solo si»', texto: R`Multiplicar una ecuación por algo que nunca se anula no cambia sus soluciones: es la justificación de usar factores integrantes.` },
    ],
  },
];
