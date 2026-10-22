// Valientes · todas las soluciones de y' = (cos t)y: divididas entre e^{sin t} son rectas horizontales.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 60, w: 330, h: 320 }, { t: [-6, 6], y: [-5, 5] });
const B = plano({ x: 440, y: 60, w: 290, h: 320 }, { t: [-6, 6], y: [-3, 3] });
const KS = [-2, -1, -0.4, 0, 0.6, 1.3, 2];

export default definirEscena({
  alto: 430, preparar: () => ({}),
  duracion: [2200, 2600],
  leyenda: { cian: 'soluciones', verde: 'Q = y·e^{−sin t}' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 25, y: 25, w: 380, h: 385 }, R`y' = (\cos t)\,y`, { clave: 'pa' });
    ejes(g, A, { numeros: false, clave: 'ea' });
    KS.forEach((k, i) => grafica(g, A, (t) => k * Math.exp(Math.sin(t)), { p: tramo(q(0), 0.08 * i, 0.5 + 0.06 * i), ancho: 1.8 }));
    if (paso >= 1) {
      panel(g, { x: 415, y: 25, w: 340, h: 385 }, R`Q(t) = y(t)\,e^{-\sin t}`, { clave: 'pb', p: q(1) });
      ejes(g, B, { numeros: false, clave: 'eb', p: q(1) });
      KS.forEach((k, i) => grafica(g, B, (t) => mezclar(k * Math.exp(Math.sin(t)), k, ease(q(1))) * 0.75, { color: 'verde', p: q(1), ancho: 1.8 }));
    }
  },
  pasos: 2,
});
