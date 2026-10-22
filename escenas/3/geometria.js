// La geometría de dy/dt = f(t, y): por un punto (t1, y1) la solución pasa con pendiente f(t1, y1); hacerlo en
// muchos puntos (una ola que se extiende) da el campo de pendientes.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, punto } from '../primitivas.js';
import { tangente, formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 360 }, { t: [-3, 3], y: [-2, 3] });

export default definirEscena({
  alto: 440,
  entradas: [
    { id: 'f', tipo: 'funcion', etiqueta: R`\dfrac{dy}{dt} =`, valor: 'sin(t) + y/3', ejemplos: ['sin(t) + y/3', 'y - t', 't y', '1 - y^2'] },
    { id: 't1', tipo: 'deslizador', etiqueta: 't_1', valor: -0.5, min: -2.8, max: 2.8, paso: 0.05 },
    { id: 'y1', tipo: 'deslizador', etiqueta: 'y_1', valor: 0.6, min: -1.8, max: 2.8, paso: 0.05 },
  ],
  preparar: (e) => ({ e, f: (t, y) => e.fF(t, y) }),
  duracion: [1800, 2600, 2400],
  leyenda: { cian: 'la solución por (t₁, y₁)', ambar: 'su tangente: pendiente f(t₁, y₁)', campo: 'marcas de pendiente' },
  dibujar(g, c, { paso, p }) {
    const { t1, y1 } = c.e, m = c.f(t1, y1), q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    if (paso >= 1) {
      // las tangentes se extienden en una ola desde el punto
      const dmax = 7 * ease(q(1));
      campo(g, P, c.f, { nt: 25, ny: 17, alfa: paso === 2 ? 0.8 : 0.7, largo: 15,
        mostrar: (k) => paso !== 1 || Math.hypot(k.t - t1, k.y - y1) <= dmax });
    }
    solucion(g, P, c.f, t1, y1, { p: q(0), alfa: paso === 2 ? 0.7 : 1 });
    tangente(g, P, t1, y1, m, { p: q(0), largo: 160 });
    punto(g, P.X(t1), P.Y(y1), { color: 'ciruela', r: 6, halo: true });
    g.tex('m', P.X(t1) + 14, P.Y(y1) + 20, R`\left.\tfrac{dy}{dt}\right|_{t_1} = f(t_1, y_1) = ${m.toFixed(2)}`, { color: 'ambar', tam: 15, ancla: 'l', fondo: true });
    if (paso === 1) formula(g, 'int', 380, 22, R`\text{el lado derecho: la pendiente de la tangente en \textbf{cada} punto}`, { p, tam: 15 });
    if (paso === 2) formula(g, 'cp', 380, 22, R`\text{todas juntas: el \textbf{campo de pendientes}}`, { p, tam: 16 });
  },
  pasos: 3,
  asas: (c) => [{ id: 'p', x: P.X(c.e.t1), y: P.Y(c.e.y1), color: 'ciruela', mover: (x, y) => ({ t1: P.T(x), y1: P.V(y) }) }],
});
