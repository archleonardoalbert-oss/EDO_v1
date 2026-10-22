// La entrada épica (y cómica) a una «Demostración solo para valientes»: negro, iris, cartelas de tráiler con
// bandas de cine, clasificación por edades, vuelo a través de un campo de pendientes y un título que cae con
// sacudida y polvo. Sonido sintetizado con WebAudio (sin archivos). Se salta con Esc, Espacio o clic.
import { reducirMovimiento, tex } from './dom.js';

const CARTELAS = [
  'En un mundo donde $f$ es continua…',
  'donde la conferencia solo <em>enunció</em>…',
  'un estudiante se atrevió a pedir la demostración.',
];
const SILENCIO = 'edo-valientes-silencio';
const silenciado = () => { try { return localStorage.getItem(SILENCIO) === '1'; } catch { return false; } };
const fijarSilencio = (v) => { try { localStorage.setItem(SILENCIO, v ? '1' : '0'); } catch { /* sin almacenamiento */ } };

// ---------------------------------------------------------------- sonido
function crearSonido() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC || silenciado()) return { braam() {}, viento() {}, golpe() {}, cerrar() {} };
  const ac = new AC(), salida = ac.createGain();
  salida.gain.value = 0.55; salida.connect(ac.destination);
  const ruido = (seg) => {
    const b = ac.createBuffer(1, ac.sampleRate * seg, ac.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(); s.buffer = b; return s;
  };
  return {
    /** El «BRAAAM» de tráiler: sierras graves desafinadas, filtro que se abre y se cierra. */
    braam(t = 0, dur = 2.6) {
      const t0 = ac.currentTime + t, filtro = ac.createBiquadFilter(), g = ac.createGain();
      filtro.type = 'lowpass'; filtro.Q.value = 6;
      filtro.frequency.setValueAtTime(90, t0); filtro.frequency.exponentialRampToValueAtTime(900, t0 + 0.35);
      filtro.frequency.exponentialRampToValueAtTime(120, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.9, t0 + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      filtro.connect(g); g.connect(salida);
      for (const [f, tipo] of [[43.65, 'sawtooth'], [44.2, 'sawtooth'], [87.3, 'square'], [65.4, 'sawtooth']]) {
        const o = ac.createOscillator(); o.type = tipo; o.frequency.value = f; o.connect(filtro); o.start(t0); o.stop(t0 + dur + 0.1);
      }
    },
    /** Viento que acelera (el vuelo por el campo). */
    viento(t = 0, dur = 2) {
      const t0 = ac.currentTime + t, s = ruido(dur), f = ac.createBiquadFilter(), g = ac.createGain();
      f.type = 'bandpass'; f.Q.value = 1.4;
      f.frequency.setValueAtTime(200, t0); f.frequency.exponentialRampToValueAtTime(2600, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.5, t0 + dur * 0.85); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      s.connect(f); f.connect(g); g.connect(salida); s.start(t0);
    },
    /** Golpe del título: bombo grave + estallido de ruido. */
    golpe(t = 0) {
      const t0 = ac.currentTime + t, o = ac.createOscillator(), g = ac.createGain();
      o.frequency.setValueAtTime(120, t0); o.frequency.exponentialRampToValueAtTime(30, t0 + 0.6);
      g.gain.setValueAtTime(1, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.2);
      o.connect(g); g.connect(salida); o.start(t0); o.stop(t0 + 1.3);
      const s = ruido(0.6), f = ac.createBiquadFilter(), gn = ac.createGain();
      f.type = 'lowpass'; f.frequency.value = 1400;
      gn.gain.setValueAtTime(0.6, t0); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.5);
      s.connect(f); f.connect(gn); gn.connect(salida); s.start(t0);
      this.braam(t + 0.02, 3.2);
    },
    cerrar() { setTimeout(() => ac.close().catch(() => {}), 400); },
  };
}

// ---------------------------------------------------------------- imagen
/**
 * Reproduce la entrada. `titulo` (HTML/KaTeX con $…$), `cartelas` (3 frases), `alTerminar` se llama al final
 * (o al saltarla). Devuelve una función para cancelarla.
 */
export function reproducirEntrada({ titulo, subtitulo = 'Demostración solo para valientes', cartelas = CARTELAS, alTerminar }) {
  if (reducirMovimiento()) { alTerminar?.(); return () => {}; }
  const capa = document.createElement('div');
  capa.className = 'cine';
  const fmt = (s) => s.replace(/\$([^$]+)\$/g, (_, c) => tex(c));
  capa.innerHTML = `
    <canvas class="cine-lienzo"></canvas>
    <div class="cine-banda arriba"></div><div class="cine-banda abajo"></div>
    ${cartelas.map((c, i) => `<p class="cine-cartela" data-i="${i}">${fmt(c)}</p>`).join('')}
    <div class="cine-clasificacion"><b>R</b><span>CLASIFICACIÓN: <em>RIGUROSO</em><br>contiene ε, δ y desigualdades explícitas.<br>Se recomienda la compañía de un adulto con Análisis aprobado.</span></div>
    <div class="cine-titulo"><small>${subtitulo}</small><h2>${fmt(titulo)}</h2></div>
    <p class="cine-subtitulos">♪ coro gregoriano en re menor ♪</p>
    <div class="cine-controles"><button type="button" class="cine-silencio"></button><span>Esc para saltar</span></div>`;
  document.body.append(capa);
  const lienzo = capa.querySelector('canvas'), g = lienzo.getContext('2d');
  const sonido = crearSonido();
  const botonSilencio = capa.querySelector('.cine-silencio');
  const pintarSilencio = () => { botonSilencio.textContent = silenciado() ? '🔇 sin sonido' : '🔊 sonido'; };
  pintarSilencio();
  botonSilencio.addEventListener('click', (ev) => { ev.stopPropagation(); fijarSilencio(!silenciado()); pintarSilencio(); });

  // marcas de pendiente en 3D que vuelan hacia la cámara
  const marcas = Array.from({ length: 520 }, () => ({ x: (Math.random() - 0.5) * 16, y: (Math.random() - 0.5) * 10, z: Math.random() * 30 + 1, a: Math.random() * Math.PI - Math.PI / 2, c: Math.random() }));
  const polvo = [];
  const ajustar = () => { const d = devicePixelRatio || 1; lienzo.width = innerWidth * d; lienzo.height = innerHeight * d; g.setTransform(d, 0, 0, d, 0, 0); };
  ajustar(); addEventListener('resize', ajustar);

  const T = { iris: [0.5, 1.6], cartelas: [1.7, 5.2], clas: [5.2, 6.4], vuelo: [6.2, 8.4], golpe: 8.4, fin: 11.2 };
  const inicio = performance.now();
  let pedido = 0, terminado = false;
  sonido.braam(1.6, 2.4); sonido.braam(3.6, 2.4); sonido.viento(6.2, 2.2); sonido.golpe(8.4);

  const ventana = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
  const cuadro = (ahora) => {
    const t = (ahora - inicio) / 1000, W = innerWidth, H = innerHeight;
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    capa.style.setProperty('--fondo', String(Math.min(1, t / 0.5)));
    // iris que se cierra sobre un punto de luz
    if (t < T.cartelas[0] + 0.3) {
      const q = ventana(t, ...T.iris), r = (1 - q) * Math.hypot(W, H) * 0.5 + 3;
      const grad = g.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, r);
      grad.addColorStop(0, `rgba(217,100,74,${0.25 * (1 - q) + 0.15})`); grad.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grad; g.fillRect(0, 0, W, H);
    }
    // cartelas
    capa.querySelectorAll('.cine-cartela').forEach((el, i) => {
      const [a, b] = T.cartelas, d = (b - a) / cartelas.length, s = a + i * d;
      el.style.opacity = String(Math.min(ventana(t, s, s + 0.35), 1 - ventana(t, s + d - 0.35, s + d)));
      el.style.transform = `translate(-50%, -50%) scale(${1 + 0.04 * ventana(t, s, s + d)})`;
    });
    const qc = Math.min(ventana(t, T.clas[0], T.clas[0] + 0.25), 1 - ventana(t, T.clas[1] - 0.25, T.clas[1]));
    capa.querySelector('.cine-clasificacion').style.opacity = String(qc);
    capa.querySelector('.cine-subtitulos').style.opacity = String(Math.min(ventana(t, 1.8, 2.3), 1 - ventana(t, 7.8, 8.3)));
    // vuelo por el campo de pendientes
    const qv = ventana(t, ...T.vuelo);
    if (t > T.vuelo[0] - 0.2 && t < T.golpe + 1.5) {
      const vel = 2 + 60 * qv * qv;
      const alfaV = Math.min(ventana(t, T.vuelo[0] - 0.2, T.vuelo[0] + 0.4), 1 - ventana(t, T.golpe + 0.6, T.golpe + 1.5));
      for (const m of marcas) {
        m.z -= vel * 0.016;
        if (m.z < 0.3) { m.z += 30; m.x = (Math.random() - 0.5) * 16; m.y = (Math.random() - 0.5) * 10; }
        const px = W / 2 + (m.x / m.z) * W * 0.5, py = H / 2 + (m.y / m.z) * W * 0.5, L = Math.min(60, 26 / m.z + vel * 0.4 / m.z);
        const col = m.c < 0.7 ? '90,106,140' : m.c < 0.85 ? '58,169,187' : '217,100,74';
        g.strokeStyle = `rgba(${col},${alfaV * Math.min(1, 9 / m.z)})`; g.lineWidth = Math.max(1, 6 / m.z);
        g.beginPath(); g.moveTo(px - L * Math.cos(m.a), py - L * Math.sin(m.a)); g.lineTo(px + L * Math.cos(m.a), py + L * Math.sin(m.a)); g.stroke();
      }
    }
    if (qv > 0 && t < T.golpe) {
      // resplandor central que crece con la velocidad
      const gr = g.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.5);
      gr.addColorStop(0, `rgba(217,100,74,${0.35 * qv})`); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
    }
    // destello y polvo del golpe
    const tg = t - T.golpe;
    if (tg > 0) {
      if (!polvo.length) for (let i = 0; i < 160; i++) { const a = Math.random() * Math.PI * 2, v = 60 + Math.random() * 420; polvo.push({ a, v, r: 1 + Math.random() * 3 }); }
      g.fillStyle = `rgba(255,236,200,${Math.max(0, 0.85 - tg * 2.2)})`; g.fillRect(0, 0, W, H);
      for (const p of polvo) {
        const d = p.v * (1 - Math.exp(-tg * 2.2)), x = W / 2 + Math.cos(p.a) * d * 1.6, y = H / 2 + Math.sin(p.a) * d * 0.6 + tg * tg * 40;
        g.fillStyle = `rgba(201,148,72,${Math.max(0, 0.8 - tg * 0.35)})`; g.beginPath(); g.arc(x, y, p.r, 0, Math.PI * 2); g.fill();
      }
      const sac = Math.max(0, 1 - tg * 2.5) * 14;
      capa.style.transform = `translate(${(Math.random() - 0.5) * sac}px, ${(Math.random() - 0.5) * sac}px)`;
    }
    const tit = capa.querySelector('.cine-titulo');
    const qt = ventana(t, T.golpe - 0.18, T.golpe);
    tit.style.opacity = String(qt * (1 - ventana(t, T.fin - 0.8, T.fin)));
    tit.style.transform = `translate(-50%, -50%) scale(${3.2 - 2.2 * qt * qt + 0.03 * ventana(t, T.golpe, T.fin)})`;
    capa.style.opacity = String(1 - ventana(t, T.fin - 0.5, T.fin));
    if (t >= T.fin) return terminar();
    pedido = requestAnimationFrame(cuadro);
  };
  const terminar = () => {
    if (terminado) return;
    terminado = true;
    cancelAnimationFrame(pedido); removeEventListener('resize', ajustar); removeEventListener('keydown', tecla);
    sonido.cerrar();
    alTerminar?.();
    // la capa se queda negra hasta que la página nueva cargue (si se navega); si no, se retira
    setTimeout(() => capa.remove(), 1500);
  };
  const tecla = (ev) => { if (['Escape', ' ', 'Enter'].includes(ev.key)) { ev.preventDefault(); terminar(); } };
  addEventListener('keydown', tecla);
  capa.addEventListener('click', terminar);
  pedido = requestAnimationFrame(cuadro);
  return terminar;
}
