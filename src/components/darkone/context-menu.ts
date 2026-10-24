import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/ui/context-menu';
import { createDarkOneControl } from './createDarkOneControl';

// The menu reads as the select does: a flat square list, short rows, muted uppercase labels.
const content = 'rounded-(--darkone-radius) border-darkone-field-border shadow-none';
const item = 'rounded-(--darkone-radius) py-1';
const label = 'text-xs font-normal text-muted-foreground tracking-(--darkone-tracking) uppercase';

// Behaviour-only parts and the shortcut text keep their exact component identity and context.
export {
  ContextMenu as DarkOneContextMenu,
  ContextMenuGroup as DarkOneContextMenuGroup,
  ContextMenuRadioGroup as DarkOneContextMenuRadioGroup,
  ContextMenuShortcut as DarkOneContextMenuShortcut,
  ContextMenuSub as DarkOneContextMenuSub,
  ContextMenuTrigger as DarkOneContextMenuTrigger,
} from '@/components/ui/context-menu';
export const DarkOneContextMenuContent = createDarkOneControl(ContextMenuContent, 'DarkOneContextMenuContent', content);
export const DarkOneContextMenuSubContent = createDarkOneControl(ContextMenuSubContent, 'DarkOneContextMenuSubContent', content);
export const DarkOneContextMenuItem = createDarkOneControl(ContextMenuItem, 'DarkOneContextMenuItem', item);
export const DarkOneContextMenuCheckboxItem = createDarkOneControl(ContextMenuCheckboxItem, 'DarkOneContextMenuCheckboxItem', item);
export const DarkOneContextMenuRadioItem = createDarkOneControl(ContextMenuRadioItem, 'DarkOneContextMenuRadioItem', item);
export const DarkOneContextMenuSubTrigger = createDarkOneControl(ContextMenuSubTrigger, 'DarkOneContextMenuSubTrigger', item);
export const DarkOneContextMenuLabel = createDarkOneControl(ContextMenuLabel, 'DarkOneContextMenuLabel', label);
export const DarkOneContextMenuSeparator = createDarkOneControl(ContextMenuSeparator, 'DarkOneContextMenuSeparator', '');
