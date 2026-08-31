// N-agent mechanism laboratory. Pure: no DOM, no timers, randomness only through `rng`.
//
// Built to the field guide's method rather than to a bigger version of the dyad:
//   §10.1(1) causes are manipulated, outcomes are measured — there is no "polarisation" control;
//   §10.1(3) complementary roles live on their own dimensions, not as ± on one opinion axis;
//   §10.1(5) ties coevolve, so sorting and exit are representable at all;
//   §18     modules are sparse and switch on one at a time.
//
// The point of the model is that several of these modules produce the same aggregate curve.
// `src/measures.js` is what tells them apart.

import { makeRng } from './model.js';

export const TIES = 6;         // ties held per agent
export const TRAIT_CAP = 30;   // magnitude limit, as in the dyad model

/**
 * Every control is normalised to [0,1] on the §18.1 convention
 * (0 absent, 0.25 weak, 0.5 moderate, 0.75 strong, 1 near the modelled maximum).
 * `gains()` below is the documented transformation into actual rates and radii.
 */
export const CONTROLS = {
  similarity: 1,    // how alike the two groups start (1 = same centroid)
  heterogeneity: 1, // spread inside each starting group
  respond: 1,       // reciprocal response to the other group (symmetrical Bateson)
  margin: 1,        // how far past the other side each tries to go
  damping: 1,       // fatigue, cost, restraint
  complement: 1,    // off-diagonal role response (complementary Bateson)
  assimilate: 1,    // movement toward a contact
  confidence: 1,    // how far away a contact can be and still be listened to
  repel: 1,         // movement away from a contact beyond that radius
  homophily: 1,     // preference for similar partners when rewiring
  rewire: 1,        // rate of dropping and reforming ties
  exit: 1,          // rate at which the least comfortable members leave and are replaced
  drift: 1,         // undirected copying error
  noise: 1
};

export const defaultControls = () => ({
  similarity: 0.9,
  heterogeneity: 0.35,
  respond: 0,
  margin: 0.4,
  damping: 0.1,
  complement: 0,
  assimilate: 0,
  confidence: 0.5,
  repel: 0,
  homophily: 0,
  rewire: 0,
  exit: 0,
  drift: 0,
  noise: 0.02
});

/** The documented mapping from [0,1] controls onto rates, gains and distances. */
export function gains(c) {
  return {
    g: c.respond * 0.5,          // matches the dyad model's ga/gb range
    m: c.margin * 1.5,           // matches the dyad model's m range
    r: c.damping * 0.4,          // matches the dyad model's ra/rb range
    comp: c.complement * 0.5,
    assim: c.assimilate * 0.5,
    radius: c.confidence * 2.5,
    push: c.repel * 0.15,
    rewireP: c.rewire * 0.35,
    exitP: c.exit * 0.12,
    wobble: c.drift * 0.25,
    jitter: c.noise * 0.2,
    spread: c.heterogeneity * 0.7,
    half: (1 - c.similarity) * 1.2 // starting half-distance between the group centroids
  };
}

const clamp = v => Math.max(-TRAIT_CAP, Math.min(TRAIT_CAP, v));

/**
 * @param {object} controls
 * @param {object} opts  { n, seed, interventions: [{ at, control, to }] }
 */
export function createPopulation(controls = defaultControls(), opts = {}) {
  const n = opts.n ?? 240;
  const seed = opts.seed ?? 1;
  const rng = makeRng(seed);
  const G = gains(controls);

  const x = new Float64Array(n);
  const x0 = new Float64Array(n);
  const press = new Float64Array(n);   // role dimension 0: demand, dominance, surveillance
  const yieldd = new Float64Array(n);  // role dimension 1: withdrawal, submission, concealment
  const g = new Uint8Array(n);
  const ties = new Int32Array(n * TIES).fill(-1);

  const gauss = () => (rng() + rng() + rng() + rng() - 2) * 0.7; // cheap, bounded, seeded

  for (let i = 0; i < n; i++) {
    g[i] = i % 2;
    const centre = g[i] === 0 ? G.half : -G.half;
    x[i] = centre + gauss() * G.spread;
    x0[i] = x[i];
    // A small seeded role asymmetry, so the complementary module has something to amplify.
    press[i] = g[i] === 0 ? 0.1 : 0.05;
    yieldd[i] = g[i] === 0 ? 0.05 : 0.1;
  }

  for (let i = 0; i < n; i++) {
    for (let k = 0; k < TIES; k++) {
      let j = Math.floor(rng() * n);
      if (j === i) j = (j + 1) % n;
      ties[i * TIES + k] = j;
    }
  }

  const base = [meanOf(x, g, 0, n), meanOf(x, g, 1, n)];

  return {
    n, x, x0, press, yieldd, g, ties,
    base,              // the t=0 group centroids, which the decomposition measures against
    t: 0,
    seed,
    controls: { ...controls },
    interventions: (opts.interventions || []).map(v => ({ ...v })),
    replaced: 0,
    trace: []          // one measured frame per step, filled by the caller via measures.js
  };
}

const meanOf = (arr, g, want, n) => {
  let s = 0, c = 0;
  for (let i = 0; i < n; i++) if (g[i] === want) { s += arr[i]; c++; }
  return c ? s / c : 0;
};

/**
 * Advance one step, mutating state. Interventions are scheduled control changes rather than
 * special-cased code, so they are testable and give hysteresis and recovery time for free.
 */
export function stepPopulation(state, rng = Math.random) {
  for (const iv of state.interventions) {
    if (iv.at === state.t) state.controls[iv.control] = iv.to;
  }
  const c = state.controls;
  const G = gains(c);
  const { n, x, press, yieldd, g, ties } = state;

  const meanX = [meanOf(x, g, 0, n), meanOf(x, g, 1, n)];
  const meanPress = [meanOf(press, g, 0, n), meanOf(press, g, 1, n)];
  const meanYield = [meanOf(yieldd, g, 0, n), meanOf(yieldd, g, 1, n)];

  const nx = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    const mine = g[i];
    const other = 1 - mine;
    let dx = 0;

    // Symmetrical Bateson: match the other side's *intensity* — their distance from the
    // centre — and add the margin. Matching their signed position would be a different and
    // wrong rule. Writing s for this group's direction, the target is s*(margin + their
    // intensity) and their intensity is -s*meanX[other], so the s cancels on that term.
    // With one agent per group this is exactly the dyad model read as distance from centre,
    // and the centroid distance obeys the dyad's `sum` recurrence: D' = D(1-r) + 2*g*m.
    if (G.g > 0) {
      const sign = mine === 0 ? 1 : -1;
      dx += G.g * (sign * G.m - meanX[other] - x[i]);
    }

    // Contact: assimilate toward a tie inside the confidence radius. Move away from one
    // beyond it only when it is across the boundary — §10.1(4) keeps within-group and
    // between-group rules separate, and §13.2 warns that letting every distant opinion repel
    // exaggerates extremism. Confined this way, repulsion sharpens the boundary instead of
    // blowing the groups apart from the inside.
    if (G.assim > 0 || G.push > 0) {
      for (let k = 0; k < TIES; k++) {
        const j = ties[i * TIES + k];
        if (j < 0) continue;
        const d = x[j] - x[i];
        const far = Math.abs(d) > G.radius;
        if (!far && G.assim > 0) dx += (G.assim / TIES) * d;
        else if (far && G.push > 0 && g[j] !== mine) dx -= (G.push / TIES) * Math.sign(d);
      }
    }

    dx -= G.r * x[i];
    if (G.wobble > 0) dx += (rng() * 2 - 1) * G.wobble;
    if (G.jitter > 0) dx += (rng() * 2 - 1) * G.jitter;
    nx[i] = clamp(x[i] + dx);

    // Complementary Bateson on its own two dimensions: my demand answers your withdrawal,
    // my withdrawal answers your demand. This never touches the trait axis.
    if (G.comp > 0) {
      press[i] += G.comp * meanYield[other] - G.r * press[i];
      yieldd[i] += G.comp * meanPress[other] - G.r * yieldd[i];
    }
  }
  x.set(nx);

  if (G.rewireP > 0) rewire(state, G, rng);
  if (G.exitP > 0) leave(state, G, rng, meanX);

  state.t += 1;
  return state;
}

/** Drop the least similar tie and look for a more congenial one. */
function rewire(state, G, rng) {
  const { n, x, ties } = state;
  for (let i = 0; i < n; i++) {
    if (rng() >= G.rewireP) continue;
    let worst = 0, worstD = -1;
    for (let k = 0; k < TIES; k++) {
      const j = ties[i * TIES + k];
      if (j < 0) continue;
      const d = Math.abs(x[j] - x[i]);
      if (d > worstD) { worstD = d; worst = k; }
    }
    let pick = Math.floor(rng() * n);
    if (rng() < state.controls.homophily) {
      // Sample a few candidates and keep the most similar — preference, not omniscience.
      let best = pick, bestD = Math.abs(x[pick] - x[i]);
      for (let s = 0; s < 4; s++) {
        const cand = Math.floor(rng() * n);
        const d = Math.abs(x[cand] - x[i]);
        if (d < bestD) { bestD = d; best = cand; }
      }
      pick = best;
    }
    if (pick !== i) ties[i * TIES + worst] = pick;
  }
}

/**
 * Selective exit: the members most drawn toward the other side are the ones who go, and a
 * newcomer is drawn from the group that remains. Nobody changes their mind — the average moves
 * because the membership moved. This is §2.1's distinction made mechanical.
 */
function leave(state, G, rng, meanX) {
  const { n, x, x0, g } = state;
  const gauss = () => (rng() + rng() + rng() + rng() - 2) * 0.7;
  for (let i = 0; i < n; i++) {
    const mine = g[i];
    const toward = Math.abs(x[i] - meanX[1 - mine]);
    const home = Math.abs(x[i] - meanX[mine]);
    if (toward >= home) continue;                     // still closer to their own side
    const pull = home > 0 ? Math.min(1, (home - toward) / (home + toward + 1e-9)) : 0;
    if (rng() >= G.exitP * pull) continue;
    let s = 0, sq = 0, cnt = 0;
    for (let j = 0; j < n; j++) if (g[j] === mine && j !== i) { s += x[j]; sq += x[j] * x[j]; cnt++; }
    const mu = cnt ? s / cnt : x[i];
    const sd = cnt ? Math.sqrt(Math.max(0, sq / cnt - mu * mu)) : 0;
    x[i] = mu + gauss() * sd;      // a newcomer drawn from those who remain, spread and all
    x0[i] = x[i];                  // entering now: no history to inherit
    state.replaced += 1;
  }
}

/** Run a whole experiment and return the state with a measured trace. */
export function runPopulation(controls, opts = {}, measure = null) {
  const steps = opts.steps ?? 120;
  const state = createPopulation(controls, opts);
  const rng = makeRng((opts.seed ?? 1) + 7919);
  if (measure) state.trace.push(measure(state));
  for (let i = 0; i < steps; i++) {
    stepPopulation(state, rng);
    if (measure) state.trace.push(measure(state));
  }
  return state;
}

/* ---- the demonstration ----------------------------------------------------------------
 *
 * Three mechanisms, one shared starting population, tuned to produce the same centroid
 * distance curve. Nothing makes them coincide naturally: the match is the result of fitting
 * each arm to the same target, and the app says so. It exists to make §13.1's point
 * concrete — "equifinality… the pattern is not the mechanism."
 */

/** The starting conditions every arm shares, so only the mechanism differs. */
export const DEMO_BASE = {
  ...defaultControls(),
  similarity: 0.91,
  heterogeneity: 0.7,
  damping: 0,
  margin: 0,
  noise: 0.02
};

export const ARMS = [
  {
    key: 'reciprocal',
    name: 'They pushed each other apart',
    module: 'Symmetrical Bateson (§18)',
    controls: { respond: 0.022, margin: 0.64, damping: 0.145 },
    blurb: 'Each side answers the other and adds a margin. Nobody joins, nobody leaves, and ' +
      'the network never changes — every bit of the movement is people changing their minds.'
  },
  {
    key: 'sorting',
    name: 'They stopped mixing',
    module: 'Homophily + rewiring, with reactance at the boundary (§18)',
    controls: { assimilate: 0.60, confidence: 0.05, repel: 0.19, homophily: 0.97, rewire: 0.79 },
    blurb: 'Ties drift toward the like-minded and the few contacts left across the boundary ' +
      'push rather than persuade. Membership never changes; who talks to whom does.'
  },
  {
    key: 'exit',
    name: 'The moderates left',
    module: 'Selective exit and replacement (§2.1, §18)',
    controls: { exit: 0.90 },
    blurb: 'Nobody changes their mind at all. The members most drawn to the other side leave ' +
      'and are replaced from the ranks of those who stayed, and the average moves on its own.'
  }
];

export const armControls = key => ({
  ...DEMO_BASE,
  ...(ARMS.find(a => a.key === key) || ARMS[0]).controls
});

/**
 * Act 3. Each is a scheduled control change, so what it does is a property of the model
 * rather than of the copy. The measured effects are asymmetric on purpose — see the README.
 */
export const INTERVENTIONS = [
  {
    key: 'answer',
    name: 'Stop answering each other',
    changes: [{ control: 'respond', to: 0 }],
    note: 'Unilateral restraint in the exchange itself.'
  },
  {
    key: 'contact',
    name: 'Open contact',
    changes: [{ control: 'homophily', to: 0 }, { control: 'rewire', to: 0.9 }],
    note: 'Mix people again, and change nothing else about the encounter.'
  },
  {
    key: 'structured',
    name: 'Structured contact',
    changes: [
      { control: 'homophily', to: 0 }, { control: 'rewire', to: 0.9 },
      { control: 'repel', to: 0 }, { control: 'confidence', to: 0.9 }
    ],
    note: 'Contact on the terms §8.4 says actually work: sustained, and without threat.'
  },
  {
    key: 'moderates',
    name: 'Keep the moderates',
    changes: [{ control: 'exit', to: 0 }],
    note: 'Close the exit. It cannot bring back anyone who already went.'
  },
  {
    key: 'restraint',
    name: 'Blanket restraint',
    changes: [{ control: 'damping', to: 0.45 }],
    note: 'Pull everyone back toward the middle regardless of mechanism.'
  }
];

export const interventionAt = (key, at) => {
  const iv = INTERVENTIONS.find(v => v.key === key);
  return iv ? iv.changes.map(c => ({ at, ...c })) : [];
};
