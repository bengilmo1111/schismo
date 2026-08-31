// Wiring only: bind controls to params, run the clock, render readouts.

import {
  createState, defaultParams, step, analysis, diagnose, arrival, seedSensitivity,
  makeRng, encodeParams, decodeParams, presets, readings, polesKey,
  PARAM_RANGES, POLARIZED, CAP, HORIZON
} from './model.js';
import { createChart } from './chart.js';
import './lab.js';

const $ = id => document.getElementById(id);
const chart = createChart($('chart'));

let params = decodeParams(location.hash);
let state = createState(params);
let rng = makeRng(params.seed);
let running = false;
let logged = {};

const TICK_MS = 55;

const modeHints = {
  sym: 'Each answers the other in kind and tries to go one better. Turn restraint down to nothing and watch what a duel of boasts does.',
  comp: 'One asserts, the other yields, and each response invites more of the opposite. The pens pull apart rather than climbing together.',
  mix: 'Both readings run at the same time. Rivalry pulls the pens back together while dominance pushes them apart — which wins depends on the share below.'
};

// {sum} and {dif} are replaced with the current reading's names for the two quantities.
const diagnoses = {
  schism: '<b>Schism.</b> The runaway has gone past anything either party can answer. In Bateson’s reading this is where the relationship stops being one relationship.',
  escalation: '<b>Escalation.</b> Neither will be outdone and nothing pulls them back, so {sum} climbs without limit while {dif} stays small.',
  differentiation: '<b>Differentiation.</b> One side’s move is drawing out the opposite from the other, and {dif} widens by a fixed factor every exchange.',
  both: '<b>Both runaways at once.</b> {sum} and {dif} are growing together — the fastest route to breakdown.',
  held: '<b>Held.</b> Restraint is absorbing the feedback faster than it builds. This is the stable case, and Bateson thought it needed active work to maintain.',
  ceiling: '<b>A high ceiling.</b> Restraint still works — {sum} will stop — but it stops far past the point where the two are opposites. A weak brake is not the same as a brake.',
  drifting: '<b>Drifting.</b> {dif} is closing while {sum} keeps rising — pressure is going into the pair as a whole, not into their roles.',
  inert: '<b>Nothing to amplify.</b> The two start identical and there is no noise, so a process that can only magnify a difference has no difference to work on. Nudge the starting difference off zero, or add a little noise, and it begins.'
};

const sliders = ['ga', 'gb', 'm', 'ra', 'rb', 'n', 'blend', 's0'];
const decimals = { blend: 0, n: 2, s0: 2, default: 2 };

const reading = () => readings[params.reading] || readings.default;

/* ---- the starting-difference slider is logarithmic, so a hair's breadth is reachable ---- */
const D0_STEPS = 120;
const D0_LO = -3;          // 10^-3
const D0_SPAN = 3.6;       // up to 10^0.6, just under 4
const d0FromPos = pos => (pos <= 0 ? 0 : 10 ** (D0_LO + (D0_SPAN * (pos - 1)) / (D0_STEPS - 1)));
const posFromD0 = d0 => (d0 <= 0
  ? 0
  : Math.max(1, Math.min(D0_STEPS,
      1 + Math.round(((Math.log10(d0) - D0_LO) * (D0_STEPS - 1)) / D0_SPAN))));

const SEED_POINTS = [
  { d0: 0, label: 'identical' },
  { d0: 0.001, label: '0.001' },
  { d0: 0.01, label: '0.01' },
  { d0: 0.1, label: '0.1' },
  { d0: 1, label: '1.0' }
];

/* ---- labels ---- */

const num = (v, places = 2) => {
  const out = v.toFixed(places);
  return Number(out) === 0 ? (0).toFixed(places) : out; // never show a negative zero
};

function fmtD0(v) {
  if (v === 0) return '0';
  return v < 0.1 ? v.toPrecision(2) : v.toFixed(3);
}

function label(key) {
  if (key === 'blend') return void ($('lblend').textContent = Math.round(params.blend * 100) + '%');
  $('l' + key).textContent = params[key].toFixed(decimals[key] ?? decimals.default);
}

function syncControls() {
  const r = reading();
  sliders.forEach(key => {
    $(key).value = params[key];
    label(key);
  });
  $('d0log').value = posFromD0(params.d0);
  $('ld0').textContent = fmtD0(params.d0);
  $('seed').value = params.seed;

  [...$('modes').children].forEach(btn =>
    btn.setAttribute('aria-pressed', String(btn.dataset.mode === params.mode)));
  $('modehint').textContent = modeHints[params.mode];
  $('blendWrap').style.display = params.mode === 'mix' ? 'block' : 'none';

  [...$('seeds').children].forEach(btn =>
    btn.setAttribute('aria-pressed', String(Number(btn.dataset.d0) === params.d0)));

  $('namea').textContent = r.a;
  $('nameb').textContent = r.b;
  $('vtunit').textContent = r.tick.plural;
  ['ga', 'ra'].forEach(k => ($(k + '-who').textContent = r.a));
  ['gb', 'rb'].forEach(k => ($(k + '-who').textContent = r.b));
  $('hsum').textContent = r.sum.label;
  $('hdif').textContent = r.dif.label;
  $('chart').setAttribute('aria-label',
    `Two pens tracing ${r.a} and ${r.b}, each their ${r.what}.`);
  $('mirrorhint').textContent = r.mirror
    ? `Both pens measure ${r.what}, so ${r.b} is drawn below the line: the space between them is how far apart they are.`
    : '';
}

function log(msg) {
  if (logged[msg]) return;
  logged[msg] = true;
  const el = document.createElement('div');
  el.textContent = `t ${state.t} — ${msg}`;
  $('log').prepend(el);
  while ($('log').children.length > 4) $('log').lastChild.remove();
}

/* ---- the arrival clock: the direct answer to "how long until they are opposites" ---- */

function years(n) {
  const y = reading().tick.years;
  return y ? ` — about ${Math.round(n * y)} years` : '';
}

function clockText() {
  const r = reading();
  const key = polesKey(params);
  const q = r[key];
  const sep = q.short;
  let predicted = arrival(params)[key];
  let viaNoise = false;
  if (predicted === null && params.n > 0) {
    // Too small a seed to move on its own: the noise supplies one, so estimate from that.
    const floor = { ...params, s0: Math.max(params.s0, params.n), d0: Math.max(params.d0, params.n) };
    const guess = arrival(floor)[key];
    if (guess !== null) { predicted = guess; viaNoise = true; }
  }
  const actual = state.reached[key];
  const settled = analysis(params)[key === 'sum' ? 'sumSettlesAt' : 'difSettlesAt'];
  const unit = n => (n === 1 ? r.tick.unit : r.tick.plural);
  const from = q.from === 'gap'
    ? `Starting ${fmtD0(params.d0)} apart`
    : `Starting from a level of ${params.s0.toFixed(2)}`;

  let main;
  if (predicted === null && Number.isFinite(settled)) {
    main = `${from}, ${sep} settles near ${Math.abs(settled).toFixed(1)} and stops there. ` +
      `It never reaches ${POLARIZED}: they argue, but they do not become opposites.`;
  } else if (predicted === null) {
    main = `${sep[0].toUpperCase()}${sep.slice(1)} does not reach ${POLARIZED} within ${HORIZON} exchanges.`;
  } else {
    main = viaNoise
      ? `They start identical, so the noise has to supply the difference. At a noise of ` +
        `${params.n.toFixed(2)}, ${sep} reaches ${POLARIZED} after roughly ` +
        `<b>${predicted} ${unit(predicted)}</b>${years(predicted)}.`
      : `${from}, ${sep} reaches ${POLARIZED} after <b>${predicted} ${unit(predicted)}</b>${years(predicted)}.`;
  }
  if (actual !== null) {
    main += ` This run got there at t = ${actual}.`;
  } else if (predicted !== null && state.t > 0 && state.t < predicted) {
    main += ` ${predicted - state.t} to go.`;
  }

  const bought = seedSensitivity(params, key);
  const closer = q.from === 'gap' ? 'ten times closer together' : 'ten times nearer the baseline';
  let seedLine;
  if (predicted === null) {
    seedLine = 'Where they start makes no difference here — nothing is amplifying it.';
  } else if (bought === null) {
    seedLine = '';
  } else if (bought >= 3) {
    seedLine = `Starting ${closer} buys ${bought} more ${unit(bought)}. ` +
      `Ten times closer again buys the same ${bought} again — the seed sets the clock, the ` +
      'coupling settles the outcome.';
  } else {
    seedLine = `Starting ${closer} buys ${bought === 0 ? 'nothing' : bought + ' ' + unit(bought)}. ` +
      'Where they begin barely matters: the margin, not the seed, is doing the work.';
  }
  return { question: q.question, main, seedLine };
}

/* ---- readouts ---- */

function readouts() {
  const r = reading();
  const sum = state.a + state.b;
  const dif = state.a - state.b;
  $('va').textContent = num(state.a);
  $('vb').textContent = num(state.b);
  $('vt').textContent = state.t;
  $('gsum').textContent = num(sum);
  $('gdif').textContent = num(dif);

  const live = analysis(params, { sum, dif });
  // Past the cap the linear reading no longer describes anything, so stop claiming it does.
  const fate = (runaway, runawayText, settlesAt, places) => {
    if (state.ruptured) return '<span class="runaway">past the cap</span>';
    if (runaway) return `<span class="runaway">${runawayText}</span>`;
    return `<span class="holding">settles near ${Number.isFinite(settlesAt) ? num(settlesAt, places) : '—'}</span>`;
  };
  $('ssum').innerHTML = fate(live.climbing, 'climbing without limit', live.sumSettlesAt, 1);
  $('sdif').innerHTML = fate(live.forking, `widening ×${live.difRate.toFixed(3)} per exchange`, live.difSettlesAt, 2);

  $('diagnosis').innerHTML = diagnoses[diagnose(state, params)]
    .replace(/\{sum\}/g, r.sum.short)
    .replace(/\{dif\}/g, r.dif.short);

  const clock = clockText();
  $('clockhead').textContent = clock.question;
  $('clockmain').innerHTML = clock.main;
  $('clockseed').textContent = clock.seedLine;

  if (state.t > 12) {
    if (state.ruptured) log('The relationship breaks. One side can no longer answer the other.');
    if (live.forking && Math.abs(dif) > 6) log('Roles have hardened. One leads, the other follows, and neither now needs to decide to.');
    if (live.climbing && sum > 12) log('Both parties are far past where either meant to go.');
    if (live.coupled && Math.abs(dif) > 0.4 && !live.forking) log('The two are not alike, so the shared climb is leaking into a gap — one ends up further out than the other.');
    if (!live.climbing && !live.forking && state.t > 60) log('Settled. The pattern is now self-correcting.');
  }
}

function marks() {
  const r = reading();
  return [
    { t: state.reached.sum, label: r.sum.short },
    { t: state.reached.dif, label: r.dif.short }
  ].filter(mk => mk.t !== null);
}

function render() {
  chart.draw(state, {
    marks: marks(),
    mirror: !!reading().mirror,
    bands: [[POLARIZED, 'reached', 'opposites'], [2 * CAP, 'rupture', 'rupture']]
  });
  readouts();
}

/* ---- clock ---- */

let acc = 0;
let last = 0;
function frame(ts) {
  if (!running) return;
  if (!last) last = ts;
  acc += ts - last;
  last = ts;
  while (acc > TICK_MS) {
    step(state, params, rng);
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
  state = createState(params);
  rng = makeRng(params.seed);
  logged = {};
  $('log').innerHTML = '';
  chart.reset();
  render();
}

/* ---- sharing ---- */

let hashTimer = 0;
function publish() {
  clearTimeout(hashTimer);
  hashTimer = setTimeout(() => {
    const hash = encodeParams(params);
    history.replaceState(null, '', hash ? '#' + hash : location.pathname + location.search);
  }, 300);
}

function changed({ restart = false } = {}) {
  syncControls();
  publish();
  if (restart) reset(); else render();
}

/* ---- controls ---- */

sliders.forEach(key => {
  const [min, max, stepSize] = PARAM_RANGES[key];
  Object.assign($(key), { min, max, step: stepSize });
  $(key).addEventListener('input', e => {
    params[key] = Number(e.target.value);
    label(key);
    publish();
    render();
  });
});

$('d0log').max = D0_STEPS;
$('d0log').addEventListener('input', e => {
  params.d0 = Number(d0FromPos(Number(e.target.value)).toFixed(4));
  changed({ restart: true });
});

SEED_POINTS.forEach(point => {
  const btn = document.createElement('button');
  btn.textContent = point.label;
  btn.dataset.d0 = point.d0;
  btn.onclick = () => {
    params.d0 = point.d0;
    changed({ restart: true });
  };
  $('seeds').appendChild(btn);
});

$('modes').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  params.mode = btn.dataset.mode;
  changed();
});

$('seed').addEventListener('change', e => {
  params.seed = decodeParams('seed=' + e.target.value, params).seed;
  changed({ restart: true });
});
$('newseed').onclick = () => {
  params.seed = Math.floor(Math.random() * 999999);
  changed({ restart: true });
};

const groups = [...new Set(presets.map(p => p.group))];
groups.forEach(name => {
  const heading = document.createElement('h3');
  heading.className = 'group';
  heading.textContent = name;
  $('presets').appendChild(heading);
  const row = document.createElement('div');
  row.className = 'row tight';
  presets.filter(p => p.group === name).forEach(preset => {
    const btn = document.createElement('button');
    btn.textContent = preset.name;
    btn.onclick = () => {
      const { name: _n, group: _g, note, ...rest } = preset;
      params = { ...params, ...rest };
      $('presetnote').textContent = note;
      [...$('presets').querySelectorAll('button')].forEach(b =>
        b.setAttribute('aria-pressed', String(b === btn)));
      changed({ restart: true });
      setRunning(true);
    };
    row.appendChild(btn);
  });
  $('presets').appendChild(row);
});

$('run').onclick = () => setRunning(!running);
$('step').onclick = () => { step(state, params, rng); render(); };
$('reset').onclick = () => { setRunning(false); reset(); };

$('share').onclick = async () => {
  const url = location.origin + location.pathname + '#' + encodeParams(params);
  const done = ok => {
    $('share').textContent = ok ? 'Link copied' : 'Copy failed';
    setTimeout(() => ($('share').textContent = 'Copy link to this run'), 1600);
  };
  try {
    await navigator.clipboard.writeText(url);
    done(true);
  } catch {
    done(false);
  }
};

window.addEventListener('resize', () => { chart.resize(); render(); });

syncControls();
reset();
