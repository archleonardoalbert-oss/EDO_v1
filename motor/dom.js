// Utilidades de DOM compartidas por todas las páginas.
import { MACROS, TRUST } from './macros.js';

export const h = (tag, props = {}, ...hijos) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null) continue;
    if (k === 'dataset') Object.assign(el.dataset, v);
    else if (k in el && k !== 'list') el[k] = v;
    else el.setAttribute(k, v);
  }
  el.append(...hijos.flat().filter((x) => x != null && x !== false));
  return el;
};

const MARCAS = { corregido: 'corregido', añadido: 'añadido · no está en la conferencia' };
export const marca = (m) => (m ? h('span', { className: `marca marca-${m}`, textContent: MARCAS[m] }) : null);

export const OPCIONES_KATEX = {
  delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
  throwOnError: false,
  ignoredClasses: ['sin-tex'],
  macros: { ...MACROS },
  trust: TRUST,
  strict: (codigo) => (codigo === 'htmlExtension' ? 'ignore' : 'warn'),
};
export const katex = (raiz) => window.renderMathInElement?.(raiz, { ...OPCIONES_KATEX, macros: { ...MACROS } });

/** Una fórmula suelta (rótulos de las escenas). */
export const tex = (codigo, display = false) =>
  window.katex ? window.katex.renderToString(codigo, { ...OPCIONES_KATEX, displayMode: display, macros: { ...MACROS } }) : codigo;

export const reducirMovimiento = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
