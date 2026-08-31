// Wiring for the four acts and the population laboratory. Like app.js this is wiring only:
// every number it shows comes from population.js or measures.js, and every plot from plot.js.

import {
  ARMS, armControls, DEMO_BASE, INTERVENTIONS, interventionAt,
  runPopulation, createPopulation, stepPopulation, gains
} from './population.js';
import { summarise, histogram, seedSpread } from './measures.js';
import { createCurvePlot, createRibbonPlot, createScatterPlot } from './plot.js';
import { makeRng } from './model.js';

const $ = id => document.getElementById(id);
const STEPS = 90;
const N = 240;
const COLOUR = { reciprocal: '--pen-a', sorting: '--pen-b', exit: '--pen-c' };
const num = (v, p = 2) => (Number(v.toFixed(p)) === 0 ? (0).toFixed(p) : v.toFixed(p));

/* ---- runs ---- */

const traceOf = (armKey, seed, interventions = []) =>
  runPopulation(armControls(armKey), { n: N, seed, steps: STEPS, interventions }, s => ({
    ...summarise(s),
    bins: histogram(s)
  })).trace;

const demoSeed = 3;
const runs = Object.fromEntries(ARMS.map(a => [a.key, traceOf(a.key, demoSeed)]));
const distances = key => runs[key].map(f => f.distance);
const truth = ARMS[Math.floor(Math.random() * ARMS.length)].key;

/* ---- act 1: the challenge ---- */

const challenge = createCurvePlot($('challenge'));
let shown = 0;
let revealed = false;

function drawChallenge() {
  challenge.draw([{ points: distances(truth), colour: '--ink', upTo: shown }],
    { maxT: STEPS, maxY: 0.46, xLabel: 'election cycles' });
}

function animate() {
  if (shown < STEPS) {
    shown += 1;
    drawChallenge();
    requestAnimationFrame(animate);
  }
}

const armCharts = {};
ARMS.forEach(arm => {
  const btn = document.createElement('button');
  btn.textContent = arm.name;
  btn.dataset.arm = arm.key;
  btn.onclick = () => reveal(arm.key);
  $('guesses').appendChild(btn);

  const fig = document.createElement('figure');
  fig.innerHTML = `<canvas></canvas><figcaption><b>${arm.name}</b><br><span class="ref">${arm.module}</span></figcaption>`;
  $('armCharts').appendChild(fig);
  armCharts[arm.key] = createCurvePlot(fig.querySelector('canvas'));
});

function reveal(picked) {
  revealed = true;
  shown = STEPS;
  drawChallenge();
  [...$('guesses').children].forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.arm === picked)));

  const arm = ARMS.find(a => a.key === picked);
  const right = picked === truth;
  $('revealText').innerHTML = right
    ? `<b>You were right — and that is the problem.</b> This line did come from ` +
      `“${arm.name.toLowerCase()}”. But the other two answers produce it just as well, so being ` +
      `right here was not something the chart could have told you.`
    : `<b>Not wrong, exactly.</b> This particular line came from ` +
      `“${ARMS.find(a => a.key === truth).name.toLowerCase()}” — but “${arm.name.toLowerCase()}” ` +
      `produces the same line, and so does the third answer. All three are below.`;

  $('reveal').hidden = false;
  ARMS.forEach(a => {
    armCharts[a.key].draw([
      { points: distances(truth), colour: '--grid-strong', dim: true },
      { points: distances(a.key), colour: COLOUR[a.key] }
    ], { maxT: STEPS, maxY: 0.46 });
  });
  $('act2').hidden = false;
  $('act3').hidden = false;
  buildPanel();
  runIntervention();
}

/* ---- act 2: the panel ---- */

// `sep` is the smallest difference worth calling a difference, per measure.
const ROWS = [
  { key: 'distance', sep: 0.10, label: 'Distance between the groups',
    weakens: 'The number everybody quotes. On its own it is compatible with all three.' },
  { key: 'influenceShare', sep: 0.30, label: 'Share of the move that is people changing their minds',
    weakens: 'Near zero means nobody was persuaded — the membership changed instead (§2.1).' },
  { key: 'replaced', sep: 0.10, label: 'Share of members who left and were replaced',
    weakens: 'Zero rules out exit and replacement entirely.' },
  { key: 'crossTies', sep: 0.06, label: 'Ties that still cross the boundary',
    weakens: 'Unchanged at a half rules out sorting: nobody stopped talking to anybody.' },
  { key: 'within', sep: 0.10, label: 'Spread inside each group',
    weakens: 'A group that moved as a block is not the same as one that stretched (§11.1).' },
  { key: 'bimodality', sep: 0.20, label: 'Two humps, or one wide one',
    weakens: 'Above about 0.55 suggests two modes; it is a hint, not a verdict (§11.1).' }
];

function buildPanel() {
  const head = document.createElement('tr');
  head.innerHTML = '<th></th>' + ARMS.map(a =>
    `<th style="color:var(${COLOUR[a.key]})">${a.name}</th>`).join('');
  $('panelBody').replaceChildren(head);

  ROWS.forEach(row => {
    const vals = ARMS.map(a => runs[a.key][STEPS][row.key]);
    const hi = Math.max(...vals), lo = Math.min(...vals);
    // Each measure needs its own bar: a 0.09 swing in a tie proportion means something,
    // the same swing in a share that runs 0 to 1 does not.
    const separates = hi - lo > row.sep;
    const tr = document.createElement('tr');
    tr.className = 'prow' + (separates ? '' : ' flat');
    tr.tabIndex = 0;
    tr.innerHTML = `<td class="rlab">${row.label}</td>` + vals.map(v => {
      const odd = separates && (v === hi || v === lo);
      return `<td class="${odd ? 'odd' : ''}">${num(v)}</td>`;
    }).join('');
    const explain = () => {
      [...$('panelBody').querySelectorAll('tr')].forEach(r => r.classList.remove('picked'));
      tr.classList.add('picked');
      $('panelNote').innerHTML = separates
        ? `<b>${row.label}.</b> ${row.weakens}`
        : `<b>${row.label}.</b> This one does not separate them — all three land in the same ` +
          `place, which is why a panel beats a score. ${row.weakens}`;
    };
    tr.onclick = explain;
    tr.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); explain(); } };
    $('panelBody').appendChild(tr);
  });
  $('panelNote').innerHTML = 'Pick a row. Highlighted cells are the ones that stand apart.';
}

/* ---- act 3: interventions ---- */

const ivCharts = {};
ARMS.forEach(arm => {
  const fig = document.createElement('figure');
  fig.innerHTML = `<canvas></canvas><figcaption><b>${arm.name}</b><br><span class="pct"></span></figcaption>`;
  $('ivCharts').appendChild(fig);
  ivCharts[arm.key] = { plot: createCurvePlot(fig.querySelector('canvas')), pct: fig.querySelector('.pct') };
});

let chosenIv = 'answer';
INTERVENTIONS.forEach(iv => {
  const btn = document.createElement('button');
  btn.textContent = iv.name;
  btn.dataset.iv = iv.key;
  btn.onclick = () => { chosenIv = iv.key; runIntervention(); };
  $('ivButtons').appendChild(btn);
});
$('ivAt').addEventListener('input', e => { $('livAt').textContent = e.target.value; runIntervention(); });

function runIntervention() {
  const at = Number($('ivAt').value);
  const iv = INTERVENTIONS.find(v => v.key === chosenIv);
  [...$('ivButtons').children].forEach(b =>
    b.setAttribute('aria-pressed', String(b.dataset.iv === chosenIv)));

  const effects = [];
  ARMS.forEach(arm => {
    const after = traceOf(arm.key, demoSeed, interventionAt(chosenIv, at)).map(f => f.distance);
    const base = distances(arm.key);
    const pct = (after[STEPS] - base[STEPS]) / base[STEPS];
    effects.push({ key: arm.key, pct });
    ivCharts[arm.key].plot.draw([
      { points: base, colour: '--grid-strong', dim: true },
      { points: after, colour: COLOUR[arm.key] }
    ], { maxT: STEPS, maxY: 0.46, markT: at });
    const cell = ivCharts[arm.key].pct;
    cell.textContent = `${pct > 0 ? '+' : ''}${Math.round(pct * 100)}%`;
    cell.className = 'pct ' + (pct < -0.15 ? 'good' : pct > 0.02 ? 'bad' : 'nil');
  });

  const worked = effects.filter(e => e.pct < -0.15).map(e => ARMS.find(a => a.key === e.key).name);
  const backfired = effects.filter(e => e.pct > 0.02).map(e => ARMS.find(a => a.key === e.key).name);
  let verdict;
  if (backfired.length) {
    verdict = `It made things <b>worse</b> for “${backfired[0].toLowerCase()}”. Contact is not ` +
      'automatically benign: unstructured exposure to people you already read as hostile can ' +
      'harden the boundary rather than open it (<span class="ref">§8.4, §13.2</span>).';
  } else if (worked.length === 0) {
    verdict = 'Almost nothing. Selective exit does its damage early and does not undo: closing ' +
      'the door keeps more people in, but nobody who already went comes back. Drag the cycle ' +
      'slider left and it helps more — never completely.';
  } else if (worked.length === ARMS.length) {
    verdict = 'It worked on all three — by pulling everyone back toward the middle regardless of ' +
      'what was happening. That is suppression rather than a cure, and the guide is pointed ' +
      'about it: “depolarization can mean suppressing legitimate dissent” ' +
      '(<span class="ref">§13.3</span>).';
  } else {
    verdict = `It worked on “${worked[0].toLowerCase()}” and did nothing measurable to the other ` +
      'two. That is the whole cost of misreading the curve: the remedy that fixes one of these ' +
      'runs is wasted on the others (<span class="ref">§18.2</span>).';
  }
  $('ivNote').innerHTML = `<b>${iv.name}.</b> ${iv.note} ${verdict}`;
}

/* ---- act 4: the laboratory ---- */

const SLIDERS = [
  ['respond', 'Reciprocal response to the other group'],
  ['margin', 'Need to go one better'],
  ['damping', 'Restraint'],
  ['complement', 'Complementary role response'],
  ['assimilate', 'Movement toward a contact'],
  ['confidence', 'How far away a contact is still heard'],
  ['repel', 'Reactance across the boundary'],
  ['homophily', 'Preference for similar partners'],
  ['rewire', 'Rate of dropping and reforming ties'],
  ['exit', 'Rate at which the uncomfortable leave'],
  ['drift', 'Undirected copying error'],
  ['noise', 'Noise'],
  ['similarity', 'How alike the groups start'],
  ['heterogeneity', 'Spread inside each group at the start']
];

const MODULES = [
  { name: 'Symmetrical Bateson', set: { respond: 0.022, margin: 0.64, damping: 0.145 } },
  { name: 'Complementary Bateson', set: { complement: 0.3 } },
  { name: 'Bounded confidence', set: { assimilate: 0.6, confidence: 1 } },
  { name: 'Sorting', set: { assimilate: 0.60, confidence: 0.05, repel: 0.19, homophily: 0.97, rewire: 0.79 } },
  { name: 'Selective exit', set: { exit: 0.9 } },
  { name: 'Pure drift', set: { drift: 0.5 } }
];

const ribbon = createRibbonPlot($('pRibbon'));
const curve = createCurvePlot($('pCurve'));
const scatter = createScatterPlot($('pRoles'));

let controls = { ...DEMO_BASE };
let live = null;
let frames = [];
let ghosts = [];
let labSeed = 7;
let running = false;

function labReset(keepGhosts = true) {
  if (!keepGhosts) ghosts = [];
  else if (frames.length > 2) {
    ghosts.push(frames.map(f => f.distance));
    while (ghosts.length > 5) ghosts.shift();
  }
  live = createPopulation(controls, { n: N, seed: labSeed });
  frames = [snapshot()];
  labDraw();
}

// Keep the raw traits rather than pre-binned counts, so the ribbon can re-bin against
// whatever range the run actually reaches instead of a guess made before it started.
function snapshot() {
  return {
    ...summarise(live),
    xs: Float64Array.from(live.x),
    meanA: mean(live, 0),
    meanB: mean(live, 1)
  };
}

function mean(state, want) {
  let s = 0, c = 0;
  for (let i = 0; i < state.n; i++) if (state.g[i] === want) { s += state.x[i]; c++; }
  return c ? s / c : 0;
}

function labDraw() {
  let reach = 0.5;
  for (const f of frames) for (let i = 0; i < f.xs.length; i++) reach = Math.max(reach, Math.abs(f.xs[i]));
  const lim = reach * 1.1;
  ribbon.draw(frames.map(f => ({ ...f, bins: histogram({ x: f.xs, n: f.xs.length }, 46, -lim, lim) })),
    { lo: -lim, hi: lim });
  curve.draw([
    ...ghosts.map(points => ({ points, colour: '--ink-soft', dim: true })),
    { points: frames.map(f => f.distance), colour: '--reached' }
  ], { maxT: STEPS, xLabel: 'cycles' });
  scatter.draw(live, {
    lim: Math.max(0.3, ...live.press, ...live.yieldd),
    idle: controls.complement === 0
  });
  $('pT').textContent = live.t;

  const f = frames[frames.length - 1];
  $('pPanel').replaceChildren(...ROWS.map(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="rlab">${row.label}</td><td>${num(f[row.key])}</td>`;
    return tr;
  }));
}

const labRng = () => labRngFn();
let labRngFn = makeRng(labSeed + 7919);

function labFrame() {
  if (!running) return;
  for (let k = 0; k < 2 && live.t < STEPS; k++) {
    stepPopulation(live, labRng);
    frames.push(snapshot());
  }
  labDraw();
  if (live.t >= STEPS) { running = false; $('pRun').textContent = 'Run'; return; }
  requestAnimationFrame(labFrame);
}

function setLabRunning(v) {
  running = v;
  $('pRun').textContent = v ? 'Pause' : 'Run';
  if (v) requestAnimationFrame(labFrame);
}

SLIDERS.forEach(([key, label]) => {
  const wrap = document.createElement('label');
  wrap.className = 'slider';
  wrap.innerHTML = `<span class="lab"><span>${label}</span><span id="pl-${key}"></span></span>` +
    `<input type="range" id="pc-${key}" min="0" max="1" step="0.01">`;
  $('pSliders').appendChild(wrap);
  const input = wrap.querySelector('input');
  input.addEventListener('input', e => {
    controls[key] = Number(e.target.value);
    $(`pl-${key}`).textContent = num(controls[key]);
    if (key === 'similarity' || key === 'heterogeneity') labReset(false);
    publish();
  });
});

MODULES.forEach(mod => {
  const btn = document.createElement('button');
  btn.textContent = mod.name;
  btn.onclick = () => {
    controls = { ...DEMO_BASE, ...mod.set };
    labRngFn = makeRng(labSeed + 7919);
    syncLab();
    labReset(false);
    setLabRunning(true);
  };
  $('modules').appendChild(btn);
});

function syncLab() {
  SLIDERS.forEach(([key]) => {
    $(`pc-${key}`).value = controls[key];
    $(`pl-${key}`).textContent = num(controls[key]);
  });
}

$('pRun').onclick = () => setLabRunning(!running);
$('pAgain').onclick = () => {
  labSeed = Math.floor(Math.random() * 99999);
  labRngFn = makeRng(labSeed + 7919);
  labReset(true);
  setLabRunning(true);
};
$('pClear').onclick = () => { ghosts = []; labDraw(); };
$('pShare').onclick = async () => {
  const q = SLIDERS.map(([k]) => `${k}=${Number(controls[k].toFixed(3))}`).join('&');
  try {
    await navigator.clipboard.writeText(`${location.origin}${location.pathname}?lab=${encodeURIComponent(q)}`);
    $('pShare').textContent = 'Link copied';
  } catch { $('pShare').textContent = 'Copy failed'; }
  setTimeout(() => ($('pShare').textContent = 'Copy link'), 1600);
};

function publish() { /* the lab shares on demand rather than on every drag */ }

/* ---- view switch ---- */

$('views').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const pop = btn.dataset.view === 'pop';
  [...$('views').children].forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  $('popView').hidden = !pop;
  $('dyadView').hidden = pop;
  window.dispatchEvent(new Event('resize')); // let both renderers re-measure their canvases
  if (pop) labDraw();
});

window.addEventListener('resize', () => {
  drawChallenge();
  if (revealed) { ARMS.forEach(a => armCharts[a.key].draw([
    { points: distances(truth), colour: '--grid-strong', dim: true },
    { points: distances(a.key), colour: COLOUR[a.key] }], { maxT: STEPS, maxY: 0.46 })); runIntervention(); }
  if (!$('popView').hidden) labDraw();
});

/* ---- boot ---- */

const fromUrl = new URLSearchParams(location.search).get('lab');
if (fromUrl) {
  for (const pair of fromUrl.split('&')) {
    const [k, v] = pair.split('=');
    if (Object.prototype.hasOwnProperty.call(controls, k) && Number.isFinite(Number(v))) {
      controls[k] = Math.max(0, Math.min(1, Number(v)));
    }
  }
}
syncLab();
labReset(false);
drawChallenge();
animate();
