import { filas } from './filas.js';
const R = String.raw;
export default filas({ f: (a) => (y) => y ** 3 + a * y * y, valores: [-0.5, 0, 0.5], rotulos: [R`\alpha = -0.5`, R`\alpha = 0`, R`\alpha = 0.5`], rango: [-1.2, 1.2], rangoF: [-0.8, 0.8], bif: R`y^2(y + \alpha):\ \text{equilibrios } 0 \text{ y } -\alpha;\ \text{se funden en } \alpha = 0` });
