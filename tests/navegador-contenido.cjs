// Recorrido de todo el contenido en el navegador: portada, índices, cada paso de cada tema, ejercicios (pistas y
// solución), demostraciones para valientes y la entrada épica (se salta con Esc sin dejar nada encima).
module.exports = ({ t, abrir, afirmar }) => {
  const libros = async (pg) => pg.evaluate(async () => {
    const { catalogo } = await import('/libros/catalogo.js');
    const out = [];
    for (const l of catalogo.filter((x) => x.disponible)) {
      const c = (await import(`/libros/${l.numero}/contenido.js`)).default;
      const p = l.practica ? (await import(`/libros/${l.numero}/practica.js`)).default : null;
      const v = l.valientes ? (await import(`/libros/${l.numero}/valientes.js`)).default : [];
      out.push({ n: l.numero, temas: c.temas.map((x) => ({ id: x.id, pasos: x.pasos.length })), ejercicios: p ? p.ejercicios.map((x) => ({ id: x.id, partes: x.partes.map((q) => q.id) })) : [], valientes: v.map((x) => x.id) });
    }
    return out;
  });

  t('portada e índices de libro sin errores', async (b, pg) => {
    const errores = await abrir(pg, 'index.html');
    const ls = await libros(pg);
    for (const l of ls) await abrir(pg, `libro.html?l=${l.n}`).then((e) => errores.push(...e));
    afirmar(!errores.length, errores.join('\n'));
  });

  t('cada tema: todos los pasos, ida y vuelta, sin errores ni KaTeX roto', async (b, pg) => {
    await abrir(pg, 'index.html');
    const ls = await libros(pg), mal = [];
    for (const l of ls) for (const tm of l.temas) {
      const errores = await abrir(pg, `tema.html?l=${l.n}&t=${tm.id}`);
      const cuenta = await pg.textContent('.cuenta');
      if (cuenta !== `1/${tm.pasos}`) mal.push(`${l.n}/${tm.id}: cuenta ${cuenta}`);
      for (let i = 1; i < tm.pasos; i++) await pg.click('[data-a=adelante]');
      await pg.waitForTimeout(150);
      await pg.click('[data-a=inicio]');
      const rotos = await pg.locator('.katex-error').count();
      if (rotos) mal.push(`${l.n}/${tm.id}: ${rotos} fórmulas rotas`);
      if (errores.length) mal.push(`${l.n}/${tm.id}: ${errores.join(' | ')}`);
    }
    afirmar(!mal.length, mal.join('\n'));
  });

  t('cada ejercicio: pistas una a una y solución completa sin errores', async (b, pg) => {
    await abrir(pg, 'index.html');
    const ls = await libros(pg), mal = [];
    for (const l of ls) for (const x of l.ejercicios) {
      const errores = await abrir(pg, `ejercicio.html?l=${l.n}&x=${x.id}`);
      await pg.evaluate(() => localStorage.clear());
      for (const p of x.partes) {
        const sel = `.parte[data-p="${p}"]`;
        const antes = await pg.locator(`${sel} .pista:not([hidden])`).count();
        await pg.click(`${sel} [data-a=pista]`);
        const despues = await pg.locator(`${sel} .pista:not([hidden])`).count();
        if (despues !== antes + 1) mal.push(`${x.id}/${p}: la pista no se abrió de una en una`);
        await pg.click(`${sel} [data-a=solucion]`);
        await pg.waitForTimeout(100);
        const todos = pg.locator(`${sel} [data-a=todos]`);
        if (await todos.count() && await todos.isVisible()) await todos.click();
        else for (let i = 0; i < 12; i++) { const a = pg.locator(`${sel} [data-a=adelante]`); if (!(await a.count())) break; await a.click(); }
      }
      const rotos = await pg.locator('.katex-error').count();
      if (rotos) mal.push(`${x.id}: ${rotos} fórmulas rotas`);
      if (errores.length) mal.push(`${x.id}: ${errores.join(' | ')}`);
    }
    afirmar(!mal.length, mal.join('\n'));
  });

  t('cada demostración para valientes abre directa sin errores', async (b, pg) => {
    await abrir(pg, 'index.html');
    const ls = await libros(pg), mal = [];
    for (const l of ls) for (const d of l.valientes) {
      const errores = await abrir(pg, `valiente.html?l=${l.n}&d=${d}`);
      const rotos = await pg.locator('.katex-error').count();
      if (rotos || errores.length) mal.push(`${d}: ${rotos} rotas; ${errores.join(' | ')}`);
    }
    afirmar(!mal.length, mal.join('\n'));
  });

  t('la entrada épica se reproduce, Esc la salta y abre la demostración sin capa negra encima', async (b, pg) => {
    const errores = await abrir(pg, 'tema.html?l=1&t=influencia');
    await pg.click('.boton-valiente');
    await pg.waitForTimeout(1500);
    afirmar(await pg.locator('.cine').count() === 1, 'no apareció la cinemática');
    await pg.keyboard.press('Escape');
    await pg.waitForURL(/valiente\.html/, { timeout: 4000 });
    await pg.waitForTimeout(1800);
    afirmar(await pg.locator('.cine').count() === 0, 'quedó la capa de cine encima');
    afirmar(await pg.locator('.teorema').isVisible(), 'no se ve el teorema');
    afirmar(!errores.length, errores.join('\n'));
  });
};
