// CP4 ej. 3: y' = √y, y(0) = 1, con Δt = 1, 0.5, 0.25 en [0, 4]. Las tres quedan por debajo y crecen hacia la
// verdadera al reducir Δt: la solución real está por encima (y vale (t/2 + 1)², y(4) = 9).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, campo, grafica } from '../primitivas.js';
import { poligonoEuler, formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [0, 4.2], y: [0, 10] });
const f = (t, y) => Math.sqrt(y);
const DTS = [1, 0.5, 0.25], COL = ['rojo', 'ambar', 'violeta'];

export default definirEscena({
  alto: 450,
  preparar: () => ({ eus: DTS.map((dt) => euler(f, 0, 1, dt, Math.round(4 / dt))) }),
  duracion: [2400, 2000, 2400],
  leyenda: { rojo: 'Δt = 1', ambar: 'Δt = 0.5', violeta: 'Δt = 0.25', cian: 'solución verdadera' },
  capas: [
    (g, c, o) => {
      ejes(g, P);
      campo(g, P, f, { alfa: 0.35, nt: 17, ny: 15 });
      c.eus.forEach((eu, i) => poligonoEuler(g, P, eu, { p: tramo(o.p, 0.25 * i, 0.5 + 0.25 * i), color: COL[i], radio: 2.6 }));
      c.eus.forEach((eu, i) => g.tex(`v${i}`, P.X(4) + 8, P.Y(eu.y.at(-1)), R`${eu.y.at(-1).toFixed(2)}`, { color: COL[i], tam: 13, ancla: 'l', alfa: ease(tramo(o.p, 0.4 + 0.2 * i, 0.6 + 0.2 * i)), fondo: true }));
    },
    (g, c, o) => g.tex('cre', 300, 30, R`\text{al reducir } \Delta t \text{, los valores en } t = 4 \text{ suben: } 7.56,\ 8.23,\ 8.60,\ \dots`, { color: 'texto', tam: 14, alfa: ease(o.p), fondo: true }),
    (g, c, o) => {
      grafica(g, P, (t) => (t / 2 + 1) ** 2, { p: o.p });
      formula(g, 'ex', 300, 60, R`\text{predicción: la real está por encima; separando, } y = \left(\tfrac{t}{2} + 1\right)^2,\ y(4) = 9`, { p: o.p, tam: 14, color: 'cian' });
    },
  ],
});
