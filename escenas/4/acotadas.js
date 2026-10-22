// Soluciones acotadas por equilibrios: y ≡ 2 es solución de y' = (y² − 4)(sin² y³ + cos y − 2)/2; por unicidad,
// la solución con y(0) = 1/2 nunca la toca: y(t) < 2 sin resolver nada.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, rectaEquilibrio, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-3, 4], y: [-3, 3] });
const f = (t, y) => ((y * y - 4) * (Math.sin(y ** 3) ** 2 + Math.cos(y) - 2)) / 2;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'y0', tipo: 'deslizador', etiqueta: 'y(0)', valor: 0.5, min: -2.9, max: 2.9, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [1800, 1800, 2400, 1800, 1600],
  leyenda: { campo: 'campo', verde: 'y ≡ 2', violeta: 'y ≡ −2', cian: 'solución con y(0) = 1/2' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45, ny: 19 });
    formula(g, 'pvi', 370, 22, R`\dfrac{dy}{dt} = \dfrac{(y^2 - 4)(\sin^2 y^3 + \cos y - 2)}{2},\quad y(0) = \tfrac12`, { p: q(0), tam: 14 });
    if (paso >= 1) {
      rectaEquilibrio(g, P, 2, { color: 'verde', p: q(1), ancho: 3 });
      rectaEquilibrio(g, P, -2, { color: 'violeta', p: q(1), ancho: 2 });
      g.tex('e2', P.X(-2.9), P.Y(2) - 14, R`y \equiv 2:\ y^2 - 4 = 0 \Rightarrow \tfrac{dy}{dt} = 0`, { color: 'verde', tam: 14, ancla: 'l', alfa: ease(q(1)), fondo: true });
    }
    if (paso >= 2) {
      solucion(g, P, f, 0, c.e.y0, { p: q(2) });
      punto(g, P.X(0), P.Y(c.e.y0), { color: 'cian', halo: true });
      if (paso === 2) g.tex('nt', P.X(1.5), P.Y(2.5), R`\text{por unicidad: nunca toca } y = 2`, { color: 'verde', tam: 14, alfa: ease(tramo(p, 0.6, 1)), fondo: true });
    }
    if (paso >= 3) g.tex('cota', P.X(1.5), P.Y(2.5), R`y(t) < 2 \text{ para todo } t \text{ del dominio}`, { color: 'verde', tam: 15, alfa: ease(q(3)), fondo: true });
    if (paso === 4) g.tex('pod', P.X(0.5), P.Y(-2.6), R`\text{sin resolver la ecuación: ¡el teorema de unicidad es muy poderoso!}`, { color: 'texto', tam: 14, alfa: ease(p), fondo: true });
  },
  pasos: 5,
  asas: (c, paso) => (paso >= 2 ? [{ id: 'y0', x: P.X(0), y: P.Y(c.e.y0), color: 'cian', mover: (x, y) => ({ y0: P.V(y) }) }] : []),
});
