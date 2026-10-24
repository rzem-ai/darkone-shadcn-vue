import { DialogContent, DialogScrollContent } from '@/components/ui/dialog';
import { createDarkOneControl } from './createDarkOneControl';

// The root, trigger, close, overlay and text parts carry no DarkOne styling, so they keep their exact identity and context.
export {
  Dialog as DarkOneDialog,
  DialogClose as DarkOneDialogClose,
  DialogDescription as DarkOneDialogDescription,
  DialogFooter as DarkOneDialogFooter,
  DialogHeader as DarkOneDialogHeader,
  DialogOverlay as DarkOneDialogOverlay,
  DialogTitle as DarkOneDialogTitle,
  DialogTrigger as DarkOneDialogTrigger,
} from '@/components/ui/dialog';
// The close button is drawn inside the content, out of reach of a class prop, so it is squared from here.
export const DarkOneDialogContent = createDarkOneControl(DialogContent, 'DarkOneDialogContent', 'rounded-(--darkone-radius) shadow-none [&>[data-slot=dialog-close]]:rounded-(--darkone-radius)');
// Square below sm already; the vendor rounds only from sm up.
export const DarkOneDialogScrollContent = createDarkOneControl(DialogScrollContent, 'DarkOneDialogScrollContent', 'shadow-none sm:rounded-(--darkone-radius) [&>button:last-child]:rounded-(--darkone-radius)');
