import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createPopulation, stepPopulation, runPopulation, defaultControls, gains,
  ARMS, armControls, DEMO_BASE, INTERVENTIONS, interventionAt, TIES
} from '../src/population.js';
import { summarise, centroidDistance, roleAsymmetry, decompose, withinSpread } from '../src/measures.js';
import { transition, makeRng } from '../src/model.js';

const C = over => ({ ...defaultControls(), ...over });
const quiet = { noise: 0, drift: 0, damping: 0, respond: 0, assimilate: 0, repel: 0,
  homophily: 0, rewire: 0, exit: 0, complement: 0, margin: 0 };

/* ---- the dyad survives inside the population model ---- */

test('two agents responding to each other reproduce the dyad transition exactly', () => {
  // The population rule matches the other side's distance from the centre. With one agent per
  // group that is the dyad model read as the politics reading, so the centroid distance must
  // follow the dyad's `sum` recurrence step for step.
  const c = C({ ...quiet, respond: 0.48, margin: 0.6, damping: 0.35,
    similarity: 0.5, heterogeneity: 0 });
  const G = gains(c);
  const dyad = { mode: 'sym', blend: 0.5, ga: G.g, gb: G.g, m: G.m, ra: G.r, rb: G.r, n: 0 };
  const T = transition(dyad);

  const state = createPopulation(c, { n: 2, seed: 5 });
  let sum = centroidDistance(state);
  assert.ok(sum > 0.5, 'the two groups must start apart for this to say anything');
  for (let i = 0; i < 60; i++) {
    const expected = T.m11 * sum + T.c1;          // dif stays 0, so the map is one line
    stepPopulation(state, () => 0.5);
    sum = centroidDistance(state);
    assert.ok(Math.abs(sum - expected) < 1e-9 * Math.max(1, expected),
      `step ${i}: population ${sum} vs dyad ${expected}`);
  }
});

test('the reciprocal arm settles where the dyad says it will', () => {
  const c = C({ ...quiet, respond: 0.3, margin: 0.5, damping: 0.2, similarity: 0.8, heterogeneity: 0 });
  const G = gains(c);
  const s = runPopulation(c, { n: 60, steps: 900 });
  assert.ok(Math.abs(centroidDistance(s) - (2 * G.g * G.m) / G.r) < 0.01);
});

/* ---- §2.1: influence, selection and exit are different things ---- */

test('with nobody leaving, every bit of the movement is influence', () => {
  const c = C({ ...quiet, respond: 0.1, margin: 0.5, similarity: 0.85, heterogeneity: 0.5 });
  const s = runPopulation(c, { n: 200, seed: 4, steps: 60 });
  const d = decompose(s);
  assert.equal(s.replaced, 0);
  assert.equal(d.composition, 0, 'composition must be exactly zero, not merely small');
  assert.equal(d.influenceShare, 1);
});

test('with nobody changing their mind, every bit of the movement is composition', () => {
  const c = C({ ...quiet, exit: 0.9, similarity: 0.85, heterogeneity: 0.7 });
  const s = runPopulation(c, { n: 200, seed: 4, steps: 60 });
  const d = decompose(s);
  assert.ok(s.replaced > 0, 'somebody has to have left for this to mean anything');
  assert.equal(d.influence, 0, 'influence must be exactly zero, not merely small');
  assert.equal(d.compositionShare, 1);
  assert.ok(centroidDistance(s) > centroidDistance(createPopulation(c, { n: 200, seed: 4 })),
    'the groups still move apart, with no persuasion anywhere in the model');
});

/* ---- §13.2: "homophily is not sufficient" ---- */

test('homophily plus assimilation does not pull the groups apart', () => {
  const c = C({ ...quiet, assimilate: 0.6, confidence: 1, homophily: 0.95, rewire: 0.7,
    similarity: 0.85, heterogeneity: 0.6 });
  const start = centroidDistance(createPopulation(c, { n: 200, seed: 9 }));
  const end = centroidDistance(runPopulation(c, { n: 200, seed: 9, steps: 90 }));
  assert.ok(end < start, `sorting alone should not diverge: ${start} -> ${end}`);
});

test('adding reactance at the boundary is what makes sorting diverge', () => {
  const c = C({ ...quiet, assimilate: 0.3, confidence: 0.15, repel: 0.48,
    homophily: 0.94, rewire: 0.56, similarity: 0.85, heterogeneity: 0.6 });
  const start = centroidDistance(createPopulation(c, { n: 200, seed: 9 }));
  const s = runPopulation(c, { n: 200, seed: 9, steps: 90 });
  assert.ok(centroidDistance(s) > start * 1.3);
  assert.ok(summarise(s).crossTies < 0.4, 'and the boundary should close as it goes');
});

/* ---- §10.1(3): roles are not ± on the opinion axis ---- */

test('complementary response moves the roles and leaves the opinion axis alone', () => {
  const c = C({ ...quiet, complement: 0.3, similarity: 0.85, heterogeneity: 0.4 });
  const before = createPopulation(c, { n: 120, seed: 6 });
  const after = runPopulation(c, { n: 120, seed: 6, steps: 60 });
  assert.equal(centroidDistance(after), centroidDistance(before), 'the trait axis must not move');
  assert.ok(roleAsymmetry(after) > roleAsymmetry(before) * 5, 'while the roles fork');
});

/* ---- §12.1: the drift signature ---- */

test('drift sends different seeds to different places, and crowds average it out', () => {
  const c = C({ ...quiet, drift: 0.5, similarity: 1, heterogeneity: 0 });
  const spreadAt = n => {
    const ends = [1, 2, 3, 4, 5, 6, 7, 8].map(seed =>
      centroidDistance(runPopulation(c, { n, seed, steps: 120 })));
    const mu = ends.reduce((a, b) => a + b, 0) / ends.length;
    return Math.sqrt(ends.reduce((s, v) => s + (v - mu) ** 2, 0) / ends.length);
  };
  const small = spreadAt(20);
  const large = spreadAt(400);
  assert.ok(small > 0, 'chance alone should separate the runs');
  assert.ok(large < small, `a larger population should drift less: ${small} vs ${large}`);
});

/* ---- the app's thesis ---- */

test('the three arms agree on the curve and disagree on everything else', () => {
  const seeds = [3, 11, 29, 47, 63, 81];
  const probe = [15, 30, 45, 60, 75, 90];
  const panels = {};
  const curves = {};

  for (const arm of ARMS) {
    const acc = new Array(91).fill(0);
    const panel = { within: 0, crossTies: 0, influenceShare: 0, replaced: 0 };
    for (const seed of seeds) {
      const s = runPopulation(armControls(arm.key), { n: 240, seed, steps: 90 }, summarise);
      s.trace.forEach((f, i) => (acc[i] += f.distance / seeds.length));
      const last = s.trace[90];
      for (const k of Object.keys(panel)) panel[k] += last[k] / seeds.length;
    }
    curves[arm.key] = acc;
    panels[arm.key] = panel;
  }

  // Same picture: no two arms are ever further apart than a tenth of the distance they reach.
  for (const t of probe) {
    const vals = ARMS.map(a => curves[a.key][t]);
    const spread = Math.max(...vals) - Math.min(...vals);
    assert.ok(spread < 0.10 * Math.max(...vals),
      `arms diverge at t=${t}: ${vals.map(v => v.toFixed(3))}`);
  }

  // Different cause: every pair is separated by at least one measure, by a wide margin.
  const far = (a, b, key, factor) =>
    Math.max(panels[a][key], panels[b][key]) > Math.max(1e-6, factor * Math.min(panels[a][key], panels[b][key]));
  assert.ok(far('reciprocal', 'sorting', 'within', 5), 'sorting leaves the groups broad');
  assert.ok(panels.sorting.crossTies < 0.75 * panels.reciprocal.crossTies, 'sorting closes the boundary');
  assert.ok(panels.exit.influenceShare < 0.1 && panels.reciprocal.influenceShare > 0.9,
    'exit moves nobody; reciprocal response moves everybody');
  assert.ok(panels.exit.replaced > 0.1 && panels.sorting.replaced === 0);
});

/* ---- §18.2: the cure depends on the cause ---- */

test('each targeted intervention bends its own mechanism and not the others', () => {
  const seeds = [3, 11, 29, 47];
  const finalDistance = (armKey, ivs) => {
    let d = 0;
    for (const seed of seeds) {
      d += centroidDistance(runPopulation(armControls(armKey), { n: 240, seed, steps: 90, interventions: ivs })) / seeds.length;
    }
    return d;
  };
  const baseline = Object.fromEntries(ARMS.map(a => [a.key, finalDistance(a.key, [])]));
  const effect = (armKey, ivKey) =>
    (finalDistance(armKey, interventionAt(ivKey, 40)) - baseline[armKey]) / baseline[armKey];

  // Answering less cures the reciprocal arm and does literally nothing to the other two,
  // because `respond` is already zero there.
  assert.ok(effect('reciprocal', 'answer') < -0.5);
  assert.equal(effect('sorting', 'answer'), 0);
  assert.equal(effect('exit', 'answer'), 0);

  // Contact works on sorting only when it is structured. Unstructured, it makes it worse —
  // §8.4 and §13.2 both warn about exactly this.
  assert.ok(effect('sorting', 'structured') < -0.5);
  assert.ok(effect('sorting', 'contact') > 0, 'unstructured contact should backfire here');
  // Not exactly zero: switching rewiring on draws from the same rng the noise uses, so the
  // stream shifts even though ties change nothing when nobody is assimilating or repelling.
  assert.ok(Math.abs(effect('reciprocal', 'structured')) < 0.05,
    'structured contact should do nothing for a pair that is simply answering each other');

  // Closing the exit freezes the damage rather than undoing it: you cannot un-leave.
  const late = effect('exit', 'moderates');
  assert.ok(late < 0 && late > -0.15, `stopping exit late should barely help, got ${late}`);
});

test('closing the exit earlier helps more, and never fully', () => {
  const at = t => centroidDistance(runPopulation(armControls('exit'),
    { n: 240, seed: 3, steps: 90, interventions: interventionAt('moderates', t) }));
  assert.ok(at(3) < at(20) && at(20) < at(40), 'the earlier the better');
  assert.ok(at(3) > centroidDistance(createPopulation(armControls('exit'), { n: 240, seed: 3 })),
    'but even the earliest close leaves the groups further apart than they began');
});

/* ---- housekeeping ---- */

test('a run is reproducible from its seed and nothing else', () => {
  const c = armControls('sorting');
  const end = seed => centroidDistance(runPopulation(c, { n: 120, seed, steps: 50 }));
  assert.equal(end(21), end(21));
  assert.notEqual(end(21), end(22));
});

test('every arm and intervention stays finite across seeds', () => {
  for (const arm of ARMS) {
    for (const iv of [[], ...INTERVENTIONS.map(v => interventionAt(v.key, 30))]) {
      for (const seed of [1, 17, 33]) {
        const s = runPopulation(armControls(arm.key), { n: 120, seed, steps: 80, interventions: iv });
        for (let i = 0; i < s.n; i++) {
          assert.ok(Number.isFinite(s.x[i]) && Number.isFinite(s.press[i]) && Number.isFinite(s.yieldd[i]));
          assert.ok(s.ties[i * TIES] >= -1 && s.ties[i * TIES] < s.n);
        }
        assert.ok(Number.isFinite(withinSpread(s)));
      }
    }
  }
});

test('interventions are scheduled control changes, applied once at their tick', () => {
  const s = runPopulation(armControls('reciprocal'),
    { n: 40, seed: 1, steps: 30, interventions: interventionAt('answer', 10) });
  assert.equal(s.controls.respond, 0);
  const before = runPopulation(armControls('reciprocal'), { n: 40, seed: 1, steps: 5 });
  assert.equal(before.controls.respond, 0.022);
});
