// Valientes · monótona y acotada ⇒ tiende a un equilibrio: si f(L) > 0, la solución quedaría por encima de una recta
// de pendiente f(L)/2 y rompería la cota.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, solucion, curva, rectaEquilibrio, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 340 }, { t: [0, 8], y: [-0.2, 2.2] });
const f = (t, y) => y * (1.5 - y) * 0.9;

export default definirEscena({
  alto: 420, preparar: () => ({}),
  duracion: [2200, 2800, 2000],
  leyenda: { cian: 'la solución', verde: 'L (equilibrio)', rojo: 'lo que pasaría si f(L) > 0' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    g.linea([[P.caja.x, P.Y(2)], [P.caja.x + P.caja.w, P.Y(2)]], { color: 'texto2', ancho: 1, guion: [3, 5] });
    g.tex('cota', P.X(7.8), P.Y(2) - 12, R`\text{cota}`, { color: 'texto2', tam: 13, ancla: 'r' });
    solucion(g, P, f, 0, 0.15, { sentido: 'adelante', p: q(0) });
    g.linea([[P.caja.x, P.Y(1.5)], [P.caja.x + P.caja.w, P.Y(1.5)]], { color: 'verde', ancho: 1.4, guion: [6, 4], alfa: ease(q(0)) });
    g.tex('L', P.X(0.1), P.Y(1.5) - 12, R`L = \lim y(t)`, { color: 'verde', tam: 14, ancla: 'l', alfa: ease(q(0)), fondo: true });
    if (paso === 1) {
      const T = 2.5, yT = 1.05, m = 0.35;
      punto(g, P.X(T), P.Y(yT), { color: 'rojo', r: 5 });
      curva(g, P, [T, 8], [yT, yT + m * (8 - T)], { color: 'rojo', guion: [6, 5], brillo: 0, p });
      g.tex('ct', P.X(5.3), P.Y(2.1), R`f(L) > 0 \Rightarrow y(t) \ge y(T) + \tfrac{f(L)}{2}(t - T) \to \infty:\ \text{¡rompe la cota!}`, { color: 'rojo', tam: 13, alfa: ease(tramo(p, 0.5, 1)), fondo: true });
    }
    if (paso === 2) {
      rectaEquilibrio(g, P, 1.5, { color: 'verde', ancho: 3 });
      formula(g, 'fl', 380, 22, R`f(L) = 0:\ L \text{ es un equilibrio}`, { p, tam: 16, color: 'verde' });
    }
  },
  pasos: 3,
});
