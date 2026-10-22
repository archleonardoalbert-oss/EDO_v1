import { esbozo } from '../esbozos.js';
export default esbozo({ f: (t, y) => 2 * y * (1 - y), tex: String.raw`2y(1 - y)`, isoclinas: [0], soluciones: [[0, -0.15], [0, 0.1], [0, 0.5], [0, 1.6], [0, 2.3]] });
