// Modelo exponencial: la frase se traduce trozo a trozo (tasa de crecimiento → dP/dt, proporcional a → k·,
// tamaño de la población → P), la curva explota sin límite, y la ecuación se etiqueta: primer orden y ordinaria.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { azar } from '../piezas.js';

const R = String.raw;
// trozos de la frase: [texto en la frase, x en la frase, símbolo, x en la ecuación, color]
const TROZOS = [
  [R`\text{La tasa de crecimiento}`, 120, R`\dfrac{dP}{dt}`, 300, 'ambar'],
  [R`\text{de una población es}`, 300, R`=`, 352, 'texto2'],
  [R`\text{proporcional}`, 455, R`k`, 385, 'ciruela'],
  [R`\text{al tamaño de la población}`, 630, R`P`, 412, 'cian'],
];

export default definirEscena({
  alto: 440,
  entradas: [{ id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 0.8, min: 0.1, max: 2, paso: 0.05 }],
  preparar: (e) => ({ e, P: plano({ x: 80, y: 200, w: 420, h: 200 }, { t: [0, 5], y: [0, 10] }) }),
  vivo: [3],
  duracion: [1600, 1600, 2200, 2000, 1600, 1600],
  leyenda: { ambar: 'tasa de crecimiento', ciruela: 'parámetro k', cian: 'población P' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    // la frase (pasos 0–1) se convierte en la ecuación (paso 2)
    const m = ease(q(2));
    TROZOS.forEach(([frase, xf, sim, xe, color], i) => {
      const aFrase = ease(tramo(q(0), 0.15 * i, 0.4 + 0.15 * i)) * (1 - m);
      const yf = 50 + (paso >= 1 ? 0 : 0);
      g.tex(`f${i}`, xf, yf, frase, { color: paso >= 0 && i !== 1 ? color : 'texto2', tam: 16, alfa: aFrase });
      // en el paso 1 cada trozo con color baja su símbolo debajo
      const aSim = i === 1 ? m : Math.max(ease(q(1)) * (1 - m), m);
      const x = mezclar(xf, xe, m), y = mezclar(98, 70, m);
      g.tex(`s${i}`, x, y, sim, { color, tam: mezclar(20, 30, m), alfa: aSim });
      if (i !== 1 && paso === 1) g.flecha(xf, 64, xf, 80, { color, alfa: ease(q(1)) * 0.8, ancho: 1.5, punta: 6 });
    });
    if (paso === 1) {
      g.tex('pt', 200, 140, R`P(t):\ \text{población en el tiempo } t`, { color: 'cian', tam: 14, alfa: ease(p) });
      g.tex('kk', 560, 140, R`k:\ \text{coeficiente de crecimiento}`, { color: 'ciruela', tam: 14, alfa: ease(p) });
    }
    // 3 · predice crecimiento sin límite
    if (paso >= 3) {
      const a = paso === 3 ? 1 : 0.55;
      ejes(g, c.P, { p: q(3), y: 'P', alfa: a });
      grafica(g, c.P, (t) => Math.exp(c.e.k * t), { p: q(3), alfa: a });
      const T = paso === 3 ? 5 * ease(p) : 5, Pv = Math.exp(c.e.k * T);
      // la población como puntos en una caja (cuántos hay = P, hasta que no caben)
      const n = Math.min(400, Math.round(Pv * 12));
      g.rect(540, 205, 190, 190, { color: 'muyTenue', relleno: false, radio: 8, alfa: a });
      for (let i = 0; i < n; i++) g.circulo(548 + azar(i) * 174, 213 + azar(i + 999) * 174, 2.2, { color: 'cian', alfa: a * 0.85 });
      g.texto(635, 410, n >= 400 ? `P = ${Pv.toFixed(0)} · ¡no caben!` : `P = ${Pv.toFixed(2)}`, { color: n >= 400 ? 'ambar' : 'cian', tam: 12, alfa: a });
      if (Pv > 10) g.tex('sl', c.P.X(3.7), c.P.caja.y + 4, R`\text{sin límite} \uparrow`, { color: 'ambar', tam: 15, alfa: ease(tramo(p, 0.6, 1)) * a });
    }
    // 4 · primer orden: solo primeras derivadas
    if (paso >= 4) {
      const a = ease(q(4));
      g.rect(270, 42, 58, 58, { color: 'ambar', relleno: false, radio: 6, alfa: a });
      g.tex('po', 299, 118, R`\text{solo primeras derivadas} \Rightarrow \textbf{primer orden}`, { color: 'ambar', tam: 14, alfa: a });
      g.tex('po2', 640, 70, R`\dfrac{d^2P}{dt^2} \;\leftarrow\; \text{segundo orden (no aquí)}`, { color: 'tenue', tam: 14, alfa: a * (paso === 4 ? 1 : 0.5) });
    }
    // 5 · ordinaria: «d», no «∂»
    if (paso >= 5) {
      const a = ease(q(5));
      g.tex('or', 299, 160, R`d \text{ (no } \partial\text{): una sola variable } t \Rightarrow \textbf{ordinaria}`, { color: 'verde', tam: 14, alfa: a });
      g.tex('or2', 640, 120, R`\dfrac{\partial u}{\partial t} = \dfrac{\partial^2 u}{\partial x^2} \;\leftarrow\; \text{parcial (no es EDO)}`, { color: 'tenue', tam: 14, alfa: a });
    }
  },
  pasos: 6,
});
