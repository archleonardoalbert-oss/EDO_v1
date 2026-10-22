// CP3 ej. 3: y ≡ 2 es solución ⇒ f(t, 2) = 0 para todo t: marcas horizontales sobre y = 2 (es todo lo que se sabe del
// campo). Si la ecuación tiene unicidad, las demás soluciones no pueden cruzar y = 2.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, rectaEquilibrio, solucion } from '../primitivas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-1, 6], y: [0, 4] });
const f = (t, y) => (y - 2) * Math.cos(t) * 0.8;   // un ejemplo cualquiera con f(t, 2) = 0

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [2400, 2400],
  leyenda: { violeta: 'y ≡ 2 y sus marcas horizontales', tenue: 'el resto del campo: desconocido', cian: 'otras soluciones (ejemplo)' },
  capas: [
    (g, c, o) => {
      ejes(g, P);
      for (let t = -1; t <= 6; t += 0.35) g.linea([[P.X(t) - 12, P.Y(2)], [P.X(t) + 12, P.Y(2)]], { color: 'violeta', ancho: 3, alfa: ease(tramo(o.p, (t + 1) / 7 * 0.7, (t + 1) / 7 * 0.7 + 0.3)) });
      for (let t = -0.5; t <= 6; t += 0.7) for (const y of [0.5, 1.2, 2.8, 3.5]) g.texto(P.X(t), P.Y(y), '?', { color: 'tenue', tam: 13, alfa: 0.6 * ease(o.p) });
      g.tex('m', P.X(3), P.Y(2) - 20, R`f(t, 2) = 0 \text{ para todo } t`, { color: 'violeta', tam: 15, alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => {
      rectaEquilibrio(g, P, 2, { color: 'violeta' });
      [0.6, 1.3, 2.7, 3.4].forEach((y0, i) => solucion(g, P, f, 0, y0, { p: tramo(o.p, 0.1 * i, 0.7 + 0.1 * i), punto: false, ancho: 2 }));
      g.tex('nc', P.X(3), P.Y(0.25), R`\text{con unicidad: } y(0) > 2 \Rightarrow y(t) > 2;\quad y(0) < 2 \Rightarrow y(t) < 2`, { color: 'cian', tam: 14, alfa: ease(o.p), fondo: true });
    },
  ],
});
