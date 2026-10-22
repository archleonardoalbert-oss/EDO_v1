// Piezas compuestas que reaparecen en muchas escenas: fórmulas que entran, tangentes con su triángulo de
// pendiente, el valor de una función como barra vertical, paneles con título, conejos y zorros.
import { ease, mezclar } from '../motor/plano.js';

/** Fórmula KaTeX que entra subiendo un poco y apareciendo. */
export function formula(g, clave, x, y, codigo, { p = 1, tam = 20, color = 'texto', ancla = 'c', alfa = 1, fondo = false } = {}) {
  const q = ease(p);
  g.tex(clave, x, y + (1 - q) * 10, codigo, { color, tam, ancla, alfa: alfa * q, fondo });
}

/** Dirección en pantalla (unitaria) de una recta de pendiente m en el plano P. */
export function direccion(P, m) {
  const dx = P.sx, dy = -m * P.sy, L = Math.hypot(dx, dy);
  return [dx / L, dy / L];
}

/**
 * Recta tangente por (t, y) con pendiente m, de `largo` píxeles, que crece desde el punto con p.
 * Con `triangulo`, dibuja también el triángulo de pendiente (Δt = `paso`, Δy = m·paso) y sus rótulos.
 */
export function tangente(g, P, t, y, m, { largo = 150, p = 1, color = 'ambar', alfa = 1, triangulo = false, paso = 0.5, clave = 'tg', rotulos = true, etiquetaDy } = {}) {
  const q = ease(p), [ux, uy] = direccion(P, m), x = P.X(t), yy = P.Y(y), L = (largo / 2) * q;
  g.linea([[x - ux * L, yy - uy * L], [x + ux * L, yy + uy * L]], { color, ancho: 2, alfa: alfa * 0.95, brillo: 4 });
  if (triangulo && q > 0) {
    const x2 = P.X(t + paso), y2 = P.Y(y + m * paso);
    g.linea([[x, yy], [x2, yy]], { color: 'texto2', ancho: 1.4, alfa: alfa * q, guion: [4, 4] });
    g.linea([[x2, yy], [x2, y2]], { color, ancho: 2.2, alfa: alfa * q });
    if (rotulos) {
      g.tex(`${clave}-dt`, (x + x2) / 2, yy + (m >= 0 ? 14 : -14), String.raw`\Delta t`, { color: 'texto2', tam: 13, alfa: alfa * q });
      g.tex(`${clave}-dy`, x2 + 8, (yy + y2) / 2, etiquetaDy ?? String.raw`\Delta y`, { color, tam: 13, alfa: alfa * q, ancla: 'l' });
    }
  }
}

/** El valor y de un punto como barra vertical desde el eje t (o desde y = base). */
export function barraValor(g, P, t, y, { p = 1, color = 'ciruela', base = 0, clave = 'barra', rotulo, alfa = 1 } = {}) {
  const q = ease(p), x = P.X(t), y0 = P.Y(base), y1 = mezclar(y0, P.Y(y), q);
  g.linea([[x, y0], [x, y1]], { color, ancho: 3, alfa: alfa * 0.9 });
  if (rotulo) g.tex(clave, x - 8, (y0 + y1) / 2, rotulo, { color, tam: 14, ancla: 'r', alfa: alfa * q });
}

/** Panel con borde tenue y título (para escenas con varias vistas). */
export function panel(g, caja, titulo, { p = 1, clave = 'panel', color = 'texto2' } = {}) {
  const q = ease(p);
  g.rect(caja.x, caja.y, caja.w, caja.h, { color: 'muyTenue', relleno: false, alfa: q * 0.9, radio: 8 });
  if (titulo) g.tex(clave, caja.x + 10, caja.y + 14, titulo, { color, tam: 13, ancla: 'l', alfa: q });
}

/** Región vertical sombreada (p. ej. «el futuro» a la derecha de un instante). */
export function franja(g, P, t1, t2, { color = 'cian', alfa = 0.07 } = {}) {
  const x1 = P.X(Math.max(t1, P.vista.t[0])), x2 = P.X(Math.min(t2, P.vista.t[1]));
  g.rect(x1, P.caja.y, x2 - x1, P.caja.h, { color, alfa });
}

/** Conejo esquemático (presa): cuerpo, cabeza y dos orejas. */
export function conejo(g, x, y, { tam = 1, alfa = 1, color = 'cian' } = {}) {
  g.circulo(x, y, 4.2 * tam, { color, alfa });
  g.circulo(x + 4 * tam, y - 3 * tam, 2.8 * tam, { color, alfa });
  g.linea([[x + 3.4 * tam, y - 5 * tam], [x + 2.6 * tam, y - 10 * tam]], { color, ancho: 1.6 * tam, alfa });
  g.linea([[x + 5 * tam, y - 5 * tam], [x + 6 * tam, y - 10 * tam]], { color, ancho: 1.6 * tam, alfa });
}

/** Zorro esquemático (depredador): cabeza triangular con orejas y cola. */
export function zorro(g, x, y, { tam = 1, alfa = 1, color = 'ambar' } = {}) {
  const c = g.ctx;
  c.save(); c.globalAlpha = alfa; c.fillStyle = color === 'ambar' ? '#c99448' : color;
  c.beginPath();
  c.moveTo(x - 6 * tam, y - 5 * tam); c.lineTo(x - 3 * tam, y - 1 * tam); c.lineTo(x + 3 * tam, y - 1 * tam);
  c.lineTo(x + 6 * tam, y - 5 * tam); c.lineTo(x + 5 * tam, y + 2 * tam); c.lineTo(x, y + 6 * tam); c.lineTo(x - 5 * tam, y + 2 * tam);
  c.closePath(); c.fill(); c.restore();
}

/** Número pseudoaleatorio determinista en [0, 1) a partir de un entero (para posiciones «al azar» estables). */
export const azar = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
