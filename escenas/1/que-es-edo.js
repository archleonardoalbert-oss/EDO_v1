// ¿Qué es una EDO? La ecuación dy/dt = 2y como regla de inclinación: en cada punto, la tangente sube el doble
// de la altura. Conociendo esa regla, la curva se «predice» siguiendo las tangentes.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, curva, punto } from '../primitivas.js';
import { formula, tangente, barraValor, franja } from '../piezas.js';

const R = String.raw;
const f = (t, y) => 2 * y;

export default definirEscena({
  alto: 440,
  entradas: [{ id: 'y0', tipo: 'deslizador', etiqueta: 'y(0)', valor: 0.6, min: 0.1, max: 2, paso: 0.05 }],
  preparar: (e) => {
    const P = plano({ x: 70, y: 40, w: 620, h: 360 }, { t: [-1.2, 1.4], y: [-0.5, 8] });
    // instante en que la solución sale por arriba (para que el punto móvil no se escape)
    const tTope = Math.min(1.35, Math.log(7.6 / e.y0) / 2);
    // el punto móvil no sube de y = 4.5: así su triángulo de pendiente (que sube y/2) cabe en la vista
    const tMovil = Math.min(1.3, Math.log(4.5 / e.y0) / 2);
    return { e, P, tTope, tMovil };
  },
  vivo: [3, 4],
  duracion: [1800, 1800, 1600, 1400, 1400, 3200],
  leyenda: (paso) => ({ campo: 'campo de pendientes', cian: 'la solución y(t)', ...(paso >= 3 ? { ciruela: 'el valor y' } : {}), ...(paso >= 4 ? { ambar: 'la tangente: dy/dt' } : {}) }),
  capas: [
    // 0 · Galileo: el lenguaje (el campo de instrucciones) aparece
    (g, c, o) => {
      ejes(g, c.P, { p: o.p });
      campo(g, c.P, f, { p: o.p, alfa: o.actual ? 0.85 : 0.45, nt: 25, ny: 17 });
    },
    // 1 · una función desconocida y sus derivadas
    (g, c, o) => {
      const q = o.actual ? o.p : 1;
      if (o.paso === 1) {
        // siluetas de candidatas: no sabemos cuál es
        [[-0.6, 2.2, 1.2], [0.2, 3.5, -0.8], [-1, 5.5, 0.6]].forEach(([a, b, k], i) => {
          const ts = [], ys = [];
          for (let s = 0; s <= 60; s++) { const t = -1.2 + (2.6 * s) / 60; ts.push(t); ys.push(b + k * Math.sin(2 * (t - a)) + 0.4 * t); }
          curva(g, c.P, ts, ys, { p: tramo(q, 0.1 * i, 0.6 + 0.1 * i), color: 'tenue', guion: [6, 6], brillo: 0, ancho: 1.8 });
        });
        formula(g, 'inc', c.P.X(0.55), c.P.Y(7.2), R`y(t) = \;?`, { p: tramo(q, 0.3, 0.8), tam: 24, color: 'cian' });
        formula(g, 'rel', c.P.X(0.55), c.P.Y(6.2), R`\text{relación entre } y \text{ y } \tfrac{dy}{dt}`, { p: tramo(q, 0.5, 1), tam: 16, color: 'texto2' });
      }
    },
    // 2 · el ejemplo: dy/dt = 2y y la solución que pasa por (0, y0)
    (g, c, o) => {
      formula(g, 'ec', c.P.X(-0.55), c.P.Y(7.2), R`\dfrac{dy}{dt} = 2y`, { p: o.actual ? o.p : 1, tam: 26 });
      solucion(g, c.P, f, 0, c.e.y0, { p: o.actual ? o.p : 1 });
    },
    // 3 · y(t): la función desconocida, leída como altura
    (g, c, o) => {
      if (o.paso > 3) return;
      const t = movil(c, o.tiempo), y = c.e.y0 * Math.exp(2 * t);
      barraValor(g, c.P, t, y, { p: o.p, rotulo: R`y(t)`, clave: 'b3' });
      punto(g, c.P.X(t), c.P.Y(y), { color: 'cian', alfa: ease(o.p), halo: true });
      g.texto(c.P.X(t), c.P.Y(-0.5) + 30, `t = ${t.toFixed(2)}`, { color: 'tenue', tam: 11, alfa: ease(o.p) });
    },
    // 4 · dy/dt: la tangente sube el doble de la altura
    (g, c, o) => {
      const t = o.paso === 4 ? movil(c, o.tiempo) : 0, y = c.e.y0 * Math.exp(2 * t);
      const q = o.paso === 4 ? o.p : 1, alfa = o.paso === 4 ? 1 : 0.0;
      if (alfa === 0) return;
      barraValor(g, c.P, t, y, { p: 1, rotulo: R`y`, clave: 'b4' });
      tangente(g, c.P, t, y, 2 * y, { p: q, triangulo: true, paso: 0.25, largo: 170, etiquetaDy: R`2y\cdot\Delta t` });
      punto(g, c.P.X(t), c.P.Y(y), { color: 'cian', halo: true });
      g.tex('lectura', c.P.X(0.55), c.P.Y(7.2), R`y = ${y.toFixed(2)} \;\Rightarrow\; \tfrac{dy}{dt} = 2y = ${(2 * y).toFixed(2)}`, { color: 'ambar', tam: 17, alfa: ease(q) });
    },
    // 5 · conociendo cómo cambia, predecimos: el futuro se traza siguiendo tangentes
    (g, c, o) => {
      const q = o.p, ahora = 0;
      franja(g, c.P, ahora, 2, { color: 'cian', alfa: 0.06 * ease(tramo(q, 0, 0.2)) });
      g.linea([[c.P.X(ahora), c.P.caja.y], [c.P.X(ahora), c.P.caja.y + c.P.caja.h]], { color: 'texto2', ancho: 1, alfa: 0.5, guion: [3, 5] });
      g.tex('ahora', c.P.X(ahora) + 6, c.P.caja.y + 12, R`\text{ahora}`, { color: 'texto2', tam: 13, ancla: 'l' });
      g.tex('futuro', c.P.X(0.9), c.P.caja.y + 12, R`\text{futuro predicho}`, { color: 'cian', tam: 13, alfa: ease(tramo(q, 0.2, 0.5)) });
      // la punta avanza hacia el futuro con su tangente pegada
      const tf = ahora + (c.tTope - ahora) * ease(tramo(q, 0.15, 1)), yf = c.e.y0 * Math.exp(2 * tf);
      if (q < 1) tangente(g, c.P, tf, yf, 2 * yf, { p: 1, largo: 110, alfa: 0.9 });
      const ts = [], ys = [];
      for (let s = 0; s <= 80; s++) { const t = ahora + ((tf - ahora) * s) / 80; ts.push(t); ys.push(c.e.y0 * Math.exp(2 * t)); }
      curva(g, c.P, ts, ys, { color: 'cian', ancho: 3.4, brillo: 12 });
      punto(g, c.P.X(tf), c.P.Y(yf), { color: 'cian', halo: true });
    },
  ],
  asas: (c) => [{ id: 'y0', x: c.P.X(0), y: c.P.Y(c.e.y0), color: 'cian', mover: (x, y) => ({ y0: c.P.V(y) }) }],
});

/** Instante del punto móvil: va y viene suavemente por la parte visible de la solución. */
function movil(c, tiempo) {
  const s = (1 - Math.cos((tiempo / 1000) * 0.9)) / 2;
  return -1 + (c.tMovil + 1) * s;
}
