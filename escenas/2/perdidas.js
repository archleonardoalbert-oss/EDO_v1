// dy/dt = y²: la familia −1/(t + C) no contiene a y ≡ 0, aunque y ≡ 0 es solución. Hacer C enorme aplana la
// curva hacia 0, pero nunca la alcanza: el equilibrio hay que añadirlo a mano.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, curva, punto, rectaEquilibrio } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-3, 3], y: [-3, 3] });
const f = (t, y) => y * y;
function hiperbola(C) {
  const izq = [[], []], der = [[], []];
  for (let i = 0; i <= 400; i++) { const t = -3 + (6 * i) / 400, y = -1 / (t + C); (t < -C ? izq : der)[0].push(t); (t < -C ? izq : der)[1].push(y); }
  return [izq, der];
}

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 't0', tipo: 'deslizador', etiqueta: 't_0', valor: 0, min: -2.5, max: 2.5, paso: 0.05 },
    { id: 'y0', tipo: 'deslizador', etiqueta: 'y_0', valor: 0.8, min: -2.8, max: 2.8, paso: 0.05 },
  ],
  preparar: (e) => ({ e }),
  vivo: [2],
  duracion: [2400, 1800, 2000, 1800, 1800],
  leyenda: { campo: 'campo y²', cian: 'familia −1/(t + C)', violeta: 'y ≡ 0: equilibrio perdido', ciruela: 'condición inicial' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45 });
    formula(g, 'int', 330, 28, R`\int \dfrac{dy}{y^2} = \int dt \;\Rightarrow\; -\dfrac{1}{y} = t + C \;\Rightarrow\; y = -\dfrac{1}{t + C}`, { p: q(0), tam: 15 });
    [-2, -1, 0, 1, 2, 3].forEach((C, i) => hiperbola(C).forEach(([ts, ys]) => curva(g, P, ts, ys, { p: paso === 0 ? tramo(p, 0.08 * i, 0.6 + 0.08 * i) : 1, alfa: paso <= 1 ? 0.75 : 0.3, brillo: paso <= 1 ? 5 : 0, ancho: 1.8 })));
    if (paso >= 1) {
      rectaEquilibrio(g, P, 0, { color: 'violeta', p: q(1), ancho: 3 });
      g.tex('eq', P.X(-2.9), P.Y(0) - 16, R`y \equiv 0:\ \tfrac{dy}{dt} = 0 = y^2 \ \checkmark`, { color: 'violeta', tam: 15, ancla: 'l', alfa: ease(q(1)), fondo: true });
    }
    if (paso === 2) {
      // C crece sin parar: la curva se aplana hacia 0, nunca llega
      const s = (1 - Math.cos(tiempo / 1800)) / 2, C = mezclar(2, 400, s * s);
      hiperbola(C).forEach(([ts, ys]) => curva(g, P, ts, ys, { ancho: 2.6 }));
      g.tex('cc', P.X(0.2), P.Y(2.4), R`C = ${C.toFixed(0)}:\ y(0) = ${(-1 / C).toFixed(4)} \ne 0`, { color: 'cian', tam: 16, ancla: 'l', fondo: true });
      g.tex('nunca', P.X(0.2), P.Y(1.8), R`\text{ningún } C \text{ da } y \equiv 0`, { color: 'violeta', tam: 15, ancla: 'l', alfa: ease(tramo(p, 0.4, 1)), fondo: true });
    }
    if (paso >= 3) {
      formula(g, 'div', 330, 438, R`\text{dividir entre } h(y) = y^2 \text{ es ilegal en } y = 0 \text{: consideramos aparte los ceros de } h`, { p: q(3), tam: 13 });
      // cualquier PVI: con y0 ≠ 0 sirve la familia; con y0 = 0, solo el equilibrio
      const cero = Math.abs(c.e.y0) < 0.06;
      if (!cero) hiperbola(-1 / c.e.y0 - c.e.t0).filter(([ts]) => ts.some((t) => Math.abs(t - c.e.t0) < 0.02)).forEach(([ts, ys]) => curva(g, P, ts, ys, { ancho: 2.8 }));
      punto(g, P.X(c.e.t0), P.Y(cero ? 0 : c.e.y0), { color: 'ciruela', r: 6, halo: true });
      if (paso === 4) g.tex('pvi', P.X(-2.9), P.Y(2.6), cero ? R`y_0 = 0:\ \text{solo el equilibrio lo resuelve}` : R`y_0 \ne 0:\ C = -\tfrac{1}{y_0} - t_0 = ${(-1 / c.e.y0 - c.e.t0).toFixed(2)}`, { color: cero ? 'violeta' : 'cian', tam: 15, ancla: 'l', fondo: true });
    }
  },
  pasos: 5,
  asas: (c, paso) => (paso >= 3 ? [{ id: 'p', x: P.X(c.e.t0), y: P.Y(Math.abs(c.e.y0) < 0.06 ? 0 : c.e.y0), color: 'ciruela', mover: (x, y) => { const v = P.V(y); return { t0: P.T(x), y0: Math.abs(v) < 0.1 ? 0 : v }; } }] : []),
});
