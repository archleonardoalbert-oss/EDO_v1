// (1 + y)²: y = −1 es un nodo; por debajo las soluciones suben hacia −1, por encima suben y se alejan. La fórmula
// y = −1 − 1/(t + C) muestra la explosión en t = −C, que la línea de fase no ve.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, lineaFase, rectaEquilibrio, curva } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 150, y: 40, w: 560, h: 370 }, { t: [-3, 3], y: [-4, 3] });
const h = (y) => (1 + y) ** 2;
const ramas = (C) => { const izq = [[], []], der = [[], []]; for (let i = 0; i <= 500; i++) { const t = -3 + (6 * i) / 500; if (Math.abs(t + C) < 1e-6) continue; const y = -1 - 1 / (t + C); (t < -C ? izq : der)[0].push(t); (t < -C ? izq : der)[1].push(y); } return [izq, der]; };

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: -1, min: -2.5, max: 2.5, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: true,
  duracion: [1800, 2000, 2200, 2400, 1800],
  leyenda: { violeta: 'y = −1: nodo', cian: 'soluciones', rojo: 'explosión en t = −C' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    lineaFase(g, { f: h, eqs: [{ y: -1, tipo: 'nodo' }], coord: P.Y, desde: P.Y(-4), hasta: P.Y(3), otra: 70, rango: [-4, 3], tiempo, clave: 'lf' });
    ejes(g, P, { numeros: false });
    rectaEquilibrio(g, P, -1, { color: 'violeta', p: q(0) });
    formula(g, 'ec', 430, 22, R`\dfrac{dy}{dt} = (1 + y)^2 \ge 0`, { p: q(0), tam: 16 });
    // la rama con t < −C está por encima de −1 (sube a +∞); la de t > −C, por debajo (sube hacia −1)
    const C = c.e.C, [arriba, abajo] = ramas(C);
    if (paso >= 1) curva(g, P, arriba[0], arriba[1], { p: q(1) });
    if (paso >= 2) curva(g, P, abajo[0], abajo[1], { p: q(2) });
    if (paso === 1) g.tex('ar', P.X(-1.6), P.Y(1.4), R`y > -1:\ \text{crece} \to +\infty`, { color: 'cian', tam: 14, fondo: true });
    if (paso === 2) g.tex('ab', P.X(-1.4), P.Y(-3.5), R`y < -1:\ \text{\textbf{crece}} \to -1`, { color: 'cian', tam: 14, fondo: true });
    if (paso >= 3) {
      formula(g, 'sol', 430, 50, R`y(t) = -1 - \dfrac{1}{t + C}`, { p: q(3), tam: 16, color: 'cian' });
      g.linea([[P.X(-C), P.caja.y], [P.X(-C), P.caja.y + P.caja.h]], { color: 'rojo', ancho: 1.6, guion: [6, 5], alfa: ease(q(3)) });
      g.tex('tc', P.X(-C) + 8, P.Y(-3.6), R`t = -C = ${(-C).toFixed(2)}`, { color: 'rojo', tam: 13, ancla: 'l', alfa: ease(q(3)), fondo: true });
    }
    if (paso === 4) g.tex('nove', 430, 432, R`\text{la línea de fase dice «sube», pero no que llega a } \infty \text{ en tiempo finito}`, { color: 'texto', tam: 14, alfa: ease(p), fondo: true });
  },
  pasos: 5,
});
