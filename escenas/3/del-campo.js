// Del campo a las soluciones: desde (t0, y0) se avanza siguiendo las marcas cercanas (a mano: trazos rectos
// según la marca más próxima de la cuadrícula) y se compara con la solución exacta.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, punto, curva } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 370 }, { t: [-3, 3], y: [-2.5, 2.5] });
const NT = 13, NY = 11;

/** Trazado «a mano»: pasos cortos con la pendiente de la marca de cuadrícula más cercana. */
function aMano(f, t0, y0, h) {
  const ts = [t0], ys = [y0], dt = 6 / (NT - 1), dy = 5 / (NY - 1);
  let t = t0, y = y0;
  while (t < 3 && Math.abs(y) < 4) {
    const tg = -3 + Math.round((t + 3) / dt) * dt, yg = -2.5 + Math.round((y + 2.5) / dy) * dy;
    const m = f(tg, yg);
    if (!Number.isFinite(m)) break;
    t += h; y += m * h; ts.push(t); ys.push(y);
  }
  return [ts, ys];
}

export default definirEscena({
  alto: 450,
  entradas: [
    { id: 'f', tipo: 'funcion', etiqueta: R`\dfrac{dy}{dt} =`, valor: 'y^2 - t', ejemplos: ['y^2 - t', 'y - t', 'sin(t y)', '1 - y^2'] },
    { id: 't0', tipo: 'deslizador', etiqueta: 't_0', valor: 0, min: -3, max: 2, paso: 0.05 },
    { id: 'y0', tipo: 'deslizador', etiqueta: 'y_0', valor: 0.6, min: -2.4, max: 2.4, paso: 0.05 },
  ],
  preparar: (e) => { const f = (t, y) => e.fF(t, y); return { e, f, mano: aMano(f, e.t0, e.y0, 0.12) }; },
  duracion: [1800, 1400, 2600, 2200, 1600],
  leyenda: { campo: 'marcas de pendiente', ambar: 'trazado a mano', cian: 'la solución', ciruela: 'condición inicial' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, c.f, { alfa: 0.75, nt: NT, ny: NY, largo: 22, ancho: 2 });
    if (paso === 0) {
      [-2, -1, 0, 0.9].forEach((y0, i) => solucion(g, P, c.f, 0, y0, { p: tramo(p, 0.1 * i, 0.7 + 0.1 * i), punto: false, alfa: 0.8 }));
      formula(g, 'tg', 380, 22, R`\text{cada solución es \textbf{tangente} a las marcas}`, { p, tam: 15 });
    }
    if (paso >= 1) punto(g, P.X(c.e.t0), P.Y(c.e.y0), { color: 'ciruela', r: 6, halo: true, alfa: ease(q(1)) });
    if (paso >= 2) curva(g, P, c.mano[0], c.mano[1], { color: 'ambar', p: paso === 2 ? p : 1, ancho: 2.2, brillo: 3 });
    if (paso === 2) g.tex('av', 380, 22, R`\text{avanzar en la dirección de las marcas cercanas}`, { color: 'ambar', tam: 15, fondo: true });
    if (paso >= 3) {
      solucion(g, P, c.f, c.e.t0, c.e.y0, { p: q(3), sentido: 'adelante' });
      g.tex('apx', 380, 22, R`\text{el trazado a mano es una \textbf{aproximación} de la solución}`, { color: 'texto', tam: 15, alfa: ease(q(3)), fondo: true });
    }
    if (paso === 4) g.tex('num', 380, 46, R`\text{para mayor exactitud: métodos numéricos (Libro IV)}`, { color: 'verde', tam: 14, alfa: ease(p), fondo: true });
  },
  pasos: 5,
  asas: (c, paso) => (paso >= 1 ? [{ id: 'p', x: P.X(c.e.t0), y: P.Y(c.e.y0), color: 'ciruela', mover: (x, y) => ({ t0: P.T(x), y0: P.V(y) }) }] : []),
});
