import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { createDarkOneControl } from './createDarkOneControl';

// The menu reads as the select does: a flat square list, short rows, muted uppercase labels.
const content = 'rounded-(--darkone-radius) border-darkone-field-border shadow-none';
const item = 'rounded-(--darkone-radius) py-1';
const label = 'text-xs font-normal text-muted-foreground tracking-(--darkone-tracking) uppercase';

// Behaviour-only parts and the shortcut text keep their exact component identity and context.
export {
  DropdownMenu as DarkOneDropdownMenu,
  DropdownMenuGroup as DarkOneDropdownMenuGroup,
  DropdownMenuPortal as DarkOneDropdownMenuPortal,
  DropdownMenuRadioGroup as DarkOneDropdownMenuRadioGroup,
  DropdownMenuShortcut as DarkOneDropdownMenuShortcut,
  DropdownMenuSub as DarkOneDropdownMenuSub,
  DropdownMenuTrigger as DarkOneDropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
export const DarkOneDropdownMenuContent = createDarkOneControl(DropdownMenuContent, 'DarkOneDropdownMenuContent', content);
export const DarkOneDropdownMenuSubContent = createDarkOneControl(DropdownMenuSubContent, 'DarkOneDropdownMenuSubContent', content);
export const DarkOneDropdownMenuItem = createDarkOneControl(DropdownMenuItem, 'DarkOneDropdownMenuItem', item);
export const DarkOneDropdownMenuCheckboxItem = createDarkOneControl(DropdownMenuCheckboxItem, 'DarkOneDropdownMenuCheckboxItem', item);
export const DarkOneDropdownMenuRadioItem = createDarkOneControl(DropdownMenuRadioItem, 'DarkOneDropdownMenuRadioItem', item);
export const DarkOneDropdownMenuSubTrigger = createDarkOneControl(DropdownMenuSubTrigger, 'DarkOneDropdownMenuSubTrigger', item);
export const DarkOneDropdownMenuLabel = createDarkOneControl(DropdownMenuLabel, 'DarkOneDropdownMenuLabel', label);
export const DarkOneDropdownMenuSeparator = createDarkOneControl(DropdownMenuSeparator, 'DarkOneDropdownMenuSeparator', '');
