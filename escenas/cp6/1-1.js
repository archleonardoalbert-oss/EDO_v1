import { filas } from './filas.js';
const R = String.raw;
export default filas({ f: (a) => (y) => y * y + 3 * y + a, valores: [2, 2.25, 2.5], rotulos: [R`\alpha = 2 < \tfrac94`, R`\alpha = \tfrac94`, R`\alpha = 2.5 > \tfrac94`], rango: [-3.5, 0.5], rangoF: [-0.8, 2], bif: R`2y + 3 = 0 \Rightarrow y = -\tfrac32;\ \ \tfrac94 - \tfrac92 + \alpha = 0 \Rightarrow \alpha = \tfrac94` });
