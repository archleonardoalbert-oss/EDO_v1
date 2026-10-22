// ¿Lineal? Con t fijo, el lado derecho como función de y: una recta si es lineal (a(t)y + b(t)), una curva si no.
// Homogénea: la recta pasa por el origen (y = 0 ⇒ y' = 0).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const EJ = [
  [R`t^2y + \cos t`, (t, y) => t * t * y + Math.cos(t), true],
  [R`2y + 8`, (t, y) => (2 * y + 8) / 4, true],
  [R`y^2`, (t, y) => y * y / 2, false],
  [R`e^t\sin y`, (t, y) => Math.exp(t / 2) * Math.sin(2 * y), false],
];

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [1, 3, 4],
  duracion: [1800, 2600, 1800, 2200, 2200],
  leyenda: { cian: 'lineal en y', rojo: 'no lineal', violeta: 'homogénea: pasa por (0, 0)' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), t = 0.8 * Math.sin(tiempo / 1300);
    formula(g, 'def', 380, 24, R`\dfrac{dy}{dt} = a(t)\,y + b(t)`, { p: q(0), tam: 18 });
    if (paso <= 2) {
      EJ.forEach(([tx, fn, lin], i) => {
        const x0 = 20 + 185 * i, Q = plano({ x: x0 + 15, y: 110, w: 145, h: 230 }, { t: [-2, 2], y: [-3, 3] }), a = paso === 0 ? 0 : ease(tramo(q(1), 0.15 * i, 0.4 + 0.15 * i));
        if (paso === 0) return;
        panel(g, { x: x0, y: 60, w: 175, h: 320 }, null, { p: a, clave: `p${i}` });
        formula(g, `f${i}`, x0 + 87, 80, R`\dfrac{dy}{dt} = ${tx}`, { p: a, tam: 13 });
        ejes(g, Q, { t: 'y', y: '', numeros: false, clave: `e${i}`, p: a, rejilla: false });
        grafica(g, Q, (y) => fn(t, y), { color: lin ? 'cian' : 'rojo', p: a });
        g.tex(`v${i}`, x0 + 87, 360, lin ? R`\checkmark\ \text{lineal}` : R`\text{no lineal}`, { color: lin ? 'cian' : 'rojo', tam: 14, alfa: a });
      });
      if (paso >= 1) g.tex('fij', 380, 420, R`\text{con } t = ${t.toFixed(2)} \text{ fijo, el lado derecho contra } y`, { color: 'texto2', tam: 13, fondo: true });
      if (paso === 2) g.tex('pot', 380, 444, R`\text{lineal: } y \text{ solo a la primera potencia}`, { color: 'cian', tam: 14, alfa: ease(p), fondo: true });
      return;
    }
    // homogénea frente a no homogénea
    [[R`(\sin 2t)\,y`, (y) => Math.sin(2 * t + 1) * y, true], [R`y + \sin 2t`, (y) => y + Math.sin(2 * t + 1), false]].forEach(([tx, fn, hom], i) => {
      const x0 = 40 + 370 * i, Q = plano({ x: x0 + 20, y: 100, w: 300, h: 260 }, { t: [-2, 2], y: [-2.5, 2.5] }), a = i === 0 ? ease(q(3)) : ease(q(4));
      if (a <= 0) return;
      panel(g, { x: x0, y: 60, w: 340, h: 330 }, R`\dfrac{dy}{dt} = ${tx}`, { p: a, clave: `h${i}` });
      ejes(g, Q, { t: 'y', y: '', numeros: false, clave: `eh${i}`, p: a, rejilla: false });
      grafica(g, Q, fn, { color: 'cian', p: a });
      punto(g, Q.X(0), Q.Y(fn(0)), { color: hom ? 'violeta' : 'ambar', r: 6, alfa: a, halo: true });
      g.tex(`hv${i}`, x0 + 170, 405, hom ? R`\textbf{homogénea}:\ b(t) = 0` : R`\textbf{no homogénea}:\ b(t) \ne 0`, { color: hom ? 'violeta' : 'ambar', tam: 14, alfa: a });
    });
  },
  pasos: 5,
});
