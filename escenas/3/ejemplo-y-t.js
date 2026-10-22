// dy/dt = y − t: los 9 puntos de la conferencia con su valor escrito; la diagonal y = t de marcas horizontales;
// el campo completo con seis soluciones (y = t + 1 es una recta solución); regiones de subida y bajada.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, punto, curva } from '../primitivas.js';
import { direccion, formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 440, h: 380 }, { t: [-3, 3], y: [-3, 3] });
const f = (t, y) => y - t;
const NUEVE = [[-1, 1], [-1, 0], [-1, -1], [0, 1], [0, 0], [0, -1], [1, 1], [1, 0], [1, -1]];
const Y0S = [-2.5, -1.4, -0.4, 0.4, 1.4, 2.4];   // y(0) de las seis soluciones (figura 1.15)

export default definirEscena({
  alto: 460,
  entradas: [{ id: 'y0', tipo: 'deslizador', etiqueta: 'y(0)', valor: 0.5, min: -3, max: 3, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [3000, 1800, 2600, 1500, 1500, 1800],
  leyenda: { ambar: 'f(t, y) = y − t', violeta: 'diagonal y = t (pendiente 0)', cian: 'soluciones', verde: 'y = t + 1' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    // tabla de la conferencia (derecha), que se llena a la par de las marcas
    g.tex('tab', 640, 50, R`(t, y)\ \mapsto\ f(t, y) = y - t`, { color: 'texto2', tam: 14 });
    NUEVE.forEach(([t, y], i) => {
      const a = ease(tramo(q(0), i / 9 * 0.85, i / 9 * 0.85 + 0.15)), m = f(t, y);
      g.tex(`r${i}`, 640, 82 + 26 * i, R`(${t}, ${y}) \mapsto ${m}`, { color: m === 0 ? 'violeta' : 'ambar', tam: 15, alfa: a });
      const [ux, uy] = direccion(P, m), L = 24 * a;
      punto(g, P.X(t), P.Y(y), { color: 'texto', r: 3, alfa: a });
      g.linea([[P.X(t) - ux * L, P.Y(y) - uy * L], [P.X(t) + ux * L, P.Y(y) + uy * L]], { color: m === 0 ? 'violeta' : 'ambar', ancho: 3, alfa: a * (paso >= 2 ? 0.5 : 1) });
    });
    if (paso >= 1) {
      g.linea([[P.X(-3), P.Y(-3)], [P.X(3), P.Y(3)]], { color: 'violeta', ancho: 2, guion: [6, 5], alfa: ease(q(1)) });
      g.tex('diag', P.X(1.9), P.Y(1.1), R`y = t:\ \text{pendiente } 0`, { color: 'violeta', tam: 14, alfa: ease(q(1)), fondo: true });
    }
    if (paso >= 2) {
      campo(g, P, f, { p: q(2), alfa: 0.5, nt: 21, ny: 21, largo: 13, destacar: (m) => (Math.abs(m.y - m.t) < 1e-9 ? 'violeta' : null) });
      Y0S.forEach((y0, i) => solucion(g, P, f, 0, y0, { p: tramo(q(2), 0.08 * i, 0.6 + 0.08 * i), punto: false, ancho: 1.8, alfa: 0.7 }));
      curva(g, P, [-3, 3], [-2, 4], { color: 'verde', p: tramo(q(2), 0.5, 1) });
      g.tex('rec', P.X(0.6), P.Y(2.6), R`y = t + 1`, { color: 'verde', tam: 14, alfa: ease(tramo(q(2), 0.7, 1)), fondo: true });
      solucion(g, P, f, 0, c.e.y0, { p: q(2) });
    }
    if (paso >= 3) {
      const ctx = g.ctx;
      ctx.save(); ctx.beginPath(); ctx.moveTo(P.X(-3), P.Y(-3)); ctx.lineTo(P.X(3), P.Y(3)); ctx.lineTo(P.X(-3), P.Y(3)); ctx.closePath();
      ctx.fillStyle = `rgba(58,169,187,${0.1 * ease(q(3))})`; ctx.fill(); ctx.restore();
      g.tex('arr', P.X(-1.8), P.Y(2), R`f > 0:\ \text{crecen}`, { color: 'cian', tam: 15, alfa: ease(q(3)), fondo: true });
    }
    if (paso >= 4) {
      const ctx = g.ctx;
      ctx.save(); ctx.beginPath(); ctx.moveTo(P.X(-3), P.Y(-3)); ctx.lineTo(P.X(3), P.Y(3)); ctx.lineTo(P.X(3), P.Y(-3)); ctx.closePath();
      ctx.fillStyle = `rgba(208,101,108,${0.1 * ease(q(4))})`; ctx.fill(); ctx.restore();
      g.tex('aba', P.X(1.8), P.Y(-2), R`f < 0:\ \text{decrecen}`, { color: 'rojo', tam: 15, alfa: ease(q(4)), fondo: true });
    }
    if (paso === 5) {
      // dónde cruzan la diagonal las soluciones: sus mínimos (tangente horizontal)
      [...Y0S, c.e.y0].forEach((y0) => {
        // solución con y(0) = y0: y = t + 1 + (y0 − 1)e^{t}; cruza y = t cuando (y0 − 1)e^{t} = −1
        if (y0 < 1) { const t = Math.log(1 / (1 - y0)); if (t > -3 && t < 3) punto(g, P.X(t), P.Y(t), { color: 'violeta', r: 5, halo: true, alfa: ease(p) }); }
      });
      g.tex('min', P.X(1.4), P.Y(-2.6), R`\text{en la diagonal: máximos o mínimos}`, { color: 'violeta', tam: 13, alfa: ease(p), fondo: true });
    }
  },
  pasos: 6,
  asas: (c, paso) => (paso >= 2 ? [{ id: 'y0', x: P.X(0), y: P.Y(c.e.y0), color: 'cian', mover: (x, y) => ({ y0: P.V(y) }) }] : []),
});
