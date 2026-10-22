// CP5 ej. 6: f(y0) = f'(y0) = f''(y0) = 0, f'''(y0) > 0 ⇒ cerca de y0, f(y) = f'''(ξ)/6·(y − y0)³: mismo signo que
// (y − y0)³: negativo debajo, positivo encima: fuente.
import { definirEscena } from '../comun.js';
import { plano, ease } from '../../motor/plano.js';
import { ejes, grafica, lineaFase } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 60, y: 60, w: 640, h: 260 }, { t: [-1.5, 1.5], y: [-1.5, 1.5] });
const f = (y) => 0.5 * y ** 3 + 0.3 * y ** 4;

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [2200, 2400],
  leyenda: { texto: 'f cerca de y₀', violeta: 'tangente horizontal', ambar: 'fuente' },
  capas: [
    (g, c, o) => {
      ejes(g, P, { t: R`y - y_0`, y: 'f', numeros: false });
      grafica(g, P, f, { color: 'texto', brillo: 2, p: o.p });
      g.linea([[P.X(-0.7), P.Y(0)], [P.X(0.7), P.Y(0)]], { color: 'violeta', ancho: 3, alfa: 0.7 * ease(o.p) });
      formula(g, 't', 380, 26, R`f(y) = \dfrac{f'''(\xi)}{6}(y - y_0)^3\ \ (\text{Taylor}),\ \ f'''(\xi) > 0 \text{ cerca de } y_0`, { p: o.p, tam: 14 });
    },
    (g, c, o) => {
      lineaFase(g, { f, eqs: [{ y: 0, tipo: 'fuente', rotulo: R`y_0` }], coord: P.X, desde: P.X(-1.5), hasta: P.X(1.5), otra: 380, rango: [-1.5, 1.5], orientacion: 'horizontal', p: o.p, particulas: false, clave: 'lf' });
      g.tex('r', 380, 420, R`- \text{ debajo},\ + \text{ encima} \Rightarrow \textbf{fuente}`, { color: 'ambar', tam: 15, alfa: ease(o.p), fondo: true });
    },
  ],
});
