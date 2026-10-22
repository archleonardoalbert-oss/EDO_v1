// CP3 ej. 2: f(t, 3) = −1 para todo t. Las marcas sobre y = 3 bajan; una solución que viene de abajo tendría que
// cruzar subiendo, pero allí el campo la obliga a bajar: no puede llegar a 3.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, punto } from '../primitivas.js';
import { direccion } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-1, 6], y: [0, 4.5] });
// un ejemplo cualquiera con f(t, 3) = −1 (el razonamiento no depende de él)
const f = (t, y) => -1 + (3 - y) * (1.2 + Math.sin(2 * t));

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [2200, 2400, 2000],
  leyenda: { ambar: 'marcas sobre y = 3: pendiente −1', cian: 'soluciones con y(0) < 3', rojo: 'imposible' },
  capas: [
    (g, c, o) => {
      ejes(g, P);
      campo(g, P, f, { alfa: 0.25, ny: 19 });
      for (let t = -1; t <= 6; t += 0.35) { const [ux, uy] = direccion(P, -1), a = ease(tramo(o.p, (t + 1) / 7 * 0.7, (t + 1) / 7 * 0.7 + 0.3)); g.linea([[P.X(t) - ux * 12, P.Y(3) - uy * 12], [P.X(t) + ux * 12, P.Y(3) + uy * 12]], { color: 'ambar', ancho: 3, alfa: a }); }
      g.tex('l3', P.X(5.6), P.Y(3) - 18, R`y = 3:\ f = -1`, { color: 'ambar', tam: 14, alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => {
      // el primer instante en que tocaría y = 3 llegaría subiendo (pendiente ≥ 0), pero allí la pendiente es −1
      const x = P.X(2), y = P.Y(3);
      g.linea([[P.X(1.2), P.Y(2.4)], [x, y]], { color: 'rojo', ancho: 2.4, guion: [5, 4], alfa: ease(o.p) });
      punto(g, x, y, { color: 'rojo', r: 6, halo: true, alfa: ease(o.p) });
      g.tex('cont', x + 10, y - 40, R`\text{llegaría subiendo: } y'(t_1) \ge 0,\ \text{pero } f(t_1, 3) = -1`, { color: 'rojo', tam: 14, ancla: 'l', alfa: ease(tramo(o.p, 0.4, 1)), fondo: true });
    },
    (g, c, o) => {
      [0.5, 1.5, 2.3, 2.8, 3.6, 4.2].forEach((y0, i) => solucion(g, P, f, 0, y0, { p: tramo(o.p, 0.08 * i, 0.6 + 0.08 * i), sentido: 'adelante', punto: false, ancho: 2, color: y0 < 3 ? 'cian' : 'tenue' }));
      g.tex('nunca', P.X(3), P.Y(0.4), R`y(0) < 3 \Rightarrow y(t) < 3 \text{ para todo } t \ge 0:\ \text{no puede tender a } \infty`, { color: 'cian', tam: 14, alfa: ease(o.p), fondo: true });
    },
  ],
});
