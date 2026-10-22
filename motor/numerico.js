// Numérica de la biblioteca: RK4 adaptativo (curvas «exactas» de las escenas), Euler (el método de la
// Conferencia 4), raíces de f (equilibrios) y clasificación de equilibrios por el signo de f.

const finito = (...xs) => xs.every(Number.isFinite);

/**
 * RK4 con control de paso por duplicación. Integra de t0 a t1 (hacia atrás si t1 < t0).
 * Se detiene si |y| supera `limite` («explota») o si el paso necesario se vuelve diminuto («singular»).
 * Devuelve los puntos aceptados: {t[], y[], corte}.
 */
export function rk4(f, t0, y0, t1, { h = 0.02, limite = 1e6, tol = 1e-9 } = {}) {
  const s = Math.sign(t1 - t0) || 1, hMin = 1e-7;
  const T = [t0], Y = [y0];
  let t = t0, y = y0, paso = Math.min(h, Math.abs(t1 - t0)) * s, corte = null;
  const uno = (t, y, dt) => {
    const k1 = f(t, y), k2 = f(t + dt / 2, y + (dt * k1) / 2), k3 = f(t + dt / 2, y + (dt * k2) / 2), k4 = f(t + dt, y + dt * k3);
    return finito(k1, k2, k3, k4) ? y + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4) : NaN;
  };
  if (!finito(y0, f(t0, y0))) return { t: T, y: Y, corte: 'singular' };
  while (s * (t1 - t) > 1e-12) {
    if (s * (t + paso - t1) > 0) paso = t1 - t;
    const grande = uno(t, y, paso);
    const medio = uno(t, y, paso / 2), fino = finito(medio) ? uno(t + paso / 2, medio, paso / 2) : NaN;
    const err = Math.abs(grande - fino);
    if (!finito(grande, fino) || err > tol * (1 + Math.abs(fino)) * 1e3) {
      // sin poder avanzar: si |y| ya es enorme la solución explota; si no, f es singular ahí
      if (Math.abs(paso) / 2 < hMin) { corte = Math.abs(y) > 1e3 ? 'explota' : 'singular'; break; }
      paso /= 2;
      continue;
    }
    t += paso; y = fino;
    if (Math.abs(y) > limite) { corte = 'explota'; break; }
    T.push(t); Y.push(y);
    if (err < tol * (1 + Math.abs(y))) paso = s * Math.min(Math.abs(paso) * 2, h);
  }
  return { t: T, y: Y, corte };
}

/** RK4 de paso fijo para sistemas Y' = F(t, Y) (presa-depredador). */
export function rk4Sistema(F, t0, Y0, t1, { h = 0.005 } = {}) {
  const n = Math.max(1, Math.ceil(Math.abs(t1 - t0) / h)), dt = (t1 - t0) / n;
  const T = [t0], Ys = [Y0.slice()];
  let Y = Y0.slice(), t = t0;
  const mas = (A, B, c) => A.map((a, i) => a + c * B[i]);
  for (let i = 0; i < n; i++) {
    const k1 = F(t, Y), k2 = F(t + dt / 2, mas(Y, k1, dt / 2)), k3 = F(t + dt / 2, mas(Y, k2, dt / 2)), k4 = F(t + dt, mas(Y, k3, dt));
    Y = Y.map((y, j) => y + (dt / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    t = t0 + (i + 1) * dt;
    if (!finito(...Y)) break;
    T.push(t); Ys.push(Y);
  }
  return { t: T, Y: Ys };
}

/** Método de Euler: y_{k+1} = y_k + f(t_k, y_k)·Δt, n pasos. */
export function euler(f, t0, y0, dt, n) {
  const T = [t0], Y = [y0];
  for (let k = 0; k < n; k++) {
    const yk = Y[k], tk = T[k], m = f(tk, yk);
    if (!finito(m)) break;
    // t_k = t_0 + k·Δt (sin acumular errores de redondeo: 0.1 + 0.1 + 0.1 ≠ 0.3)
    T.push(Number((t0 + (k + 1) * dt).toPrecision(12)));
    Y.push(yk + m * dt);
  }
  return { t: T, y: Y };
}

/** Derivada por diferencia centrada. */
export const deriv = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);

/** Raíces de g en [a, b]: cambios de signo (sin polos) y raíces dobles (mínimos de |g| que tocan 0). */
export function raices(g, a, b, { n = 400 } = {}) {
  const xs = Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n), gs = xs.map(g), r = [];
  const bisecar = (lo, hi) => {
    let glo = g(lo);
    for (let i = 0; i < 80; i++) {
      const m = (lo + hi) / 2, gm = g(m);
      if (gm === 0) return m;
      if (Math.sign(gm) === Math.sign(glo)) { lo = m; glo = gm; } else hi = m;
    }
    return (lo + hi) / 2;
  };
  const minimizar = (lo, hi) => {   // sección áurea sobre |g|
    const fi = (Math.sqrt(5) - 1) / 2;
    for (let i = 0; i < 100; i++) {
      const c = hi - fi * (hi - lo), d = lo + fi * (hi - lo);
      if (Math.abs(g(c)) < Math.abs(g(d))) hi = d; else lo = c;
    }
    return (lo + hi) / 2;
  };
  const escala = Math.max(1e-12, ...gs.filter(Number.isFinite).map(Math.abs));
  for (let i = 0; i < n; i++) {
    const [g0, g1] = [gs[i], gs[i + 1]];
    if (!finito(g0, g1)) continue;
    if (g0 === 0) { r.push(xs[i]); continue; }
    if (Math.sign(g0) !== Math.sign(g1) && g1 !== 0) {
      const x = bisecar(xs[i], xs[i + 1]);
      // un polo también cambia de signo: allí |g| no se acerca a 0
      if (Math.abs(g(x)) < 1e-6 * escala) r.push(x);
    } else if (i > 0 && finito(gs[i - 1]) && Math.abs(g0) < Math.abs(gs[i - 1]) && Math.abs(g0) <= Math.abs(g1)) {
      const x = minimizar(xs[i - 1], xs[i + 1]);
      if (Math.abs(g(x)) < 1e-9) r.push(x);
    }
  }
  if (gs[n] === 0) r.push(b);
  return r.sort((p, q) => p - q).filter((x, i, v) => i === 0 || x - v[i - 1] > 1e-6);
}

/** Tipo de un equilibrio y0 de y' = f(y) según el signo de f a cada lado (Conferencia 5). */
export function clasificar(f, y0, delta = 1e-4) {
  const abajo = Math.sign(f(y0 - delta)), arriba = Math.sign(f(y0 + delta));
  if (abajo > 0 && arriba < 0) return 'sumidero';
  if (abajo < 0 && arriba > 0) return 'fuente';
  return 'nodo';
}
