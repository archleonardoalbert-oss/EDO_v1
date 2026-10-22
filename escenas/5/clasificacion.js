// Sumidero, fuente y nodo: cada uno con su línea de fase (partículas que fluyen) y las soluciones cercanas en un
// plano pequeño; al final, los símbolos de la conferencia ↓•↑, ↑•↓, ↓•↓.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { lineaFase, solucion, rectaEquilibrio, simboloEquilibrio } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const TIPOS = [
  { nombre: 'sumidero', tit: R`\textbf{sumidero (estable)}`, h: (y) => -y, color: 'verde' },
  { nombre: 'fuente', tit: R`\textbf{fuente (inestable)}`, h: (y) => y, color: 'ambar' },
  { nombre: 'nodo', tit: R`\textbf{nodo}`, h: (y) => -y * y, color: 'violeta' },
];

export default definirEscena({
  alto: 460, preparar: () => ({}),
  vivo: true,
  duracion: [2000, 2000, 2000, 1600, 2000, 1400],
  leyenda: { verde: 'sumidero', ambar: 'fuente', violeta: 'nodo', cian: 'soluciones cercanas' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    TIPOS.forEach((T, i) => {
      if (paso < i) return;
      const a = q(i), x0 = 20 + 245 * i;
      panel(g, { x: x0, y: 20, w: 230, h: 380 }, T.tit, { p: a, clave: `p${i}` });
      const Q = plano({ x: x0 + 75, y: 60, w: 145, h: 250 }, { t: [0, 4], y: [-1.2, 1.2] });
      const Y = Q.Y;
      if (paso >= 4) simboloEquilibrio(g, x0 + 40, Y(0), T.nombre, { p: q(4) });
      else lineaFase(g, { f: T.h, eqs: [{ y: 0, tipo: T.nombre, rotulo: R`y_0` }], coord: Y, desde: Y(-1.2), hasta: Y(1.2), otra: x0 + 40, rango: [-1.2, 1.2], p: a, tiempo, clave: `lf${i}` });
      rectaEquilibrio(g, Q, 0, { tipo: T.nombre, p: a });
      [-0.9, -0.4, 0.4, 0.9].forEach((y0, j) => solucion(g, Q, (t, y) => T.h(y), 0, y0, { p: tramo(a, 0.2 + 0.1 * j, 0.7 + 0.08 * j), sentido: 'adelante', punto: false, ancho: 1.6 }));
      const txt = [R`\text{las cercanas tienden a } y_0`, R`\text{las cercanas se alejan}`, R`\text{se alejan por un lado, se acercan por el otro}`][i];
      g.tex(`d${i}`, x0 + 115, 345, txt, { color: T.color, tam: 12, alfa: ease(a) });
    });
    if (paso >= 3) formula(g, 'regla', 380, 432, paso >= 5 ? R`\text{«La dirección de las flechas en la línea de fase determina el tipo de equilibrio.»}` : R`\text{hacia el punto} \cdot\ \text{alejándose} \cdot\ \text{misma dirección a ambos lados}`, { p: q(3), tam: 14 });
  },
  pasos: 6,
});
