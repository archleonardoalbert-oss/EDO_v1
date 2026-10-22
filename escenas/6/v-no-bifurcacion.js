// Valientes · no bifurcación: en el rectángulo, f(µ, ·) decrece, es + en y0 − δ y − en y0 + δ para µ cercano:
// un único cruce, de arriba abajo, que se mueve continuamente.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { formula } from '../piezas.js';
import { raices as ceros } from '../../motor/numerico.js';

const R = String.raw;
const P = plano({ x: 70, y: 50, w: 620, h: 330 }, { t: [-1.6, 1.6], y: [-1.6, 1.6] });
const D = 0.9;
const f = (mu) => (y) => -1.1 * y + 0.25 * y ** 3 + 0.3 * Math.sin(3 * y) * 0.2 + mu;

export default definirEscena({
  alto: 430,
  entradas: [{ id: 'mu', tipo: 'deslizador', etiqueta: R`\mu - \mu_0`, valor: 0.2, min: -0.5, max: 0.5, paso: 0.01 }],
  preparar: (e) => ({ e }),
  vivo: [2],
  duracion: [2200, 2200, 2600],
  leyenda: { texto: 'f(µ, y)', verde: 'el equilibrio (sumidero)', cian: 'f(y₀ − δ) > 0', rojo: 'f(y₀ + δ) < 0' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const mu = paso === 2 ? 0.45 * Math.sin(tiempo / 1300) : paso === 1 ? c.e.mu : 0;
    ejes(g, P, { t: 'y', y: R`f(\mu, y)`, numeros: false });
    g.rect(P.X(-D), P.caja.y, P.X(D) - P.X(-D), P.caja.h, { color: 'verde', alfa: 0.07 * ease(q(0)) });
    [-0.4, -0.2, 0, 0.2, 0.4].forEach((m) => grafica(g, P, f(m), { color: 'texto2', brillo: 0, ancho: 1, alfa: 0.3 * ease(q(0)) }));
    grafica(g, P, f(mu), { color: 'texto', brillo: 3 });
    if (paso >= 1) {
      punto(g, P.X(-D), P.Y(f(mu)(-D)), { color: 'cian', r: 6, alfa: ease(q(1)) });
      punto(g, P.X(D), P.Y(f(mu)(D)), { color: 'rojo', r: 6, alfa: ease(q(1)) });
      g.tex('bi', P.X(-D), P.Y(-1.45), R`y_0 - \delta`, { color: 'cian', tam: 13, alfa: ease(q(1)) });
      g.tex('bs', P.X(D), P.Y(-1.45), R`y_0 + \delta`, { color: 'rojo', tam: 13, alfa: ease(q(1)) });
    }
    if (paso >= 2) {
      ceros(f(mu), -D, D).forEach((y) => { punto(g, P.X(y), P.Y(0), { color: 'verde', r: 7, halo: true }); g.tex('y1', P.X(y), P.Y(0) + 22, R`y_1(\mu)`, { color: 'verde', tam: 14, fondo: true }); });
      formula(g, 'u', 380, 24, R`\text{un único cruce, de arriba abajo: sumidero } (\mu - \mu_0 = ${mu.toFixed(2)})`, { p, tam: 14 });
    }
  },
  pasos: 3,
});
