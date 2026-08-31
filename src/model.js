// Pure simulation core. No DOM, no timers, no randomness unless a source is passed in.
// Everything here is unit-testable; keep it that way.

export const CAP = 60;          // magnitude at which the relationship is called ruptured
export const POLARIZED = 12;    // separation at which we call the two parties opposites (CAP/5)
export const MAX_HISTORY = 600; // samples retained for the chart
export const HORIZON = 4000;    // furthest ahead the arrival clock will look

/** Slider bounds, in one place, so the UI and the URL parser cannot disagree. */
export const PARAM_RANGES = {
  ga: [0, 0.5, 0.01],
  gb: [0, 0.5, 0.01],
  m: [0, 1.5, 0.05],
  ra: [0, 0.4, 0.01],
  rb: [0, 0.4, 0.01],
  n: [0, 0.3, 0.01],
  blend: [0, 1, 0.02],
  s0: [0, 6, 0.05],
  d0: [0, 4, 0.001]
};

export const defaultParams = () => ({
  mode: 'sym',        // 'sym' | 'comp' | 'mix'
  blend: 0.5,         // share of complementary dynamics when mode === 'mix'
  ga: 0.24,           // A's responsiveness to B
  gb: 0.24,           // B's responsiveness to A
  m: 0.5,             // margin: how far each tries to go beyond the other (rivalry only)
  ra: 0.06,           // A's restraint: pull back toward baseline
  rb: 0.06,           // B's restraint
  n: 0.02,            // noise amplitude
  s0: 1.0,            // starting joint level, a + b
  d0: 0.2,            // starting difference, a - b — the seed a runaway amplifies
  seed: 1,            // PRNG seed, so a surprising run can be reproduced
  reading: 'default'  // which vocabulary the two collective quantities are read in
});

export const createState = (params = defaultParams()) => {
  const a = (params.s0 + params.d0) / 2;
  const b = (params.s0 - params.d0) / 2;
  return {
    a, b,
    t: 0,
    history: [{ a, b }],
    ruptures: [],
    ruptured: false,
    reached: { sum: null, dif: null } // exchange at which each quantity hit POLARIZED
  };
};

/** Deterministic PRNG (mulberry32). Same seed, same run — that is the whole point. */
export function makeRng(seed) {
  let s = (Math.floor(Math.abs(seed)) >>> 0) || 0x9E3779B9;
  return function rng() {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Weight of each schismogenetic pattern for the current mode.
 * ws = symmetrical (rivalry, matching + margin), wc = complementary (dominance, divergence).
 */
export function weights({ mode, blend }) {
  if (mode === 'sym') return { ws: 1, wc: 0 };
  if (mode === 'comp') return { ws: 0, wc: 1 };
  return { ws: 1 - blend, wc: blend };
}

/**
 * Advance one exchange, mutating state.
 *
 *   d  = a - b
 *   a' = a + ws*ga*(m - d) + wc*ga*( d) - ra*a + noise
 *   b' = b + ws*gb*(m + d) + wc*gb*(-d) - rb*b + noise
 *
 * The symmetrical term closes the gap and lifts both by the margin; the complementary
 * term widens the gap and is level-neutral. See README for the closed-form consequences.
 *
 * @param {object} state   mutated in place
 * @param {object} params
 * @param {function} rng   returns [0,1); inject makeRng(seed) for a reproducible run
 */
export function step(state, params, rng = Math.random) {
  const { ws, wc } = weights(params);
  const noise = () => (rng() * 2 - 1) * params.n;
  const d = state.a - state.b;

  const da = ws * params.ga * (params.m - d) + wc * params.ga * d - params.ra * state.a + noise();
  const db = ws * params.gb * (params.m + d) - wc * params.gb * d - params.rb * state.b + noise();

  const wasFine = Math.abs(state.a) < CAP && Math.abs(state.b) < CAP;
  state.a = clamp(state.a + da);
  state.b = clamp(state.b + db);
  state.t += 1;

  if (wasFine && (Math.abs(state.a) >= CAP || Math.abs(state.b) >= CAP)) {
    state.ruptures.push(state.t);
    state.ruptured = true;
  }

  if (state.reached.sum === null && Math.abs(state.a + state.b) >= POLARIZED) state.reached.sum = state.t;
  if (state.reached.dif === null && Math.abs(state.a - state.b) >= POLARIZED) state.reached.dif = state.t;

  state.history.push({ a: state.a, b: state.b });
  if (state.history.length > MAX_HISTORY) state.history.shift();
  return state;
}

const clamp = v => Math.max(-CAP, Math.min(CAP, v));

/**
 * The exact linear map that `step` performs on the two collective quantities,
 * with noise off and below the cap:
 *
 *   sum = a + b   how far the pair has escalated
 *   dif = a - b   how far their roles have differentiated
 *
 *   sum' = m11*sum + m12*dif + c1
 *   dif' = m21*sum + m22*dif + c2
 *
 * Writing g = (ga+gb)/2, gd = (ga-gb)/2, r = (ra+rb)/2, rd = (ra-rb)/2, k = wc - ws:
 *
 *   m11 = 1 - r            m12 = 2*gd*k - rd        c1 = 2*ws*g*m
 *   m21 = -rd              m22 = 1 + 2*g*k - r      c2 = 2*ws*gd*m
 *
 * With equal responsiveness and equal restraint the off-diagonal vanishes and the two
 * quantities are independent — the textbook case in the README. Unequal restraint is
 * what couples them: shared escalation then leaks into the role gap.
 */
export function transition(params) {
  const { ws, wc } = weights(params);
  const g = (params.ga + params.gb) / 2;
  const gd = (params.ga - params.gb) / 2;
  const r = (params.ra + params.rb) / 2;
  const rd = (params.ra - params.rb) / 2;
  const k = wc - ws;
  const zed = v => (v === 0 ? 0 : v); // keep -0 out of the arithmetic and the tests
  return {
    m11: 1 - r,
    m12: zed(2 * gd * k - rd),
    m21: zed(-rd),
    m22: 1 + 2 * g * k - r,
    c1: zed(2 * ws * g * params.m),
    c2: zed(2 * ws * gd * params.m)
  };
}

const originOf = params => ({ sum: params.s0, dif: params.d0 });

/** Iterate the exact noiseless map. Cheap enough to run a few thousand steps per frame. */
export function project(params, ticks, origin = originOf(params)) {
  const T = transition(params);
  let sum = origin.sum;
  let dif = origin.dif;
  for (let i = 0; i < ticks; i++) {
    const s = T.m11 * sum + T.m12 * dif + T.c1;
    const d = T.m21 * sum + T.m22 * dif + T.c2;
    sum = s;
    dif = d;
    if (!Number.isFinite(sum) || !Number.isFinite(dif)) break;
  }
  return { sum, dif };
}

/**
 * How many exchanges until each quantity reaches `threshold`, with noise off.
 * null means it never gets there — it settles, or the horizon runs out first.
 */
export function arrival(params, origin = originOf(params), threshold = POLARIZED, horizon = HORIZON) {
  const T = transition(params);
  let sum = origin.sum;
  let dif = origin.dif;
  const out = { sum: null, dif: null };
  if (Math.abs(sum) >= threshold) out.sum = 0;
  if (Math.abs(dif) >= threshold) out.dif = 0;
  for (let t = 1; t <= horizon && (out.sum === null || out.dif === null); t++) {
    const s = T.m11 * sum + T.m12 * dif + T.c1;
    const d = T.m21 * sum + T.m22 * dif + T.c2;
    sum = s;
    dif = d;
    if (!Number.isFinite(sum) || !Number.isFinite(dif)) break;
    if (out.sum === null && Math.abs(sum) >= threshold) out.sum = t;
    if (out.dif === null && Math.abs(dif) >= threshold) out.dif = t;
  }
  return out;
}

/**
 * What starting ten times closer together buys you, in exchanges.
 * In an exponential runaway the answer is a constant — ln(10)/ln(rate) — independent of
 * how small the seed already is. This is the whole moral of the thing: the seed sets the
 * clock, the coupling decides the outcome.
 */
export function seedSensitivity(params, key = polesKey(params)) {
  const now = arrival(params)[key];
  const closer = arrival({ ...params, s0: params.s0 / 10, d0: params.d0 / 10 })[key];
  if (now === null || closer === null) return null;
  return closer - now;
}

const EPS = 1e-9;

/**
 * The dominant eigenvalue of the map, and which of the two quantities its eigenvector
 * actually moves. A runaway travels along that eigenvector, so a quantity the eigenvector
 * leaves alone does not run away even when the system as a whole does — that is how an
 * upper-triangular map (unequal responsiveness, equal restraint) can climb without forking.
 */
function dominant(T) {
  const tr = T.m11 + T.m22;
  const det = T.m11 * T.m22 - T.m12 * T.m21;
  const disc = (tr * tr) / 4 - det;
  if (disc < 0) {
    // A complex pair spirals: both quantities carry it.
    return { growth: Math.sqrt(Math.max(det, 0)), inSum: true, inDif: true };
  }
  const root = Math.sqrt(disc);
  const hi = tr / 2 + root;
  const lo = tr / 2 - root;
  const lam = Math.abs(hi) >= Math.abs(lo) ? hi : lo;

  let vs, vd;
  if (Math.abs(T.m12) > EPS) { vs = T.m12; vd = lam - T.m11; }
  else if (Math.abs(T.m21) > EPS) { vs = lam - T.m22; vd = T.m21; }
  else { vs = Math.abs(lam - T.m11) <= EPS ? 1 : 0; vd = Math.abs(lam - T.m22) <= EPS ? 1 : 0; }

  const norm = Math.max(Math.abs(vs), Math.abs(vd), EPS);
  return { growth: Math.abs(lam), inSum: Math.abs(vs) / norm > 1e-6, inDif: Math.abs(vd) / norm > 1e-6 };
}

const grows = (near, far) =>
  !Number.isFinite(far) || Math.abs(far) > Math.max(1e-6, Math.abs(near) * 1.4);

/**
 * Closed-form behaviour of the two quantities. `origin` lets the readouts speak about the
 * run in progress rather than about its starting point.
 */
export function analysis(params, origin = originOf(params)) {
  const { ws, wc } = weights(params);
  const T = transition(params);
  const g = (params.ga + params.gb) / 2;
  const r = (params.ra + params.rb) / 2;
  const { growth, inSum, inDif } = dominant(T);

  // Fixed point (I - M)x = c, when there is one.
  const p11 = 1 - T.m11, p12 = -T.m12, p21 = -T.m21, p22 = 1 - T.m22;
  const pdet = p11 * p22 - p12 * p21;
  const settled = Math.abs(pdet) > 1e-12
    ? { sum: (p22 * T.c1 - p12 * T.c2) / pdet + 0, dif: (p11 * T.c2 - p21 * T.c1) / pdet + 0 }
    : null;

  // A quantity that starts at exactly zero, is not driven, and is not fed by the other cannot
  // move — but only with the noise off. Nothing stays at exactly zero once the dice are in.
  const sumStuck = origin.sum === 0 && T.c1 === 0 && T.m12 === 0 && params.n === 0;
  const difStuck = origin.dif === 0 && T.c2 === 0 && T.m21 === 0 && params.n === 0;

  let climbing, forking;
  if (growth < 1 - EPS) {
    climbing = forking = false;                 // everything converges on the fixed point
  } else if (growth > 1 + EPS) {
    climbing = inSum && !sumStuck;              // exponential runaway along the eigenvector
    forking = inDif && !difStuck;
  } else {
    // Marginal: the constant term drives linear growth, slow enough to measure directly.
    const near = project(params, 1000, origin);
    const far = project(params, 2000, origin);
    climbing = grows(near.sum, far.sum);
    forking = grows(near.dif, far.dif);
  }

  return {
    ws, wc, g, r, growth, settled,
    sumRate: T.m11,
    difRate: T.m22,
    coupled: T.m12 !== 0 || T.m21 !== 0,
    climbing,
    forking,
    // Where a quantity ends up, but only when it ends up anywhere at all.
    sumSettlesAt: !climbing && settled ? settled.sum : Infinity,
    difSettlesAt: !forking && settled ? settled.dif : Infinity
  };
}

/**
 * Which quantity the arrival clock should speak about: the one this reading nominates,
 * unless it is the other one that actually runs away. An arms race is a runaway in the
 * level, a dominance pair is a runaway in the gap, and the same reading covers both.
 */
export function polesKey(params) {
  const nominated = (readings[params.reading] || readings.default).poles;
  const other = nominated === 'sum' ? 'dif' : 'sum';
  const when = arrival(params);
  if (when[nominated] !== null) return nominated;
  if (when[other] !== null) return other;
  // Neither gets there. Speak about whichever one actually goes somewhere.
  const { sumSettlesAt, difSettlesAt } = analysis(params);
  const ends = { sum: sumSettlesAt, dif: difSettlesAt };
  return Math.abs(ends[other]) > Math.abs(ends[nominated]) ? other : nominated;
}

/** Which of Bateson's cases the current run is in. Drives the plain-language readout. */
export function diagnose(state, params) {
  const { climbing, forking } = analysis(params, { sum: state.a + state.b, dif: state.a - state.b });
  if (state.ruptured) return 'schism';
  if (params.n === 0 && Math.abs(state.a - state.b) < 1e-12 && weights(params).wc > 0 && !climbing) return 'inert';
  if (climbing && forking) return 'both';
  if (climbing) return 'escalation';
  if (forking && params.mode !== 'sym') return 'differentiation';
  if (!climbing && !forking) {
    const key = polesKey(params);
    const end = analysis(params)[key === 'sum' ? 'sumSettlesAt' : 'difSettlesAt'];
    return Math.abs(end) >= POLARIZED ? 'ceiling' : 'held';
  }
  return 'drifting';
}

/**
 * A reading is a vocabulary, not a model change: the same two numbers, named for the
 * situation you are looking at. `poles` says which quantity growing means the two parties
 * have become opposites — for rival parties that is the distance between them (the sum),
 * for a dominance pair it is the gap in their roles (the difference).
 */
export const readings = {
  default: {
    a: 'A',
    b: 'B',
    what: 'intensity of behaviour',
    sum: {
      label: 'Joint level (A + B)', short: 'the joint level', from: 'level',
      question: 'How long until it is out of hand'
    },
    dif: {
      label: 'Role gap (A − B)', short: 'the role gap', from: 'gap',
      question: 'How long until their roles are opposites'
    },
    poles: 'dif',
    tick: { unit: 'exchange', plural: 'exchanges' }
  },
  politics: {
    a: 'Party A',
    b: 'Party B',
    what: 'distance from the political centre',
    sum: {
      label: 'Distance between the parties', short: 'the distance between them', from: 'level',
      question: 'How long until the parties are at opposite poles'
    },
    dif: {
      label: 'Asymmetry (A − B)', short: 'the asymmetry', from: 'gap',
      question: 'How long until one party has gone much further than the other'
    },
    poles: 'sum',
    mirror: true, // the two parties leave the centre in opposite directions
    tick: { unit: 'election cycle', plural: 'election cycles', years: 2 }
  },
  couple: {
    a: 'Partner A',
    b: 'Partner B',
    what: 'intensity in the exchange',
    sum: {
      label: 'Heat in the exchange', short: 'the heat', from: 'level',
      question: 'How long until it is a shouting match'
    },
    dif: {
      label: 'Pursuer–distancer gap', short: 'the pursuer–distancer gap', from: 'gap',
      question: 'How long until the two roles are set'
    },
    poles: 'dif',
    tick: { unit: 'exchange', plural: 'exchanges' }
  }
};

export const presets = [
  {
    group: 'Bateson',
    name: 'Arms race',
    mode: 'sym', ga: 0.30, gb: 0.30, m: 0.7, ra: 0.01, rb: 0.01, n: 0.03, blend: 0.5,
    s0: 1.0, d0: 0.2, reading: 'default',
    note: 'Each side answers the other and adds a margin. Nothing here is about who is ahead — ' +
      'the gap stays small while the level climbs, which is what makes it a rivalry rather than a rout.'
  },
  {
    group: 'Bateson',
    name: 'Boasts, checked',
    mode: 'sym', ga: 0.30, gb: 0.30, m: 0.7, ra: 0.22, rb: 0.22, n: 0.03, blend: 0.5,
    s0: 1.0, d0: 0.2, reading: 'default',
    note: 'The same rivalry with something pulling both parties back. Restraint does not slow the ' +
      'climb so much as decide where it stops: the level settles at 2·ws·g·m / r and stays there.'
  },
  {
    group: 'Bateson',
    name: 'Care and helplessness',
    mode: 'comp', ga: 0.20, gb: 0.20, m: 0.0, ra: 0.05, rb: 0.05, n: 0.02, blend: 0.5,
    s0: 1.0, d0: 0.2, reading: 'default',
    note: 'Bateson’s nurturance–dependence pair. Each response calls out its opposite, so a ' +
      'difference of 0.2 is enough to seed a fork; neither party has to intend it.'
  },
  {
    group: 'Bateson',
    name: 'Unequal partners',
    mode: 'comp', ga: 0.28, gb: 0.12, m: 0.0, ra: 0.06, rb: 0.06, n: 0.02, blend: 0.5,
    s0: 1.0, d0: 0.2, reading: 'default',
    note: 'One party reads the other more than they are read. The fork still happens; what changes ' +
      'is that the level moves too, because unequal responsiveness couples the two quantities.'
  },
  {
    group: 'Bateson',
    name: 'Naven',
    mode: 'mix', ga: 0.26, gb: 0.26, m: 0.5, ra: 0.10, rb: 0.10, n: 0.04, blend: 0.42,
    s0: 1.0, d0: 0.2, reading: 'default',
    note: 'Bateson’s reading of the Iatmul naven ceremony: the two patterns run at once and each ' +
      'checks the other. Push the share of dominance past about 0.55 and the fork wins anyway.'
  },
  {
    group: 'Where you might meet it',
    name: 'Two parties, norms intact',
    mode: 'sym', ga: 0.30, gb: 0.30, m: 0.9, ra: 0.10, rb: 0.10, n: 0.03, blend: 0.5,
    s0: 0.4, d0: 0.05, reading: 'politics',
    note: 'Two parties starting near the centre, each answering the other’s move with a slightly ' +
      'bigger one. Restraint here is everything that used to make going further costly. It does not ' +
      'stop the widening; it puts a ceiling on it, and the parties sit at that ceiling.'
  },
  {
    group: 'Where you might meet it',
    name: 'Two parties, norms gone',
    mode: 'sym', ga: 0.30, gb: 0.30, m: 0.9, ra: 0.015, rb: 0.015, n: 0.03, blend: 0.5,
    s0: 0.4, d0: 0.05, reading: 'politics',
    note: 'The same two parties, equally responsive and no angrier — only the restraint has dropped. ' +
      'Restraint still works — the distance does stop — but it now stops nearly seven times further ' +
      'out, well past the point where the two parties are opposites. A weak brake is not a brake.'
  },
  {
    group: 'Where you might meet it',
    name: 'Asymmetric polarisation',
    mode: 'sym', ga: 0.30, gb: 0.30, m: 0.9, ra: 0.00, rb: 0.06, n: 0.03, blend: 0.5,
    s0: 0.4, d0: 0.05, reading: 'politics',
    note: 'One party keeps its internal brakes, the other loses them. Because rivalry pulls hard on ' +
      'the gap, the restrained party is dragged most of the way regardless: what survives is a real ' +
      'but modest asymmetry on top of a large shared movement.'
  },
  {
    group: 'Where you might meet it',
    name: 'Pursuer and distancer',
    mode: 'comp', ga: 0.22, gb: 0.16, m: 0.0, ra: 0.04, rb: 0.04, n: 0.02, blend: 0.5,
    s0: 0.6, d0: 0.1, reading: 'couple',
    note: 'Watzlawick’s complementary pair: one presses for contact, one withdraws, and each ' +
      'response is the reason for the other. Neither is causing it — the pattern is.'
  }
];

/* ---- sharing ---- */

const NUMERIC = Object.keys(PARAM_RANGES);
const clampTo = (v, [lo, hi]) => Math.max(lo, Math.min(hi, v));
const trim = v => Number(v.toFixed(4));

/** Params as a URL fragment, omitting anything left at its default. */
export function encodeParams(params) {
  const base = defaultParams();
  const out = [];
  for (const key of Object.keys(base)) {
    const v = params[key];
    if (v === undefined || v === base[key]) continue;
    out.push(`${key}=${typeof v === 'number' ? trim(v) : encodeURIComponent(v)}`);
  }
  return out.join('&');
}

/** Params from a URL fragment. Anything unrecognised or out of range is discarded. */
export function decodeParams(str, base = defaultParams()) {
  const out = { ...base };
  for (const pair of String(str || '').replace(/^#/, '').split('&')) {
    if (!pair) continue;
    const i = pair.indexOf('=');
    if (i < 0) continue;
    const key = pair.slice(0, i);
    const raw = decodeURIComponent(pair.slice(i + 1));
    if (NUMERIC.includes(key)) {
      const v = Number(raw);
      if (Number.isFinite(v)) out[key] = clampTo(v, PARAM_RANGES[key]);
    } else if (key === 'mode') {
      if (['sym', 'comp', 'mix'].includes(raw)) out.mode = raw;
    } else if (key === 'reading') {
      if (Object.prototype.hasOwnProperty.call(readings, raw)) out.reading = raw;
    } else if (key === 'seed') {
      const v = Math.trunc(Math.abs(Number(raw)));
      if (Number.isFinite(v)) out.seed = Math.min(999999, v);
    }
  }
  return out;
}
