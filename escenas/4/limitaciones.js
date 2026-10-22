// e^t sin y con y(0) = 5: Euler tiende a π y, cerca de t = 5, salta (las pendientes son enormes y el paso se pasa
// de largo). Con Δt más pequeño el salto llega más tarde. Lupa sobre un paso que cruza el equilibrio.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { euler } from '../../motor/numerico.js';
import { ejes, rectaEquilibrio, solucion, punto } from '../primitivas.js';
import { poligonoEuler, formula, panel } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [0, 6.5], y: [-1, 8] });
const f = (t, y) => Math.exp(t) * Math.sin(y);

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'dt', tipo: 'deslizador', etiqueta: R`\Delta t`, valor: 0.1, min: 0.01, max: 0.15, paso: 0.005 }],
  preparar: (e) => ({ e, eu: euler(f, 0, 5, 0.1, 65), eu2: euler(f, 0, 5, 0.05, 130), euX: euler(f, 0, 5, e.dt, Math.round(6.5 / e.dt)) }),
  duracion: [1600, 2200, 2000, 2200, 2400, 2000, 1600],
  leyenda: { violeta: 'equilibrios y = nπ', ambar: 'Euler Δt = 0.1', ciruela: 'Euler Δt = 0.05', cian: 'solución verdadera' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    [0, Math.PI, 2 * Math.PI].forEach((y, i) => rectaEquilibrio(g, P, y, { color: 'violeta', p: q(0), rotulo: ['0', R`\pi`, R`2\pi`][i], ancho: 1.6 }));
    formula(g, 'ec', 370, 22, R`\dfrac{dy}{dt} = e^t\sin y,\ \ y(0) = 5`, { p: q(0), tam: 16 });
    if (paso >= 1) {
      const tope = paso === 1 ? 40 : 65;
      poligonoEuler(g, P, c.eu, { p: paso <= 2 ? q(paso) : 1, hasta: paso === 1 ? tope : 65, puntos: false });
    }
    if (paso === 2) g.tex('salta', P.X(5), P.Y(7.4), R`\text{¡salta cerca de } t = 5!`, { color: 'ambar', tam: 15, alfa: ease(tramo(p, 0.7, 1)), fondo: true });
    if (paso >= 3) {
      poligonoEuler(g, P, c.eu2, { p: paso === 3 ? p : 1, color: 'ciruela', puntos: false });
      if (paso === 3) g.tex('tarde', P.X(5.6), P.Y(6.5), R`\Delta t = 0.05:\ \text{más tarde, pero salta}`, { color: 'ciruela', tam: 14, alfa: ease(tramo(p, 0.6, 1)), fondo: true });
    }
    if (paso === 4) {
      // lupa: cerca de t = 5, un paso con pendiente enorme cruza el equilibrio π
      const L = { x: 420, y: 70, w: 230, h: 150 };
      panel(g, L, R`\text{lupa en } t \approx 5`, { p, clave: 'lupa' });
      const Lp = plano({ x: L.x + 15, y: L.y + 25, w: L.w - 30, h: L.h - 35 }, { t: [0, 1], y: [-1, 1] });
      g.linea([[Lp.caja.x, Lp.Y(0)], [Lp.caja.x + Lp.caja.w, Lp.Y(0)]], { color: 'violeta', ancho: 1.6, alfa: ease(p) });
      g.tex('pil', Lp.caja.x + 4, Lp.Y(0) + 12, R`\pi`, { color: 'violeta', tam: 13, ancla: 'l', alfa: ease(p) });
      punto(g, Lp.X(0.15), Lp.Y(0.25), { color: 'ambar', alfa: ease(p) });
      g.flecha(Lp.X(0.15), Lp.Y(0.25), Lp.X(0.15 + 0.5 * ease(p)), Lp.Y(0.25 - 1.6 * ease(p)), { color: 'ambar', ancho: 2.4 });
      g.tex('pas', L.x + L.w / 2, L.y + L.h + 16, R`\text{pendiente} \approx -e^5 \approx -148\ \Rightarrow\ \text{se pasa de largo}`, { color: 'ambar', tam: 13, alfa: ease(p), fondo: true });
    }
    if (paso >= 5) {
      solucion(g, P, f, 0, 5, { sentido: 'adelante', p: q(5) });
      poligonoEuler(g, P, c.euX, { color: 'verde', puntos: false, ancho: 1.6 });
      const lista = [R`1.\ \text{reducir } \Delta t \text{ (mueve el deslizador)}`, R`2.\ \text{comparar con la analítica}`, R`3.\ \text{¿respeta los equilibrios?}`];
      lista.forEach((tx, i) => g.tex(`v${i}`, P.X(2.2), P.Y(7.4) + 22 * i, tx, { color: 'texto', tam: 14, ancla: 'l', alfa: ease(tramo(q(5), 0.2 * i, 0.4 + 0.2 * i)), fondo: true }));
    }
    if (paso === 6) g.tex('inf', P.X(3.2), P.Y(-0.5), R`\text{útiles, pero \textbf{no infalibles}: validar con teoría}`, { color: 'verde', tam: 15, alfa: ease(p), fondo: true });
  },
  pasos: 7,
});
