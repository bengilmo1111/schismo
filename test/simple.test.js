import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SIMPLE_UI, SIMPLE_ARMS, SIMPLE_INTERVENTIONS, SIMPLE_TEXT, SIMPLE_HIDES } from '../src/simple.js';
import { ARMS, INTERVENTIONS } from '../src/population.js';

const markup = fs.readFileSync('index.html', 'utf8');

const strings = () => [
  ...Object.values(SIMPLE_UI),
  ...Object.values(SIMPLE_ARMS).flatMap(a => [a.name, a.verdict, a.blurb]),
  ...Object.values(SIMPLE_INTERVENTIONS).flatMap(i => [i.name, i.note]),
  SIMPLE_TEXT.nothing,
  SIMPLE_TEXT.everything,
  SIMPLE_TEXT.worked('the middle left'),
  SIMPLE_TEXT.backfired('the middle left'),
  SIMPLE_TEXT.ground('58%', '0%', '6%', '57%'),
  SIMPLE_TEXT.revealRight('One', 'Two', 'Three'),
  SIMPLE_TEXT.revealWrong('One', 'Two')
];

const plain = s => s.replace(/<[^>]+>/g, '').replace(/[“”]/g, '');

test('the simple register covers every story and every fix, and nothing else', () => {
  assert.deepEqual(Object.keys(SIMPLE_ARMS).sort(), ARMS.map(a => a.key).sort());
  assert.deepEqual(Object.keys(SIMPLE_INTERVENTIONS).sort(), INTERVENTIONS.map(i => i.key).sort());
  for (const a of Object.values(SIMPLE_ARMS)) {
    assert.ok(a.name && a.verdict && a.blurb);
  }
});

test('every slot the simple register names exists in the page', () => {
  for (const id of Object.keys(SIMPLE_UI)) {
    assert.ok(markup.includes(`id="${id}"`), `index.html has no element with id="${id}"`);
  }
  for (const id of SIMPLE_HIDES) {
    assert.ok(markup.includes(`id="${id}"`), `nothing to hide with id="${id}"`);
  }
});

test('the sentences stay short enough to read aloud', () => {
  for (const s of strings()) {
    for (const sentence of plain(s).split(/(?<=[.!?])\s+/)) {
      const words = sentence.trim().split(/\s+/).filter(Boolean);
      assert.ok(words.length <= 24,
        `${words.length} words is too long for the simple register: "${sentence.trim()}"`);
    }
  }
});

test('the jargon stays out', () => {
  // Words that mean something precise elsewhere in this repo and nothing to a child.
  const banned = [
    'schismogenesis', 'equifinality', 'centroid', 'coefficient', 'distribution', 'parameter',
    'mechanism', 'reciprocal', 'homophily', 'assimilation', 'normalised', 'stochastic',
    'composition', 'decomposition', 'polarisation', 'polarization', 'heterogeneity',
    'complementary', 'symmetrical', 'reactance', 'intervention'
  ];
  for (const s of strings()) {
    const lower = plain(s).toLowerCase();
    for (const word of banned) {
      assert.ok(!lower.includes(word), `"${word}" should not appear in the simple register: ${s}`);
    }
  }
  for (const s of strings()) {
    for (const word of plain(s).split(/[^A-Za-z]+/).filter(Boolean)) {
      assert.ok(word.length <= 13, `"${word}" is a mouthful for this register`);
    }
  }
});

test('the simple register still says it is a pretend world', () => {
  // Dropping detail is allowed; dropping the caveat is not. §13.3 applies to every register.
  const caveat = SIMPLE_UI.footA.toLowerCase();
  assert.ok(caveat.includes('pretend') || caveat.includes('not real'));
  assert.ok(caveat.includes('not tell you what really happened') || caveat.includes('does not tell you'));
});

test('the simple register does not promise more than the model delivers', () => {
  const overclaims = ['always', 'never happens', 'proves', 'will happen', 'guarantee', 'every time'];
  for (const s of strings()) {
    const lower = plain(s).toLowerCase();
    for (const phrase of overclaims) {
      assert.ok(!lower.includes(phrase), `"${phrase}" overclaims: ${s}`);
    }
  }
});
