// 1 ± √(1 − µ): la parábola f_µ sube con µ; dos cortes si µ < 1, tangente en µ = 1, ninguno si µ > 1 (figuras 1.81
// y 1.82: µ un poco menor, igual y un poco mayor que 1).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, lineaFase, equilibrios, punto } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 60, w: 380, h: 320 }, { t: [-0.8, 2.8], y: [-1, 2.2] });
const f = (mu) => (y) => y * y - 2 * y + mu;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'mu', tipo: 'deslizador', etiqueta: R`\mu`, valor: 0.6, min: -1, max: 2, paso: 0.01 }],
  preparar: (e) => ({ e }),
  vivo: [4],
  duracion: [1800, 1600, 1600, 1600, 2600],
  leyenda: { texto: 'f_µ(y)', verde: 'sumidero', ambar: 'fuente', violeta: 'nodo (µ = 1)' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const mu = paso === 1 ? 0.6 : paso === 2 ? 1 : paso === 3 ? 1.4 : paso === 4 ? mezclar(0.6, 1.4, (1 - Math.cos(tiempo / 1500)) / 2) : c.e.mu;
    panel(g, { x: 25, y: 25, w: 430, h: 400 }, R`f_\mu(y) = y^2 - 2y + \mu`, { clave: 'pa' });
    ejes(g, A, { t: 'y', y: '', numeros: false, clave: 'ea' });
    [0.85, 1, 1.15].forEach((m) => grafica(g, A, f(m), { color: 'texto2', guion: [4, 4], brillo: 0, ancho: 1.2, alfa: 0.4 * ease(q(4)) }));
    grafica(g, A, f(mu), { color: 'texto', brillo: 3 });
    const eqs = equilibrios(f(mu), -0.8, 2.8);
    eqs.forEach((e) => punto(g, A.X(e.y), A.Y(0), { color: { sumidero: 'verde', fuente: 'ambar', nodo: 'violeta' }[e.tipo], r: 6, halo: true }));
    formula(g, 'r', 240, 400, R`y = 1 \pm \sqrt{1 - \mu},\quad \mu = ${mu.toFixed(2)}`, { p: q(0), tam: 15 });
    const casos = [[1, R`\mu < 1:\ \text{dos raíces reales}`, 'texto'], [2, R`\mu = 1:\ \text{una raíz doble}`, 'violeta'], [3, R`\mu > 1:\ \text{ninguna raíz real}`, 'rojo']];
    casos.forEach(([d, tx, col], i) => { if (paso >= d) g.tex(`c${i}`, 600, 80 + 34 * i, tx, { color: col, tam: 15, alfa: ease(q(d)) }); });
    if (paso >= 4) {
      [[0.8, R`\mu < 1`], [1, R`\mu = 1`], [1.2, R`\mu > 1`]].forEach(([m, tx], i) => {
        const Y = (y) => 410 - ((y + 0.8) / 3.6) * 180, x = 520 + 80 * i;
        lineaFase(g, { f: f(m), eqs: equilibrios(f(m), -0.8, 2.8), coord: Y, desde: Y(-0.8), hasta: Y(2.8), otra: x, rango: [-0.8, 2.8], p: q(4), particulas: false, rotular: false, clave: `lf${i}` });
        g.tex(`lm${i}`, x, 430, tx, { color: 'ciruela', tam: 13, alfa: ease(q(4)) });
      });
      g.tex('val', 600, 200, R`\textbf{valor de bifurcación: } \mu = 1`, { color: 'ciruela', tam: 15, alfa: ease(q(4)), fondo: true });
    }
  },
  pasos: 5,
});
