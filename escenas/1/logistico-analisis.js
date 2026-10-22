// Análisis cualitativo del logístico. Arriba a la izquierda, f(P) (la parábola de la conferencia) con las
// flechas de su signo sobre el eje P; a la derecha, el plano t–P con su línea de fase vertical y las soluciones.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica, solucion, rectaEquilibrio, lineaFase, punto, curva } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 1, min: 0.3, max: 2, paso: 0.05 },
    { id: 'N', tipo: 'deslizador', etiqueta: 'N', valor: 3, min: 1.5, max: 4, paso: 0.1 },
    { id: 'P0', tipo: 'deslizador', etiqueta: 'P(0)', valor: 0.3, min: -0.8, max: 5, paso: 0.05 },
  ],
  preparar: (e) => {
    const A = plano({ x: 50, y: 50, w: 270, h: 170 }, { t: [-0.8, 5], y: [-2.2, 1.6] });
    const B = plano({ x: 440, y: 40, w: 290, h: 370 }, { t: [0, 6], y: [-1, 5] });
    const f = (P) => e.k * P * (1 - P / e.N);
    return { e, A, B, f, ft: (t, P) => f(P), eqs: [{ y: 0, tipo: 'fuente' }, { y: e.N, tipo: 'sumidero' }] };
  },
  vivo: [5, 6, 7],
  duracion: [1800, 1500, 1800, 2000, 1600, 2400, 2600, 3000, 2400],
  leyenda: (paso) => ({ cian: 'soluciones P(t)', ...(paso >= 4 ? { verde: 'N: estable', ambar: '0: inestable' } : {}) }),
  dibujar(g, c, { paso, p, tiempo }) {
    const { A, B, f, e } = c, q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    // ---- fórmulas (abajo a la izquierda): no linealidad y la idea del análisis
    formula(g, 'nl', 185, 285, R`\dfrac{dP}{dt} = kP - \dfrac{k}{N}\htmlClass{k-ambar}{P^2}`, { p: q(0), tam: 20 });
    if (paso >= 0) g.tex('nl2', 185, 325, R`P^2 \Rightarrow \textbf{no lineal}`, { color: 'ambar', tam: 14, alfa: ease(tramo(q(0), 0.5, 1)) });
    if (paso >= 1) g.tex('dif', 185, 362, R`\text{fórmula: difícil}\quad\longrightarrow\quad \text{geometría: muy útil}`, { color: 'texto2', tam: 13, alfa: ease(q(1)) });
    // ---- f(P): la parábola
    if (paso >= 2) {
      panel(g, { x: 25, y: 25, w: 340, h: 220 }, R`f(P) = kP\left(1 - \tfrac{P}{N}\right)`, { p: q(2), clave: 'pa' });
      ejes(g, A, { t: 'P', y: '', numeros: false, clave: 'ea', p: q(2), rejilla: false });
      // relleno del signo (paso 3): encima del eje crece, debajo decrece
      if (paso >= 3) {
        const a = ease(q(3));
        relleno(g, A, f, 0, e.N, 'cian', 0.16 * a);
        relleno(g, A, f, e.N, 5, 'rojo', 0.14 * a);
        relleno(g, A, f, -0.8, 0, 'rojo', 0.14 * a);
        lineaFase(g, { f, eqs: c.eqs, coord: A.X, desde: A.X(-0.8), hasta: A.X(5), otra: A.Y(0), rango: [-0.8, 5], orientacion: 'horizontal', p: q(3), rotular: false, particulas: false, clave: 'lfa' });
        g.tex('cr', A.X(e.N / 2), A.Y(f(e.N / 2)) - 14, R`f > 0:\ \text{crece}`, { color: 'cian', tam: 12, alfa: a });
        g.tex('de', A.X(4.2), A.Y(-1.2), R`f < 0`, { color: 'rojo', tam: 12, alfa: a });
      }
      grafica(g, A, f, { p: q(2), color: 'texto', brillo: 3, ancho: 2 });
      g.tex('r0', A.X(0) - 4, A.Y(0) + 15, '0', { color: 'texto2', tam: 13, ancla: 'r', alfa: ease(q(2)) });
      g.tex('rN', A.X(e.N), A.Y(0) + 15, 'N', { color: 'ciruela', tam: 14, alfa: ease(q(2)) });
      punto(g, A.X(0), A.Y(0), { color: paso >= 5 ? 'ambar' : 'texto', alfa: ease(q(2)), r: 4 });
      punto(g, A.X(e.N), A.Y(0), { color: paso >= 6 ? 'verde' : 'texto', alfa: ease(q(2)), r: 4 });
    }
    // ---- plano t–P con la línea de fase
    if (paso >= 4) {
      ejes(g, B, { y: 'P', clave: 'eb', p: q(4), numeros: false });
      g.tex('bN', B.caja.x + B.caja.w + 8, B.Y(e.N), 'N', { color: 'verde', tam: 15, ancla: 'l', alfa: ease(q(4)) });
      rectaEquilibrio(g, B, 0, { tipo: 'fuente', p: q(4) });
      rectaEquilibrio(g, B, e.N, { tipo: 'sumidero', p: q(4) });
      lineaFase(g, { f, eqs: c.eqs, coord: B.Y, desde: B.Y(-1), hasta: B.Y(5), otra: 395, rango: [-1, 5], p: q(4), tiempo: paso >= 5 ? tiempo : null, clave: 'lfb', rotular: false });
      if (paso === 4) formula(g, 'ceq', B.X(3), B.Y(4.5), R`P(t) = 0 \ \text{ y } \ P(t) = N`, { p, tam: 16 });
    }
    if (paso === 5) {
      // cerca de 0: se aleja
      [0.08, 0.2].forEach((P0, i) => solucion(g, B, c.ft, 0, P0, { p: tramo(p, 0.1 * i, 0.8), sentido: 'adelante' }));
      solucion(g, B, c.ft, 0, -0.08, { p: tramo(p, 0.2, 0.9), sentido: 'adelante' });
      g.tex('ale', B.X(3), B.Y(4.3), R`\text{se «aleja» del } 0 \Rightarrow \textbf{inestable}`, { color: 'ambar', tam: 14, alfa: ease(tramo(p, 0.5, 1)) });
    }
    if (paso === 6) {
      [e.N - 0.6, e.N + 0.8].forEach((P0, i) => solucion(g, B, c.ft, 0, P0, { p: tramo(p, 0.1 * i, 0.8), sentido: 'adelante' }));
      g.tex('ace', B.X(3), B.Y(e.N + 1.5), R`\text{se «acerca» a } N \Rightarrow \textbf{estable}`, { color: 'verde', tam: 14, alfa: ease(tramo(p, 0.5, 1)) });
    }
    if (paso >= 7) {
      const P0s = [0.05, 0.15, 0.4, 1, 1.8, e.N + 0.6, e.N + 1.4, -0.05, -0.3];
      P0s.forEach((P0, i) => solucion(g, B, c.ft, 0, P0, { p: paso === 7 ? tramo(p, 0.05 * i, 0.6 + 0.05 * i) : 1, sentido: 'adelante', alfa: 0.55, brillo: 0, ancho: 1.8, punto: false }));
      solucion(g, B, c.ft, 0, e.P0, { sentido: 'adelante' });
      if (paso === 7) formula(g, 'todas', B.X(3), B.Y(4.6), R`\text{«Todas con } P(0) > 0 \text{ tienden a } N\text{»}`, { p: tramo(p, 0.4, 1), tam: 14 });
    }
    if (paso === 8) {
      // comparación con el exponencial: sin freno frente a un techo N
      const ts = [], ys = [];
      for (let i = 0; i <= 100; i++) { const t = (6 * i) / 100; ts.push(t); ys.push(e.P0 > 0 ? e.P0 * Math.exp(e.k * t) : NaN); }
      if (e.P0 > 0) curva(g, B, ts, ys, { color: 'ambar', guion: [6, 5], brillo: 0, p });
      g.tex('cmp1', B.X(3), B.Y(4.6), R`\text{exponencial: sin límite}`, { color: 'ambar', tam: 13, alfa: ease(p) });
      g.tex('cmp2', B.X(3.6), B.Y(e.N) - 16, R`\text{logístico: límite superior } N`, { color: 'verde', tam: 13, alfa: ease(p) });
    }
  },
  pasos: 9,
  asas: (c, paso) => (paso >= 7 ? [{ id: 'P0', x: c.B.X(0), y: c.B.Y(c.e.P0), color: 'cian', mover: (x, y) => ({ P0: c.B.V(y) }) }] : []),
});

/** Relleno entre la gráfica de f y el eje horizontal, para u en [a, b]. */
function relleno(g, P, f, a, b, color, alfa) {
  if (alfa <= 0) return;
  const c = g.ctx;
  c.save(); c.beginPath(); c.moveTo(P.X(a), P.Y(0));
  for (let i = 0; i <= 60; i++) { const u = a + ((b - a) * i) / 60; c.lineTo(P.X(u), P.Y(Math.max(P.vista.y[0], Math.min(P.vista.y[1], f(u))))); }
  c.lineTo(P.X(b), P.Y(0)); c.closePath();
  c.fillStyle = color === 'rojo' ? `rgba(208,101,108,${alfa})` : `rgba(58,169,187,${alfa})`; c.fill(); c.restore();
}
