// y' = −2y + e^t: y_p = e^t/3; y_h = k e^{−2t}; y_h + y_p resuelve la no homogénea; la diferencia de dos soluciones
// resuelve la homogénea (se ve cómo cae a 0 como k e^{−2t}).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 60, w: 360, h: 330 }, { t: [-0.5, 2], y: [-2, 4] });
const B = plano({ x: 470, y: 60, w: 260, h: 330 }, { t: [-0.5, 2], y: [-2, 3] });
const yp = (t) => Math.exp(t) / 3, yh = (k) => (t) => k * Math.exp(-2 * t);

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 1.5, min: -2, max: 2, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [1800, 2200, 2400, 2200],
  leyenda: { cian: 'y_p = eᵗ/3 (particular)', violeta: 'y_h = k e^{−2t} (homogénea)', verde: 'y_h + y_p' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), k = c.e.k;
    panel(g, { x: 25, y: 25, w: 410, h: 400 }, R`\dfrac{dy}{dt} = -2y + e^t`, { clave: 'pa' });
    ejes(g, A, { numeros: false, clave: 'ea' });
    campo(g, A, (t, y) => -2 * y + Math.exp(t), { alfa: 0.35, nt: 15, ny: 15, p: q(0) });
    grafica(g, A, yp, { p: q(0) });
    if (paso >= 1) {
      panel(g, { x: 445, y: 25, w: 310, h: 400 }, R`\dfrac{dy}{dt} = -2y`, { clave: 'pb', p: q(1) });
      ejes(g, B, { numeros: false, clave: 'eb', p: q(1) });
      grafica(g, B, yh(k), { color: 'violeta', p: q(1) });
      grafica(g, A, (t) => yh(k)(t) + yp(t), { color: 'verde', p: q(1) });
      g.tex('s1', 230, 440, R`y_h + y_p \text{ resuelve la no homogénea}`, { color: 'verde', tam: 13, alfa: ease(q(1)), fondo: true });
    }
    if (paso >= 2) {
      [-1.5, -0.6, 0.6].forEach((k2, i) => grafica(g, A, (t) => yh(k2)(t) + yp(t), { color: 'verde', alfa: 0.4, brillo: 0, ancho: 1.4, p: tramo(q(2), 0.1 * i, 0.6 + 0.1 * i) }));
      grafica(g, B, (t) => yh(k)(t) - yh(-0.6)(t), { color: 'ambar', guion: [5, 4], p: q(2) });
      g.tex('s2', 600, 440, R`y_p - y_q \text{ resuelve la homogénea}`, { color: 'ambar', tam: 13, alfa: ease(q(2)), fondo: true });
    }
    if (paso === 3) formula(g, 'gen', 230, 50, R`y(t) = k\,e^{-2t} + \tfrac13 e^t`, { p, tam: 16, color: 'verde' });
  },
  pasos: 4,
});
