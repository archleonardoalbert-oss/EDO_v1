// dy/dt = 4y(1 − y): marcas paralelas en cada recta horizontal; las traslaciones horizontales de una solución son
// soluciones; equilibrios y = 0 (inestable) e y = 1 (estable); regiones de subida y bajada; la figura 1.21.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, solucion, rectaEquilibrio, curva } from '../primitivas.js';
import { formula, direccion } from '../piezas.js';
import { solucionCache } from '../../motor/plano.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-2, 2], y: [-1, 2] });
const f = (t, y) => 4 * y * (1 - y);

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'c', tipo: 'deslizador', etiqueta: 'c', valor: 0.6, min: -1.5, max: 1.5, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: [1],
  duracion: [2200, 2000, 2600, 2000, 1800, 1800, 2600, 1500],
  leyenda: (paso) => ({ campo: 'campo 4y(1 − y)', cian: 'soluciones', ...(paso >= 4 ? { verde: 'y = 1 estable', ambar: 'y = 0 inestable' } : { violeta: 'traslación horizontal' }) }),
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    const fila = paso === 0 ? mezclar(-0.8, 0.5, ease(p)) : null;
    campo(g, P, f, { alfa: 0.55, nt: 23, ny: 17, destacar: (m) => (fila !== null && Math.abs(m.y - fila) < 0.1 ? 'ambar' : null) });
    if (paso === 0) g.tex('par', 370, 22, R`\text{misma altura } y \Rightarrow \text{misma pendiente}`, { color: 'ambar', tam: 15, fondo: true });
    // una solución base (por (0, 0.25)) y sus trasladadas
    const base = solucionCache(f, 0, 0.25, P);
    const trasladar = (d, op) => {
      curva(g, P, base.atras.t.map((t) => t + d), base.atras.y, op);
      curva(g, P, base.adelante.t.map((t) => t + d), base.adelante.y, op);
    };
    if (paso === 1) {
      [-1.2, -0.6, 0.6, 1.2].forEach((d, i) => trasladar(d, { alfa: 0.3, brillo: 0, ancho: 1.6, p: tramo(p, 0.1 * i, 0.5 + 0.1 * i) }));
      const d = 1.2 * Math.sin(tiempo / 1000);
      trasladar(d, {});
      g.flecha(P.X(d) - 50, P.Y(0.5) - 34, P.X(d) + 50, P.Y(0.5) - 34, { color: 'violeta', ancho: 2 });
      g.flecha(P.X(d) + 50, P.Y(0.5) - 34, P.X(d) - 50, P.Y(0.5) - 34, { color: 'violeta', ancho: 2 });
    }
    if (paso === 2) {
      // las pendientes de la conferencia, escritas a su altura
      [[0, 0], [0.5, 1], [1, 0], [1.5, -3]].forEach(([y, m], i) => {
        const a = ease(tramo(p, 0.2 * i, 0.3 + 0.2 * i)), [ux, uy] = direccion(P, m), x = P.X(1.5);
        g.linea([[x - ux * 26, P.Y(y) - uy * 26], [x + ux * 26, P.Y(y) + uy * 26]], { color: 'ambar', ancho: 3.2, alfa: a });
        g.tex(`s${i}`, x + 36, P.Y(y), R`y = ${y}:\ ${m}`, { color: 'ambar', tam: 14, ancla: 'l', alfa: a, fondo: true });
      });
    }
    if (paso === 3) {
      trasladar(0, { alfa: 0.5 });
      trasladar(-c.e.c, { p });
      formula(g, 'y1c', 370, 22, R`y_1(t) \text{ solución} \Rightarrow y_1(t + c) \text{ solución}\quad (c = ${c.e.c.toFixed(2)})`, { p, tam: 15 });
    }
    if (paso >= 4) {
      rectaEquilibrio(g, P, 0, { tipo: 'fuente', p: q(4) });
      rectaEquilibrio(g, P, 1, { tipo: 'sumidero', p: q(4) });
      g.tex('e0', P.X(-1.9), P.Y(0) - 14, R`y = 0`, { color: 'ambar', tam: 14, ancla: 'l', alfa: ease(q(4)), fondo: true });
      g.tex('e1', P.X(-1.9), P.Y(1) - 14, R`y = 1`, { color: 'verde', tam: 14, ancla: 'l', alfa: ease(q(4)), fondo: true });
    }
    if (paso >= 5) {
      const ctx = g.ctx, a = ease(q(5));
      const banda = (y1, y2, rgb) => { ctx.save(); ctx.fillStyle = `rgba(${rgb},${0.09 * a})`; ctx.fillRect(P.caja.x, P.Y(y2), P.caja.w, P.Y(y1) - P.Y(y2)); ctx.restore(); };
      banda(0, 1, '58,169,187'); banda(1, 2, '208,101,108'); banda(-1, 0, '208,101,108');
      g.tex('cr', P.X(1.4), P.Y(0.5), R`\text{crecen}`, { color: 'cian', tam: 14, alfa: a, fondo: true });
      g.tex('dc1', P.X(1.4), P.Y(1.6), R`\text{decrecen}`, { color: 'rojo', tam: 14, alfa: a, fondo: true });
      g.tex('dc2', P.X(1.4), P.Y(-0.6), R`\text{decrecen}`, { color: 'rojo', tam: 14, alfa: a, fondo: true });
    }
    if (paso >= 6) {
      [-0.1, 0.12, 0.5, 1.6, 1.95].forEach((y0, i) => solucion(g, P, f, -1.5, y0, { p: paso === 6 ? tramo(p, 0.1 * i, 0.6 + 0.1 * i) : 1, sentido: 'adelante', punto: false }));
    }
    if (paso === 7) {
      g.tex('est', P.X(0.2), P.Y(1) - 22, R`\textbf{estable}`, { color: 'verde', tam: 16, alfa: ease(p), fondo: true });
      g.tex('ine', P.X(0.2), P.Y(0) + 22, R`\textbf{inestable}`, { color: 'ambar', tam: 16, alfa: ease(p), fondo: true });
    }
  },
  pasos: 8,
});
