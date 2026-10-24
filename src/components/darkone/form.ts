import { FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createDarkOneControl } from './createDarkOneControl';

// vee-validate's form, field and array, the control slot, and the field context carry no DarkOne styling.
export {
  Form as DarkOneForm,
  FormControl as DarkOneFormControl,
  FormField as DarkOneFormField,
  FormFieldArray as DarkOneFormFieldArray,
  FORM_ITEM_INJECTION_KEY,
} from '@/components/ui/form';
export { useFormField } from '@/components/ui/form/useFormField';
// The rhythm and label of a DarkOneField, so a validated form reads like the rest of the studio.
export const DarkOneFormItem = createDarkOneControl(FormItem, 'DarkOneFormItem', 'gap-1');
export const DarkOneFormLabel = createDarkOneControl(FormLabel, 'DarkOneFormLabel', 'text-xs font-normal tracking-(--darkone-tracking) text-muted-foreground uppercase');
export const DarkOneFormDescription = createDarkOneControl(FormDescription, 'DarkOneFormDescription', 'text-xs');
export const DarkOneFormMessage = createDarkOneControl(FormMessage, 'DarkOneFormMessage', 'text-xs');
