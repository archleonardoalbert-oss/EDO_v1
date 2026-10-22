// Valientes · unicidad: la distancia w(t) entre dos soluciones crece como mucho como w(t0)·e^{L(t − t0)} (banda de
// Grönwall); si w(t0) = 0, la banda se cierra: son la misma.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar, solucionCache } from '../../motor/plano.js';
import { ejes, campo, solucion, punto, curva } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 340 }, { t: [0, 4], y: [-2, 2.5] });
const f = (t, y) => Math.sin(2 * t) - 0.6 * y + 0.3 * y * y;
const L = 1.4;   // cota de |∂f/∂y| = |−0.6 + 0.6y| en la franja dibujada

export default definirEscena({
  alto: 420,
  entradas: [{ id: 'd', tipo: 'deslizador', etiqueta: R`w(0)`, valor: 0.25, min: 0, max: 0.6, paso: 0.01 }],
  preparar: (e) => ({ e }),
  duracion: [1800, 2400, 2600],
  leyenda: { cian: 'y₁', ciruela: 'y₂', violeta: 'banda de Grönwall: w(0)·e^{Lt}' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const d = paso === 2 ? mezclar(c.e.d, 0, ease(p)) : c.e.d;
    ejes(g, P);
    campo(g, P, f, { alfa: 0.35 });
    if (paso >= 1) {
      // la banda: y1(t) ± w(0)·e^{Lt}
      const s = solucionCache(f, 0, 0, P).adelante;
      const ts = s.t, arriba = ts.map((t, i) => s.y[i] + d * Math.exp(L * t)), abajo = ts.map((t, i) => s.y[i] - d * Math.exp(L * t));
      const ctx = g.ctx;
      ctx.save(); ctx.beginPath(); ctx.rect(P.caja.x, P.caja.y, P.caja.w, P.caja.h); ctx.clip(); ctx.beginPath();
      ts.forEach((t, i) => (i ? ctx.lineTo(P.X(t), P.Y(Math.min(4, arriba[i]))) : ctx.moveTo(P.X(t), P.Y(arriba[i]))));
      for (let i = ts.length - 1; i >= 0; i--) ctx.lineTo(P.X(ts[i]), P.Y(Math.max(-3, abajo[i])));
      ctx.closePath(); ctx.fillStyle = `rgba(125,108,196,${0.16 * ease(q(1))})`; ctx.fill(); ctx.restore();
      curva(g, P, ts, arriba, { color: 'violeta', brillo: 0, ancho: 1.2, guion: [4, 4], alfa: ease(q(1)) });
      curva(g, P, ts, abajo, { color: 'violeta', brillo: 0, ancho: 1.2, guion: [4, 4], alfa: ease(q(1)) });
      formula(g, 'gr', 380, 22, R`w' \le L\,w \;\Rightarrow\; w(t) \le w(0)\,e^{Lt}`, { p: q(1), tam: 16, color: 'violeta' });
    }
    solucion(g, P, f, 0, 0, { sentido: 'adelante' });
    solucion(g, P, f, 0, d, { sentido: 'adelante', color: 'ciruela' });
    punto(g, P.X(0), P.Y(d), { color: 'ciruela', r: 6, halo: true });
    if (paso === 2) g.tex('cero', 380, 400, R`w(0) = 0 \Rightarrow w \equiv 0:\ \text{la misma solución}`, { color: 'verde', tam: 15, alfa: ease(tramo(p, 0.7, 1)), fondo: true });
  },
  pasos: 3,
  asas: (c) => [{ id: 'd', x: P.X(0), y: P.Y(c.e.d), color: 'ciruela', mover: (x, y) => ({ d: P.V(y) }) }],
});
