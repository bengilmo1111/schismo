import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createState, defaultParams, step, analysis, transition, project, arrival, seedSensitivity,
  diagnose, weights, makeRng, encodeParams, decodeParams, presets, readings,
  PARAM_RANGES, CAP, POLARIZED, MAX_HISTORY
} from '../src/model.js';

const noRng = () => 0.5; // (0.5*2-1) === 0, so no noise
const run = (params, ticks, state = createState(params)) => {
  for (let i = 0; i < ticks; i++) step(state, params, noRng);
  return state;
};
const P = over => ({ ...defaultParams(), ...over });

/* ---- the two classic cases ---- */

test('rivalry with no restraint escalates both parties together', () => {
  const p = P({ mode: 'sym', m: 0.7, ra: 0, rb: 0 });
  const s = run(p, 200);
  assert.ok(s.a + s.b > 20, 'joint level should climb');
  assert.ok(Math.abs(s.a - s.b) < 0.2, 'roles should stay level with each other');
});

test('rivalry with restraint settles at the closed-form level', () => {
  const p = P({ mode: 'sym', m: 0.7, ra: 0.2, rb: 0.2 });
  const s = run(p, 600);
  assert.ok(Math.abs(s.a + s.b - analysis(p).sumSettlesAt) < 0.05);
});

test('dominance forks the pair into opposed roles', () => {
  const p = P({ mode: 'comp', ga: 0.2, gb: 0.2, m: 0, ra: 0.05, rb: 0.05 });
  const s = run(p, 200);
  assert.ok(s.a > 1 && s.b < -1, 'one party rises as the other falls');
  assert.ok(Math.abs(s.a + s.b) < 1, 'complementary dynamics are level-neutral');
});

test('dominance below the stability threshold does not fork', () => {
  const p = P({ mode: 'comp', ga: 0.02, gb: 0.02, m: 0, ra: 0.3, rb: 0.3 });
  assert.equal(analysis(p).forking, false);
  const s = run(p, 300);
  assert.ok(Math.abs(s.a - s.b) < 0.2);
});

test('mixing rivalry into dominance can hold the gap closed', () => {
  const base = P({ ga: 0.26, gb: 0.26, m: 0.5, ra: 0.1, rb: 0.1 });
  assert.equal(analysis({ ...base, mode: 'comp' }).forking, true);
  assert.equal(analysis({ ...base, mode: 'mix', blend: 0.42 }).forking, false);
});

/* ---- the exact linear map ---- */

const sampleParams = () => {
  const out = [];
  for (const mode of ['sym', 'comp', 'mix']) {
    for (const ga of [0.05, 0.24, 0.42]) {
      for (const gb of [0.05, 0.24]) {
        for (const ra of [0, 0.06, 0.3]) {
          for (const rb of [0, 0.13]) {
            out.push(P({ mode, blend: 0.37, ga, gb, m: 0.5, ra, rb, n: 0 }));
          }
        }
      }
    }
  }
  return out;
};

test('transition() is exactly what step() does to sum and dif', () => {
  for (const p of sampleParams()) {
    const T = transition(p);
    const s = createState(p);
    for (let i = 0; i < 40; i++) {
      const sum = s.a + s.b;
      const dif = s.a - s.b;
      const expected = {
        sum: T.m11 * sum + T.m12 * dif + T.c1,
        dif: T.m21 * sum + T.m22 * dif + T.c2
      };
      step(s, p, noRng);
      if (Math.abs(s.a) >= CAP || Math.abs(s.b) >= CAP) break; // the map knows nothing of the cap
      const tol = 1e-9 * Math.max(1, Math.abs(expected.sum), Math.abs(expected.dif));
      assert.ok(Math.abs((s.a + s.b) - expected.sum) < tol, `sum drifted for ${JSON.stringify(p)}`);
      assert.ok(Math.abs((s.a - s.b) - expected.dif) < tol, `dif drifted for ${JSON.stringify(p)}`);
    }
  }
});

test('project() agrees with running the simulation', () => {
  for (const p of sampleParams()) {
    const s = run(p, 30);
    if (Math.abs(s.a) >= CAP || Math.abs(s.b) >= CAP) continue;
    const q = project(p, 30);
    const tol = 1e-8 * Math.max(1, Math.abs(q.sum), Math.abs(q.dif));
    assert.ok(Math.abs((s.a + s.b) - q.sum) < tol);
    assert.ok(Math.abs((s.a - s.b) - q.dif) < tol);
  }
});

test('climbing and forking match what a long run actually does', () => {
  for (const p of sampleParams()) {
    const { climbing, forking } = analysis(p);
    const near = run(p, 1200);
    const far = run(p, 2400);
    const bigger = (x, y) => Math.abs(y) > Math.abs(x) * 1.4 + 1e-6;
    if (Math.abs(far.a) >= CAP || Math.abs(far.b) >= CAP) continue; // the cap hides the fate
    assert.equal(climbing, bigger(near.a + near.b, far.a + far.b), `sum fate for ${JSON.stringify(p)}`);
    assert.equal(forking, bigger(near.a - near.b, far.a - far.b), `dif fate for ${JSON.stringify(p)}`);
  }
});

/* ---- asymmetric restraint ---- */

test('unequal restraint couples the level into the gap', () => {
  const p = P({ mode: 'sym', ga: 0.3, gb: 0.3, m: 0.9, ra: 0, rb: 0.06, n: 0, d0: 0 });
  assert.equal(analysis(p).coupled, true);
  const s = run(p, 400);
  assert.ok(s.a - s.b > 0.5, 'the party with no brakes ends up further out');
  assert.ok(analysis(p).forking === false, 'but the gap still settles rather than running away');
  const settled = analysis(p);
  assert.ok(Math.abs((s.a - s.b) - settled.difSettlesAt) < 0.01);
  assert.ok(Math.abs((s.a + s.b) - settled.sumSettlesAt) < 0.01);
});

test('a quantity that is not running away still reports where it lands', () => {
  const p = P({ mode: 'comp', ga: 0.2, gb: 0.2, m: 0, ra: 0.05, rb: 0.05, n: 0 });
  const a = analysis(p);
  assert.equal(a.forking, true);
  assert.equal(a.difSettlesAt, Infinity, 'a runaway has no landing point');
  assert.equal(a.climbing, false);
  assert.equal(a.sumSettlesAt, 0, 'the level decays to nothing while the roles fork');
  const s = run(p, 120);
  assert.ok(Math.abs(s.a + s.b) < 0.01);
});

test('equal restraint leaves the two quantities independent', () => {
  const T = transition(P({ ra: 0.11, rb: 0.11, ga: 0.2, gb: 0.2 }));
  assert.equal(T.m12, 0);
  assert.equal(T.m21, 0);
  assert.equal(analysis(P({ ra: 0.11, rb: 0.11, ga: 0.2, gb: 0.2 })).coupled, false);
});

/* ---- the arrival clock ---- */

test('arrival() predicts the exchange the simulation crosses on', () => {
  const cases = [
    P({ mode: 'comp', ga: 0.2, gb: 0.2, m: 0, ra: 0.05, rb: 0.05, n: 0 }),
    P({ mode: 'sym', m: 0.9, ga: 0.3, gb: 0.3, ra: 0.015, rb: 0.015, n: 0, s0: 0.4, d0: 0.05 }),
    P({ mode: 'mix', blend: 0.7, ga: 0.3, gb: 0.2, m: 0.4, ra: 0.02, rb: 0.05, n: 0 })
  ];
  for (const p of cases) {
    const want = arrival(p);
    const s = run(p, 1500);
    assert.deepEqual(s.reached, want, `arrival mismatch for ${JSON.stringify(p)}`);
  }
});

test('a settling run never reaches the poles', () => {
  const p = P({ mode: 'sym', m: 0.5, ga: 0.24, gb: 0.24, ra: 0.3, rb: 0.3, n: 0 });
  assert.equal(arrival(p).sum, null);
  assert.equal(arrival(p).dif, null);
  assert.ok(analysis(p).sumSettlesAt < POLARIZED);
  assert.equal(run(p, 1000).reached.sum, null);
});

test('a ten-times smaller seed costs a constant number of exchanges', () => {
  const p = P({ mode: 'comp', ga: 0.2, gb: 0.2, m: 0, ra: 0.05, rb: 0.05, n: 0 });
  const at = d0 => arrival({ ...p, d0 }).dif;
  const steps = [at(1), at(0.1), at(0.01), at(0.001)];
  const gaps = [steps[1] - steps[0], steps[2] - steps[1], steps[3] - steps[2]];
  const exact = Math.log(10) / Math.log(analysis(p).difRate);
  for (const gap of gaps) assert.ok(Math.abs(gap - exact) <= 1, `expected ~${exact}, got ${gap}`);
  assert.equal(seedSensitivity({ ...p, d0: 0.1 }, 'dif'), at(0.01) - at(0.1));
});

test('with nothing to amplify, dominance does nothing at all', () => {
  const p = P({ mode: 'comp', ga: 0.3, gb: 0.3, m: 0, ra: 0.02, rb: 0.02, n: 0, s0: 1, d0: 0 });
  const s = run(p, 500);
  assert.equal(s.a - s.b, 0);
  assert.equal(diagnose(s, p), 'inert');
  assert.equal(arrival(p).dif, null);
});

test('the same run with noise finds the difference anyway', () => {
  const p = P({ mode: 'comp', ga: 0.3, gb: 0.3, m: 0, ra: 0.02, rb: 0.02, n: 0.02, s0: 1, d0: 0 });
  const s = run(p, 500, createState(p));
  const rng = makeRng(7);
  const noisy = createState(p);
  for (let i = 0; i < 500; i++) step(noisy, p, rng);
  assert.equal(s.a - s.b, 0, 'noise off: dead still');
  assert.ok(Math.abs(noisy.a - noisy.b) > POLARIZED, 'noise on: the runaway seeds itself');
});

/* ---- housekeeping ---- */

test('runaway rupture is recorded once and clamped', () => {
  const p = P({ mode: 'comp', ga: 0.4, gb: 0.4, m: 0, ra: 0, rb: 0 });
  const s = run(p, 400);
  assert.equal(s.ruptured, true);
  assert.equal(s.ruptures.length, 1);
  assert.ok(Math.abs(s.a) <= CAP && Math.abs(s.b) <= CAP);
  assert.equal(diagnose(s, p), 'schism');
});

test('history is bounded', () => {
  const s = run(defaultParams(), MAX_HISTORY + 200);
  assert.equal(s.history.length, MAX_HISTORY);
});

test('weights sum to one in every mode', () => {
  for (const mode of ['sym', 'comp', 'mix']) {
    const { ws, wc } = weights({ mode, blend: 0.3 });
    assert.ok(Math.abs(ws + wc - 1) < 1e-12);
  }
});

test('noise is the only nondeterminism', () => {
  const p = P({ n: 0 });
  const one = run(p, 50);
  const two = run(p, 50);
  assert.equal(one.a, two.a);
  assert.equal(one.b, two.b);
});

test('a seeded run is reproducible and a different seed is not', () => {
  const p = P({ n: 0.05 });
  const go = seed => {
    const s = createState(p);
    const rng = makeRng(seed);
    for (let i = 0; i < 80; i++) step(s, p, rng);
    return s.a;
  };
  assert.equal(go(42), go(42));
  assert.notEqual(go(42), go(43));
  const rng = makeRng(3);
  for (let i = 0; i < 500; i++) {
    const v = rng();
    assert.ok(v >= 0 && v < 1);
  }
});

test('starting conditions are read from the params', () => {
  const s = createState(P({ s0: 3, d0: 1 }));
  assert.equal(s.a, 2);
  assert.equal(s.b, 1);
  assert.deepEqual(createState().history, [{ a: 0.6, b: 0.4 }]);
});

/* ---- sharing ---- */

test('encode omits defaults and decode round-trips', () => {
  assert.equal(encodeParams(defaultParams()), '');
  const p = P({ mode: 'comp', ga: 0.31, ra: 0, rb: 0.12, d0: 0.001, seed: 909, reading: 'politics' });
  const back = decodeParams(encodeParams(p));
  for (const key of Object.keys(p)) assert.equal(back[key], p[key], key);
});

test('decode clamps and discards anything it does not recognise', () => {
  const p = decodeParams('ga=99&rb=-4&mode=drop%20tables&reading=../etc&seed=-7.9&nope=1&d0=NaN');
  assert.equal(p.ga, PARAM_RANGES.ga[1]);
  assert.equal(p.rb, 0);
  assert.equal(p.mode, defaultParams().mode);
  assert.equal(p.reading, 'default');
  assert.equal(p.seed, 7);
  assert.equal(p.d0, defaultParams().d0);
  assert.equal(p.nope, undefined);
  assert.deepEqual(decodeParams('#'), defaultParams());
  assert.deepEqual(decodeParams(null), defaultParams());
});

/* ---- presets ---- */

test('every preset is complete, valid and does what its group claims', () => {
  for (const preset of presets) {
    const { name, group, note, ...p } = preset;
    assert.ok(name && group && note, 'preset needs a name, a group and a note');
    assert.ok(readings[p.reading], `${name}: unknown reading ${p.reading}`);
    for (const key of Object.keys(PARAM_RANGES)) {
      const [lo, hi] = PARAM_RANGES[key];
      assert.ok(p[key] >= lo && p[key] <= hi, `${name}: ${key} out of slider range`);
    }
    const full = P(p);
    const s = run(full, 400);
    assert.ok(Number.isFinite(s.a) && Number.isFinite(s.b), `${name}: went non-finite`);
    assert.ok(['schism', 'escalation', 'differentiation', 'both', 'held', 'drifting', 'inert', 'ceiling']
      .includes(diagnose(s, full)));
  }
});

test('the political presets differ only in restraint, and that decides it', () => {
  const intact = presets.find(p => p.name === 'Two parties, norms intact');
  const gone = presets.find(p => p.name === 'Two parties, norms gone');
  for (const key of ['mode', 'ga', 'gb', 'm', 's0', 'd0', 'blend']) {
    assert.equal(intact[key], gone[key], `${key} should be identical between the two`);
  }
  assert.ok(gone.ra < intact.ra);
  assert.ok(analysis(P(intact)).sumSettlesAt < POLARIZED, 'restraint intact: it settles short of the poles');
  assert.ok(analysis(P(gone)).sumSettlesAt > POLARIZED, 'restraint gone: the ceiling is past the poles');
  assert.ok(arrival(P(gone)).sum !== null, 'restraint gone: it gets there');
  assert.equal(diagnose(run(P(intact), 300), P(intact)), 'held');
  assert.equal(diagnose(run(P(gone), 300), P(gone)), 'ceiling');
});

test('the asymmetric preset produces a real but minority share of the movement', () => {
  const p = P(presets.find(x => x.name === 'Asymmetric polarisation'));
  const s = run(p, 800);
  const gap = Math.abs(s.a - s.b);
  const level = Math.abs(s.a + s.b);
  assert.ok(gap > 0.5, 'the unrestrained party really does end up further out');
  assert.ok(gap < level * 0.25, 'but the shared movement dwarfs the asymmetry');
});
