import { SheetContent } from '@/components/ui/sheet';
import { createDarkOneControl } from './createDarkOneControl';

// The root, trigger, close and text parts carry no DarkOne styling, so they keep their exact identity and context.
export {
  Sheet as DarkOneSheet,
  SheetClose as DarkOneSheetClose,
  SheetDescription as DarkOneSheetDescription,
  SheetFooter as DarkOneSheetFooter,
  SheetHeader as DarkOneSheetHeader,
  SheetTitle as DarkOneSheetTitle,
  SheetTrigger as DarkOneSheetTrigger,
} from '@/components/ui/sheet';
// Already square at the edge it docks to. The close button, the content's last child, has no slot name to reach it by.
export const DarkOneSheetContent = createDarkOneControl(SheetContent, 'DarkOneSheetContent', 'shadow-none [&>button:last-child]:rounded-(--darkone-radius)');
