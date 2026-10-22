// CP4 ej. 7: en una autónoma con f de clase C¹, una solución con un máximo local en t0 es constante: f(y0) = 0, la
// recta y = y0 es solución y, por unicidad, coincide con y1.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, rectaEquilibrio, curva, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-3, 3], y: [-1, 3] });
const f = (t, y) => y * (2 - y) - 0;   // un ejemplo de autónoma
const Y0 = 2;

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [2200, 2000, 2000, 2400],
  leyenda: { tenue: 'una «solución» hipotética con un máximo', violeta: 'y = y₀', verde: 'lo que de verdad pasa' },
  capas: [
    (g, c, o) => {
      ejes(g, P);
      const ts = [], ys = []; for (let i = 0; i <= 80; i++) { const t = -2.5 + (5 * i) / 80; ts.push(t); ys.push(Y0 - 0.25 * t * t); }
      curva(g, P, ts, ys, { color: 'tenue', guion: [6, 5], brillo: 0, p: o.p, alfa: o.paso === 0 ? 1 : 0.4 });
      punto(g, P.X(0), P.Y(Y0), { color: 'texto', r: 5 });
      g.tex('m', P.X(0) + 10, P.Y(Y0) - 16, R`\text{máx. local: } y_1'(t_0) = 0 \Rightarrow f(y_0) = 0`, { color: 'texto', tam: 14, ancla: 'l', alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => {
      for (let t = -3; t <= 3; t += 0.4) g.linea([[P.X(t) - 11, P.Y(Y0)], [P.X(t) + 11, P.Y(Y0)]], { color: 'violeta', ancho: 3, alfa: ease(tramo(o.p, (t + 3) / 6 * 0.7, (t + 3) / 6 * 0.7 + 0.3)) });
      g.tex('h', P.X(-2.9), P.Y(Y0) + 18, R`\text{autónoma: } f(y_0) = 0 \text{ en toda la recta } y = y_0`, { color: 'violeta', tam: 13, ancla: 'l', alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => { rectaEquilibrio(g, P, Y0, { color: 'violeta', p: o.p, ancho: 3 }); g.tex('s', 370, 22, R`y_2(t) = y_0:\ y_2' = 0 = f(y_0)\ \checkmark`, { color: 'violeta', tam: 15, alfa: ease(o.p), fondo: true }); },
    (g, c, o) => { campo(g, P, f, { p: o.p, alfa: 0.35 }); g.tex('u', 370, 46, R`y_1(t_0) = y_2(t_0) = y_0 \text{ y unicidad} \Rightarrow y_1 \equiv y_0 \text{ (no hay tal máximo)}`, { color: 'verde', tam: 14, alfa: ease(o.p), fondo: true }); },
  ],
});
