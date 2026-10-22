// Valientes · existencia (Peano): el rectángulo K, el embudo de pendientes ±M, poligonales de Euler cada vez más
// finas que se aprietan, y su límite tangente al campo.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, campo, solucion, punto } from '../primitivas.js';
import { poligonoEuler, formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 340 }, { t: [-1.3, 1.4], y: [-1.7, 1.7] });
const f = (t, y) => Math.cos(3 * t) * (1 - y * y) + 0.3 * Math.sin(5 * y);
// K = [t0 − α, t0 + α] × [y0 − β, y0 + β]; en K, |f| ≤ |1 − y²| + 0.3 ≤ 1.3 = M; ε = min(α, β/M)
const T0 = 0, Y0 = 0, ALFA = 1.2, BETA = 1.4, M = 1.3, EPS = Math.min(ALFA, BETA / M);
const COL = ['rojo', 'ambar', 'violeta', 'verde', 'cian'];

export default definirEscena({
  alto: 420,
  preparar: () => ({ eus: [2, 4, 8, 16, 64].map((n) => euler(f, T0, Y0, EPS / n, n)) }),
  duracion: [2200, 3000, 2400, 2200],
  leyenda: { verde: 'rectángulo K', violeta: 'embudo |y − y₀| ≤ M(t − t₀)', ambar: 'poligonales de Euler', cian: 'la solución límite' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.35 });
    const a = ease(q(0));
    g.rect(P.X(T0 - ALFA), P.Y(Y0 + BETA), P.X(T0 + ALFA) - P.X(T0 - ALFA), P.Y(Y0 - BETA) - P.Y(Y0 + BETA), { color: 'verde', relleno: false, ancho: 1.6, alfa: a, radio: 4 });
    g.tex('K', P.X(T0 + ALFA) - 6, P.Y(Y0 + BETA) + 14, R`K`, { color: 'verde', tam: 16, ancla: 'r', alfa: a });
    g.linea([[P.X(T0 + EPS), P.Y(Y0 + BETA)], [P.X(T0 + EPS), P.Y(Y0 - BETA)]], { color: 'texto2', ancho: 1, guion: [3, 4], alfa: a });
    g.tex('eps', P.X(T0 + EPS), P.Y(Y0 - BETA) + 14, R`t_0 + \varepsilon`, { color: 'texto2', tam: 13, alfa: a, fondo: true });
    const ctx = g.ctx;
    ctx.save(); ctx.beginPath(); ctx.moveTo(P.X(T0), P.Y(Y0)); ctx.lineTo(P.X(T0 + EPS), P.Y(Y0 + M * EPS)); ctx.lineTo(P.X(T0 + EPS), P.Y(Y0 - M * EPS)); ctx.closePath();
    ctx.fillStyle = `rgba(125,108,196,${0.12 * a})`; ctx.fill(); ctx.restore();
    g.linea([[P.X(T0), P.Y(Y0)], [P.X(T0 + EPS), P.Y(Y0 + M * EPS)]], { color: 'violeta', ancho: 1.4, guion: [5, 4], alfa: a });
    g.linea([[P.X(T0), P.Y(Y0)], [P.X(T0 + EPS), P.Y(Y0 - M * EPS)]], { color: 'violeta', ancho: 1.4, guion: [5, 4], alfa: a });
    punto(g, P.X(T0), P.Y(Y0), { color: 'ciruela', r: 6, halo: true });
    if (paso === 0) formula(g, 'm', 380, 22, R`|f| \le M \text{ en } K,\ \varepsilon = \min\left(\alpha, \tfrac{\beta}{M}\right):\ \text{el embudo cabe en } K`, { p, tam: 15 });
    if (paso >= 1) c.eus.slice(0, 4).forEach((eu, i) => poligonoEuler(g, P, eu, { p: paso === 1 ? tramo(p, 0.22 * i, 0.4 + 0.2 * i) : 1, color: COL[i], radio: 2.4, ancho: 1.6, alfa: paso >= 2 ? 0.55 : 1 }));
    if (paso === 1) formula(g, 'h', 380, 22, R`h = \tfrac{\varepsilon}{2},\ \tfrac{\varepsilon}{4},\ \tfrac{\varepsilon}{8},\ \tfrac{\varepsilon}{16}`, { p, tam: 15 });
    if (paso >= 2) {
      poligonoEuler(g, P, c.eus[4], { p: paso === 2 ? p : 1, color: 'ambar', puntos: false, ancho: 2.4 });
      if (paso === 2) formula(g, 'u', 380, 22, R`\text{se aprietan: convergen uniformemente}`, { p, tam: 15 });
    }
    if (paso === 3) {
      solucion(g, P, f, T0, Y0, { sentido: 'adelante', p, alfa: 0.9 });
      formula(g, 's', 380, 22, R`\varphi = y_0 + \int f(s, \varphi(s))\,ds:\ \textbf{solución}`, { p, tam: 15, color: 'cian' });
    }
  },
  pasos: 4,
});
