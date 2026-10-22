import { eulerTabla } from '../esbozos.js';
export default eulerTabla({ f: (t, y) => t - y * y, tex: 't - y^2', y0: 1, dt: 0.25, n: 4, vista: { t: [0, 1.05], y: [0.4, 1.1] }, nota: String.raw`\text{baja mientras } y^2 > t \text{ y vuelve a subir al cruzar } y = \sqrt t` });
