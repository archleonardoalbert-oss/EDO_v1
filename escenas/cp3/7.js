import { autonoma } from '../esbozos.js';
const R = String.raw;
// m dv/dt = mg − kv con g = 9.8 y k/m = 0.5: v_terminal = mg/k = 19.6
export default autonoma({ h: (v) => 9.8 - 0.5 * v, tex: R`g - \tfrac{k}{m}v \quad (g = 9.8,\ \tfrac{k}{m} = 0.5)`, v: 'v', vista: { t: [0, 12], y: [-5, 40] }, casos: [
  { y0: 0, etiqueta: R`v(0) = 0:\ \text{se suelta desde el reposo}` }, { y0: 35, etiqueta: R`v(0) = 35:\ \text{más rápido que la terminal}` }] });
