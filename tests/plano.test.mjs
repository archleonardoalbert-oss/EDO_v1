import { test } from 'node:test';
import assert from 'node:assert/strict';
import { plano, ease, tramo, solucionCache, marcasCampo } from '../motor/plano.js';

const cerca = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} ≠ ${b}`);

test('plano: ida y vuelta mundo ↔ pantalla, y crece hacia arriba', () => {
  const P = plano({ x: 40, y: 20, w: 400, h: 200 }, { t: [-2, 2], y: [-1, 3] });
  cerca(P.X(-2), 40); cerca(P.X(2), 440);
  cerca(P.Y(3), 20); cerca(P.Y(-1), 220);
  cerca(P.T(P.X(0.7)), 0.7); cerca(P.V(P.Y(1.3)), 1.3);
  assert.ok(P.dentro(0, 0) && !P.dentro(3, 0));
});

test('ease: 0 → 0, 1 → 1, simétrica y suave', () => {
  cerca(ease(0), 0); cerca(ease(1), 1); cerca(ease(0.5), 0.5);
  cerca(ease(0.25) + ease(0.75), 1);
});

test('tramo: sub-progreso recortado a [0, 1]', () => {
  cerca(tramo(0.1, 0.2, 0.6), 0); cerca(tramo(0.4, 0.2, 0.6), 0.5); cerca(tramo(0.9, 0.2, 0.6), 1);
});

test('solucionCache: integra a ambos lados de (t0, y0) dentro de la vista y reutiliza el resultado', () => {
  const P = plano({ x: 0, y: 0, w: 100, h: 100 }, { t: [-1, 1], y: [-10, 10] });
  const f = (t, y) => y;
  const a = solucionCache(f, 0, 1, P), b = solucionCache(f, 0, 1, P);
  assert.equal(a, b);
  cerca(a.adelante.y.at(-1), Math.E, 1e-6);
  cerca(a.atras.y.at(-1), 1 / Math.E, 1e-6);
});

test('marcasCampo: la marca de y − t en (−1, 1) tiene pendiente 2 (Conf 3)', () => {
  const P = plano({ x: 0, y: 0, w: 200, h: 200 }, { t: [-2, 2], y: [-2, 2] });
  const m = marcasCampo((t, y) => y - t, P, { nt: 5, ny: 5 });
  const k = m.find((q) => Math.abs(q.t + 1) < 1e-9 && Math.abs(q.y - 1) < 1e-9);
  cerca(k.pendiente, 2);
  // en pantalla, misma escala en ambos ejes: el ángulo es atan(2) (y hacia arriba = −pantalla)
  cerca(k.angulo, -Math.atan(2));
});
