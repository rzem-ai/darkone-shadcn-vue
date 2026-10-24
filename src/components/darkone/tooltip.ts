import { TooltipContent } from '@/components/ui/tooltip';
import { createDarkOneControl } from './createDarkOneControl';

// The provider, root and trigger carry no visible surface, so they keep their exact identity and context.
export { Tooltip as DarkOneTooltip, TooltipProvider as DarkOneTooltipProvider, TooltipTrigger as DarkOneTooltipTrigger } from '@/components/ui/tooltip';
export const DarkOneTooltipContent = createDarkOneControl(TooltipContent, 'DarkOneTooltipContent', 'rounded-(--darkone-radius) px-2 py-1 tracking-(--darkone-tracking)');
