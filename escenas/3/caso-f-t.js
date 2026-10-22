// dy/dt = 2t: marcas paralelas en cada recta vertical; las soluciones t² + C son traslaciones verticales.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, grafica, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 370 }, { t: [-2.2, 2.2], y: [-3, 4] });
const f = (t) => 2 * t;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: 0, min: -3, max: 3, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: [2],
  duracion: [2200, 2200, 1800],
  leyenda: { campo: 'campo 2t', ambar: 'una recta vertical: marcas paralelas', cian: 'y = t² + C' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    // 0 · columnas de marcas paralelas
    const col = paso === 0 ? mezclar(-2, 1, ease(p)) : 1;
    campo(g, P, (t) => f(t), { alfa: 0.6, nt: 23, ny: 15, destacar: (m) => (paso === 0 && Math.abs(m.t - Math.round(col * 5.5) / 5.5) < 0.1 ? 'ambar' : null) });
    if (paso === 0) g.tex('par', 380, 22, R`\text{misma } t \Rightarrow \text{misma pendiente: } 2t \text{ no depende de } y`, { color: 'ambar', tam: 15, fondo: true });
    if (paso >= 1) {
      formula(g, 'int', 380, 22, R`y(t) = \int 2t\,dt = t^2 + C`, { p: q(1), tam: 18 });
      for (let C = -3; C <= 3; C += 1) grafica(g, P, (t) => t * t + C, { p: paso === 1 ? tramo(p, (C + 3) * 0.06, 0.6 + (C + 3) * 0.06) : 1, alfa: 0.35, brillo: 0, ancho: 1.6 });
    }
    if (paso === 2) {
      const C = c.e.C + 1.5 * Math.sin(tiempo / 900);
      grafica(g, P, (t) => t * t + C, {});
      punto(g, P.X(0), P.Y(C), { color: 'cian', halo: true });
      g.flecha(P.X(1.6), P.Y(1.6 * 1.6 + C) + 30, P.X(1.6), P.Y(1.6 * 1.6 + C) - 30, { color: 'texto2', ancho: 1.6 });
      g.tex('tv', P.X(1.75), P.Y(1.6 * 1.6 + C), R`\text{traslación vertical}`, { color: 'texto2', tam: 13, ancla: 'l', fondo: true });
    }
  },
  pasos: 3,
});
