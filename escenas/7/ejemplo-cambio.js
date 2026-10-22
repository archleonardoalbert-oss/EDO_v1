// u = y − 2t convierte y' = (y − 2t)² − 4(y − 2t) − 3 en la autónoma u' = u² − 4u − 5. La cizalla y = u + 2t lleva el
// plano (t, u) al plano (t, y): los equilibrios u = −1 (sumidero) y u = 5 (fuente) se vuelven las rectas y = 2t − 1 e
// y = 2t + 5.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar, solucionCache } from '../../motor/plano.js';
import { ejes, lineaFase, curva, rectaEquilibrio } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 150, y: 60, w: 570, h: 350 }, { t: [-1.5, 1.5], y: [-4, 8] });
const h = (u) => u * u - 4 * u - 5;
const EQ = [{ y: -1, tipo: 'sumidero' }, { y: 5, tipo: 'fuente' }];
const U0S = [-3.5, -2.5, -0.3, 1, 3, 4.6, 5.3];

export default definirEscena({
  alto: 450, preparar: () => ({ sols: U0S.map((u0) => solucionCache((t, u) => h(u), 0, u0, P)) }),
  vivo: [3, 4],
  duracion: [1800, 1800, 1800, 2400, 3200],
  leyenda: { verde: 'u = −1 → y = 2t − 1 (atrae)', ambar: 'u = 5 → y = 2t + 5 (repele)', cian: 'soluciones' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    formula(g, 'rw', 435, 24, paso === 0 ? R`\dfrac{dy}{dt} = (y - 2t)^2 - 4(y - 2t) - 3` : paso === 1 ? R`u = y - 2t \;\Rightarrow\; \dfrac{du}{dt} = \dfrac{dy}{dt} - 2` : R`\dfrac{du}{dt} + 2 = u^2 - 4u - 3 \;\Rightarrow\; \dfrac{du}{dt} = u^2 - 4u - 5`, { tam: 16 });
    if (paso <= 1) {
      ejes(g, P, { y: 'y' });
      if (paso === 1) [-3, -1, 1, 3, 5].forEach((u0, i) => curva(g, P, [-1.5, 1.5], [u0 - 3, u0 + 3], { color: 'tenue', guion: [5, 5], brillo: 0, ancho: 1.2, p: tramo(p, 0.1 * i, 0.6 + 0.1 * i) }));
      if (paso === 1) g.tex('n', P.X(-1.4), P.Y(7), R`u = \text{cte} \iff \text{recta } y = 2t + u`, { color: 'texto2', tam: 13, ancla: 'l', fondo: true });
      return;
    }
    // s = 0: plano (t, u); s = 1: plano (t, y) por la cizalla y = u + 2t
    const s = paso === 4 ? ease(Math.min(1, (1 - Math.cos(tiempo / 2200)) / 2 * 1.2)) : 0;
    ejes(g, P, { y: s > 0.5 ? 'y' : 'u' });
    lineaFase(g, { f: h, eqs: EQ, coord: P.Y, desde: P.Y(-4), hasta: P.Y(8), otra: 70, rango: [-4, 8], p: q(2), tiempo, clave: 'lf' });
    if (paso >= 3) {
      EQ.forEach((e) => curva(g, P, [-1.5, 1.5], [e.y - 3 * s, e.y + 3 * s], { color: e.tipo === 'sumidero' ? 'verde' : 'ambar', ancho: 2.6, guion: e.tipo === 'fuente' ? [7, 5] : null, p: q(3) }));
      c.sols.forEach((sol) => ['atras', 'adelante'].forEach((k) => curva(g, P, sol[k].t, sol[k].y.map((u, i) => u + 2 * s * sol[k].t[i]), { p: q(3), ancho: 1.8, alfa: 0.85 })));
      if (paso === 4) g.tex('cz', P.X(0.7), P.Y(7.3), s > 0.5 ? R`y = u + 2t:\ \text{tienden a } y = 2t - 1` : R`\text{plano } (t, u)`, { color: 'texto', tam: 14, fondo: true });
    }
  },
  pasos: 5,
});
