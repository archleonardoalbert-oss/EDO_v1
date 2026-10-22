// Renderiza cada paso de una página (tema, valiente o ejercicio) en reposo y los junta en una hoja de contactos.
// Uso: herramientas/pasos.sh '<ruta>' salida.png [selector-escena]   (nunca captura la pantalla del usuario)
const { chromium } = require('playwright-core');
const { spawn, execFileSync } = require('node:child_process');
const path = require('node:path'), fs = require('node:fs'), os = require('node:os');
const [ruta, salida, sel = '.columna-escena'] = process.argv.slice(2);
const RAIZ = path.resolve(__dirname, '..'), PUERTO = 8797;
(async () => {
  const srv = spawn('python3', ['-m', 'http.server', String(PUERTO), '--bind', '127.0.0.1'], { cwd: RAIZ, stdio: 'ignore' });
  await new Promise((r) => setTimeout(r, 600));
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM });
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pasos-'));
  try {
    const pg = await b.newPage({ viewport: { width: Number(process.env.ANCHO || 1280), height: 1000 }, deviceScaleFactor: 1 });
    pg.on('pageerror', (e) => console.log('error:', e.message));
    pg.on('console', (m) => { if (m.type() === 'error') console.log('consola:', m.text()); });
    await pg.goto(`http://127.0.0.1:${PUERTO}/${ruta}`, { waitUntil: 'networkidle' });
    await pg.waitForTimeout(400);
    const N = await pg.evaluate(() => Number(document.querySelector('.cuenta').textContent.split('/')[1]));
    const archivos = [];
    for (let i = 0; i < N; i++) {
      await pg.evaluate((i) => window.estudio.ir(i, { animar: false }), i);
      await pg.waitForTimeout(Number(process.env.ESPERA || 350));
      const f = path.join(dir, `p${String(i).padStart(2, '0')}.png`);
      await pg.locator(sel).first().screenshot({ path: f });
      archivos.push(f);
    }
    execFileSync('montage', [...archivos, '-tile', `${process.env.COLS || 2}x`, '-geometry', '+4+4', '-background', '#222', salida]);
    console.log(`${N} pasos → ${salida}`);
  } finally { await b.close(); srv.kill(); }
})();
