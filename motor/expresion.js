// Expresiones que escribe el usuario (el lado derecho f(t, y) de una EDO): análisis seguro, sin eval,
// a un árbol que se evalúa como función y que se imprime como LaTeX para el rótulo de la escena.

const FUNCIONES = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, ln: Math.log, log: Math.log,
  sqrt: Math.sqrt, abs: Math.abs, arctan: Math.atan,
};
const CONSTANTES = { pi: Math.PI, e: Math.E };
const LATEX_FN = { sin: '\\sin', cos: '\\cos', tan: '\\tan', ln: '\\ln', log: '\\ln', arctan: '\\arctan' };

/** a^b con raíz real para bases negativas y exponentes p/q con q impar (y^{2/3} de la Conferencia 4). */
export function potencia(a, b) {
  if (a >= 0 || Number.isInteger(b)) return a ** b;
  for (let q = 3; q <= 15; q += 2) {
    const p = Math.round(b * q);
    if (Math.abs(b * q - p) < 1e-9) return (p % 2 ? -1 : 1) * Math.abs(a) ** b;
  }
  return NaN;
}

function trocear(texto, nombres) {
  const fichas = [];
  const conocidos = [...nombres].sort((a, b) => b.length - a.length);
  let i = 0;
  while (i < texto.length) {
    const c = texto[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      const m = /^(\d+\.?\d*|\.\d+)/.exec(texto.slice(i));
      if (!m) throw new Error(`número mal escrito cerca de «${texto.slice(i, i + 4)}»`);
      fichas.push({ t: 'num', v: Number(m[1]) }); i += m[1].length; continue;
    }
    if (/[a-zA-Zα-ωµ]/.test(c)) {
      // una tira de letras se parte en nombres conocidos, el más largo primero («ty» = t·y, «sin» = sin)
      const m = /^[a-zA-Zα-ωµ]+/.exec(texto.slice(i))[0];
      let j = 0;
      while (j < m.length) {
        const n = conocidos.find((k) => m.startsWith(k, j));
        if (!n) throw new Error(`no conozco «${m.slice(j)}»`);
        fichas.push({ t: 'id', v: n }); j += n.length;
      }
      i += m.length; continue;
    }
    if ('+-*/^()·×−'.includes(c)) { fichas.push({ t: 'op', v: { '·': '*', '×': '*', '−': '-' }[c] ?? c }); i++; continue; }
    throw new Error(`símbolo no permitido: «${c}»`);
  }
  return fichas;
}

function analizar(fichas) {
  let i = 0;
  const ver = () => fichas[i], es = (v) => fichas[i]?.t === 'op' && fichas[i].v === v;
  const tomar = (v) => { if (!es(v)) throw new Error(v === ')' ? 'falta cerrar un paréntesis' : `se esperaba «${v}»`); i++; };
  const suma = () => {
    let a = producto();
    while (es('+') || es('-')) { const op = fichas[i++].v; a = { op, a, b: producto() }; }
    return a;
  };
  const empiezaFactor = () => { const f = ver(); return f && (f.t === 'num' || f.t === 'id' || (f.t === 'op' && f.v === '(')); };
  const producto = () => {
    let a = unario();
    for (;;) {
      if (es('*') || es('/')) { const op = fichas[i++].v; a = { op, a, b: unario() }; }
      else if (empiezaFactor()) a = { op: '*', a, b: unario(), implicito: true };
      else return a;
    }
  };
  const unario = () => {
    if (es('-')) { i++; return { op: 'neg', a: unario() }; }
    if (es('+')) { i++; return unario(); }
    return pot();
  };
  const pot = () => {
    const base = atomo();
    if (es('^')) { i++; return { op: '^', a: base, b: unario() }; }
    return base;
  };
  const atomo = () => {
    const f = ver();
    if (!f) throw new Error('la expresión está incompleta');
    if (f.t === 'num') { i++; return { num: f.v }; }
    if (f.t === 'id') {
      i++;
      if (FUNCIONES[f.v]) {
        if (!es('(')) throw new Error(`escribe ${f.v}(…) con paréntesis`);
        i++; const a = suma(); tomar(')');
        return { fn: f.v, a };
      }
      return { id: f.v };
    }
    if (es('(')) { i++; const a = suma(); tomar(')'); return { par: a }; }
    throw new Error(`no esperaba «${f.v}»`);
  };
  const arbol = suma();
  if (i < fichas.length) throw new Error(fichas[i].v === ')' ? 'sobra un paréntesis' : `no esperaba «${fichas[i].v}»`);
  return arbol;
}

function evaluador(n, indice) {
  if ('num' in n) { const v = n.num; return () => v; }
  if ('par' in n) return evaluador(n.par, indice);
  if ('id' in n) {
    if (n.id in indice) { const k = indice[n.id]; return (v) => v[k]; }
    const c = CONSTANTES[n.id]; return () => c;
  }
  if ('fn' in n) { const g = FUNCIONES[n.fn], a = evaluador(n.a, indice); return (v) => g(a(v)); }
  const a = evaluador(n.a, indice), b = n.b && evaluador(n.b, indice);
  switch (n.op) {
    case 'neg': return (v) => -a(v);
    case '+': return (v) => a(v) + b(v);
    case '-': return (v) => a(v) - b(v);
    case '*': return (v) => a(v) * b(v);
    case '/': return (v) => a(v) / b(v);
    case '^': return (v) => potencia(a(v), b(v));
  }
  throw new Error('nodo desconocido');
}

// ---------------------------------------------------------------- LaTeX

const sinPar = (n) => ('par' in n ? sinPar(n.par) : n);
const PREC = { '+': 1, '-': 1, '*': 2, '/': 3, neg: 2, '^': 4 };
const prec = (n) => { n = sinPar(n); return 'op' in n ? PREC[n.op] : 5; };
const empiezaConNumero = (n) => { n = sinPar(n); return 'num' in n || (n.op && n.op !== 'neg' && empiezaConNumero(n.a)); };

function latex(n) {
  n = sinPar(n);
  if ('num' in n) return String(n.num);
  if ('id' in n) return n.id === 'pi' ? '\\pi' : n.id;
  if ('fn' in n) {
    if (n.fn === 'sqrt') return `\\sqrt{${latex(n.a)}}`;
    if (n.fn === 'abs') return `\\left|${latex(n.a)}\\right|`;
    if (n.fn === 'exp') return `e^{${latex(n.a)}}`;
    return `${LATEX_FN[n.fn]}(${latex(n.a)})`;
  }
  const envolver = (x, minimo) => (prec(x) < minimo ? `(${latex(x)})` : latex(x));
  switch (n.op) {
    case 'neg': return `-${envolver(n.a, 2)}`;
    case '+': return `${latex(n.a)}+${latex(n.b)}`;
    case '-': return `${latex(n.a)}-${envolver(n.b, 2)}`;
    case '/': return `\\frac{${latex(n.a)}}{${latex(n.b)}}`;
    case '*': {
      const izq = envolver(n.a, 2), der = envolver(n.b, 2);
      // yuxtaposición salvo que se junten dos números (2·3) o el factor derecho empiece con número
      return empiezaConNumero(n.b) && !/^\(/.test(der) ? `${izq}\\cdot ${der}` : `${izq}${der}`;
    }
    case '^': {
      const b = sinPar(n.a);
      if ('fn' in b && LATEX_FN[b.fn]) return `${LATEX_FN[b.fn]}^{${latex(n.b)}}(${latex(b.a)})`;
      return `${'num' in b || 'id' in b ? latex(b) : `(${latex(b)})`}^{${latex(n.b)}}`;
    }
  }
  return '';
}

/**
 * Compila `texto` con las variables `vars` (por orden: f(t, y)) y los parámetros `params` (argumentos
 * siguientes). Devuelve { f, latex } o { error } con un mensaje para mostrar junto a la entrada.
 */
export function compilar(texto, vars = ['t', 'y'], params = []) {
  try {
    if (!String(texto).trim()) throw new Error('escribe una expresión');
    const nombres = [...Object.keys(FUNCIONES), ...Object.keys(CONSTANTES), ...vars, ...params];
    const arbol = analizar(trocear(String(texto), nombres));
    const indice = Object.fromEntries([...vars, ...params].map((n, k) => [n, k]));
    const ev = evaluador(arbol, indice);
    return { f: (...v) => ev(v), latex: latex(arbol) };
  } catch (e) {
    return { error: e.message };
  }
}
