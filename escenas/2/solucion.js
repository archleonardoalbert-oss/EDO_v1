// ¿Es solución? En cada instante se compara la tangente de la candidata (su derivada) con la marca del campo
// (lo que manda la ecuación). Abajo, una franja registra el residuo y'(t) − f(t, y(t)) en todo el intervalo.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, grafica, punto } from '../primitivas.js';
import { formula, tangente, direccion } from '../piezas.js';
import { deriv } from '../../motor/numerico.js';

const R = String.raw;
const P = plano({ x: 60, y: 30, w: 620, h: 300 }, { t: [-2, 1.6], y: [-4, 10] });
const FR = { x: 60, y: 365, w: 620, h: 40 };

export default definirEscena({
  alto: 440,
  entradas: [
    { id: 'f', tipo: 'funcion', etiqueta: R`\dfrac{dy}{dt} =`, valor: 'y', ejemplos: ['y', 'y - t', '2y'] },
    { id: 'c', tipo: 'funcion', etiqueta: R`y(t) =`, valor: '3e^t', vars: ['t'], ejemplos: ['3e^t', '-2e^t', 'e^t + 1', 't^2 + 1', 't + 1'] },
  ],
  preparar: (e) => {
    const y = (t) => e.cF(t), f = (t, v) => e.fF(t, v);
    const res = (t) => deriv(y, t, 1e-4) - f(t, y(t));
    const muestras = Array.from({ length: 121 }, (_, i) => { const t = -2 + (3.6 * i) / 120; return { t, r: res(t) }; });
    const ok = muestras.every((m) => Number.isFinite(m.r) && Math.abs(m.r) < 1e-3 * (1 + Math.abs(y(m.t))));
    return { e, y, f, res, muestras, ok };
  },
  vivo: [2, 3],
  duracion: [1600, 1400, 1500, 1500, 2600, 1500],
  leyenda: { campo: 'lo que manda la ecuación', cian: 'la candidata y(t)', ambar: 'su derivada y′(t)', verde: 'coinciden' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, c.f, { p: q(0), alfa: 0.55 });
    grafica(g, P, c.y, { p: q(0) });
    formula(g, 'pre', P.X(-1.1), P.Y(9), R`\text{¿satisface la ecuación en todo } t\text{?}`, { p: q(0), tam: 15, color: 'texto2' });
    if (paso >= 1) formula(g, 'ej', P.X(-1.1), P.Y(7.4), R`y(t) = ${c.e.cTex} \quad\text{en}\quad \dfrac{dy}{dt} = ${c.e.fTex}`, { p: q(1), tam: 17 });
    // 2–3 · punto móvil: tangente de la candidata y marca del campo
    if (paso === 2 || paso === 3) {
      const t = mezclar(-1.8, 1.2, (1 - Math.cos(tiempo / 1500)) / 2), y = c.y(t);
      if (P.dentro(t, y)) {
        const d = deriv(c.y, t, 1e-4), m = c.f(t, y), igual = Math.abs(d - m) < 1e-3 * (1 + Math.abs(m));
        tangente(g, P, t, y, d, { p: 1, largo: 140, color: 'ambar' });
        if (paso === 3) {
          const [ux, uy] = direccion(P, m), L = 40;
          g.linea([[P.X(t) - ux * L, P.Y(y) - uy * L], [P.X(t) + ux * L, P.Y(y) + uy * L]], { color: igual ? 'verde' : 'texto', ancho: 5, alfa: 0.55 * ease(p) });
          g.tex('cmp', P.X(-1.1), P.Y(5.8), igual ? R`y'(t) = ${d.toFixed(2)} = f(t, y) \;\checkmark` : R`y'(t) = ${d.toFixed(2)} \ne ${m.toFixed(2)} = f(t, y)`, { color: igual ? 'verde' : 'ambar', tam: 16, alfa: ease(p) });
        } else g.tex('der', P.X(-1.1), P.Y(5.8), R`y'(t) = ${d.toFixed(2)}`, { color: 'ambar', tam: 16, alfa: ease(p) });
        punto(g, P.X(t), P.Y(y), { color: 'cian', halo: true });
      }
    }
    // 4 · la franja del residuo recorre todo el intervalo
    if (paso >= 4) {
      const n = Math.round(c.muestras.length * (paso === 4 ? ease(p) : 1));
      g.tex('fr', FR.x, FR.y - 14, R`\text{residuo } y'(t) - f(t, y(t))`, { color: 'texto2', tam: 13, ancla: 'l' });
      const w = FR.w / c.muestras.length;
      c.muestras.slice(0, n).forEach((m, i) => {
        const bien = Number.isFinite(m.r) && Math.abs(m.r) < 1e-3 * (1 + Math.abs(c.y(m.t)));
        const alto = bien ? 4 : Math.min(FR.h, 6 + 6 * Math.log1p(Math.abs(m.r)));
        g.rect(FR.x + i * w, FR.y + FR.h - alto, w - 1, alto, { color: bien ? 'verde' : 'ambar', alfa: 0.85 });
      });
      if (n === c.muestras.length) g.tex('ver', FR.x + FR.w + 8, FR.y + FR.h / 2, c.ok ? R`\checkmark` : R`\times`, { color: c.ok ? 'verde' : 'ambar', tam: 22, ancla: 'l' });
      if (paso === 4) g.tex('todo', P.X(-1.1), P.Y(5.8), c.ok ? R`\text{para todo } t:\ \textbf{es solución}` : R`\text{falla en algún } t:\ \textbf{no es solución}`, { color: c.ok ? 'verde' : 'ambar', tam: 16, alfa: ease(tramo(p, 0.8, 1)) });
    }
    if (paso === 5) g.tex('obs', P.X(-0.6), P.Y(5.8), R`\text{prueba otra candidata abajo: no hace falta saber hallarla}`, { color: 'ciruela', tam: 14, alfa: ease(p) });
  },
  pasos: 6,
});
