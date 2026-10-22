// La fórmula de Euler a partir de un solo paso ampliado: la tangente en (t_k, y_k), el siguiente punto sobre ella,
// el triángulo con base Δt y altura f(t_k, y_k)·Δt.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, campo, solucion, punto } from '../primitivas.js';
import { poligonoEuler, formula, tangente } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 50, w: 420, h: 360 }, { t: [-0.2, 1.4], y: [0.6, 3.2] });
const f = (t, y) => 2 * y - 1;
const TK = 0.4, YK = (Math.exp(0.8) + 1) / 2;   // un punto de la solución por (0, 1)

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'dt', tipo: 'deslizador', etiqueta: R`\Delta t`, valor: 0.5, min: 0.1, max: 0.8, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [1600, 2000, 1800, 2200, 1800, 1800, 2000],
  leyenda: { cian: 'solución verdadera', ambar: 'paso de Euler sobre la tangente', violeta: 'Δt', verde: 'f(t_k, y_k)·Δt' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), dt = c.e.dt, m = f(TK, YK);
    const t1 = TK + dt, y1 = YK + m * dt;
    ejes(g, P, { numeros: false });
    campo(g, P, f, { alfa: 0.35, nt: 15, ny: 13 });
    // panel de fórmulas a la derecha (la memoria del razonamiento)
    const lineas = [
      [0, R`\dfrac{dy}{dt} = f(t, y),\ \ y(t_0) = y_0`],
      [1, R`t_{k+1} = t_k + \Delta t`],
      [1, R`y_{k+1} = y_k + f(t_k, y_k)\,\Delta t`],
      [2, R`\text{pendiente en } (t_k, y_k):\ f(t_k, y_k)`],
      [4, R`\dfrac{y_{k+1} - y_k}{t_{k+1} - t_k} = f(t_k, y_k)`],
      [5, R`\dfrac{y_{k+1} - y_k}{\Delta t} = f(t_k, y_k)`],
      [6, R`y_{k+1} = y_k + f(t_k, y_k)\,\Delta t`],
    ];
    lineas.forEach(([desde, tx], i) => { if (paso >= desde) formula(g, `l${i}`, 625, 40 + 52 * i, tx, { p: q(desde), tam: i === 6 ? 18 : 15, color: i === 6 ? 'ambar' : 'texto' }); });
    solucion(g, P, f, 0, 1, { p: q(0), alfa: 0.7 });
    if (paso === 1) poligonoEuler(g, P, euler(f, 0, 1, 0.25, 5), { p, alfa: 0.9 });
    if (paso >= 2) {
      punto(g, P.X(TK), P.Y(YK), { color: 'texto', r: 5 });
      g.tex('pk', P.X(TK) - 10, P.Y(YK) - 6, R`(t_k, y_k)`, { color: 'texto', tam: 14, ancla: 'r', fondo: true });
      tangente(g, P, TK, YK, m, { p: q(2), largo: 380, color: 'ambar', alfa: 0.7 });
    }
    if (paso >= 3) {
      const s = ease(q(3));
      punto(g, P.X(mezclar(TK, t1, s)), P.Y(mezclar(YK, y1, s)), { color: 'ambar', r: 5, halo: true });
      g.tex('pk1', P.X(t1) + 10, P.Y(y1) + 4, R`(t_{k+1}, y_{k+1})`, { color: 'ambar', tam: 14, ancla: 'l', alfa: ease(tramo(q(3), 0.7, 1)), fondo: true });
      // la solución verdadera en t_{k+1}: Euler se queda corto
      if (paso >= 3) { const yv = (Math.exp(2 * t1) + 1) / 2; if (yv < 3.2) { g.circulo(P.X(t1), P.Y(yv), 4, { color: 'cian', alfa: ease(q(3)) }); g.linea([[P.X(t1), P.Y(yv)], [P.X(t1), P.Y(y1)]], { color: 'rojo', ancho: 1.6, guion: [3, 3], alfa: ease(tramo(q(3), 0.6, 1)) }); } }
    }
    if (paso >= 4) {
      g.linea([[P.X(TK), P.Y(YK)], [P.X(t1), P.Y(YK)]], { color: 'violeta', ancho: 2.4, alfa: ease(q(4)) });
      g.linea([[P.X(t1), P.Y(YK)], [P.X(t1), P.Y(y1)]], { color: 'verde', ancho: 2.4, alfa: ease(q(4)) });
      g.tex('h1', (P.X(TK) + P.X(t1)) / 2, P.Y(YK) + 16, paso >= 5 ? R`\Delta t` : R`t_{k+1} - t_k`, { color: 'violeta', tam: 14, alfa: ease(q(4)), fondo: true });
      g.tex('v1', P.X(t1) + 8, (P.Y(YK) + P.Y(y1)) / 2, paso >= 6 ? R`f(t_k, y_k)\,\Delta t` : R`y_{k+1} - y_k`, { color: 'verde', tam: 14, ancla: 'l', alfa: ease(q(4)), fondo: true });
    }
  },
  pasos: 7,
});
