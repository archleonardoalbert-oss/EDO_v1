// Cambio de variable. La u-sustitución vista como áreas: el área bajo t·sin(t²) en [0, T] es igual al área bajo
// ½·sin u en [0, T²]. Luego, la regla de la cadena para los tres cambios de la conferencia.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 100, w: 310, h: 220 }, { t: [0, 2.6], y: [-2.6, 2.6] });
const B = plano({ x: 430, y: 100, w: 310, h: 220 }, { t: [0, 6.8], y: [-1.2, 1.2] });
const area = (fn, a, b, n = 300) => { let s = 0; for (let i = 0; i < n; i++) { const x = a + ((b - a) * (i + 0.5)) / n; s += fn(x) * ((b - a) / n); } return s; };
function sombra(g, P, fn, a, b, color) {
  const c = g.ctx; c.save(); c.beginPath(); c.moveTo(P.X(a), P.Y(0));
  for (let i = 0; i <= 120; i++) { const x = a + ((b - a) * i) / 120; c.lineTo(P.X(x), P.Y(fn(x))); }
  c.lineTo(P.X(b), P.Y(0)); c.closePath(); c.fillStyle = color; c.fill(); c.restore();
}

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [1],
  duracion: [2000, 2600, 1800, 2400],
  leyenda: { cian: 't·sin(t²)', violeta: '½·sin u', ambar: 'misma área' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    if (paso === 0) {
      [[R`\text{no encaja}`, 'rojo', 130], [R`\xrightarrow{\ u = g(t, y)\ }`, 'ciruela', 380], [R`\text{separable · lineal · autónoma}`, 'verde', 620]].forEach(([tx, col, x], i) => formula(g, `c${i}`, x, 220, tx, { p: tramo(p, 0.25 * i, 0.5 + 0.25 * i), tam: 20, color: col }));
      return;
    }
    if (paso === 1) {
      const T = mezclar(0.4, 2.5, (1 - Math.cos(tiempo / 1800)) / 2);
      const f1 = (t) => t * Math.sin(t * t), f2 = (u) => 0.5 * Math.sin(u);
      panel(g, { x: 25, y: 60, w: 360, h: 300 }, R`t\sin(t^2)\ \text{en}\ [0, T]`, { clave: 'pa' });
      panel(g, { x: 405, y: 60, w: 360, h: 300 }, R`\tfrac12\sin u\ \text{en}\ [0, T^2]`, { clave: 'pb' });
      ejes(g, A, { numeros: false, y: '', clave: 'ea' }); ejes(g, B, { t: 'u', numeros: false, y: '', clave: 'eb' });
      sombra(g, A, f1, 0, T, 'rgba(201,148,72,0.35)'); sombra(g, B, f2, 0, T * T, 'rgba(201,148,72,0.35)');
      grafica(g, A, f1, {}); grafica(g, B, f2, { color: 'violeta' });
      g.tex('a1', 205, 345, R`\text{área} = ${area(f1, 0, T).toFixed(3)}`, { color: 'ambar', tam: 14, fondo: true });
      g.tex('a2', 585, 345, R`\text{área} = ${area(f2, 0, T * T).toFixed(3)}`, { color: 'ambar', tam: 14, fondo: true });
      formula(g, 'us', 380, 30, R`\int t\sin(t^2)\,dt \xrightarrow{u = t^2,\ du = 2t\,dt} \int \tfrac12\sin u\,du = -\tfrac{\cos(t^2)}{2} + C`, { tam: 15 });
      return;
    }
    formula(g, 'ap', 380, 60, R`\dfrac{dy}{dt} = f(t, y),\quad u = g(t, y) \;\Rightarrow\; \dfrac{du}{dt} = \dfrac{\partial g}{\partial t} + \dfrac{\partial g}{\partial y}\,\dfrac{dy}{dt}`, { p: q(2), tam: 17 });
    if (paso === 3) [[R`u = y - 2t`, R`\dfrac{du}{dt} = \dfrac{dy}{dt} - 2`], [R`u = ty`, R`\dfrac{du}{dt} = y + t\dfrac{dy}{dt}`], [R`u = e^y`, R`\dfrac{du}{dt} = e^y\dfrac{dy}{dt}`]].forEach(([a, b], i) => {
      const al = tramo(p, 0.2 * i, 0.5 + 0.2 * i);
      formula(g, `e${i}a`, 220, 170 + 80 * i, a, { p: al, tam: 18, color: 'ciruela' });
      formula(g, `e${i}b`, 520, 170 + 80 * i, b, { p: al, tam: 18 });
    });
  },
  pasos: 4,
});
