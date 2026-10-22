// Cómo dibujar la línea de fase, como en la conferencia: líneas de fase horizontales con su tabla de signos debajo.
// Arriba, el procedimiento con f editable; abajo, los dos ejemplos (1 − y)y y (y + 3)(y − 2).
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { lineaFase, equilibrios, punto } from '../primitivas.js';
import { formula, panel } from '../piezas.js';

const R = String.raw;
// una línea horizontal: y en [a, b] llevado a [x0, x1] en la altura yLinea
const linea = (a, b, x0, x1) => (y) => x0 + ((y - a) / (b - a)) * (x1 - x0);

export default definirEscena({
  alto: 460,
  entradas: [{ id: 'f', tipo: 'funcion', etiqueta: R`f(y) =`, valor: 'y^2 - 1', vars: ['y'], ejemplos: ['y^2 - 1', 'y(2 - y)(y + 1)', 'sin(y)', '(y - 1)^2'] }],
  preparar: (e) => { const h = (y) => e.fF(y); return { e, h, eqs: equilibrios(h, -4, 4) }; },
  duracion: [2400, 2000, 1800, 2200, 1800, 2200],
  leyenda: { verde: 'sumidero', ambar: 'fuente', violeta: 'nodo', cian: 'f > 0', rojo: 'f < 0' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    if (paso <= 1) {
      // el procedimiento con la f del usuario, en vertical (como lo describe la conferencia)
      const Y = (y) => 410 - ((y + 4) / 8) * 370;
      lineaFase(g, { f: c.h, eqs: c.eqs, coord: Y, desde: Y(-4), hasta: Y(4), otra: 200, rango: [-4, 4], p: q(0), particulas: false, clave: 'lf' });
      g.tex('y', 200, 24, 'y', { color: 'texto2', tam: 16 });
      formula(g, 'pr', 500, 70, R`1.\ \text{recta vertical } y`, { p: tramo(q(0), 0, 0.3), tam: 15 });
      formula(g, 'pr2', 500, 110, R`2.\ f(y) = 0:\ \text{puntos}`, { p: tramo(q(0), 0.2, 0.5), tam: 15 });
      formula(g, 'pr3', 500, 150, R`3.\ \text{signo de } f \text{ en cada intervalo: flechas}`, { p: tramo(q(0), 0.4, 0.8), tam: 15 });
      if (paso === 1) {
        // un valor de prueba por intervalo
        const cortes = [-4, ...c.eqs.map((e) => e.y), 4];
        for (let i = 0; i < cortes.length - 1; i++) {
          const m = (cortes[i] + cortes[i + 1]) / 2, v = c.h(m);
          punto(g, 200, Y(m), { color: v > 0 ? 'cian' : 'rojo', r: 4, alfa: ease(p) });
          g.tex(`vp${i}`, 230, Y(m), R`f(${m.toFixed(2)}) = ${v.toFixed(2)}`, { color: v > 0 ? 'cian' : 'rojo', tam: 13, ancla: 'l', alfa: ease(p), fondo: true });
        }
        g.tex('obs', 500, 220, R`\text{basta evaluar } f \text{ en un punto de cada intervalo}`, { color: 'texto', tam: 14, fondo: true });
      }
      return;
    }
    // los dos ejemplos de la conferencia, en horizontal
    const ejemplos = [
      { tx: R`\dfrac{dy}{dt} = (1 - y)y`, h: (y) => (1 - y) * y, a: -1.5, b: 2.5, eqs: [{ y: 0, tipo: 'fuente' }, { y: 1, tipo: 'sumidero' }], fac: [['y', (y) => y], ['1 - y', (y) => 1 - y]], y0: 120, desde: 2 },
      { tx: R`\dfrac{dy}{dt} = (y + 3)(y - 2)`, h: (y) => (y + 3) * (y - 2), a: -5, b: 4, eqs: [{ y: -3, tipo: 'sumidero' }, { y: 2, tipo: 'fuente' }], fac: [['y + 3', (y) => y + 3], ['y - 2', (y) => y - 2]], y0: 330, desde: 4 },
    ];
    ejemplos.forEach((E, k) => {
      if (paso < E.desde) return;
      const a1 = ease(q(E.desde)), a2 = q(E.desde + 1);
      const X = linea(E.a, E.b, 120, 640);
      panel(g, { x: 30, y: E.y0 - 95, w: 700, h: 185 }, null, { p: a1, clave: `pn${k}` });
      formula(g, `t${k}`, 380, E.y0 - 75, E.tx, { p: a1, tam: 15 });
      lineaFase(g, { f: E.h, eqs: E.eqs, coord: X, desde: X(E.a), hasta: X(E.b), otra: E.y0, rango: [E.a, E.b], orientacion: 'horizontal', p: paso === E.desde ? a1 : 1, flechas: paso > E.desde, particulas: false, clave: `lf${k}` });
      g.tex(`y${k}`, 660, E.y0, 'y', { color: 'texto2', tam: 15, ancla: 'l', alfa: a1 });
      // tabla de signos de los factores y del producto (debajo de la línea)
      if (paso > E.desde) {
        const cortes = [E.a, ...E.eqs.map((e) => e.y), E.b];
        E.fac.forEach(([nom, fn], i) => {
          g.tex(`fn${k}${i}`, 60, E.y0 + 30 + 20 * i, nom, { color: 'texto2', tam: 13, alfa: ease(a2) });
          for (let j = 0; j < cortes.length - 1; j++) { const m = (cortes[j] + cortes[j + 1]) / 2; g.texto(X(m), E.y0 + 30 + 20 * i, fn(m) > 0 ? '+' : '−', { color: fn(m) > 0 ? 'cian' : 'rojo', tam: 14, alfa: ease(a2) }); }
        });
        g.tex(`ff${k}`, 60, E.y0 + 70, R`f`, { color: 'texto', tam: 14, alfa: ease(a2) });
        for (let j = 0; j < cortes.length - 1; j++) { const m = (cortes[j] + cortes[j + 1]) / 2, v = E.h(m); g.texto(X(m), E.y0 + 70, v > 0 ? '+' : '−', { color: v > 0 ? 'cian' : 'rojo', tam: 16, peso: 700, alfa: ease(a2) }); }
      }
    });
  },
  pasos: 6,
});
