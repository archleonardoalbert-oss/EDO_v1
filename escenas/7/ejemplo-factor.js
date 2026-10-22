// y' + (2/t) y = t − 1 (t > 0): μ = t²; (t²y)' = t³ − t²; y = t²/4 − t/3 + C/t² (particular + homogénea).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, campo } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 50, w: 620, h: 350 }, { t: [0.05, 3], y: [-2, 3] });

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: 0.4, min: -1.5, max: 1.5, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [2000, 2000, 2200, 2400],
  leyenda: { ciruela: 'μ = t²', violeta: 'y_h = C/t²', cian: 'y_p = t²/4 − t/3', verde: 'y = y_p + y_h' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), C = c.e.C;
    ejes(g, P);
    campo(g, P, (t, y) => t - 1 - (2 / t) * y, { alfa: 0.3, nt: 19, ny: 15 });
    formula(g, 'mu', 380, 24, R`\mu = e^{\int \frac2t dt} = e^{2\ln t} = t^2\quad (t > 0)`, { p: q(0), tam: 15 });
    grafica(g, P, (t) => t * t / 3, { color: 'ciruela', p: q(0), alfa: 0.7, brillo: 0 });
    if (paso >= 1) formula(g, 'pr', 380, 54, R`\dfrac{d}{dt}[t^2y] = t^3 - t^2`, { p: q(1), tam: 15 });
    if (paso >= 2) {
      formula(g, 'int', 380, 430, R`t^2y = \tfrac{t^4}{4} - \tfrac{t^3}{3} + C \;\Rightarrow\; y = \tfrac{t^2}{4} - \tfrac t3 + \tfrac{C}{t^2}`, { p: q(2), tam: 15 });
      [-1, -0.4, 0.4, 1].forEach((k) => grafica(g, P, (t) => t * t / 4 - t / 3 + k / (t * t), { color: 'verde', alfa: 0.4, brillo: 0, ancho: 1.4, p: q(2) }));
      grafica(g, P, (t) => t * t / 4 - t / 3 + C / (t * t), { color: 'verde', p: q(2) });
    }
    if (paso >= 3) {
      grafica(g, P, (t) => t * t / 4 - t / 3, { p, ancho: 2.8 });
      grafica(g, P, (t) => C / (t * t), { color: 'violeta', p, guion: [5, 4] });
      g.tex('desc', P.X(2.2), P.Y(2.6), R`y_p + y_h:\ \text{linealidad extendida}`, { color: 'texto', tam: 14, alfa: ease(p), fondo: true });
    }
  },
  pasos: 4,
});
