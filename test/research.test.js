import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const guide = fs.readFileSync('docs/research/schismogenesis-field-guide.md', 'utf8');
const register = fs.readFileSync('docs/research/complete-source-register.md', 'utf8');

function externalUrls(markdown) {
  return new Set(
    [...markdown.matchAll(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g)].map(match => match[1])
  );
}

test('the complete source register covers every research-guide URL', () => {
  const guideUrls = externalUrls(guide);
  const registerUrls = externalUrls(register);

  assert.equal(guideUrls.size, 141);
  assert.deepEqual([...registerUrls].sort(), [...guideUrls].sort());
});

test('the source register writes every URL out in full', () => {
  const registerUrls = externalUrls(register);

  for (const url of registerUrls) {
    assert.match(register, new RegExp(`\\[${escapeRegExp(url)}\\]\\(${escapeRegExp(url)}\\)`));
  }
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
