import { readdirSync, readFileSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import registry from '../registry.json';
import { UNSHOWN } from '../src/kitchensink/catalogue';

const ROOT = resolve(import.meta.dirname, '..');
const DARKONE = 'src/components/darkone';
/** In the repository for the kitchensink, never installed: the barrel, and the tokens that ship as cssVars. */
const UNSHIPPED = new Set(['index.ts', 'tokens.css']);
/** Imports every consumer already has: the framework, and the aliases the CLI rewrites. */
const PROVIDED = new Set(['vue']);

type Item = (typeof registry.items)[number] & { dependencies?: string[]; registryDependencies?: string[]; files?: { path: string }[] };
const items = registry.items as Item[];
const byName = new Map(items.map((item) => [item.name, item]));

/** Every file under the DarkOne directory, blocks/ included, relative to it. */
function darkOneFiles(): string[] {
  return readdirSync(join(ROOT, DARKONE), { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(join(ROOT, DARKONE), join(entry.parentPath, entry.name)));
}

function imports(path: string): string[] {
  const source = readFileSync(join(ROOT, path), 'utf8');
  return [...source.matchAll(/(?:import|export)\s[^'"]*?from\s+['"]([^'"]+)['"]/g)].map((match) => match[1]!);
}

/** `@vueuse/core/x` -> `@vueuse/core`, `reka-ui/date` -> `reka-ui`. */
function packageName(specifier: string) {
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0]!;
}

describe('registry.json', () => {
  it('ships every DarkOne file in exactly one item', () => {
    const shipped = items.flatMap((item) => (item.files ?? []).map((file) => file.path));
    const onDisk = darkOneFiles()
      .filter((file) => !UNSHIPPED.has(file))
      .map((file) => `${DARKONE}/${file}`);
    expect(shipped.toSorted()).toEqual(onDisk.toSorted());
    expect(new Set(shipped).size).toBe(shipped.length);
  });

  it.each(items.filter((item) => item.files?.length))('$name declares exactly the shadcn-vue components it imports', (item) => {
    const used = new Set(item.files!.flatMap((file) => imports(file.path)).flatMap((specifier) => specifier.match(/^@\/components\/ui\/([^/]+)/)?.[1] ?? []));
    const declared = (item.registryDependencies ?? []).filter((dep) => !byName.has(dep) && dep !== 'utils');
    expect(declared.toSorted()).toEqual([...used].toSorted());
  });

  it.each(items.filter((item) => item.files?.length))('$name can reach every DarkOne file it imports', (item) => {
    const shippedBy = (name: string) => byName.get(name)?.files?.map((file) => file.path) ?? [];
    const reachable = new Set([...shippedBy(item.name), ...(item.registryDependencies ?? []).flatMap(shippedBy)]);
    for (const file of item.files!) {
      for (const specifier of imports(file.path)) {
        // Relative, or through the alias, which a block uses to reach the wrappers it is built from.
        const target =
          specifier.startsWith('.') ? join(file.path, '..', specifier)
          : specifier.startsWith('@/components/darkone/') ? specifier.replace(/^@\/components\//, 'src/components/')
          : null;
        if (!target) continue;
        const found = [...reachable].some((path) => path === target || path.replace(/\.ts$/, '') === target);
        expect(found, `${item.name} imports ${specifier}, which neither it nor its DarkOne dependencies ship`).toBe(true);
      }
    }
  });

  it.each(items.filter((item) => item.files?.length))('$name is a block exactly when it ships from blocks/', (item) => {
    const block = item.files!.some((file) => file.path.startsWith(`${DARKONE}/blocks/`));
    expect(item.type).toBe(block ? 'registry:block' : item.name === 'darkone-core' ? 'registry:lib' : 'registry:component');
  });

  it.each(items.filter((item) => item.files?.length))('$name declares the packages it imports', (item) => {
    const used = new Set(
      item
        .files!.flatMap((file) => imports(file.path))
        .filter((specifier) => !specifier.startsWith('.') && !specifier.startsWith('@/'))
        .map(packageName)
        .filter((name) => !PROVIDED.has(name)),
    );
    expect((item.dependencies ?? []).toSorted()).toEqual([...used].toSorted());
  });

  it('lists every item in the aggregate, and the core under every other item', () => {
    const aggregate = byName.get('darkone')!;
    expect(aggregate.registryDependencies!.toSorted()).toEqual(items.filter((item) => item.name !== 'darkone').map((item) => item.name).toSorted());
    for (const item of items.filter((item) => !['darkone', 'darkone-core'].includes(item.name))) expect(item.registryDependencies, item.name).toContain('darkone-core');
  });

  it('pairs every component item with a kitchensink specimen, and every specimen with an item', () => {
    const specimens = readdirSync(join(ROOT, 'src/kitchensink/specimens')).map((file) => `darkone-${file.replace(/\.vue$/, '')}`);
    const shown = items.filter((item) => !UNSHOWN.has(item.name)).map((item) => item.name);
    expect(specimens.toSorted()).toEqual(shown.toSorted());
  });
});

describe('kitchensink specimens', () => {
  /** The kitchensink shows each specimen's source as the way to use the item, so it must paste into a consumer as written. */
  it('import the way a consumer does, one family file at a time, never through the barrel', () => {
    const offenders = readdirSync(join(ROOT, 'src/kitchensink/specimens')).filter((file) => imports(`src/kitchensink/specimens/${file}`).includes('@/components/darkone'));
    expect(offenders).toEqual([]);
  });
});

describe('DarkOne classes', () => {
  /** tailwind-merge in the consumer's `cn` recognises a token-named colour, but not token-named geometry. */
  it('writes geometry against the variable, so any cn can merge it with the vendor class', () => {
    const offenders = darkOneFiles()
      .filter((file) => /\.(ts|vue)$/.test(file))
      .flatMap((file) =>
        [...readFileSync(join(ROOT, DARKONE, file), 'utf8').matchAll(/(?<![\w-])([a-z][\w-]*?)-darkone\b[\w-]*/g)]
          .map((match) => match[0])
          .filter((utility) => !/(^|:)(bg|border|text|ring|fill|stroke)-darkone/.test(utility.replace(/^.*:/, ':')))
          .filter((utility) => !utility.startsWith('data-darkone') && !utility.startsWith('--'))
          .map((utility) => `${file}: ${utility}`),
      );
    expect(offenders).toEqual([]);
  });
});
