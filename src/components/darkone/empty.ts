import { Empty, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { createDarkOneControl } from './createDarkOneControl';

// The header, content and description only lay out and set text, so they keep their exact identity.
export { EmptyContent as DarkOneEmptyContent, EmptyDescription as DarkOneEmptyDescription, EmptyHeader as DarkOneEmptyHeader, emptyMediaVariants } from '@/components/ui/empty';
export type { EmptyMediaVariants } from '@/components/ui/empty';
export const DarkOneEmpty = createDarkOneControl(Empty, 'DarkOneEmpty', 'gap-4 rounded-(--darkone-radius) border-darkone-field-border md:p-8');
export const DarkOneEmptyMedia = createDarkOneControl(EmptyMedia, 'DarkOneEmptyMedia', 'rounded-(--darkone-radius)');
export const DarkOneEmptyTitle = createDarkOneControl(EmptyTitle, 'DarkOneEmptyTitle', 'text-sm');
