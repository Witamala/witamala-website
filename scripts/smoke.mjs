import { pathToFileURL } from 'node:url';

const routes = ['/', '/about', '/contact', '/blog'];

function canonicalBaseUrl(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Smoke-test URL must use HTTP or HTTPS.');
  }
  url.pathname = '/';
  url.search = '';
  url.hash = '';
  return url;
}

export async function runSmokeTests(baseUrl, fetchImpl = fetch, { timeoutMs = 15_000 } = {}) {
  const base = canonicalBaseUrl(baseUrl);
  const results = [];

  for (const route of routes) {
    const requestedUrl = new URL(route, base);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    let response;

    try {
      response = await fetchImpl(requestedUrl.href, {
        headers: { accept: 'text/html' },
        redirect: 'follow',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      throw new Error(`${route} returned HTTP ${response.status}.`);
    }

    const finalUrl = new URL(response.url || requestedUrl.href);
    if (finalUrl.origin !== base.origin) {
      throw new Error(`${route} redirected to unexpected origin ${finalUrl.origin}.`);
    }

    if (route === '/') {
      const body = await response.text();
      if (!body.includes('Witamala')) {
        throw new Error('The homepage does not contain Witamala.');
      }
    }

    results.push({ path: route, status: response.status, url: finalUrl.href });
  }

  return results;
}

async function runCli() {
  const baseUrl = process.argv[2] || process.env.SMOKE_BASE_URL;
  if (!baseUrl) {
    throw new Error('Provide a base URL as the first argument or SMOKE_BASE_URL.');
  }

  const results = await runSmokeTests(baseUrl);
  for (const result of results) {
    console.log(`PASS ${result.path} ${result.status} ${result.url}`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error) => {
    console.error(`FAIL ${error.message}`);
    process.exitCode = 1;
  });
}
