// Coeficientes indeterminados: se prueba y_p = α e^t (o α cos 3t + β sin 3t) y se mira el residuo y_p' + 2y_p − b(t):
// los coeficientes correctos lo anulan para todo t.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 50, y: 70, w: 340, h: 300 }, { t: [-1, 2], y: [-2, 3] });
const B = plano({ x: 450, y: 70, w: 280, h: 300 }, { t: [-1, 2], y: [-2, 2] });

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'a', tipo: 'deslizador', etiqueta: R`\alpha`, valor: 0.8, min: -1, max: 1.5, paso: 0.01 }],
  preparar: (e) => ({ e }),
  vivo: [6],
  duracion: [1800, 2600, 1600, 1600, 2000, 2200, 2800],
  leyenda: { violeta: 'homogénea', cian: 'propuesta y_p', rojo: 'residuo (debe ser 0)', verde: 'solución' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    if (paso <= 2) {
      // y' = −2y + e^t
      panel(g, { x: 25, y: 25, w: 390, h: 390 }, R`\dfrac{dy}{dt} = -2y + e^t`, { clave: 'pa' });
      ejes(g, A, { numeros: false, clave: 'ea' });
      [-1.5, -0.5, 0.5, 1.5].forEach((k) => grafica(g, A, (t) => k * Math.exp(-2 * t), { color: 'violeta', alfa: 0.5 * ease(q(0)), brillo: 0, ancho: 1.4 }));
      if (paso === 0) formula(g, 'h', 220, 400, R`y_h = k\,e^{-2t}`, { p, tam: 15, color: 'violeta' });
      if (paso >= 1) {
        const a = paso === 1 ? mezclar(c.e.a, 1 / 3, ease(tramo(p, 0.3, 1))) : 1 / 3;
        grafica(g, A, (t) => a * Math.exp(t), { color: 'cian' });
        panel(g, { x: 425, y: 25, w: 330, h: 390 }, R`\text{residuo } y_p' + 2y_p - e^t = (3\alpha - 1)e^t`, { clave: 'pb' });
        ejes(g, B, { numeros: false, y: '', clave: 'eb' });
        grafica(g, B, (t) => (3 * a - 1) * Math.exp(t), { color: 'rojo' });
        g.tex('al', 590, 400, R`\alpha = ${a.toFixed(3)}`, { color: 'cian', tam: 15, fondo: true });
      }
      if (paso === 2) { [-1, 0, 1].forEach((k) => grafica(g, A, (t) => k * Math.exp(-2 * t) + Math.exp(t) / 3, { color: 'verde', alfa: 0.7, ancho: 1.6, brillo: 0 })); formula(g, 'g', 220, 400, R`y = k\,e^{-2t} + \tfrac13 e^t`, { p, tam: 15, color: 'verde' }); }
      return;
    }
    if (paso === 3 || paso === 4) {
      formula(g, 'id', 380, 60, R`\text{proponer una forma basada en } b(t) \text{ con coeficientes incógnita}`, { p: q(3), tam: 15 });
      const filas = [[R`b(t) = \text{polinomio de grado } n`, R`y_p = \text{polinomio de grado } n`], [R`b(t) = e^{at}`, R`y_p = \alpha e^{at}`], [R`b(t) = \cos\omega t \text{ o } \sin\omega t`, R`y_p = \alpha\cos\omega t + \beta\sin\omega t`]];
      if (paso === 4) filas.forEach(([a, b], i) => { const al = ease(tramo(p, 0.2 * i, 0.5 + 0.2 * i)); g.tex(`r${i}a`, 200, 150 + 70 * i, a, { color: 'texto2', tam: 16, alfa: al }); g.flecha(330, 150 + 70 * i, 400, 150 + 70 * i, { color: 'tenue', alfa: al, ancho: 1.6 }); g.tex(`r${i}b`, 560, 150 + 70 * i, b, { color: 'cian', tam: 16, alfa: al }); });
      return;
    }
    // y' + 2y = cos 3t: el residuo con (α, β) → (2/13, 3/13)
    panel(g, { x: 25, y: 25, w: 390, h: 390 }, R`\dfrac{dy}{dt} + 2y = \cos 3t`, { clave: 'pc' });
    ejes(g, A, { numeros: false, clave: 'ec' });
    const s = paso === 5 ? 0 : ease((1 - Math.cos(tiempo / 1600)) / 2);
    const al = mezclar(0.5, 2 / 13, s), be = mezclar(-0.4, 3 / 13, s);
    grafica(g, A, (t) => al * Math.cos(3 * t) + be * Math.sin(3 * t), { color: 'cian' });
    panel(g, { x: 425, y: 25, w: 330, h: 390 }, R`\text{residuo } y_p' + 2y_p - \cos 3t`, { clave: 'pd' });
    ejes(g, B, { numeros: false, y: '', clave: 'ed' });
    grafica(g, B, (t) => (2 * al + 3 * be - 1) * Math.cos(3 * t) + (-3 * al + 2 * be) * Math.sin(3 * t), { color: 'rojo' });
    formula(g, 'pr', 220, 400, R`y_p = ${al.toFixed(3)}\cos 3t + ${be.toFixed(3)}\sin 3t`, { tam: 14, color: 'cian' });
    if (paso === 6) formula(g, 'sis', 590, 400, R`2\alpha + 3\beta = 1,\ -3\alpha + 2\beta = 0 \Rightarrow \tfrac{2}{13},\ \tfrac{3}{13}`, { p, tam: 13 });
  },
  pasos: 7,
});
