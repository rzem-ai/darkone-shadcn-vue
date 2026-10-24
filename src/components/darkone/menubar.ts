import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { createDarkOneControl } from './createDarkOneControl';

// The menus read as the select does: a flat square list, short rows, muted uppercase labels.
const content = 'rounded-(--darkone-radius) border-darkone-field-border shadow-none';
const item = 'rounded-(--darkone-radius) py-1';
const label = 'text-xs font-normal text-muted-foreground tracking-(--darkone-tracking) uppercase';

// Behaviour-only parts and the shortcut text keep their exact component identity and context.
export {
  MenubarGroup as DarkOneMenubarGroup,
  MenubarMenu as DarkOneMenubarMenu,
  MenubarRadioGroup as DarkOneMenubarRadioGroup,
  MenubarShortcut as DarkOneMenubarShortcut,
  MenubarSub as DarkOneMenubarSub,
} from '@/components/ui/menubar';
// A recessed strip at field height, as the tabs list is.
export const DarkOneMenubar = createDarkOneControl(Menubar, 'DarkOneMenubar', 'h-(--darkone-field-height) gap-0.5 rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field p-0.5 shadow-none');
// Sentence case, as DarkOneButton is, so the menu names read as actions.
export const DarkOneMenubarTrigger = createDarkOneControl(MenubarTrigger, 'DarkOneMenubarTrigger', 'h-full rounded-(--darkone-radius) px-2.5 py-0 text-xs font-normal tracking-(--darkone-tracking)');
export const DarkOneMenubarContent = createDarkOneControl(MenubarContent, 'DarkOneMenubarContent', content);
export const DarkOneMenubarSubContent = createDarkOneControl(MenubarSubContent, 'DarkOneMenubarSubContent', content);
export const DarkOneMenubarItem = createDarkOneControl(MenubarItem, 'DarkOneMenubarItem', item);
export const DarkOneMenubarCheckboxItem = createDarkOneControl(MenubarCheckboxItem, 'DarkOneMenubarCheckboxItem', item);
export const DarkOneMenubarRadioItem = createDarkOneControl(MenubarRadioItem, 'DarkOneMenubarRadioItem', item);
export const DarkOneMenubarSubTrigger = createDarkOneControl(MenubarSubTrigger, 'DarkOneMenubarSubTrigger', item);
export const DarkOneMenubarLabel = createDarkOneControl(MenubarLabel, 'DarkOneMenubarLabel', label);
export const DarkOneMenubarSeparator = createDarkOneControl(MenubarSeparator, 'DarkOneMenubarSeparator', '');
