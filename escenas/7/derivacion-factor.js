// Derivación del factor integrante con un ejemplo vivo (g = 0.8, b = sin 2t + 1): μ' = gμ ⇒ μ = e^{∫g}; luego
// (μy)' = μb: la gráfica de μy es la integral de μb, y y = (μy)/μ.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const g0 = 0.8, b = (t) => Math.sin(2 * t) + 1, mu = (t) => Math.exp(g0 * t);
const integ = (t) => { let s = 0; const n = 200; for (let i = 0; i < n; i++) { const u = (t * (i + 0.5)) / n; s += mu(u) * b(u) * (t / n); } return s; };
const A = plano({ x: 50, y: 230, w: 330, h: 180 }, { t: [0, 3], y: [0, 12] });
const B = plano({ x: 440, y: 230, w: 290, h: 180 }, { t: [0, 3], y: [0, 2] });

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [1800, 2200, 2000, 2600],
  leyenda: { ciruela: 'μ(t)', ambar: 'μ·y = ∫ μ b', cian: 'y = (μy)/μ' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    formula(g, 'p1', 210, 34, R`\mu\dfrac{dy}{dt} + \mu g\,y = \mu b`, { p: q(0), tam: 16 });
    if (paso >= 1) formula(g, 'p2', 580, 34, R`\dfrac{d}{dt}[\mu y] = \mu y' + \mu' y \Rightarrow \dfrac{d\mu}{dt} = \mu g`, { p: q(1), tam: 15 });
    if (paso >= 2) {
      formula(g, 'p3', 210, 110, R`\mu = e^{\int g\,dt}`, { p: q(2), tam: 18, color: 'ciruela' });
      panel(g, { x: 25, y: 200, w: 380, h: 235 }, R`\mu(t)\ \text{y}\ \mu y`, { clave: 'pa', p: q(2) });
      ejes(g, A, { numeros: false, y: '', clave: 'ea', p: q(2) });
      grafica(g, A, mu, { color: 'ciruela', p: q(2) });
    }
    if (paso >= 3) {
      formula(g, 'p4', 580, 110, R`\dfrac{d}{dt}[\mu y] = \mu b \;\Rightarrow\; y = \dfrac{1}{\mu}\int \mu\,b\,dt`, { p: q(3), tam: 15, color: 'cian' });
      grafica(g, A, integ, { color: 'ambar', p: q(3) });
      panel(g, { x: 415, y: 200, w: 340, h: 235 }, R`y(t) = \tfrac{\mu y}{\mu}`, { clave: 'pb', p: q(3) });
      ejes(g, B, { numeros: false, y: '', clave: 'eb', p: q(3) });
      grafica(g, B, (t) => integ(t) / mu(t), { p: q(3) });
    }
  },
  pasos: 4,
});
