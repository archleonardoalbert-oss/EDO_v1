// Valientes · linealización: f decrece cerca de y0 (f' < 0), queda dentro del cono ±K(y − y0), y el tiempo para
// llegar a y0, ∫ du/|f|, diverge: la solución tiende a y0 sin alcanzarlo.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, solucionCache } from '../../motor/plano.js';
import { ejes, grafica, curva, punto, rectaEquilibrio } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 50, w: 320, h: 340 }, { t: [-1.2, 1.2], y: [-1.5, 1.5] });
const B = plano({ x: 440, y: 50, w: 290, h: 340 }, { t: [0, 8], y: [-0.2, 1] });
const f = (y) => -1.1 * y + 0.4 * y * y - 0.3 * Math.sin(2 * y) * y, K = 2.1, D = 0.9;

export default definirEscena({
  alto: 430, preparar: () => ({ s: solucionCache((t, y) => f(y), 0, 0.85, B).adelante }),
  duracion: [2200, 2200, 2800],
  leyenda: { texto: 'f cerca de y₀', violeta: 'cono ±K(y − y₀)', cian: 'la solución', verde: 'y₀ (sumidero)' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 25, y: 22, w: 370, h: 395 }, R`f(y)\ \text{cerca de } y_0 = 0`, { clave: 'pa' });
    ejes(g, A, { t: 'y', y: '', numeros: false, clave: 'ea' });
    g.rect(A.X(-D), A.caja.y, A.X(D) - A.X(-D), A.caja.h, { color: 'verde', alfa: 0.07 * ease(q(0)) });
    g.tex('del', A.X(D), A.caja.y + A.caja.h + 12, R`y_0 + \delta`, { color: 'verde', tam: 12, alfa: ease(q(0)) });
    grafica(g, A, f, { color: 'texto', brillo: 2 });
    punto(g, A.X(0), A.Y(0), { color: 'verde', r: 6, halo: true });
    g.tex('sg', A.X(-0.6), A.Y(1.2), R`f > 0 \;\;\; \cdots \;\;\; f < 0`, { color: 'texto', tam: 13, alfa: ease(q(0)), fondo: true });
    if (paso >= 1) {
      grafica(g, A, (y) => K * y, { color: 'violeta', brillo: 0, ancho: 1.4, guion: [5, 4], p: q(1) });
      grafica(g, A, (y) => -K * y, { color: 'violeta', brillo: 0, ancho: 1.4, guion: [5, 4], p: q(1) });
      formula(g, 'k', 210, 405, R`|f(y)| \le K|y - y_0|`, { p: q(1), tam: 14, color: 'violeta' });
    }
    if (paso >= 2) {
      panel(g, { x: 410, y: 22, w: 345, h: 395 }, R`y(t)`, { clave: 'pb', p: q(2) });
      ejes(g, B, { numeros: false, y: '', clave: 'eb', p: q(2) });
      rectaEquilibrio(g, B, 0, { color: 'verde', p: q(2) });
      curva(g, B, c.s.t, c.s.y, { p: q(2) });
      formula(g, 't', 580, 405, R`t = \int \dfrac{du}{|f(u)|} \ge \tfrac1K\ln\tfrac{y(0) - y_0}{y - y_0} \to \infty`, { p: q(2), tam: 13 });
    }
  },
  pasos: 3,
});
