// CP5 ej. 5: índice = (s_derecha − s_izquierda)/2 con s = ±1 el signo de f; al sumar, todo se cancela salvo los
// extremos: (s_final − s_inicial)/2 = (1 − (−1))/2 = 1.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, lineaFase, equilibrios } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 60, y: 60, w: 640, h: 220 }, { t: [-100, 100], y: [-3, 3] });
const f = (y) => { const u = y / 25; return 0.6 * (u + 3.2) * (u + 1.5) * (u - 0.4) ** 2 * (u - 2.2) * 0.2; };

export default definirEscena({
  alto: 450, preparar: () => ({ eqs: equilibrios(f, -100, 100) }),
  duracion: [2200, 2600, 2400],
  leyenda: { ambar: 'fuente: +1', verde: 'sumidero: −1', violeta: 'nodo: 0' },
  capas: [
    (g, c, o) => {
      ejes(g, P, { t: 'y', y: 'f', numeros: false });
      grafica(g, P, f, { color: 'texto', brillo: 2, p: o.p });
      lineaFase(g, { f, eqs: c.eqs, coord: P.X, desde: P.X(-100), hasta: P.X(100), otra: 330, rango: [-100, 100], orientacion: 'horizontal', p: o.p, particulas: false, rotular: false, clave: 'lf' });
      g.tex('ext', P.X(-95), 300, R`f(-100) < 0`, { color: 'rojo', tam: 13, ancla: 'l', alfa: ease(o.p) });
      g.tex('ext2', P.X(95), 300, R`f(100) > 0`, { color: 'cian', tam: 13, ancla: 'r', alfa: ease(o.p) });
    },
    (g, c, o) => {
      const ind = { fuente: '+1', sumidero: R`-1`, nodo: '0' }, col = { fuente: 'ambar', sumidero: 'verde', nodo: 'violeta' };
      c.eqs.forEach((e, i) => g.tex(`i${i}`, P.X(e.y), 365, ind[e.tipo], { color: col[e.tipo], tam: 17, alfa: ease(tramo(o.p, 0.15 * i, 0.4 + 0.15 * i)), fondo: true }));
      formula(g, 'reg', 380, 26, R`\text{índice}(y_i) = \dfrac{s_i - s_{i-1}}{2},\ \ s = \text{signo de } f \text{ a la derecha}`, { p: o.p, tam: 14 });
    },
    (g, c, o) => {
      const suma = c.eqs.reduce((a, e) => a + ({ fuente: 1, sumidero: -1, nodo: 0 }[e.tipo]), 0);
      formula(g, 'tel', 380, 415, R`\sum = \dfrac{s_k - s_0}{2} = \dfrac{1 - (-1)}{2} = 1\qquad (\text{aquí: } ${suma})`, { p: o.p, tam: 16, color: 'texto' });
    },
  ],
});
