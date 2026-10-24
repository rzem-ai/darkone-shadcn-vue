import { Marker } from '@/components/ui/marker';
import { createDarkOneControl } from './createDarkOneControl';

// The content and icon only carry text and a glyph, so they keep their exact identity.
export { MarkerContent as DarkOneMarkerContent, MarkerIcon as DarkOneMarkerIcon, markerVariants } from '@/components/ui/marker';
export type { MarkerVariants } from '@/components/ui/marker';
// An event in the thread, set as a small tracked label; a separator reads as a section band.
export const DarkOneMarker = createDarkOneControl(
  Marker,
  'DarkOneMarker',
  'min-h-(--darkone-row-height) text-xs tracking-(--darkone-tracking) border-darkone-field-border data-[variant=separator]:uppercase',
);
