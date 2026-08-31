// Pure simulation core. No DOM, no timers, no randomness unless a source is passed in.
// Everything here is unit-testable; keep it that way.

export const CAP = 60;          // magnitude at which the relationship is called ruptured
export const MAX_HISTORY = 600; // samples retained for the chart

export const defaultParams = () => ({
  mode: 'sym',   // 'sym' | 'comp' | 'mix'
  blend: 0.5,    // share of complementary dynamics when mode === 'mix'
  ga: 0.24,      // A's responsiveness to B
  gb: 0.24,      // B's responsiveness to A
  m: 0.5,        // margin: how far each tries to go beyond the other (rivalry only)
  r: 0.06,       // restraint: pull back toward baseline
  n: 0.02        // noise amplitude
});

export const createState = () => ({
  a: 0.6,
  b: 0.4,        // starts slightly asymmetric so complementary runaway has something to amplify
  t: 0,
  history: [{ a: 0.6, b: 0.4 }],
  ruptures: [],
  ruptured: false
});

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
 *   a' = a + ws*ga*(m - d) + wc*ga*( d) - r*a + noise
 *   b' = b + ws*gb*(m + d) + wc*gb*(-d) - r*b + noise
 *
 * The symmetrical term closes the gap and lifts both by the margin; the complementary
 * term widens the gap and is level-neutral. See README for the closed-form consequences.
 *
 * @param {object} state   mutated in place
 * @param {object} params
 * @param {function} rng   returns [0,1); inject a seeded source in tests
 */
export function step(state, params, rng = Math.random) {
  const { ws, wc } = weights(params);
  const noise = () => (rng() * 2 - 1) * params.n;
  const d = state.a - state.b;

  const da = ws * params.ga * (params.m - d) + wc * params.ga * d - params.r * state.a + noise();
  const db = ws * params.gb * (params.m + d) - wc * params.gb * d - params.r * state.b + noise();

  const wasFine = Math.abs(state.a) < CAP && Math.abs(state.b) < CAP;
  state.a = clamp(state.a + da);
  state.b = clamp(state.b + db);
  state.t += 1;

  if (wasFine && (Math.abs(state.a) >= CAP || Math.abs(state.b) >= CAP)) {
    state.ruptures.push(state.t);
    state.ruptured = true;
  }

  state.history.push({ a: state.a, b: state.b });
  if (state.history.length > MAX_HISTORY) state.history.shift();
  return state;
}

const clamp = v => Math.max(-CAP, Math.min(CAP, v));

/**
 * Closed-form behaviour of the two collective quantities, for equal responsiveness g.
 * sum = a + b  (how far the pair has escalated)
 * dif = a - b  (how far their roles have differentiated)
 *
 * sum' = sum*(1 - r) + 2*ws*g*m         -> settles at 2*ws*g*m / r, runs away when r == 0
 * dif' = dif*(1 + 2*g*(wc - ws) - r)    -> runs away when 2*g*(wc - ws) > r
 */
export function analysis(params) {
  const { ws, wc } = weights(params);
  const g = (params.ga + params.gb) / 2;
  const sumRate = 1 - params.r;
  const difRate = 1 + 2 * g * (wc - ws) - params.r;
  return {
    ws, wc, g, sumRate, difRate,
    climbing: ws * g * params.m > 0 && params.r < 0.005,
    forking: difRate > 1.0005,
    sumSettlesAt: params.r > 0 ? (2 * ws * g * params.m) / params.r : Infinity
  };
}

/** Which of Bateson's cases the current run is in. Drives the plain-language readout. */
export function diagnose(state, params) {
  const { climbing, forking } = analysis(params);
  if (state.ruptured) return 'schism';
  if (climbing && forking) return 'both';
  if (climbing) return 'escalation';
  if (forking && params.mode !== 'sym') return 'differentiation';
  if (!climbing && !forking) return 'held';
  return 'drifting';
}

export const presets = [
  { name: 'Arms race',             mode: 'sym',  ga: 0.30, gb: 0.30, m: 0.7, r: 0.01, n: 0.03, blend: 0.5 },
  { name: 'Boasts, checked',       mode: 'sym',  ga: 0.30, gb: 0.30, m: 0.7, r: 0.22, n: 0.03, blend: 0.5 },
  { name: 'Care and helplessness', mode: 'comp', ga: 0.20, gb: 0.20, m: 0.0, r: 0.05, n: 0.02, blend: 0.5 },
  { name: 'Unequal partners',      mode: 'comp', ga: 0.28, gb: 0.12, m: 0.0, r: 0.06, n: 0.02, blend: 0.5 },
  { name: 'Naven',                 mode: 'mix',  ga: 0.26, gb: 0.26, m: 0.5, r: 0.10, n: 0.04, blend: 0.42 }
];
