import { InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from '@/components/ui/input-group';
import { createDarkOneControl } from './createDarkOneControl';

// Text and the variant helpers carry no DarkOne styling of their own.
export {
  InputGroupText as DarkOneInputGroupText,
  inputGroupAddonVariants,
  inputGroupButtonVariants,
  type InputGroupButtonVariants,
  type InputGroupVariants,
} from '@/components/ui/input-group';
export { default as DarkOneInputGroup } from './DarkOneInputGroup.vue';
// The field well's own inset, rather than the vendor's px-3, so an addon lines up with a plain input above it.
export const DarkOneInputGroupAddon = createDarkOneControl(
  InputGroupAddon,
  'DarkOneInputGroupAddon',
  'text-xs data-[align=inline-start]:pl-2.5 data-[align=inline-end]:pr-2.5 [&>kbd]:rounded-(--darkone-radius)',
);
export const DarkOneInputGroupButton = createDarkOneControl(
  InputGroupButton,
  'DarkOneInputGroupButton',
  'rounded-(--darkone-radius) text-xs tracking-(--darkone-tracking) data-[size=sm]:h-(--darkone-action-height) data-[size=icon-sm]:size-(--darkone-action-height)',
);
export const DarkOneInputGroupInput = createDarkOneControl(InputGroupInput, 'DarkOneInputGroupInput', 'h-full px-2.5 text-sm md:text-sm');
export const DarkOneInputGroupTextarea = createDarkOneControl(InputGroupTextarea, 'DarkOneInputGroupTextarea', 'px-2.5 py-1.5 text-sm md:text-sm');
