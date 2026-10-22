// Valientes · traslación: a la misma altura, la misma pendiente; la curva deslizada sigue siendo solución, y otra
// solución que pasa por la misma altura encaja exactamente encima.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar, solucionCache } from '../../motor/plano.js';
import { ejes, campo, curva, punto } from '../primitivas.js';
import { tangente } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 30, w: 640, h: 340 }, { t: [-3, 3], y: [-0.3, 1.3] });
const f = (t, y) => 4 * y * (1 - y), Y0 = 0.5;

export default definirEscena({
  alto: 410,
  entradas: [{ id: 'c', tipo: 'deslizador', etiqueta: 'c', valor: 1.2, min: -2, max: 2, paso: 0.05 }],
  preparar: (e) => ({ e, base: solucionCache(f, 0, Y0, P) }),
  duracion: [1600, 2200, 2600],
  leyenda: { cian: 'y₁', violeta: 'y₁(t + c)', ambar: 'y₂ (otra solución)', campo: 'campo' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const dibu = (d, op) => { curva(g, P, c.base.atras.t.map((t) => t - d), c.base.atras.y, op); curva(g, P, c.base.adelante.t.map((t) => t - d), c.base.adelante.y, op); };
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45, destacar: (m) => (Math.abs(m.y - Y0) < 0.04 ? 'ambar' : null), ny: 17 });
    g.linea([[P.caja.x, P.Y(Y0)], [P.caja.x + P.caja.w, P.Y(Y0)]], { color: 'texto2', ancho: 1, guion: [3, 5], alfa: 0.5 });
    g.tex('y0', P.caja.x + P.caja.w + 8, P.Y(Y0), R`y_0`, { color: 'texto2', tam: 14, ancla: 'l' });
    dibu(0, { p: q(0) });
    tangente(g, P, 0, Y0, f(0, Y0), { p: q(0), largo: 120 });
    punto(g, P.X(0), P.Y(Y0), { color: 'cian' });
    if (paso >= 1) {
      const d = mezclar(0, c.e.c, ease(q(1)));
      dibu(d, { color: 'violeta' });
      tangente(g, P, -d, Y0, f(0, Y0), { largo: 120, alfa: ease(q(1)) });
      punto(g, P.X(-d), P.Y(Y0), { color: 'violeta' });
      g.tex('mis', P.X(-d), P.Y(Y0) - 60, R`\text{misma altura} \Rightarrow \text{misma pendiente}`, { color: 'violeta', tam: 13, alfa: ease(q(1)), fondo: true });
    }
    if (paso === 2) {
      // y2: la solución que pasa por y0 en t2 = 1.8; se desliza hasta coincidir con y1
      const t2 = 1.8, d = mezclar(-t2, 0, ease(tramo(p, 0.3, 1)));
      dibu(d, { color: 'ambar', ancho: 3 });
      punto(g, P.X(-d), P.Y(Y0), { color: 'ambar' });
      g.tex('enc', P.X(0), P.Y(1.18), R`y_2(t) = y_1(t + t_1 - t_2)`, { color: 'ambar', tam: 16, alfa: ease(tramo(p, 0.8, 1)), fondo: true });
    }
  },
  pasos: 3,
});
