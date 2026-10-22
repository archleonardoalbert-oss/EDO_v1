// Tres líneas de fase para un parámetro ligeramente menor, igual y ligeramente mayor que el valor de bifurcación,
// junto a la gráfica de f para cada uno.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, lineaFase, equilibrios } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

export function filas({ f, tex, valores, rotulos, rango, rangoF, bif }) {
  const R = String.raw;
  return definirEscena({
    alto: 450, preparar: () => ({}), vivo: true,
    duracion: [2200, 2400, 2400],
    leyenda: { texto: 'f', verde: 'sumidero', ambar: 'fuente', violeta: 'nodo' },
    capas: [
      (g, c, o) => formula(g, 'bif', 380, 26, bif, { p: o.p, tam: 15 }),
      ...[0, 1].map((k) => (g, c, o) => {
        const ids = k === 0 ? [0, 1] : [2];
        ids.forEach((i) => {
          const x0 = 20 + 245 * i, a = ease(tramo(o.p, 0.2 * (i - ids[0]), 0.6 + 0.2 * (i - ids[0])));
          const Q = plano({ x: x0 + 15, y: 70, w: 200, h: 150 }, { t: rango, y: rangoF });
          panel(g, { x: x0, y: 50, w: 230, h: 385 }, rotulos[i], { p: a, clave: `p${i}` });
          ejes(g, Q, { t: 'y', y: '', numeros: false, clave: `e${i}`, p: a, rejilla: false });
          grafica(g, Q, f(valores[i]), { color: 'texto', brillo: 2, p: a });
          const Y = (y) => 410 - ((y - rango[0]) / (rango[1] - rango[0])) * 170;
          lineaFase(g, { f: f(valores[i]), eqs: equilibrios(f(valores[i]), rango[0], rango[1]), coord: Y, desde: Y(rango[0]), hasta: Y(rango[1]), otra: x0 + 115, rango, p: a, tiempo: o.tiempo, clave: `lf${i}` });
        });
      }),
    ],
  });
}
