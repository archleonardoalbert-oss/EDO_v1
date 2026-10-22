// Lienzo de una escena: Canvas 2D nítido (HiDPI) en coordenadas lógicas de ANCHO px de ancho, más una capa
// HTML superpuesta para rótulos KaTeX. Cada fotograma se dibuja entero (`cuadro`); los rótulos se
// reconcilian por clave: los que no se ponen en un fotograma desaparecen.
import { tex as renderTex } from './dom.js';

export const ANCHO = 760;
export const COLORES = {
  cian: '#3aa9bb', ciruela: '#b8509f', ambar: '#c99448', verde: '#4aa97c', violeta: '#7d6cc4',
  texto: '#d6d1c2', texto2: '#a9a596', tenue: '#737890', muyTenue: '#2c3040', campo: '#5a6a8c',
  rejilla: '#11151f', eje: '#3a4052', rojo: '#d0656c', blanco: '#f1ecdd',
};

export function rgba(color, alfa = 1) {
  const hex = COLORES[color] ?? color;
  if (!hex.startsWith('#')) return hex;
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alfa})`;
}

/** El «pincel» que reciben las capas: el contexto y atajos con colores por nombre. */
function crearPincel(ctx, rotulos) {
  const g = {
    ctx, rotulos,
    linea(pts, { color = 'texto', ancho = 2, alfa = 1, guion = null, brillo = 0, cierre = false } = {}) {
      if (pts.length < 2 || alfa <= 0) return;
      ctx.save();
      ctx.strokeStyle = rgba(color, alfa); ctx.lineWidth = ancho; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (guion) ctx.setLineDash(guion);
      if (brillo) { ctx.shadowColor = rgba(color, Math.min(1, alfa * 0.9)); ctx.shadowBlur = brillo; }
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      if (cierre) ctx.closePath();
      ctx.stroke(); ctx.restore();
    },
    circulo(x, y, r, { color = 'texto', alfa = 1, relleno = true, ancho = 1.6, brillo = 0 } = {}) {
      if (alfa <= 0 || r <= 0) return;
      ctx.save();
      if (brillo) { ctx.shadowColor = rgba(color, alfa); ctx.shadowBlur = brillo; }
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
      if (relleno) { ctx.fillStyle = rgba(color, alfa); ctx.fill(); }
      else { ctx.strokeStyle = rgba(color, alfa); ctx.lineWidth = ancho; ctx.stroke(); }
      ctx.restore();
    },
    rect(x, y, w, h, { color = 'texto', alfa = 1, relleno = true, ancho = 1, radio = 0 } = {}) {
      if (alfa <= 0) return;
      ctx.save(); ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(x, y, w, h, radio) : ctx.rect(x, y, w, h);
      if (relleno) { ctx.fillStyle = rgba(color, alfa); ctx.fill(); }
      else { ctx.strokeStyle = rgba(color, alfa); ctx.lineWidth = ancho; ctx.stroke(); }
      ctx.restore();
    },
    /** Flecha de (x1, y1) a (x2, y2) con punta rellena. */
    flecha(x1, y1, x2, y2, { color = 'texto', ancho = 2, alfa = 1, punta = 9, brillo = 0 } = {}) {
      if (alfa <= 0) return;
      const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1);
      if (L < 0.5) return;
      const pk = Math.min(punta, L * 0.6), bx = x2 - pk * Math.cos(a) * 0.85, by = y2 - pk * Math.sin(a) * 0.85;
      g.linea([[x1, y1], [bx, by]], { color, ancho, alfa, brillo });
      ctx.save(); ctx.fillStyle = rgba(color, alfa);
      if (brillo) { ctx.shadowColor = rgba(color, alfa); ctx.shadowBlur = brillo; }
      ctx.beginPath(); ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - pk * Math.cos(a - 0.42), y2 - pk * Math.sin(a - 0.42));
      ctx.lineTo(x2 - pk * Math.cos(a + 0.42), y2 - pk * Math.sin(a + 0.42));
      ctx.closePath(); ctx.fill(); ctx.restore();
    },
    /** Texto de canvas (números, etiquetas mono). ancla: 'c' | 'l' | 'r' + opcional 't' | 'b'. */
    texto(x, y, txt, { color = 'texto2', alfa = 1, tam = 12, ancla = 'c', fuente = 'mono', peso = 400 } = {}) {
      if (alfa <= 0) return;
      ctx.save();
      ctx.font = `${peso} ${tam}px ${fuente === 'mono' ? "'JetBrains Mono', monospace" : "'Lectura', Georgia, serif"}`;
      ctx.fillStyle = rgba(color, alfa);
      ctx.textAlign = ancla.includes('l') ? 'left' : ancla.includes('r') ? 'right' : 'center';
      ctx.textBaseline = ancla.includes('t') ? 'top' : ancla.includes('b') ? 'bottom' : 'middle';
      ctx.fillText(txt, x, y);
      ctx.restore();
    },
    /** Rótulo KaTeX en la capa HTML (clave estable por rótulo). */
    tex(clave, x, y, codigo, opciones = {}) { rotulos.poner(clave, x, y, codigo, opciones); },
    recortar(caja, fn) {
      ctx.save(); ctx.beginPath(); ctx.rect(caja.x, caja.y, caja.w, caja.h); ctx.clip(); fn(); ctx.restore();
    },
  };
  return g;
}

function crearRotulos(capa) {
  const vivos = new Map();
  let usados = new Set();
  return {
    empezar() { usados = new Set(); },
    poner(clave, x, y, codigo, { color = 'texto', alfa = 1, tam = 16, ancla = 'c', fondo = false } = {}) {
      if (alfa <= 0.01) return;
      usados.add(clave);
      let r = vivos.get(clave);
      if (!r) {
        const el = document.createElement('div');
        el.className = 'rotulo-tex';
        capa.append(el);
        vivos.set(clave, (r = { el, codigo: null }));
      }
      if (r.codigo !== codigo) { r.el.innerHTML = renderTex(codigo); r.codigo = codigo; }
      const tx = ancla.includes('l') ? '0%' : ancla.includes('r') ? '-100%' : '-50%';
      const ty = ancla.includes('t') ? '0%' : ancla.includes('b') ? '-100%' : '-50%';
      const s = r.el.style;
      s.left = `${x}px`; s.top = `${y}px`; s.transform = `translate(${tx}, ${ty})`;
      s.opacity = String(alfa); s.color = COLORES[color] ?? color; s.fontSize = `${tam}px`;
      r.el.classList.toggle('con-fondo', fondo);
    },
    terminar() {
      for (const [clave, r] of vivos) if (!usados.has(clave)) { r.el.remove(); vivos.delete(clave); }
    },
  };
}

/**
 * Crea el lienzo dentro de `contenedor` con alto lógico `alto`. Devuelve
 * { canvas, cuadro(fn), aLogico(evento) → [x, y], cambiarAlto(alto), destruir() }.
 */
export function crearLienzo(contenedor, alto) {
  const marco = document.createElement('div');
  marco.className = 'lienzo';
  const canvas = document.createElement('canvas');
  const capa = document.createElement('div');
  capa.className = 'capa-rotulos';
  marco.append(canvas, capa);
  contenedor.append(marco);
  const ctx = canvas.getContext('2d');
  const rotulos = crearRotulos(capa);
  const g = crearPincel(ctx, rotulos);
  let escala = 1, ultimo = null;

  const ajustar = () => {
    const w = marco.clientWidth || ANCHO, dpr = window.devicePixelRatio || 1;
    escala = w / ANCHO;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(alto * escala * dpr);
    canvas.style.width = `${w}px`; canvas.style.height = `${alto * escala}px`;
    marco.style.height = `${alto * escala}px`;
    capa.style.width = `${ANCHO}px`; capa.style.height = `${alto}px`;
    capa.style.transform = `scale(${escala})`;
    if (ultimo) cuadro(ultimo);
  };
  const cuadro = (fn) => {
    ultimo = fn;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr * escala, 0, 0, dpr * escala, 0, 0);
    rotulos.empezar();
    fn(g);
    rotulos.terminar();
  };
  const obs = new ResizeObserver(ajustar);
  obs.observe(marco);
  ajustar();
  return {
    canvas, marco, cuadro,
    aLogico: (ev) => { const r = canvas.getBoundingClientRect(); return [(ev.clientX - r.left) / escala, (ev.clientY - r.top) / escala]; },
    cambiarAlto: (a) => { if (a !== alto) { alto = a; ajustar(); } },
    destruir: () => { obs.disconnect(); marco.remove(); },
  };
}
