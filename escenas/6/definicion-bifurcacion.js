// En la bifurcación, la gráfica de f_µ es tangente al eje: f = 0 (equilibrio) y ∂f/∂y = 0 (tangencia) a la vez.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { formula, tangente } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 70, y: 60, w: 600, h: 300 }, { t: [-1, 3], y: [-1, 2.5] });
const f = (mu) => (y) => y * y - 2 * y + mu;

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [0],
  duracion: [2000, 2000, 2200, 2400],
  leyenda: { texto: 'f_µ', violeta: 'tangencia al eje', ciruela: 'µ = 1' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const mu = paso === 0 ? mezclar(0.3, 1.7, (1 - Math.cos(tiempo / 1500)) / 2) : mezclar(0.3, 1, ease(q(1)));
    ejes(g, A, { t: 'y', y: R`f_\mu`, numeros: false });
    grafica(g, A, f(mu), { color: 'texto', brillo: 3 });
    if (paso === 0) g.tex('cc', 370, 26, R`\text{cambio cualitativo al cruzar un valor crítico } (\mu = ${mu.toFixed(2)})`, { color: 'texto', tam: 14, fondo: true });
    if (paso >= 1) {
      g.tex('tg', 370, 26, R`\text{en la bifurcación la gráfica \textbf{toca} el eje: } f_\mu = 0 \text{ y } f_\mu' = 0`, { color: 'violeta', tam: 14, alfa: ease(q(1)), fondo: true });
      if (q(1) > 0.95) { tangente(g, A, 1, 0, 0, { largo: 200, color: 'violeta' }); punto(g, A.X(1), A.Y(0), { color: 'violeta', r: 7, halo: true }); }
    }
    if (paso >= 2) formula(g, 'sis', 200, 400, R`\begin{cases} y^2 - 2y + \mu = 0\\ 2y - 2 = 0\end{cases}`, { p: q(2), tam: 16 });
    if (paso >= 3) formula(g, 'res', 520, 400, R`y = 1 \Rightarrow 1 - 2 + \mu = 0 \Rightarrow \mu = 1`, { p: q(3), tam: 16, color: 'ciruela' });
  },
  pasos: 4,
});
