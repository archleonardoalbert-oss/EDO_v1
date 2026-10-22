// Ejemplo de Bernoulli: z = 1/y; z' = −z − e^{−2t}; μ = e^t; z = Ce^{−t} + e^{−2t}; y = 1/z (explota donde z = 0,
// si C < 0); y ≡ 0 se perdió al dividir.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, curva, rectaEquilibrio, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 60, w: 330, h: 340 }, { t: [-1, 3], y: [-3, 4] });
const B = plano({ x: 440, y: 60, w: 300, h: 340 }, { t: [-1, 3], y: [-3, 4] });
const zDe = (C) => (t) => C * Math.exp(-t) + Math.exp(-2 * t);
const ramas = (fn) => { const out = []; let ts = [], ys = [], sg = 0; for (let i = 0; i <= 400; i++) { const t = -1 + (4 * i) / 400, v = fn(t), s = Math.sign(v); if (sg && s !== sg && ts.length) { out.push([ts, ys]); ts = []; ys = []; } sg = s; ts.push(t); ys.push(v); } out.push([ts, ys]); return out; };

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: -0.5, min: -2, max: 2, paso: 0.05 }],
  preparar: (e) => ({ e }),
  duracion: [1800, 2000, 2200, 2400, 1800],
  leyenda: { verde: 'z(t) (lineal)', cian: 'y = 1/z', rojo: 'z = 0: y explota', violeta: 'y ≡ 0 (perdida)' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), C = c.e.C;
    formula(g, 'z', 380, 22, paso === 0 ? R`n = 2:\ z = y^{-1}` : paso === 1 ? R`\dfrac{dz}{dt} = -z - e^{-2t}` : paso === 2 ? R`\mu = e^t:\ \dfrac{d}{dt}[e^tz] = -e^{-t} \Rightarrow e^tz = e^{-t} + C` : R`z = Ce^{-t} + e^{-2t},\quad y = \dfrac{1}{Ce^{-t} + e^{-2t}}`, { tam: 15 });
    panel(g, { x: 25, y: 40, w: 375, h: 385 }, R`z(t)`, { clave: 'pa' });
    ejes(g, A, { y: 'z', numeros: false, clave: 'ea' });
    if (paso >= 2) {
      [-1.5, -0.8, 0.4, 1.2].forEach((k) => grafica(g, A, zDe(k), { color: 'verde', alfa: 0.4, brillo: 0, ancho: 1.4, p: q(2) }));
      grafica(g, A, zDe(C), { color: 'verde', p: q(2) });
    }
    if (paso >= 3) {
      panel(g, { x: 415, y: 40, w: 350, h: 385 }, R`y = \tfrac{1}{z}`, { clave: 'pb', p: q(3) });
      ejes(g, B, { numeros: false, clave: 'eb', p: q(3) });
      ramas((t) => 1 / zDe(C)(t)).forEach(([ts, ys]) => curva(g, B, ts, ys, { p: q(3) }));
      if (C < 0) {
        const t0 = -Math.log(-C);   // C e^{−t} + e^{−2t} = 0 ⇔ e^{−t} = −C
        [A, B].forEach((P) => g.linea([[P.X(t0), P.caja.y], [P.X(t0), P.caja.y + P.caja.h]], { color: 'rojo', ancho: 1.4, guion: [5, 4], alfa: ease(q(3)) }));
        g.tex('ex', B.X(t0) + 6, B.Y(3.6), R`z = 0:\ t = -\ln(-C)`, { color: 'rojo', tam: 13, ancla: 'l', alfa: ease(q(3)), fondo: true });
      }
    }
    if (paso === 4) { rectaEquilibrio(g, B, 0, { color: 'violeta', p, ancho: 3 }); g.tex('y0', B.X(2), B.Y(0) + 18, R`y \equiv 0 \text{ (perdida al dividir)}`, { color: 'violeta', tam: 13, alfa: ease(p), fondo: true }); }
  },
  pasos: 5,
});
