// Macros de KaTeX comunes a toda la biblioteca.
// Las de color pintan un símbolo con el mismo color que su pieza en el dibujo:
// \cSol (solución, cian) · \cEst (estable, verde) · \cIne (inestable, ámbar) · \cNodo (nodo, violeta) · \cPar (parámetro, ciruela).
export const MACROS = {
  '\\R': '\\mathbb{R}',
  '\\dydt': '\\frac{dy}{dt}',
  '\\dPdt': '\\frac{dP}{dt}',
  '\\cSol': '\\htmlClass{k-cian}{#1}',
  '\\cEst': '\\htmlClass{k-verde}{#1}',
  '\\cIne': '\\htmlClass{k-ambar}{#1}',
  '\\cNodo': '\\htmlClass{k-violeta}{#1}',
  '\\cPar': '\\htmlClass{k-ciruela}{#1}',
};

/** Solo se confía en \htmlClass (para los colores); nada de enlaces ni HTML arbitrario. */
export const TRUST = (ctx) => ctx.command === '\\htmlClass';
