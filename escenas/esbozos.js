// Fábricas de escenas para las soluciones de «esboce…» de las clases prácticas. Construyen el dibujo en el orden
// en que se haría a mano, una capa por paso de la solución.
import { definirEscena } from './comun.js';
import { plano, ease, tramo } from '../motor/plano.js';
import { ejes, campo, solucion, punto, rectaEquilibrio, lineaFase, equilibrios } from './primitivas.js';
import { direccion, formula, poligonoEuler, tabla } from './piezas.js';
import { euler as eulerNum } from '../motor/numerico.js';

const R = String.raw;

/** Segmentos de la curva de nivel f(t, y) = c (cuadrados en marcha sobre una rejilla). */
export function nivel(f, P, c, n = 90) {
  const [a, b] = P.vista.t, [lo, hi] = P.vista.y, dt = (b - a) / n, dy = (hi - lo) / n, segs = [];
  const v = (i, j) => f(a + i * dt, lo + j * dy) - c;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const esq = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([x, y]) => ({ x, y, v: v(x, y) }));
    if (esq.some((e) => !Number.isFinite(e.v) || Math.abs(e.v) > 50)) continue;
    const pts = [];
    for (let k = 0; k < 4; k++) {
      const p1 = esq[k], p2 = esq[(k + 1) % 4];
      if ((p1.v < 0) !== (p2.v < 0)) { const s = p1.v / (p1.v - p2.v); pts.push([a + (p1.x + s * (p2.x - p1.x)) * dt, lo + (p1.y + s * (p2.y - p1.y)) * dy]); }
    }
    if (pts.length >= 2) segs.push([pts[0], pts[1]]);
    if (pts.length === 4) segs.push([pts[2], pts[3]]);
  }
  return segs;
}

/**
 * Esbozo de un campo (CP3 ej. 1): red de la conferencia con sus valores → marcas en la red → isoclinas
 * (curvas f = c con su pendiente) → campo denso → soluciones.
 */
export function esbozo({ f, tex, vista = { t: [-2.5, 2.5], y: [-2.5, 2.5] }, isoclinas = [0], soluciones = [], alto = 450 }) {
  const P = plano({ x: 70, y: 40, w: 600, h: 370 }, vista);
  const RED = [-2, -1, 0, 1, 2];
  return definirEscena({
    alto,
    preparar: () => ({ niveles: isoclinas.map((c) => ({ c, segs: nivel(f, P, c) })) }),
    duracion: [2600, 2400, 2400, 2400, 2600],
    leyenda: { ambar: 'valores en la red', violeta: 'isoclinas f = c', campo: 'campo de pendientes', cian: 'soluciones' },
    capas: [
      (g, c, o) => {
        ejes(g, P, { marcasT: RED, marcasY: RED });
        formula(g, 'ec', 380, 20, R`\dfrac{dy}{dt} = ${tex}`, { tam: 16 });
        RED.forEach((t, i) => RED.forEach((y, j) => {
          const a = ease(tramo(o.p, ((i * 5 + j) / 25) * 0.7, ((i * 5 + j) / 25) * 0.7 + 0.3)), m = f(t, y);
          punto(g, P.X(t), P.Y(y), { color: 'texto', r: 3, alfa: a });
          g.texto(P.X(t) + 12, P.Y(y) - 11, Number.isFinite(m) ? String(Number(m.toFixed(2))).replace('-', '−') : '∄', { color: 'ambar', tam: 11, alfa: a * (o.paso > 1 ? 0.45 : 1) });
        }));
      },
      (g, c, o) => RED.forEach((t, i) => RED.forEach((y, j) => {
        const a = ease(tramo(o.p, ((i * 5 + j) / 25) * 0.7, ((i * 5 + j) / 25) * 0.7 + 0.3)), m = f(t, y);
        if (!Number.isFinite(m)) return;
        const [ux, uy] = direccion(P, m), L = 20 * a;
        g.linea([[P.X(t) - ux * L, P.Y(y) - uy * L], [P.X(t) + ux * L, P.Y(y) + uy * L]], { color: 'ambar', ancho: 3, alfa: a * (o.paso > 2 ? 0.5 : 1) });
      })),
      (g, c, o) => c.niveles.forEach(({ c: k, segs }, i) => {
        const a = ease(tramo(o.p, 0.2 * i, 0.5 + 0.2 * i));
        segs.forEach(([p1, p2]) => g.linea([[P.X(p1[0]), P.Y(p1[1])], [P.X(p2[0]), P.Y(p2[1])]], { color: 'violeta', ancho: 2, alfa: a * 0.8 }));
        if (segs.length) {
          const [m1] = segs[Math.floor(segs.length * (0.3 + 0.15 * i)) % segs.length];
          g.tex(`iso${i}`, P.X(m1[0]) + 6, P.Y(m1[1]) - 12, R`f = ${k}`, { color: 'violeta', tam: 13, ancla: 'l', alfa: a, fondo: true });
          // marcas de pendiente k a lo largo de la isoclina
          segs.filter((_, s) => s % 9 === 0).forEach(([p1]) => { const [ux, uy] = direccion(P, k); g.linea([[P.X(p1[0]) - ux * 10, P.Y(p1[1]) - uy * 10], [P.X(p1[0]) + ux * 10, P.Y(p1[1]) + uy * 10]], { color: 'violeta', ancho: 2.4, alfa: a }); });
        }
      }),
      (g, c, o) => campo(g, P, f, { p: o.p, alfa: 0.55, nt: 25, ny: 19 }),
      (g, c, o) => soluciones.forEach(([t0, y0], i) => solucion(g, P, f, t0, y0, { p: tramo(o.p, 0.08 * i, 0.6 + 0.08 * i), punto: false, ancho: 2 })),
    ],
  });
}

/**
 * Esbozo de soluciones de una autónoma y' = h(y) (CP3 ej. 4–7): campo → equilibrios y línea de fase → un paso por
 * cada condición inicial pedida (la solución típica de cada caso queda dibujada).
 */
export function autonoma({ h, tex, vista, casos, v = 'y', ind = 't', alto = 450 }) {
  const P = plano({ x: 120, y: 40, w: 590, h: 370 }, vista);
  const f = (t, y) => h(y);
  const eqs = equilibrios(h, vista.y[0], vista.y[1]);
  const capas = [
    (g, c, o) => {
      ejes(g, P, { t: ind, y: v });
      formula(g, 'ec', 420, 20, R`\dfrac{d${v}}{d${ind}} = ${tex}`, { tam: 16 });
      campo(g, P, f, { p: o.p, alfa: o.paso === 0 ? 0.7 : 0.4 });
    },
    (g, c, o) => {
      eqs.forEach((e) => rectaEquilibrio(g, P, e.y, { tipo: e.tipo, p: o.p }));
      lineaFase(g, { f: h, eqs, coord: P.Y, desde: P.Y(vista.y[0]), hasta: P.Y(vista.y[1]), otra: 60, rango: vista.y, p: o.p, tiempo: o.tiempo, clave: 'lf' });
    },
    ...casos.map((caso, i) => (g, c, o) => {
      const t0 = caso.t0 ?? 0;
      solucion(g, P, f, t0, caso.y0, { p: o.p, sentido: caso.sentido ?? 'ambos', alfa: o.actual ? 1 : 0.6, brillo: o.actual ? 7 : 0 });
      if (caso.etiqueta) g.tex(`c${i}`, P.X(t0) + 10, P.Y(caso.y0) + (caso.abajo ? 16 : -14), caso.etiqueta, { color: 'cian', tam: 13, ancla: 'l', alfa: ease(o.p) * (o.actual ? 1 : 0.6), fondo: true });
    }),
  ];
  return definirEscena({
    alto, vivo: true, preparar: () => ({}),
    duracion: [2000, 2200, ...casos.map(() => 2000)],
    leyenda: { campo: 'campo', verde: 'sumidero', ambar: 'fuente', violeta: 'nodo', cian: 'soluciones' },
    capas,
  });
}

/**
 * Método de Euler a mano (CP4 ej. 1): campo y dato inicial → la tabla se llena a la par que la poligonal crece →
 * la poligonal frente a la solución verdadera (RK4) y lo que se concluye.
 */
export function eulerTabla({ f, tex, t0 = 0, y0, dt, n, vista, v = 'y', nota }) {
  const P = plano({ x: 60, y: 40, w: 410, h: 380 }, vista);
  return definirEscena({
    alto: 460,
    preparar: () => ({ eu: eulerNum(f, t0, y0, dt, n) }),
    duracion: [1600, 4000, 2400],
    leyenda: { campo: 'campo', ambar: 'Euler', cian: 'solución verdadera' },
    capas: [
      (g, c, o) => {
        ejes(g, P, { y: v });
        campo(g, P, f, { p: o.p, alfa: 0.4, nt: 15, ny: 15 });
        formula(g, 'pvi', 615, 24, R`\dfrac{d${v}}{dt} = ${tex},\ \ ${v}(${t0}) = ${y0},\ \ \Delta t = ${dt}`, { p: o.p, tam: 14 });
        punto(g, P.X(t0), P.Y(y0), { color: 'ciruela', r: 6, halo: true });
      },
      (g, c, o) => {
        const { eu } = c, fmt = (x) => String(Number(x.toFixed(4)));
        const filas = eu.t.map((t, k) => [String(k), fmt(t), fmt(eu.y[k]), k < eu.t.length - 1 ? fmt(f(t, eu.y[k])) : '']);
        tabla(g, 'tb', 495, 64, [R`k`, R`t_k`, R`${v}_k`, R`f(t_k, ${v}_k)`], filas, { p: o.p, anchos: [30, 52, 74, 80], tam: 13, alto: Math.min(26, 340 / filas.length) });
        poligonoEuler(g, P, eu, { p: o.p });
      },
      (g, c, o) => {
        solucion(g, P, f, t0, y0, { p: o.p, sentido: 'adelante', punto: false });
        if (nota) g.tex('nota', 265, 440, nota, { color: 'texto', tam: 13, alfa: ease(o.p), fondo: true });
      },
    ],
  });
}
