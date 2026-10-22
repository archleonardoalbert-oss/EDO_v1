// dy/dt = t/y²: separar, integrar (curvas de nivel y³/3 − t²/2 = C) y despejar y = (3t²/2 + K)^{1/3}.
// Cada condición inicial fija K; una solución no puede cruzar y = 0, donde la ecuación no está definida.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, curva, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-3, 3], y: [-3, 3] });
const f = (t, y) => t / (y * y);
const KS = [-9, -6, -3, -1, 0.5, 2, 5, 9, 14];

/** Ramas de y = cbrt(1.5t² + K) en la vista, cortadas donde y cambia de signo (y = 0 no es válido). */
function ramas(K) {
  const out = [];
  let ts = [], ys = [], signo = 0;
  for (let i = 0; i <= 400; i++) {
    const t = -3 + (6 * i) / 400, y = Math.cbrt(1.5 * t * t + K), s = Math.sign(y);
    if (signo && s !== signo) { out.push([ts, ys]); ts = []; ys = []; }
    signo = s; ts.push(t); ys.push(y);
  }
  out.push([ts, ys]);
  return out;
}

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 't0', tipo: 'deslizador', etiqueta: 't_0', valor: 0, min: -2.5, max: 2.5, paso: 0.05 },
    { id: 'y0', tipo: 'deslizador', etiqueta: 'y_0', valor: 1.2, min: -2.8, max: 2.8, paso: 0.05 },
  ],
  validar: (e) => (Math.abs(e.y0) < 0.05 ? 'y₀ = 0: allí t/y² no está definida' : null),
  preparar: (e) => ({ e, K: e.y0 ** 3 - 1.5 * e.t0 ** 2 }),
  duracion: [1600, 2400, 2200, 1800, 1800],
  leyenda: { campo: 'campo t/y²', violeta: 'curvas y³/3 − t²/2 = C', cian: 'solución con y(t₀) = y₀', ciruela: 'condición inicial' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45, nt: 25, ny: 19 });
    g.linea([[P.caja.x, P.Y(0)], [P.caja.x + P.caja.w, P.Y(0)]], { color: 'rojo', ancho: 1.2, guion: [2, 5], alfa: 0.7 });
    formula(g, 's1', 160, 28, R`\htmlClass{k-violeta}{y^2\,dy} = \htmlClass{k-ambar}{t\,dt}`, { p: q(0), tam: 17 });
    if (paso >= 1) {
      formula(g, 's2', 440, 28, R`\dfrac{y^3}{3} = \dfrac{t^2}{2} + C`, { p: q(1), tam: 17 });
      KS.forEach((K, i) => ramas(K).forEach(([ts, ys]) => curva(g, P, ts, ys, { color: 'violeta', alfa: paso === 1 ? 0.75 : 0.28, brillo: 0, ancho: 1.6, p: paso === 1 ? tramo(p, 0.05 * i, 0.6 + 0.05 * i) : 1 })));
    }
    if (paso >= 2) formula(g, 's3', 590, 28, R`y = \left(\tfrac{3t^2}{2} + K\right)^{1/3}`, { p: q(2), tam: 17, color: 'cian' });
    if (paso === 2) KS.forEach((K, i) => ramas(K).forEach(([ts, ys]) => curva(g, P, ts, ys, { p: tramo(p, 0.06 * i, 0.6 + 0.06 * i), alfa: 0.8, ancho: 2 })));
    if (paso >= 3) {
      // la solución por la condición inicial: solo la rama que contiene (t0, y0)
      const rama = ramas(c.K).find(([ts, ys]) => ts.some((t, i) => Math.abs(t - c.e.t0) < 0.02 && Math.sign(ys[i]) === Math.sign(c.e.y0)));
      if (rama) curva(g, P, rama[0], rama[1], { p: q(3) });
      punto(g, P.X(c.e.t0), P.Y(c.e.y0), { color: 'ciruela', r: 6, halo: true });
      g.tex('K', P.X(-2.9), P.Y(2.6), R`K = y_0^3 - \tfrac{3}{2}t_0^2 = ${c.K.toFixed(2)}`, { color: 'ciruela', tam: 16, ancla: 'l', fondo: true });
      if (paso === 4) g.tex('dep', P.X(-2.9), P.Y(2.05), R`\text{arrastra el punto: cada PVI fija su constante}`, { color: 'texto2', tam: 13, ancla: 'l', alfa: ease(p) });
      if (c.K < 0) g.tex('cero', P.X(0), P.Y(-2.75), R`\text{en } y = 0 \text{ la ecuación no está definida: la solución se detiene}`, { color: 'rojo', tam: 13, alfa: ease(q(3)), fondo: true });
    }
  },
  pasos: 5,
  asas: (c, paso) => (paso >= 3 ? [{ id: 'p', x: P.X(c.e.t0), y: P.Y(c.e.y0), color: 'ciruela', mover: (x, y) => ({ t0: P.T(x), y0: P.V(y) }) }] : []),
});
