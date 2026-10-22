// dP/dt = kP sin resolver: P = 0 es un equilibrio; el signo de kP dice si sube o baja; con k < 0 todo se
// invierte; la pendiente es proporcional a la altura; y la condición inicial elige una curva de la familia.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, curva, punto, rectaEquilibrio } from '../primitivas.js';
import { formula, tangente, barraValor } from '../piezas.js';

const R = String.raw;
const exp = (P0, k, P) => { const ts = [], ys = []; for (let i = 0; i <= 160; i++) { const t = P.vista.t[0] + ((P.vista.t[1] - P.vista.t[0]) * i) / 160; ts.push(t); ys.push(P0 * Math.exp(k * t)); } return [ts, ys]; };

export default definirEscena({
  alto: 440,
  entradas: [
    { id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 0.7, min: 0.1, max: 1.5, paso: 0.05 },
    { id: 'P0', tipo: 'deslizador', etiqueta: 'P_0', valor: 1.2, min: 0.2, max: 4, paso: 0.05 },
  ],
  preparar: (e) => ({ e, P: plano({ x: 70, y: 30, w: 600, h: 380 }, { t: [-1, 3], y: [-5, 6] }) }),
  vivo: [4],
  duracion: [1600, 1800, 1800, 2400, 1500, 2200],
  leyenda: (paso) => ({ campo: 'campo de pendientes', violeta: 'P = 0: equilibrio', cian: 'soluciones', ...(paso >= 3 ? { ciruela: 'k (parámetro)' } : {}), ...(paso === 4 ? { ambar: 'pendiente kP' } : {}) }),
  dibujar(g, c, { paso, p, tiempo }) {
    const { P, e } = c, q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    // k efectivo: en el paso 3 se invierte (k → −k) y se queda así solo en ese paso
    const k = paso === 3 ? mezclar(e.k, -e.k, ease(tramo(p, 0.1, 0.8))) : e.k;
    const f = (t, y) => k * y;
    ejes(g, P, { y: 'P' });
    campo(g, P, f, { p: 1, alfa: 0.5, nt: 21, ny: 17, destacar: (m) => (Math.abs(m.y) < 1e-9 ? 'violeta' : null) });
    // regiones de signo (pasos 1 y 2)
    if (paso >= 1 && paso <= 3) {
      const a1 = ease(q(1)) * 0.09, a2 = ease(q(2)) * 0.09, cArr = k > 0 ? 'verde' : 'ambar', cAb = k > 0 ? 'ambar' : 'verde';
      g.rect(P.caja.x, P.Y(6), P.caja.w, P.Y(0) - P.Y(6), { color: cArr, alfa: a1 });
      g.rect(P.caja.x, P.Y(0), P.caja.w, P.Y(-5) - P.Y(0), { color: cAb, alfa: a2 });
      if (paso >= 1) g.tex('s1', P.X(2.5), P.Y(5), k > 0 ? R`\dfrac{dP}{dt} = kP > 0` : R`\dfrac{dP}{dt} = kP < 0`, { color: k > 0 ? 'verde' : 'ambar', tam: 15, alfa: ease(q(1)) });
      if (paso >= 2) g.tex('s2', P.X(2.5), P.Y(-4), k > 0 ? R`\dfrac{dP}{dt} = kP < 0` : R`\dfrac{dP}{dt} = kP > 0`, { color: k > 0 ? 'ambar' : 'verde', tam: 15, alfa: ease(q(2)) });
      if (paso === 2) g.tex('bio', P.X(0.2), P.Y(-4.5), R`\text{(sin sentido biológico)}`, { color: 'tenue', tam: 13, ancla: 'l', alfa: ease(q(2)) });
    }
    // 0 · el equilibrio P = 0
    rectaEquilibrio(g, P, 0, { tipo: 'nodo', p: q(0), color: 'violeta' });
    formula(g, 'eq', P.X(-0.95), P.Y(0) - 16, R`P(t) = 0`, { p: q(0), tam: 16, color: 'violeta', ancla: 'l' });
    // 1 y 2 · una solución positiva y una negativa (en el paso 3, con k invertido)
    if (paso >= 1 && paso <= 3) {
      const [ts, ys] = exp(e.P0, k, P);
      curva(g, P, ts, ys, { p: paso === 1 ? p : 1 });
      punto(g, P.X(0), P.Y(e.P0), { color: 'cian' });
      if (paso >= 2) { const [t2, y2] = exp(-e.P0, k, P); curva(g, P, t2, y2, { p: paso === 2 ? p : 1 }); punto(g, P.X(0), P.Y(-e.P0), { color: 'cian' }); }
      if (paso === 3) g.tex('kk', P.X(-0.9), P.Y(5.2), R`k = ${k.toFixed(2)}`, { color: 'ciruela', tam: 18, ancla: 'l' });
    }
    // 4 · la pendiente es proporcional a P
    if (paso === 4) {
      const [ts, ys] = exp(e.P0, k, P);
      curva(g, P, ts, ys, { p: 1, alfa: 0.8 });
      const tMax = Math.log(5 / (1 + k / 2) / e.P0) / k;
      const t = mezclar(-0.9, Math.max(-0.5, tMax), (1 - Math.cos(tiempo / 1300)) / 2), y = e.P0 * Math.exp(k * t);
      barraValor(g, P, t, y, { p, rotulo: R`P`, clave: 'b' });
      tangente(g, P, t, y, k * y, { p, triangulo: true, paso: 0.5, largo: 150, etiquetaDy: R`kP\cdot\Delta t` });
      punto(g, P.X(t), P.Y(y), { color: 'cian', halo: true });
      g.tex('lec', P.X(-0.9), P.Y(5.2), R`P = ${y.toFixed(2)}\quad \text{pendiente} = kP = ${(k * y).toFixed(2)}`, { color: 'ambar', tam: 16, ancla: 'l', alfa: ease(p) });
    }
    // 5 · la condición inicial elige la curva: varias P(0) distintas
    if (paso === 5) {
      [-3, -1.5, -0.6, 0.5, 1.5, 3].forEach((P0, i) => {
        const [ts, ys] = exp(P0, k, P);
        curva(g, P, ts, ys, { p: tramo(p, 0.08 * i, 0.5 + 0.08 * i), alfa: 0.35, brillo: 0, ancho: 1.8 });
      });
      const [ts, ys] = exp(e.P0, k, P);
      curva(g, P, ts, ys, { p: 1 });
      g.linea([[P.X(0), P.caja.y], [P.X(0), P.caja.y + P.caja.h]], { color: 'texto2', ancho: 1, alfa: 0.4, guion: [3, 5] });
      punto(g, P.X(0), P.Y(e.P0), { color: 'ciruela', r: 6, halo: true });
      g.tex('p0', P.X(0) + 12, P.Y(e.P0) + 14, R`P_0 = P(0) = ${e.P0.toFixed(2)}`, { color: 'ciruela', tam: 15, ancla: 'l' });
      g.tex('arr', P.X(-0.9), P.Y(5.2), R`\text{arrastra } P_0`, { color: 'ciruela', tam: 13, ancla: 'l', alfa: ease(tramo(p, 0.5, 1)) });
    }
  },
  pasos: 6,
  asas: (c, paso) => (paso === 5 ? [{ id: 'P0', x: c.P.X(0), y: c.P.Y(c.e.P0), color: 'ciruela', mover: (x, y) => ({ P0: c.P.V(y) }) }] : []),
});
