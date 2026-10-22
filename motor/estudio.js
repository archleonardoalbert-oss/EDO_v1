// El bloque «pasos | escena»: a la izquierda el texto de la conferencia en pasos, a la derecha la escena
// (Canvas) con su leyenda, los controles ⏮ ◀ ↻ ▶ y las entradas manipulables. Dentro de cada paso la escena se
// mueve de forma fluida y queda en reposo; ◀ restaura el estado exacto. Lo usan los temas, las soluciones de
// las clases prácticas y las demostraciones para valientes.
import { h, marca, reducirMovimiento } from './dom.js';
import { crearLienzo } from './lienzo.js';
import { crearEntradas, valoresIniciales } from './entradas.js';

export const LEYENDA = {
  cian: 'solución', verde: 'equilibrio estable (sumidero)', ambar: 'equilibrio inestable (fuente)',
  violeta: 'nodo', ciruela: 'parámetro / lo que ajustas', campo: 'campo de pendientes',
};
const COLOR_CSS = { campo: '#5a6a8c' };

/**
 * `pasos`: [{ texto, marca? }] (puede ser [] si la escena va sola, p. ej. en una demostración).
 * `ocultarFuturos`: los pasos posteriores al actual no se ven (soluciones de CP).
 * `teclado`: ← → mueven el paso (un solo bloque por página). `amplio`: escena a todo el ancho, pasos debajo.
 */
export function crearEstudio({ pasos, escena, nombre, rotulo, rotuloAñadido = false, ocultarFuturos = false,
  teclado = true, alPaso, pasoInicial = 0, amplio = false, sinPasos = false }) {
  const N = escena.pasos ?? pasos.length;
  let paso = Math.max(0, Math.min(N - 1, pasoInicial));
  let e = valoresIniciales(escena.entradas), ctx = escena.preparar(e);
  let inicio = -Infinity, t0 = performance.now(), pedido = null, hover = null, arrastre = null;

  const lista = sinPasos ? null : h('ol', { className: `pasos${ocultarFuturos ? ' ocultar-futuros' : ''}` }, ...pasos.map((p, i) =>
    h('li', { dataset: { i } }, h('span', { className: 'texto', innerHTML: p.texto }), marca(p.marca))));
  const cuenta = h('span', { className: 'cuenta mono' });
  const aviso = h('p', { className: 'aviso', role: 'status', hidden: true });
  const caja = h('div', { className: 'entradas' });
  const tira = h('div', { className: 'tira', hidden: true, role: 'dialog', 'aria-label': 'todos los pasos' });
  const leyenda = h('ul', { className: 'leyenda mono', 'aria-label': 'leyenda de colores' });
  const marcoEscena = h('div', { className: 'escena', role: 'img' });
  const boton = (a, txt, titulo) => h('button', { type: 'button', textContent: txt, title: titulo, dataset: { a } });

  const columnaEscena = h('section', { className: 'columna-escena' }, marcoEscena, leyenda,
    h('div', { className: 'controles' },
      boton('inicio', '⏮', 'al primer paso'), boton('atras', '◀', 'paso anterior (←)'), cuenta,
      boton('adelante', '▶', 'paso siguiente (→)'), boton('repetir', '↻', 'repetir el movimiento de este paso'),
      boton('tira', '▦ tira', 'ver todos los pasos')),
    tira, caja, aviso);
  const raiz = h('div', { className: `estudio${amplio ? ' estudio-amplio' : ''}${sinPasos ? ' sin-pasos' : ''}` },
    lista ? h('section', { className: 'columna-pasos' }, rotulo ? h('p', { className: `rotulo mono${rotuloAñadido ? ' rotulo-añadido' : ''}`, textContent: rotulo }) : null, lista) : null,
    columnaEscena);

  let lienzo = null;
  const progreso = (ahora) => (reducirMovimiento() ? 1 : Math.min(1, (ahora - inicio) / escena.dur(paso)));
  const fotograma = (ahora) => {
    pedido = null;
    const p = progreso(ahora), tiempo = ahora - t0;
    lienzo.cuadro((g) => {
      escena.pintar(g, ctx, { paso, p, tiempo });
      const asa = arrastre ?? hover;
      if (asa) {
        g.circulo(asa.x, asa.y, 13, { color: asa.color ?? 'ciruela', relleno: false, ancho: 1.6, alfa: 0.9 });
        g.circulo(asa.x, asa.y, 19, { color: asa.color ?? 'ciruela', relleno: false, ancho: 1, alfa: 0.35 });
      }
    });
    if (p < 1 || escena.esVivo(paso)) pedido = requestAnimationFrame(fotograma);
  };
  const redibujar = () => { if (!pedido && lienzo) pedido = requestAnimationFrame(fotograma); };

  const marcarPaso = () => {
    cuenta.textContent = `${paso + 1}/${N}`;
    marcoEscena.setAttribute('aria-label', `${nombre}, paso ${paso + 1} de ${N}`);
    lista && [...lista.children].forEach((li, i) => { li.className = i < paso ? 'hecho' : i === paso ? 'actual' : 'futuro'; });
    const ley = typeof escena.leyenda === 'function' ? escena.leyenda(paso, ctx) : escena.leyenda;
    leyenda.replaceChildren(...Object.entries(ley ?? {}).map(([c, txt]) =>
      h('li', {}, h('i', { className: 'muestra', style: `background: var(--${c}, ${COLOR_CSS[c] ?? c})` }), txt ?? LEYENDA[c])));
    alPaso?.(paso, N);
  };
  const ir = (i, { animar = true } = {}) => {
    const nuevo = Math.max(0, Math.min(N - 1, i));
    const adelante = nuevo > paso;
    paso = nuevo;
    // hacia adelante se anima el paso nuevo; hacia atrás se restaura su estado en reposo
    inicio = animar && adelante ? performance.now() : -Infinity;
    marcarPaso();
    if (pedido) { cancelAnimationFrame(pedido); pedido = null; }
    redibujar();
  };

  const entradas = crearEntradas(caja, escena.entradas, ({ valores, error }) => {
    const motivo = error ?? escena.validar(valores);
    aviso.hidden = !motivo; aviso.textContent = motivo || '';
    if (motivo) return;
    e = valores; ctx = escena.preparar(e);
    inicio = -Infinity;   // un cambio de entrada deja el paso en reposo: se ve el efecto al instante
    marcarPaso(); redibujar();
  });

  // ---- arrastre de asas (condición inicial, parámetros dibujados…)
  const asas = () => escena.asas?.(ctx, paso, e) ?? [];
  const cercana = (x, y) => asas().find((a) => Math.hypot(a.x - x, a.y - y) < 16) ?? null;
  const conectarArrastre = (canvas) => {
    canvas.addEventListener('pointermove', (ev) => {
      const [x, y] = lienzo.aLogico(ev);
      if (arrastre) {
        const parche = arrastre.mover(x, y);
        const valores = entradas.poner(parche);
        if (!escena.validar(valores)) { e = valores; ctx = escena.preparar(e); }
        arrastre = asas().find((a) => a.id === arrastre.id) ?? arrastre;
        inicio = -Infinity; redibujar();
        return;
      }
      const a = cercana(x, y);
      if (a?.id !== hover?.id) { hover = a; canvas.style.cursor = a ? 'grab' : ''; redibujar(); }
    });
    canvas.addEventListener('pointerdown', (ev) => {
      const [x, y] = lienzo.aLogico(ev);
      const a = cercana(x, y);
      if (!a) return;
      arrastre = a; canvas.setPointerCapture(ev.pointerId); canvas.style.cursor = 'grabbing';
      ev.preventDefault();
    });
    const soltar = () => { if (arrastre) { arrastre = null; canvas.style.cursor = hover ? 'grab' : ''; redibujar(); } };
    canvas.addEventListener('pointerup', soltar);
    canvas.addEventListener('pointercancel', soltar);
    canvas.addEventListener('pointerleave', () => { if (!arrastre && hover) { hover = null; redibujar(); } });
  };

  raiz.querySelector('[data-a=inicio]').addEventListener('click', () => ir(0));
  raiz.querySelector('[data-a=atras]').addEventListener('click', () => ir(paso - 1));
  raiz.querySelector('[data-a=adelante]').addEventListener('click', () => ir(paso + 1));
  raiz.querySelector('[data-a=repetir]').addEventListener('click', () => { inicio = performance.now(); redibujar(); });
  lista?.addEventListener('click', (ev) => {
    if (ev.target.closest('a')) return;
    const li = ev.target.closest('li');
    if (li && (!ocultarFuturos || Number(li.dataset.i) <= paso)) ir(Number(li.dataset.i));
  });

  // Vista de tira: una miniatura en reposo por paso; pulsar una lleva a ese paso.
  const abrirTira = () => {
    const hasta = ocultarFuturos ? paso + 1 : N;
    tira.replaceChildren();
    for (let i = 0; i < hasta; i++) {
      const b = h('button', { type: 'button', className: `miniatura${i === paso ? ' actual' : ''}`, title: `paso ${i + 1}` },
        h('span', { className: 'mono', textContent: String(i + 1) }));
      const cont = h('div', { className: 'escena' });
      b.append(cont);
      b.addEventListener('click', () => { tira.hidden = true; ir(i); });
      tira.append(b);
      const mini = crearLienzo(cont, escena.alto);
      mini.cuadro((g) => escena.pintar(g, ctx, { paso: i, p: 1, tiempo: 0 }));
    }
    tira.hidden = false;
  };
  raiz.querySelector('[data-a=tira]').addEventListener('click', () => (tira.hidden ? abrirTira() : (tira.hidden = true)));
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') tira.hidden = true; });
  if (teclado) document.addEventListener('keydown', (ev) => {
    if (ev.target.closest?.('input, textarea') || ev.altKey || ev.ctrlKey || ev.metaKey) return;
    if (ev.key === 'ArrowRight') { ev.preventDefault(); ir(paso + 1); }
    else if (ev.key === 'ArrowLeft') { ev.preventDefault(); ir(paso - 1); }
  });

  return {
    raiz,
    iniciar() {
      lienzo = crearLienzo(marcoEscena, escena.alto);
      conectarArrastre(lienzo.canvas);
      marcarPaso();
      inicio = performance.now(); t0 = performance.now();
      redibujar();
    },
    ir, paso: () => paso,
    /** Para pruebas: valores y contexto actuales. */
    estado: () => ({ e, ctx, paso }),
  };
}
