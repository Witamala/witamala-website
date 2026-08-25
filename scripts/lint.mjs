import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { parse } = require('next/dist/compiled/babel/parser');

const roots = ['app', 'components', 'lib', 'scripts', 'test'];
const extensions = new Set(['.js', '.mjs']);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath));
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

const files = (await Promise.all(roots.map(collectFiles))).flat().sort();
const errors = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');

  source.split(/\r?\n/).forEach((line, index) => {
    if (/[\t ]+$/.test(line)) {
      errors.push(`${file}:${index + 1}: trailing whitespace`);
    }
    if (/^(<{7}|={7}|>{7})/.test(line)) {
      errors.push(`${file}:${index + 1}: unresolved merge-conflict marker`);
    }
  });

  try {
    parse(source, {
      sourceType: 'unambiguous',
      plugins: ['jsx', 'importAssertions', 'topLevelAwait'],
    });
  } catch (error) {
    const location = error.loc ? `:${error.loc.line}:${error.loc.column + 1}` : '';
    errors.push(`${file}${location}: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Linted ${files.length} JavaScript files.`);
}
