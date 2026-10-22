// CP6 ej. 2: y⁶ − 2y³ + α. Diagrama de bifurcación: equilibrios y = ∛(1 ± √(1 − α)). Candidatos α = 0 y α = 1; solo
// en α = 1 cambia la línea de fase (los dos equilibrios se funden y desaparecen); en α = 0 un sumidero cruza y = 0.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, lineaFase, equilibrios, curva, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 360 }, { t: [-2, 1.6], y: [-1.2, 1.8] });
const f = (a) => (y) => y ** 6 - 2 * y ** 3 + a;

export default definirEscena({
  alto: 450, preparar: () => ({}), vivo: [2],
  duracion: [2400, 2400, 2600],
  leyenda: { verde: 'rama de sumideros', ambar: 'rama de fuentes', ciruela: 'candidatos α = 0, α = 1' },
  capas: [
    (g, c, o) => {
      ejes(g, P, { t: R`\alpha`, y: 'y' });
      for (let k = 0; k <= 9; k++) { const a = -2 + 0.4 * k; lineaFase(g, { f: f(a), eqs: equilibrios(f(a), -1.2, 1.8), coord: P.Y, desde: P.Y(-1.2), hasta: P.Y(1.8), otra: P.X(a), rango: [-1.2, 1.8], p: ease(tramo(o.p, k / 10 * 0.7, k / 10 * 0.7 + 0.3)) * 0.6, particulas: false, rotular: false, tam: 7, clave: `l${k}` }); }
      formula(g, 'c', 380, 22, R`f' = 6y^2(y^3 - 1) = 0 \Rightarrow y = 0 \ (\alpha = 0) \text{ o } y = 1 \ (\alpha = 1)`, { p: o.p, tam: 14 });
    },
    (g, c, o) => {
      const as = [], ab = [], ar = [];
      for (let i = 0; i <= 300; i++) { const a = -2 + (3 * i) / 300; as.push(a); ab.push(Math.cbrt(1 - Math.sqrt(1 - a))); ar.push(Math.cbrt(1 + Math.sqrt(1 - a))); }
      curva(g, P, as, ab, { color: 'verde', p: o.p, ancho: 3 }); curva(g, P, as, ar, { color: 'ambar', p: o.p, ancho: 3, guion: [7, 5] });
      punto(g, P.X(1), P.Y(1), { color: 'ciruela', r: 7, halo: true, alfa: ease(o.p) });
      punto(g, P.X(0), P.Y(0), { color: 'ciruela', r: 6, alfa: ease(o.p) });
    },
    (g, c, o) => {
      const a = mezclar(-1.5, 1.4, (1 - Math.cos(o.tiempo / 2200)) / 2);
      g.linea([[P.X(a), P.caja.y], [P.X(a), P.caja.y + P.caja.h]], { color: 'ciruela', ancho: 2 });
      g.tex('a', P.X(a), P.caja.y + P.caja.h + 14, R`\alpha = ${a.toFixed(2)}`, { color: 'ciruela', tam: 13, fondo: true });
      g.tex('d', 380, 436, R`\alpha = 0:\ \text{el sumidero cruza } y = 0 \text{ (nada cambia)};\ \ \alpha = 1:\ \textbf{se funden y desaparecen}`, { color: 'texto', tam: 13, fondo: true });
    },
  ],
});
