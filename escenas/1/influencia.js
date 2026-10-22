// Influencia de P0 y k en P(t) = P0·e^{kt}: P0 estira la curva en vertical (y dividir entre P0 las superpone:
// «misma forma»), k la acelera; con todas las constantes C se obtiene la familia completa Ce^{kt}.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, curva, punto, rectaEquilibrio } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 30, w: 600, h: 380 }, { t: [-1, 3], y: [-4, 8] });
const traza = (fn) => { const ts = [], ys = []; for (let i = 0; i <= 160; i++) { const t = -1 + (4 * i) / 160; ts.push(t); ys.push(fn(t)); } return [ts, ys]; };
const dibujar = (g, fn, op) => { const [ts, ys] = traza(fn); return curva(g, P, ts, ys, op); };
const onda = (tiempo, a, b, vel = 1) => mezclar(a, b, (1 - Math.cos((tiempo / 1000) * vel)) / 2);

export default definirEscena({
  alto: 440,
  entradas: [
    { id: 'P0', tipo: 'deslizador', etiqueta: 'P_0 = C', valor: 1, min: -3, max: 3, paso: 0.05 },
    { id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 0.6, min: 0.05, max: 1.5, paso: 0.05 },
  ],
  preparar: (e) => ({ e }),
  vivo: [0, 3],
  duracion: [1500, 1500, 2600, 1500, 1800, 2600],
  leyenda: (paso) => ({ cian: 'P(t) = P₀e^{kt}', ciruela: paso >= 3 ? 'parámetro k' : 'P₀' }),
  dibujar(g, c, { paso, p, tiempo }) {
    const { P0, k } = c.e;
    ejes(g, P, { y: 'P' });
    if (paso === 0 || paso === 1) {
      // 0 · P0 sube y baja: la curva se estira en vertical
      const p0 = paso === 0 ? onda(tiempo, 0.4, 2.4) : P0;
      [0.5, 1, 2].forEach((x) => dibujar(g, (t) => x * Math.exp(k * t), { alfa: 0.18, brillo: 0, ancho: 1.4 }));
      dibujar(g, (t) => p0 * Math.exp(k * t), { p: paso === 0 ? 1 : 1 });
      punto(g, P.X(0), P.Y(p0), { color: 'ciruela', r: 6, halo: true });
      g.tex('p0', P.X(0) - 10, P.Y(p0), R`P_0 = ${p0.toFixed(2)}`, { color: 'ciruela', tam: 15, ancla: 'r' });
      if (paso === 0) g.tex('esc', P.X(1.6), P.Y(7.3), R`P_0 \text{ cambia la escala vertical}`, { color: 'texto2', tam: 15, alfa: ease(p) });
      if (paso === 1) formula(g, 'f', P.X(1.6), P.Y(7.2), R`P(t) = \htmlClass{k-ciruela}{P_0}\,e^{kt}`, { p, tam: 24 });
    }
    if (paso === 2) {
      // «misma forma»: dividir cada curva entre su P0 las superpone en e^{kt}
      const m = ease(tramo(p, 0.35, 0.9));
      [0.5, 1, 1.6, 2.5].forEach((x) => dibujar(g, (t) => mezclar(x, 1, m) * Math.exp(k * t), { alfa: 0.8, ancho: 2 }));
      formula(g, 'div', P.X(1.6), P.Y(7.2), R`\dfrac{P_0e^{kt}}{P_0} = e^{kt}`, { p: tramo(p, 0.2, 0.5), tam: 20 });
      g.tex('mf', P.X(1.6), P.Y(5.6), R`\text{todas: la misma curva reescalada}`, { color: 'texto2', tam: 14, alfa: ease(tramo(p, 0.8, 1)) });
    }
    if (paso === 3 || paso === 4) {
      // 3 · k cambia la tasa; 4 · k grande explota antes que k pequeño
      const kk = paso === 3 ? onda(tiempo, 0.1, 1.4, 0.8) : k;
      if (paso === 3) {
        dibujar(g, (t) => Math.exp(kk * t), {});
        g.tex('k', P.X(-0.9), P.Y(7.2), R`k = ${kk.toFixed(2)}`, { color: 'ciruela', tam: 20, ancla: 'l' });
        g.tex('tasa', P.X(1.6), P.Y(7.2), R`k \text{ cambia la tasa de crecimiento}`, { color: 'texto2', tam: 15 });
      } else {
        const kg = 1.3, kp = 0.35, tLlega = (x) => Math.log(7) / x;
        dibujar(g, (t) => Math.exp(kg * t), { p: tramo(p, 0, 0.7), color: 'ambar' });
        dibujar(g, (t) => Math.exp(kp * t), { p: tramo(p, 0, 0.7), color: 'cian' });
        g.linea([[P.caja.x, P.Y(7)], [P.caja.x + P.caja.w, P.Y(7)]], { color: 'tenue', ancho: 1, guion: [4, 5], alfa: 0.6 });
        g.tex('kg', P.X(tLlega(kg)) - 6, P.Y(7) - 14, R`k = 1.3:\ \text{explota antes}`, { color: 'ambar', tam: 14, ancla: 'r', alfa: ease(tramo(p, 0.6, 1)) });
        g.tex('kp', P.X(2.2), P.Y(Math.exp(kp * 2.2)) - 16, R`k = 0.35:\ \text{más lento}`, { color: 'cian', tam: 14, alfa: ease(tramo(p, 0.6, 1)) });
        g.tex('vel', P.X(1.6), P.Y(-3), R`\text{«}k \text{ determina la velocidad del cambio»}`, { color: 'texto2', tam: 15, alfa: ease(tramo(p, 0.7, 1)) });
      }
    }
    if (paso === 5) {
      // la familia completa P = Ce^{kt}: C de cualquier signo (C = 0 es el equilibrio)
      const Cs = [-3, -2, -1.2, -0.6, -0.25, 0.25, 0.6, 1.2, 2, 3];
      Cs.forEach((C, i) => dibujar(g, (t) => C * Math.exp(k * t), { p: tramo(p, 0.04 * i, 0.5 + 0.04 * i), alfa: 0.4, brillo: 0, ancho: 1.6 }));
      rectaEquilibrio(g, P, 0, { color: 'violeta', p: tramo(p, 0.3, 0.8) });
      dibujar(g, (t) => P0 * Math.exp(k * t), {});
      punto(g, P.X(0), P.Y(P0), { color: 'ciruela', r: 6, halo: true });
      formula(g, 'fam', P.X(1.6), P.Y(7.2), R`P(t) = C\,e^{kt},\quad C \in \mathbb{R}`, { p: tramo(p, 0.3, 0.8), tam: 22 });
      g.tex('c', P.X(0) + 12, P.Y(P0) + 14, R`C = ${P0.toFixed(2)}`, { color: 'ciruela', tam: 15, ancla: 'l' });
    }
  },
  pasos: 6,
  asas: (c, paso) => (paso === 1 || paso === 5 ? [{ id: 'P0', x: P.X(0), y: P.Y(c.e.P0), color: 'ciruela', mover: (x, y) => ({ P0: P.V(y) }) }] : []),
});
