import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { hex, contrast, luminance, simulate, deltaE, tokens, hue } from './colour.js';

const css = fs.readFileSync('styles.css', 'utf8');
const T = tokens(css);
const c = name => hex(T[name]);
const CVD = ['protanopia', 'deuteranopia', 'tritanopia'];
const worstCVD = (a, b) => Math.min(...CVD.map(k => deltaE(simulate(a, k), simulate(b, k))));

test('the palette defines every token the renderers ask for', () => {
  for (const name of ['--plot', '--plot-grid', '--ink', '--ink-soft', '--on-plot', '--on-plot-soft',
    '--group-a', '--group-a-ink', '--group-b', '--group-b-ink', '--mech-1', '--mech-2', '--mech-3',
    '--shared', '--action', '--rupture', '--rupture-ink', '--page', '--surface']) {
    assert.ok(T[name], `styles.css is missing ${name}`);
  }
});

test('the two groups are not the political red and blue', () => {
  // The art direction forbids red/blue party semantics and then specifies coral and cobalt.
  // Colour does the signifying, so the pair itself has to change, not the copy.
  // Judged on hue, not channel dominance: amber's dominant channel is red without amber
  // being red. The bands below are the ones that carry party association.
  for (const name of ['--group-a', '--group-b']) {
    const h = hue(c(name));
    const red = h < 20 || h > 340;
    const blue = h >= 205 && h <= 265;
    assert.ok(!(red || blue),
      `${name} ${T[name]} sits at ${h.toFixed(0)}deg, inside a party-coloured band`);
  }
});

test('groups stay apart for the common colour-vision deficiencies', () => {
  const a = c('--group-a'), b = c('--group-b');
  assert.ok(deltaE(a, b) > 40, 'the groups should be plainly different to begin with');
  assert.ok(worstCVD(a, b) > 25, `worst simulated separation is only ${worstCVD(a, b).toFixed(0)}`);
});

test('groups stay apart in greyscale', () => {
  // A monochrome screenshot, or a printout. Shape carries most of this, but not all of it.
  const d = Math.abs(luminance(c('--group-a')) - luminance(c('--group-b')));
  assert.ok(d > 0.06, `greyscale separation is only ${d.toFixed(3)}`);
});

test('the three stories stay apart from each other too', () => {
  const m = ['--mech-1', '--mech-2', '--mech-3'].map(c);
  for (let i = 0; i < m.length; i++) {
    for (let j = i + 1; j < m.length; j++) {
      assert.ok(worstCVD(m[i], m[j]) > 25,
        `mech ${i + 1} and ${j + 1} collapse to ${worstCVD(m[i], m[j]).toFixed(0)} under simulation`);
    }
  }
});

test('marks are visible on the dark board and text meets AA on the light ones', () => {
  const plot = c('--plot');
  for (const name of ['--group-a', '--group-b', '--mech-1', '--mech-2', '--mech-3', '--shared',
    '--action', '--rupture', '--on-plot']) {
    assert.ok(contrast(c(name), plot) >= 3,
      `${name} is only ${contrast(c(name), plot).toFixed(1)}:1 on the plot board`);
  }
  for (const surface of ['--page', '--surface']) {
    for (const name of ['--ink', '--ink-soft', '--group-a-ink', '--group-b-ink', '--mech-1-ink',
      '--mech-2-ink', '--mech-3-ink', '--rupture-ink', '--shared-ink']) {
      const ratio = contrast(c(name), c(surface));
      assert.ok(ratio >= 4.5, `${name} on ${surface} is ${ratio.toFixed(2)}:1, below AA`);
    }
  }
});

test('no functional text is smaller than 13px', () => {
  // Resolved against the 16px root the narrow breakpoint uses, which is the smaller of the two.
  const ROOT = 16;
  for (const m of css.matchAll(/font-size:\s*([0-9.]+)(px|rem|em)/g)) {
    const [, value, unit] = m;
    assert.notEqual(unit, 'em',
      `font-size in em compounds and cannot be checked: ${m[0]}`);
    const px = unit === 'px' ? Number(value) : Number(value) * ROOT;
    assert.ok(px >= 13, `${m[0]} resolves to ${px.toFixed(1)}px`);
  }
});
