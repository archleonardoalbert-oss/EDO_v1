// Por qué métodos cualitativos: las fórmulas fallan (no separables, sin solución explícita, difíciles de leer);
// la geometría (el campo y sus soluciones) cuenta lo mismo sin resolver nada.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, campo, solucion } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 400, y: 50, w: 330, h: 330 }, { t: [0, 6], y: [-0.4, 1.6] });
const f = (t, y) => y * (1 - y);

export default definirEscena({
  alto: 430,
  duracion: [1600, 1600, 1800, 2600],
  leyenda: { rojo: 'lo que falla', campo: 'la geometría', cian: 'soluciones' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const tarjetas = [
      [R`\dfrac{dy}{dt} = y^2 - t`, R`\text{no se separa}`],
      [R`\begin{cases}\dot R = \alpha R - \beta RF\\ \dot F = -\gamma F + \delta RF\end{cases}`, R`\text{sin solución explícita}`],
      [R`P(t) = \dfrac{N}{1 + \left(\frac{N}{P_0} - 1\right)e^{-kt}}`, R`\text{¿qué hace a largo plazo?}`],
    ];
    tarjetas.forEach(([fx, nota], i) => {
      const a = q(i), y = 50 + 120 * i;
      panel(g, { x: 20, y, w: 350, h: 105 }, null, { p: a, clave: `t${i}` });
      formula(g, `f${i}`, 195, y + 42, fx, { p: a, tam: 15 });
      g.tex(`n${i}`, 195, y + 90, nota, { color: 'rojo', tam: 13, alfa: ease(a) });
    });
    panel(g, { x: 385, y: 20, w: 360, h: 390 }, null, { p: q(3), clave: 'pg' });
    ejes(g, P, { p: q(3), numeros: false });
    campo(g, P, f, { p: q(3), nt: 17, ny: 15, alfa: 0.6 });
    [-0.2, 0.05, 0.3, 0.7, 1.3, 1.55].forEach((y0, i) => solucion(g, P, f, 0, y0, { p: tramo(q(3), 0.3 + 0.08 * i, 0.8 + 0.04 * i), sentido: 'adelante', punto: false, ancho: 2 }));
    if (paso === 3) g.tex('sin', 565, 400, R`\text{sin resolverla: tiende a } 1`, { color: 'verde', tam: 14, alfa: ease(tramo(p, 0.7, 1)) });
  },
  pasos: 4,
});
