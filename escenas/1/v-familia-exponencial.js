// Valientes · familia exponencial: Q(t) = P(t)·e^{−kt} es una recta horizontal si P es solución de P' = kP,
// y se tuerce si no lo es.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 60, y: 58, w: 300, h: 312 }, { t: [-1, 3], y: [-1, 6] });
const B = plano({ x: 440, y: 58, w: 300, h: 312 }, { t: [-1, 3], y: [-1, 6] });

export default definirEscena({
  alto: 420,
  entradas: [
    { id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: 1.5, min: 0.3, max: 3, paso: 0.05 },
    { id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 0.5, min: -0.8, max: 0.9, paso: 0.05 },
  ],
  preparar: (e) => ({ e }),
  duracion: [1600, 1800, 2400, 2400],
  leyenda: { cian: 'P(t) solución', ciruela: 'e^{−kt}', verde: 'Q = P·e^{−kt}', ambar: 'algo que no es solución' },
  dibujar(g, c, { paso, p }) {
    const { C, k } = c.e, q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 30, y: 15, w: 350, h: 390 }, R`P(t)`, { clave: 'pa' });
    panel(g, { x: 410, y: 15, w: 350, h: 390 }, R`Q(t) = P(t)\,e^{-kt}`, { clave: 'pb', p: q(2) });
    ejes(g, A, { y: '', numeros: true, clave: 'ea' });
    grafica(g, A, (t) => C * Math.exp(k * t), { p: q(0) });
    punto(g, A.X(0), A.Y(C), { color: 'cian', alfa: ease(q(0)) });
    if (paso >= 1) {
      grafica(g, A, (t) => Math.exp(-k * t), { p: q(1), color: 'ciruela', guion: [6, 5], brillo: 0 });
      g.tex('ek', A.X(2.4), A.Y(Math.exp(-k * 2.4)) - 14, R`e^{-kt}`, { color: 'ciruela', tam: 15, alfa: ease(q(1)) });
    }
    if (paso >= 2) {
      ejes(g, B, { y: '', clave: 'eb', p: q(2) });
      grafica(g, B, () => C, { p: q(2), color: 'verde' });
      formula(g, 'qc', B.X(1), B.Y(C) - 22, R`Q(t) = C = ${C.toFixed(2)}`, { p: q(2), color: 'verde', tam: 17 });
      formula(g, 'qd', B.X(1), B.Y(5.2), R`Q'(t) = (P' - kP)e^{-kt} = 0`, { p: tramo(q(2), 0.4, 1), tam: 15 });
    }
    if (paso >= 3) {
      const mal = (t) => C * Math.exp(k * t) + 0.5 * Math.sin(2.5 * t);
      grafica(g, A, mal, { p: q(3), color: 'ambar', brillo: 0, ancho: 1.8 });
      grafica(g, B, (t) => mal(t) * Math.exp(-k * t), { p: q(3), color: 'ambar', brillo: 0, ancho: 1.8 });
      g.tex('nq', B.X(1), B.Y(-0.5), R`\text{no es solución} \Rightarrow Q' \ne 0`, { color: 'ambar', tam: 14, alfa: ease(q(3)) });
    }
  },
  pasos: 4,
  asas: (c) => [{ id: 'C', x: A.X(0), y: A.Y(c.e.C), color: 'cian', mover: (x, y) => ({ C: A.V(y) }) }],
});
