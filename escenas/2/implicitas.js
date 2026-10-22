// dy/dt = y/(1 + y²): tras integrar queda ln|y| + y²/2 = t + C, que no se puede despejar. Pero se puede
// despejar t: cada curva de nivel t = ln|y| + y²/2 − C es la gráfica de una solución.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, curva, rectaEquilibrio, solucion } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-4, 4], y: [-3, 3] });
const f = (t, y) => y / (1 + y * y);
function nivel(C, signo) {
  const ts = [], ys = [];
  for (let i = 1; i <= 300; i++) { const y = signo * (0.003 + (3.2 * i) / 300); ts.push(Math.log(Math.abs(y)) + (y * y) / 2 - C); ys.push(y); }
  return [ts, ys];
}

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: 0, min: -3, max: 3, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [1600, 1800, 1600, 2600, 1800, 2200],
  leyenda: { campo: 'campo y/(1 + y²)', violeta: 'curvas de nivel ln|y| + y²/2 − t = C', cian: 'la solución elegida', ambar: 'y ≡ 0' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45 });
    formula(g, 's', 200, 28, R`\int \dfrac{1 + y^2}{y}\,dy = \int dt`, { p: q(0), tam: 16 });
    if (paso >= 1) formula(g, 'i', 560, 28, R`\ln|y| + \dfrac{y^2}{2} = t + C`, { p: q(1), tam: 17 });
    if (paso === 2) g.tex('no', P.X(1.5), P.Y(2.3), R`y = \;?\quad \text{no se puede despejar}`, { color: 'rojo', tam: 18, alfa: ease(p), fondo: true });
    if (paso >= 3) {
      for (let C = -4; C <= 4; C += 1) [1, -1].forEach((s) => { const [ts, ys] = nivel(C, s); curva(g, P, ts, ys, { color: 'violeta', alfa: 0.45, brillo: 0, ancho: 1.5, p: paso === 3 ? tramo(p, 0, 0.7) : 1 }); });
      [1, -1].forEach((s) => { const [ts, ys] = nivel(c.e.C, s); curva(g, P, ts, ys, { p: paso === 3 ? tramo(p, 0.4, 1) : 1 }); });
      rectaEquilibrio(g, P, 0, { color: 'ambar', p: q(3) });
      g.tex('eq', P.X(-3.9), P.Y(0) - 14, R`y = 0\ \text{(equilibrio)}`, { color: 'ambar', tam: 14, ancla: 'l', alfa: ease(q(3)), fondo: true });
      if (paso === 3) g.tex('imp', P.X(1.5), P.Y(2.4), R`\text{cada curva de nivel es una solución}`, { color: 'violeta', tam: 15, alfa: ease(tramo(p, 0.5, 1)), fondo: true });
    }
    if (paso >= 4) formula(g, 'obs', P.X(-2), P.Y(2.4), R`\int e^{y^2}\,dy = \;?\quad\text{(sin primitiva elemental)}`, { p: q(4), tam: 15, color: 'rojo' });
    if (paso === 5) {
      // la geometría sigue funcionando aunque fallen las fórmulas (la Conf 3 lo desarrolla)
      [-2.2, -1, -0.3, 0.3, 1, 2.2].forEach((y0, i) => solucion(g, P, f, -4, y0, { sentido: 'adelante', p: tramo(p, 0.06 * i, 0.7 + 0.06 * i), alfa: 0.8, ancho: 1.8, punto: false }));
      g.tex('geo', P.X(1.5), P.Y(-2.5), R`\text{no basta con fórmulas: \textbf{geometría} y \textbf{números}}`, { color: 'texto', tam: 15, alfa: ease(tramo(p, 0.5, 1)), fondo: true });
    }
  },
  pasos: 6,
});
