#!/usr/bin/env node
/**
 * registry.json -> public/r/*.json, through the shadcn-vue CLI's own `build`.
 *
 * registry.json is what a person edits. Two things in it would go stale if they
 * were written by hand, so this fills them in before the CLI sees the file:
 *
 *  - Local dependencies. An item names another DarkOne item bare ("darkone-core"),
 *    which the CLI would look up on shadcn-vue.com. Each becomes the item's URL
 *    on this registry, `<base>/<name>.json`.
 *  - Tokens. src/components/darkone/tokens.css is the one copy; its blocks become
 *    darkone-core's cssVars, which `shadcn-vue add` merges into the consumer's CSS.
 *
 * The base is REGISTRY_URL when set (a local server, for an install test), else
 * package.json's homepage plus `r`, which is where the Pages build serves it.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const TOKENS = 'src/components/darkone/tokens.css';
export const CORE = 'darkone-core';

/** `:root` -> light, `.dark` -> dark, `@theme inline` -> theme: the three keys the CLI writes back out. */
const BLOCKS = { ':root': 'light', '.dark': 'dark', '@theme inline': 'theme' };

export function parseTokens(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const vars = {};
  for (const [, selector, body] of source.matchAll(/([^{}]+?)\s*\{([^{}]*)\}/g)) {
    const key = BLOCKS[selector.trim()];
    if (!key) throw new Error(`${TOKENS}: unexpected block "${selector.trim()}"; only ${Object.keys(BLOCKS).join(', ')} are read`);
    vars[key] ??= {};
    for (const declaration of body.split(';').map((part) => part.trim()).filter(Boolean)) {
      const match = declaration.match(/^--([\w-]+)\s*:\s*(.+)$/);
      if (!match) throw new Error(`${TOKENS}: "${declaration}" is not a custom property`);
      // The CLI takes names without the leading dashes.
      vars[key][match[1]] = match[2].trim();
    }
  }
  return vars;
}

export function defaultBase() {
  const { homepage } = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  return new URL('r', homepage).href;
}

export function resolveRegistry(registry, { base, tokens }) {
  const local = new Set(registry.items.map((item) => item.name));
  const url = (name) => `${base.replace(/\/$/, '')}/${name}.json`;
  return {
    ...registry,
    items: registry.items.map((item) => ({
      ...item,
      ...(item.registryDependencies && { registryDependencies: item.registryDependencies.map((dep) => (local.has(dep) ? url(dep) : dep)) }),
      ...(item.name === CORE && { cssVars: tokens }),
    })),
  };
}

function main() {
  const registry = JSON.parse(readFileSync(join(ROOT, 'registry.json'), 'utf8'));
  const resolved = resolveRegistry(registry, {
    base: process.env.REGISTRY_URL ?? defaultBase(),
    tokens: parseTokens(readFileSync(join(ROOT, TOKENS), 'utf8')),
  });
  const staging = join(ROOT, 'node_modules/.tmp/darkone-registry');
  mkdirSync(staging, { recursive: true });
  writeFileSync(join(staging, 'registry.json'), `${JSON.stringify(resolved, null, 2)}\n`);
  rmSync(join(ROOT, 'public/r'), { recursive: true, force: true });
  execFileSync(join(ROOT, 'node_modules/.bin/shadcn-vue'), ['build', join(staging, 'registry.json'), '--output', 'public/r', '--cwd', ROOT], { cwd: ROOT, stdio: 'inherit' });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
