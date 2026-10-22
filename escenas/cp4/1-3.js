import { eulerTabla } from '../esbozos.js';
export default eulerTabla({ f: (t, w) => (3 - w) * (w + 1), tex: '(3 - w)(w + 1)', y0: 0, dt: 0.5, n: 10, v: 'w', vista: { t: [0, 5.1], y: [-0.5, 4] }, nota: String.raw`\text{Euler oscila alrededor de } w = 3\text{; la verdadera sube sin oscilar: } \Delta t \text{ demasiado grande}` });
