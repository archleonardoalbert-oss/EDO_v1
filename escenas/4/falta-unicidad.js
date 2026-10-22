// 3y^{2/3}: f continua, ∂f/∂y = 2y^{−1/3} no existe en 0. Por (0, 0) pasan y ≡ 0 y y = t³ (y, pegando, infinitas:
// 0 hasta c y luego (t − c)³).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, curva, rectaEquilibrio, punto } from '../primitivas.js';
import { formula } from '../piezas.js';
import { potencia } from '../../motor/expresion.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 600, h: 370 }, { t: [-2, 2.5], y: [-3, 4] });
const f = (t, y) => 3 * potencia(y, 2 / 3);
const pegada = (c) => { const ts = [], ys = []; for (let i = 0; i <= 200; i++) { const t = -2 + (4.5 * i) / 200; ts.push(t); ys.push(t <= c ? 0 : (t - c) ** 3); } return [ts, ys]; };

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'c', tipo: 'deslizador', etiqueta: 'c', valor: 0.8, min: 0, max: 2, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: [4],
  duracion: [1600, 2000, 1600, 2000, 2400],
  leyenda: { campo: 'campo 3y^{2/3}', violeta: 'y ≡ 0', cian: 'y = t³', ciruela: 'infinitas más' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    ejes(g, P);
    campo(g, P, f, { alfa: 0.45 });
    formula(g, 'pvi', 220, 22, R`\dfrac{dy}{dt} = 3y^{2/3},\ \ y(0) = 0`, { p: q(0), tam: 16 });
    punto(g, P.X(0), P.Y(0), { color: 'texto', r: 6 });
    if (paso >= 1) {
      formula(g, 'hip', 530, 22, R`\tfrac{\partial f}{\partial y} = 2y^{-1/3}\ \text{no existe en } y = 0`, { p: q(1), tam: 15, color: 'rojo' });
      g.linea([[P.caja.x, P.Y(0)], [P.caja.x + P.caja.w, P.Y(0)]], { color: 'rojo', ancho: 6, alfa: 0.15 * ease(q(1)) });
    }
    if (paso >= 2) rectaEquilibrio(g, P, 0, { color: 'violeta', p: q(2), ancho: 2.6 });
    if (paso >= 3) {
      const ts = [], ys = [];
      for (let i = 0; i <= 200; i++) { const t = -2 + (4.5 * i) / 200; ts.push(t); ys.push(t ** 3); }
      curva(g, P, ts, ys, { p: q(3) });
      g.tex('t3', P.X(1.5), P.Y(3.4), R`y_2 = t^3:\ y' = 3t^2 = 3(t^3)^{2/3}\ \checkmark`, { color: 'cian', tam: 14, alfa: ease(q(3)), fondo: true });
    }
    if (paso === 4) {
      const cc = c.e.c + 0.6 * Math.sin(tiempo / 900);
      [0.4, 1.2, 1.8].forEach((k) => { const [ts, ys] = pegada(k); curva(g, P, ts, ys, { color: 'ciruela', alfa: 0.4, brillo: 0, ancho: 1.6 }); });
      const [ts, ys] = pegada(Math.max(0, cc));
      curva(g, P, ts, ys, { color: 'ciruela', ancho: 2.8 });
      g.tex('inf', P.X(-1), P.Y(2.4), R`\text{0 hasta } c,\ \text{luego } (t - c)^3:\ \text{¡infinitas!}`, { color: 'ciruela', tam: 14, alfa: ease(p), fondo: true });
    }
  },
  pasos: 5,
});
