// CP4 ej. 2: paracaidista m dv/dt = mg − kv² (m = 54, k = 0.18). Euler hasta alcanzar 0.95·v_T, con v_T = √(mg/k).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, rectaEquilibrio, punto } from '../primitivas.js';
import { poligonoEuler, formula } from '../piezas.js';

const R = String.raw;
const g0 = 9.8, m = 54, k = 0.18, vT = Math.sqrt((m * g0) / k);
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [0, 16], y: [0, 62] });
const f = (t, v) => g0 - (k / m) * v * v;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'dt', tipo: 'deslizador', etiqueta: R`\Delta t`, valor: 0.1, min: 0.05, max: 1, paso: 0.05 }],
  preparar: (e) => { const eu = euler(f, 0, 0, e.dt, Math.round(16 / e.dt)); const i = eu.y.findIndex((v) => v >= 0.95 * vT); return { e, eu, i }; },
  duracion: [2000, 2600, 2200],
  leyenda: { verde: 'velocidad terminal', violeta: '95 %', ambar: 'Euler' },
  capas: [
    (g, c, o) => {
      ejes(g, P, { y: 'v' });
      rectaEquilibrio(g, P, vT, { tipo: 'sumidero', p: o.p });
      g.linea([[P.caja.x, P.Y(0.95 * vT)], [P.caja.x + P.caja.w, P.Y(0.95 * vT)]], { color: 'violeta', ancho: 1.4, guion: [5, 5], alfa: ease(o.p) });
      formula(g, 'vt', 370, 22, R`\dfrac{dv}{dt} = g - \tfrac{k}{m}v^2 = 0 \Rightarrow v_T = \sqrt{\tfrac{mg}{k}} = ${vT.toFixed(2)}\ \text{m/s}`, { p: o.p, tam: 15 });
      g.tex('95', P.X(15.8), P.Y(0.95 * vT) + 14, R`0.95\,v_T = ${(0.95 * vT).toFixed(2)}`, { color: 'violeta', tam: 13, ancla: 'r', alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => poligonoEuler(g, P, c.eu, { p: o.p, puntos: c.e.dt >= 0.5 }),
    (g, c, o) => {
      if (c.i < 0) return;
      const t = c.eu.t[c.i];
      punto(g, P.X(t), P.Y(c.eu.y[c.i]), { color: 'violeta', r: 6, halo: true, alfa: ease(o.p) });
      g.linea([[P.X(t), P.Y(c.eu.y[c.i])], [P.X(t), P.Y(0)]], { color: 'violeta', ancho: 1.4, guion: [4, 4], alfa: ease(o.p) });
      g.tex('t95', P.X(t) + 8, P.Y(20), R`t \approx ${t.toFixed(2)}\ \text{s}`, { color: 'violeta', tam: 16, ancla: 'l', alfa: ease(o.p), fondo: true });
    },
  ],
});
