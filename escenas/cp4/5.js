// CP4 ej. 5: t² y t² + 1 son soluciones; por unicidad, una solución con 0 < y(0) < 1 queda atrapada entre ellas.
import { definirEscena } from '../comun.js';
import { plano, ease } from '../../motor/plano.js';
import { ejes, campo, grafica, solucion, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-2.2, 2.2], y: [-0.5, 5.5] });
const f = (t, y) => -y * y + y + 2 * y * t * t + 2 * t - t * t - t ** 4;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'y0', tipo: 'deslizador', etiqueta: 'y(0)', valor: 0.5, min: 0.05, max: 0.95, paso: 0.01 }],
  preparar: (e) => ({ e }),
  duracion: [2000, 2400],
  leyenda: { campo: 'campo', verde: 'y₁ = t²', violeta: 'y₂ = t² + 1', cian: 'solución con 0 < y(0) < 1' },
  capas: [
    (g, c, o) => {
      ejes(g, P); campo(g, P, f, { alfa: 0.35, ny: 19 });
      grafica(g, P, (t) => t * t, { color: 'verde', p: o.p }); grafica(g, P, (t) => t * t + 1, { color: 'violeta', p: o.p });
      formula(g, 'v', 370, 22, R`y_1 = t^2:\ y_1' = 2t = -t^4 + t^2 + 2t^4 + 2t - t^2 - t^4\ \checkmark`, { p: o.p, tam: 14 });
    },
    (g, c, o) => {
      solucion(g, P, f, 0, c.e.y0, { p: o.p });
      punto(g, P.X(0), P.Y(c.e.y0), { color: 'cian', halo: true });
      g.tex('s', 370, 46, R`\text{por unicidad no puede tocar a ninguna: } t^2 < y(t) < t^2 + 1`, { color: 'cian', tam: 14, alfa: ease(o.p), fondo: true });
    },
  ],
  asas: (c, paso) => (paso >= 1 ? [{ id: 'y0', x: P.X(0), y: P.Y(c.e.y0), color: 'cian', mover: (x, y) => ({ y0: P.V(y) }) }] : []),
});
