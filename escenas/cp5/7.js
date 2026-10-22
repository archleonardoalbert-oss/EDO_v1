// CP5 ej. 7: 1/((y − 2)(y + 1)) no tiene equilibrios; y(0) = 1/2 baja hacia −1 y llega en t = 9/4 con tangente
// vertical (allí f no está definida); hacia atrás llega a 2 en t = −9/4. Dominio (−9/4, 9/4).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, lineaFase, curva, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 150, y: 40, w: 560, h: 370 }, { t: [-3, 3], y: [-2, 3] });
const h = (y) => 1 / ((y - 2) * (y + 1)), G = (y) => y ** 3 / 3 - (y * y) / 2 - 2 * y;
// t(y) = G(y) + 13/12 es decreciente en (−1, 2): la solución es su inversa
const rama = () => { const ts = [], ys = []; for (let i = 1; i < 400; i++) { const y = 2 - (3 * i) / 400; ts.push(G(y) + 13 / 12); ys.push(y); } return [ts, ys]; };

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [0],
  duracion: [2200, 2400, 2600],
  leyenda: { rojo: 'f no definida (y = −1, y = 2)', cian: 'la solución con y(0) = 1/2' },
  capas: [
    (g, c, o) => {
      lineaFase(g, { f: h, eqs: [{ y: -1, tipo: 'hueco', rotulo: '-1' }, { y: 2, tipo: 'hueco', rotulo: '2' }], coord: P.Y, desde: P.Y(-2), hasta: P.Y(3), otra: 70, rango: [-2, 3], p: o.p, tiempo: o.tiempo, clave: 'lf' });
      ejes(g, P, { numeros: false });
      campo(g, P, (t, y) => h(y), { alfa: 0.4, p: o.p });
      [-1, 2].forEach((y) => g.linea([[P.caja.x, P.Y(y)], [P.caja.x + P.caja.w, P.Y(y)]], { color: 'rojo', ancho: 1.4, guion: [4, 5], alfa: ease(o.p) }));
      punto(g, P.X(0), P.Y(0.5), { color: 'ciruela', r: 6, halo: true });
    },
    (g, c, o) => {
      const [ts, ys] = rama();
      const k = ts.findIndex((t) => t >= 0);
      curva(g, P, ts.slice(k), ys.slice(k), { p: o.p });
      g.tex('baja', P.X(1.3), P.Y(0.9), R`\text{baja hacia } -1`, { color: 'cian', tam: 14, alfa: ease(o.p), fondo: true });
    },
    (g, c, o) => {
      const [ts, ys] = rama();
      curva(g, P, ts, ys, {});
      formula(g, 'an', 430, 22, R`\tfrac{y^3}{3} - \tfrac{y^2}{2} - 2y = t - \tfrac{13}{12};\quad y = -1 \text{ en } t = \tfrac94,\ \ y = 2 \text{ en } t = -\tfrac94`, { p: o.p, tam: 14 });
      [[9 / 4, -1], [-9 / 4, 2]].forEach(([t, y]) => punto(g, P.X(t), P.Y(y), { color: 'rojo', r: 5, alfa: ease(o.p) }));
    },
  ],
});
