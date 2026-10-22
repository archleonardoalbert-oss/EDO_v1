// CP5 ej. 2: y' = y² − 4y + 2, y(0) = 0: equilibrios 2 ± √2; f(0) = 2 > 0, así que sube hacia 2 − √2 (sumidero).
import { autonoma } from '../esbozos.js';
const R = String.raw;
export default autonoma({ h: (y) => y * y - 4 * y + 2, tex: R`y^2 - 4y + 2`, vista: { t: [-1, 5], y: [-1, 4.5] }, casos: [{ y0: 0, etiqueta: R`y(0) = 0 \to 2 - \sqrt2`, abajo: true }] });
