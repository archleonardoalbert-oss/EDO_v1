// ¿Por qué métodos numéricos? Queremos y(2) sin fórmula. Euler: desde (t0, y0), un segmento con la pendiente del
// campo, longitud horizontal Δt; repetir. Con Δt más pequeño, la poligonal se pega a la solución.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, campo, solucion, punto } from '../primitivas.js';
import { poligonoEuler, formula, tangente } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [0, 2.4], y: [-0.5, 3] });

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 'f', tipo: 'funcion', etiqueta: R`\dfrac{dy}{dt} =`, valor: 'sin(2t) + y/2', ejemplos: ['sin(2t) + y/2', 't - y^2 + 1', '2y - 1', 'y(1 - y/3)'] },
    { id: 'dt', tipo: 'deslizador', etiqueta: R`\Delta t`, valor: 0.4, min: 0.05, max: 0.6, paso: 0.05 },
    { id: 'y0', tipo: 'deslizador', etiqueta: 'y_0', valor: 0.4, min: -0.4, max: 2.5, paso: 0.05 },
  ],
  preparar: (e) => { const f = (t, y) => e.fF(t, y); return { e, f, eu: euler(f, 0, e.y0, e.dt, Math.ceil(2 / e.dt)) }; },
  duracion: [1600, 1800, 1800, 2000, 2600, 2000],
  leyenda: { campo: 'campo de pendientes', cian: 'la solución (desconocida)', ambar: 'Euler: segmentos de recta', ciruela: 'condición inicial' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), { e, f, eu } = c;
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45, nt: 21, ny: 15 });
    punto(g, P.X(0), P.Y(e.y0), { color: 'ciruela', r: 6, halo: true });
    g.linea([[P.X(2), P.caja.y], [P.X(2), P.caja.y + P.caja.h]], { color: 'texto2', ancho: 1, guion: [4, 5], alfa: 0.6 });
    if (paso <= 1) g.tex('q', P.X(2) + 8, P.Y(2.7), R`y(2) = \;?`, { color: 'texto', tam: 18, ancla: 'l', fondo: true });
    if (paso === 1) formula(g, 'num', 370, 22, R`\text{métodos numéricos: aproximar paso a paso}`, { p, tam: 15 });
    if (paso >= 2) solucion(g, P, f, 0, e.y0, { p: q(2), sentido: 'adelante', alfa: paso >= 3 ? 0.55 : 1, brillo: paso >= 3 ? 0 : 7 });
    if (paso === 2) formula(g, 'tg', 370, 22, R`\text{la solución es tangente al campo en cada punto}`, { p, tam: 15 });
    if (paso === 3) {
      // un solo paso: tangente en (t0, y0), avanzar Δt
      tangente(g, P, 0, e.y0, f(0, e.y0), { largo: 260, alfa: 0.5 });
      poligonoEuler(g, P, eu, { p, hasta: 1 });
      g.tex('t1', P.X(eu.t[1]) + 8, P.Y(eu.y[1]) + 16, R`(t_1, y_1)`, { color: 'ambar', tam: 14, ancla: 'l', alfa: ease(tramo(p, 0.7, 1)), fondo: true });
      g.tex('t0', P.X(0) + 10, P.Y(e.y0) + 18, R`(t_0, y_0)`, { color: 'ciruela', tam: 14, ancla: 'l', fondo: true });
    }
    if (paso >= 4) {
      const k = poligonoEuler(g, P, eu, { p: paso === 4 ? p : 1 });
      for (let i = 1; i <= Math.min(k, 4); i++) g.tex(`pt${i}`, P.X(eu.t[i]) - 6, P.Y(eu.y[i]) - 16, R`(t_${i}, y_${i})`, { color: 'ambar', tam: 13, ancla: 'r', fondo: true });
      if (paso === 4) formula(g, 'rep', 370, 22, R`\text{repetir desde } (t_1, y_1),\ (t_2, y_2),\ \dots`, { p, tam: 15 });
    }
    if (paso === 5) {
      const fino = euler(f, 0, e.y0, e.dt / 4, Math.ceil(8 / e.dt));
      poligonoEuler(g, P, fino, { p, color: 'verde', puntos: false, ancho: 1.8 });
      g.tex('mejor', 370, 22, R`\Delta t = ${e.dt.toFixed(2)}\ (\text{ámbar})\ \text{ y } \tfrac{\Delta t}{4}\ (\text{verde}):\ \text{más pequeño, mejor}`, { color: 'texto', tam: 14, fondo: true });
    }
  },
  pasos: 6,
  asas: (c) => [{ id: 'y0', x: P.X(0), y: P.Y(c.e.y0), color: 'ciruela', mover: (x, y) => ({ y0: P.V(y) }) }],
});
