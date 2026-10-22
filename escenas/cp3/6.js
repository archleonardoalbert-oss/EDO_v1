import { autonoma } from '../esbozos.js';
const R = String.raw;
export default autonoma({ h: (y) => y * y - y ** 4, tex: R`y^2 - y^4`, ind: 'x', vista: { t: [-1, 6], y: [-2, 2] }, casos: [
  { y0: 1.5, etiqueta: R`(a)\ y_0 > 1` }, { y0: 0.4, etiqueta: R`(b)\ 0 < y_0 < 1` }, { y0: -0.6, etiqueta: R`(c)\ -1 < y_0 < 0`, abajo: true }, { y0: -1.15, etiqueta: R`(d)\ y_0 < -1`, abajo: true }] });
