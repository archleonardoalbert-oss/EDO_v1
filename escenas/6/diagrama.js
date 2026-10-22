// Diagrama de bifurcación: líneas de fase verticales en muchos µ, y las ramas y = 1 ± √(1 − µ): abajo estable,
// arriba inestable; se juntan en µ = 1 y desaparecen.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, lineaFase, equilibrios, curva, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 360 }, { t: [-3, 2.5], y: [-2, 4] });
const f = (mu) => (y) => y * y - 2 * y + mu;

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [3],
  duracion: [2600, 2200, 2000, 2400],
  leyenda: { verde: 'rama estable', ambar: 'rama inestable', ciruela: 'µ que barre' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P, { t: R`\mu`, y: 'y' });
    for (let k = 0; k <= 11; k++) {
      const mu = -3 + 0.5 * k, a = ease(tramo(q(0), k / 12 * 0.7, k / 12 * 0.7 + 0.3)) * (paso >= 1 ? 0.55 : 1);
      lineaFase(g, { f: f(mu), eqs: equilibrios(f(mu), -2, 4), coord: P.Y, desde: P.Y(-2), hasta: P.Y(4), otra: P.X(mu), rango: [-2, 4], p: a, particulas: false, rotular: false, tam: 7, clave: `l${k}` });
    }
    if (paso >= 1) {
      const ms = [], ab = [], ar = [];
      for (let i = 0; i <= 200; i++) { const mu = -3 + (4 * i) / 200; ms.push(mu); ab.push(1 - Math.sqrt(1 - mu)); ar.push(1 + Math.sqrt(1 - mu)); }
      curva(g, P, ms, ab, { color: 'verde', p: q(1), ancho: 3 });
      curva(g, P, ms, ar, { color: 'ambar', p: q(1), ancho: 3, guion: [7, 5] });
      g.tex('est', P.X(-2.4), P.Y(1 - Math.sqrt(3.4)) + 18, R`\text{estable}`, { color: 'verde', tam: 14, alfa: ease(q(1)), fondo: true });
      g.tex('ine', P.X(-2.4), P.Y(1 + Math.sqrt(3.4)) - 18, R`\text{inestable}`, { color: 'ambar', tam: 14, alfa: ease(q(1)), fondo: true });
    }
    if (paso >= 2) { punto(g, P.X(1), P.Y(1), { color: 'ciruela', r: 7, halo: true, alfa: ease(q(2)) }); g.tex('j', P.X(1) + 12, P.Y(1) - 14, R`(\mu, y) = (1, 1)`, { color: 'ciruela', tam: 14, ancla: 'l', alfa: ease(q(2)), fondo: true }); }
    if (paso === 3) {
      const mu = mezclar(-2.5, 2, (1 - Math.cos(tiempo / 2000)) / 2);
      g.linea([[P.X(mu), P.caja.y], [P.X(mu), P.caja.y + P.caja.h]], { color: 'ciruela', ancho: 2 });
      if (mu < 1) [1 - Math.sqrt(1 - mu), 1 + Math.sqrt(1 - mu)].forEach((y, i) => punto(g, P.X(mu), P.Y(y), { color: i ? 'ambar' : 'verde', r: 6 }));
      formula(g, 'fu', 380, 22, R`\text{al aumentar } \mu \text{: se acercan, se fusionan y desaparecen}`, { p, tam: 15 });
    }
  },
  pasos: 4,
});
