// Existencia: f continua en un rectángulo R ⇒ hay solución en (t0 − ε, t0 + ε). Solo local: y' = 1 + y² tiene f
// continua en todo el plano y su solución tan t explota en ±π/2. Al final: ¿hay solo una?
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, punto, curva } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-2.2, 2.2], y: [-5, 5] });
const g1 = (t, y) => Math.sin(t * y) + 0.6 * y - 0.3 * t;
const g2 = (t, y) => 1 + y * y;

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 't0', tipo: 'deslizador', etiqueta: 't_0', valor: -0.6, min: -1.6, max: 1.6, paso: 0.05 },
    { id: 'y0', tipo: 'deslizador', etiqueta: 'y_0', valor: 1, min: -3, max: 3, paso: 0.05 },
  ],
  preparar: (e) => ({ e }),
  duracion: [1600, 1600, 2600, 2000, 2400, 2200, 2000],
  leyenda: (paso) => (paso < 4 ? { campo: 'campo de f continua', ciruela: '(t₀, y₀)', verde: 'rectángulo R', cian: 'solución local' } : { campo: 'campo 1 + y²', cian: 'y = tan t', rojo: 'asíntotas t = ±π/2' }),
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), { t0, y0 } = c.e;
    ejes(g, P);
    if (paso <= 3) {
      campo(g, P, g1, { alfa: 0.45 });
      if (paso === 0) g.tex('q', 370, 22, R`\text{¿existe alguna solución? (antes de buscarla)}`, { color: 'texto', tam: 15, fondo: true });
      punto(g, P.X(t0), P.Y(y0), { color: 'ciruela', r: 6, halo: true, alfa: ease(q(1)) });
      if (paso === 1) g.tex('pvi', 370, 22, R`\dfrac{dy}{dt} = f(t, y),\ \ y(t_0) = y_0`, { color: 'texto', tam: 16, fondo: true });
      if (paso >= 2) {
        const a = ease(q(2)), x1 = P.X(t0 - 1), x2 = P.X(t0 + 1), y1 = P.Y(y0 + 2), y2 = P.Y(y0 - 2);
        g.rect(x1, y1, x2 - x1, y2 - y1, { color: 'verde', relleno: false, ancho: 2, alfa: a, radio: 4 });
        g.tex('R', x1 + 8, y1 + 14, R`R`, { color: 'verde', tam: 16, ancla: 'l', alfa: a });
        g.tex('fc', x2 + 6, y1 + 14, R`f \text{ continua}`, { color: 'verde', tam: 13, ancla: 'l', alfa: a, fondo: true });
        const eps = 0.45;
        g.linea([[P.X(t0 - eps), P.Y(-5) + 2], [P.X(t0 + eps), P.Y(-5) + 2]], { color: 'cian', ancho: 4, alfa: ease(tramo(q(2), 0.5, 1)) });
        g.tex('eps', P.X(t0), P.Y(-5) - 14, R`(t_0 - \varepsilon,\ t_0 + \varepsilon)`, { color: 'cian', tam: 13, alfa: ease(tramo(q(2), 0.5, 1)), fondo: true });
        // la solución local: solo un trocito alrededor de t0
        const s = solucion(g, P, g1, t0, y0, { p: 0, punto: false }).datos;
        const corta = (cv) => { const k = cv.t.findIndex((t) => Math.abs(t - t0) > eps); return k < 0 ? cv : { t: cv.t.slice(0, k), y: cv.y.slice(0, k) }; };
        const A = corta(s.adelante), B = corta(s.atras);
        curva(g, P, A.t, A.y, { p: tramo(q(2), 0.5, 1) }); curva(g, P, B.t, B.y, { p: tramo(q(2), 0.5, 1) });
      }
      if (paso === 3) g.tex('loc', 370, 22, R`\text{solo garantiza un intervalo \textbf{pequeño}}`, { color: 'cian', tam: 15, fondo: true });
      return;
    }
    // 4–5 · y' = 1 + y², y(0) = 0 ⇒ y = tan t
    campo(g, P, g2, { alfa: 0.45 });
    formula(g, 'ex', 370, 22, R`\dfrac{dy}{dt} = 1 + y^2,\ y(0) = 0\ \Rightarrow\ \arctan y = t \Rightarrow y = \tan t`, { p: q(4), tam: 15 });
    // solo la rama (−π/2, π/2): es la solución del PVI (las otras ramas de tan no pasan por (0, 0))
    const rama = (fn) => { const ts = [], ys = []; for (let i = 1; i < 600; i++) { const t = -Math.PI / 2 + (Math.PI * i) / 600; ts.push(t); ys.push(fn(t)); } return [ts, ys]; };
    const [tr, yr] = rama(Math.tan);
    curva(g, P, tr, yr, { p: q(4) });
    punto(g, P.X(0), P.Y(0), { color: 'ciruela', r: 5 });
    if (paso >= 5) {
      [-Math.PI / 2, Math.PI / 2].forEach((t, i) => {
        g.linea([[P.X(t), P.caja.y], [P.X(t), P.caja.y + P.caja.h]], { color: 'rojo', ancho: 1.8, guion: [6, 5], alfa: ease(q(5)) });
        g.tex(`as${i}`, P.X(t) + (i ? 8 : -8), P.Y(-4.4), i ? R`t = \tfrac{\pi}{2}` : R`t = -\tfrac{\pi}{2}`, { color: 'rojo', tam: 14, ancla: i ? 'l' : 'r', alfa: ease(q(5)), fondo: true });
      });
      g.tex('fin', P.X(1.9), P.Y(3.6), R`+\infty \text{ en tiempo finito}`, { color: 'rojo', tam: 14, alfa: ease(q(5)), fondo: true });
    }
    if (paso === 6) {
      [[0.4, 1.3], [-0.6, 1.1]].forEach(([dy, k]) => { const [ts, ys] = rama((t) => Math.tan(t) + dy * Math.sin(k * t) * t * t); curva(g, P, ts, ys, { color: 'tenue', guion: [5, 5], brillo: 0, ancho: 1.6, p }); });
      g.tex('una', P.X(-1.2), P.Y(3.6), R`\text{¿solo una?}`, { color: 'texto', tam: 18, alfa: ease(p), fondo: true });
    }
  },
  pasos: 7,
  asas: (c, paso) => (paso >= 1 && paso <= 3 ? [{ id: 'p', x: P.X(c.e.t0), y: P.Y(c.e.y0), color: 'ciruela', mover: (x, y) => ({ t0: P.T(x), y0: P.V(y) }) }] : []),
});
