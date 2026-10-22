// Unicidad: si por un punto pasaran dos soluciones, darían predicciones distintas. Con f y ∂f/∂y continuas no
// pasa: por cada punto, una sola. Consecuencia: las soluciones no se cruzan (arrastra una y nunca toca a otra).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion, punto, curva } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-3, 3], y: [-3, 3] });
const f = (t, y) => Math.sin(t) - 0.4 * y;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'y0', tipo: 'deslizador', etiqueta: 'y(0)', valor: 0.5, min: -2.8, max: 2.8, paso: 0.02 }],
  preparar: (e) => ({ e }),
  duracion: [2400, 2400, 2600],
  leyenda: { campo: 'campo', tenue: 'lo que NO pasa: dos soluciones por un punto', cian: 'soluciones', ciruela: 'la que mueves' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.4 });
    const T0 = -1, Y0 = 0.8;
    if (paso <= 1) {
      // dos «futuros» hipotéticos desde el mismo punto
      const m = (1 - ease(q(1)));
      const a = [], b = [], ts = [];
      for (let i = 0; i <= 80; i++) { const t = T0 + (4 * i) / 80; ts.push(t); a.push(Y0 + 0.9 * (t - T0) * m + 0.1 * (t - T0)); b.push(Y0 - 0.9 * (t - T0) * m - 0.2 * (t - T0)); }
      curva(g, P, ts, a, { color: 'tenue', guion: [6, 5], brillo: 0, p: q(0), alfa: m });
      curva(g, P, ts, b, { color: 'tenue', guion: [6, 5], brillo: 0, p: q(0), alfa: m });
      punto(g, P.X(T0), P.Y(Y0), { color: 'texto', r: 6 });
      if (paso === 0) g.tex('pred', P.X(1.8), P.Y(2.6), R`\text{predicciones distintas: ¿cuál creer?}`, { color: 'texto2', tam: 14, fondo: true });
      if (paso === 1) {
        solucion(g, P, f, T0, Y0, { p, punto: false });
        formula(g, 'teo', 370, 22, R`f,\ \tfrac{\partial f}{\partial y} \text{ continuas} \Rightarrow \text{una sola solución por } (t_0, y_0)`, { p, tam: 15 });
      }
      return;
    }
    [-2.5, -1.5, -0.6, 1.4, 2.4].forEach((y0, i) => solucion(g, P, f, 0, y0, { p: tramo(p, 0.06 * i, 0.5 + 0.06 * i), alfa: 0.6, punto: false, ancho: 1.8 }));
    solucion(g, P, f, 0, c.e.y0, { color: 'ciruela' });
    g.tex('nc', 370, 22, R`\text{las gráficas de soluciones distintas \textbf{nunca se cruzan}: arrastra la ciruela}`, { color: 'texto', tam: 14, fondo: true });
  },
  pasos: 3,
  asas: (c, paso) => (paso === 2 ? [{ id: 'y0', x: P.X(0), y: P.Y(c.e.y0), color: 'ciruela', mover: (x, y) => ({ y0: P.V(y) }) }] : []),
});
