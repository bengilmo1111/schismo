// The §11.7 output panel. Pure functions over a population state.
//
// The guide's first rule about measurement is that polarisation is not one number (§11), and
// its sharpest warning is equifinality: "the pattern is not the mechanism" (§13.1). These
// measures exist so the app can show what a single curve cannot.

const meanWhere = (arr, g, want, n) => {
  let s = 0, c = 0;
  for (let i = 0; i < n; i++) if (g[i] === want) { s += arr[i]; c++; }
  return c ? s / c : 0;
};

const sdWhere = (arr, g, want, n, mu) => {
  let s = 0, c = 0;
  for (let i = 0; i < n; i++) if (g[i] === want) { s += (arr[i] - mu) ** 2; c++; }
  return c ? Math.sqrt(s / c) : 0;
};

/** How far apart the two group centroids are. §11.1 */
export function centroidDistance(state) {
  const { x, g, n } = state;
  return Math.abs(meanWhere(x, g, 0, n) - meanWhere(x, g, 1, n));
}

/** Mean within-group spread — a group can move without becoming uniform. §11.1 */
export function withinSpread(state) {
  const { x, g, n } = state;
  return (sdWhere(x, g, 0, n, meanWhere(x, g, 0, n)) +
          sdWhere(x, g, 1, n, meanWhere(x, g, 1, n))) / 2;
}

/**
 * Sarle's bimodality coefficient over the whole population, ignoring group labels — so it can
 * disagree with centroid distance, which is the point. Above about 0.555 suggests two modes.
 * §11.1 warns it is sample-size sensitive; it is a hint, not a verdict.
 */
export function bimodality(state) {
  const { x, n } = state;
  if (n < 4) return 0;
  let mu = 0;
  for (let i = 0; i < n; i++) mu += x[i];
  mu /= n;
  let m2 = 0, m3 = 0, m4 = 0;
  for (let i = 0; i < n; i++) {
    const d = x[i] - mu;
    m2 += d * d; m3 += d ** 3; m4 += d ** 4;
  }
  m2 /= n; m3 /= n; m4 /= n;
  if (m2 <= 1e-12) return 0;
  const skew = m3 / m2 ** 1.5;
  const kurt = m4 / (m2 * m2) - 3;
  const correction = (3 * (n - 1) ** 2) / ((n - 2) * (n - 3));
  return (skew * skew + 1) / (kurt + correction);
}

/** Share of ties that cross the boundary — exposure, not agreement. §11.2 */
export function crossTieShare(state) {
  const { ties, g, n } = state;
  let cross = 0, total = 0;
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < ties.length / n; k++) {
      const j = ties[i * (ties.length / n) + k];
      if (j < 0) continue;
      total++;
      if (g[j] !== g[i]) cross++;
    }
  }
  return total ? cross / total : 0;
}

/**
 * How far the two groups have taken up opposite roles, on the role dimensions rather than on
 * the opinion axis. §11.4 — complementary schismogenesis needs outputs beyond opinion distance.
 */
export function roleAsymmetry(state) {
  const { press, yieldd, g, n } = state;
  const a = meanWhere(press, g, 0, n) - meanWhere(yieldd, g, 0, n);
  const b = meanWhere(press, g, 1, n) - meanWhere(yieldd, g, 1, n);
  return Math.abs(a - b) / 2;
}

/**
 * The load-bearing measure: split the change in centroid distance into how far people moved
 * and how far the membership moved. §2.1 — "a community can appear to radicalize because
 * members changed one another, because moderates left, or because extremists joined."
 *
 * For each group, against its t=0 centroid:
 *   composition = mean(entry traits of today's members) - centroid at t=0
 *   influence   = mean(today's traits)                  - mean(entry traits of today's members)
 * The two sum exactly to the group's total movement, so the split is a decomposition rather
 * than an attribution.
 */
export function decompose(state) {
  const { x, x0, g, n, base } = state;
  const parts = [0, 1].map(want => {
    const frozen = meanWhere(x0, g, want, n);
    return { composition: frozen - base[want], influence: meanWhere(x, g, want, n) - frozen };
  });
  const influence = parts[0].influence - parts[1].influence;
  const composition = parts[0].composition - parts[1].composition;
  const total = Math.abs(influence) + Math.abs(composition);
  return {
    influence,
    composition,
    influenceShare: total > 1e-12 ? Math.abs(influence) / total : 0,
    compositionShare: total > 1e-12 ? Math.abs(composition) / total : 0
  };
}

/** Everything at once, for one frame of a run. */
export function summarise(state) {
  const d = decompose(state);
  return {
    t: state.t,
    distance: centroidDistance(state),
    commonGround: commonGround(state),
    within: withinSpread(state),
    bimodality: bimodality(state),
    crossTies: crossTieShare(state),
    roles: roleAsymmetry(state),
    influenceShare: d.influenceShare,
    compositionShare: d.compositionShare,
    replaced: state.replaced / state.n
  };
}

/** Divergence velocity over the last `window` frames. §11.6 */
export function velocity(trace, window = 10) {
  if (trace.length < 2) return 0;
  const b = trace[trace.length - 1];
  const a = trace[Math.max(0, trace.length - 1 - window)];
  return b.t === a.t ? 0 : (b.distance - a.distance) / (b.t - a.t);
}

/** Spread of final distance across seeds — §11.6 path sensitivity, §12.1's drift signature. */
export function seedSpread(finals) {
  if (!finals.length) return 0;
  const mu = finals.reduce((s, v) => s + v, 0) / finals.length;
  return Math.sqrt(finals.reduce((s, v) => s + (v - mu) ** 2, 0) / finals.length);
}

/**
 * Counts of the trait across fixed bins, so the chart can draw the distribution rather than
 * two centroids. §13.1 warns that binary visualisation "can manufacture the very opposition
 * under study" — a ribbon shows whether there are really two humps or one broad one.
 */
export function histogram(state, bins = 40, lo = -2.5, hi = 2.5) {
  const out = new Float64Array(bins);
  const { x, n } = state;
  for (let i = 0; i < n; i++) {
    const b = Math.floor(((x[i] - lo) / (hi - lo)) * bins);
    out[Math.max(0, Math.min(bins - 1, b))] += 1;
  }
  let peak = 0;
  for (let i = 0; i < bins; i++) peak = Math.max(peak, out[i]);
  if (peak > 0) for (let i = 0; i < bins; i++) out[i] /= peak;
  return out;
}

/**
 * How much of the two groups' range is still shared: the overlapping coefficient, computed by
 * binning both groups over a common range and summing the smaller share in each bin.
 *
 * 1 means the two distributions are indistinguishable; 0 means they have no ground in common.
 * It is the one figure here a reader needs no units for, and unlike a fixed "polarised"
 * threshold it does not encode anybody's preferred centre — §13.3's warning.
 */
export function commonGround(state, bins = 48) {
  const { x, g, n } = state;
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < n; i++) { lo = Math.min(lo, x[i]); hi = Math.max(hi, x[i]); }
  if (!(hi > lo)) return 1;
  const pad = (hi - lo) * 0.02;
  lo -= pad; hi += pad;
  const a = new Float64Array(bins), b = new Float64Array(bins);
  let na = 0, nb = 0;
  for (let i = 0; i < n; i++) {
    const k = Math.max(0, Math.min(bins - 1, Math.floor(((x[i] - lo) / (hi - lo)) * bins)));
    if (g[i] === 0) { a[k]++; na++; } else { b[k]++; nb++; }
  }
  if (!na || !nb) return 0;
  let shared = 0;
  for (let k = 0; k < bins; k++) shared += Math.min(a[k] / na, b[k] / nb);
  return shared;
}

/**
 * The span of trait values where both groups still have members — the region `commonGround`
 * integrates over, handed back so a plot can draw it instead of leaving it implied. Returns
 * null when the two no longer overlap anywhere.
 */
export function overlapRange(state, bins = 48) {
  const { x, g, n } = state;
  let lo = Infinity, hi = -Infinity;
  for (let i = 0; i < n; i++) { lo = Math.min(lo, x[i]); hi = Math.max(hi, x[i]); }
  if (!(hi > lo)) return null;
  const a = new Float64Array(bins), b = new Float64Array(bins);
  for (let i = 0; i < n; i++) {
    const k = Math.max(0, Math.min(bins - 1, Math.floor(((x[i] - lo) / (hi - lo)) * bins)));
    (g[i] === 0 ? a : b)[k]++;
  }
  let first = -1, last = -1;
  for (let k = 0; k < bins; k++) if (a[k] > 0 && b[k] > 0) { if (first < 0) first = k; last = k; }
  if (first < 0) return null;
  const w = (hi - lo) / bins;
  return { lo: lo + first * w, hi: lo + (last + 1) * w };
}
