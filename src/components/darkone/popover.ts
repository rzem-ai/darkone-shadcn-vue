import { PopoverContent } from '@/components/ui/popover';
import { createDarkOneControl } from './createDarkOneControl';

// The root, trigger and anchor carry no visible surface, so they keep their exact identity and context.
export { Popover as DarkOnePopover, PopoverAnchor as DarkOnePopoverAnchor, PopoverTrigger as DarkOnePopoverTrigger } from '@/components/ui/popover';
export const DarkOnePopoverContent = createDarkOneControl(PopoverContent, 'DarkOnePopoverContent', 'rounded-(--darkone-radius) border-darkone-field-border p-3 shadow-none');
