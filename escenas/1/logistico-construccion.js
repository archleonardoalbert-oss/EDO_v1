// Construcción del modelo logístico. Izquierda: P(t) (el exponencial choca con los recursos; la capacidad N).
// Derecha: primero la tasa dP/dt contra P (lo que exigimos), luego el factor «algo» contra P (≈ 1 cerca de 0,
// negativo pasado N), la recta 1 − P/N que lo cumple, y el producto kP(1 − P/N): una parábola.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, curva, grafica, punto } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const izq = plano({ x: 55, y: 60, w: 300, h: 300 }, { t: [0, 8], y: [0, 6] });

export default definirEscena({
  alto: 440,
  entradas: [
    { id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 0.9, min: 0.2, max: 1.6, paso: 0.05 },
    { id: 'N', tipo: 'deslizador', etiqueta: 'N', valor: 4, min: 1.5, max: 5.5, paso: 0.1 },
  ],
  preparar: (e) => {
    const tasa = plano({ x: 430, y: 60, w: 290, h: 300 }, { t: [0, 6], y: [-3, 3.5] });
    const fac = plano({ x: 430, y: 60, w: 290, h: 300 }, { t: [0, 6], y: [-0.8, 1.4] });
    return { e, tasa, fac };
  },
  duracion: [2200, 1800, 1800, 1500, 1800, 1800, 2000, 2600],
  leyenda: { cian: 'población P(t)', ciruela: 'capacidad de carga N', verde: 'lo que exigimos', ambar: 'lo que no puede pasar' },
  dibujar(g, c, { paso, p }) {
    const { k, N } = c.e, q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    // ---------- izquierda: P(t)
    panel(g, { x: 30, y: 30, w: 350, h: 370 }, null, { clave: 'pi' });
    ejes(g, izq, { y: 'P', numeros: false, clave: 'ei' });
    if (paso <= 1) {
      // el exponencial atraviesa el techo de los recursos
      g.rect(izq.caja.x, izq.caja.y, izq.caja.w, izq.Y(5) - izq.caja.y, { color: 'ambar', alfa: 0.1 * ease(q(0)) });
      g.tex('rec', izq.X(4), izq.Y(5.5), R`\text{recursos insuficientes}`, { color: 'ambar', tam: 13, alfa: ease(q(0)) * (paso === 0 ? 1 : 0) });
      const fin = paso === 0 ? 8 * ease(p) : 8;
      const ts = [], ys = [];
      for (let i = 0; i <= 100; i++) { const t = (fin * i) / 100; ts.push(t); ys.push(0.3 * Math.exp(0.6 * t)); }
      curva(g, izq, ts, ys, { color: paso === 0 ? 'cian' : 'tenue', brillo: paso === 0 ? 7 : 0, alfa: paso === 0 ? 1 : 0.5 });
      if (paso === 0 && p > 0.6) g.tex('il', izq.X(5.2), izq.Y(2.4), R`\text{¡ilimitado!}`, { color: 'ambar', tam: 15, alfa: ease(tramo(p, 0.6, 0.9)) });
    }
    if (paso >= 1) {
      // capacidad de carga y el comportamiento deseado
      g.linea([[izq.caja.x, izq.Y(N)], [izq.caja.x + izq.caja.w, izq.Y(N)]], { color: 'ciruela', ancho: 1.6, guion: [6, 5], alfa: ease(q(1)) });
      g.tex('N', izq.caja.x + izq.caja.w + 6, izq.Y(N), R`N`, { color: 'ciruela', tam: 16, ancla: 'l', alfa: ease(q(1)) });
      const lg = (P0) => (t) => N / (1 + (N / P0 - 1) * Math.exp(-k * t));
      const op = paso === 7 ? { p: 1 } : { p: q(1), guion: [5, 5], brillo: 0, alfa: 0.75 };
      [0.15, 0.6, N * 1.4].forEach((P0) => grafica(g, izq, lg(P0), op));
      if (paso === 1) {
        g.tex('peq', izq.X(1.4), izq.Y(0.9), R`\text{pequeña: casi exponencial}`, { color: 'verde', tam: 12, ancla: 'l', alfa: ease(p) });
        g.tex('gra', izq.X(1.2), izq.Y(N) - 34, R`\text{grande: decrece}`, { color: 'ambar', tam: 12, ancla: 'l', alfa: ease(p) });
      }
    }
    // ---------- derecha
    if (paso >= 2 && paso <= 3) {
      const T = c.tasa;
      panel(g, { x: 405, y: 30, w: 340, h: 370 }, R`\text{tasa } \tfrac{dP}{dt} \text{ contra } P`, { clave: 'pd', p: q(2) });
      ejes(g, T, { t: 'P', y: '', numeros: false, clave: 'ed', p: q(2) });
      grafica(g, T, (P) => k * P, { p: q(2), color: 'tenue', guion: [5, 5], brillo: 0 });
      g.tex('kp', T.X(3.2), T.Y(k * 3.2) - 14, R`kP`, { color: 'tenue', tam: 14, alfa: ease(q(2)) });
      // cerca de 0: como kP (verde); pasado N: negativa (zona ámbar)
      g.linea([[T.X(0), T.Y(0)], [T.X(1), T.Y(k)]], { color: 'verde', ancho: 6, alfa: 0.55 * ease(q(2)) });
      g.rect(T.X(N), T.Y(0), T.caja.x + T.caja.w - T.X(N), T.Y(-3) - T.Y(0), { color: 'verde', alfa: 0.08 * ease(q(2)) });
      g.rect(T.X(N), T.caja.y, T.caja.x + T.caja.w - T.X(N), T.Y(0) - T.caja.y, { color: 'ambar', alfa: 0.12 * ease(q(2)) });
      g.linea([[T.X(N), T.caja.y], [T.X(N), T.caja.y + T.caja.h]], { color: 'ciruela', ancho: 1.4, guion: [5, 5], alfa: ease(q(2)) });
      g.tex('NN', T.X(N), T.Y(0) + 16, R`N`, { color: 'ciruela', tam: 15, alfa: ease(q(2)) });
      g.tex('neg', T.X((N + 6) / 2), T.Y(-1.8), R`\tfrac{dP}{dt} < 0`, { color: 'verde', tam: 14, alfa: ease(q(2)) });
      if (paso === 3) {
        formula(g, 'r1', 575, 380, R`1.\ \tfrac{dP}{dt} \approx kP \text{ si } P \text{ es pequeña}\qquad 2.\ P > N \Rightarrow \tfrac{dP}{dt} < 0`, { p, tam: 13 });
      }
    }
    if (paso >= 4 && paso <= 6) {
      const F = c.fac;
      formula(g, 'algo', 575, 18, R`\dfrac{dP}{dt} = kP\cdot(\text{algo})`, { p: q(4), tam: 17 });
      panel(g, { x: 405, y: 40, w: 340, h: 360 }, R`\text{el factor «algo» contra } P`, { clave: 'pf', p: q(4) });
      ejes(g, F, { t: 'P', y: '', numeros: false, clave: 'ef', p: q(4) });
      g.linea([[F.X(0), F.Y(1)], [F.X(6), F.Y(1)]], { color: 'tenue', ancho: 1, guion: [3, 5], alfa: ease(q(4)) });
      g.tex('uno', F.X(0) - 8, F.Y(1), '1', { color: 'tenue', tam: 13, ancla: 'r', alfa: ease(q(4)) });
      g.linea([[F.X(N), F.caja.y], [F.X(N), F.caja.y + F.caja.h]], { color: 'ciruela', ancho: 1.4, guion: [5, 5], alfa: ease(q(4)) });
      g.tex('NF', F.X(N), F.Y(0) + 16, R`N`, { color: 'ciruela', tam: 15, alfa: ease(q(4)) });
      if (paso >= 5) {
        // exigencias: ≈ 1 cerca de 0, negativo pasado N
        g.circulo(F.X(0), F.Y(1), 7, { color: 'verde', alfa: ease(q(5)) * 0.9 });
        g.linea([[F.X(0), F.Y(1)], [F.X(0.7), F.Y(1)]], { color: 'verde', ancho: 7, alfa: 0.4 * ease(q(5)) });
        g.tex('a1', F.X(0.3), F.Y(1) - 18, R`\approx 1`, { color: 'verde', tam: 15, alfa: ease(q(5)) });
        g.rect(F.X(N), F.Y(0), F.caja.x + F.caja.w - F.X(N), F.Y(-0.8) - F.Y(0), { color: 'verde', alfa: 0.1 * ease(q(5)) });
        g.tex('a2', F.X((N + 6) / 2), F.Y(-0.45), R`\text{negativo}`, { color: 'verde', tam: 14, alfa: ease(q(5)) });
      }
      if (paso >= 6) {
        grafica(g, F, (P) => 1 - P / N, { p: tramo(q(6), 0, 0.7), color: 'cian' });
        punto(g, F.X(0), F.Y(1), { color: 'cian', alfa: ease(tramo(q(6), 0.5, 1)) });
        punto(g, F.X(N), F.Y(0), { color: 'cian', alfa: ease(tramo(q(6), 0.5, 1)) });
        g.tex('lin', F.X(N * 0.45), F.Y(1 - 0.45) - 22, R`1 - \dfrac{P}{N}`, { color: 'cian', tam: 18, alfa: ease(tramo(q(6), 0.4, 1)) });
      }
    }
    if (paso === 7) {
      const T = c.tasa;
      panel(g, { x: 405, y: 30, w: 340, h: 370 }, R`f(P) = kP\left(1 - \tfrac{P}{N}\right)`, { clave: 'pp' });
      ejes(g, T, { t: 'P', y: '', numeros: false, clave: 'ep' });
      // kP (tenue) multiplicado por el factor: se dobla en una parábola
      grafica(g, T, (P) => k * P, { color: 'tenue', guion: [5, 5], brillo: 0, alfa: 1 - ease(p) * 0.6 });
      grafica(g, T, (P) => k * P * mezclar(1, 1 - P / N, ease(tramo(p, 0.1, 0.8))), { color: 'cian' });
      punto(g, T.X(N), T.Y(0), { color: 'verde', alfa: ease(tramo(p, 0.7, 1)) });
      punto(g, T.X(0), T.Y(0), { color: 'ambar', alfa: ease(tramo(p, 0.7, 1)) });
      g.tex('N7', T.X(N), T.Y(0) + 16, R`N`, { color: 'ciruela', tam: 15 });
    }
  },
  pasos: 8,
});
