import { ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
import { createDarkOneControl } from './createDarkOneControl';

// Behaviour-only parts keep their exact component identity and context.
export {
  Combobox as DarkOneCombobox,
  ComboboxCancel as DarkOneComboboxCancel,
  ComboboxEmpty as DarkOneComboboxEmpty,
  ComboboxItemIndicator as DarkOneComboboxItemIndicator,
  ComboboxSeparator as DarkOneComboboxSeparator,
  ComboboxTrigger as DarkOneComboboxTrigger,
  ComboboxViewport as DarkOneComboboxViewport,
} from '@/components/ui/combobox';
export { default as DarkOneComboboxAnchor } from './DarkOneComboboxAnchor.vue';
export const DarkOneComboboxInput = createDarkOneControl(ComboboxInput, 'DarkOneComboboxInput', 'h-full rounded-(--darkone-radius) py-0');
// As wide as the anchor, rather than the vendor's fixed 200px.
export const DarkOneComboboxList = createDarkOneControl(ComboboxList, 'DarkOneComboboxList', 'w-(--reka-combobox-trigger-width) rounded-(--darkone-radius) border-darkone-field-border shadow-none');
// A heading prop renders a label as the group's first child; anything in a group that is not an option is its label.
export const DarkOneComboboxGroup = createDarkOneControl(ComboboxGroup, 'DarkOneComboboxGroup', '[&>:not([role=option])]:tracking-(--darkone-tracking) [&>:not([role=option])]:uppercase');
export const DarkOneComboboxItem = createDarkOneControl(ComboboxItem, 'DarkOneComboboxItem', 'rounded-(--darkone-radius) py-1');
