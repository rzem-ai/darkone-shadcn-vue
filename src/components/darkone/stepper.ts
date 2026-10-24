import { StepperIndicator, StepperTitle, StepperTrigger } from '@/components/ui/stepper';
import { createDarkOneControl } from './createDarkOneControl';

// The root and item only lay out and hold state, and the description and separator draw no corner, so they keep their exact identity.
export { Stepper as DarkOneStepper, StepperDescription as DarkOneStepperDescription, StepperItem as DarkOneStepperItem, StepperSeparator as DarkOneStepperSeparator } from '@/components/ui/stepper';
export const DarkOneStepperTrigger = createDarkOneControl(StepperTrigger, 'DarkOneStepperTrigger', 'rounded-(--darkone-radius) outline-none focus-visible:ring-3');
// A pending step has no fill, so a border keeps it a step rather than a stray number.
export const DarkOneStepperIndicator = createDarkOneControl(
  StepperIndicator,
  'DarkOneStepperIndicator',
  'h-(--darkone-row-height) w-(--darkone-row-height) rounded-(--darkone-radius) border border-darkone-field-border text-xs text-muted-foreground group-data-[state=active]:border-primary group-data-[state=completed]:border-accent',
);
// The vendor's text-md is not a Tailwind size, so the title falls back to inherited text.
export const DarkOneStepperTitle = createDarkOneControl(StepperTitle, 'DarkOneStepperTitle', 'text-sm font-medium');
