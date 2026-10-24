import registry from '../../registry.json';
import type { Component } from 'vue';

/** Items with nothing to look at: the shared core, and the install-everything aggregate. */
export const UNSHOWN = new Set(['darkone-core', 'darkone']);

export interface Entry {
  name: string;
  title: string;
  description: string;
  install: string;
  specimen: Component;
}

const specimens = import.meta.glob<{ default: Component }>('./specimens/*.vue', { eager: true });

/** A specimen's file name is its registry item without the prefix: specimens/radio-group.vue shows darkone-radio-group. */
export const entries: Entry[] = registry.items
  .filter((item) => !UNSHOWN.has(item.name))
  .map((item) => {
    const specimen = specimens[`./specimens/${item.name.replace(/^darkone-/, '')}.vue`];
    if (!specimen) throw new Error(`No kitchensink specimen for ${item.name}`);
    return {
      name: item.name,
      title: item.title,
      description: item.description,
      install: installCommand(item.name),
      specimen: specimen.default,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export function installCommand(name: string) {
  return `pnpm dlx shadcn-vue@latest add ${new URL(`r/${name}.json`, registry.homepage).href}`;
}
