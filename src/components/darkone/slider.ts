import { Slider } from '@/components/ui/slider';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneSlider = createDarkOneControl(
  Slider,
  'DarkOneSlider',
  '[&_[data-slot=slider-track]]:rounded-(--darkone-radius) [&_[data-slot=slider-thumb]]:rounded-(--darkone-radius) [&_[data-slot=slider-thumb]]:bg-background [&_[data-slot=slider-thumb]]:shadow-none',
);
