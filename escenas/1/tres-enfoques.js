// Los tres enfoques sobre la misma ecuación (la logística): fórmula, geometría y algoritmo. Después, el estudio
// independiente: el plano R–F de presa-depredador con sus equilibrios, las rectas de signo, las direcciones
// en cada región y una órbita que gira en sentido antihorario.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { rk4Sistema, euler } from '../../motor/numerico.js';
import { ejes, curva, punto, grafica, campo, lineaFase } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const lg = (t, P) => P * (1 - P);

export default definirEscena({
  alto: 460,
  entradas: [
    { id: 'a', tipo: 'deslizador', etiqueta: R`\alpha`, valor: 1, min: 0.3, max: 2, paso: 0.05 },
    { id: 'b', tipo: 'deslizador', etiqueta: R`\beta`, valor: 0.5, min: 0.2, max: 1.2, paso: 0.05 },
    { id: 'g', tipo: 'deslizador', etiqueta: R`\gamma`, valor: 0.75, min: 0.3, max: 1.5, paso: 0.05 },
    { id: 'd', tipo: 'deslizador', etiqueta: R`\delta`, valor: 0.25, min: 0.1, max: 0.6, paso: 0.05 },
  ],
  preparar: (e) => {
    const Re = e.g / e.d, Fe = e.a / e.b;
    const F = (t, [r, f]) => [e.a * r - e.b * r * f, -e.g * f + e.d * r * f];
    const orb = rk4Sistema(F, 0, [Re * 1.6, Fe * 0.6], 40, { h: 0.01 });
    const PL = plano({ x: 60, y: 40, w: 420, h: 360 }, { t: [0, Re * 2.6], y: [0, Fe * 2.6] });
    return { e, Re, Fe, F, orb, PL };
  },
  vivo: [7, 8],
  duracion: [1500, 1800, 1800, 2000, 1500, 1800, 2200, 2400, 2000],
  leyenda: (paso) => (paso < 5 ? { cian: 'la misma solución P(t)', ambar: 'aproximación numérica' } : { cian: 'conejos R (eje horizontal)', ambar: 'zorros F (eje vertical)', violeta: 'equilibrios y rectas de signo' }),
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    if (paso <= 4) {
      formula(g, 'ec', 380, 26, R`\text{la misma ecuación:}\quad \dfrac{dP}{dt} = P(1 - P),\ \ P(0) = 0.1`, { p: q(0), tam: 16 });
      const cajas = [{ x: 20, y: 60, w: 230, h: 330 }, { x: 265, y: 60, w: 230, h: 330 }, { x: 510, y: 60, w: 230, h: 330 }];
      const sol = (t) => 1 / (1 + 9 * Math.exp(-t));
      // 1 · analítico: la fórmula y su gráfica
      if (paso >= 1) {
        const P = plano({ x: 40, y: 170, w: 190, h: 190 }, { t: [0, 8], y: [0, 1.2] });
        panel(g, cajas[0], R`\textbf{1. analítico}`, { p: q(1), clave: 'p1' });
        formula(g, 'f1', 135, 120, R`P(t) = \dfrac{1}{1 + 9e^{-t}}`, { p: q(1), tam: 18, color: 'cian' });
        ejes(g, P, { numeros: false, t: '', y: '', clave: 'e1', p: q(1), rejilla: false });
        grafica(g, P, sol, { p: q(1) });
      }
      // 2 · cualitativo: campo + línea de fase
      if (paso >= 2) {
        const P = plano({ x: 300, y: 110, w: 180, h: 250 }, { t: [0, 8], y: [-0.2, 1.4] });
        panel(g, cajas[1], R`\textbf{2. cualitativo}`, { p: q(2), clave: 'p2' });
        campo(g, P, lg, { p: q(2), nt: 11, ny: 11, largo: 11, alfa: 0.6 });
        lineaFase(g, { f: (y) => y * (1 - y), eqs: [{ y: 0, tipo: 'fuente' }, { y: 1, tipo: 'sumidero' }], coord: P.Y, desde: P.Y(-0.2), hasta: P.Y(1.4), otra: 285, rango: [-0.2, 1.4], p: q(2), rotular: false, particulas: false, clave: 'lf2' });
        grafica(g, P, sol, { p: q(2), alfa: 0.9 });
        g.tex('g2', 380, 375, R`\text{geometría, largo plazo}`, { color: 'texto2', tam: 12, alfa: ease(q(2)) });
      }
      // 3 · numérico: pasos de Euler
      if (paso >= 3) {
        const P = plano({ x: 530, y: 170, w: 190, h: 190 }, { t: [0, 8], y: [0, 1.2] });
        panel(g, cajas[2], R`\textbf{3. numérico}`, { p: q(3), clave: 'p3' });
        ejes(g, P, { numeros: false, t: '', y: '', clave: 'e3', p: q(3), rejilla: false });
        grafica(g, P, sol, { alfa: 0.35, brillo: 0 });
        const eu = euler(lg, 0, 0.1, 0.8, 10), n = Math.round(10 * ease(q(3)));
        curva(g, P, eu.t.slice(0, n + 1), eu.y.slice(0, n + 1), { color: 'ambar', brillo: 0, ancho: 2 });
        for (let k = 0; k <= n; k++) punto(g, P.X(eu.t[k]), P.Y(eu.y[k]), { color: 'ambar', r: 3 });
        formula(g, 'f3', 625, 120, R`y_{k+1} = y_k + f\,\Delta t`, { p: q(3), tam: 16, color: 'ambar' });
        g.tex('rk', 625, 375, R`\text{Euler, Runge-Kutta}`, { color: 'texto2', tam: 12, alfa: ease(q(3)) });
      }
      if (paso === 4) g.tex('ei', 380, 420, R`\textbf{Estudio independiente:}\ \text{análisis cualitativo de presa-depredador} \;\longrightarrow`, { color: 'ciruela', tam: 15, alfa: ease(p) });
      return;
    }
    // ---------- el plano R–F
    const { PL, Re, Fe } = c;
    ejes(g, PL, { t: 'R', y: 'F', numeros: false, clave: 'erf' });
    formula(g, 'sis', 620, 50, R`\begin{cases}\dot R = R(\alpha - \beta F)\\ \dot F = F(\delta R - \gamma)\end{cases}`, { tam: 16 });
    // 5 · equilibrios
    punto(g, PL.X(0), PL.Y(0), { color: 'violeta', r: 6, alfa: ease(q(5)) });
    punto(g, PL.X(Re), PL.Y(Fe), { color: 'violeta', r: 6, alfa: ease(q(5)), halo: true });
    g.tex('eq0', PL.X(0) + 10, PL.Y(0) - 14, R`(0, 0)`, { color: 'violeta', tam: 13, ancla: 'l', alfa: ease(q(5)) });
    g.tex('eq1', PL.X(Re) + 12, PL.Y(Fe) - 14, R`\left(\tfrac{\gamma}{\delta}, \tfrac{\alpha}{\beta}\right)`, { color: 'violeta', tam: 15, ancla: 'l', alfa: ease(q(5)) });
    if (paso === 5) g.tex('eqx', 620, 140, R`\dot R = 0 \text{ y } \dot F = 0 \text{ a la vez}`, { color: 'violeta', tam: 14, alfa: ease(p) });
    // 6 · rectas de signo y regiones
    if (paso >= 6) {
      const a = ease(q(6)), { x, y, w, h } = PL.caja;
      g.linea([[x, PL.Y(Fe)], [x + w, PL.Y(Fe)]], { color: 'violeta', ancho: 1.6, guion: [6, 5], alfa: a });
      g.linea([[PL.X(Re), y], [PL.X(Re), y + h]], { color: 'violeta', ancho: 1.6, guion: [6, 5], alfa: a });
      g.tex('nr', x + w - 4, PL.Y(Fe) - 12, R`F = \tfrac{\alpha}{\beta}:\ \dot R = 0`, { color: 'cian', tam: 12, ancla: 'r', alfa: a });
      g.tex('nf', PL.X(Re) + 6, y + 12, R`R = \tfrac{\gamma}{\delta}:\ \dot F = 0`, { color: 'ambar', tam: 12, ancla: 'l', alfa: a });
      g.tex('s1', 620, 150, R`F < \tfrac{\alpha}{\beta} \Rightarrow \dot R > 0 \ (\rightarrow)`, { color: 'cian', tam: 14, alfa: a });
      g.tex('s2', 620, 180, R`R > \tfrac{\gamma}{\delta} \Rightarrow \dot F > 0 \ (\uparrow)`, { color: 'ambar', tam: 14, alfa: a });
      // flechas de dirección en el centro de cada región
      const regiones = [[0.5, 0.5], [1.8, 0.5], [1.8, 1.8], [0.5, 1.8]];
      regiones.forEach(([fr, ff], k) => {
        const r = Re * fr, f = Fe * ff, dr = Math.sign(c.F(0, [r, f])[0]), df = Math.sign(c.F(0, [r, f])[1]);
        const qa = ease(tramo(q(6), 0.3 + 0.15 * k, 0.6 + 0.15 * k)), cx = PL.X(r), cy = PL.Y(f);
        g.flecha(cx, cy, cx + dr * 28, cy, { color: 'cian', alfa: qa, ancho: 2.4 });
        g.flecha(cx, cy, cx, cy - df * 28, { color: 'ambar', alfa: qa, ancho: 2.4 });
        g.flecha(cx, cy, cx + dr * 22, cy - df * 22, { color: 'texto', alfa: qa * 0.9, ancho: 2 });
      });
    }
    // 7 · la órbita gira en sentido antihorario
    if (paso >= 7) {
      const n = c.orb.t.length;
      curva(g, PL, c.orb.Y.slice(0, paso === 7 ? Math.min(n, Math.round(n * ease(p))) : n).map((y) => y[0]), c.orb.Y.slice(0, paso === 7 ? Math.min(n, Math.round(n * ease(p))) : n).map((y) => y[1]), { color: 'texto', ancho: 2.2, brillo: 6 });
      const k = Math.round((tiempo / 1000) * 70) % n, [r, f] = c.orb.Y[k];
      punto(g, PL.X(r), PL.Y(f), { color: 'texto', r: 5, halo: true });
      g.linea([[PL.X(r), PL.Y(f)], [PL.X(r), PL.Y(0)]], { color: 'cian', ancho: 1.2, alfa: 0.5 });
      g.linea([[PL.X(r), PL.Y(f)], [PL.X(0), PL.Y(f)]], { color: 'ambar', ancho: 1.2, alfa: 0.5 });
      g.tex('anti', 620, 220, R`\circlearrowleft\ \text{antihorario}`, { color: 'texto', tam: 16, alfa: ease(q(7)) });
    }
    // 8 · las poblaciones oscilan con desfase
    if (paso === 8) {
      const G = plano({ x: 545, y: 270, w: 195, h: 120 }, { t: [0, 40], y: [0, Math.max(...c.orb.Y.map((y) => Math.max(y[0], y[1]))) * 1.05] });
      ejes(g, G, { numeros: false, t: 't', y: '', clave: 'eG', rejilla: false });
      curva(g, G, c.orb.t, c.orb.Y.map((y) => y[0]), { color: 'cian', ancho: 1.8, p });
      curva(g, G, c.orb.t, c.orb.Y.map((y) => y[1]), { color: 'ambar', ancho: 1.8, p });
      g.tex('osc', 630, 420, R`\text{oscilan; los zorros, un poco detrás}`, { color: 'texto2', tam: 13, alfa: ease(p) });
    }
  },
  pasos: 9,
});
