// Wiring only: bind controls to params, run the clock, render readouts.

import { createState, defaultParams, step, analysis, diagnose, presets } from './model.js';
import { createChart } from './chart.js';

const $ = id => document.getElementById(id);
const chart = createChart($('chart'));

let params = defaultParams();
let state = createState();
let running = false;
let logged = {};

const TICK_MS = 55;

const modeHints = {
  sym: 'Each answers the other in kind and tries to go one better. Turn restraint down to nothing and watch what a duel of boasts does.',
  comp: 'One asserts, the other yields, and each response invites more of the opposite. The pens pull apart rather than climbing together.',
  mix: 'Both readings run at the same time. Rivalry pulls the pens back together while dominance pushes them apart — which wins depends on the share below.'
};

const diagnoses = {
  schism: '<b>Schism.</b> The runaway has gone past anything either party can answer. In Bateson\u2019s reading this is where the relationship stops being one relationship.',
  escalation: '<b>Escalation.</b> Neither will be outdone and nothing pulls them back, so both climb together and the gap between them stays small.',
  differentiation: '<b>Differentiation.</b> One side\u2019s assertion is drawing out the other\u2019s deference, and each makes the other more extreme.',
  both: '<b>Both runaways at once.</b> The pair is climbing and forking together — the fastest route to breakdown.',
  held: '<b>Held.</b> Restraint is absorbing the feedback faster than it builds. This is the stable case, and Bateson thought it needed active work to maintain.',
  drifting: '<b>Drifting.</b> The gap is closing but the level keeps rising — pressure is going into the pair as a whole, not into their roles.'
};

const sliders = [
  ['ga', 2], ['gb', 2], ['m', 2], ['r', 2], ['n', 2], ['blend', 0]
];

function label(key) {
  $('l' + key).textContent = key === 'blend'
    ? Math.round(params.blend * 100) + '%'
    : params[key].toFixed(2);
}

function syncControls() {
  sliders.forEach(([key]) => {
    $(key).value = params[key];
    label(key);
  });
  [...$('modes').children].forEach(btn =>
    btn.setAttribute('aria-pressed', String(btn.dataset.mode === params.mode)));
  $('modehint').textContent = modeHints[params.mode];
  $('blendWrap').style.display = params.mode === 'mix' ? 'block' : 'none';
}

function log(msg) {
  if (logged[msg]) return;
  logged[msg] = true;
  const el = document.createElement('div');
  el.textContent = `t ${state.t} — ${msg}`;
  $('log').prepend(el);
  while ($('log').children.length > 4) $('log').lastChild.remove();
}

function readouts() {
  const sum = state.a + state.b;
  const dif = state.a - state.b;
  $('va').textContent = state.a.toFixed(2);
  $('vb').textContent = state.b.toFixed(2);
  $('vt').textContent = state.t;
  $('gsum').textContent = sum.toFixed(2);
  $('gdif').textContent = dif.toFixed(2);

  const { climbing, forking, difRate, sumSettlesAt } = analysis(params);
  $('ssum').innerHTML = climbing
    ? '<span class="runaway">climbing without limit</span>'
    : `<span class="holding">settles near ${Number.isFinite(sumSettlesAt) ? sumSettlesAt.toFixed(1) : '—'}</span>`;
  $('sdif').innerHTML = forking
    ? `<span class="runaway">widening ×${difRate.toFixed(3)} per exchange</span>`
    : '<span class="holding">closing back up</span>';

  $('diagnosis').innerHTML = diagnoses[diagnose(state, params)];

  if (state.t > 12) {
    if (state.ruptured) log('The relationship breaks. One side can no longer answer the other.');
    if (forking && Math.abs(dif) > 6) log('Roles have hardened. One leads, the other follows, and neither now needs to decide to.');
    if (climbing && sum > 12) log('Both parties are far past where either meant to go.');
    if (!climbing && !forking && state.t > 60) log('Settled. The pattern is now self-correcting.');
  }
}

function render() {
  chart.draw(state);
  readouts();
}

let acc = 0;
let last = 0;
function frame(ts) {
  if (!running) return;
  if (!last) last = ts;
  acc += ts - last;
  last = ts;
  while (acc > TICK_MS) {
    step(state, params);
    acc -= TICK_MS;
  }
  render();
  requestAnimationFrame(frame);
}

function setRunning(v) {
  running = v;
  last = 0;
  acc = 0;
  $('run').textContent = v ? 'Pause' : 'Run';
  if (v) requestAnimationFrame(frame);
}

function reset() {
  state = createState();
  logged = {};
  $('log').innerHTML = '';
  chart.reset();
  render();
}

$('modes').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  params.mode = btn.dataset.mode;
  syncControls();
  render();
});

sliders.forEach(([key]) => {
  $(key).addEventListener('input', e => {
    params[key] = Number(e.target.value);
    label(key);
    render();
  });
});

const presetRow = $('presets');
presets.forEach(preset => {
  const btn = document.createElement('button');
  btn.textContent = preset.name;
  btn.onclick = () => {
    params = { ...params, ...preset };
    delete params.name;
    syncControls();
    reset();
    setRunning(true);
  };
  presetRow.appendChild(btn);
});

$('run').onclick = () => setRunning(!running);
$('step').onclick = () => { step(state, params); render(); };
$('reset').onclick = () => { setRunning(false); reset(); };
window.addEventListener('resize', () => { chart.resize(); render(); });

syncControls();
reset();
