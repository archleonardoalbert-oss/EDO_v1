// Elementos de una EDO: el tiempo t avanza (independiente), la población P lo sigue (dependiente) y el
// parámetro k es una perilla fija que cambia la curva entera. Colores: t blanco, P cian, k ciruela.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo } from '../../motor/plano.js';
import { ejes, curva, punto } from '../primitivas.js';
import { formula, barraValor } from '../piezas.js';

const R = String.raw;

export default definirEscena({
  alto: 430,
  entradas: [{ id: 'k', tipo: 'deslizador', etiqueta: 'k', valor: 0.6, min: -0.6, max: 1.2, paso: 0.05 }],
  preparar: (e) => ({ e, P: plano({ x: 60, y: 60, w: 430, h: 320 }, { t: [0, 4], y: [0, 6] }), P0: 0.8 }),
  vivo: true,
  duracion: 1500,
  leyenda: { texto: 't: variable independiente', cian: 'P: variable dependiente', ciruela: 'k: parámetro' },
  capas: [
    // 0 · el tiempo: un cursor que avanza por el eje horizontal
    (g, c, o) => {
      ejes(g, c.P, { p: o.p, t: 't', y: o.paso >= 1 ? 'P' : '', numeros: true });
      const t = cursor(o.tiempo);
      const x = c.P.X(t), q = ease(o.p);
      g.linea([[x, c.P.caja.y], [x, c.P.caja.y + c.P.caja.h]], { color: 'texto', ancho: 1.2, alfa: 0.35 * q, guion: [3, 5] });
      g.circulo(x, c.P.Y(0), 5, { color: 'texto', alfa: q, brillo: 8 });
      g.texto(x, c.P.Y(0) + 26, `t = ${t.toFixed(2)}`, { color: 'texto', tam: 12, alfa: q });
      caja(g, 'ind', 540, 80, R`\textbf{independiente}`, [R`t \text{ (tiempo)}`, R`\text{respecto a ella}`, R`\text{derivamos}`], 'texto', o.actual ? o.p : 1);
    },
    // 1 · la función incógnita P(t): sigue al tiempo
    (g, c, o) => {
      const { ts, ys } = trazo(c);
      curva(g, c.P, ts, ys, { p: o.actual ? o.p : 1 });
      const t = cursor(o.tiempo), y = c.P0 * Math.exp(c.e.k * t);
      if (y <= 6) {
        barraValor(g, c.P, t, y, { p: o.actual ? o.p : 1, color: 'cian', rotulo: R`P(t)`, clave: 'bp', alfa: 0.7 });
        punto(g, c.P.X(t), c.P.Y(y), { color: 'cian', halo: true });
      }
      caja(g, 'dep', 540, 190, R`\textbf{dependiente}`, [R`P \text{ (la incógnita)}`, R`\text{depende de } t`], 'cian', o.actual ? o.p : 1);
    },
    // 2 · el parámetro: una perilla que no cambia con t pero cambia la curva entera
    (g, c, o) => {
      const q = o.actual ? o.p : 1;
      caja(g, 'par', 540, 290, R`\textbf{parámetro}`, [R`k = ${c.e.k.toFixed(2)}`, R`\text{fijo mientras } t \text{ avanza}`], 'ciruela', q);
      // perilla: un arco con aguja según k
      const cx = 700, cy = 320, r = 22, a = Math.PI * (0.75 + 1.5 * ((c.e.k + 0.6) / 1.8));
      g.ctx.save(); g.ctx.strokeStyle = '#b8509f55'; g.ctx.lineWidth = 3; g.ctx.beginPath(); g.ctx.arc(cx, cy, r, Math.PI * 0.75, Math.PI * 2.25); g.ctx.stroke(); g.ctx.restore();
      g.linea([[cx, cy], [cx + r * Math.cos(a), cy + r * Math.sin(a)]], { color: 'ciruela', ancho: 3, alfa: ease(q) });
      g.circulo(cx, cy, 4, { color: 'ciruela', alfa: ease(q) });
      if (o.actual) g.tex('mueve', c.P.X(2), c.P.caja.y - 18, R`\text{mueve } k \text{ con el deslizador: cambia toda la curva}`, { color: 'ciruela', tam: 13, alfa: ease(tramo(o.p, 0.4, 1)) });
    },
    // 3 · el ejemplo, con cada símbolo de su color
    (g, c, o) => {
      formula(g, 'ej', 270, 30, R`\dfrac{d\htmlClass{k-cian}{P}}{d\,t} = \htmlClass{k-ciruela}{k}\,\htmlClass{k-cian}{P}`, { p: o.p, tam: 24 });
    },
  ],
});

const cursor = (tiempo) => 4 * ((tiempo / 1000 / 6) % 1);
function trazo(c) {
  const ts = [], ys = [];
  for (let i = 0; i <= 120; i++) { const t = (4 * i) / 120; ts.push(t); ys.push(c.P0 * Math.exp(c.e.k * t)); }
  return { ts, ys };
}
function caja(g, clave, x, y, titulo, lineas, color, p) {
  const q = ease(p);
  g.rect(x - 10, y - 16, 210, 26 + 22 * lineas.length, { color, relleno: false, alfa: 0.5 * q, radio: 8 });
  g.tex(`${clave}-t`, x, y, titulo, { color, tam: 15, ancla: 'l', alfa: q });
  lineas.forEach((l, i) => g.tex(`${clave}-${i}`, x, y + 24 + 21 * i, l, { color: 'texto2', tam: 14, ancla: 'l', alfa: q }));
}
