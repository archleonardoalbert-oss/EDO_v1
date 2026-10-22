import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compilar } from '../motor/expresion.js';

const cerca = (a, b) => assert.ok(Math.abs(a - b) < 1e-12, `${a} ≠ ${b}`);

test('y - t evalúa como f(t, y)', () => cerca(compilar('y-t').f(1, 3), 2));
test('multiplicación implícita: 4y(1-y)', () => cerca(compilar('4y(1-y)').f(0, 0.5), 1));
test('potencias asociativas a la derecha y unario: -y^2 = −(y²)', () => {
  cerca(compilar('-y^2').f(0, 3), -9);
  cerca(compilar('2^3^2').f(0, 0), 512);
});
test('funciones y constantes: e^(y^2/10)*sin(y)^2', () => {
  const y = 1.3;
  cerca(compilar('e^(y^2/10)*sin(y)^2').f(0, y), Math.exp(y * y / 10) * Math.sin(y) ** 2);
});
test('pi, sqrt, ln, abs, arctan, cos', () => {
  cerca(compilar('sqrt(abs(y))+ln(e)+arctan(1)*4/pi+cos(0)').f(0, -4), 2 + 1 + 1 + 1);
});
test('variables propias: P y parámetros', () => {
  const c = compilar('k*P*(1-P/N)', ['t', 'P'], ['k', 'N']);
  cerca(c.f(0, 50, 0.5, 100), 12.5);
});
test('y^(2/3) con base negativa usa la raíz real (3y^{2/3} de la Conf 4)', () => {
  cerca(compilar('3y^(2/3)').f(0, -8), 12);
});
test('errores: incompleta, desconocida, código', () => {
  assert.ok(compilar('y +').error);
  assert.ok(compilar('alert(1)').error);
  assert.ok(compilar('x + 1').error);
  assert.ok(compilar('').error);
  assert.ok(compilar('(y').error);
});
test('latex: producto de paréntesis y fracción', () => {
  assert.equal(compilar('(y+3)(y-2)').latex, '(y+3)(y-2)');
  assert.match(compilar('1/(y-2)').latex, /\\frac\{1\}\{y-2\}/);
  assert.match(compilar('e^(y^2/10)*sin(y)^2').latex, /e\^\{\\frac\{y\^\{2\}\}\{10\}\}/);
  assert.doesNotMatch(compilar('2*y*t').latex, /\*/);
});
