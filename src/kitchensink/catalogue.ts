import registry from '../../registry.json';
import type { Component } from 'vue';

/** Items with nothing to look at: the shared core, and the install-everything aggregate. */
export const UNSHOWN = new Set(['darkone-core', 'darkone']);

/** A name upstream retired for another, listed so a reader looking for it lands somewhere. */
export interface Alias {
  title: string;
  target: string;
  note: string;
}

export const ALIASES: Alias[] = [{ title: 'Toast', target: 'darkone-sonner', note: 'Toast is deprecated upstream in favour of Sonner.' }];

export interface SourceFile {
  /** The path the registry ships it from, which is where it lands under the consumer's components alias. */
  path: string;
  code: string;
}

export interface Entry {
  name: string;
  title: string;
  description: string;
  kind: 'component' | 'block';
  install: string;
  specimen: Component;
  /** The specimen's own source: the item in use, importable as written. */
  usage: SourceFile;
  /** The files the item installs. */
  sources: SourceFile[];
  aliases: string[];
}

const specimens = import.meta.glob<{ default: Component }>('./specimens/*.vue', { eager: true });
const specimenSources = import.meta.glob<string>('./specimens/*.vue', { eager: true, query: '?raw', import: 'default' });
const darkOneSources = import.meta.glob<string>('../components/darkone/**/*.{ts,vue}', { eager: true, query: '?raw', import: 'default' });

function source(path: string): SourceFile {
  const code = darkOneSources[path.replace(/^src\//, '../')];
  if (code === undefined) throw new Error(`No source for ${path}`);
  return { path, code };
}

/** A specimen's file name is its registry item without the prefix: specimens/radio-group.vue shows darkone-radio-group. */
export const entries: Entry[] = registry.items
  .filter((item) => !UNSHOWN.has(item.name))
  .map((item) => {
    const file = `./specimens/${item.name.replace(/^darkone-/, '')}.vue`;
    const specimen = specimens[file];
    if (!specimen) throw new Error(`No kitchensink specimen for ${item.name}`);
    return {
      name: item.name,
      title: item.title,
      description: item.description,
      kind: item.type === 'registry:block' ? ('block' as const) : ('component' as const),
      install: installCommand(item.name),
      specimen: specimen.default,
      usage: { path: `src/kitchensink/specimens/${file.slice('./specimens/'.length)}`, code: specimenSources[file]! },
      sources: (item.files ?? []).map((file) => source(file.path)),
      aliases: ALIASES.filter((alias) => alias.target === item.name).map((alias) => alias.note),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

/** The navigation: each kind in title order, with each alias filed under its target's kind. */
export function navigation(kind: Entry['kind']) {
  const own = entries.filter((entry) => entry.kind === kind).map((entry) => ({ title: entry.title, href: `#${entry.name}` }));
  const aliased = ALIASES.filter((alias) => entries.find((entry) => entry.name === alias.target)?.kind === kind).map((alias) => ({ title: alias.title, href: `#${alias.target}` }));
  return [...own, ...aliased].sort((a, b) => a.title.localeCompare(b.title));
}

export function installCommand(name: string) {
  return `pnpm dlx shadcn-vue@latest add ${new URL(`r/${name}.json`, registry.homepage).href}`;
}
