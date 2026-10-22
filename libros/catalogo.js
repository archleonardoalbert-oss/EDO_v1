// Los libros de la biblioteca: uno por conferencia. `practica: true` si el libro tiene su clase práctica (libros/N/practica.js).
// `ilustracion`: SVG pequeño con la idea central del libro (viewBox 0 0 120 50).
export const catalogo = [
  {
    numero: 1, romano: 'I', titulo: '¿Qué son las EDO? · Modelación', color: 'cian', disponible: true, valientes: true,
    ilustracion: '<line x1="4" y1="44" x2="116" y2="44" class="i-eje"/><path d="M6 42C40 42 60 38 80 22S110 2 116 2" class="i-ambar"/><path d="M6 42C30 42 40 12 70 9S100 8 116 8" class="i-cian"/><line x1="4" y1="8" x2="116" y2="8" class="i-verde" stroke-dasharray="3 3"/>',
  },
  {
    numero: 2, romano: 'II', titulo: 'Separación de variables', color: 'ciruela', disponible: true, valientes: true,
    ilustracion: '<text x="4" y="32" class="i-tex">∫</text><text x="16" y="30" class="i-texto">dy/h</text><text x="54" y="30" class="i-texto i-blanco">=</text><text x="66" y="32" class="i-tex">∫</text><text x="78" y="30" class="i-texto">g dt</text>',
  },
  {
    numero: 3, romano: 'III', titulo: 'Campos de pendientes', color: 'ambar', disponible: true, practica: true, valientes: true,
    ilustracion: '<g class="i-campo">' + Array.from({ length: 7 }, (_, i) => Array.from({ length: 4 }, (_, j) => { const x = 8 + i * 17, y = 8 + j * 12, m = ((y - 26) / -12) - (x - 60) / 30, a = Math.atan(m) ; return `<line x1="${(x - 6 * Math.cos(a)).toFixed(1)}" y1="${(y + 6 * Math.sin(a)).toFixed(1)}" x2="${(x + 6 * Math.cos(a)).toFixed(1)}" y2="${(y - 6 * Math.sin(a)).toFixed(1)}"/>`; }).join('')).join('') + '</g><path d="M4 30C30 34 50 30 70 22S100 4 116 0" class="i-cian"/>',
  },
  {
    numero: 4, romano: 'IV', titulo: 'Euler · Existencia y unicidad', color: 'verde', disponible: true, practica: true, valientes: true,
    ilustracion: '<path d="M6 44C40 42 80 30 116 4" class="i-cian"/><path d="M6 44L34 40L62 33L90 22L116 10" class="i-ambar"/><g class="i-ambar-r"><circle cx="6" cy="44" r="2.6"/><circle cx="34" cy="40" r="2.6"/><circle cx="62" cy="33" r="2.6"/><circle cx="90" cy="22" r="2.6"/><circle cx="116" cy="10" r="2.6"/></g>',
  },
  {
    numero: 5, romano: 'V', titulo: 'Equilibrios · Línea de fase', color: 'violeta', disponible: true, practica: true, valientes: true,
    ilustracion: '<line x1="60" y1="2" x2="60" y2="48" class="i-eje"/><path d="M60 4V14M56 10L60 14L64 10M60 36V46M56 40L60 36L64 40" class="i-blanco-l"/><circle cx="60" cy="25" r="4.5" class="i-verde-r"/><path d="M20 4V46M16 34L20 30L24 34M16 16L20 20L24 16" class="i-blanco-l" opacity=".5"/><path d="M100 4V46M96 34L100 38L104 34M96 12L100 16L104 12" class="i-blanco-l" opacity=".5"/>',
  },
  {
    numero: 6, romano: 'VI', titulo: 'Bifurcaciones · Ecuaciones lineales', color: 'cian', practica: true,
    ilustracion: '<line x1="4" y1="25" x2="116" y2="25" class="i-eje"/><path d="M70 25C70 12 40 6 6 4" class="i-ambar"/><path d="M70 25C70 38 40 44 6 46" class="i-verde"/><circle cx="70" cy="25" r="3.5" class="i-ciruela-r"/>',
  },
  {
    numero: 7, romano: 'VII', titulo: 'Variación de la constante · Factor integrante · Cambio de variable', color: 'ciruela',
    ilustracion: '<text x="8" y="30" class="i-texto">c</text><path d="M24 26H48M44 22L48 26L44 30" class="i-blanco-l"/><text x="56" y="30" class="i-texto">c(t)</text><path d="M86 34C92 10 100 40 114 14" class="i-cian"/>',
  },
];
