import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneRadioGroup = createDarkOneControl(RadioGroup, 'DarkOneRadioGroup', 'gap-2');
export const DarkOneRadioGroupItem = createDarkOneControl(
  RadioGroupItem,
  'DarkOneRadioGroupItem',
  'rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field dark:bg-darkone-field shadow-none',
);
