// Valientes · logística: u = 1/P convierte las curvas en S en exponenciales que caen hacia 1/N; de vuelta,
// P = 1/u tiende a N y nunca se anula.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const P0S = [0.15, 0.4, 1, 1.8, 3.4, 4.5];

export default definirEscena({
  alto: 420,
  entradas: [
    { id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 1, min: 0.3, max: 2, paso: 0.05 },
    { id: 'N', tipo: 'deslizador', etiqueta: 'N', valor: 2.5, min: 1, max: 4, paso: 0.1 },
  ],
  preparar: (e) => ({
    e,
    A: plano({ x: 60, y: 58, w: 300, h: 312 }, { t: [0, 6], y: [0, 5] }),
    B: plano({ x: 440, y: 58, w: 300, h: 312 }, { t: [0, 6], y: [0, 1 / 0.15 * 0.85] }),
  }),
  duracion: [1800, 2200, 2000, 2200],
  leyenda: { cian: 'P(t)', violeta: 'u = 1/P', verde: 'límites N y 1/N' },
  dibujar(g, c, { paso, p }) {
    const { k, N } = c.e, { A, B } = c, q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const P = (P0) => (t) => N / (1 + (N / P0 - 1) * Math.exp(-k * t));
    panel(g, { x: 30, y: 15, w: 350, h: 390 }, R`P(t)`, { clave: 'pa' });
    ejes(g, A, { y: '', clave: 'ea' });
    g.linea([[A.caja.x, A.Y(N)], [A.caja.x + A.caja.w, A.Y(N)]], { color: 'verde', ancho: 1.4, guion: [6, 5], alfa: paso >= 3 ? 1 : 0.4 });
    g.tex('N', A.caja.x + A.caja.w + 6, A.Y(N), 'N', { color: 'verde', tam: 15, ancla: 'l' });
    P0S.forEach((x, i) => grafica(g, A, P(x), { p: paso === 0 ? tramo(p, 0.08 * i, 0.6 + 0.08 * i) : 1, alfa: paso === 1 || paso === 2 ? 0.45 : 1, brillo: paso >= 3 ? 7 : 0 }));
    if (paso >= 1) {
      panel(g, { x: 410, y: 15, w: 350, h: 390 }, R`u(t) = \dfrac{1}{P(t)}`, { clave: 'pb', p: q(1) });
      ejes(g, B, { y: '', clave: 'eb', p: q(1) });
      g.linea([[B.caja.x, B.Y(1 / N)], [B.caja.x + B.caja.w, B.Y(1 / N)]], { color: 'verde', ancho: 1.4, guion: [6, 5], alfa: ease(q(1)) });
      g.tex('uN', B.caja.x + B.caja.w + 6, B.Y(1 / N), R`\tfrac{1}{N}`, { color: 'verde', tam: 15, ancla: 'l', alfa: ease(q(1)) });
      P0S.forEach((x, i) => grafica(g, B, (t) => 1 / P(x)(t), { p: paso === 1 ? tramo(p, 0.08 * i, 0.6 + 0.08 * i) : 1, color: 'violeta' }));
      formula(g, 'ul', B.X(3.3), B.Y(5.2), R`u' = -ku + \tfrac{k}{N}`, { p: tramo(q(1), 0.5, 1), tam: 17, color: 'violeta' });
    }
    if (paso >= 2) formula(g, 'ue', B.X(3.3), B.Y(4.1), R`u - \tfrac{1}{N} = \left(\tfrac{1}{P_0} - \tfrac{1}{N}\right)e^{-kt} \to 0`, { p: q(2), tam: 15 });
    if (paso >= 3) {
      formula(g, 'pn', A.X(3.2), A.Y(4.6), R`P = \dfrac{1}{u} \longrightarrow N`, { p: q(3), tam: 18, color: 'cian' });
      g.tex('nc', A.X(3.2), A.Y(0.35), R`\text{el denominador nunca es } 0 \Rightarrow P > 0`, { color: 'texto2', tam: 13, alfa: ease(q(3)) });
    }
  },
  pasos: 4,
});
