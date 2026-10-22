import { autonoma } from '../esbozos.js';
const R = String.raw;
export default autonoma({ h: (S) => S ** 3 - 2 * S * S + S, tex: R`S^3 - 2S^2 + S`, v: 'S', vista: { t: [-3, 4], y: [-1, 2] }, casos: [
  { y0: 0.5, etiqueta: R`S(0) = \tfrac12` }, { y0: 0.5, t0: 1, etiqueta: R`S(1) = \tfrac12`, abajo: true }, { y0: 1, etiqueta: R`S(0) = 1` },
  { y0: 1.5, etiqueta: R`S(0) = \tfrac32` }, { y0: -0.5, etiqueta: R`S(0) = -\tfrac12`, abajo: true }] });
