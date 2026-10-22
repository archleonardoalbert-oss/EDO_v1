// Geometría pura de las escenas (sin DOM): el plano t–y y su paso a píxeles lógicos, las curvas de
// movimiento y la caché de soluciones. Lo comparten las primitivas de dibujo y los tests.
import { rk4 } from './numerico.js';

/** Curva «suave» de 3Blue1Brown: arranca y frena sin tirones. */
export const ease = (p) => { const x = Math.min(1, Math.max(0, p)); return x * x * (3 - 2 * x); };
/** Sub-progreso de p dentro de [a, b], recortado a [0, 1]. */
export const tramo = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
export const mezclar = (a, b, p) => a + (b - a) * p;

/**
 * Un plano cartesiano dentro del rectángulo `caja` (píxeles lógicos), con ventana `vista` = {t:[a,b], y:[c,d]}.
 * X(t), Y(y): a píxeles (y hacia arriba). T(px), V(py): de vuelta al mundo.
 */
export function plano(caja, vista) {
  const { x, y, w, h } = caja, [a, b] = vista.t, [c, d] = vista.y;
  const sx = w / (b - a), sy = h / (d - c);
  return {
    caja, vista, sx, sy,
    X: (t) => x + (t - a) * sx,
    Y: (v) => y + (d - v) * sy,
    T: (px) => a + (px - x) / sx,
    V: (py) => d - (py - y) / sy,
    dentro: (t, v) => t >= a && t <= b && v >= c && v <= d,
    recortar: (t, v) => [Math.min(b, Math.max(a, t)), Math.min(d, Math.max(c, v))],
  };
}

const cache = new WeakMap();
/**
 * La solución que pasa por (t0, y0), integrada hacia adelante hasta el borde derecho de la vista y hacia atrás
 * hasta el izquierdo; se corta si se aleja mucho de la vista. Se memoriza por función y punto.
 */
export function solucionCache(f, t0, y0, P) {
  let m = cache.get(f);
  if (!m) cache.set(f, (m = new Map()));
  const [c, d] = P.vista.y, margen = 4 * (d - c);
  const clave = `${t0}|${y0}|${P.vista.t}|${P.vista.y}`;
  if (!m.has(clave)) {
    const limite = Math.max(Math.abs(c), Math.abs(d)) + margen;
    const h = (P.vista.t[1] - P.vista.t[0]) / 300;
    m.set(clave, {
      adelante: rk4(f, t0, y0, P.vista.t[1], { h, limite }),
      atras: rk4(f, t0, y0, P.vista.t[0], { h, limite }),
    });
    if (m.size > 400) m.delete(m.keys().next().value);
  }
  return m.get(clave);
}

/** Marcas del campo de pendientes en una cuadrícula nt × ny: {t, y, pendiente, angulo (en pantalla)}. */
export function marcasCampo(f, P, { nt = 21, ny = 15, t, y } = {}) {
  const ts = t ?? Array.from({ length: nt }, (_, i) => P.vista.t[0] + ((P.vista.t[1] - P.vista.t[0]) * i) / (nt - 1));
  const ys = y ?? Array.from({ length: ny }, (_, j) => P.vista.y[0] + ((P.vista.y[1] - P.vista.y[0]) * j) / (ny - 1));
  const marcas = [];
  for (const tt of ts) for (const yy of ys) {
    const m = f(tt, yy);
    if (!Number.isFinite(m)) continue;
    marcas.push({ t: tt, y: yy, pendiente: m, angulo: Math.atan2(-m * P.sy, P.sx) });
  }
  return marcas;
}
