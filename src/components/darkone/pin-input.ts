import { PinInputSlot } from '@/components/ui/pin-input';
import { createDarkOneControl } from './createDarkOneControl';

// The root, group and separator are layout. The slots are a row of separate cells,
// so they keep their own wells rather than vanish into a DarkOneField.
export { PinInput as DarkOnePinInput, PinInputGroup as DarkOnePinInputGroup, PinInputSeparator as DarkOnePinInputSeparator } from '@/components/ui/pin-input';
// The vendor rings on :focus, not :focus-visible, so the solid ring is set here too.
export const DarkOnePinInputSlot = createDarkOneControl(
  PinInputSlot,
  'DarkOnePinInputSlot',
  'h-(--darkone-field-height) w-(--darkone-field-height) border-darkone-field-border bg-darkone-field dark:bg-darkone-field font-mono shadow-none first:rounded-l-(--darkone-radius) last:rounded-r-(--darkone-radius) focus:ring-ring',
);
