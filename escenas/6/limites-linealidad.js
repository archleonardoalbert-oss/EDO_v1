// y' = y²: y1 = 1/(1 − t) es tangente al campo; y2 = 2y1 no lo es (en cada punto su pendiente es la mitad de la que
// manda el campo).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, curva, punto } from '../primitivas.js';
import { formula, tangente, direccion } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 50, w: 620, h: 340 }, { t: [-3, 0.95], y: [0, 6] });
const rama = (c) => { const ts = [], ys = []; for (let i = 0; i <= 300; i++) { const t = -3 + (3.9 * i) / 300; ts.push(t); ys.push(c / (1 - t)); } return [ts, ys]; };

export default definirEscena({
  alto: 440, preparar: () => ({}),
  duracion: [1800, 2200, 2400],
  leyenda: { campo: 'campo y²', cian: 'y₁ = 1/(1 − t)', rojo: 'y₂ = 2y₁', ambar: 'tangente de y₂', texto: 'marca del campo' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, (t, y) => y * y, { alfa: 0.4, ny: 17 });
    formula(g, 'ad', 380, 22, R`\text{solo para lineales homogéneas: no para } \dfrac{dy}{dt} = y^2`, { p: q(0), tam: 14 });
    if (paso >= 1) { const [ts, ys] = rama(1); curva(g, P, ts, ys, { p: q(1) }); g.tex('y1', P.X(-2.5), P.Y(0.3) - 16, R`y_1 = \tfrac{1}{1 - t}:\ y_1' = y_1^2\ \checkmark`, { color: 'cian', tam: 14, ancla: 'l', alfa: ease(q(1)), fondo: true }); }
    if (paso >= 2) {
      const [ts, ys] = rama(2); curva(g, P, ts, ys, { p, color: 'rojo' });
      const t0 = -0.5, y = 2 / (1 - t0), m = 2 / (1 - t0) ** 2;
      tangente(g, P, t0, y, m, { largo: 120, color: 'ambar', alfa: ease(p) });
      const [ux, uy] = direccion(P, y * y);
      g.linea([[P.X(t0) - ux * 40, P.Y(y) - uy * 40], [P.X(t0) + ux * 40, P.Y(y) + uy * 40]], { color: 'texto', ancho: 4, alfa: 0.6 * ease(p) });
      punto(g, P.X(t0), P.Y(y), { color: 'rojo' });
      g.tex('y2', P.X(-2.5), P.Y(5), R`y_2' = \tfrac{2}{(1 - t)^2} \ne \tfrac{4}{(1 - t)^2} = y_2^2\ \times`, { color: 'rojo', tam: 14, ancla: 'l', alfa: ease(p), fondo: true });
    }
  },
  pasos: 3,
});
