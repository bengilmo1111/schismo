// Plots for the population views. Like chart.js, this owns no logic: it takes arrays and
// draws them. Colours come from CSS variables; nothing here imports a model constant.

const css = () => getComputedStyle(document.documentElement);
const colour = name => css().getPropertyValue(name).trim();

function fit(canvas) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: canvas.clientWidth, h: canvas.clientHeight };
}

function grid(ctx, w, h, pad) {
  ctx.strokeStyle = colour('--grid');
  ctx.lineWidth = 1;
  for (let k = 0; k <= 4; k++) {
    const y = Math.round(pad.top + ((h - pad.top - pad.bottom) * k) / 4) + 0.5;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
  }
  for (let k = 0; k <= 6; k++) {
    const x = Math.round(pad.left + ((w - pad.left - pad.right) * k) / 6) + 0.5;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, h - pad.bottom); ctx.stroke();
  }
}

/**
 * One or more distance-over-time curves. `series` is
 *   [{ points: number[], colour: '--pen-a', dim?: boolean, upTo?: number }]
 */
export function createCurvePlot(canvas) {
  const pad = { left: 30, right: 8, top: 10, bottom: 18 };

  function draw(series, opts = {}) {
    const { ctx, w, h } = fit(canvas);
    ctx.clearRect(0, 0, w, h);
    const maxT = opts.maxT || Math.max(1, ...series.map(s => s.points.length - 1));
    const maxY = opts.maxY || Math.max(0.1, ...series.flatMap(s => s.points)) * 1.15;
    const X = t => pad.left + (t / maxT) * (w - pad.left - pad.right);
    const Y = v => h - pad.bottom - (v / maxY) * (h - pad.top - pad.bottom);

    grid(ctx, w, h, pad);

    if (opts.markT !== undefined && opts.markT !== null) {
      ctx.strokeStyle = colour('--reached');
      ctx.setLineDash([3, 3]);
      const x = Math.round(X(opts.markT)) + 0.5;
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, h - pad.bottom); ctx.stroke();
      ctx.setLineDash([]);
      if (opts.markLabel) {
        ctx.fillStyle = colour('--reached');
        ctx.font = '10px ui-sans-serif, -apple-system, sans-serif';
        ctx.textAlign = X(opts.markT) > w * 0.6 ? 'right' : 'left';
        ctx.fillText(opts.markLabel, X(opts.markT) + (X(opts.markT) > w * 0.6 ? -4 : 4), pad.top + 10);
      }
    }

    ctx.font = '10px ui-sans-serif, -apple-system, sans-serif';
    ctx.fillStyle = colour('--ink-soft');
    ctx.textAlign = 'right';
    for (let k = 0; k <= 4; k++) {
      const v = (maxY * (4 - k)) / 4;
      ctx.fillText(v.toFixed(2), pad.left - 5, pad.top + ((h - pad.top - pad.bottom) * k) / 4 + 3);
    }
    ctx.textAlign = 'center';
    ctx.fillText(opts.xLabel || '', (w + pad.left) / 2, h - 5);

    for (const s of series) {
      const upTo = s.upTo === undefined ? s.points.length - 1 : Math.min(s.upTo, s.points.length - 1);
      if (upTo < 0) continue;
      ctx.strokeStyle = colour(s.colour);
      ctx.globalAlpha = s.dim ? 0.28 : 1;
      ctx.lineWidth = s.dim ? 1 : 2;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let t = 0; t <= upTo; t++) (t ? ctx.lineTo(X(t), Y(s.points[t])) : ctx.moveTo(X(0), Y(s.points[0])));
      ctx.stroke();
      if (!s.dim) {
        ctx.fillStyle = colour(s.colour);
        ctx.beginPath(); ctx.arc(X(upTo), Y(s.points[upTo]), 2.8, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }
  return { draw };
}

/**
 * The distribution over time: one column of shaded bins per frame, with the two group
 * centroids drawn over it. Shows whether a widening gap is two humps separating or one
 * distribution stretching, which a centroid line cannot.
 */
export function createRibbonPlot(canvas) {
  function draw(frames, opts = {}) {
    const { ctx, w, h } = fit(canvas);
    ctx.clearRect(0, 0, w, h);
    if (!frames.length) return;
    const lo = opts.lo ?? -2.5;
    const hi = opts.hi ?? 2.5;
    const Y = v => h - ((v - lo) / (hi - lo)) * h;
    const cw = Math.max(1, w / frames.length);
    const ink = colour('--ribbon');

    frames.forEach((f, i) => {
      const bins = f.bins;
      const bh = h / bins.length;
      for (let b = 0; b < bins.length; b++) {
        if (bins[b] <= 0.01) continue;
        ctx.fillStyle = ink;
        ctx.globalAlpha = Math.min(0.9, bins[b] ** 0.6); // gamma: thin tails stay visible
        ctx.fillRect(i * cw, h - (b + 1) * bh, cw + 0.6, bh + 0.6);
      }
    });
    ctx.globalAlpha = 1;

    ctx.strokeStyle = colour('--grid-strong');
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, Math.round(Y(0)) + 0.5); ctx.lineTo(w, Math.round(Y(0)) + 0.5); ctx.stroke();

    for (const [key, col] of [['meanA', '--pen-a'], ['meanB', '--pen-b']]) {
      ctx.strokeStyle = colour(col);
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      frames.forEach((f, i) => (i ? ctx.lineTo(i * cw, Y(f[key])) : ctx.moveTo(0, Y(f[key]))));
      ctx.stroke();
    }
  }
  return { draw };
}

/** Roles on their own two axes, because one axis cannot show a complementary pair. */
export function createScatterPlot(canvas) {
  function draw(state, opts = {}) {
    const { ctx, w, h } = fit(canvas);
    ctx.clearRect(0, 0, w, h);
    const lim = opts.lim || 1;
    const X = v => 6 + (v / lim) * (w - 12);
    const Y = v => h - 6 - (v / lim) * (h - 12);
    ctx.strokeStyle = colour('--grid');
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(0), 0); ctx.lineTo(X(0), h); ctx.moveTo(0, Y(0)); ctx.lineTo(w, Y(0)); ctx.stroke();
    ctx.strokeStyle = colour('--grid-strong');
    ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(lim), Y(lim)); ctx.stroke();
    for (let i = 0; i < state.n; i++) {
      ctx.fillStyle = colour(state.g[i] === 0 ? '--pen-a' : '--pen-b');
      ctx.globalAlpha = 0.45;
      ctx.beginPath(); ctx.arc(X(state.press[i]), Y(state.yieldd[i]), 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = colour('--ink-soft');
    ctx.font = '10px ui-sans-serif, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    if (opts.idle) {
      ctx.textAlign = 'center';
      ctx.fillText('no role dynamics active', w / 2, h / 2);
      ctx.textAlign = 'left';
    }
    ctx.fillText('demand →', 8, h - 8);
    ctx.save(); ctx.translate(11, h - 14); ctx.rotate(-Math.PI / 2);
    ctx.fillText('withdrawal →', 0, 0); ctx.restore();
  }
  return { draw };
}

/**
 * The people themselves. One dot per agent, placed by trait, banded by group, with the ties
 * that still cross the boundary drawn underneath and newcomers ringed.
 *
 * This exists because the three mechanisms are obvious here and invisible in a centroid line:
 * under reciprocal response every dot slides, under sorting the dots barely move while the
 * cross-boundary ties disappear, and under exit the dots do not move at all — they vanish and
 * reappear on their own side.
 */
export function createPeoplePlot(canvas) {
  const jitter = i => (Math.sin(i * 12.9898) * 43758.5453 % 1 + 1) % 1;

  function draw(state, opts = {}) {
    const { ctx, w, h } = fit(canvas);
    ctx.clearRect(0, 0, w, h);
    if (!state) return;
    // One scale for every panel, or they stop being comparable — and the comparison is the
    // whole point. Values beyond it are pinned to the edge rather than dropped.
    const lim = opts.lim || 1;
    const X = v => w / 2 + Math.max(-1, Math.min(1, v / lim)) * (w / 2 - 8);
    const band = (g, i) => (g === 0 ? 6 + jitter(i) * (h / 2 - 12) : h / 2 + 6 + jitter(i) * (h / 2 - 12));

    ctx.strokeStyle = colour('--grid-strong');
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, Math.round(h / 2) + 0.5); ctx.lineTo(w, Math.round(h / 2) + 0.5); ctx.stroke();
    ctx.strokeStyle = colour('--grid');
    ctx.beginPath(); ctx.moveTo(Math.round(w / 2) + 0.5, 0); ctx.lineTo(Math.round(w / 2) + 0.5, h); ctx.stroke();

    // Ties that still reach across the boundary. Watching these thin out is what sorting is.
    if (opts.ties !== false) {
      const per = state.ties.length / state.n;
      ctx.strokeStyle = colour('--grid-strong');
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let i = 0; i < state.n; i++) {
        for (let k = 0; k < per; k++) {
          const j = state.ties[i * per + k];
          if (j < 0 || state.g[j] === state.g[i]) continue;
          ctx.moveTo(X(state.x[i]), band(state.g[i], i));
          ctx.lineTo(X(state.x[j]), band(state.g[j], j));
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    for (let i = 0; i < state.n; i++) {
      const fresh = state.entered && state.t - state.entered[i] < 6 && state.entered[i] > 0;
      ctx.fillStyle = colour(state.g[i] === 0 ? '--pen-a' : '--pen-b');
      ctx.globalAlpha = fresh ? 1 : 0.55;
      ctx.beginPath();
      ctx.arc(X(state.x[i]), band(state.g[i], i), fresh ? 3 : 2, 0, Math.PI * 2);
      ctx.fill();
      if (fresh) {                       // a newcomer: somebody left and this is who replaced them
        ctx.globalAlpha = 1;
        ctx.strokeStyle = colour('--reached');
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(X(state.x[i]), band(state.g[i], i), 5, 0, Math.PI * 2); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
  return { draw };
}
