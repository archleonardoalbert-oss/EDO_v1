import { definirEscena } from '../../escenas/comun.js';
import { plano } from '../../motor/plano.js';
import { ejes, campo, solucion, lineaFase, equilibrios, rectaEquilibrio } from '../../escenas/primitivas.js';

export default definirEscena({
  alto: 430,
  entradas: [
    { id: 'f', tipo: 'funcion', etiqueta: "y' =", valor: '4y(1-y)', ejemplos: ['y-t', '4y(1-y)', 'sin(y)'] },
    { id: 'y0', tipo: 'deslizador', etiqueta: 'y_0', valor: 0.2, min: -1, max: 2, paso: 0.01 },
  ],
  preparar: (e) => {
    const P = plano({ x: 120, y: 30, w: 600, h: 360 }, { t: [-1, 3], y: [-1, 2] });
    const f = (t, y) => e.fF(t, y);
    return { e, P, f, eqs: equilibrios((y) => e.fF(0, y), -1, 2) };
  },
  vivo: [2],
  leyenda: { cian: 'solución', verde: 'sumidero', ambar: 'fuente', campo: 'campo de pendientes' },
  capas: [
    (g, c, o) => { ejes(g, c.P, { p: o.p }); campo(g, c.P, c.f, { p: o.p }); },
    (g, c, o) => { c.eqs.forEach((q) => rectaEquilibrio(g, c.P, q.y, { tipo: q.tipo, p: o.p })); solucion(g, c.P, c.f, 0, c.e.y0, { p: o.p }); },
    (g, c, o) => lineaFase(g, { f: (y) => c.f(0, y), eqs: c.eqs, coord: c.P.Y, desde: c.P.Y(-1), hasta: c.P.Y(2), otra: 50, rango: [-1, 2], p: o.p, tiempo: o.tiempo }),
  ],
  asas: (c) => [{ id: 'y0', x: c.P.X(0), y: c.P.Y(c.e.y0), color: 'cian', mover: (x, y) => ({ y0: c.P.V(y) }) }],
});
