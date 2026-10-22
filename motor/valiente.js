// Página de una «Demostración solo para valientes»: arriba a la izquierda el enunciado, al lado lo que se asume
// (Análisis de primer año, nombrado); debajo la demostración entera, organizada en lemas y pasos con su porqué;
// y al final, a todo lo ancho, la animación de lo que se demuestra.
import { h, katex } from './dom.js';
import { crearEstudio } from './estudio.js';
import { cargarValientes } from './practicas.js';
import { reproducirEntrada } from './cinematica.js';

const razonamiento = (pasos) => h('ol', { className: 'razonamiento' }, ...pasos.map((p) =>
  h('li', { className: p.conclusion ? 'conclusion' : '' }, h('div', { className: 'texto', innerHTML: p.texto }), h('div', { className: 'porque', innerHTML: p.porque ?? '' }))));

function bloque(b) {
  if (b.tipo === 'nota') return h('section', { className: 'bloque bloque-nota', innerHTML: b.texto });
  const tags = { lema: 'Lema', demostracion: 'Demostración', paso: 'Paso', corolario: 'Corolario' };
  return h('section', { className: `bloque bloque-${b.tipo}` },
    h('h3', {}, h('span', { className: 'tag', textContent: b.etiqueta ?? tags[b.tipo] ?? '' }), h('span', { innerHTML: b.titulo ?? '' })),
    b.enunciado ? h('div', { className: 'enunciado-lema', innerHTML: b.enunciado }) : null,
    razonamiento(b.pasos),
    b.qed !== false ? h('p', { className: 'qed', textContent: '∎' }) : null);
}

export function montarValiente(raiz, { libro, demo, escena, hrefLibro, hrefTema, nombreTema }) {
  const estudio = escena ? crearEstudio({ pasos: demo.escenaPasos ?? [], escena, nombre: demo.nombre, amplio: true, rotulo: 'lo que estás viendo' }) : null;
  const repetir = h('button', { type: 'button', className: 'repetir-entrada', textContent: '⚔ ver la entrada otra vez' });
  repetir.addEventListener('click', () => reproducirEntrada({ titulo: demo.nombre, cartelas: demo.cartelas }));
  raiz.replaceChildren(...[
    h('nav', { className: 'migas mono' },
      h('a', { href: 'index.html', textContent: 'Biblioteca' }), ' / ',
      h('a', { href: hrefLibro, textContent: `Libro ${libro.romano}` }), ' / ',
      h('a', { href: hrefTema, innerHTML: nombreTema }), repetir),
    h('div', { className: 'valiente-cabecera' },
      h('div', {},
        h('p', { className: 'valiente-sello', textContent: '⚔ demostración solo para valientes' }),
        h('h1', { innerHTML: demo.nombre }),
        h('section', { className: 'teorema' }, h('p', { className: 'rotulo mono', textContent: demo.tipo ?? 'teorema' }), h('div', { innerHTML: demo.enunciado }))),
      h('aside', { className: 'asume' },
        h('p', { className: 'rotulo mono', textContent: 'lo único que se da por sabido' }),
        h('ul', {}, ...demo.asume.map((a) => h('li', { innerHTML: a }))))),
    h('div', { className: 'cuerpo' }, ...demo.cuerpo.map(bloque)),
    estudio ? h('section', { className: 'valiente-escena' },
      h('h2', { textContent: 'Y ahora, míralo' }),
      h('p', { className: 'subtitulo', innerHTML: demo.escenaTexto ?? '' }),
      estudio.raiz) : null,
    demo.claves?.length ? h('section', { className: 'claves' },
      h('p', { className: 'rotulo mono', textContent: 'ideas que te llevas' }),
      h('ul', {}, ...demo.claves.map((c) => h('li', {}, h('b', { innerHTML: c.idea }), h('span', { innerHTML: c.texto }))))) : null,
    h('nav', { className: 'vecinos' }, h('a', { href: hrefTema, innerHTML: `← volver al tema: ${nombreTema}` }), h('span')),
  ].filter((x) => x != null));
  katex(raiz);
  estudio?.iniciar();
  window.estudio = estudio;
}

export async function arrancarValiente() {
  const q = new URLSearchParams(location.search);
  const base = q.get('base') || '';
  const pre = base ? `base=${base}&` : '';
  const raiz = document.getElementById('raiz');
  if (q.get('entrada')) document.body.classList.add('desde-negro');
  try {
    const libro = (await import(`../${base}libros/${q.get('l')}/contenido.js`)).default;
    const demo = (await cargarValientes(base, libro.numero)).find((d) => d.id === q.get('d'));
    if (!demo) throw new Error(`no existe la demostración «${q.get('d')}» en el libro ${q.get('l')}`);
    const tema = libro.temas.find((t) => t.id === demo.tema);
    const escena = demo.escena ? (await import(`../${base}escenas/${demo.escena}.js`)).default : null;
    document.title = `⚔ ${demo.nombre.replace(/\$[^$]*\$/g, '…')}`;
    montarValiente(raiz, {
      libro, demo, escena, hrefLibro: `libro.html?${pre}l=${libro.numero}`,
      hrefTema: `tema.html?${pre}l=${libro.numero}&t=${demo.tema}`, nombreTema: tema?.nombre ?? demo.tema,
    });
  } catch (err) {
    raiz.replaceChildren(h('p', { className: 'aviso', textContent: `No se pudo abrir la página: ${err.message}` }));
    throw err;
  }
}
