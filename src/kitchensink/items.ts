/**
 * What the catalogue knows about items beyond registry.json, kept apart from it
 * so the registry tests can read it without loading every specimen.
 */

/** Items with nothing to look at: the shared core, and the install-everything aggregate. */
export const UNSHOWN = new Set(['darkone-core', 'darkone']);

/** A name upstream retired for another, listed so a reader looking for it lands somewhere. */
export interface Alias {
  title: string;
  target: string;
  note: string;
}

export const ALIASES: Alias[] = [{ title: 'Toast', target: 'darkone-sonner', note: 'Toast is deprecated upstream in favour of Sonner.' }];
