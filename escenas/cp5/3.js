// CP5 ej. 3: con f(−1) = f(2) = 0 y f(y) > 0 en (−1, 2), la solución con y(0) = 1 sube de −1 a 2.
import { autonoma } from '../esbozos.js';
const R = String.raw;
export default autonoma({ h: (y) => (y + 1) * (2 - y) * (1 + 0.3 * y * y), tex: R`f(y)\ \text{(un ejemplo con } f > 0 \text{ en } (-1, 2))`, vista: { t: [-4, 4], y: [-2, 3] }, casos: [{ y0: 1, etiqueta: R`y(0) = 1` }] });
