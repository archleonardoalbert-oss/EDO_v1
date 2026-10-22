// Graficar soluciones desde la línea de fase, con las cuatro reglas: equilibrios como rectas, monotonía por región,
// acercarse/alejarse según las flechas, y no cruzarse. f editable.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, lineaFase, rectaEquilibrio, solucion, equilibrios } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 150, y: 40, w: 560, h: 370 }, { t: [0, 6], y: [-3, 3] });

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'f', tipo: 'funcion', etiqueta: R`f(y) =`, valor: 'y^3 - 4y', vars: ['y'], ejemplos: ['y^3 - 4y', '(y + 1)(2 - y)', 'sin(2y)', '(y - 1)^2(y + 2)'] }],
  preparar: (e) => { const h = (y) => e.fF(y); return { e, h, eqs: equilibrios(h, -3, 3) }; },
  vivo: true,
  duracion: [1800, 1800, 2600, 2400, 1800],
  leyenda: { verde: 'sumidero', ambar: 'fuente', violeta: 'nodo', cian: 'soluciones' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), f = (t, y) => c.h(y);
    lineaFase(g, { f: c.h, eqs: c.eqs, coord: P.Y, desde: P.Y(-3), hasta: P.Y(3), otra: 70, rango: [-3, 3], tiempo, clave: 'lf' });
    ejes(g, P, { numeros: false });
    c.eqs.forEach((e) => rectaEquilibrio(g, P, e.y, { tipo: e.tipo, p: q(0) }));
    if (paso === 1) {
      const cortes = [-3, ...c.eqs.map((e) => e.y), 3];
      for (let i = 0; i < cortes.length - 1; i++) {
        const m = (cortes[i] + cortes[i + 1]) / 2, s = Math.sign(c.h(m));
        g.flecha(P.X(3), P.Y(m) + s * 16, P.X(3), P.Y(m) - s * 16, { color: s > 0 ? 'cian' : 'rojo', ancho: 2.4, alfa: ease(p) });
        g.tex(`m${i}`, P.X(3) + 14, P.Y(m), s > 0 ? R`\text{crece}` : R`\text{decrece}`, { color: s > 0 ? 'cian' : 'rojo', tam: 13, ancla: 'l', alfa: ease(p), fondo: true });
      }
    }
    if (paso >= 2) {
      const y0s = [];
      for (let y = -2.9; y < 3; y += 0.38) y0s.push(y);
      y0s.forEach((y0, i) => solucion(g, P, f, 0, y0, { p: paso === 2 ? tramo(p, 0.03 * i, 0.5 + 0.03 * i) : 1, sentido: 'adelante', punto: false, ancho: 1.7, alfa: 0.8 }));
    }
    if (paso === 3) formula(g, 'nc', 430, 22, R`\text{no se cruzan (unicidad): cada una queda en su franja}`, { p, tam: 15 });
    if (paso === 4) formula(g, 'tod', 430, 22, R`\text{todas las soluciones posibles, mirando solo la línea de fase}`, { p, tam: 15 });
  },
  pasos: 5,
});
