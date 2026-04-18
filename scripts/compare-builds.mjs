import { spawnSync } from 'node:child_process';
import { statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

function dirSize(dir) {
  let total = 0;
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) total += dirSize(p);
    else total += statSync(p).size;
  }
  return total;
}

function run(label, cmd) {
  const start = Date.now();
  const res = spawnSync(cmd[0], cmd.slice(1), { stdio: 'inherit', shell: process.platform === 'win32' });
  const ms = Date.now() - start;
  if (res.status !== 0) process.exit(res.status ?? 1);
  return ms;
}

console.log('--- Comparing builds ---');

const webpackMs = run('webpack', ['npm', 'run', 'build']);
let webpackSize = 0;
try { webpackSize = dirSize(join(process.cwd(), 'dist')); } catch {}

const viteMs = run('vite', ['npm', 'run', 'build:vite']);
let viteSize = 0;
try { viteSize = dirSize(join(process.cwd(), 'dist-vite')); } catch {}

console.log('\nRESULTS');
console.log(`webpack: ${webpackMs}ms, dist size: ${(webpackSize/1024/1024).toFixed(2)} MB`);
console.log(`vite:   ${viteMs}ms, dist-vite size: ${(viteSize/1024/1024).toFixed(2)} MB`);
console.log('Write these numbers into README.md');
