// Ejemplo de la conferencia: dy/dt = 2y − 1, y(0) = 1, Δt = 0.1. La tabla se llena con los mismos números que el
// dibujo; al final, la solución exacta (e^{2t} + 1)/2 queda por encima de los puntos de Euler (figura 1.35).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, campo, grafica } from '../primitivas.js';
import { poligonoEuler, tabla, formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 60, y: 40, w: 400, h: 380 }, { t: [0, 1.05], y: [0.8, 4.4] });
const f = (t, y) => 2 * y - 1;
const num = (x) => String(Number(x.toFixed(4)));

export default definirEscena({
  alto: 460,
  entradas: [{ id: 'dt', tipo: 'deslizador', etiqueta: R`\Delta t`, valor: 0.1, min: 0.05, max: 0.25, paso: 0.05 }],
  preparar: (e) => ({ e, eu: euler(f, 0, 1, e.dt, Math.round(1 / e.dt)) }),
  duracion: [1600, 1800, 1800, 1800, 2600],
  leyenda: { campo: 'campo 2y − 1', ambar: 'Euler', cian: 'exacta (e^{2t} + 1)/2' },
  dibujar(g, c, { paso, p }) {
    const { eu } = c, q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P, { marcasT: [0, 0.2, 0.4, 0.6, 0.8, 1] });
    campo(g, P, f, { alfa: 0.35, nt: 12, ny: 15 });
    formula(g, 'pvi', 610, 26, R`\dfrac{dy}{dt} = 2y - 1,\ \ y(0) = 1,\ \ \Delta t = ${c.e.dt}`, { tam: 15 });
    const pasos = Math.min(paso, 3);
    const filas = [[R`0`, R`0`, R`1`, R`1`]];
    for (let k = 0; k < Math.min(eu.t.length - 1, paso >= 4 ? 99 : pasos); k++) filas.push([String(k + 1), num(eu.t[k + 1]), num(eu.y[k + 1]), num(f(0, eu.y[k + 1]))]);
    tabla(g, 'tb', 495, 70, [R`k`, R`t_k`, R`y_k`, R`f(t_k, y_k)`], filas.slice(0, paso >= 4 ? 11 : pasos + 1), { anchos: [34, 60, 74, 80], resaltar: paso >= 1 && paso <= 3 ? paso : -1, tam: 13, alto: 26 });
    if (paso >= 1 && paso <= 3) {
      const k = paso - 1;
      formula(g, 'cta', 610, 398, R`y_{${k + 1}} = ${num(eu.y[k])} + (2\cdot ${num(eu.y[k])} - 1)(${c.e.dt}) = ${num(eu.y[k + 1])}`, { p, tam: 15, color: 'ambar' });
    }
    if (paso <= 3) {
      // lo ya calculado queda dibujado; el segmento nuevo crece
      poligonoEuler(g, P, eu, { p: 1, hasta: Math.max(0, pasos - 1) });
      if (paso >= 1) poligonoEuler(g, P, { t: eu.t.slice(pasos - 1, pasos + 1), y: eu.y.slice(pasos - 1, pasos + 1) }, { p });
    } else poligonoEuler(g, P, eu, { p });
    if (paso >= 4) {
      grafica(g, P, (t) => (Math.exp(2 * t) + 1) / 2, { p: tramo(p, 0.3, 1) });
      const yv = (Math.exp(2) + 1) / 2;
      g.tex('cmp', 610, 430, R`y(1) \approx ${num(eu.y.at(-1))}\ \text{(Euler)}\quad \text{vs}\quad \tfrac{e^2 + 1}{2} = ${num(yv)}`, { color: 'texto', tam: 14, alfa: ease(tramo(p, 0.6, 1)), fondo: true });
    }
  },
  pasos: 5,
});
