import { Trace, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceIcon, TraceLine } from '@/components/ui/trace';
import { createDarkOneControl } from './createDarkOneControl';

// The collapsible root holds open state, and the title and description only carry text,
// so they keep their exact identity and context.
export { TraceCollapsible as DarkOneTraceCollapsible, TraceDescription as DarkOneTraceDescription, TraceTitle as DarkOneTraceTitle } from '@/components/ui/trace';
// A log: rows stack at row height with no gap, so a run of steps reads as one dense record.
export const DarkOneTrace = createDarkOneControl(
  Trace,
  'DarkOneTrace',
  'gap-0 *:has-[>[data-slot=trace-line]]:rounded-(--darkone-radius) *:has-[>[data-slot=trace-line]]:focus-visible:ring-1 *:has-[>[data-slot=trace-line]]:focus-visible:ring-ring',
);
// The vendor marks a running step only with a shimmer; foreground keeps it legible where that does not animate.
export const DarkOneTraceLine = createDarkOneControl(
  TraceLine,
  'DarkOneTraceLine',
  'min-h-(--darkone-row-height) gap-1.5 text-xs tracking-(--darkone-tracking) data-[status=running]:text-foreground',
);
// The selector is the vendor's, verbatim, so tailwind-merge replaces its size rather than adding a second.
export const DarkOneTraceIcon = createDarkOneControl(TraceIcon, 'DarkOneTraceIcon', "size-3.5 [&_svg:not([class*='size-'])]:size-3.5");
// The chevron is the vendor's own TraceIcon, so it is sized from here to match the line's.
export const DarkOneTraceCollapsibleTrigger = createDarkOneControl(
  TraceCollapsibleTrigger,
  'DarkOneTraceCollapsibleTrigger',
  "rounded-(--darkone-radius) focus-visible:ring-1 [&>[data-slot=trace-icon]]:size-3.5 [&>[data-slot=trace-icon]_svg:not([class*='size-'])]:size-3.5",
);
// The rule drops from the centre of a 14px icon, under the step that opened it.
export const DarkOneTraceCollapsibleContent = createDarkOneControl(
  TraceCollapsibleContent,
  'DarkOneTraceCollapsibleContent',
  'mt-0.5 mb-1 ml-[calc(--spacing(1.75)-0.5px)] border-darkone-field-border pl-3 text-xs',
);
