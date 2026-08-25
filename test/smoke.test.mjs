import assert from 'node:assert/strict';
import test from 'node:test';

import { runSmokeTests } from '../scripts/smoke.mjs';

function response(url, { status = 200, body = 'Witamala' } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    url,
    text: async () => body,
  };
}

test('checks every representative route', async () => {
  const requested = [];
  const fetchImpl = async (url) => {
    requested.push(url);
    return response(url);
  };

  const results = await runSmokeTests('https://example.test', fetchImpl);

  assert.deepEqual(requested, [
    'https://example.test/',
    'https://example.test/about',
    'https://example.test/contact',
    'https://example.test/blog',
  ]);
  assert.deepEqual(results.map(({ path, status }) => ({ path, status })), [
    { path: '/', status: 200 },
    { path: '/about', status: 200 },
    { path: '/contact', status: 200 },
    { path: '/blog', status: 200 },
  ]);
});

test('rejects a non-success response', async () => {
  const fetchImpl = async (url) => response(url, {
    status: url.endsWith('/contact') ? 503 : 200,
  });

  await assert.rejects(
    runSmokeTests('https://example.test', fetchImpl),
    /\/contact returned HTTP 503/,
  );
});

test('rejects a cross-origin redirect', async () => {
  const fetchImpl = async (url) => response(
    url.endsWith('/blog') ? 'https://unexpected.test/blog' : url,
  );

  await assert.rejects(
    runSmokeTests('https://example.test', fetchImpl),
    /\/blog redirected to unexpected origin/,
  );
});

test('requires the homepage to identify Witamala', async () => {
  const fetchImpl = async (url) => response(url, {
    body: url.endsWith('/') ? '<html>Different site</html>' : 'Witamala',
  });

  await assert.rejects(
    runSmokeTests('https://example.test', fetchImpl),
    /homepage does not contain Witamala/,
  );
});
