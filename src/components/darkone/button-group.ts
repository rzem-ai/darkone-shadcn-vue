import { ButtonGroup, ButtonGroupText } from '@/components/ui/button-group';
import { createDarkOneControl } from './createDarkOneControl';

export {
  ButtonGroupSeparator as DarkOneButtonGroupSeparator,
  buttonGroupVariants,
  type ButtonGroupVariants,
} from '@/components/ui/button-group';
// The vendor already drops the inner borders; square corners and no shadow make the rest one strip.
// It rounds a last select trigger back to rounded-md, which this returns to the DarkOne radius.
export const DarkOneButtonGroup = createDarkOneControl(
  ButtonGroup,
  'DarkOneButtonGroup',
  '[&>[data-slot=button]]:shadow-none has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-(--darkone-radius)',
);
export const DarkOneButtonGroupText = createDarkOneControl(
  ButtonGroupText,
  'DarkOneButtonGroupText',
  'rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field px-2.5 text-xs tracking-(--darkone-tracking) shadow-none',
);
