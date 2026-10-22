// Logístico con cosecha: f_C(P) = kP(1 − P/N) − C es la parábola bajando con C. Al pasar C = kN/4 los dos
// equilibrios se funden y desaparecen: las poblaciones se extinguen. (k = 1, N = 4: umbral C = 1.)
import { definirEscena } from '../comun.js';
import { plano, ease, tramo, mezclar } from '../../motor/plano.js';
import { ejes, grafica, lineaFase, equilibrios, solucion, rectaEquilibrio } from '../primitivas.js';
import { panel, formula } from '../piezas.js';

const R = String.raw;
const A = plano({ x: 45, y: 60, w: 300, h: 240 }, { t: [-0.5, 5], y: [-2, 1.5] });
const B = plano({ x: 430, y: 60, w: 300, h: 330 }, { t: [0, 8], y: [-0.5, 5] });
const fC = (C) => (P) => P * (1 - P / 4) - C;

export default definirEscena({
  alto: 450,
  entradas: [{ id: 'C', tipo: 'deslizador', etiqueta: 'C', valor: 0.4, min: 0, max: 1.4, paso: 0.01 }],
  preparar: (e) => ({ e }),
  vivo: [1, 4],
  duracion: [1800, 1800, 1500, 1800, 2000],
  leyenda: { texto: 'f_C(P)', ciruela: 'cosecha C', verde: 'sumidero', ambar: 'fuente', cian: 'poblaciones' },
  dibujar(g, c, { paso, p, tiempo }) {
    const q = (i) => (paso > i ? 1 : paso === i ? p : 0);
    const C = paso === 1 || paso === 4 ? mezclar(0.2, 1.3, (1 - Math.cos(tiempo / 1600)) / 2) : c.e.C;
    const f = fC(C), eqs = equilibrios(f, -0.5, 5);
    panel(g, { x: 20, y: 25, w: 350, h: 400 }, R`f_C(P) = P\left(1 - \tfrac{P}{4}\right) - C`, { clave: 'pa' });
    ejes(g, A, { t: 'P', y: '', numeros: false, clave: 'ea' });
    grafica(g, A, f, { color: 'texto', brillo: 3, p: q(0) });
    g.flecha(A.X(4.6), A.Y(0), A.X(4.6), A.Y(-C), { color: 'ciruela', ancho: 2.4, alfa: ease(q(0)) });
    g.tex('C', A.X(4.65), A.Y(-C / 2), R`C = ${C.toFixed(2)}`, { color: 'ciruela', tam: 14, ancla: 'l', fondo: true });
    lineaFase(g, { f, eqs, coord: A.X, desde: A.X(-0.5), hasta: A.X(5), otra: 370, rango: [-0.5, 5], orientacion: 'horizontal', p: q(0), particulas: false, rotular: false, clave: 'lf' });
    panel(g, { x: 405, y: 25, w: 350, h: 400 }, R`P(t)`, { clave: 'pb' });
    ejes(g, B, { numeros: false, y: '', clave: 'eb' });
    eqs.forEach((e) => rectaEquilibrio(g, B, e.y, { tipo: e.tipo }));
    [0.6, 1.5, 2.5, 3.5, 4.6].forEach((P0) => solucion(g, B, (t, P) => f(P), 0, P0, { sentido: 'adelante', punto: false, ancho: 1.8 }));
    const texto = [R`\text{¿cómo cambia el comportamiento al variar un parámetro?}`, R`\text{a veces un cambio pequeño cambia el destino}`, R`\text{los parámetros varían: naturaleza o decisión humana}`, R`\dfrac{dP}{dt} = kP\left(1 - \tfrac{P}{N}\right) - C`, eqs.length ? R`C = ${C.toFixed(2)} < \tfrac{kN}{4} = 1:\ \text{sobrevive}` : R`C = ${C.toFixed(2)} > \tfrac{kN}{4} = 1:\ \textbf{extinción}`][paso];
    g.tex('tx', 380, 440, texto, { color: paso === 4 && !eqs.length ? 'rojo' : 'texto', tam: 14, fondo: true });
  },
  pasos: 5,
});
