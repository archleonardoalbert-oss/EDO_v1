// El procedimiento, literalmente: cuadrícula → calcular f en cada punto (el número queda escrito) → segmento
// centrado con esa pendiente → las soluciones son tangentes a todas las marcas.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, solucion, punto } from '../primitivas.js';
import { direccion, formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 360 }, { t: [-3, 3], y: [-2, 2] });
const TS = [-3, -2, -1, 0, 1, 2, 3], YS = [-2, -1, 0, 1, 2];

export default definirEscena({
  alto: 440,
  entradas: [{ id: 'f', tipo: 'funcion', etiqueta: R`f(t, y) =`, valor: 'y - t', ejemplos: ['y - t', 't + y', 'y', 't/2', '1 - y^2'] }],
  preparar: (e) => ({ e, f: (t, y) => e.fF(t, y) }),
  duracion: [1600, 1800, 2400, 2400, 2600],
  leyenda: { tenue: 'cuadrícula', ambar: 'valor f(t, y)', campo: 'marca de pendiente', cian: 'soluciones' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P, { rejilla: false });
    formula(g, 'def', 380, 20, R`\text{en cada punto } (t, y)\text{: un segmento de pendiente } f(t, y) = ${c.e.fTex}`, { p: q(0), tam: 15 });
    TS.forEach((t, i) => YS.forEach((y, j) => {
      const k = i * YS.length + j, orden = k / (TS.length * YS.length);
      const a1 = ease(tramo(q(1), orden * 0.6, orden * 0.6 + 0.4)), a2 = ease(tramo(q(2), orden * 0.6, orden * 0.6 + 0.4)), a3 = ease(tramo(q(3), orden * 0.6, orden * 0.6 + 0.4));
      const m = c.f(t, y), x = P.X(t), yy = P.Y(y);
      if (paso === 0 && t === 1 && y === 1) {
        const [ux, uy] = direccion(P, m), L = 40 * ease(p);
        punto(g, x, yy, { color: 'texto', r: 4 });
        g.linea([[x - ux * L, yy - uy * L], [x + ux * L, yy + uy * L]], { color: 'campo', ancho: 3 });
        g.tex('ej', x + 40, yy - 28, R`f(1, 1) = ${Number(m.toFixed(2))}`, { color: 'ambar', tam: 15, fondo: true });
      }
      if (paso >= 1) g.circulo(x, yy, 2.6, { color: 'tenue', alfa: a1 });
      if (paso >= 2 && Number.isFinite(m)) g.texto(x + 13, yy - 12, String(Number(m.toFixed(2))).replace('-', '−'), { color: 'ambar', tam: 11, alfa: a2 * (paso >= 4 ? 0.5 : 1) });
      if (paso >= 3 && Number.isFinite(m)) {
        const [ux, uy] = direccion(P, m), L = 17 * a3;
        g.linea([[x - ux * L, yy - uy * L], [x + ux * L, yy + uy * L]], { color: 'campo', ancho: 2.4, alfa: a3 });
      }
    }));
    if (paso === 4) [-1.5, -0.8, 0, 0.8, 1.5].forEach((y0, i) => solucion(g, P, c.f, 0, y0, { p: tramo(p, 0.1 * i, 0.6 + 0.1 * i), punto: false, ancho: 2 }));
  },
  pasos: 5,
});
