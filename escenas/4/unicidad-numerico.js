// Unicidad como árbitro de lo numérico: con 2y − 1 las aproximaciones (Δt, Δt/2, Δt/4) se acercan entre sí; con
// e^t sin y no (falla el método); con 3y^{2/3} desde 0, Euler se queda en 0 aunque hay otras soluciones (falla
// la hipótesis).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, grafica } from '../primitivas.js';
import { poligonoEuler, panel } from '../piezas.js';
import { potencia } from '../../motor/expresion.js';

const R = String.raw;
const PA = plano({ x: 40, y: 55, w: 200, h: 330 }, { t: [0, 1], y: [0.8, 4.4] });
const PB = plano({ x: 285, y: 55, w: 200, h: 330 }, { t: [0, 6.5], y: [-1, 8] });
const PC = plano({ x: 530, y: 55, w: 200, h: 330 }, { t: [-0.2, 1.5], y: [-0.5, 3.5] });
const COL = ['ambar', 'violeta', 'verde'];

export default definirEscena({
  alto: 440,
  preparar: () => ({
    a: [0.2, 0.1, 0.05].map((dt) => euler((t, y) => 2 * y - 1, 0, 1, dt, Math.round(1 / dt))),
    b: [0.1, 0.05, 0.025].map((dt) => euler((t, y) => Math.exp(t) * Math.sin(y), 0, 5, dt, Math.round(6.5 / dt))),
    c: euler((t, y) => 3 * potencia(y, 2 / 3), 0, 0, 0.1, 15),
  }),
  duracion: [2000, 2200, 2200, 2200],
  leyenda: { ambar: 'Δt', violeta: 'Δt/2', verde: 'Δt/4', cian: 'otra solución exacta' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 20, y: 25, w: 240, h: 390 }, R`2y - 1:\ \text{convergen}`, { clave: 'pa' });
    ejes(g, PA, { numeros: false, t: '', y: '', clave: 'ea' });
    c.a.forEach((eu, i) => poligonoEuler(g, PA, eu, { p: tramo(q(0), 0.2 * i, 0.6 + 0.2 * i), color: COL[i], radio: 2, ancho: 1.6 }));
    if (paso >= 1) {
      panel(g, { x: 265, y: 25, w: 240, h: 390 }, R`e^t\sin y:\ \text{no convergen}`, { clave: 'pb', p: q(1) });
      ejes(g, PB, { numeros: false, t: '', y: '', clave: 'eb', p: q(1) });
      c.b.forEach((eu, i) => poligonoEuler(g, PB, eu, { p: tramo(q(1), 0.2 * i, 0.6 + 0.2 * i), color: COL[i], puntos: false, ancho: 1.6 }));
    }
    if (paso >= 2) g.tex('mf', 385, 432, R`\Rightarrow\ \text{falla el método}`, { color: 'rojo', tam: 14, alfa: ease(q(2)), fondo: true });
    if (paso >= 3) {
      panel(g, { x: 510, y: 25, w: 240, h: 390 }, R`3y^{2/3}:\ \text{sin unicidad}`, { clave: 'pc', p: q(3) });
      ejes(g, PC, { numeros: false, t: '', y: '', clave: 'ec', p: q(3) });
      poligonoEuler(g, PC, c.c, { p: q(3), color: 'ambar', radio: 2 });
      grafica(g, PC, (t) => (t > 0 ? t ** 3 : 0), { p: tramo(q(3), 0.4, 1) });
      g.tex('hf', 630, 432, R`\Rightarrow\ \text{fallan las hipótesis}`, { color: 'rojo', tam: 14, alfa: ease(q(3)), fondo: true });
    }
  },
  pasos: 4,
});
