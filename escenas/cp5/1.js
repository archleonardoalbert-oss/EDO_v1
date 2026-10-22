// CP5 ej. 1: tres líneas de fase. y² − 6y − 16 = (y − 8)(y + 2); cos y (equilibrios π/2 + nπ alternando);
// 1/(y − 2) (sin equilibrios; en y = 2 no está definida: un hueco del que todo se aleja).
import { definirEscena } from '../comun.js';
import { ease } from '../../motor/plano.js';
import { lineaFase, equilibrios } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const CASOS = [
  { tx: R`y^2 - 6y - 16`, h: (y) => y * y - 6 * y - 16, a: -6, b: 12, nota: R`-2:\ \text{sumidero};\ \ 8:\ \text{fuente}` },
  { tx: R`\cos y`, h: Math.cos, a: -5, b: 8, nota: R`\tfrac{\pi}{2} + 2n\pi:\ \text{sumideros};\ \ -\tfrac{\pi}{2} + 2n\pi:\ \text{fuentes}` },
  { tx: R`\dfrac{1}{y - 2}`, h: (y) => 1 / (y - 2), a: -2, b: 6, nota: R`\text{sin equilibrios; todo se aleja de } y = 2`, hueco: 2 },
];

export default definirEscena({
  alto: 460, preparar: () => ({}),
  vivo: true,
  duracion: [2200, 2200, 2200],
  leyenda: { verde: 'sumidero', ambar: 'fuente', rojo: 'f no definida' },
  capas: CASOS.map((C, i) => (g, c, o) => {
    const x0 = 20 + 245 * i, Y = (y) => 400 - ((y - C.a) / (C.b - C.a)) * 330;
    panel(g, { x: x0, y: 20, w: 230, h: 425 }, null, { p: o.p, clave: `p${i}` });
    formula(g, `t${i}`, x0 + 115, 44, R`\dfrac{dy}{dt} = ${C.tx}`, { p: o.p, tam: 15 });
    const eqs = C.hueco ? [] : equilibrios(C.h, C.a, C.b);
    eqs.forEach((e) => { if (C.h === Math.cos) e.rotulo = String.raw`${(e.y / Math.PI).toFixed(1)}\pi`; });
    lineaFase(g, { f: C.h, eqs, coord: Y, desde: Y(C.a), hasta: Y(C.b), otra: x0 + 115, rango: C.hueco ? [C.a, C.b] : [C.a, C.b], p: o.p, tiempo: o.tiempo, clave: `lf${i}`,
      ...(C.hueco ? { eqs: [{ y: C.hueco, tipo: 'hueco', rotulo: '2' }] } : {}) });
    g.tex(`n${i}`, x0 + 115, 425, C.nota, { color: 'texto', tam: 12, alfa: ease(o.p), fondo: true });
  }),
});
