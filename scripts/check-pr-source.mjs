import { pathToFileURL } from 'node:url';

const allowedSources = new Map([
  ['dev', 'design'],
  ['main', 'dev'],
]);

export function validatePullRequestSource(base, head) {
  const requiredSource = allowedSources.get(base);

  if (!requiredSource) {
    return {
      allowed: true,
      message: `No source restriction applies to pull requests targeting ${base}.`,
    };
  }

  if (head === requiredSource) {
    return {
      allowed: true,
      message: `Allowed promotion: ${head} → ${base}.`,
    };
  }

  return {
    allowed: false,
    message: `Pull requests targeting ${base} must come from ${requiredSource}; received ${head}.`,
  };
}

function runCli() {
  const base = process.env.GITHUB_BASE_REF;
  const head = process.env.GITHUB_HEAD_REF;

  if (!base || !head) {
    console.error('GITHUB_BASE_REF and GITHUB_HEAD_REF are required.');
    process.exitCode = 1;
    return;
  }

  const result = validatePullRequestSource(base, head);
  const write = result.allowed ? console.log : console.error;
  write(result.message);

  if (!result.allowed) {
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
