// Bernoulli y' = y + e^{−2t}y²: soluciones en el plano (t, y) y, con z = 1/y, en el plano (t, z), donde la ecuación
// es lineal: z' = −z − e^{−2t}. La transformación se ve como un morfismo de una imagen a la otra.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, curva, rectaEquilibrio } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 60, w: 620, h: 340 }, { t: [-1, 3], y: [-3, 4] });
const CS = [-0.6, -0.2, 0.3, 0.8, 1.5, 3];
const zDe = (C) => (t) => C * Math.exp(-t) + Math.exp(-2 * t);
const ramas = (fn) => { const out = []; let ts = [], ys = [], sg = 0; for (let i = 0; i <= 400; i++) { const t = -1 + (4 * i) / 400, v = fn(t), s = Math.sign(v); if (sg && s !== sg && ts.length) { out.push([ts, ys]); ts = []; ys = []; } sg = s; ts.push(t); ys.push(v); } out.push([ts, ys]); return out; };

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [5],
  duracion: [1800, 1800, 2400, 1600, 2000, 3200],
  leyenda: { cian: 'soluciones y(t)', verde: 'z = 1/y (lineal)', violeta: 'y ≡ 0' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    formula(g, 'def', 380, 24, paso <= 1 ? R`\dfrac{dy}{dt} = r(t)\,y + a(t)\,y^n` : paso <= 3 ? R`\dfrac{dy}{dt} = y + e^{-2t}y^2\quad (n = 2,\ r = 1,\ a = e^{-2t})` : R`z = y^{1-n} \Rightarrow \dfrac{dz}{dt} = (1 - n)r(t)\,z + (1 - n)a(t)`, { tam: 16 });
    if (paso === 1) {
      [[R`n = 0:\ \text{lineal}`, 'verde'], [R`n = 1:\ \text{lineal y separable}`, 'verde'], [R`n \ge 2:\ \text{no lineal}`, 'rojo']].forEach(([tx, col], i) => formula(g, `n${i}`, 380, 150 + 70 * i, tx, { p: tramo(p, 0.2 * i, 0.5 + 0.2 * i), tam: 19, color: col }));
      return;
    }
    if (paso === 0) return;
    const s = paso === 5 ? ease(Math.min(1, ((1 - Math.cos(tiempo / 2400)) / 2) * 1.2)) : paso === 4 ? ease(p) * 0 : 0;
    ejes(g, P, { y: s > 0.5 ? 'z' : 'y' });
    if (paso <= 3) campo(g, P, (t, y) => y + Math.exp(-2 * t) * y * y, { alfa: 0.35, p: q(2) });
    rectaEquilibrio(g, P, 0, { color: 'violeta', p: q(2) });
    CS.forEach((C, i) => {
      // morfismo: cada rama de y = 1/z se transforma en z (s = 1)
      ramas((t) => 1 / zDe(C)(t)).forEach(([ts, ys]) => curva(g, P, ts, ys.map((y) => mezclar(y, 1 / y, s)), { p: paso === 2 ? tramo(p, 0.07 * i, 0.6 + 0.06 * i) : 1, color: s > 0.5 ? 'verde' : 'cian', ancho: 1.9 }));
    });
    if (paso === 3) g.tex('ns', P.X(1.8), P.Y(3.4), R`\text{no separable: } y + e^{-2t}y^2 \ne g(t)h(y)`, { color: 'texto', tam: 14, fondo: true });
    if (paso === 4) g.tex('lz', P.X(1.8), P.Y(3.4), R`\text{lineal en } z`, { color: 'verde', tam: 15, alfa: ease(p), fondo: true });
    if (paso === 5) g.tex('mf', P.X(1.8), P.Y(3.4), s > 0.5 ? R`\text{en } z = \tfrac1y:\ \text{curvas de una ecuación lineal}` : R`\text{en } y`, { color: s > 0.5 ? 'verde' : 'cian', tam: 14, fondo: true });
  },
  pasos: 6,
});
