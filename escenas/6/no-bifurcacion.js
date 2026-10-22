// Sin bifurcación: un equilibrio donde f cruza el eje con pendiente no nula sobrevive a un pequeño cambio de µ, cerca y
// del mismo tipo. Contraste: donde solo toca el eje, un cambio pequeño lo destruye.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto, equilibrios } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 70, w: 310, h: 300 }, { t: [-1.5, 1.5], y: [-1.5, 1.5] });
const B = plano({ x: 430, y: 70, w: 310, h: 300 }, { t: [-1.5, 1.5], y: [-1.5, 1.5] });

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: true,
  duracion: [1800, 2200, 2200],
  leyenda: { verde: 'el equilibrio sobrevive (mismo tipo)', rojo: 'desaparece', ciruela: 'µ varía un poco' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), d = 0.35 * Math.sin(tiempo / 900);
    panel(g, { x: 25, y: 25, w: 360, h: 390 }, R`f_{\mu_0}'(y_0) \ne 0`, { clave: 'pa' });
    ejes(g, A, { t: 'y', y: '', numeros: false, clave: 'ea' });
    const fa = (y) => -0.9 * y + 0.3 * y ** 3 + d;
    grafica(g, A, fa, { color: 'texto', brillo: 3 });
    equilibrios(fa, -1.5, 1.5).forEach((e) => { if (Math.abs(e.y) < 0.9) punto(g, A.X(e.y), A.Y(0), { color: 'verde', r: 7, halo: true }); });
    g.tex('sa', 205, 395, R`\text{se mueve un poco; sigue siendo sumidero}`, { color: 'verde', tam: 13, alfa: ease(q(1)), fondo: true });
    if (paso >= 2) {
      panel(g, { x: 405, y: 25, w: 360, h: 390 }, R`f_{\mu_0}'(y_0) = 0\ \text{(contraste)}`, { clave: 'pb', p: q(2) });
      ejes(g, B, { t: 'y', y: '', numeros: false, clave: 'eb', p: q(2) });
      const fb = (y) => y * y + d;
      grafica(g, B, fb, { color: 'texto', brillo: 3, p: q(2) });
      const eqs = equilibrios(fb, -1.5, 1.5);
      eqs.forEach((e) => punto(g, B.X(e.y), B.Y(0), { color: 'ambar', r: 6, alfa: ease(q(2)) }));
      g.tex('sb', 585, 395, eqs.length ? R`${eqs.length}\ \text{equilibrio(s)}` : R`\text{¡ninguno!}`, { color: eqs.length ? 'texto' : 'rojo', tam: 13, alfa: ease(q(2)), fondo: true });
    }
    if (paso === 0) formula(g, 'pr', 395, 435, R`\text{las bifurcaciones son la excepción, no la regla}`, { p, tam: 14 });
  },
  pasos: 3,
});
