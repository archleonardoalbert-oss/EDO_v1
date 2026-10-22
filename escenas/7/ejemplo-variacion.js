// ẋ + 2x = e^{3t}: homogénea c e^{−2t}; ċ = e^{5t}; c = e^{5t}/5 + C; x = e^{3t}/5 + C e^{−2t}; verificación (residuo 0).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 60, y: 60, w: 380, h: 330 }, { t: [-1, 1], y: [-3, 5] });
const B = plano({ x: 510, y: 60, w: 230, h: 330 }, { t: [-1, 1], y: [-1, 6] });

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: 0.5, min: -2, max: 2, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [1800, 2000, 2000, 2200, 1800],
  leyenda: { violeta: 'x_h = c e^{−2t}', ciruela: 'c(t)', cian: 'x(t)', verde: 'residuo ẋ + 2x − e^{3t}' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), C = c.e.C;
    panel(g, { x: 30, y: 30, w: 440, h: 400 }, R`\dot x + 2x = e^{3t}`, { clave: 'pa' });
    ejes(g, A, { y: 'x', numeros: false, clave: 'ea' });
    [-2, -1, -0.4, 0.4, 1, 2].forEach((k, i) => grafica(g, A, (t) => k * Math.exp(-2 * t), { color: 'violeta', alfa: 0.5, brillo: 0, ancho: 1.4, p: tramo(q(0), 0.08 * i, 0.6 + 0.06 * i) }));
    if (paso >= 1) {
      panel(g, { x: 485, y: 30, w: 275, h: 400 }, R`c(t)`, { clave: 'pb', p: q(1) });
      ejes(g, B, { numeros: false, y: '', clave: 'eb', p: q(1) });
      grafica(g, B, (t) => Math.exp(5 * t), { color: 'ambar', p: q(1), guion: [5, 4], brillo: 0 });
      g.tex('cp', 622, 410, R`\dot c = e^{5t}`, { color: 'ambar', tam: 14, alfa: ease(q(1)), fondo: true });
    }
    if (paso >= 2) { grafica(g, B, (t) => Math.exp(5 * t) / 5 + C, { color: 'ciruela', p: q(2) }); g.tex('cc', 622, 85, R`c = \tfrac{e^{5t}}{5} + C`, { color: 'ciruela', tam: 14, alfa: ease(q(2)), fondo: true }); }
    if (paso >= 3) { grafica(g, A, (t) => Math.exp(3 * t) / 5 + C * Math.exp(-2 * t), { p: q(3) }); g.tex('x', 250, 410, R`x = \tfrac{e^{3t}}{5} + C\,e^{-2t}`, { color: 'cian', tam: 15, alfa: ease(q(3)), fondo: true }); }
    if (paso === 4) {
      g.linea([[A.X(-1), A.Y(0)], [A.X(1), A.Y(0)]], { color: 'verde', ancho: 4, alfa: 0.7 * ease(p) });
      g.tex('ok', 250, 70, R`\dot x + 2x - e^{3t} = 0\ \checkmark`, { color: 'verde', tam: 15, alfa: ease(p), fondo: true });
    }
  },
  pasos: 5,
});
