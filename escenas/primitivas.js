// Piezas de dibujo comunes a todas las escenas. Cada una recibe el pincel `g`, un plano `P` (motor/plano.js)
// y un progreso `p` ∈ [0, 1] con el que «entra» de forma fluida (p = 1: en reposo, todo escrito).
import { ease, tramo, mezclar, solucionCache, marcasCampo } from '../motor/plano.js';
import { clasificar, raices } from '../motor/numerico.js';

export const COLOR_TIPO = { sumidero: 'verde', fuente: 'ambar', nodo: 'violeta', hueco: 'rojo' };
const frac = (x) => x - Math.floor(x);

/** Marcas de un eje: múltiplos «redondos» dentro de [a, b]. */
export function marcasEje(a, b, objetivo = 6) {
  const bruto = (b - a) / objetivo, pot = 10 ** Math.floor(Math.log10(bruto));
  const paso = [1, 2, 2.5, 5, 10].map((m) => m * pot).find((x) => x >= bruto) ?? pot * 10;
  const r = [];
  for (let v = Math.ceil(a / paso) * paso; v <= b + 1e-9; v += paso) r.push(Math.abs(v) < 1e-12 ? 0 : Number(v.toPrecision(10)));
  return r;
}
const fmt = (v) => (Number.isInteger(v) ? String(v) : String(Number(v.toFixed(2)))).replace('-', '−');

/** Ejes t e y (pasan por 0 si está a la vista; si no, por el borde), con números y nombres. */
export function ejes(g, P, { t = 't', y = 'y', p = 1, alfa = 1, numeros = true, marcasT, marcasY, clave = 'ejes', rejilla = true } = {}) {
  const a = ease(p) * alfa, { x, y: y0, w, h } = P.caja;
  const [ta, tb] = P.vista.t, [ya, yb] = P.vista.y;
  const ejeY = ta <= 0 && tb >= 0 ? P.X(0) : x, ejeT = ya <= 0 && yb >= 0 ? P.Y(0) : y0 + h;
  const mT = marcasT ?? marcasEje(ta, tb), mY = marcasY ?? marcasEje(ya, yb, 5);
  if (rejilla) {
    for (const v of mT) g.linea([[P.X(v), y0], [P.X(v), y0 + h]], { color: 'rejilla', ancho: 1, alfa: a });
    for (const v of mY) g.linea([[x, P.Y(v)], [x + w, P.Y(v)]], { color: 'rejilla', ancho: 1, alfa: a });
  }
  g.flecha(x, ejeT, mezclar(x, x + w + 10, ease(p)), ejeT, { color: 'eje', ancho: 1.3, alfa: a, punta: 7 });
  g.flecha(ejeY, y0 + h, ejeY, mezclar(y0 + h, y0 - 10, ease(p)), { color: 'eje', ancho: 1.3, alfa: a, punta: 7 });
  if (numeros) {
    for (const v of mT) if (v !== 0 || ejeY !== P.X(0)) g.texto(P.X(v), ejeT + 13, fmt(v), { color: 'tenue', tam: 11, alfa: a });
    for (const v of mY) if (v !== 0 || ejeT !== P.Y(0)) g.texto(ejeY - 7, P.Y(v), fmt(v), { color: 'tenue', tam: 11, ancla: 'r', alfa: a });
  }
  if (t) g.tex(`${clave}-t`, x + w + 16, ejeT, t, { color: 'texto2', tam: 16, alfa: a, ancla: 'l' });
  if (y) g.tex(`${clave}-y`, ejeY, y0 - 22, y, { color: 'texto2', tam: 16, alfa: a });
}

/**
 * Campo de pendientes de f en una cuadrícula: cada marca entra girando desde horizontal hasta su pendiente,
 * en una ola de izquierda a derecha.
 */
export function campo(g, P, f, { nt = 23, ny = 15, p = 1, alfa = 0.85, largo = 15, color = 'campo', ancho = 1.5, t, y, destacar, mostrar } = {}) {
  const { x, w } = P.caja;
  for (const m of marcasCampo(f, P, { nt, ny, t, y })) {
    if (mostrar && !mostrar(m)) continue;
    const px = P.X(m.t), py = P.Y(m.y), retardo = 0.6 * ((px - x) / w);
    const q = ease(tramo(p, retardo, retardo + 0.4));
    if (q <= 0) continue;
    const ang = mezclar(0, m.angulo, q), dx = (largo / 2) * Math.cos(ang), dy = (largo / 2) * Math.sin(ang);
    const c = destacar?.(m) ?? color;
    g.linea([[px - dx, py - dy], [px + dx, py + dy]], { color: c, ancho, alfa: alfa * q });
  }
}

/** Puntos de una curva (t[], y[]) a píxeles, cortando tramos fuera de una franja amplia alrededor de la vista. */
function aPixeles(P, ts, ys) {
  const pts = [];
  const [c, d] = P.vista.y, margen = (d - c) * 0.5;
  for (let i = 0; i < ts.length; i++) {
    if (ys[i] < c - margen || ys[i] > d + margen) { if (pts.length) break; continue; }
    pts.push([P.X(ts[i]), P.Y(ys[i])]);
  }
  return pts;
}
/** Prefijo de una poligonal hasta la fracción `q` de su longitud. */
function prefijo(pts, q) {
  if (q >= 1 || pts.length < 2) return pts;
  if (q <= 0) return pts.slice(0, 1);
  let total = 0;
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push((total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])));
  const meta = total * q, r = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    if (L[i] <= meta) { r.push(pts[i]); continue; }
    const s = (meta - L[i - 1]) / (L[i] - L[i - 1] || 1);
    r.push([mezclar(pts[i - 1][0], pts[i][0], s), mezclar(pts[i - 1][1], pts[i][1], s)]);
    break;
  }
  return r;
}

/** Una curva dada por listas (t, y), trazada hasta la fracción p. */
export function curva(g, P, ts, ys, { p = 1, color = 'cian', ancho = 2.4, alfa = 1, brillo = 6, guion = null } = {}) {
  const pts = prefijo(aPixeles(P, ts, ys), ease(p));
  g.recortar(P.caja, () => g.linea(pts, { color, ancho, alfa, brillo, guion }));
  return pts.at(-1);
}

/** La gráfica de una función v = fn(u) sobre la ventana del plano (u en el eje horizontal). */
export function grafica(g, P, fn, { p = 1, n = 300, ...op } = {}) {
  const [a, b] = P.vista.t, us = [], vs = [];
  for (let i = 0; i <= n; i++) {
    const u = a + ((b - a) * i) / n, v = fn(u);
    if (!Number.isFinite(v)) { if (us.length) break; continue; }
    us.push(u); vs.push(v);
  }
  return curva(g, P, us, vs, { p, ...op });
}

/**
 * La solución de y' = f(t, y) por (t0, y0), que crece desde ese punto hacia ambos lados (o solo hacia adelante)
 * con el progreso p. Dibuja también el punto inicial. Devuelve la punta delantera (para seguirla).
 */
export function solucion(g, P, f, t0, y0, { p = 1, color = 'cian', ancho = 2.4, alfa = 1, sentido = 'ambos', punto = true, brillo = 7, guion = null } = {}) {
  const s = solucionCache(f, t0, y0, P);
  const q = ease(p);
  const del = prefijo(aPixeles(P, s.adelante.t, s.adelante.y), q);
  g.recortar(P.caja, () => {
    g.linea(del, { color, ancho, alfa, brillo, guion });
    if (sentido === 'ambos') g.linea(prefijo(aPixeles(P, s.atras.t, s.atras.y), q), { color, ancho, alfa, brillo, guion });
  });
  if (punto && P.dentro(t0, y0)) g.circulo(P.X(t0), P.Y(y0), 4.5, { color, alfa, brillo: 10 });
  return { punta: del.at(-1), datos: s };
}

/** Punto con halo opcional. */
export function punto(g, x, y, { color = 'cian', r = 4.5, alfa = 1, halo = false } = {}) {
  if (halo) g.circulo(x, y, r + 6, { color, alfa: alfa * 0.18 });
  g.circulo(x, y, r, { color, alfa, brillo: 8 });
}

/** Solución de equilibrio: recta horizontal y = c en el plano, del color de su tipo. */
export function rectaEquilibrio(g, P, c, { tipo = 'sumidero', p = 1, alfa = 1, ancho = 2, color, rotulo } = {}) {
  if (c < P.vista.y[0] || c > P.vista.y[1]) return;
  const col = color ?? COLOR_TIPO[tipo], { x, w } = P.caja, q = ease(p);
  g.linea([[x, P.Y(c)], [x + w * q, P.Y(c)]], { color: col, ancho, alfa, brillo: 6, guion: tipo === 'fuente' ? [7, 6] : null });
  if (rotulo) g.tex(`req-${rotulo}`, x + w + 8, P.Y(c), rotulo, { color: col, alfa: alfa * q, tam: 14, ancla: 'l' });
}

/** Equilibrios de f(y) en [a, b], con su tipo. */
export function equilibrios(f, a, b) {
  return raices(f, a, b).map((y) => ({ y, tipo: clasificar(f, y) }));
}

/**
 * Línea de fase como en la conferencia: recta (vertical u horizontal), equilibrios como puntos coloreados por
 * su tipo, una flecha por intervalo según el signo de f, y partículas que fluyen (con `tiempo`).
 * `coord(y)` lleva y a píxeles a lo largo de la recta; `desde`/`hasta` son los extremos en píxeles; `otra` es la
 * coordenada fija (x si es vertical, y si es horizontal).
 */
export function lineaFase(g, { f, eqs, coord, desde, hasta, otra, rango, orientacion = 'vertical', p = 1, tiempo = null,
  alfa = 1, flechas = true, particulas = true, rotular = true, clave = 'lf', tam = 9 } = {}) {
  const V = orientacion === 'vertical';
  const at = (s) => (V ? [otra, s] : [s, otra]);
  const q = ease(p);
  g.linea([at(desde), at(mezclar(desde, hasta, q))], { color: 'texto2', ancho: 1.6, alfa: 0.75 * alfa });
  const [ya, yb] = rango, cortes = [ya, ...eqs.map((e) => e.y).filter((y) => y > ya && y < yb), yb];
  for (let i = 0; i < cortes.length - 1; i++) {
    const a = cortes[i], b = cortes[i + 1], m = (a + b) / 2, sg = Math.sign(f(m));
    const qa = ease(tramo(p, 0.35 + 0.1 * i, 0.75 + 0.1 * i));
    if (!sg || qa <= 0) continue;
    // flecha en el centro del intervalo (en píxeles, «arriba» = y creciente)
    const pa = coord(a), pb = coord(b), pm = (pa + pb) / 2, largo = Math.min(26, Math.abs(pb - pa) * 0.42);
    const dir = Math.sign(pb - pa) * sg;
    if (flechas) {
      const [x1, y1] = at(pm - (dir * largo) / 2), [x2, y2] = at(pm + (dir * largo) / 2);
      g.flecha(x1, y1, x2, y2, { color: 'texto', ancho: 2.2, alfa: alfa * qa, punta: 10 });
    }
    if (particulas && tiempo != null) {
      // partículas que fluyen en el sentido de la flecha, más rápido donde |f| es mayor
      const n = 4, vel = Math.min(0.5, 0.08 + 0.12 * Math.abs(f(m)));
      for (let k = 0; k < n; k++) {
        const s = frac(k / n + tiempo * vel * 0.001 * 0.6), u = dir > 0 ? s : 1 - s;
        const pos = mezclar(Math.min(pa, pb), Math.max(pa, pb), u);
        const borde = Math.min(s, 1 - s) * 6;
        const [px, py] = at(pos);
        g.circulo(px, py, 2.6, { color: 'cian', alfa: alfa * qa * Math.min(1, borde) * 0.9, brillo: 6 });
      }
    }
  }
  eqs.forEach((e, i) => {
    if (e.y < ya || e.y > yb) return;
    const qe = ease(tramo(p, 0.15 + 0.08 * i, 0.5 + 0.08 * i));
    const [px, py] = at(coord(e.y)), col = COLOR_TIPO[e.tipo];
    // «hueco»: f no está definida allí (no es un equilibrio): círculo vacío
    if (e.tipo === 'hueco') g.circulo(px, py, tam * 0.75, { color: col, alfa: alfa * qe, relleno: false, ancho: 2.2 });
    else g.circulo(px, py, tam * 0.6 + 6 * (1 - qe), { color: col, alfa: alfa * qe, brillo: 10 });
    if (rotular && e.rotulo !== false) {
      const txt = e.rotulo ?? fmtTex(e.y);
      if (V) g.tex(`${clave}-e${i}`, px - 14, py, txt, { color: col, alfa: alfa * qe, tam: 14, ancla: 'r' });
      else g.tex(`${clave}-e${i}`, px, py + 20, txt, { color: col, alfa: alfa * qe, tam: 14 });
    }
  });
}
export const fmtTex = (v) => (Math.abs(v - Math.round(v)) < 1e-4 ? String(Math.round(v)) : v.toFixed(2));

/**
 * El símbolo de la conferencia para el tipo de equilibrio: sumidero ↓•↑, fuente ↑•↓, nodo ↓•↓ (↑•↑ con sentidoNodo = 1).
 */
export function simboloEquilibrio(g, x, y, tipo, { p = 1, alfa = 1, sentidoNodo = -1, escala = 1 } = {}) {
  const q = ease(p), d = 26 * escala, L = 22 * escala;
  // sentido de cada flecha en píxeles (+1 hacia abajo en pantalla)
  const [sup, inf] = { sumidero: [1, -1], fuente: [-1, 1], nodo: [-sentidoNodo, -sentidoNodo] }[tipo];
  const flecha = (cy, s) => g.flecha(x, cy - (s * L) / 2, x, cy + (s * L) / 2, { color: 'texto', ancho: 2.2, alfa: alfa * q, punta: 9 });
  flecha(y - d, sup);
  flecha(y + d, inf);
  g.circulo(x, y, 6 * escala, { color: COLOR_TIPO[tipo], alfa: alfa * q, brillo: 10 });
}
