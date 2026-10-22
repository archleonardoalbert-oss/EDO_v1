// Índice de un libro: sus temas en el orden de la conferencia (por partes si las tiene), las demostraciones
// para valientes, la clase práctica y el resumen de la clase.
import { katex } from './dom.js';
import { cargarPracticas, cargarValientes } from './practicas.js';

export async function arrancarLibro() {
  const q = new URLSearchParams(location.search);
  const base = q.get('base') || '';
  const raiz = document.getElementById('raiz');
  const libro = (await import(`../${base}libros/${q.get('l')}/contenido.js`)).default;
  document.title = `Libro ${libro.romano} · ${libro.titulo}`;
  const pre = base ? `base=${base}&` : '';
  const valientes = await cargarValientes(base, libro.numero);
  const parteDe = Object.fromEntries((libro.partes ?? []).map((p) => [p.desde, p.titulo]));
  let n = 0;
  const filas = libro.temas.map((x) => `
    ${parteDe[x.id] ? `</ol><p class="indice-parte">${parteDe[x.id]}</p><ol class="indice-libro">` : ''}
    <li><a href="tema.html?${pre}l=${libro.numero}&t=${x.id}">
      <span class="num mono">${++n}</span><span class="nombre">${x.nombre}</span>
      ${x.valiente ? '<span class="lleva valiente">⚔ valientes</span>' : '<span></span>'}</a></li>`).join('');
  raiz.innerHTML = `
    <nav class="migas mono"><a href="index.html">Biblioteca</a></nav>
    <header class="libro-cabecera c-${libro.color}">
      <span class="numero mono">LIBRO ${libro.romano} · ${libro.conferencia}</span>
      <h1>${libro.titulo}</h1>
    </header>
    <ol class="indice-libro">${filas}</ol>`;
  if (valientes.length) raiz.insertAdjacentHTML('beforeend', `
    <section class="valientes-indice">
      <h2>Demostraciones solo para valientes</h2>
      <p class="subtitulo">Lo que la conferencia enuncia o usa sin demostrar, demostrado sin dejar nada en el aire.</p>
      <ol class="indice-libro">
        ${valientes.map((v) => `<li><a href="valiente.html?${pre}l=${libro.numero}&d=${v.id}">
          <span class="num mono">⚔</span><span class="nombre">${v.nombre}</span><span class="lleva valiente">⚔</span></a></li>`).join('')}
      </ol>
    </section>`);
  const cp = (await cargarPracticas(base, libro.numero)).find((x) => x.l === libro.numero)?.practica;
  if (cp) raiz.insertAdjacentHTML('beforeend', `
    <section id="practica" class="practica-indice">
      <h2>Clase práctica ${cp.numero}</h2>
      <p class="subtitulo">Para resolver tú: pistas a petición (la primera, siempre el tema de la conferencia) y la solución cuando la quieras.</p>
      <ol class="indice-libro">
        ${cp.ejercicios.map((x) => `
          <li><a href="ejercicio.html?${pre}l=${libro.numero}&x=${x.id}">
            <span class="num mono">${x.numero}</span><span class="nombre"><span class="tipo tipo-CP">ejercicio ${x.numero}</span> ${x.nombre}</span><span></span></a></li>`).join('')}
      </ol>
    </section>`);
  if (libro.resumen) raiz.insertAdjacentHTML('beforeend', `
    <section class="resumen-libro c-${libro.color}">
      <h2>${libro.resumen.titulo}</h2>
      <p class="rotulo mono">literal de la conferencia</p>
      ${libro.resumen.bloques.map((b) => `${b.titulo ? `<p class="indice-parte">${b.titulo}</p>` : ''}<ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`).join('')}
    </section>`);
  katex(raiz);
}
