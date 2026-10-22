// Separación de variables como igualdad de áreas: ∫ 1/h(y) dy (violeta, recorre y) = ∫ g(t) dt (ámbar, recorre t).
// Cuando t avanza, el área de g crece y y avanza justo lo necesario para que el área de 1/h la iguale: eso
// dibuja la solución. La justificación: d/dt H(y(t)) = g(t), «la misma integral».
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar, solucionCache } from '../../motor/plano.js';
import { ejes, grafica, solucion, punto, curva } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 50, w: 290, h: 135 }, { t: [0, 4], y: [0, 3] });     // 1/h(y) (o h) contra y
const B = plano({ x: 50, y: 265, w: 290, h: 135 }, { t: [-2, 2], y: [-2.2, 2.2] }); // g(t) contra t
const C = plano({ x: 420, y: 50, w: 310, h: 350 }, { t: [-2, 2], y: [0, 4] });   // plano t–y

/** Integral de fn en [a, b] (trapecios). */
const integral = (fn, a, b, n = 200) => { let s = 0; for (let i = 0; i < n; i++) { const x0 = a + ((b - a) * i) / n, x1 = a + ((b - a) * (i + 1)) / n; s += ((fn(x0) + fn(x1)) / 2) * (x1 - x0); } return s; };
/** Área sombreada bajo fn en [a, b] del plano P. */
function area(g, P, fn, a, b, color, alfa) {
  if (Math.abs(b - a) < 1e-9) return;
  const c = g.ctx, [lo, hi] = P.vista.y;
  c.save(); c.beginPath(); c.moveTo(P.X(a), P.Y(0));
  for (let i = 0; i <= 80; i++) { const u = a + ((b - a) * i) / 80; c.lineTo(P.X(u), P.Y(Math.max(lo, Math.min(hi, fn(u))))); }
  c.lineTo(P.X(b), P.Y(0)); c.closePath();
  c.fillStyle = color === 'violeta' ? `rgba(125,108,196,${alfa})` : `rgba(201,148,72,${alfa})`; c.fill(); c.restore();
}

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 'g', tipo: 'funcion', etiqueta: R`g(t) =`, valor: 't', vars: ['t'], ejemplos: ['t', 'cos(t)', '1', 't^2'] },
    { id: 'h', tipo: 'funcion', etiqueta: R`h(y) =`, valor: 'y', vars: ['y'], ejemplos: ['y', 'y^2', 'y(1-y/4)', 'sqrt(y)'] },
    { id: 'y0', tipo: 'deslizador', etiqueta: R`y(0)`, valor: 0.6, min: 0.2, max: 3, paso: 0.05 },
  ],
  validar: (e) => (Math.abs(e.hF(e.y0)) < 1e-9 ? 'h(y(0)) = 0: ahí no se puede dividir (es un equilibrio)' : null),
  preparar: (e) => {
    const g = (t) => e.gF(t), h = (y) => e.hF(y), f = (t, y) => g(t) * h(y);
    const s = solucionCache(f, 0, e.y0, C);
    return { e, g, h, f, s, yDe: (t) => interp(s.adelante, t) };
  },
  vivo: [2, 3, 4],
  duracion: [1600, 2000, 1800, 1800, 1800],
  leyenda: { ambar: 'g(t) y su área', violeta: '1/h(y) y su área', cian: 'la solución y(t)' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    formula(g, 'ec', 385, 22, paso === 0 ? R`\dfrac{dy}{dt} = \htmlClass{k-ambar}{g(t)}\cdot\htmlClass{k-violeta}{h(y)}` : R`\htmlClass{k-violeta}{\dfrac{1}{h(y)}\,dy} = \htmlClass{k-ambar}{g(t)\,dt}`, { tam: 17 });
    panel(g, { x: 25, y: 38, w: 335, h: 168 }, paso === 0 ? R`h(y)` : R`\tfrac{1}{h(y)}`, { clave: 'pa' });
    panel(g, { x: 25, y: 245, w: 335, h: 175 }, R`g(t)`, { clave: 'pb' });
    ejes(g, A, { t: 'y', y: '', numeros: false, rejilla: false, clave: 'ea' });
    ejes(g, B, { y: '', numeros: false, rejilla: false, clave: 'eb' });
    // 0–1 · h se convierte en 1/h
    const m = ease(q(1));
    grafica(g, A, (y) => mezclar(c.h(y), 1 / c.h(y), m), { color: 'violeta', brillo: 2 });
    grafica(g, B, c.g, { color: 'ambar', brillo: 2 });
    if (paso >= 2) {
      // el instante actual: va y viene entre 0 y el final de la solución
      const tFin = Math.min(1.95, c.s.adelante.t.at(-1) - 0.01);
      const t = paso === 2 && p < 1 ? tFin * ease(p) : tFin * (1 - Math.cos(tiempo / 1600)) / 2;
      const y = c.yDe(t);
      const aG = integral(c.g, 0, t), aH = integral((u) => 1 / c.h(u), c.e.y0, y);
      area(g, B, c.g, 0, t, 'ambar', 0.45);
      area(g, A, (u) => 1 / c.h(u), c.e.y0, y, 'violeta', 0.45);
      g.linea([[A.X(c.e.y0), A.caja.y], [A.X(c.e.y0), A.caja.y + A.caja.h]], { color: 'texto2', ancho: 1, guion: [3, 4], alfa: 0.6 });
      g.linea([[A.X(y), A.caja.y], [A.X(y), A.caja.y + A.caja.h]], { color: 'cian', ancho: 1.6 });
      g.linea([[B.X(t), B.caja.y], [B.X(t), B.caja.y + B.caja.h]], { color: 'texto', ancho: 1.6 });
      g.tex('ay', A.X(y), A.caja.y + A.caja.h + 12, R`y = ${y.toFixed(2)}`, { color: 'cian', tam: 13 });
      g.tex('at', B.X(t), B.caja.y + B.caja.h + 12, R`t = ${t.toFixed(2)}`, { color: 'texto', tam: 13 });
      g.tex('igual', 192, 228, R`\htmlClass{k-violeta}{${aH.toFixed(3)}} = \htmlClass{k-ambar}{${aG.toFixed(3)}}`, { tam: 16 });
      // 3 · la solución en el plano t–y, dibujada por la igualdad de áreas
      if (paso >= 3) {
        panel(g, { x: 395, y: 38, w: 350, h: 382 }, R`y(t)`, { clave: 'pc', p: q(3) });
        ejes(g, C, { numeros: false, rejilla: false, clave: 'ec', p: q(3) });
        for (const y0 of [0.3, 1, 1.6, 2.4]) solucion(g, C, c.f, 0, y0, { alfa: 0.25 * ease(q(3)), brillo: 0, ancho: 1.4, punto: false, sentido: 'adelante' });
        const k = c.s.adelante.t.findIndex((x) => x > t);
        curva(g, C, c.s.adelante.t.slice(0, k < 0 ? undefined : k), c.s.adelante.y.slice(0, k < 0 ? undefined : k), { alfa: ease(q(3)) });
        punto(g, C.X(t), C.Y(y), { color: 'cian', halo: true, alfa: ease(q(3)) });
        g.linea([[C.X(t), C.Y(y)], [C.X(t), C.Y(0)]], { color: 'texto', ancho: 1, alfa: 0.4 });
      }
      // 4 · justificación: d/dt H(y(t)) = g(t)
      if (paso === 4) formula(g, 'cad', 575, 74, R`\dfrac{d}{dt}H(y(t)) = \tfrac{1}{h(y)}\,y' = \tfrac{1}{h(y)}\,g(t)h(y) = g(t)`, { p, tam: 14 });
    }
  },
  pasos: 5,
});

/** Valor interpolado de una curva {t[], y[]} en t (t creciente). */
function interp(cv, t) {
  const { t: ts, y: ys } = cv;
  if (t <= ts[0]) return ys[0];
  for (let i = 1; i < ts.length; i++) if (ts[i] >= t) { const s = (t - ts[i - 1]) / (ts[i] - ts[i - 1]); return ys[i - 1] + s * (ys[i] - ys[i - 1]); }
  return ys.at(-1);
}
