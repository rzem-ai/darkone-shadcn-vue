import { ChartLegendContent, ChartTooltipContent } from '@/components/ui/chart';
import { createDarkOneControl } from './createDarkOneControl';

// The container, the unovis tooltip and crosshair, and the helpers draw no surface of their own, so they keep their exact identity.
export {
  ChartContainer as DarkOneChartContainer,
  ChartCrosshair as DarkOneChartCrosshair,
  ChartTooltip as DarkOneChartTooltip,
  componentToString,
  provideChartContext,
  THEMES,
  useChart,
} from '@/components/ui/chart';
export type { ChartConfig } from '@/components/ui/chart';
// The swatches are the only rounded marks in a legend: legend > item > swatch.
export const DarkOneChartLegendContent = createDarkOneControl(ChartLegendContent, 'DarkOneChartLegendContent', '[&>div>div]:rounded-(--darkone-radius)');
// The indicator is the one element styled with --color-bg.
export const DarkOneChartTooltipContent = createDarkOneControl(
  ChartTooltipContent,
  'DarkOneChartTooltipContent',
  'rounded-(--darkone-radius) border-darkone-field-border bg-popover shadow-none [&_[style*=--color-bg]]:rounded-(--darkone-radius)',
);
