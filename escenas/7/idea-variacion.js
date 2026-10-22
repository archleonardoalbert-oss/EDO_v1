// Variar la constante: la familia homogénea c·e^{−A(t)} (una curva por cada c) y una solución de la no homogénea
// que las va cruzando; en cada instante está sobre la curva de c(t) = x(t)·e^{A(t)}.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto, campo } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
// ẋ + a x = b con a = 1, b = 2 sin(2t) + 1 (cualquier b continua sirve)
const a = 1, b = (t) => 2 * Math.sin(2 * t) + 1;
const xh = (c) => (t) => c * Math.exp(-a * t);
// solución con x(0) = −1: x = e^{−t}(c0 + ∫0^t b e^{s} ds)
const cDe = (t) => { let s = 0; const n = 200; for (let i = 0; i < n; i++) { const u = (t * (i + 0.5)) / n; s += b(u) * Math.exp(u) * (t / n); } return -1 + s; };
const xs = (t) => cDe(t) * Math.exp(-t);
const A = plano({ x: 60, y: 50, w: 420, h: 360 }, { t: [0, 4], y: [-2, 3] });
const B = plano({ x: 530, y: 50, w: 210, h: 360 }, { t: [0, 4], y: [-2, 30] });

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [5, 6],
  duracion: [1600, 1600, 1600, 2000, 1800, 2400, 2200],
  leyenda: { violeta: 'homogénea: c·e^{−A(t)}', cian: 'solución de la no homogénea', ciruela: 'c(t)' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, A, { y: 'x' });
    formula(g, 'ec', 270, 24, paso >= 3 ? R`\dot x + a(t)x = 0:\ x_h = c\,e^{-\int_{t_0}^t a(\theta)d\theta}` : R`\dot x + a(t)\,x = b(t)`, { tam: 15 });
    if (paso <= 1) g.tex('otra', 270, 430, paso === 0 ? R`\text{otra vía: aprovechar la homogénea}` : R`\text{constante} \to \text{función de } t`, { color: 'texto2', tam: 14, fondo: true });
    if (paso >= 2) campo(g, A, (t, x) => -a * x + b(t), { alfa: 0.25, p: q(2), nt: 17, ny: 15 });
    const CS = [-2, -1, -0.5, 0.5, 1, 2, 3, 5, 8, 12];
    if (paso >= 3) CS.forEach((k, i) => grafica(g, A, xh(k), { color: 'violeta', alfa: 0.55, brillo: 0, ancho: 1.4, p: paso === 3 ? tramo(p, 0.05 * i, 0.6 + 0.04 * i) : 1 }));
    if (paso >= 4) { grafica(g, A, xs, { p: q(4) }); g.tex('sum', 270, 430, R`x = x_h + x_p`, { color: 'cian', tam: 15, alfa: ease(q(4)), fondo: true }); }
    if (paso >= 5) {
      const t = mezclar(0.1, 3.8, (1 - Math.cos(tiempo / 1800)) / 2), cc = cDe(t);
      grafica(g, A, xh(cc), { color: 'ciruela', ancho: 2.4, brillo: 5 });
      punto(g, A.X(t), A.Y(xs(t)), { color: 'cian', r: 6, halo: true });
      g.tex('cv', A.X(t) + 10, A.Y(xs(t)) - 18, R`c(t) = ${cc.toFixed(2)}`, { color: 'ciruela', tam: 14, ancla: 'l', fondo: true });
      panel(g, { x: 505, y: 25, w: 250, h: 405 }, R`c(t)`, { clave: 'pc', p: q(5) });
      ejes(g, B, { numeros: false, y: '', clave: 'eb', p: q(5) });
      grafica(g, B, cDe, { color: 'ciruela', p: q(5) });
      punto(g, B.X(t), B.Y(cc), { color: 'ciruela', alfa: ease(q(5)) });
      if (paso === 5) formula(g, 'id', 270, 430, R`x(t) = c(t)\,e^{-\int_{t_0}^t a(\theta)d\theta}`, { p, tam: 15, color: 'ciruela' });
      if (paso === 6) g.tex('cual', 270, 430, R`c(t) \text{ se halla sustituyendo; vale para cualquier } b \text{ continua}`, { color: 'texto', tam: 14, alfa: ease(p), fondo: true });
    }
  },
  pasos: 7,
});
