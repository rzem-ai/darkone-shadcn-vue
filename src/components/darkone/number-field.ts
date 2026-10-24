import { NumberFieldDecrement, NumberFieldIncrement } from '@/components/ui/number-field';
import { createDarkOneControl } from './createDarkOneControl';

// The root and content are layout; the input is the surface.
export { NumberField as DarkOneNumberField, NumberFieldContent as DarkOneNumberFieldContent } from '@/components/ui/number-field';
export { default as DarkOneNumberFieldInput } from './DarkOneNumberFieldInput.vue';
// The vendor's p-3 makes a 40px target taller than the field; fill the input's height instead.
export const DarkOneNumberFieldDecrement = createDarkOneControl(
  NumberFieldDecrement,
  'DarkOneNumberFieldDecrement',
  'h-full rounded-(--darkone-radius) px-2 py-0 text-muted-foreground hover:text-foreground',
);
export const DarkOneNumberFieldIncrement = createDarkOneControl(
  NumberFieldIncrement,
  'DarkOneNumberFieldIncrement',
  'h-full rounded-(--darkone-radius) px-2 py-0 text-muted-foreground hover:text-foreground',
);
