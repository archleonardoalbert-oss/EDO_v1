// La línea de fase: la columna t = 0 del campo de (1 − y)y se resume en puntos (equilibrios) y flechas (signo de f).
// Al final, la comparación de la conferencia: línea de fase junto al campo y a las soluciones.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, solucion, lineaFase, rectaEquilibrio } from '../primitivas.js';
import { direccion } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 230, y: 40, w: 470, h: 370 }, { t: [-2, 3], y: [-0.8, 1.8] });
const h = (y) => (1 - y) * y, f = (t, y) => h(y);
const EQ = [{ y: 0, tipo: 'fuente' }, { y: 1, tipo: 'sumidero' }];
const X = 110;

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [3, 4],
  duracion: [2200, 1800, 1800, 1800, 2600],
  leyenda: { campo: 'la columna del campo', verde: 'sumidero', ambar: 'fuente', cian: 'partículas / soluciones' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    // la columna de marcas en t = 0, que se desplaza hasta la línea de fase y se convierte en flechas
    const xCol = mezclar(P.X(0), X, ease(q(0)));
    for (let i = 0; i <= 26; i++) {
      const y = -0.8 + (2.6 * i) / 26, [ux, uy] = direccion(P, h(y)), L = 11, a = 1 - ease(q(2)) * 0.85;
      g.linea([[xCol - ux * L, P.Y(y) - uy * L], [xCol + ux * L, P.Y(y) + uy * L]], { color: 'campo', ancho: 2, alfa: a });
    }
    g.tex('tit', X, 22, R`y`, { color: 'texto2', tam: 16 });
    if (paso >= 1) lineaFase(g, { f: h, eqs: EQ, coord: P.Y, desde: P.Y(-0.8), hasta: P.Y(1.8), otra: X, rango: [-0.8, 1.8], p: Math.min(q(1), 0.34 + 0.66 * q(2)) , tiempo: paso >= 3 ? tiempo : null, flechas: paso >= 2, clave: 'lf' });
    if (paso === 1) g.tex('eq', X + 30, P.Y(0.5), R`f(y) = 0:\ \text{puntos}`, { color: 'texto', tam: 14, ancla: 'l', fondo: true });
    if (paso === 2) g.tex('fl', X + 30, P.Y(0.5), R`f > 0 \uparrow,\quad f < 0 \downarrow`, { color: 'texto', tam: 14, ancla: 'l', fondo: true });
    if (paso >= 4) {
      ejes(g, P, { p: q(4), numeros: false });
      campo(g, P, f, { p: q(4), alfa: 0.4, nt: 17, ny: 13 });
      EQ.forEach((e) => rectaEquilibrio(g, P, e.y, { tipo: e.tipo, p: q(4) }));
      [-0.3, 0.05, 0.3, 0.7, 1.4, 1.75].forEach((y0, i) => solucion(g, P, f, -2, y0, { p: tramo(q(4), 0.3 + 0.06 * i, 0.8 + 0.03 * i), sentido: 'adelante', punto: false, ancho: 1.8 }));
      g.tex('cmp', 465, 22, R`\text{línea de fase} \;\leftrightarrow\; \text{campo y soluciones}`, { color: 'texto', tam: 15, alfa: ease(q(4)), fondo: true });
    }
  },
  pasos: 5,
});
