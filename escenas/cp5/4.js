// CP5 ej. 4: f(−10) > 0, f(10) < 0 ⇒ hay un equilibrio (Bolzano); si además 1 es fuente, hay al menos dos
// sumideros: uno a cada lado de 1. Un ejemplo con f continua y la línea de fase acostada.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, lineaFase, equilibrios, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 60, y: 60, w: 640, h: 260 }, { t: [-11, 11], y: [-3, 3] });
const f = (y) => -0.0011 * (y + 6) * (y - 1) * (y - 5) * (1 + 0.02 * y * y);

export default definirEscena({
  alto: 450, preparar: () => ({ eqs: equilibrios(f, -10, 10) }),
  duracion: [2200, 2400, 2400],
  leyenda: { texto: 'una f posible', verde: 'sumideros', ambar: 'la fuente y = 1' },
  capas: [
    (g, c, o) => {
      ejes(g, P, { t: 'y', y: 'f(y)', marcasT: [-10, -5, 0, 1, 5, 10] });
      punto(g, P.X(-10), P.Y(f(-10)), { color: 'cian', r: 6, alfa: ease(o.p) });
      punto(g, P.X(10), P.Y(f(10)), { color: 'rojo', r: 6, alfa: ease(o.p) });
      formula(g, 'b', 380, 26, R`f(-10) > 0,\ f(10) < 0 \text{ y continua} \Rightarrow \exists\, y_0 \in (-10, 10):\ f(y_0) = 0\ \text{(Bolzano)}`, { p: o.p, tam: 14 });
    },
    (g, c, o) => {
      grafica(g, P, f, { color: 'texto', brillo: 2, p: o.p });
      punto(g, P.X(1), P.Y(0), { color: 'ambar', r: 7, halo: true, alfa: ease(o.p) });
      g.tex('fu', P.X(1), P.Y(0) + 22, R`1:\ \text{fuente } (- \mid +)`, { color: 'ambar', tam: 13, alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => {
      lineaFase(g, { f, eqs: c.eqs, coord: P.X, desde: P.X(-10), hasta: P.X(10), otra: 380, rango: [-10, 10], orientacion: 'horizontal', p: o.p, particulas: false, clave: 'lf' });
      g.tex('dos', 380, 425, R`\text{entre } -10 \text{ y } 1 \text{ el signo pasa de } + \text{ a } -\text{; entre } 1 \text{ y } 10 \text{, de } + \text{ a } -\text{: un sumidero en cada lado}`, { color: 'verde', tam: 13, alfa: ease(o.p), fondo: true });
    },
  ],
});
