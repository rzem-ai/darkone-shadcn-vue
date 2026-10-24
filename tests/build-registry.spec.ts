import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error - a plain .mjs script, with no declaration file.
import { CORE, TOKENS, defaultBase, parseTokens, resolveRegistry } from '../tools/build-registry.mjs';
import registry from '../registry.json';

const ROOT = resolve(import.meta.dirname, '..');

describe('build-registry', () => {
  it('reads every token block into the cssVars keys the CLI writes back out', () => {
    const vars = parseTokens(readFileSync(resolve(ROOT, TOKENS), 'utf8'));
    expect(Object.keys(vars).toSorted()).toEqual(['dark', 'light', 'theme']);
    expect(vars.light['darkone-radius']).toBe('0');
    expect(vars.dark['darkone-field-background']).toBe('var(--sidebar)');
    expect(vars.theme['color-darkone-field']).toBe('var(--darkone-field-background)');
  });

  it('refuses a block or declaration it would silently drop', () => {
    expect(() => parseTokens('.other { --a: 1; }')).toThrow(/unexpected block/);
    expect(() => parseTokens(':root { color: red; }')).toThrow(/not a custom property/);
  });

  it('points local dependencies at this registry and leaves shadcn-vue ones bare', () => {
    const resolved = resolveRegistry(registry, { base: 'http://localhost:4173/r/', tokens: { light: { a: '1' } } });
    const select = resolved.items.find((item: { name: string }) => item.name === 'darkone-select');
    expect(select.registryDependencies).toEqual(['http://localhost:4173/r/darkone-core.json', 'select']);
    const core = resolved.items.find((item: { name: string }) => item.name === CORE);
    expect(core.cssVars).toEqual({ light: { a: '1' } });
    expect(core.registryDependencies).toEqual(['utils']);
    expect(resolved.items.filter((item: { cssVars?: unknown }) => item.cssVars)).toHaveLength(1);
  });

  it('defaults to r/ under the Pages homepage', () => {
    expect(defaultBase()).toBe('https://rzem-ai.github.io/darkone-shadcn-vue/r');
  });
});
