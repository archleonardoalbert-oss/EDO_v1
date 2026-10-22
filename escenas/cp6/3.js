// CP6 ej. 3–4: cosecha. Diagrama en el plano (C, P): P± = N/2 (1 ± √(1 − 4C/(kN))), con k = 1, N = 4. El ej. 4
// recorre el ciclo de histéresis: subir C apenas por encima de kN/4 hunde la población; bajar C apenas por debajo no
// basta, porque P está por debajo de la rama inestable.
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, curva, punto } from '../primitivas.js';
import { formula } from '../piezas.js';

const R = String.raw;
const P = plano({ x: 70, y: 40, w: 620, h: 360 }, { t: [0, 1.4], y: [-0.3, 4.3] });
const ramas = () => { const cs = [], a = [], b = []; for (let i = 0; i <= 300; i++) { const C = (1 * i) / 300; cs.push(C); const r = Math.sqrt(1 - C); a.push(2 * (1 + r)); b.push(2 * (1 - r)); } return { cs, a, b }; };

export function cosecha(conCiclo) {
  return definirEscena({
    alto: 450, preparar: () => ({ r: ramas() }), vivo: conCiclo ? [2] : [],
    duracion: [2200, 2400, 3200],
    leyenda: { verde: 'P₊ (estable)', ambar: 'P₋ (inestable)', ciruela: 'C = kN/4', cian: conCiclo ? 'la población' : 'destino' },
    capas: [
      (g, c, o) => {
        ejes(g, P, { t: 'C', y: 'P', marcasT: [0, 0.5, 1] });
        curva(g, P, c.r.cs, c.r.a, { color: 'verde', p: o.p, ancho: 3 }); curva(g, P, c.r.cs, c.r.b, { color: 'ambar', p: o.p, ancho: 3, guion: [7, 5] });
        g.linea([[P.X(1), P.caja.y], [P.X(1), P.caja.y + P.caja.h]], { color: 'ciruela', ancho: 1.4, guion: [4, 4], alfa: ease(o.p) });
        g.tex('kn', P.X(1) + 6, P.Y(4.1), R`C = \tfrac{kN}{4}`, { color: 'ciruela', tam: 14, ancla: 'l', alfa: ease(o.p), fondo: true });
        formula(g, 'bf', 380, 22, R`f_C' = k - \tfrac{2k}{N}P = 0 \Rightarrow P = \tfrac N2;\ \ f_C\!\left(\tfrac N2\right) = \tfrac{kN}{4} - C = 0`, { p: o.p, tam: 14 });
      },
      (g, c, o) => {
        // flechas verticales: arriba de P₋ sube a P₊; debajo, baja a 0; a la derecha de kN/4, todo baja
        [0.3, 0.7, 1.2].forEach((C, i) => {
          const r = C < 1 ? Math.sqrt(1 - C) : null, a = ease(tramo(o.p, 0.2 * i, 0.5 + 0.2 * i));
          if (r != null) { g.flecha(P.X(C), P.Y(3.9), P.X(C), P.Y(2 * (1 + r)) - 8, { color: 'texto', alfa: a, ancho: 2 }); g.flecha(P.X(C), P.Y(2 * (1 - r)) - 8, P.X(C), P.Y(2 * (1 + r)) + 8, { color: 'texto', alfa: a, ancho: 2 }); g.flecha(P.X(C), P.Y(2 * (1 - r)) + 8, P.X(C), P.Y(-0.2), { color: 'rojo', alfa: a, ancho: 2 }); }
          else g.flecha(P.X(C), P.Y(4), P.X(C), P.Y(-0.2), { color: 'rojo', alfa: a, ancho: 2 });
        });
        g.tex('ex', P.X(1.2), P.Y(2), R`\text{extinción}`, { color: 'rojo', tam: 14, alfa: ease(o.p), fondo: true });
      },
      (g, c, o) => {
        if (!conCiclo) { g.tex('ant', 380, 436, R`\text{antes: } P(0) > P_- \to P_+;\ P(0) < P_- \to \text{extinción}.\quad \text{después: siempre extinción}`, { color: 'texto', tam: 13, alfa: ease(o.p), fondo: true }); return; }
        // el ciclo: C sube a 1.05, la población cae a ~0; C baja a 0.95: sigue cayendo; solo con C ≈ 0 se recupera
        const s = (o.tiempo / 1000 / 12) % 1;
        let C, Pv;
        if (s < 0.25) { C = mezclar(0.6, 1.05, s / 0.25); Pv = 2 * (1 + Math.sqrt(Math.max(0, 1 - C))); }
        else if (s < 0.45) { C = 1.05; Pv = mezclar(2, 0.05, (s - 0.25) / 0.2); }
        else if (s < 0.6) { C = mezclar(1.05, 0.95, (s - 0.45) / 0.15); Pv = 0.05; }
        else if (s < 0.75) { C = mezclar(0.95, 0, (s - 0.6) / 0.15); Pv = 0.05; }
        else { C = 0; Pv = mezclar(0.05, 4, (s - 0.75) / 0.25); }
        punto(g, P.X(C), P.Y(Pv), { color: 'cian', r: 7, halo: true });
        g.tex('ci', 380, 436, R`C \text{ apenas bajo } \tfrac{kN}{4} \text{ no basta: } P \approx 0 < P_- \approx \tfrac N2 \text{; hace falta } C \approx 0 \text{ (veto)}`, { color: 'cian', tam: 13, fondo: true });
      },
    ],
  });
}
export default cosecha(false);
