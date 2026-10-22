// Valientes · separación: el nivel G(t) + C (izquierda) corta a H(y) = ln y (centro) en un único y, que es y(t)
// (derecha). Monotonía estricta = existencia y unicidad.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, punto } from '../primitivas.js';
import { panel } from '../piezas.js';

const R = String.raw;
const V = [-2.2, 2.2];
const PG = plano({ x: 40, y: 50, w: 200, h: 320 }, { t: [-2, 2], y: V });
const PH = plano({ x: 290, y: 50, w: 200, h: 320 }, { t: [0, 5], y: V });
const PS = plano({ x: 540, y: 50, w: 200, h: 320 }, { t: [-2, 2], y: [0, 5] });

export default definirEscena({
  alto: 420,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: -1, min: -1.9, max: 0.3, paso: 0.05 }],
  preparar: (e) => ({ e }),
  vivo: [1, 2, 3],
  duracion: [1600, 1600, 1800, 1800],
  leyenda: { violeta: 'H(y) = ln y', ambar: 'G(t) + C', cian: 'y(t) = H⁻¹(G(t) + C)' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0), C = c.e.C;
    panel(g, { x: 20, y: 25, w: 240, h: 375 }, R`G(t) + C`, { clave: 'p1' });
    panel(g, { x: 270, y: 25, w: 240, h: 375 }, R`H(y) = \ln y`, { clave: 'p2' });
    panel(g, { x: 520, y: 25, w: 240, h: 375 }, R`y(t)`, { clave: 'p3' });
    ejes(g, PH, { t: 'y', y: '', numeros: false, rejilla: false, clave: 'eh' });
    grafica(g, PH, Math.log, { color: 'violeta', p: q(0) });
    if (paso === 0) {
      // un nivel cualquiera corta una sola vez
      const s = mezclar(-1.8, 1.4, (1 - Math.cos(p * Math.PI)) / 2);
      g.linea([[PH.caja.x, PH.Y(s)], [PH.caja.x + PH.caja.w, PH.Y(s)]], { color: 'texto', ancho: 1.2, guion: [4, 4] });
      punto(g, PH.X(Math.exp(s)), PH.Y(s), { color: 'violeta' });
      g.tex('una', PH.X(2.5), PH.Y(-1.9), R`\text{cada nivel: un solo corte}`, { color: 'violeta', tam: 13, fondo: true });
      return;
    }
    ejes(g, PG, { y: '', numeros: false, rejilla: false, clave: 'eg', p: q(1) });
    ejes(g, PS, { numeros: false, rejilla: false, clave: 'es', p: q(1) });
    const Cs = paso === 3 ? [C - 0.5, C, C + 0.6] : [C];
    Cs.forEach((Ck, k) => {
      const prin = Ck === C;
      grafica(g, PG, (t) => (t * t) / 2 + Ck, { color: 'ambar', alfa: prin ? 1 : 0.4, brillo: prin ? 4 : 0 });
      if (paso >= 2) grafica(g, PS, (t) => Math.exp((t * t) / 2 + Ck), { color: 'cian', alfa: prin ? ease(q(2)) : 0.4, brillo: prin ? 6 : 0 });
    });
    // el instante t va y viene; el nivel G(t) + C viaja a H y de ahí a y(t)
    const t = mezclar(-1.8, 1.8, (1 - Math.cos(tiempo / 1700)) / 2), s = (t * t) / 2 + C, y = Math.exp(s);
    punto(g, PG.X(t), PG.Y(s), { color: 'ambar' });
    g.linea([[PG.X(t), PG.Y(s)], [PH.X(Math.min(5, y)), PH.Y(s)]], { color: 'texto', ancho: 1.2, guion: [4, 4], alfa: ease(q(1)) });
    if (paso >= 2 && y <= 5) {
      punto(g, PH.X(y), PH.Y(s), { color: 'violeta' });
      g.linea([[PH.X(y), PH.Y(s)], [PH.X(y), PH.caja.y + PH.caja.h]], { color: 'cian', ancho: 1.2, alfa: ease(q(2)) });
      g.tex('yv', PH.X(y), PH.caja.y + PH.caja.h + 12, R`y = ${y.toFixed(2)}`, { color: 'cian', tam: 13, alfa: ease(q(2)) });
      punto(g, PS.X(t), PS.Y(y), { color: 'cian', halo: true, alfa: ease(q(2)) });
    }
    g.tex('tv', PG.X(t), PG.caja.y + PG.caja.h + 12, R`t = ${t.toFixed(2)}`, { color: 'ambar', tam: 13 });
    if (paso === 3) g.tex('uni', 640, 395, R`\text{mismo dato} \Rightarrow \text{mismo } C \Rightarrow \text{misma curva}`, { color: 'texto2', tam: 12, alfa: ease(p) });
  },
  pasos: 4,
});
