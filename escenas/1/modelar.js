// Modelar = traducir. A la derecha crece el «diccionario» (lo traducido queda escrito); a la izquierda, la
// ilustración del paso: el sistema y sus factores, variables y parámetros, la razón de cambio como pendiente,
// velocidad y aceleración de un coche, y la proporcionalidad A = kB.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, curva, punto, grafica } from '../primitivas.js';
import { formula, tangente, azar } from '../piezas.js';

const R = String.raw;
const FILAS = [
  [R`\text{suposiciones}`, R`\text{¿qué factores influyen?}`],
  [R`t,\; y,\; k,\; N`, R`\text{variables y parámetros}`],
  [R`\text{«razón de cambio de } y\text{»}`, R`\dfrac{dy}{dt}`],
  [R`\text{velocidad},\ \text{aceleración}`, R`v = \dfrac{dx}{dt},\; a = \dfrac{dv}{dt}`],
  [R`\text{«}A \text{ proporcional a } B\text{»}`, R`A = kB`],
];

export default definirEscena({
  alto: 430,
  entradas: [{ id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 1.5, min: -2, max: 3, paso: 0.1 }],
  preparar: (e) => ({ e, P: plano({ x: 60, y: 70, w: 340, h: 290 }, { t: [0, 4], y: [0, 4] }) }),
  vivo: true,
  duracion: 1500,
  leyenda: { cian: 'la cantidad estudiada', ambar: 'su razón de cambio', ciruela: 'parámetro' },
  capas: FILAS.map((fila, i) => (g, c, o) => {
    // diccionario: la fila i queda escrita
    const q = o.actual ? o.p : 1, y = 70 + 66 * i;
    g.tex(`d${i}a`, 455, y, fila[0], { color: 'texto2', tam: 14, ancla: 'l', alfa: ease(q) });
    g.flecha(455, y + 22, 485, y + 22, { color: 'tenue', alfa: ease(tramo(q, 0.3, 0.6)), ancho: 1.4, punta: 6 });
    g.tex(`d${i}b`, 495, y + 22, fila[1], { color: i === 4 ? 'ciruela' : 'ambar', tam: 17, ancla: 'l', alfa: ease(tramo(q, 0.4, 1)) });
    if (o.paso === i) ILUSTRACIONES[i](g, c, o);
  }),
});

const ILUSTRACIONES = [
  // el sistema: un estanque con peces; entran nacimientos, salen muertes
  (g, c, o) => {
    const q = ease(o.p), cx = 230, cy = 215, s = o.tiempo / 1000;
    g.ctx.save(); g.ctx.globalAlpha = q; g.ctx.fillStyle = '#0d2a33'; g.ctx.beginPath(); g.ctx.ellipse(cx, cy, 150, 95, 0, 0, Math.PI * 2); g.ctx.fill(); g.ctx.restore();
    for (let i = 0; i < 26; i++) {
      const a = azar(i) * 6.28 + s * (0.2 + azar(i + 50) * 0.3), r = 0.25 + 0.65 * azar(i + 9);
      g.circulo(cx + Math.cos(a) * 130 * r, cy + Math.sin(a) * 78 * r, 3, { color: 'cian', alfa: q });
    }
    g.flecha(40, 120, 110, 160, { color: 'verde', alfa: q, ancho: 2.5 });
    g.tex('nac', 40, 104, R`\text{nacimientos}`, { color: 'verde', tam: 13, ancla: 'l', alfa: q });
    g.flecha(350, 270, 420, 320, { color: 'ambar', alfa: q, ancho: 2.5 });
    g.tex('mue', 330, 340, R`\text{muertes, pesca…}`, { color: 'ambar', tam: 13, ancla: 'l', alfa: q });
    g.tex('pre', 230, 60, R`\text{¿Cómo se comporta el sistema?}`, { color: 'texto', tam: 15, alfa: q });
  },
  // variables y parámetros
  (g, c, o) => {
    ejes(g, c.P, { p: o.p });
    grafica(g, c.P, (t) => 3.6 / (1 + 8 * Math.exp(-1.6 * t)), { p: o.p });
    g.linea([[c.P.X(0), c.P.Y(3.6)], [c.P.X(4), c.P.Y(3.6)]], { color: 'ciruela', ancho: 1.4, alfa: 0.7 * ease(o.p), guion: [5, 5] });
    g.tex('N', c.P.X(4) - 4, c.P.Y(3.6) - 12, R`N`, { color: 'ciruela', tam: 15, ancla: 'r', alfa: ease(o.p) });
    g.tex('lt', c.P.X(2), c.P.Y(0) + 34, R`t:\ \text{tiempo}`, { color: 'texto', tam: 14, alfa: ease(o.p) });
    g.tex('ly', c.P.X(1.4), c.P.Y(2.6), R`y(t):\ \text{la cantidad}`, { color: 'cian', tam: 14, ancla: 'r', alfa: ease(o.p) });
  },
  // la razón de cambio es la pendiente de la tangente
  (g, c, o) => {
    const y = (t) => 3.6 / (1 + 8 * Math.exp(-1.6 * t)), dy = (t) => 1.6 * y(t) * (1 - y(t) / 3.6);
    ejes(g, c.P, { p: 1 });
    grafica(g, c.P, y, { p: 1, alfa: 0.8 });
    const t = 0.6 + 2.6 * (1 - Math.cos(o.tiempo / 1400)) / 2;
    tangente(g, c.P, t, y(t), dy(t), { p: o.p, triangulo: true, paso: 0.5, largo: 120, etiquetaDy: R`\tfrac{dy}{dt}\,\Delta t` });
    punto(g, c.P.X(t), c.P.Y(y(t)), { color: 'cian' });
    g.tex('rc', c.P.X(2), 48, R`\text{razón de cambio} = \text{pendiente} = ${dy(t).toFixed(2)}`, { color: 'ambar', tam: 15, alfa: ease(o.p) });
  },
  // un coche: posición, velocidad, aceleración
  (g, c, o) => {
    const T = 4 * ((o.tiempo / 1000 / 5) % 1), x = (t) => 0.22 * t * t, v = (t) => 0.44 * t;
    const X = (u) => 60 + 85 * u, yRoad = 140, q = ease(o.p);
    g.linea([[50, yRoad + 12], [410, yRoad + 12]], { color: 'eje', ancho: 2, alfa: q });
    for (let u = 0; u <= 4; u++) g.texto(X(u), yRoad + 26, String(u), { color: 'tenue', tam: 11, alfa: q });
    g.tex('xx', 410, yRoad + 34, R`x`, { color: 'texto2', tam: 14, alfa: q });
    const px = X(x(T));
    g.rect(px - 16, yRoad - 6, 32, 14, { color: 'cian', alfa: q, radio: 4 });
    g.circulo(px - 9, yRoad + 9, 3.5, { color: 'texto', alfa: q }); g.circulo(px + 9, yRoad + 9, 3.5, { color: 'texto', alfa: q });
    g.flecha(px, yRoad - 22, px + 40 * v(T), yRoad - 22, { color: 'ambar', ancho: 2.6, alfa: q });
    g.tex('vv', px, yRoad - 40, R`v = \tfrac{dx}{dt}`, { color: 'ambar', tam: 13, alfa: q });
    g.flecha(px, yRoad - 62, px + 40 * 0.44, yRoad - 62, { color: 'violeta', ancho: 2.6, alfa: q });
    g.tex('aa', px + 24, yRoad - 76, R`a = \tfrac{dv}{dt}`, { color: 'violeta', tam: 13, alfa: q, ancla: 'l' });
    // gráfica de la posición contra el tiempo, con su tangente = velocidad
    const P2 = plano({ x: 70, y: 210, w: 320, h: 160 }, { t: [0, 4], y: [0, 4] });
    ejes(g, P2, { p: 1, y: 'x', clave: 'e2', numeros: false, rejilla: false });
    grafica(g, P2, x, { p: 1 });
    tangente(g, P2, T, x(T), v(T), { largo: 90, p: 1 });
    punto(g, P2.X(T), P2.Y(x(T)), { color: 'cian' });
  },
  // A = kB: proporcionalidad como recta por el origen
  (g, c, o) => {
    const P = plano({ x: 60, y: 70, w: 340, h: 290 }, { t: [0, 4], y: [-4, 8] });
    ejes(g, P, { p: o.p, t: 'B', y: 'A', clave: 'eAB' });
    grafica(g, P, (b) => c.e.k * b, { p: o.p, color: 'ciruela' });
    const b = 2.5;
    punto(g, P.X(b), P.Y(c.e.k * b), { color: 'ciruela' });
    formula(g, 'akb', P.X(2.8), P.Y(7), R`A = ${c.e.k.toFixed(1)}\,B`, { p: o.p, tam: 18, color: 'ciruela' });
    g.tex('dup', P.X(1.4), P.Y(-3), R`\text{duplicar } B \Rightarrow \text{duplicar } A`, { color: 'texto2', tam: 13, alfa: ease(tramo(o.p, 0.5, 1)) });
  },
];
