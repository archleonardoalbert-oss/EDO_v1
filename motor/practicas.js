// Dónde hay clases prácticas: los libros del catálogo marcados con `practica: true` y disponibles
// (en las páginas de prueba, `base`, el libro que se está viendo).
import { catalogo } from '../libros/catalogo.js';

export async function cargarPracticas(base, l) {
  const numeros = base ? [Number(l)] : catalogo.filter((x) => x.disponible && x.practica).map((x) => x.numero);
  const res = [];
  for (const n of numeros) {
    try { res.push({ l: n, practica: (await import(`../${base}libros/${n}/practica.js`)).default }); }
    catch (e) { if (!/Failed to fetch|Cannot find|error loading|404/i.test(e.message)) throw e; }
  }
  return res;
}

/** Ejercicios cuya pista-concepto cita el tema `t` del libro `l`: [{href, texto, nombre}]. */
export function ejerciciosQueCitan(practicas, l, t, base) {
  const pre = base ? `base=${base}&` : '';
  return practicas.flatMap(({ l: lp, practica }) => practica.ejercicios
    .filter((x) => x.partes.some((p) => p.pistas[0]?.enlaces?.some((q) => String(q.l) === String(l) && q.t === t)))
    .map((x) => ({ href: `ejercicio.html?${pre}l=${lp}&x=${x.id}`, texto: `CP ${practica.numero} · ejercicio ${x.numero}`, nombre: x.nombre })));
}

/** Demostraciones para valientes de un libro (libros/N/valientes.js), o []. */
export async function cargarValientes(base, l) {
  try { return (await import(`../${base}libros/${l}/valientes.js`)).default; }
  catch (e) { if (/Failed to fetch|Cannot find|error loading|404/i.test(e.message)) return []; throw e; }
}
