import { InputOTPSlot } from '@/components/ui/input-otp';
import { createDarkOneControl } from './createDarkOneControl';

// The root, group and separator are layout. The slots are a row of separate cells,
// so they keep their own wells rather than vanish into a DarkOneField.
export { InputOTP as DarkOneInputOTP, InputOTPGroup as DarkOneInputOTPGroup, InputOTPSeparator as DarkOneInputOTPSeparator } from '@/components/ui/input-otp';
export const DarkOneInputOTPSlot = createDarkOneControl(
  InputOTPSlot,
  'DarkOneInputOTPSlot',
  'h-(--darkone-field-height) w-(--darkone-field-height) border-darkone-field-border bg-darkone-field dark:bg-darkone-field font-mono shadow-none first:rounded-l-(--darkone-radius) last:rounded-r-(--darkone-radius) data-[active=true]:ring-ring',
);
