import { Kbd } from '@/components/ui/kbd';
import { createDarkOneControl } from './createDarkOneControl';

// The group only spaces its keys, so it keeps its exact identity.
export { KbdGroup as DarkOneKbdGroup } from '@/components/ui/kbd';
export const DarkOneKbd = createDarkOneControl(Kbd, 'DarkOneKbd', 'rounded-(--darkone-radius) font-mono');
