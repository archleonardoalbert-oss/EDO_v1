// Linealización: la gráfica de f(y) (con el eje y horizontal) y su recta tangente en cada equilibrio. Si f cruza
// el eje de arriba hacia abajo (f' < 0): sumidero; de abajo hacia arriba (f' > 0): fuente. Debajo, la línea de fase.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { deriv } from '../../motor/numerico.js';
import { ejes, grafica, lineaFase, equilibrios, punto, COLOR_TIPO } from '../primitivas.js';
import { formula, tangente } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 50, w: 620, h: 280 }, { t: [-3, 3], y: [-3, 3] });

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'f', tipo: 'funcion', etiqueta: R`f(y) =`, valor: '(y + 2)(y - 0.5)(2 - y)/2', vars: ['y'], ejemplos: ['(y + 2)(y - 0.5)(2 - y)/2', 'sin(2y)', 'y^3 - y', 'y^2 - 1'] }],
  preparar: (e) => { const h = (y) => e.fF(y); return { e, h, eqs: equilibrios(h, -3, 3).map((q) => ({ ...q, d: deriv(h, q.y) })) }; },
  duracion: [1800, 2400, 2400, 2000, 2000, 1800],
  leyenda: { texto: 'gráfica de f', verde: "f′(y₀) < 0: sumidero", ambar: "f′(y₀) > 0: fuente", violeta: "f′(y₀) = 0: no decide" },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P, { t: 'y', y: R`f(y)` });
    grafica(g, P, c.h, { color: 'texto', brillo: 3, ancho: 2.2, p: q(0) });
    lineaFase(g, { f: c.h, eqs: c.eqs, coord: P.X, desde: P.X(-3), hasta: P.X(3), otra: 400, rango: [-3, 3], orientacion: 'horizontal', p: q(0), particulas: false, clave: 'lf' });
    g.tex('lfy', P.X(3) + 14, 400, 'y', { color: 'texto2', tam: 14, ancla: 'l' });
    // pasos 1–2: cada equilibrio con su tangente (según el signo de f')
    c.eqs.forEach((e, i) => {
      const tipo = Math.abs(e.d) < 1e-6 ? 'nodo' : e.d < 0 ? 'sumidero' : 'fuente';
      // paso 1: los de f' < 0; paso 2: además los de f' > 0; desde el 3: todos
      if (paso === 0 || (paso === 1 && e.d >= 0) || (paso === 2 && Math.abs(e.d) < 1e-6)) return;
      const a = (paso === 1 && e.d < 0) || (paso === 2 && e.d > 0) ? ease(p) : 1;
      tangente(g, P, e.y, 0, e.d, { largo: 130, color: COLOR_TIPO[tipo], alfa: a });
      punto(g, P.X(e.y), P.Y(0), { color: COLOR_TIPO[tipo], r: 6, halo: true, alfa: a });
      g.tex(`d${i}`, P.X(e.y), P.Y(0) + (e.d < 0 ? -26 : 26), R`f'(${e.y.toFixed(2)}) = ${e.d.toFixed(2)}`, { color: COLOR_TIPO[tipo], tam: 13, alfa: a, fondo: true });
    });
    if (paso === 1) formula(g, 's', 380, 24, R`f'(y_0) < 0 \Rightarrow \textbf{sumidero}`, { p, tam: 17, color: 'verde' });
    if (paso === 2) formula(g, 'f', 380, 24, R`f'(y_0) > 0 \Rightarrow \textbf{fuente}`, { p, tam: 17, color: 'ambar' });
    if (paso === 3) formula(g, 'g1', 380, 24, R`\text{cruza el eje de arriba hacia abajo: } + \to - \text{, las flechas apuntan al punto}`, { p, tam: 14, color: 'verde' });
    if (paso === 4) formula(g, 'g2', 380, 24, R`\text{cruza de abajo hacia arriba: } - \to + \text{, las flechas se alejan}`, { p, tam: 14, color: 'ambar' });
    if (paso === 5) formula(g, 'g3', 380, 24, R`f'(y_0) = 0:\ \text{la tangente es horizontal y no dice nada (prueba } (y - 1)^2\text{)}`, { p, tam: 14, color: 'violeta' });
  },
  pasos: 6,
});
