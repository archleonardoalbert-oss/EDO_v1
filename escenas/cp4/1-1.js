import { eulerTabla } from '../esbozos.js';
export default eulerTabla({ f: (t, y) => 2 * y + 1, tex: '2y + 1', y0: 3, dt: 0.5, n: 4, vista: { t: [0, 2.1], y: [0, 60] }, nota: String.raw`\text{Euler se queda muy por debajo: la solución crece como } e^{2t}` });
