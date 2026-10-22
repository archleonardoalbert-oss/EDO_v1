// Derivación: los dos términos con c(t) se tachan (se cancelan) y queda ċ = b·e^{A}; integrando, c(t) y la fórmula.
// A la derecha, ċ(t) y su área acumulada c(t) − c0.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 470, y: 230, w: 260, h: 180 }, { t: [0, 2], y: [-0.5, 8] });
const a = 1, b = (t) => 1 + Math.sin(3 * t), cp = (t) => b(t) * Math.exp(a * t);

export default definirEscena({
  alto: 450, preparar: () => ({}),
  duracion: [1800, 2000, 2400, 2200, 1800],
  leyenda: { violeta: 'términos que se cancelan', ambar: 'ċ(t) = b(t)e^{A(t)}', ciruela: 'c(t)' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    formula(g, 'p1', 230, 40, R`x = c\,e^{-A} \Rightarrow \dot x = \dot c\,e^{-A} - a\,c\,e^{-A}`, { p: q(0), tam: 19 });
    if (paso >= 1) formula(g, 'p2', 230, 100, paso >= 2
      ? R`\dot c\,e^{-A}\ \htmlClass{k-violeta}{\cancel{- a\,c\,e^{-A}}}\ \htmlClass{k-violeta}{\cancel{+\, a\,c\,e^{-A}}} = b`
      : R`\dot c\,e^{-A}\ \htmlClass{k-violeta}{- a\,c\,e^{-A}}\ \htmlClass{k-violeta}{+\, a\,c\,e^{-A}} = b`, { p: q(1), tam: 19 });
    if (paso >= 2) formula(g, 'p3', 230, 160, R`\dot c\,e^{-A} = b \;\Rightarrow\; \dot c = b\,e^{A}`, { p: tramo(q(2), 0.3, 1), tam: 19, color: 'ambar' });
    if (paso >= 3) {
      formula(g, 'p4', 230, 230, R`c(t) = c_0 + \int_{t_0}^t b(\tau)\,e^{\int_{t_0}^{\tau} a}\,d\tau`, { p: q(3), tam: 18, color: 'ciruela' });
      panel(g, { x: 450, y: 200, w: 300, h: 230 }, R`\dot c(t) \text{ y su área}`, { clave: 'pa', p: q(3) });
      ejes(g, P, { numeros: false, y: '', clave: 'ea', p: q(3) });
      const tt = 2 * ease(q(3)), ctx = g.ctx;
      ctx.save(); ctx.beginPath(); ctx.moveTo(P.X(0), P.Y(0));
      for (let i = 0; i <= 60; i++) { const u = (tt * i) / 60; ctx.lineTo(P.X(u), P.Y(cp(u))); }
      ctx.lineTo(P.X(tt), P.Y(0)); ctx.closePath(); ctx.fillStyle = 'rgba(184,80,159,0.25)'; ctx.fill(); ctx.restore();
      grafica(g, P, cp, { color: 'ambar', p: q(3) });
    }
    if (paso >= 4) formula(g, 'p5', 230, 330, R`x(t) = \left(c_0 + \int_{t_0}^t b\,e^{\int_{t_0}^{\tau} a}\,d\tau\right)e^{-\int_{t_0}^t a}`, { p: q(4), tam: 18, color: 'cian' });
  },
  pasos: 5,
});
