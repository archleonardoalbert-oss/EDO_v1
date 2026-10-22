// y' = y² − 2y + µ: fila de líneas de fase para µ = −4, −2, 0, 2, 4 (figura 1.78) y, a la derecha, las soluciones
// para el µ elegido (figuras 1.79–1.80). Mientras µ < 1, dos equilibrios (sumidero abajo, fuente arriba); después,
// ninguno.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, lineaFase, equilibrios, solucion, rectaEquilibrio } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const MUS = [-4, -2, 0, 2, 4];
const Yr = [-3, 5];
const B = plano({ x: 440, y: 60, w: 290, h: 330 }, { t: [-1.5, 1.5], y: Yr });
const fm = (mu) => (y) => y * y - 2 * y + mu;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'mu', tipo: 'deslizador', etiqueta: R`\mu`, valor: -2, min: -4, max: 4, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: true,
  duracion: [1800, 1800, 2200, 2400, 1800, 1800, 2000],
  leyenda: { verde: 'sumidero', ambar: 'fuente', cian: 'soluciones', ciruela: 'µ' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const Y = (y) => 390 - ((y - Yr[0]) / (Yr[1] - Yr[0])) * 330;
    const mu = paso === 2 ? -2 : c.e.mu;
    formula(g, 'fam', 210, 26, R`\dfrac{dy}{dt} = f_\mu(y) = y^2 - 2y + \mu`, { p: q(0), tam: 16 });
    // fila de líneas de fase
    MUS.forEach((m, i) => {
      const visible = paso >= 3 || (paso <= 2 && m === -2) || (paso <= 1 && false);
      if (!visible && !(paso <= 1 && m === -2)) return;
      const a = paso >= 3 ? ease(tramo(q(3), 0.12 * i, 0.4 + 0.12 * i)) : ease(q(0));
      const x = 60 + 75 * i, f = fm(m);
      lineaFase(g, { f, eqs: equilibrios(f, Yr[0], Yr[1]), coord: Y, desde: Y(Yr[0]), hasta: Y(Yr[1]), otra: x, rango: Yr, p: a, tiempo, rotular: m === -2 && paso === 2, clave: `lf${i}` });
      g.tex(`m${i}`, x, 410, R`\mu = ${m}`, { color: 'ciruela', tam: 13, alfa: a });
      if (paso >= 4 && m <= 0) g.rect(x - 18, 60, 36, 330, { color: 'verde', relleno: false, alfa: 0.4 * ease(q(4)), radio: 6 });
      if (paso >= 5 && m > 0) g.rect(x - 18, 60, 36, 330, { color: 'rojo', relleno: false, alfa: 0.4 * ease(q(5)), radio: 6 });
    });
    if (paso === 1) formula(g, 'ej', 210, 400, R`\mu = 0,\ -4,\ 3:\ \text{tres ecuaciones distintas}`, { p, tam: 14 });
    if (paso === 2) formula(g, 'm2', 210, 60, R`\mu = -2:\ y = 1 \pm \sqrt3 \approx -0.73,\ 2.73`, { p, tam: 14 });
    if (paso === 6) {
      g.rect(60 + 75 * 2 + 20, 60, 75 - 40, 330, { color: 'ciruela', alfa: 0.15 * ease(p), radio: 6 });
      g.tex('b', 60 + 75 * 2.5, 44, R`\text{¡bifurcación!}`, { color: 'ciruela', tam: 14, alfa: ease(p), fondo: true });
    }
    // soluciones para el µ elegido
    if (paso >= 2) {
      const f = fm(mu), eqs = equilibrios(f, Yr[0], Yr[1]);
      panel(g, { x: 415, y: 25, w: 340, h: 410 }, R`\mu = ${mu.toFixed(2)}`, { clave: 'pb' });
      ejes(g, B, { numeros: false, y: '', clave: 'eb' });
      eqs.forEach((e) => rectaEquilibrio(g, B, e.y, { tipo: e.tipo }));
      [-2.5, -1, 0, 0.8, 1.6, 2.4, 3.5].forEach((y0) => solucion(g, B, (t, y) => f(y), 0, y0, { punto: false, ancho: 1.6, alfa: 0.85 }));
      g.tex('n', 585, 420, eqs.length ? R`${eqs.length}\ \text{equilibrio${eqs.length > 1 ? 's' : ''}}` : R`\text{sin equilibrios: todas} \to +\infty`, { color: eqs.length ? 'texto' : 'rojo', tam: 13, fondo: true });
    }
  },
  pasos: 7,
});
