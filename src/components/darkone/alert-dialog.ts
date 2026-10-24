import { AlertDialogAction, AlertDialogCancel, AlertDialogContent } from '@/components/ui/alert-dialog';
import { createDarkOneControl } from './createDarkOneControl';

// The root, trigger and text parts carry no DarkOne styling, so they keep their exact identity and context.
export {
  AlertDialog as DarkOneAlertDialog,
  AlertDialogDescription as DarkOneAlertDialogDescription,
  AlertDialogFooter as DarkOneAlertDialogFooter,
  AlertDialogHeader as DarkOneAlertDialogHeader,
  AlertDialogTitle as DarkOneAlertDialogTitle,
  AlertDialogTrigger as DarkOneAlertDialogTrigger,
} from '@/components/ui/alert-dialog';
export const DarkOneAlertDialogContent = createDarkOneControl(AlertDialogContent, 'DarkOneAlertDialogContent', 'rounded-(--darkone-radius) shadow-none');
// These remain Reka dialog actions, rather than plain buttons, so closing and
// focus restoration keep the vendored behaviour. Sentence case, as DarkOneButton is.
export const DarkOneAlertDialogAction = createDarkOneControl(AlertDialogAction, 'DarkOneAlertDialogAction', 'h-(--darkone-action-height) rounded-(--darkone-radius) px-2.5 py-0 text-xs tracking-(--darkone-tracking) shadow-none');
export const DarkOneAlertDialogCancel = createDarkOneControl(
  AlertDialogCancel,
  'DarkOneAlertDialogCancel',
  'h-(--darkone-action-height) rounded-(--darkone-radius) border-darkone-field-border bg-darkone-action dark:bg-darkone-action px-2.5 py-0 text-xs tracking-(--darkone-tracking) shadow-none',
);
