import assert from 'node:assert/strict';
import test from 'node:test';

import { validatePullRequestSource } from '../scripts/check-pr-source.mjs';

test('allows design into dev', () => {
  assert.deepEqual(validatePullRequestSource('dev', 'design'), {
    allowed: true,
    message: 'Allowed promotion: design → dev.',
  });
});

test('allows dev into main', () => {
  assert.deepEqual(validatePullRequestSource('main', 'dev'), {
    allowed: true,
    message: 'Allowed promotion: dev → main.',
  });
});

test('rejects main into dev', () => {
  assert.equal(validatePullRequestSource('dev', 'main').allowed, false);
});

test('rejects design into main', () => {
  assert.equal(validatePullRequestSource('main', 'design').allowed, false);
});

test('rejects unapproved source branches into dev', () => {
  for (const head of ['main', 'topic', 'production']) {
    const result = validatePullRequestSource('dev', head);
    assert.equal(result.allowed, false);
    assert.match(result.message, /must come from design/);
  }
});

test('does not restrict pull requests targeting an unguarded branch', () => {
  assert.deepEqual(validatePullRequestSource('design', 'main'), {
    allowed: true,
    message: 'No source restriction applies to pull requests targeting design.',
  });
});
