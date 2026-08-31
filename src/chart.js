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

  function draw(state) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const css = getComputedStyle(document.documentElement);
    const colour = name => css.getPropertyValue(name).trim();
    ctx.clearRect(0, 0, w, h);

    const view = state.history.slice(-Math.max(60, Math.floor(w / 1.6)));
    let peak = 1;
    for (const p of view) peak = Math.max(peak, Math.abs(p.a), Math.abs(p.b));
    scale += (peak * 1.25 - scale) * 0.06;

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

    ctx.strokeStyle = colour('--rupture');
    ctx.setLineDash([3, 3]);
    const firstT = state.t - view.length + 1;
    for (const rt of state.ruptures) {
      if (rt < firstT) continue;
      const xx = Math.round(x(rt - firstT)) + 0.5;
      line(xx, 0, xx, h);
    }
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
      pts.forEach((p, i) => (i ? ctx.lineTo(x(i), y(p[key])) : ctx.moveTo(x(i), y(p[key]))));
      ctx.stroke();
      const last = pts[pts.length - 1];
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.arc(x(pts.length - 1), y(last[key]), 2.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function reset() {
    scale = 4;
  }

  resize();
  return { draw, resize, reset };
}
