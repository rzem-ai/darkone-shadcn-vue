import { HoverCardContent } from '@/components/ui/hover-card';
import { createDarkOneControl } from './createDarkOneControl';

// The root and trigger carry no visible surface, so they keep their exact identity and context.
export { HoverCard as DarkOneHoverCard, HoverCardTrigger as DarkOneHoverCardTrigger } from '@/components/ui/hover-card';
export const DarkOneHoverCardContent = createDarkOneControl(HoverCardContent, 'DarkOneHoverCardContent', 'rounded-(--darkone-radius) border-darkone-field-border p-3 shadow-none');
