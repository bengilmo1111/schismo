// Dual-pen chart recorder. Reads state, draws pixels, owns no simulation logic.

export function createChart(canvas) {
  const ctx = canvas.getContext('2d');
  let scale = 4; // smoothed vertical range, so the paper doesn't jump every frame

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // `mirror` draws B below the centre line. Some readings measure both parties' distance from
  // a shared middle in opposite directions; there the gap you can see is a + b, not a - b.
  function draw(state, { marks = [], mirror = false, bands = [] } = {}) {
    const val = (p, key) => (mirror && key === 'b' ? -p[key] : p[key]);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const css = getComputedStyle(document.documentElement);
    const colour = name => css.getPropertyValue(name).trim();
    ctx.clearRect(0, 0, w, h);

    const view = state.history.slice(-Math.max(60, Math.floor(w / 1.6)));
    let peak = 1;
    for (const p of view) peak = Math.max(peak, Math.abs(p.a), Math.abs(p.b));
    // Keep the first band on the paper: without a fixed reference the auto-scale would make a
    // run that settles low and one that settles high look identical.
    const floor = bands.length ? bands[0][0] / 1.6 : 0;
    scale += (Math.max(peak * 1.25, floor) - scale) * 0.06;

    const mid = h / 2;
    const ppu = (h / 2 - 8) / scale;
    const y = v => mid - v * ppu;
    const x = i => (i / (view.length - 1 || 1)) * (w - 14) + 7;

    ctx.strokeStyle = colour('--grid');
    ctx.lineWidth = 1;
    for (let k = 1; k < 8; k++) line(0, Math.round(h * k / 8) + 0.5, w, Math.round(h * k / 8) + 0.5);
    for (let k = 1; k < 10; k++) line(Math.round(w * k / 10) + 0.5, 0, Math.round(w * k / 10) + 0.5, h);
    ctx.strokeStyle = colour('--grid-strong');
    line(0, Math.round(mid) + 0.5, w, Math.round(mid) + 0.5);

    // The distance between the pens is the thing schismogenesis is about, so shade it.
    ctx.fillStyle = colour('--gap');
    ctx.beginPath();
    view.forEach((p, i) => (i ? ctx.lineTo(x(i), y(val(p, 'a'))) : ctx.moveTo(x(0), y(val(p, 'a')))));
    for (let i = view.length - 1; i >= 0; i--) ctx.lineTo(x(i), y(val(view[i], 'b')));
    ctx.closePath();
    ctx.fill();

    // Two pens sitting symmetrically at +/- half a threshold are exactly that far apart, so a
    // fixed pair of rules reads correctly whichever quantity the run is being judged on.
    ctx.setLineDash([2, 4]);
    ctx.font = '10px ui-sans-serif, -apple-system, "Segoe UI", sans-serif';
    ctx.textAlign = 'right';
    for (const [level, name, text] of bands) {
      const half = level / 2;
      if (half > scale) continue;
      const col = colour('--' + name);
      ctx.strokeStyle = col;
      line(0, Math.round(y(half)) + 0.5, w, Math.round(y(half)) + 0.5);
      line(0, Math.round(y(-half)) + 0.5, w, Math.round(y(-half)) + 0.5);
      ctx.fillStyle = col;
      ctx.fillText(text, w - 5, y(half) - 4);
    }
    ctx.setLineDash([]);

    const firstT = state.t - view.length + 1;
    const rule = (t, col, text) => {
      if (t === null || t === undefined || t < firstT) return;
      const xx = Math.round(x(t - firstT)) + 0.5;
      ctx.strokeStyle = col;
      line(xx, 0, xx, h);
      if (!text) return;
      ctx.fillStyle = col;
      ctx.font = '10px ui-sans-serif, -apple-system, "Segoe UI", sans-serif';
      const flip = xx > w - ctx.measureText(text).width - 10;
      ctx.textAlign = flip ? 'right' : 'left';
      ctx.fillText(text, xx + (flip ? -4 : 4), 12);
    };

    ctx.setLineDash([3, 3]);
    for (const mark of marks) rule(mark.t, colour('--reached'), mark.label);
    for (const rt of state.ruptures) rule(rt, colour('--rupture'), 'rupture');
    ctx.setLineDash([]);

    pen(view, 'b', colour('--pen-b'));
    pen(view, 'a', colour('--pen-a'));

    function line(x1, y1, x2, y2) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function pen(pts, key, col) {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.7;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(x(i), y(val(p, key))) : ctx.moveTo(x(i), y(val(p, key)))));
      ctx.stroke();
      const last = pts[pts.length - 1];
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x(pts.length - 1), y(val(last, key)), 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function reset() {
    scale = 4;
  }

  resize();
  return { draw, resize, reset };
}
