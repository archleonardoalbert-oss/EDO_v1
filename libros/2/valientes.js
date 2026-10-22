// Demostraciones solo para valientes del Libro II.
const R = String.raw;

export default [
  {
    id: 'v-separacion-todas', tema: 'metodo', tipo: 'teorema',
    nombre: R`Separación de variables da todas las soluciones (lejos de los ceros de $h$)`,
    cartelas: [
      R`En un mundo donde $dy$ y $dt$ se pasaban de un lado a otro sin permiso…`,
      R`la conferencia lo justificó en dos líneas…`,
      R`hoy lo justificamos en todas las que hagan falta.`,
    ],
    enunciado: R`Sean $g$ continua en un intervalo $I$ y $h$ continua en un intervalo abierto $J$ con $h(y) \ne 0$ para todo $y \in J$. Sean $G$ una primitiva de $g$ en $I$ y $H$ una primitiva de $\frac{1}{h}$ en $J$. Entonces:
    <ol><li>Una función derivable $y : I' \to J$ ($I' \subseteq I$ intervalo) es solución de $y' = g(t)h(y)$ en $I'$ <b>si y solo si</b> existe $C \in \R$ con $H(y(t)) = G(t) + C$ para todo $t \in I'$.</li>
    <li>$H$ es estrictamente monótona, y para cada $t_0 \in I$, $y_0 \in J$ hay una solución con $y(t_0) = y_0$ definida en un intervalo abierto (relativo a $I$) que contiene a $t_0$: $y(t) = H^{-1}\big(G(t) - G(t_0) + H(y_0)\big)$.</li>
    <li>Dos soluciones con valores en $J$ y el mismo dato $y(t_0) = y_0$ coinciden en todo intervalo común que contenga a $t_0$.</li></ol>`,
    asume: [
      R`<b>Teorema fundamental del cálculo:</b> toda función continua en un intervalo tiene primitiva.`,
      R`Regla de la cadena.`,
      R`<b>Bolzano</b> (valor intermedio) y su consecuencia: la imagen continua de un intervalo es un intervalo.`,
      R`<b>Valor medio:</b> derivada $> 0$ (o $< 0$) en un intervalo ⇒ estrictamente creciente (o decreciente).`,
      R`<b>Función inversa (una variable):</b> si $H$ es derivable en un intervalo con $H' \ne 0$, entonces $H^{-1}$ es derivable y $(H^{-1})'(s) = \frac{1}{H'(H^{-1}(s))}$.`,
      R`El lema «derivada nula en un intervalo ⇒ constante» (⚔ Libro I).`,
    ],
    cuerpo: [
      {
        tipo: 'lema', titulo: R`$H$ es estrictamente monótona`,
        enunciado: R`$h$ tiene signo constante en $J$, $H' = \frac{1}{h}$ también, y $H$ es estrictamente creciente o estrictamente decreciente en $J$.`,
        pasos: [
          { texto: R`Si $h$ tomara un valor positivo y uno negativo en $J$, por Bolzano se anularía entre ellos, dentro de $J$.`, porque: R`$J$ es un intervalo; Bolzano` },
          { texto: R`Eso contradice $h \ne 0$ en $J$; luego $h > 0$ en todo $J$ o $h < 0$ en todo $J$.`, porque: R`hipótesis` },
          { texto: R`$\frac{1}{h}$ es continua en $J$ (cociente de continuas, denominador no nulo), así que tiene primitiva $H$, con $H' = \frac{1}{h}$ del mismo signo que $h$.`, porque: R`teorema fundamental del cálculo` },
          { texto: R`Derivada de signo constante y no nula ⇒ $H$ estrictamente monótona; en particular, inyectiva.`, conclusion: true, porque: R`valor medio` },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`1 ($\Rightarrow$): toda solución cumple $H(y(t)) = G(t) + C$`,
        pasos: [
          { texto: R`Sea $y$ solución en $I'$ con valores en $J$. Definimos $\Phi(t) = H(y(t)) - G(t)$.`, porque: R`la cantidad que esperamos constante` },
          { texto: R`$\Phi'(t) = H'(y(t))\,y'(t) - g(t)$.`, porque: R`regla de la cadena; $G' = g$` },
          { texto: R`$= \dfrac{1}{h(y(t))}\cdot g(t)\,h(y(t)) - g(t) = 0$.`, porque: R`$H' = \frac{1}{h}$ y la EDO; $h(y(t)) \ne 0$ porque $y(t) \in J$` },
          { texto: R`Por el lema de la derivada nula, $\Phi \equiv C$ en $I'$: $H(y(t)) = G(t) + C$.`, conclusion: true, porque: R`⚔ Libro I` },
        ],
      },
      {
        tipo: 'demostracion', titulo: R`1 ($\Leftarrow$): la relación implica la ecuación`,
        pasos: [
          { texto: R`Si $y$ es derivable con valores en $J$ y $H(y(t)) = G(t) + C$, derivamos ambos lados: $H'(y(t))\,y'(t) = g(t)$.`, porque: R`regla de la cadena` },
          { texto: R`Como $H'(y(t)) = \frac{1}{h(y(t))}$, multiplicando por $h(y(t))$: $y'(t) = g(t)\,h(y(t))$.`, conclusion: true, porque: R`$H' = \frac{1}{h}$` },
        ],
      },
      {
        tipo: 'demostracion', titulo: '2: existe solución para cada dato inicial',
        pasos: [
          { texto: R`$H(J)$ es un intervalo y $H : J \to H(J)$ es biyectiva.`, porque: R`imagen continua de un intervalo; $H$ inyectiva (primer lema)` },
          { texto: R`Sea $C = H(y_0) - G(t_0)$ y $s(t) = G(t) + C$; es continua y $s(t_0) = H(y_0) \in H(J)$.`, porque: R`$G$ derivable ⇒ continua` },
          { texto: R`Como $J$ es abierto, $y_0$ es interior a $J$ y, por monotonía estricta, $H(y_0)$ es interior a $H(J)$; por continuidad $s(t) \in H(J)$ en un intervalo $I'$ alrededor de $t_0$.`, porque: R`continuidad de $s$` },
          { texto: R`En $I'$ definimos $y(t) = H^{-1}(s(t))$: es derivable (función inversa y regla de la cadena), con valores en $J$, $y(t_0) = H^{-1}(H(y_0)) = y_0$ y $H(y(t)) = G(t) + C$.`, porque: R`teorema de la función inversa: $H' = \frac{1}{h} \ne 0$` },
          { texto: R`Por 1 ($\Leftarrow$), $y$ es solución.`, conclusion: true },
        ],
      },
      {
        tipo: 'demostracion', titulo: '3: unicidad del dato inicial',
        pasos: [
          { texto: R`Si $y_1, y_2$ son soluciones con valores en $J$ en un intervalo común $I'' \ni t_0$, por 1 ($\Rightarrow$): $H(y_i(t)) = G(t) + C_i$.`, porque: R`la parte 1` },
          { texto: R`Evaluando en $t_0$: $C_1 = H(y_0) - G(t_0) = C_2$.`, porque: R`$y_1(t_0) = y_2(t_0) = y_0$` },
          { texto: R`Luego $H(y_1(t)) = H(y_2(t))$ para todo $t \in I''$, y como $H$ es inyectiva, $y_1(t) = y_2(t)$.`, conclusion: true, porque: R`primer lema` },
        ],
      },
      { tipo: 'nota', texto: R`<b>Lo que el teorema no dice:</b> nada sobre soluciones que <em>tocan</em> un cero de $h$. Ahí el método no se aplica (no se puede dividir). En $y' = y^2$ esas soluciones son solo la constante $y \equiv 0$; pero en $y' = 3y^{2/3}$ (Libro IV) hay soluciones que salen del cero: allí la unicidad falla. El teorema de unicidad del Libro IV dice cuándo eso no puede pasar.` },
    ],
    escena: '2/v-separacion',
    escenaTexto: R`$H$ es estrictamente monótona: cada nivel horizontal la corta <b>una sola vez</b>. Por eso «$H(y) = G(t) + C$» determina $y$ sin ambigüedad: la solución existe y es única.`,
    escenaPasos: [
      { texto: R`$H(y) = \ln y$ (primitiva de $\frac{1}{h}$ con $h(y) = y$ en $J = (0, \infty)$): estrictamente creciente.` },
      { texto: R`$G(t) + C$ (con $G(t) = \frac{t^2}{2}$): al avanzar $t$, su altura cambia.` },
      { texto: R`El nivel $G(t) + C$ corta a $H$ en un único $y$: ese es $y(t)$. Así se dibuja la solución.` },
      { texto: R`Otro $C$, otra solución; mismo dato inicial, mismo $C$: la misma solución.` },
    ],
    claves: [
      { idea: 'Inyectividad = unicidad', texto: R`Si una relación $H(y) = (\text{algo})$ tiene $H$ inyectiva, determina $y$ de forma única. Monotonía estricta es la forma práctica de probar inyectividad.` },
      { idea: 'Signo constante por Bolzano', texto: R`Una función continua que no se anula en un intervalo no cambia de signo. Es el argumento que hace que «$h \ne 0$» sea tan útil.` },
      { idea: 'Primero la cantidad conservada', texto: R`$\Phi(t) = H(y(t)) - G(t)$ es constante a lo largo de cada solución: encontrar cantidades conservadas es la forma más rápida de entender ecuaciones (lo usamos también con presa-depredador).` },
    ],
  },
];
