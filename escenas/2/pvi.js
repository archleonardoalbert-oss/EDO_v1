// PVI y solución general para y' = 12t³ − 2 sin t: integrar da la familia 3t⁴ + 2cos t + C (traslaciones
// verticales); la condición inicial fija C y elige una curva.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, grafica, punto } from '../primitivas.js';
import { formula, barraValor } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 30, w: 560, h: 380 }, { t: [-1.25, 1.25], y: [-3, 12] });
const f = (t) => 12 * t ** 3 - 2 * Math.sin(t);
const Y = (C) => (t) => 3 * t ** 4 + 2 * Math.cos(t) + C;

export default definirEscena({
  alto: 440,
  entradas: [{ id: 'y0', tipo: 'deslizador', etiqueta: 'y(0)', valor: 3, min: -2, max: 8, paso: 0.01 }],
  preparar: (e) => ({ e }),
  duracion: [1600, 1600, 2400, 2200, 1400, 2200, 2200, 1400],
  leyenda: { campo: 'campo: solo depende de t', cian: 'solución particular', ciruela: 'condición inicial', tenue: 'solución general' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, (t) => f(t), { p: q(0), alfa: 0.5, nt: 21, ny: 17 });
    // 0 · el PVI: un punto (t0, y0) y la ecuación
    const y0 = paso <= 5 ? 3 : paso >= 6 && c.e.y0 === 3 ? Math.PI : c.e.y0;
    formula(g, 'pvi', P.X(-0.75), P.Y(11), R`\dfrac{dy}{dt} = f(t, y),\quad y(t_0) = y_0`, { p: q(0), tam: 16 });
    if (paso >= 1) formula(g, 'ej', P.X(0.62), P.Y(11), R`\dfrac{dy}{dt} = 12t^3 - 2\sin t`, { p: q(1), tam: 17 });
    // 2 · integrar: aparece toda la familia (traslaciones verticales)
    if (paso >= 2) {
      const a = paso === 2 ? 1 : 0.32;
      for (let C = -5; C <= 10; C += 1.5) grafica(g, P, Y(C), { p: paso === 2 ? tramo(p, 0, 0.7) : 1, color: 'tenue', brillo: 0, ancho: 1.5, alfa: a });
      formula(g, 'int', P.X(0.62), P.Y(9.3), R`y(t) = 3t^4 + 2\cos t + C`, { p: tramo(q(2), 0.3, 0.8), tam: 17 });
    }
    // 3 · condición inicial y(0) = 3 ⇒ C = 1
    if (paso >= 3 && paso <= 5) {
      punto(g, P.X(0), P.Y(3), { color: 'ciruela', r: 6, halo: true, alfa: ease(q(3)) });
      g.tex('ci', P.X(0) + 12, P.Y(3) + 16, R`y(0) = 3`, { color: 'ciruela', tam: 15, ancla: 'l', alfa: ease(q(3)) });
      barraValor(g, P, 0.02, 2, { p: tramo(q(3), 0.2, 0.6), color: 'tenue', rotulo: R`2\cos 0 = 2`, clave: 'b2' });
      g.tex('c1', P.X(0.62), P.Y(7.9), R`3 = 0 + 2 + C \Rightarrow C = 1`, { color: 'ciruela', tam: 17, alfa: ease(tramo(q(3), 0.5, 1)), fondo: true });
      grafica(g, P, Y(1), { p: q(4) });
      if (paso >= 4) g.tex('part', P.X(0.62), P.Y(6.5), R`y(t) = 3t^4 + 2\cos t + 1`, { color: 'cian', tam: 17, alfa: ease(q(4)), fondo: true });
      if (paso === 5) g.tex('gen', P.X(-0.7), P.Y(-2.2), R`\text{la general resuelve \textbf{cualquier} PVI: arrastra el punto}`, { color: 'texto2', tam: 14, alfa: ease(p) });
    }
    // 5–7 · cualquier condición inicial: y(0) = π ⇒ C = π − 2
    if (paso >= 5) {
      const v = paso === 5 ? c.e.y0 : y0, C = v - 2;
      if (paso >= 6) {
        g.tex('pi', P.X(0.62), P.Y(7.9), R`y(0) = ${paso >= 6 && c.e.y0 === 3 ? R`\pi` : v.toFixed(2)} \Rightarrow C = ${c.e.y0 === 3 ? R`\pi - 2` : C.toFixed(2)}`, { color: 'ciruela', tam: 17, alfa: ease(q(6)), fondo: true });
        if (paso === 7) g.tex('pp', P.X(0.62), P.Y(6.5), c.e.y0 === 3 ? R`y(t) = 3t^4 + 2\cos t + \pi - 2` : R`y(t) = 3t^4 + 2\cos t + ${C.toFixed(2)}`, { color: 'cian', tam: 17, alfa: ease(p), fondo: true });
      }
      if (paso >= 5) {
        const desde = paso === 6 ? mezclar(3, v, ease(p)) : v;
        grafica(g, P, Y(desde - 2), { p: 1 });
        punto(g, P.X(0), P.Y(desde), { color: 'ciruela', r: 6, halo: true });
      }
    }
  },
  pasos: 8,
  asas: (c, paso) => (paso >= 5 ? [{ id: 'y0', x: P.X(0), y: P.Y(paso >= 6 && c.e.y0 === 3 ? Math.PI : c.e.y0), color: 'ciruela', mover: (x, y) => ({ y0: P.V(y) }) }] : []),
});
