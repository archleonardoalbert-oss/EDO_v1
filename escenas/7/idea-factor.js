// La regla del producto como área: un rectángulo de lados μ(t) e y(t). Al avanzar dt, el área crece en dos franjas:
// μ·dy (arriba) y y·dμ (a la derecha). (μy)' = μy' + μ'y: eso es lo que buscamos que sea el lado izquierdo.
import { definirEscena } from '../comun.js';
import { ease, tramo, mezclar } from '../../motor/plano.js';
import { formula } from '../piezas.js';

const R = String.raw;

export default definirEscena({
  alto: 450, preparar: () => ({}),
  vivo: [2, 3],
  duracion: [1800, 1800, 2400, 2200],
  leyenda: { ambar: 'μ·dy', violeta: 'y·dμ', cian: 'μ·y' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    formula(g, 'pre', 380, 26, paso === 0 ? R`\text{adivinar } y_p \;\longrightarrow\; \text{calcular una integral}` : R`\dfrac{dy}{dt} + g(t)\,y = b(t)\qquad (g = -a)`, { tam: 16 });
    if (paso < 2) return;
    // rectángulo μ × y que crece
    const s = paso >= 2 ? (1 - Math.cos(tiempo / 1500)) / 2 : 0;
    const mu = mezclar(160, 230, s), y = mezclar(120, 170, s), dmu = 34, dy = 26, x0 = 120, y0 = 380;
    g.rect(x0, y0 - y, mu, y, { color: 'cian', alfa: 0.25 });
    g.rect(x0, y0 - y, mu, y, { color: 'cian', relleno: false, ancho: 2 });
    g.rect(x0, y0 - y - dy, mu, dy, { color: 'ambar', alfa: 0.4 * ease(q(2)) });
    g.rect(x0 + mu, y0 - y, dmu, y, { color: 'violeta', alfa: 0.4 * ease(q(2)) });
    g.rect(x0 + mu, y0 - y - dy, dmu, dy, { color: 'tenue', alfa: 0.25 * ease(q(2)) });
    g.tex('mu', x0 + mu / 2, y0 + 16, R`\mu(t)`, { color: 'texto', tam: 15 });
    g.tex('y', x0 - 10, y0 - y / 2, R`y(t)`, { color: 'texto', tam: 15, ancla: 'r' });
    g.tex('ady', x0 + mu / 2, y0 - y - dy / 2, R`\mu\,dy`, { color: 'ambar', tam: 14, alfa: ease(q(2)) });
    g.tex('ydm', x0 + mu + dmu / 2, y0 - y / 2, R`y\,d\mu`, { color: 'violeta', tam: 14, alfa: ease(q(2)) });
    formula(g, 'pr', 590, 150, R`\dfrac{d}{dt}[\mu y] = \htmlClass{k-ambar}{\mu\dfrac{dy}{dt}} + \htmlClass{k-violeta}{\dfrac{d\mu}{dt}\,y}`, { p: q(2), tam: 18 });
    if (paso === 3) formula(g, 'bus', 590, 260, R`\text{buscamos } \mu:\ \mu\left(\dfrac{dy}{dt} + g\,y\right) = \dfrac{d}{dt}[\mu y]`, { p, tam: 15, color: 'cian' });
  },
  pasos: 4,
});
