// Presa-depredador. Izquierda: la pradera (conejos cian, zorros ámbar: tantos como R y F) y la gráfica de R(t),
// F(t). Derecha: las suposiciones en tarjetas y las ecuaciones que se construyen término a término; el
// término de encuentros R·F se ve como un rectángulo de pares conejo-zorro.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { rk4Sistema } from '../../motor/numerico.js';
import { ejes, curva, punto, grafica } from '../primitivas.js';
import { formula, panel, conejo, zorro, azar } from '../piezas.js';

const R = String.raw;
const T = 24;
const PRADERA = { x: 20, y: 20, w: 340, h: 220 };

export default definirEscena({
  alto: 460,
  entradas: [
    { id: 'a', tipo: 'deslizador', etiqueta: R`\alpha`, valor: 1, min: 0.2, max: 2, paso: 0.05 },
    { id: 'b', tipo: 'deslizador', etiqueta: R`\beta`, valor: 0.5, min: 0.1, max: 1.5, paso: 0.05 },
    { id: 'g', tipo: 'deslizador', etiqueta: R`\gamma`, valor: 0.75, min: 0.2, max: 2, paso: 0.05 },
    { id: 'd', tipo: 'deslizador', etiqueta: R`\delta`, valor: 0.25, min: 0.05, max: 1, paso: 0.05 },
  ],
  preparar: (e) => {
    const sim = rk4Sistema((t, [r, f]) => [e.a * r - e.b * r * f, -e.g * f + e.d * r * f], 0, [4, 1], T, { h: 0.01 });
    const max = Math.max(...sim.Y.map(([r, f]) => Math.max(r, f)));
    const G = plano({ x: 50, y: 290, w: 300, h: 140 }, { t: [0, T], y: [0, Math.min(40, max * 1.1)] });
    return { e, sim, G, max };
  },
  vivo: [0, 8, 9, 10],
  duracion: [1800, 1500, 2600, 1500, 1800, 2400, 1600, 1800, 1800, 1500, 2200],
  leyenda: { cian: 'conejos R (presas)', ambar: 'zorros F (depredadores)', ciruela: 'parámetros' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    // instante de la simulación: avanza en bucle en los pasos «vivos»
    const corre = paso >= 8;
    const tau = corre ? (tiempo / 1000 * 1.6) % T : 0;
    const i = Math.min(c.sim.t.length - 1, Math.round((tau / T) * (c.sim.t.length - 1)));
    const [Rv, Fv] = c.sim.Y[i];
    pradera(g, Rv, Fv, tiempo, paso === 5 || paso === 6 ? 0.35 : 1, q(0));
    g.tex('lr', PRADERA.x + 12, PRADERA.y + PRADERA.h - 14, R`R(t) = ${Rv.toFixed(1)}`, { color: 'cian', tam: 14, ancla: 'l', alfa: ease(q(0)) });
    g.tex('lf', PRADERA.x + PRADERA.w - 12, PRADERA.y + PRADERA.h - 14, R`F(t) = ${Fv.toFixed(1)}`, { color: 'ambar', tam: 14, ancla: 'r', alfa: ease(q(0)) });
    // ---- gráfica temporal
    if (paso >= 1) {
      ejes(g, c.G, { y: '', numeros: false, clave: 'eg', p: q(1) });
      if (paso < 8) {
        g.tex('preg', c.G.X(T / 2), c.G.Y(c.G.vista.y[1] / 2), R`\text{¿aumentan? ¿oscilan? ¿se extinguen?}`, { color: 'texto2', tam: 14, alfa: ease(q(1)) });
      } else {
        const hasta = paso === 8 ? Math.max(1, Math.round(c.sim.t.length * ease(p))) : c.sim.t.length;
        const ts = c.sim.t.slice(0, hasta);
        curva(g, c.G, ts, c.sim.Y.slice(0, hasta).map((y) => y[0]), { color: 'cian', ancho: 2 });
        curva(g, c.G, ts, c.sim.Y.slice(0, hasta).map((y) => y[1]), { color: 'ambar', ancho: 2 });
        g.linea([[c.G.X(tau), c.G.caja.y], [c.G.X(tau), c.G.caja.y + c.G.caja.h]], { color: 'texto', ancho: 1, alfa: 0.35 });
        punto(g, c.G.X(tau), c.G.Y(Rv), { color: 'cian', r: 3.5 });
        punto(g, c.G.X(tau), c.G.Y(Fv), { color: 'ambar', r: 3.5 });
        if (paso === 10) {
          // aproximación numérica: los puntos de un método paso a paso
          for (let k = 0; k < c.sim.t.length; k += 60) punto(g, c.G.X(c.sim.t[k]), c.G.Y(c.sim.Y[k][0]), { color: 'texto', r: 2, alfa: ease(p) });
        }
      }
      if (paso === 1) g.tex('vol', 190, 448, R`\text{(Volterra: tiburones en el Mediterráneo, 1.ª Guerra Mundial)}`, { color: 'tenue', tam: 12, alfa: ease(p) });
    }
    // ---- derecha: suposiciones (paso 2) y parámetros (paso 3)
    if (paso === 2) tarjetas(g, p);
    if (paso === 3) {
      const filas = [[R`\alpha`, R`\text{crecimiento de conejos}`], [R`\beta`, R`\text{tasa de encuentros (conejos comidos)}`], [R`\gamma`, R`\text{muerte de zorros sin comida}`], [R`\delta`, R`\text{beneficio por conejo devorado}`]];
      filas.forEach(([s, t], k) => {
        const a = ease(tramo(p, 0.15 * k, 0.4 + 0.15 * k));
        g.tex(`ps${k}`, 410, 60 + 60 * k, s, { color: 'ciruela', tam: 24, alfa: a });
        g.tex(`pt${k}`, 440, 60 + 60 * k, t, { color: 'texto2', tam: 14, ancla: 'l', alfa: a });
      });
      g.tex('pos', 560, 310, R`\text{todos los parámetros son positivos}`, { color: 'ciruela', tam: 14, alfa: ease(tramo(p, 0.7, 1)) });
    }
    // ---- derecha: ecuaciones término a término (pasos 4–7) y el sistema (8–10)
    if (paso >= 4 && paso <= 7) {
      const eqR = paso === 4 ? R`\dfrac{dR}{dt} = \htmlClass{k-cian}{\alpha R} - (\text{muerte por depredación})`
        : R`\dfrac{dR}{dt} = \htmlClass{k-cian}{\alpha R} - \htmlClass{k-ambar}{\beta R F}`;
      formula(g, 'eqR', 560, 60, paso === 4 ? R`\dfrac{dR}{dt} = (\text{crecimiento propio}) - (\text{muerte por depredación})` : eqR, { p: paso === 4 ? tramo(p, 0, 0.4) : 1, tam: paso === 4 ? 13 : 15 });
      if (paso === 4) formula(g, 'eqR2', 560, 120, eqR, { p: tramo(p, 0.5, 1), tam: 17 });
      if (paso === 5) encuentros(g, p, c);
      if (paso >= 6) {
        const eqF = paso === 6 ? R`\dfrac{dF}{dt} = \htmlClass{k-ambar}{-\gamma F} + (\text{beneficio por comida})` : R`\dfrac{dF}{dt} = \htmlClass{k-ambar}{-\gamma F} + \htmlClass{k-cian}{\delta R F}`;
        formula(g, 'eqF', 560, 150, eqF, { p: paso === 6 ? p : 1, tam: 17 });
        if (paso === 6) {
          const Pm = plano({ x: 420, y: 230, w: 280, h: 150 }, { t: [0, 5], y: [0, 3] });
          ejes(g, Pm, { t: 't', y: 'F', numeros: false, clave: 'em', p });
          grafica(g, Pm, (t) => 2.6 * Math.exp(-0.75 * t), { color: 'ambar', p });
          g.tex('ham', Pm.X(3), Pm.Y(2.2), R`R = 0:\ \text{mueren exponencialmente}`, { color: 'ambar', tam: 13, alfa: ease(p) });
        }
        if (paso === 7) g.tex('mas', 560, 230, R`\text{más conejos} \Rightarrow \text{más comida} \Rightarrow \text{más zorros}`, { color: 'cian', tam: 14, alfa: ease(p) });
      }
    }
    if (paso >= 8) {
      formula(g, 'sis', 560, 90, R`\begin{cases}\dfrac{dR}{dt} = \alpha R - \beta \htmlClass{k-violeta}{R F}\\[8pt] \dfrac{dF}{dt} = -\gamma F + \delta \htmlClass{k-violeta}{R F}\end{cases}`, { p: q(8), tam: 19 });
      if (paso >= 9) {
        const a = ease(q(9));
        g.flecha(470, 200, 650, 200, { color: 'cian', alfa: a, ancho: 2 });
        g.flecha(650, 230, 470, 230, { color: 'ambar', alfa: a, ancho: 2 });
        g.tex('ac1', 560, 186, R`R \text{ influye en } \tfrac{dF}{dt}`, { color: 'cian', tam: 13, alfa: a });
        g.tex('ac2', 560, 248, R`F \text{ influye en } \tfrac{dR}{dt}`, { color: 'ambar', tam: 13, alfa: a });
        g.tex('ac3', 560, 290, R`\textbf{acoplado}\quad\cdot\quad R\cdot F \Rightarrow \textbf{no lineal}`, { color: 'violeta', tam: 14, alfa: a });
      }
      if (paso === 10) {
        g.tex('sf', 560, 340, R`\text{sin fórmula elemental}`, { color: 'texto2', tam: 14, alfa: ease(p) });
        g.tex('cn', 560, 370, R`\text{cualitativo} + \text{numérico}`, { color: 'texto', tam: 16, alfa: ease(tramo(p, 0.3, 1)) });
      }
    }
  },
  pasos: 11,
});

/** La pradera: n conejos y m zorros (proporcionales a R y F), que se mueven un poco. */
function pradera(g, Rv, Fv, tiempo, alfa, p) {
  const a = ease(p) * alfa;
  if (a <= 0) return;
  panel(g, PRADERA, null, { p });
  const s = tiempo / 1000, nR = Math.min(70, Math.round(Rv * 6)), nF = Math.min(40, Math.round(Fv * 6));
  for (let i = 0; i < nR; i++) {
    const x = PRADERA.x + 20 + azar(i) * (PRADERA.w - 40) + 6 * Math.sin(s * (0.7 + azar(i + 3)) + i);
    const y = PRADERA.y + 20 + azar(i + 500) * (PRADERA.h - 60) + 4 * Math.cos(s * (0.9 + azar(i + 7)) + i);
    conejo(g, x, y, { alfa: a, tam: 0.9 });
  }
  for (let i = 0; i < nF; i++) {
    const x = PRADERA.x + 20 + azar(i + 1000) * (PRADERA.w - 40) + 10 * Math.sin(s * 0.5 + i * 2);
    const y = PRADERA.y + 24 + azar(i + 1500) * (PRADERA.h - 64) + 8 * Math.cos(s * 0.6 + i);
    zorro(g, x, y, { alfa: a, tam: 1.1 });
  }
}

/** Las cuatro suposiciones como tarjetas con su mini-gráfica. */
function tarjetas(g, p) {
  const datos = [
    [R`1.\ \text{sin zorros: } R \text{ crece exp.}`, (t) => 0.3 * Math.exp(0.9 * t), 'cian'],
    [R`2.\ \text{encuentros} \propto R\cdot F`, null, 'violeta'],
    [R`3.\ \text{sin conejos: } F \text{ muere}`, (t) => 2.6 * Math.exp(-0.8 * t), 'ambar'],
    [R`4.\ F \text{ crece según lo que come}`, (t) => 0.4 + 0.5 * t, 'ambar'],
  ];
  datos.forEach(([txt, fn, color], k) => {
    const x = 390 + (k % 2) * 180, y = 30 + Math.floor(k / 2) * 190, a = tramo(p, 0.15 * k, 0.45 + 0.15 * k);
    panel(g, { x, y, w: 170, h: 175 }, null, { p: a });
    g.tex(`tj${k}`, x + 85, y + 18, txt, { color, tam: 12, alfa: ease(a) });
    const Pm = plano({ x: x + 20, y: y + 45, w: 130, h: 110 }, { t: [0, 3], y: [0, 3] });
    if (fn) grafica(g, Pm, fn, { color, p: a, ancho: 2 });
    else {
      // rejilla de pares conejo-zorro
      for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) g.rect(x + 30 + i * 18, y + 60 + j * 22, 14, 16, { color: (i + j) % 3 === 0 ? 'violeta' : 'muyTenue', alfa: ease(a) * 0.8, radio: 2 });
    }
  });
}

/** El término β R F: el rectángulo de todos los pares conejo-zorro; una fracción β acaba en caza. */
function encuentros(g, p, c) {
  const nR = 8, nF = 5, x0 = 450, y0 = 190, L = 24;
  g.tex('rr', x0 + (nR * L) / 2, y0 - 18, R`R \text{ conejos}`, { color: 'cian', tam: 14, alfa: ease(p) });
  g.tex('ff', x0 - 10, y0 + (nF * L) / 2, R`F \text{ zorros}`, { color: 'ambar', tam: 14, ancla: 'r', alfa: ease(p) });
  let n = 0;
  for (let i = 0; i < nR; i++) for (let j = 0; j < nF; j++) {
    const k = i * nF + j, a = ease(tramo(p, (k / (nR * nF)) * 0.5, (k / (nR * nF)) * 0.5 + 0.2));
    const caza = azar(k + 77) < c.e.b * 0.6;
    if (caza) n++;
    g.rect(x0 + i * L, y0 + j * L, L - 4, L - 4, { color: caza && p > 0.7 ? 'ambar' : 'violeta', alfa: a * (caza && p > 0.7 ? 0.9 : 0.35), radio: 3 });
  }
  g.tex('rf', x0 + (nR * L) / 2, y0 + nF * L + 22, R`R\cdot F \text{ encuentros posibles;}\ \ \beta \text{ de ellos: caza}`, { color: 'texto2', tam: 13, alfa: ease(tramo(p, 0.5, 1)) });
  g.tex('rf0', x0 + (nR * L) / 2, y0 + nF * L + 48, R`R = 0 \text{ o } F = 0 \Rightarrow \text{ningún encuentro}`, { color: 'tenue', tam: 13, alfa: ease(tramo(p, 0.7, 1)) });
}
