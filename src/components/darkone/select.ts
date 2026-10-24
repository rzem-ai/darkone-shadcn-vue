import { SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator } from '@/components/ui/select';
import { createDarkOneControl } from './createDarkOneControl';

// Behaviour-only parts keep their exact component identity and context.
export { Select as DarkOneSelect, SelectGroup as DarkOneSelectGroup, SelectItemText as DarkOneSelectItemText, SelectValue as DarkOneSelectValue } from '@/components/ui/select';
export { default as DarkOneSelectTrigger } from './DarkOneSelectTrigger.vue';
export const DarkOneSelectContent = createDarkOneControl(SelectContent, 'DarkOneSelectContent', 'rounded-(--darkone-radius) border-darkone-field-border shadow-none');
export const DarkOneSelectItem = createDarkOneControl(SelectItem, 'DarkOneSelectItem', 'rounded-(--darkone-radius) py-1');
export const DarkOneSelectLabel = createDarkOneControl(SelectLabel, 'DarkOneSelectLabel', 'tracking-(--darkone-tracking) uppercase');
export const DarkOneSelectSeparator = createDarkOneControl(SelectSeparator, 'DarkOneSelectSeparator', '');
export const DarkOneSelectScrollDownButton = createDarkOneControl(SelectScrollDownButton, 'DarkOneSelectScrollDownButton', 'h-(--darkone-action-height) rounded-(--darkone-radius) py-0');
export const DarkOneSelectScrollUpButton = createDarkOneControl(SelectScrollUpButton, 'DarkOneSelectScrollUpButton', 'h-(--darkone-action-height) rounded-(--darkone-radius) py-0');
