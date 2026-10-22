// Separables: el lado derecho f(t, y) como mapa de signos (cian > 0, rojo < 0). Si f = g(t)·h(y), el mapa es
// una «tabla de multiplicar»: sus ceros son rectas verticales (ceros de g) y horizontales (ceros de h).
// Con y + t los ceros forman una diagonal: no es separable.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, grafica } from '../primitivas.js';
import { formula, panel, azar } from '../piezas.js';
import { compilar } from '../../motor/expresion.js';

const R = String.raw;

/** ¿f(t, y) = g(t)·h(y)? Prueba de rango 1 en pares de puntos (deterministas). */
export function pareceSeparable(f, vista) {
  const [a, b] = vista.t, [c, d] = vista.y;
  let pruebas = 0;
  for (let i = 0; i < 200 && pruebas < 60; i++) {
    const t1 = a + (b - a) * azar(i), t2 = a + (b - a) * azar(i + 300), y1 = c + (d - c) * azar(i + 600), y2 = c + (d - c) * azar(i + 900);
    const A = f(t1, y1) * f(t2, y2), B = f(t1, y2) * f(t2, y1);
    if (![A, B].every(Number.isFinite)) continue;
    pruebas++;
    if (Math.abs(A - B) > 1e-6 * (1 + Math.abs(A) + Math.abs(B))) return false;
  }
  return pruebas > 10;
}

function mapa(g, P, f, { p = 1, n = 48, m = 32 } = {}) {
  const { x, y, w, h } = P.caja, dw = w / n, dh = h / m;
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) {
    const q = ease(tramo(p, (i / n) * 0.6, (i / n) * 0.6 + 0.4));
    if (q <= 0) continue;
    const v = f(P.T(x + (i + 0.5) * dw), P.V(y + (j + 0.5) * dh));
    if (!Number.isFinite(v)) continue;
    const a = Math.min(1, Math.abs(v) / 3) * 0.55 + 0.08;
    g.rect(x + i * dw, y + j * dh, dw + 0.5, dh + 0.5, { color: v > 0 ? 'cian' : 'rojo', alfa: a * q });
  }
}

const EJEMPLOS = [['y*t', R`y\cdot t`], ['y+t', R`y + t`], ['(t+1)/(t(y+1))', R`\tfrac{t+1}{t(y+1)}`]];

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'f', tipo: 'funcion', etiqueta: R`\dfrac{dy}{dt} =`, valor: 'y*t', ejemplos: ['y*t', 'y+t', '(t+1)/(t(y+1))', 'y(1-y)', 'e^(t+y)', 'sin(t y)'] }],
  preparar: (e) => {
    const P = plano({ x: 140, y: 80, w: 440, h: 300 }, { t: [-3, 3], y: [-2.5, 2.5] });
    const f = (t, y) => e.fF(t, y);
    return { e, P, f, sep: pareceSeparable(f, P.vista) };
  },
  duracion: [2000, 1500, 2400, 2600, 2000, 2000],
  leyenda: { cian: 'f > 0 (y crece)', rojo: 'f < 0 (y decrece)', violeta: 'ceros de g(t) y de h(y)' },
  dibujar(g, c, { paso, p }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    if (paso <= 1) {
      // lo raro es poder resolver: la mayoría de ecuaciones no tienen fórmula
      const lista = [[R`\dfrac{dy}{dt} = y^2 - t`, false], [R`\dfrac{dy}{dt} = e^{t^2}`, false], [R`\dfrac{dy}{dt} = \sin(ty)`, false], [R`\dfrac{dy}{dt} = y\cdot t`, true]];
      lista.forEach(([tx, ok], i) => {
        const a = ease(tramo(q(0), 0.15 * i, 0.4 + 0.15 * i)), y = 80 + 80 * i;
        formula(g, `l${i}`, 240, y, tx, { p: a, tam: 20 });
        const ver = paso === 1 && ok;
        g.tex(`v${i}`, 470, y, ok ? (paso === 1 ? R`\text{separable: ¡sí se puede!}` : R`?`) : R`\text{sin fórmula elemental}`, { color: ok ? (ver ? 'verde' : 'tenue') : 'tenue', tam: 15, ancla: 'l', alfa: a });
      });
      if (paso === 1) g.tex('tit', 380, 30, R`\text{unos pocos tipos especiales: \textbf{variables separables}}`, { color: 'verde', tam: 17, alfa: ease(p) });
      return;
    }
    if (paso === 3) {
      // los tres ejemplos de la conferencia, lado a lado
      EJEMPLOS.forEach(([txt, tex], i) => {
        const f = compilar(txt).f, P = plano({ x: 30 + i * 245, y: 90, w: 215, h: 250 }, { t: [-3, 3], y: [-2.5, 2.5] });
        const a = tramo(p, 0.2 * i, 0.5 + 0.2 * i);
        mapa(g, P, f, { p: a, n: 30, m: 34 });
        ejes(g, P, { numeros: false, t: '', y: '', rejilla: false, clave: `e${i}`, p: a });
        const s = pareceSeparable(f, P.vista);
        formula(g, `t${i}`, P.caja.x + P.caja.w / 2, 60, R`\dfrac{dy}{dt} = ${tex}`, { p: a, tam: 16 });
        g.tex(`s${i}`, P.caja.x + P.caja.w / 2, 370, s ? R`\checkmark\ \text{separable}` : R`\text{no separable: ceros en diagonal}`, { color: s ? 'verde' : 'rojo', tam: 15, alfa: ease(a) });
        if (!s) g.linea([[P.X(-2.5), P.Y(2.5)], [P.X(2.5), P.Y(-2.5)]], { color: 'violeta', ancho: 2.2, guion: [6, 4], alfa: ease(a) });
      });
      return;
    }
    // pasos 2, 4, 5: el mapa grande con la función de t arriba y la de y a la izquierda
    const autonoma = paso >= 4;
    const f = paso === 4 ? (t, y) => y * y - 1 : paso === 5 ? (t, y) => 1.5 * y * (1 - y / 1.5) : c.f;
    const P = c.P, sep = paso === 2 ? c.sep : true;
    mapa(g, P, f, { p: paso === 2 ? p : tramo(p, 0, 0.6) });
    ejes(g, P, { numeros: false, rejilla: false, clave: 'eg' });
    formula(g, 'def', 360, 24, paso === 2 ? R`\dfrac{dy}{dt} = ${c.e.fTex}` : paso === 4 ? R`\dfrac{dy}{dt} = h(y) = y^2 - 1 \quad (g(t) = 1)` : R`\dfrac{dP}{dt} = kP\left(1 - \tfrac{P}{N}\right)\ \text{(logística: autónoma)}`, { p: q(paso), tam: 15 });
    if (sep) {
      // las «cabeceras» de la tabla: g(t) arriba, h(y) a la izquierda (estimadas como cortes de f)
      const Pt = plano({ x: P.caja.x, y: 50, w: P.caja.w, h: 24 }, { t: P.vista.t, y: [-1.2, 1.2] });
      const Py = plano({ x: 70, y: P.caja.y, w: 50, h: P.caja.h }, { t: [-1.2, 1.2], y: P.vista.y });
      const y1 = 1.17, t1 = 1.31, norm = (v, s) => Math.max(-1.1, Math.min(1.1, v / s));
      const sT = Math.max(1e-9, ...Array.from({ length: 50 }, (_, i) => Math.abs(f(-3 + 0.12 * i, y1)) || 0));
      const sY = Math.max(1e-9, ...Array.from({ length: 50 }, (_, i) => Math.abs(f(t1, -2.5 + 0.1 * i)) || 0));
      if (!autonoma) grafica(g, Pt, (t) => norm(f(t, y1), sT), { color: 'texto', brillo: 0, ancho: 1.6, p: tramo(q(paso), 0.5, 1) });
      // h(y) se dibuja girada: y en vertical
      const pts = [];
      for (let j = 0; j <= 80; j++) { const yy = -2.5 + (5 * j) / 80, v = norm(f(t1, yy), sY); if (Number.isFinite(v)) pts.push([Py.X(v), Py.Y(yy)]); }
      g.linea(pts, { color: 'texto', ancho: 1.6, alfa: ease(tramo(q(paso), 0.5, 1)) });
      g.tex('gt', P.caja.x + P.caja.w + 10, 62, autonoma ? R`g(t) = 1` : R`g(t)`, { color: 'texto2', tam: 14, ancla: 'l', alfa: ease(tramo(q(paso), 0.5, 1)) });
      g.tex('hy', 95, P.caja.y + P.caja.h + 16, R`h(y)`, { color: 'texto2', tam: 14, alfa: ease(tramo(q(paso), 0.5, 1)) });
      // ceros: rectas verticales y horizontales
      const ceroT = [], ceroY = [];
      for (let i = 0; i < 300; i++) { const a = -3 + 0.02 * i, b = a + 0.02; if (Math.sign(f(a, y1)) !== Math.sign(f(b, y1)) && Number.isFinite(f(a, y1) * f(b, y1)) && Math.abs(f(a, y1)) + Math.abs(f(b, y1)) < 2) ceroT.push((a + b) / 2); }
      for (let i = 0; i < 250; i++) { const a = -2.5 + 0.02 * i, b = a + 0.02; if (Math.sign(f(t1, a)) !== Math.sign(f(t1, b)) && Math.abs(f(t1, a)) + Math.abs(f(t1, b)) < 2) ceroY.push((a + b) / 2); }
      const qz = ease(tramo(q(paso), 0.6, 1));
      ceroT.forEach((t) => g.linea([[P.X(t), P.caja.y], [P.X(t), P.caja.y + P.caja.h]], { color: 'violeta', ancho: 2, alfa: qz }));
      ceroY.forEach((y) => g.linea([[P.caja.x, P.Y(y)], [P.caja.x + P.caja.w, P.Y(y)]], { color: 'violeta', ancho: 2, alfa: qz }));
    }
    g.tex('ver', 360, 420, sep ? (autonoma ? R`\text{solo depende de } y\text{: franjas horizontales} \Rightarrow \text{separable}` : R`\checkmark\ \text{separable: } f(t, y) = g(t)\cdot h(y)`) : R`\times\ \text{no separable}`, { color: sep ? 'verde' : 'rojo', tam: 16, alfa: ease(tramo(q(paso), 0.6, 1)) });
  },
  pasos: 6,
});
