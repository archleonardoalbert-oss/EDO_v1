// Entradas manipulables de una escena: deslizadores, campos de función (f editable) y números.
// `crearEntradas(caja, defs, alCambiar)` pinta los controles y llama a alCambiar({ valores, error }) en cada cambio;
// devuelve { poner(parche) } para reflejar cambios que vienen de arrastrar una asa.
import { h, tex } from './dom.js';
import { compilar } from './expresion.js';

const redondear = (v, paso) => (paso ? Number((Math.round(v / paso) * paso).toFixed(6)) : v);
const mostrar = (v) => String(Number(v.toFixed(3))).replace('-', '−');

/** Valores iniciales: para una función, también su compilación (`id` → texto, `idF` → f, `idTex` → LaTeX). */
export function valoresIniciales(defs) {
  const v = {};
  for (const d of defs) {
    v[d.id] = d.valor;
    if (d.tipo === 'funcion') {
      const c = compilar(d.valor, d.vars ?? ['t', 'y'], d.params ?? []);
      v[`${d.id}F`] = c.f; v[`${d.id}Tex`] = c.latex;
    }
  }
  return v;
}

export function crearEntradas(caja, defs, alCambiar) {
  const valores = valoresIniciales(defs);
  const controles = {};
  const avisar = (error) => alCambiar({ valores: { ...valores }, error });

  for (const d of defs) {
    const etiqueta = h('span', { className: 'etiqueta', innerHTML: tex(d.etiqueta ?? d.id) });
    if (d.tipo === 'funcion') {
      const campo = h('input', { type: 'text', value: d.valor, spellcheck: false, autocomplete: 'off', 'aria-label': d.id });
      const vista = h('span', { className: 'vista-tex', innerHTML: tex(valores[`${d.id}Tex`] ?? '') });
      const fijar = (texto) => {
        const c = compilar(texto, d.vars ?? ['t', 'y'], d.params ?? []);
        campo.classList.toggle('mal', !!c.error);
        if (c.error) return avisar(c.error);
        valores[d.id] = texto; valores[`${d.id}F`] = c.f; valores[`${d.id}Tex`] = c.latex;
        vista.innerHTML = tex(c.latex);
        avisar(null);
      };
      campo.addEventListener('input', () => fijar(campo.value));
      const chips = (d.ejemplos ?? []).map((x) => {
        const b = h('button', { type: 'button', className: 'chip', innerHTML: tex(compilar(x, d.vars ?? ['t', 'y'], d.params ?? []).latex ?? x) });
        b.addEventListener('click', () => { campo.value = x; fijar(x); });
        return b;
      });
      caja.append(h('div', { className: 'entrada entrada-funcion', dataset: { id: d.id } }, etiqueta, campo, vista,
        chips.length ? h('div', { className: 'chips' }, ...chips) : null));
      controles[d.id] = { poner: (x) => { campo.value = x; fijar(x); } };
    } else if (d.tipo === 'deslizador') {
      const rango = h('input', { type: 'range', min: d.min, max: d.max, step: d.paso ?? 'any', value: d.valor, 'aria-label': d.id });
      const valor = h('output', { className: 'valor', textContent: mostrar(d.valor) });
      rango.addEventListener('input', () => {
        valores[d.id] = redondear(Number(rango.value), d.paso);
        valor.textContent = mostrar(valores[d.id]);
        avisar(null);
      });
      caja.append(h('label', { className: 'entrada entrada-deslizador', dataset: { id: d.id } }, etiqueta, rango, valor));
      controles[d.id] = { poner: (x) => { rango.value = x; valor.textContent = mostrar(x); valores[d.id] = x; } };
    } else {
      const campo = h('input', { type: 'text', inputMode: 'decimal', value: d.valor, 'aria-label': d.id });
      campo.addEventListener('input', () => {
        const x = Number(campo.value.replace(',', '.').replace('−', '-'));
        const mal = campo.value.trim() === '' || !Number.isFinite(x) || (d.min != null && x < d.min) || (d.max != null && x > d.max);
        campo.classList.toggle('mal', mal);
        if (mal) return avisar(`${d.id} debe ser un número entre ${d.min ?? '−∞'} y ${d.max ?? '∞'}`);
        valores[d.id] = x;
        avisar(null);
      });
      caja.append(h('label', { className: 'entrada entrada-numero', dataset: { id: d.id } }, etiqueta, campo));
      controles[d.id] = { poner: (x) => { campo.value = mostrar(x); valores[d.id] = x; } };
    }
  }
  return {
    valores: () => ({ ...valores }),
    /** Cambios que vienen de la escena (arrastrar): actualiza controles y valores sin re-avisar. */
    poner(parche) {
      for (const [k, v] of Object.entries(parche)) {
        const d = defs.find((x) => x.id === k);
        const val = d?.tipo === 'deslizador' || d?.tipo === 'numero'
          ? Math.min(d.max ?? Infinity, Math.max(d.min ?? -Infinity, redondear(v, d.paso))) : v;
        if (controles[k]) controles[k].poner(val); else valores[k] = val;
      }
      return { ...valores };
    },
  };
}
