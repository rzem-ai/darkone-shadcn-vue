import { Command, CommandGroup, CommandInput, CommandItem, CommandSeparator } from '@/components/ui/command';
import { createDarkOneControl } from './createDarkOneControl';

// The list, the empty state and the shortcut text carry no surface, so they keep their exact identity and context.
export { CommandEmpty as DarkOneCommandEmpty, CommandList as DarkOneCommandList, CommandShortcut as DarkOneCommandShortcut } from '@/components/ui/command';
export { provideCommandContext, provideCommandGroupContext, useCommand, useCommandGroup } from '@/components/ui/command';
export { default as DarkOneCommandDialog } from './DarkOneCommandDialog.vue';
// The input's class lands on the inner filter, so its wrapper, the search well, is styled from the root.
export const DarkOneCommand = createDarkOneControl(
  Command,
  'DarkOneCommand',
  'rounded-(--darkone-radius) [&_[data-slot=command-input-wrapper]]:h-(--darkone-field-height) [&_[data-slot=command-input-wrapper]]:border-darkone-field-border [&_[data-slot=command-input-wrapper]]:bg-darkone-field [&_[data-slot=command-input-wrapper]]:px-2.5',
);
export const DarkOneCommandInput = createDarkOneControl(CommandInput, 'DarkOneCommandInput', 'h-full rounded-(--darkone-radius) py-0');
// The heading is drawn from a prop, out of reach of a class, so it is set to the select's label from here.
export const DarkOneCommandGroup = createDarkOneControl(
  CommandGroup,
  'DarkOneCommandGroup',
  '[&>[data-slot=command-group-heading]]:font-normal [&>[data-slot=command-group-heading]]:tracking-(--darkone-tracking) [&>[data-slot=command-group-heading]]:uppercase',
);
export const DarkOneCommandItem = createDarkOneControl(CommandItem, 'DarkOneCommandItem', 'rounded-(--darkone-radius) py-1');
export const DarkOneCommandSeparator = createDarkOneControl(CommandSeparator, 'DarkOneCommandSeparator', '');
