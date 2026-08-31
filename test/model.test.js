import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, defaultParams, step, analysis, diagnose, weights, CAP, MAX_HISTORY } from '../src/model.js';

const noRng = () => 0.5; // (0.5*2-1) === 0, so no noise
const run = (params, ticks, state = createState()) => {
  for (let i = 0; i < ticks; i++) step(state, params, noRng);
  return state;
};

test('rivalry with no restraint escalates both parties together', () => {
  const p = { ...defaultParams(), mode: 'sym', m: 0.7, r: 0 };
  const s = run(p, 200);
  assert.ok(s.a + s.b > 20, 'joint level should climb');
  assert.ok(Math.abs(s.a - s.b) < 0.2, 'roles should stay level with each other');
});

test('rivalry with restraint settles at the closed-form level', () => {
  const p = { ...defaultParams(), mode: 'sym', m: 0.7, r: 0.2 };
  const s = run(p, 600);
  assert.ok(Math.abs(s.a + s.b - analysis(p).sumSettlesAt) < 0.05);
});

test('dominance forks the pair into opposed roles', () => {
  const p = { ...defaultParams(), mode: 'comp', ga: 0.2, gb: 0.2, m: 0, r: 0.05 };
  const s = run(p, 200);
  assert.ok(s.a > 1 && s.b < -1, 'one party rises as the other falls');
  assert.ok(Math.abs(s.a + s.b) < 1, 'complementary dynamics are level-neutral');
});

test('dominance below the stability threshold does not fork', () => {
  const p = { ...defaultParams(), mode: 'comp', ga: 0.02, gb: 0.02, m: 0, r: 0.3 };
  assert.equal(analysis(p).forking, false);
  const s = run(p, 300);
  assert.ok(Math.abs(s.a - s.b) < 0.2);
});

test('difRate predicts whether the role gap widens', () => {
  const p = { ...defaultParams(), mode: 'comp', ga: 0.2, gb: 0.2, m: 0, r: 0.05 };
  const { difRate } = analysis(p);
  const s = createState();
  const before = s.a - s.b;
  step(s, p, noRng);
  assert.ok(Math.abs((s.a - s.b) - before * difRate) < 1e-9);
});

test('mixing rivalry into dominance can hold the gap closed', () => {
  const base = { ...defaultParams(), ga: 0.26, gb: 0.26, m: 0.5, r: 0.1 };
  assert.equal(analysis({ ...base, mode: 'comp' }).forking, true);
  assert.equal(analysis({ ...base, mode: 'mix', blend: 0.42 }).forking, false);
});

test('runaway rupture is recorded once and clamped', () => {
  const p = { ...defaultParams(), mode: 'comp', ga: 0.4, gb: 0.4, m: 0, r: 0 };
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
  const p = { ...defaultParams(), n: 0 };
  const one = run(p, 50);
  const two = run(p, 50);
  assert.equal(one.a, two.a);
  assert.equal(one.b, two.b);
});
