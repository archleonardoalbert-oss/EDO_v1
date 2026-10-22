// Error de Euler ∝ Δt: tres aproximaciones (Δt = 0.2, 0.1, 0.05) de y' = 2y − 1 y, a la derecha, el error en t = 1
// contra Δt: los puntos caen sobre una recta por el origen.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler, rk4 } from '../../motor/numerico.js';
import { ejes, grafica, punto, curva } from '../primitivas.js';
import { poligonoEuler, formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 50, w: 320, h: 350 }, { t: [0, 1.05], y: [0.8, 4.4] });
const B = plano({ x: 450, y: 50, w: 270, h: 350 }, { t: [0, 0.22], y: [0, 1.6] });
const f = (t, y) => 2 * y - 1, exacta = (Math.exp(2) + 1) / 2;
const DTS = [0.2, 0.1, 0.05, 0.025];
const COL = ['rojo', 'ambar', 'violeta', 'verde'];

export default definirEscena({
  alto: 450,
  preparar: () => ({ eus: DTS.map((dt) => euler(f, 0, 1, dt, Math.round(1 / dt))) }),
  duracion: [2600, 2600, 1600],
  leyenda: { cian: 'exacta', rojo: 'Δt = 0.2', ambar: 'Δt = 0.1', violeta: 'Δt = 0.05', verde: 'Δt = 0.025' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 25, y: 22, w: 360, h: 410 }, R`y(t)`, { clave: 'pa' });
    ejes(g, A, { y: '', numeros: false, clave: 'ea' });
    grafica(g, A, (t) => (Math.exp(2 * t) + 1) / 2, {});
    c.eus.forEach((eu, i) => poligonoEuler(g, A, eu, { p: tramo(q(0), 0.2 * i, 0.4 + 0.2 * i), color: COL[i], radio: 2.2, ancho: 1.6 }));
    if (paso >= 1) {
      panel(g, { x: 400, y: 22, w: 345, h: 410 }, R`\text{error en } t = 1 \text{ contra } \Delta t`, { clave: 'pb', p: q(1) });
      ejes(g, B, { t: R`\Delta t`, y: R`e`, clave: 'eb', p: q(1), marcasT: [0.05, 0.1, 0.15, 0.2] });
      const errs = c.eus.map((eu) => exacta - eu.y.at(-1));
      DTS.forEach((dt, i) => {
        const a = ease(tramo(q(1), 0.15 * i, 0.4 + 0.15 * i));
        punto(g, B.X(dt), B.Y(errs[i]), { color: COL[i], r: 5, alfa: a });
        g.tex(`e${i}`, B.X(dt) + 8, B.Y(errs[i]) - 12, R`${errs[i].toFixed(3)}`, { color: COL[i], tam: 12, ancla: 'l', alfa: a, fondo: true });
      });
      // recta por el origen con la pendiente del paso más fino: e ≈ C·Δt
      const C = errs[3] / DTS[3];
      curva(g, B, [0, 0.22], [0, C * 0.22], { color: 'texto2', guion: [6, 5], brillo: 0, ancho: 1.4, p: tramo(q(1), 0.6, 1) });
      g.tex('cdt', B.X(0.07), B.Y(1.4), R`e_n \approx C\cdot\Delta t,\ \ C \approx ${C.toFixed(1)}`, { color: 'texto', tam: 15, alfa: ease(tramo(q(1), 0.7, 1)), fondo: true });
    }
    if (paso === 2) {
      const r = rk4(f, 0, 1, 1, { h: 0.1 });
      formula(g, 'rk', 572, 445 - 20, R`\text{Runge-Kutta (próximamente): error } \approx ${(exacta - r.y.at(-1)).toExponential(1)}`, { p, tam: 13, color: 'verde' });
    }
  },
  pasos: 3,
});
