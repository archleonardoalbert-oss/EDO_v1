// Principio de linealidad: si y_h resuelve y' = a(t)y, k·y_h también. La familia k·e^{sin t} de y' = (cos t)y
// (figura 1.93), con k que barre; y ≡ 0 incluida.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, campo, grafica, rectaEquilibrio } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 50, w: 620, h: 340 }, { t: [-6, 6], y: [-6, 6] });
const yh = (t) => Math.exp(Math.sin(t));

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 1.5, min: -2.2, max: 2.2, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: [0],
  duracion: [2000, 2000, 2200, 1800, 1600, 2000],
  leyenda: { campo: 'campo (cos t)y', cian: 'k·e^{sin t}', violeta: 'y ≡ 0', ciruela: 'k' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, (t, y) => Math.cos(t) * y, { alfa: 0.4 });
    const k = paso === 0 ? 2 * Math.sin(tiempo / 1500) : c.e.k;
    grafica(g, P, yh, { color: 'texto2', brillo: 0, alfa: 0.6 });
    grafica(g, P, (t) => k * yh(t), {});
    g.tex('k', P.X(-5.8), P.Y(5.4), R`k = ${k.toFixed(2)}`, { color: 'ciruela', tam: 16, ancla: 'l', fondo: true });
    if (paso === 0) formula(g, 'pr', 380, 22, R`y_h \text{ solución} \Rightarrow k\,y_h \text{ solución}`, { p, tam: 16 });
    if (paso >= 1) formula(g, 'dem', 380, 22, R`(ky_h)' = ky_h' = k\,a(t)\,y_h = a(t)(ky_h)`, { p: q(1), tam: 15 });
    if (paso >= 2) [-2, -1.2, -0.5, 0.5, 1.2, 2].forEach((kk, i) => grafica(g, P, (t) => kk * yh(t), { p: paso === 2 ? tramo(p, 0.08 * i, 0.6 + 0.08 * i) : 1, alfa: 0.35, brillo: 0, ancho: 1.5 }));
    if (paso >= 3) formula(g, 'gen', 380, 420, R`y(t) = k\,e^{\int a(t)\,dt}`, { p: q(3), tam: 17 });
    if (paso >= 4) rectaEquilibrio(g, P, 0, { color: 'violeta', p: q(4), ancho: 3 });
    if (paso === 5) formula(g, 'ej', 380, 420, R`a(t) = \cos t:\ y = k\,e^{\int\cos t\,dt} = k\,e^{\sin t}`, { p, tam: 16, color: 'cian' });
  },
  pasos: 6,
});
