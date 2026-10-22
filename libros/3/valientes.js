// Demostraciones solo para valientes del Libro III.
const R = String.raw;

export default [
  {
    id: 'v-traslacion-autonoma', tema: 'caso-autonomo', tipo: 'teorema',
    nombre: 'Las soluciones de una autónoma son traslaciones horizontales unas de otras',
    cartelas: [
      R`En un mundo donde el tiempo no aparece en la ecuación…`,
      R`una sola curva escondía infinitas…`,
      R`y ninguna más.`,
    ],
    enunciado: R`Sea $f$ continua en un intervalo abierto $J$ y consideremos $y' = f(y)$.
    <ol><li>Si $y_1$ es solución en un intervalo $I$, entonces para cada $c \in \R$, $y_2(t) = y_1(t + c)$ es solución en $I - c = \{t : t + c \in I\}$.</li>
    <li>Si además $f(y) \ne 0$ en $J$, y $y_1, y_2$ son soluciones con valores en $J$ que alcanzan la misma altura, $y_1(t_1) = y_2(t_2) = y_0$, entonces $y_2(t) = y_1(t + t_1 - t_2)$ en todo intervalo común (alrededor de $t_2$) donde ambas expresiones están definidas.</li></ol>`,
    asume: [
      R`Regla de la cadena.`,
      R`La parte 3 de ⚔ «Separación de variables da todas las soluciones» (Libro II): con $g \equiv 1$ y $h = f$.`,
    ],
    cuerpo: [
      {
        tipo: 'demostracion', titulo: '1: una traslación de una solución es solución',
        pasos: [
          { texto: R`Sea $y_2(t) = y_1(t + c)$ para $t \in I - c$. Es derivable y $y_2'(t) = y_1'(t + c)\cdot 1$.`, porque: R`regla de la cadena con $u = t + c$, $u' = 1$` },
          { texto: R`Como $y_1$ es solución, $y_1'(t + c) = f(y_1(t + c))$.`, porque: R`la EDO evaluada en el instante $t + c \in I$` },
          { texto: R`Luego $y_2'(t) = f(y_1(t + c)) = f(y_2(t))$: $y_2$ es solución.`, conclusion: true, porque: R`definición de $y_2$` },
          { texto: R`(Aquí se usa que $f$ no depende de $t$: con $f(t, y)$ habría salido $f(t + c, y_2(t))$, que en general no es $f(t, y_2(t))$.)`, porque: R`dónde falla para no autónomas` },
        ],
      },
      {
        tipo: 'demostracion', titulo: '2: no hay otras (donde f no se anula)',
        pasos: [
          { texto: R`Sea $z(t) = y_1(t + t_1 - t_2)$. Por la parte 1, $z$ es solución, con valores en $J$, y $z(t_2) = y_1(t_1) = y_0$.`, porque: R`parte 1 con $c = t_1 - t_2$` },
          { texto: R`$y_2$ y $z$ son soluciones de $y' = 1\cdot f(y)$ con valores en $J$ y el mismo dato $y(t_2) = y_0$.`, porque: R`es separable con $g \equiv 1$, $h = f \ne 0$ en $J$` },
          { texto: R`Por la unicidad del teorema de separación, $y_2 = z$ en todo intervalo común que contenga a $t_2$.`, conclusion: true, porque: R`⚔ Libro II, parte 3` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Consecuencia práctica:</b> en una autónoma, para saber cómo es la solución que pasa por la altura $y_0$ no importa el instante: todas las que pasan por $y_0$ (sin tocar un equilibrio) son la misma curva desplazada. Por eso la línea de fase (Libro V), que ignora $t$, basta para describirlas.` },
    ],
    escena: '3/v-traslacion',
    escenaTexto: R`A la misma altura, el campo de una autónoma tiene la misma pendiente: si deslizas la curva en horizontal, sigue siendo tangente a todas las marcas. Y otra solución que pase por esa altura encaja exactamente encima.`,
    escenaPasos: [
      { texto: R`Una solución $y_1$ de $y' = 4y(1 - y)$ y su tangente a la altura $y_0$.` },
      { texto: R`La trasladamos $c$ unidades: a la misma altura, la misma pendiente; sigue siendo solución.` },
      { texto: R`Otra solución $y_2$ que pasa por $y_0$ en otro instante: deslizada $t_1 - t_2$, cae exactamente sobre $y_1$.` },
    ],
    claves: [
      { idea: 'Invariancia ⇒ familias gratis', texto: R`Si la ecuación no cambia al sustituir $t$ por $t + c$, cualquier solución trasladada sigue siendo solución. Buscar simetrías de la ecuación da soluciones nuevas sin cálculo.` },
      { idea: 'Construye el candidato y usa unicidad', texto: R`Para probar que dos funciones coinciden, construye una que tenga la propiedad deseada (aquí $z$) y aplica un teorema de unicidad. Es el patrón de casi todas las demostraciones de «son la misma».` },
    ],
  },
];
