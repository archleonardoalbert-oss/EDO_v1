// CP4 ej. 6: (a) y = 1/√(1 − 2t) explota en t = 1/2; (b) y = −1 + √(1 + 2 ln((2 − t)/2)) llega a y = −1 con
// tangente vertical en t = 2 − 2e^{−1/2}, donde f no está definida.
import { definirEscena } from '../comun.js';
import { plano, ease } from '../../motor/plano.js';
import { ejes, campo, curva, punto } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 60, w: 300, h: 330 }, { t: [-2, 1], y: [0, 6] });
const B = plano({ x: 430, y: 60, w: 300, h: 330 }, { t: [-3, 1.5], y: [-1.6, 1.4] });
const rama = (fn, a, b) => { const ts = [], ys = []; for (let i = 0; i <= 400; i++) { const t = a + ((b - a) * i) / 400; ts.push(t); ys.push(fn(t)); } return [ts, ys]; };
const tb = 2 - 2 * Math.exp(-0.5);

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [2400, 2400],
  leyenda: { cian: 'la solución', rojo: 'borde del dominio' },
  capas: [
    (g, c, o) => {
      panel(g, { x: 25, y: 22, w: 350, h: 410 }, R`(a)\ y' = y^3,\ y(0) = 1`, { clave: 'pa' });
      ejes(g, A, { clave: 'ea', numeros: false });
      campo(g, A, (t, y) => y ** 3, { alfa: 0.3, nt: 13, ny: 13 });
      const [ts, ys] = rama((t) => 1 / Math.sqrt(1 - 2 * t), -2, 0.4999);
      curva(g, A, ts, ys, { p: o.p });
      punto(g, A.X(0), A.Y(1), { color: 'ciruela' });
      g.linea([[A.X(0.5), A.caja.y], [A.X(0.5), A.caja.y + A.caja.h]], { color: 'rojo', ancho: 1.6, guion: [5, 4], alfa: ease(o.p) });
      formula(g, 'fa', 200, 410, R`y = \dfrac{1}{\sqrt{1 - 2t}},\ \ t \in \left(-\infty, \tfrac12\right)`, { p: o.p, tam: 14, color: 'cian' });
    },
    (g, c, o) => {
      panel(g, { x: 405, y: 22, w: 350, h: 410 }, R`(b)\ y' = \tfrac{1}{(y+1)(t-2)},\ y(0) = 0`, { clave: 'pb' });
      ejes(g, B, { clave: 'eb', numeros: false });
      campo(g, B, (t, y) => 1 / ((y + 1) * (t - 2)), { alfa: 0.3, nt: 13, ny: 13 });
      const [ts, ys] = rama((t) => -1 + Math.sqrt(1 + 2 * Math.log((2 - t) / 2)), -3, tb - 1e-6);
      curva(g, B, ts, ys, { p: o.p });
      punto(g, B.X(0), B.Y(0), { color: 'ciruela' });
      g.linea([[B.caja.x, B.Y(-1)], [B.caja.x + B.caja.w, B.Y(-1)]], { color: 'rojo', ancho: 1.6, guion: [5, 4], alfa: ease(o.p) });
      punto(g, B.X(tb), B.Y(-1), { color: 'rojo', alfa: ease(o.p) });
      formula(g, 'fb', 580, 410, R`t \in \left(-\infty,\ 2 - 2e^{-1/2}\right),\ \ y \to -1`, { p: o.p, tam: 14, color: 'cian' });
    },
  ],
});
