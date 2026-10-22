// CP4 ej. 4: y' = y(y − 1)(y − 3), y(0) = 4. Hipótesis cumplidas en todo el plano ⇒ solución única; y ≡ 3 es
// solución, así que la nuestra se queda por encima de 3.
import { definirEscena } from '../comun.js';
import { plano, ease } from '../../motor/plano.js';
import { ejes, campo, solucion, rectaEquilibrio, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-3, 1], y: [-1, 5] });
const f = (t, y) => y * (y - 1) * (y - 3);

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [2000, 2000, 2400],
  leyenda: { campo: 'campo', verde: 'y ≡ 1 (sumidero)', ambar: 'y ≡ 0, y ≡ 3 (fuentes)', cian: 'la solución con y(0) = 4' },
  capas: [
    (g, c, o) => { ejes(g, P); campo(g, P, f, { p: o.p, alfa: 0.4, ny: 19 }); formula(g, 'h', 370, 22, R`f = y(y-1)(y-3),\ \ \tfrac{\partial f}{\partial y} = 3y^2 - 8y + 3:\ \text{continuas en todo el plano}`, { p: o.p, tam: 14 }); },
    (g, c, o) => { rectaEquilibrio(g, P, 0, { tipo: 'fuente', p: o.p }); rectaEquilibrio(g, P, 1, { tipo: 'sumidero', p: o.p }); rectaEquilibrio(g, P, 3, { tipo: 'fuente', p: o.p }); g.tex('e3', P.X(-2.9), P.Y(3) - 14, R`y \equiv 3`, { color: 'ambar', tam: 14, ancla: 'l', alfa: ease(o.p), fondo: true }); },
    (g, c, o) => {
      solucion(g, P, f, 0, 4, { p: o.p });
      punto(g, P.X(0), P.Y(4), { color: 'ciruela', r: 6, halo: true });
      g.tex('c', P.X(-1.5), P.Y(4.6), R`\text{única; } y(t) > 3 \text{ siempre; } \to 3 \text{ hacia atrás; sube (y explota) hacia adelante}`, { color: 'cian', tam: 13, alfa: ease(o.p), fondo: true });
    },
  ],
});
