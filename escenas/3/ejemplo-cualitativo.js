// dy/dt = e^{y²/10} sin² y: sin fórmula, pero el campo lo dice todo. f ≥ 0: nadie baja; los múltiplos de π son
// equilibrios (nodos); cada solución sube de nπ a (n + 1)π. Línea de fase con partículas a la izquierda.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, rectaEquilibrio, lineaFase } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 110, y: 40, w: 590, h: 370 }, { t: [-6, 6], y: [-1.5, 7.5] });
const h = (y) => Math.exp((y * y) / 10) * Math.sin(y) ** 2;
const f = (t, y) => h(y);
const EQ = [0, Math.PI, 2 * Math.PI].map((y) => ({ y, tipo: 'nodo', rotulo: y === 0 ? '0' : y < 4 ? R`\pi` : R`2\pi` }));

export default definirEscena({
  alto: 450,
  preparar: () => ({}),
  vivo: [1],
  duracion: [2400, 3000],
  leyenda: { campo: 'campo', violeta: 'y = nπ: equilibrios (nodos)', cian: 'soluciones: siempre suben' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P, { marcasY: [0, 2, 4, 6] });
    campo(g, P, f, { alfa: 0.6, nt: 25, ny: 19, p: q(0) });
    formula(g, 'ne', 400, 22, R`\int \dfrac{dy}{e^{y^2/10}\sin^2 y} \;\text{no es elemental}`, { p: q(0), tam: 15, color: 'rojo' });
    EQ.forEach((e) => rectaEquilibrio(g, P, e.y, { color: 'violeta', p: q(0) }));
    if (paso === 1) {
      lineaFase(g, { f: h, eqs: EQ, coord: P.Y, desde: P.Y(-1.5), hasta: P.Y(7.5), otra: 60, rango: [-1.5, 7.5], p, tiempo, clave: 'lf' });
      [-1.2, -0.5, 0.6, 1.6, 2.6, 3.6, 4.7, 5.7, 7].forEach((y0, i) => solucion(g, P, f, 0, y0, { p: tramo(p, 0.06 * i, 0.6 + 0.04 * i), punto: false, ancho: 2 }));
      g.tex('mono', 400, 435, R`f \ge 0:\ \text{ninguna baja; suben de } n\pi \text{ a } (n+1)\pi \text{ (no oscilan)}`, { color: 'cian', tam: 14, alfa: ease(tramo(p, 0.6, 1)), fondo: true });
    }
  },
  pasos: 2,
});
