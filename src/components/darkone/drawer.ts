import { DrawerContent } from '@/components/ui/drawer';
import { createDarkOneControl } from './createDarkOneControl';

// The root, trigger, close, overlay and text parts carry no DarkOne styling, so they keep their exact identity and context.
export {
  Drawer as DarkOneDrawer,
  DrawerClose as DarkOneDrawerClose,
  DrawerDescription as DarkOneDrawerDescription,
  DrawerFooter as DarkOneDrawerFooter,
  DrawerHeader as DarkOneDrawerHeader,
  DrawerOverlay as DarkOneDrawerOverlay,
  DrawerTitle as DarkOneDrawerTitle,
  DrawerTrigger as DarkOneDrawerTrigger,
} from '@/components/ui/drawer';
// The vendor rounds the leading edge per direction, so the override names the same variants to merge them away.
// The grab handle is the content's first child, drawn for a bottom drawer only.
export const DarkOneDrawerContent = createDarkOneControl(
  DrawerContent,
  'DarkOneDrawerContent',
  'data-[vaul-drawer-direction=top]:rounded-b-(--darkone-radius) data-[vaul-drawer-direction=bottom]:rounded-t-(--darkone-radius) [&>div:first-child]:rounded-(--darkone-radius)',
);
