import { CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { createDarkOneControl } from './createDarkOneControl';

// The root, the track and the slides are layout only, so they keep their exact identity and the carousel context.
export { Carousel as DarkOneCarousel, CarouselContent as DarkOneCarouselContent, CarouselItem as DarkOneCarouselItem, useCarousel } from '@/components/ui/carousel';
export type { CarouselApi } from '@/components/ui/carousel';
// The vendor's round size-8 arrows become square actions, as DarkOneButton's icon size is.
export const DarkOneCarouselPrevious = createDarkOneControl(CarouselPrevious, 'DarkOneCarouselPrevious', 'size-(--darkone-action-height) rounded-(--darkone-radius) shadow-none disabled:opacity-40');
export const DarkOneCarouselNext = createDarkOneControl(CarouselNext, 'DarkOneCarouselNext', 'size-(--darkone-action-height) rounded-(--darkone-radius) shadow-none disabled:opacity-40');
