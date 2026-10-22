// Valientes · error de Euler: el error local de un paso (la curvatura que la tangente no ve), la acumulación paso a
// paso (barras) y el efecto de dividir h entre dos.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { poligonoEuler, formula, panel, tangente } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 50, w: 330, h: 340 }, { t: [0, 1.05], y: [0.8, 4.4] });
const B = plano({ x: 450, y: 50, w: 280, h: 340 }, { t: [0, 1.05], y: [0, 1.2] });
const f = (t, y) => 2 * y - 1, Y = (t) => (Math.exp(2 * t) + 1) / 2;

export default definirEscena({
  alto: 430,
  preparar: () => ({ e1: euler(f, 0, 1, 0.2, 5), e2: euler(f, 0, 1, 0.1, 10) }),
  duracion: [2200, 2800, 2600],
  leyenda: { cian: 'solución', ambar: 'Euler h = 0.2', violeta: 'Euler h = 0.1', rojo: 'error' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    panel(g, { x: 25, y: 22, w: 370, h: 395 }, R`y(t)`, { clave: 'pa' });
    ejes(g, A, { y: '', numeros: false, clave: 'ea' });
    grafica(g, A, Y, {});
    if (paso === 0) {
      // un paso: tangente en t = 0.4 y la separación al cabo de h
      const t = 0.4, h = 0.4;
      tangente(g, A, t, Y(t), f(t, Y(t)), { largo: 240, p });
      punto(g, A.X(t), A.Y(Y(t)), { color: 'cian' });
      const yt = Y(t) + h * f(t, Y(t));
      g.linea([[A.X(t + h), A.Y(yt)], [A.X(t + h), A.Y(Y(t + h))]], { color: 'rojo', ancho: 3, alfa: ease(tramo(p, 0.5, 1)) });
      g.tex('loc', A.X(t + h) + 8, (A.Y(yt) + A.Y(Y(t + h))) / 2, R`\approx \tfrac{h^2}{2}|y''|`, { color: 'rojo', tam: 15, ancla: 'l', alfa: ease(tramo(p, 0.5, 1)), fondo: true });
      return;
    }
    poligonoEuler(g, A, c.e1, { p: paso === 1 ? p : 1, radio: 3 });
    panel(g, { x: 410, y: 22, w: 345, h: 395 }, R`|e_k| = |y(t_k) - y_k|`, { clave: 'pb' });
    ejes(g, B, { y: '', numeros: false, clave: 'eb' });
    const barras = (eu, color, dx, alfa) => eu.t.forEach((t, k) => { const e = Y(t) - eu.y[k]; g.rect(B.X(t) + dx, B.Y(e), 9, B.Y(0) - B.Y(e), { color, alfa, radio: 2 }); });
    barras({ t: c.e1.t.slice(0, Math.round(1 + 5 * ease(q(1)))), y: c.e1.y }, 'ambar', -10, 0.85);
    if (paso === 1) formula(g, 'rec', 590, 405, R`|e_{k+1}| \le (1 + hL)|e_k| + \tfrac{M_2h^2}{2}`, { p, tam: 14 });
    if (paso === 2) {
      poligonoEuler(g, A, c.e2, { p, color: 'violeta', radio: 2.4 });
      barras({ t: c.e2.t.slice(0, Math.round(1 + 10 * ease(p))), y: c.e2.y }, 'violeta', 1, 0.85);
      const r = (Y(1) - c.e1.y.at(-1)) / (Y(1) - c.e2.y.at(-1));
      g.tex('mit', 590, 75, R`\dfrac{e(h = 0.2)}{e(h = 0.1)} \approx ${r.toFixed(2)}\ (\to 2 \text{ al refinar})`, { color: 'texto', tam: 15, alfa: ease(tramo(p, 0.6, 1)), fondo: true });
    }
  },
  pasos: 3,
});
