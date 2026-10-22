// f'(y0) = 0: y³ (fuente, de la conferencia) y, añadidos, −y³ (sumidero) e y² (nodo). Las tres tienen tangente
// horizontal en 0; solo el signo de f decide.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, lineaFase } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const CASOS = [
  { h: (y) => y ** 3, tx: R`f(y) = y^3`, tipo: 'fuente', res: R`\Rightarrow\ \textbf{fuente}` },
  { h: (y) => -(y ** 3), tx: R`f(y) = -y^3`, tipo: 'sumidero', res: R`\Rightarrow\ \textbf{sumidero}` },
  { h: (y) => y * y, tx: R`f(y) = y^2`, tipo: 'nodo', res: R`\Rightarrow\ \textbf{nodo}` },
];

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [1800, 1800, 2000, 2600],
  leyenda: { texto: 'gráfica de f', ambar: 'fuente', verde: 'sumidero', violeta: 'nodo' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    CASOS.forEach((C, i) => {
      if (i > 0 && paso < 3) return;
      const ancho = paso >= 3 ? 230 : 700, x0 = paso >= 3 ? 20 + 245 * i : 30;
      const Q = plano({ x: x0 + 15, y: 70, w: ancho - 30, h: 200 }, { t: [-1.3, 1.3], y: [-1.5, 1.5] });
      const a = i === 0 ? 1 : q(3);
      panel(g, { x: x0, y: 20, w: ancho, h: 400 }, C.tx, { p: a, clave: `p${i}` });
      ejes(g, Q, { t: 'y', y: '', numeros: false, clave: `e${i}`, p: a, rejilla: false });
      grafica(g, Q, C.h, { color: 'texto', brillo: 2, ancho: 2, p: i === 0 ? q(0) : a });
      g.linea([[Q.X(-0.6), Q.Y(0)], [Q.X(0.6), Q.Y(0)]], { color: 'violeta', ancho: 3, alfa: ease(i === 0 ? q(1) : a) * 0.8 });
      if (i === 0 && paso >= 1) g.tex('d0', Q.X(0), Q.Y(-1.2), R`f'(0) = 0:\ \text{no decide}`, { color: 'violeta', tam: 14, alfa: ease(q(1)), fondo: true });
      const muestra = i === 0 ? q(2) : a;
      lineaFase(g, { f: C.h, eqs: [{ y: 0, tipo: C.tipo }], coord: Q.X, desde: Q.X(-1.3), hasta: Q.X(1.3), otra: 330, rango: [-1.3, 1.3], orientacion: 'horizontal', p: muestra, particulas: false, rotular: false, clave: `lf${i}` });
      if (muestra > 0) g.tex(`r${i}`, x0 + ancho / 2, 380, C.res, { color: { fuente: 'ambar', sumidero: 'verde', nodo: 'violeta' }[C.tipo], tam: 15, alfa: ease(muestra) });
    });
    if (paso === 2) formula(g, 'sg', 380, 300, R`y^3 > 0 \text{ si } y > 0,\quad y^3 < 0 \text{ si } y < 0`, { p, tam: 15 });
  },
  pasos: 4,
});
