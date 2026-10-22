import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rk4, euler, raices, deriv, rk4Sistema, clasificar } from '../motor/numerico.js';

const cerca = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) < tol, `${a} ≠ ${b}`);

test('rk4 resuelve dy/dt = 2y − 1, y(0) = 1 y da (e² + 1)/2 en t = 1', () => {
  const r = rk4((t, y) => 2 * y - 1, 0, 1, 1);
  cerca(r.t.at(-1), 1);
  cerca(r.y.at(-1), (Math.exp(2) + 1) / 2);
  assert.equal(r.corte, null);
});

test('rk4 integra hacia atrás si t1 < t0', () => {
  const r = rk4((t, y) => y, 0, 1, -1);
  cerca(r.y.at(-1), Math.exp(-1));
});

test('rk4 se detiene en la explosión de tan t (antes de π/2 + 0.01)', () => {
  const r = rk4((t, y) => 1 + y * y, 0, 0, 2);
  assert.equal(r.corte, 'explota');
  assert.ok(r.t.at(-1) < Math.PI / 2 + 0.01 && r.t.at(-1) > 1.4);
});

test('rk4 corta en la singularidad de 1/(y − 2) (hacia atrás, t → −1/2) sin NaN ni saltar al otro lado', () => {
  const r = rk4((t, y) => 1 / (y - 2), 0, 1, -5);
  assert.ok(r.y.every(Number.isFinite));
  assert.ok(r.corte);
  assert.ok(r.y.every((y) => y < 2));
  assert.ok(r.t.at(-1) > -0.51);
});

test('euler con Δt = 0.1 reproduce la Conf 4: 1.1, 1.22, 1.364', () => {
  const r = euler((t, y) => 2 * y - 1, 0, 1, 0.1, 3);
  cerca(r.y[1], 1.1, 1e-12); cerca(r.y[2], 1.22, 1e-12); cerca(r.y[3], 1.364, 1e-12);
  cerca(r.t[3], 0.3, 1e-12);
});

test('raices encuentra −3 y 2 en (y + 3)(y − 2)', () => {
  const r = raices((y) => (y + 3) * (y - 2), -10, 10);
  assert.equal(r.length, 2); cerca(r[0], -3); cerca(r[1], 2);
});

test('raices encuentra la raíz doble de (y − 1)²', () => {
  const r = raices((y) => (y - 1) ** 2, -5, 5);
  assert.equal(r.length, 1); cerca(r[0], 1, 1e-4);
});

test('raices de sin y en [−7, 7] son −2π, −π, 0, π, 2π', () => {
  const r = raices(Math.sin, -7, 7);
  assert.deepEqual(r.map((x) => Math.round(x / Math.PI)), [-2, -1, 0, 1, 2]);
});

test('raices no confunde un polo con una raíz: 1/(y − 2) no tiene', () => {
  assert.deepEqual(raices((y) => 1 / (y - 2), -10, 10), []);
});

test('deriv aproxima la derivada', () => cerca(deriv((y) => y ** 3, 2), 12, 1e-4));

test('clasificar: (y+3)(y−2) → −3 sumidero, 2 fuente; y³ → fuente; (1+y)² → nodo', () => {
  const f = (y) => (y + 3) * (y - 2);
  assert.equal(clasificar(f, -3), 'sumidero');
  assert.equal(clasificar(f, 2), 'fuente');
  assert.equal(clasificar((y) => y ** 3, 0), 'fuente');
  assert.equal(clasificar((y) => (1 + y) ** 2, -1), 'nodo');
  assert.equal(clasificar((y) => -(y ** 3), 0), 'sumidero');
});

test('logística con k = 1, N = 1 y P(0) = 0.1 tiende a 1', () => {
  const r = rk4((t, P) => P * (1 - P), 0, 0.1, 20);
  cerca(r.y.at(-1), 1, 1e-6);
});

test('rk4Sistema: presa-depredador conserva su cantidad (órbita cerrada)', () => {
  const [a, b, g, d] = [1, 0.5, 0.75, 0.25];
  const F = (t, [R, Z]) => [a * R - b * R * Z, -g * Z + d * R * Z];
  const V = ([R, Z]) => d * R - g * Math.log(R) + b * Z - a * Math.log(Z);
  const r = rk4Sistema(F, 0, [4, 1], 20);
  cerca(V(r.Y.at(-1)), V([4, 1]), 1e-5);
});
