// Tests en navegador real (Chromium headless). Uso: tests/navegador.sh [filtro]
const { chromium } = require('playwright-core');
const { spawn } = require('node:child_process');
const path = require('node:path');

const RAIZ = path.resolve(__dirname, '..'), PUERTO = 8789, BASE = `http://127.0.0.1:${PUERTO}/`;
const FILTRO = process.argv[2] || '';
let ok = 0, mal = 0;
const pruebas = [];
const t = (nombre, fn) => pruebas.push({ nombre, fn });
const afirmar = (c, m) => { if (!c) throw new Error(m); };

const abrir = async (pg, ruta) => {
  const errores = [];
  pg.removeAllListeners('console'); pg.removeAllListeners('pageerror');
  pg.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });
  pg.on('pageerror', (e) => errores.push(e.message));
  await pg.goto(BASE + ruta, { waitUntil: 'load' });
  await pg.evaluate(() => document.fonts.ready);
  return errores;
};

// ---------------------------------------------------------------- motor

t('estudio: recorre los pasos sin errores y la tira muestra una miniatura por paso', async (b, pg) => {
  const errores = await abrir(pg, 'tests/paginas/demo.html');
  for (let i = 0; i < 3; i++) await pg.click('[data-a=adelante]');
  await pg.click('[data-a=atras]');
  await pg.click('[data-a=tira]');
  afirmar(await pg.locator('.tira .miniatura').count() === 3, 'la tira no tiene 3 miniaturas');
  afirmar(!errores.length, errores.join('\n'));
});

t('estudio: arrastrar la condición inicial cambia y0 y el deslizador', async (b, pg) => {
  const errores = await abrir(pg, 'tests/paginas/demo.html');
  await pg.click('[data-a=adelante]');
  await pg.waitForTimeout(300);
  const caja = await pg.locator('.lienzo canvas').boundingBox();
  const esc = caja.width / 760;
  // el asa está en (X(0), Y(0.2)) del plano de la demo: X(0) = 120 + 150 = 270, Y(0.2) = 30 + 1.8·120 = 246
  await pg.mouse.move(caja.x + 270 * esc, caja.y + 246 * esc);
  await pg.mouse.down();
  await pg.mouse.move(caja.x + 270 * esc, caja.y + 90 * esc, { steps: 6 });
  await pg.mouse.up();
  const y0 = await pg.evaluate(() => window.est.estado().e.y0);
  afirmar(Math.abs(y0 - 1.5) < 0.03, `y0 = ${y0}, se esperaba ≈ 1.5`);
  const des = await pg.inputValue('[data-id=y0] input');
  afirmar(Math.abs(Number(des) - y0) < 1e-9, `deslizador ${des} ≠ ${y0}`);
  afirmar(!errores.length, errores.join('\n'));
});

t('estudio: una f inválida avisa y no rompe la escena; una válida la cambia', async (b, pg) => {
  const errores = await abrir(pg, 'tests/paginas/demo.html');
  await pg.click('[data-a=adelante]');
  await pg.fill('[data-id=f] input', '1/(y-');
  afirmar(await pg.isVisible('.aviso'), 'no aparece el aviso');
  await pg.fill('[data-id=f] input', '1/(y-2)');
  afirmar(!(await pg.isVisible('.aviso')), 'el aviso sigue');
  await pg.click('[data-a=adelante]');
  await pg.waitForTimeout(400);
  afirmar(!errores.length, errores.join('\n'));
});

t('estudio: cambiar una entrada a mitad del movimiento deja el paso en reposo', async (b, pg) => {
  const errores = await abrir(pg, 'tests/paginas/demo.html');
  await pg.click('[data-a=adelante]');
  await pg.waitForTimeout(100);
  await pg.fill('[data-id=f] input', 'y-t');
  const p = await pg.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(document.querySelectorAll('.capa-rotulos .rotulo-tex').length))));
  afirmar(p > 0, 'sin rótulos tras el cambio');
  afirmar(!errores.length, errores.join('\n'));
});

// ---------------------------------------------------------------- recorrido de todo el contenido
// (lo añade el resto de tareas: todas las páginas de tema, ejercicio y valiente)
try { require('./navegador-contenido.cjs')({ t, abrir, afirmar }); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }

// ---------------------------------------------------------------- arranque
(async () => {
  const srv = spawn('python3', ['-m', 'http.server', String(PUERTO), '--bind', '127.0.0.1'], { cwd: RAIZ, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 700));
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM });
  const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
  try {
    for (const p of pruebas.filter((x) => x.nombre.includes(FILTRO))) {
      try { await p.fn(b, pg); ok++; console.log(`✔ ${p.nombre}`); }
      catch (e) { mal++; console.log(`✖ ${p.nombre}\n   ${e.message.split('\n').join('\n   ')}`); }
    }
  } finally { await b.close(); srv.kill(); }
  console.log(`\n${ok} bien, ${mal} mal`);
  process.exit(mal ? 1 : 0);
})();
