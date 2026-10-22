// Autónomas: el campo de y(1 − y) se repite en cada columna; traslaciones horizontales; ejemplos; y la columna
// t = 0 copiada a todas las demás: la información es redundante.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, solucionCache } from '../../motor/plano.js';
import { ejes, campo, curva } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 370 }, { t: [-3, 3], y: [-0.8, 1.8] });
const f = (t, y) => y * (1 - y);

export default definirEscena({
  alto: 450, preparar: () => ({ base: solucionCache(f, 0, 0.2, P) }),
  vivo: [1],
  duracion: [1800, 2200, 1500, 2400, 1500, 2800],
  leyenda: { campo: 'campo y(1 − y)', ambar: 'una fila / una columna', cian: 'solución y sus traslaciones' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    if (paso === 3) {
      [['y(1 - y)', (t, y) => y * (1 - y), true, R`y(1 - y)`], ['logística', (t, y) => 1.5 * y * (1 - y / 1.2), true, R`kP\left(1 - \tfrac{P}{N}\right)`], ['y - t', (t, y) => y - t, false, R`y - t`]].forEach(([, fn, ok, tx], i) => {
        const Q = plano({ x: 30 + 245 * i, y: 90, w: 215, h: 260 }, { t: [-2, 2], y: [-1, 2] });
        const a = tramo(p, 0.2 * i, 0.5 + 0.2 * i);
        panel(g, { x: Q.caja.x - 8, y: 50, w: 231, h: 340 }, null, { p: a, clave: `p${i}` });
        campo(g, Q, fn, { p: a, nt: 11, ny: 11, largo: 12, alfa: 0.7 });
        formula(g, `f${i}`, Q.caja.x + 108, 68, R`\dfrac{dy}{dt} = ${tx}`, { p: a, tam: 14 });
        g.tex(`v${i}`, Q.caja.x + 108, 370, ok ? R`\checkmark\ \text{autónoma}` : R`\text{no: aparece } t`, { color: ok ? 'verde' : 'rojo', tam: 14, alfa: ease(a) });
      });
      return;
    }
    ejes(g, P);
    const col = paso === 5 ? ease(p) : 1;
    campo(g, P, f, { alfa: 0.6, nt: 23, ny: 15,
      mostrar: (m) => paso !== 5 || Math.abs(m.t) < 1e-9 || Math.abs(m.t) <= 3 * col + 1e-9,
      destacar: (m) => (paso === 0 && Math.abs(m.y - 0.5) < 0.1 ? 'ambar' : paso === 5 && Math.abs(m.t) < 1e-9 ? 'ambar' : null) });
    if (paso === 0) g.tex('par', 380, 22, R`\text{misma } y \Rightarrow \text{misma pendiente}`, { color: 'ambar', tam: 15, fondo: true });
    if (paso === 1) {
      const d = 1.5 * Math.sin(tiempo / 1000);
      [-1.5, 0, 1.5].forEach((s) => { curva(g, P, c.base.atras.t.map((t) => t - s), c.base.atras.y, { alfa: 0.3, brillo: 0 }); curva(g, P, c.base.adelante.t.map((t) => t - s), c.base.adelante.y, { alfa: 0.3, brillo: 0 }); });
      curva(g, P, c.base.atras.t.map((t) => t - d), c.base.atras.y, {}); curva(g, P, c.base.adelante.t.map((t) => t - d), c.base.adelante.y, {});
      g.tex('tr', 380, 22, R`\text{trasladar a izquierda o derecha: infinitas soluciones}`, { color: 'cian', tam: 15, fondo: true });
    }
    if (paso === 2) formula(g, 'def', 380, 22, R`\dfrac{dy}{dt} = f(y):\ \text{no aparece } t`, { p, tam: 18 });
    if (paso === 4) formula(g, 'pq', 380, 22, R`\text{las leyes no cambian con el tiempo}`, { p, tam: 16 });
    if (paso === 5) {
      g.linea([[P.X(0), P.caja.y], [P.X(0), P.caja.y + P.caja.h]], { color: 'ambar', ancho: 1, guion: [3, 4], alfa: 0.7 });
      g.tex('red', 380, 22, R`\text{la columna } t = 0 \text{ determina todo el campo}`, { color: 'ambar', tam: 15, fondo: true });
    }
  },
  pasos: 6,
});
