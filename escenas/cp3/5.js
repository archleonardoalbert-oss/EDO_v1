import { autonoma } from '../esbozos.js';
const R = String.raw;
export default autonoma({ h: (y) => y - y ** 3, tex: R`y - y^3`, ind: 'x', vista: { t: [-1, 5], y: [-2, 2] }, casos: [
  { y0: 1.7, etiqueta: R`(a)\ y_0 > 1` }, { y0: 0.25, etiqueta: R`(b)\ 0 < y_0 < 1` }, { y0: -0.25, etiqueta: R`(c)\ -1 < y_0 < 0`, abajo: true }, { y0: -1.7, etiqueta: R`(d)\ y_0 < -1`, abajo: true }] });
