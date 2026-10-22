// Contrato de una escena. Una escena es determinista: lo que se ve depende solo de (entradas, paso,
// progreso p del paso actual, tiempo). Los pasos anteriores se dibujan con p = 1 (en reposo, todo escrito).
//
// definirEscena({
//   entradas: [{ id, tipo: 'deslizador' | 'funcion' | 'numero', etiqueta, valor, min, max, paso, vars, params, ejemplos }],
//   alto: 420,                                   // alto lógico (el ancho lógico es siempre 760)
//   validar: (e) => mensaje | null,
//   preparar: (e) => ctx,                        // cálculos compartidos (planos, funciones, equilibrios…)
//   capas: [(g, ctx, { p, tiempo, actual, paso, i }) => void, …],   // una por paso de la conferencia
//   dibujar: (g, ctx, { paso, p, tiempo }) => void,                   // alternativa a `capas`
//   fondo: (g, ctx, { paso, tiempo }) => void,   // lo que está siempre (antes de las capas)
//   duracion: 1600 | [ms por paso],  vivo: true | [pasos con movimiento continuo],
//   asas: (ctx, paso) => [{ id, x, y, color, mover: (x, y) => ({ entrada: valor }) }],
//   leyenda: { cian: '…' } | (paso) => ({ … }),
// })
export function definirEscena(def) {
  const n = def.capas?.length;
  return {
    entradas: [], alto: 420, validar: () => null, preparar: (e) => ({ e }), duracion: 1600, vivo: false,
    ...def,
    pasos: n ?? def.pasos,
    dur(paso) { return Array.isArray(this.duracion) ? this.duracion[paso] ?? 1600 : this.duracion; },
    esVivo(paso) { return Array.isArray(this.vivo) ? this.vivo.includes(paso) : !!this.vivo; },
    pintar(g, ctx, { paso, p, tiempo }) {
      this.fondo?.(g, ctx, { paso, tiempo, p });
      if (this.dibujar) return this.dibujar(g, ctx, { paso, p, tiempo });
      const hasta = Math.min(paso, this.capas.length - 1);
      for (let i = 0; i <= hasta; i++) this.capas[i](g, ctx, { p: i === hasta ? p : 1, tiempo, actual: i === hasta, paso, i });
    },
  };
}

/** Atajo: p de la capa si es la actual, 1 si ya pasó (para piezas que solo entran en su paso). */
export const etapa = (o, a = 0, b = 1) => Math.min(1, Math.max(0, (o.p - a) / (b - a)));
