// Portada «Biblioteca»: una fila de libros de frente, uno por conferencia.
import { catalogo } from '../libros/catalogo.js';

const portada = (l) => `
  <${l.disponible ? `a href="libro.html?l=${l.numero}"` : 'div aria-disabled="true"'} class="portada c-${l.color}${l.disponible ? '' : ' cerrada'}">
    <span class="numero mono">LIBRO ${l.romano}</span>
    <span class="titulo">${l.titulo}</span>
    ${l.disponible ? '' : '<span class="pronto mono">en preparación</span>'}
    <svg viewBox="0 0 120 50" aria-hidden="true">${l.ilustracion}</svg>
  </${l.disponible ? 'a' : 'div'}>`;

export function montarPortada(raiz) {
  raiz.innerHTML = `
    <header class="portada-cabecera">
      <p class="mono antetitulo">Ecuaciones Diferenciales Ordinarias</p>
      <h1>Biblioteca de EDO</h1>
      <p class="subtitulo">Cada libro es una conferencia. Ábrelo y recorre sus temas: el texto de la clase, paso a paso, con una escena que se mueve y que puedes tocar.</p>
    </header>
    <section class="estante" aria-label="Libros">
      ${catalogo.map(portada).join('')}
    </section>`;
}
