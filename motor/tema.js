// Página de un tema: título, recuadro con la idea central (si la conferencia la destaca), explicación breve y,
// en dos columnas, el texto de la conferencia paso a paso (izquierda) y la escena viva (derecha). Al final, las
// ideas que te llevas, la demostración para valientes (si la hay) y los ejercicios que lo practican.
import { h, katex, marca } from './dom.js';
import { crearEstudio } from './estudio.js';
import { cargarPracticas, cargarValientes, ejerciciosQueCitan } from './practicas.js';
import { reproducirEntrada } from './cinematica.js';

export function montarTema(raiz, { libro, tema, escena, numero, anterior, siguiente, hrefLibro, practicaEn = [], valiente, pre = '' }) {
  const estudio = crearEstudio({ pasos: tema.pasos, escena, nombre: tema.nombre, rotulo: 'la conferencia, paso a paso' });
  raiz.replaceChildren(...[
    h('nav', { className: 'migas mono' },
      h('a', { href: 'index.html', textContent: 'Biblioteca' }), ' / ',
      h('a', { href: hrefLibro, textContent: `Libro ${libro.romano}` })),
    h('header', { className: 'cabecera' },
      h('span', { className: `tipo c-${libro.color}`, textContent: `tema ${numero}` }),
      h('h1', { innerHTML: tema.nombre })),
    tema.recuadro ? h('section', { className: `recuadro c-${tema.recuadro.color ?? 'verde'}` },
      h('p', { className: 'rotulo mono', textContent: tema.recuadro.titulo }),
      h('div', { innerHTML: tema.recuadro.texto }), marca(tema.recuadro.marca)) : null,
    h('section', { className: 'explicacion' },
      h('p', { className: 'rotulo mono', textContent: 'en pocas palabras (no es de la conferencia)' }),
      h('div', { innerHTML: tema.explicacion })),
    estudio.raiz,
    valiente ? h('section', { className: 'valiente-puerta' },
      h('a', { href: `valiente.html?${pre}l=${libro.numero}&d=${valiente.id}`, className: 'boton-valiente' },
        h('span', { className: 'espadas', textContent: '⚔' }),
        h('span', {}, h('b', { textContent: 'Demostración solo para valientes' }), h('small', { innerHTML: valiente.nombre })))) : null,
    tema.claves?.length ? h('section', { className: 'claves' },
      h('p', { className: 'rotulo mono', textContent: 'ideas que te llevas' }),
      h('ul', {}, ...tema.claves.map((c) => h('li', {}, h('b', { innerHTML: c.idea }), h('span', { innerHTML: c.texto }))))) : null,
    practicaEn.length ? h('section', { className: 'practica-en' },
      h('p', { className: 'rotulo mono', textContent: 'se practica en' }),
      h('ul', {}, ...practicaEn.map((x) => h('li', {}, h('a', { href: x.href, textContent: x.texto }), ' ', h('span', { innerHTML: x.nombre }))))) : null,
    h('nav', { className: 'vecinos' },
      anterior ? h('a', { href: anterior.href, className: 'ant', innerHTML: `← ${anterior.nombre}` }) : h('span'),
      siguiente ? h('a', { href: siguiente.href, className: 'sig', innerHTML: `${siguiente.nombre} →` }) : h('span')),
  ].filter((x) => x != null));
  katex(raiz);
  estudio.iniciar();
  window.estudio = estudio;
  // la puerta: la entrada épica se reproduce aquí (el clic permite sonido) y luego se abre la demostración
  raiz.querySelector('.boton-valiente')?.addEventListener('click', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return;
    ev.preventDefault();
    const destino = ev.currentTarget.href;
    reproducirEntrada({ titulo: valiente.nombre, cartelas: valiente.cartelas, alTerminar: () => { location.href = `${destino}&entrada=1`; } });
  });
}

/** Arranque de tema.html: lee ?l=&t=(&base=) y monta. */
export async function arrancarTema() {
  const q = new URLSearchParams(location.search);
  const base = q.get('base') || '';
  const pre = base ? `base=${base}&` : '';
  const raiz = document.getElementById('raiz');
  try {
    const libro = (await import(`../${base}libros/${q.get('l')}/contenido.js`)).default;
    const i = libro.temas.findIndex((x) => x.id === q.get('t'));
    if (i < 0) throw new Error(`no existe el tema «${q.get('t')}» en el libro ${q.get('l')}`);
    const tema = libro.temas[i];
    const escena = (await import(`../${base}escenas/${tema.escena}.js`)).default;
    const enlace = (x) => x && { href: `tema.html?${pre}l=${libro.numero}&t=${x.id}`, nombre: x.nombre };
    document.title = `${tema.nombre.replace(/\$[^$]*\$/g, '…')} · Libro ${libro.romano}`;
    const valientes = await cargarValientes(base, libro.numero);
    montarTema(raiz, {
      libro, tema, escena, numero: i + 1, pre,
      anterior: enlace(libro.temas[i - 1]), siguiente: enlace(libro.temas[i + 1]),
      hrefLibro: `libro.html?${pre}l=${libro.numero}`,
      valiente: tema.valiente ? valientes.find((v) => v.id === tema.valiente) : null,
      practicaEn: ejerciciosQueCitan(await cargarPracticas(base, libro.numero), libro.numero, tema.id, base),
    });
  } catch (err) {
    raiz.replaceChildren(h('p', { className: 'aviso', textContent: `No se pudo abrir la página: ${err.message}` }));
    throw err;
  }
}
