// Pruebas de todo el contenido: estructura, cobertura de diapositivas, notación, KaTeX y que cada escena se pinte
// en todos sus pasos (con un pincel simulado) sin errores.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import { catalogo } from '../libros/catalogo.js';
import { MACROS } from '../motor/macros.js';

// KaTeX es UMD: se evalúa en un contexto con `module` para recuperar su export
const katex = (() => { const m = { exports: {} }; vm.runInNewContext(readFileSync(new URL('../vendor/katex/katex.min.js', import.meta.url), 'utf8'), { module: m, exports: m.exports }); return m.exports.default ?? m.exports; })();
const PAGINAS = JSON.parse(readFileSync(new URL('../fuentes/paginas.json', import.meta.url)));
const disponibles = catalogo.filter((l) => l.disponible);
const libros = await Promise.all(disponibles.map(async (l) => ({
  cat: l,
  libro: (await import(`../libros/${l.numero}/contenido.js`)).default,
  practica: l.practica ? (await import(`../libros/${l.numero}/practica.js`)).default : null,
  valientes: l.valientes ? (await import(`../libros/${l.numero}/valientes.js`)).default : [],
})));

/** Fórmulas $…$ y $$…$$ de un texto HTML. */
const formulas = (txt) => [...String(txt).matchAll(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g)].map((m) => m[1] ?? m[2]);
const renderiza = (f, donde) => {
  try { katex.renderToString(f, { throwOnError: true, macros: { ...MACROS }, trust: true, strict: 'ignore' }); }
  catch (e) { assert.fail(`${donde}: KaTeX no puede con «${f}»: ${e.message}`); }
};
const revisarTexto = (txt, donde) => formulas(txt).forEach((f) => {
  renderiza(f, donde);
  assert.ok(!/(?<!\\)\*|∗/.test(f), `${donde}: «*» en una fórmula: ${f}`);
  // «/» solo se admite dentro de un exponente (y^{2/3}, e^{y^2/10}: notación estándar y de la conferencia)
  const sinExp = f.replace(/\\text\{[^}]*\}/g, '').replace(/\^\{(?:[^{}]|\{[^{}]*\})*\}/g, '');
  assert.ok(!/(?<![<\\a-z])\/(?!>)/.test(sinExp), `${donde}: «/» en una fórmula (usa \\frac): ${f}`);
});

/** Pincel simulado: acepta cualquier llamada y comprueba que los números no sean NaN. */
function pincelFalso() {
  const ctx = new Proxy({}, { get: (o, k) => (k in o ? o[k] : () => ({ addColorStop() {} })), set: (o, k, v) => { o[k] = v; return true; } });
  const g = { ctx };
  for (const k of ['linea', 'circulo', 'rect', 'flecha', 'texto', 'tex']) g[k] = (...a) => {
    for (const x of a) if (typeof x === 'number') assert.ok(!Number.isNaN(x), `NaN pasado a ${k}`);
  };
  g.recortar = (caja, fn) => fn();
  return g;
}
const valoresIniciales = async (defs) => (await import('../motor/entradas.js')).valoresIniciales(defs);

for (const { cat, libro, practica, valientes } of libros) {
  test(`Libro ${libro.romano}: estructura y textos de cada tema`, () => {
    const ids = new Set();
    assert.ok(libro.temas.length > 0);
    for (const t of libro.temas) {
      assert.ok(!ids.has(t.id), `id repetido ${t.id}`); ids.add(t.id);
      assert.ok(t.nombre && t.explicacion && t.pasos?.length, `${t.id}: falta nombre, explicación o pasos`);
      assert.ok(t.claves?.length >= 2, `${t.id}: menos de 2 claves`);
      [t.nombre, t.explicacion, t.recuadro?.texto, ...t.pasos.map((p) => p.texto), ...t.claves.flatMap((c) => [c.idea, c.texto])].forEach((x) => x && revisarTexto(x, `${libro.romano}/${t.id}`));
      if (t.valiente) assert.ok(valientes.some((v) => v.id === t.valiente), `${t.id}: valiente ${t.valiente} no existe`);
    }
  });

  test(`Libro ${libro.romano}: todas las diapositivas de la conferencia están cubiertas`, () => {
    const cubiertas = new Set(libro.temas.flatMap((t) => t.diapositivas ?? []));
    const total = PAGINAS[libro.numero], resumen = total;  // la última es el resumen (va al índice del libro)
    const faltan = [];
    for (let p = 2; p < resumen; p++) if (!cubiertas.has(p)) faltan.push(p);
    assert.deepEqual(faltan, [], `diapositivas sin tema: ${faltan.join(', ')}`);
    assert.ok(libro.resumen?.bloques?.length, 'falta el resumen de la clase');
    libro.resumen.bloques.flatMap((b) => b.items).forEach((x) => revisarTexto(x, `${libro.romano}/resumen`));
  });

  test(`Libro ${libro.romano}: cada escena tiene tantos pasos como su tema y se pinta en todos ellos`, async () => {
    for (const t of libro.temas) {
      assert.ok(existsSync(new URL(`../escenas/${t.escena}.js`, import.meta.url)), `${t.id}: no existe la escena ${t.escena}`);
      const esc = (await import(`../escenas/${t.escena}.js`)).default;
      assert.equal(esc.pasos, t.pasos.length, `${t.id}: la escena tiene ${esc.pasos} pasos y el tema ${t.pasos.length}`);
      const ctx = esc.preparar(await valoresIniciales(esc.entradas));
      for (let paso = 0; paso < esc.pasos; paso++) for (const p of [0, 0.37, 1]) esc.pintar(pincelFalso(), ctx, { paso, p, tiempo: 1234 });
    }
  });

  if (valientes.length) test(`Libro ${libro.romano}: demostraciones para valientes`, async () => {
    for (const v of valientes) {
      assert.ok(libro.temas.some((t) => t.id === v.tema), `${v.id}: tema ${v.tema} no existe`);
      assert.ok(v.asume?.length && v.cuerpo?.length && v.claves?.length >= 2 && v.cartelas?.length === 3, `${v.id}: incompleta`);
      [v.nombre, v.enunciado, ...v.asume, ...v.cartelas, ...v.cuerpo.flatMap((b) => [b.titulo, b.enunciado, b.texto, ...(b.pasos ?? []).flatMap((p) => [p.texto, p.porque])])].forEach((x) => x && revisarTexto(x, v.id));
      const esc = (await import(`../escenas/${v.escena}.js`)).default;
      assert.equal(esc.pasos, v.escenaPasos.length, `${v.id}: pasos de la escena`);
      const ctx = esc.preparar(await valoresIniciales(esc.entradas));
      for (let paso = 0; paso < esc.pasos; paso++) for (const p of [0, 0.5, 1]) esc.pintar(pincelFalso(), ctx, { paso, p, tiempo: 999 });
    }
  });

  if (practica) test(`Libro ${libro.romano}: clase práctica (reglas de las pistas, soluciones y notación)`, async () => {
    for (const x of practica.ejercicios) {
      revisarTexto(x.enunciado, x.id); revisarTexto(x.nombre, x.id);
      for (const parte of x.partes) {
        const donde = `${x.id}/${parte.id}`;
        assert.equal(parte.pistas[0].tipo, 'concepto', `${donde}: la primera pista debe ser el tema de la conferencia`);
        assert.ok(parte.pistas[0].enlaces?.length, `${donde}: la pista-concepto debe enlazar al tema`);
        for (const e of parte.pistas[0].enlaces) {
          const l = libros.find((b) => b.libro.numero === e.l);
          assert.ok(l?.libro.temas.some((t) => t.id === e.t), `${donde}: enlace a ${e.l}/${e.t} inexistente`);
        }
        assert.ok(parte.pistas.length >= 3, `${donde}: menos de 3 pistas`);
        assert.ok(parte.solucion.pasos.length >= 2, `${donde}: solución demasiado corta`);
        assert.ok(parte.aprendes.resultado && parte.aprendes.ideas.length >= 2, `${donde}: «qué te llevas» incompleto`);
        [parte.enunciado, ...parte.pistas.map((p) => p.texto), ...parte.solucion.pasos.map((p) => p.texto), parte.aprendes.resultado, ...parte.aprendes.ideas.flatMap((i) => [i.idea, i.texto])].forEach((t) => t && revisarTexto(t, donde));
        if (parte.solucion.escena) {
          const esc = (await import(`../escenas/${parte.solucion.escena}.js`)).default;
          assert.equal(esc.pasos, parte.solucion.pasos.length, `${donde}: la escena tiene ${esc.pasos} pasos y la solución ${parte.solucion.pasos.length}`);
          const ctx = esc.preparar(await valoresIniciales(esc.entradas));
          for (let paso = 0; paso < esc.pasos; paso++) esc.pintar(pincelFalso(), ctx, { paso, p: 1, tiempo: 500 });
        }
      }
    }
  });
}

test('cuentas de la CP3: velocidad terminal y signos de los esbozos', async () => {
  const { raices, clasificar } = await import('../motor/numerico.js');
  const h = (v) => 9.8 - 0.5 * v;
  assert.ok(Math.abs(raices(h, -5, 40)[0] - 19.6) < 1e-6);
  assert.equal(clasificar(h, 19.6), 'sumidero');
  const S = (s) => s ** 3 - 2 * s * s + s;
  assert.deepEqual(raices(S, -1, 2).map((x) => Math.round(x * 1e4) / 1e4), [0, 1]);
  assert.equal(clasificar(S, 0), 'fuente'); assert.equal(clasificar(S, 1), 'nodo');
  const q = (y) => y * y - y ** 4;
  assert.deepEqual([-1, 0, 1].map((y) => clasificar(q, y)), ['fuente', 'nodo', 'sumidero']);
  const c = (y) => y - y ** 3;
  assert.deepEqual([-1, 0, 1].map((y) => clasificar(c, y)), ['sumidero', 'fuente', 'sumidero']);
});
