// Valientes · factor integrante = variación de la constante: x(t) cruza la familia c·e^{−t}; μx = e^t x coincide con c(t).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { panel } from '../piezas.js';

const R = String.raw;
const b = (t) => 2 * Math.sin(2 * t) + 1;
const cDe = (t) => { let s = 0; const n = 200; for (let i = 0; i < n; i++) { const u = (t * (i + 0.5)) / n; s += b(u) * Math.exp(u) * (t / n); } return -1 + s; };
const x = (t) => cDe(t) * Math.exp(-t);
const A = plano({ x: 50, y: 60, w: 330, h: 330 }, { t: [0, 3.5], y: [-2, 3] });
const B = plano({ x: 440, y: 60, w: 300, h: 330 }, { t: [0, 3.5], y: [-2, 30] });

export default definirEscena({
  alto: 430, preparar: () => ({}),
  duracion: [2200, 2600],
  leyenda: { violeta: 'c·x_h', cian: 'x(t)', ambar: 'μ x = eᵗ x', ciruela: 'c(t)' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 25, y: 30, w: 380, h: 385 }, R`x(t)\ \text{y la familia}\ c\,e^{-t}`, { clave: 'pa' });
    ejes(g, A, { numeros: false, y: 'x', clave: 'ea' });
    [-2, -1, 1, 2, 4, 8, 14].forEach((k) => grafica(g, A, (t) => k * Math.exp(-t), { color: 'violeta', alfa: 0.5, brillo: 0, ancho: 1.3 }));
    grafica(g, A, x, { p: q(0) });
    if (paso >= 1) {
      panel(g, { x: 415, y: 30, w: 350, h: 385 }, R`\mu(t)\,x(t) \ \text{y}\ c(t)`, { clave: 'pb', p: q(1) });
      ejes(g, B, { numeros: false, y: '', clave: 'eb', p: q(1) });
      grafica(g, B, (t) => Math.exp(t) * x(t), { color: 'ambar', p: q(1) });
      for (let t = 0.1; t < 3.5; t += 0.25) punto(g, B.X(t), B.Y(cDe(t)), { color: 'ciruela', r: 3.5, alfa: ease(tramo(q(1), 0.4, 1)) });
    }
  },
  pasos: 2,
});
