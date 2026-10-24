import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { createDarkOneControl } from './createDarkOneControl';

// The area renders its own vendor scrollbar and viewport, which no class prop reaches, so the area styles them by slot.
export const DarkOneScrollArea = createDarkOneControl(
  ScrollArea,
  'DarkOneScrollArea',
  '[&_[data-slot=scroll-area-thumb]]:rounded-(--darkone-radius) [&>[data-slot=scroll-area-viewport]]:focus-visible:ring-ring',
);
export const DarkOneScrollBar = createDarkOneControl(ScrollBar, 'DarkOneScrollBar', '[&>[data-slot=scroll-area-thumb]]:rounded-(--darkone-radius)');
