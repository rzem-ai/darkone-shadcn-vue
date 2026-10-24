import {
  RangeCalendar,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarHeadCell,
  RangeCalendarHeading,
  RangeCalendarNextButton,
  RangeCalendarPrevButton,
} from '@/components/ui/range-calendar';
import { createDarkOneControl } from './createDarkOneControl';

// Grid structure only.
export {
  RangeCalendarGrid as DarkOneRangeCalendarGrid,
  RangeCalendarGridBody as DarkOneRangeCalendarGridBody,
  RangeCalendarGridHead as DarkOneRangeCalendarGridHead,
  RangeCalendarGridRow as DarkOneRangeCalendarGridRow,
  RangeCalendarHeader as DarkOneRangeCalendarHeader,
} from '@/components/ui/range-calendar';

// The vendor root renders its own vendor parts, which a wrapper cannot swap, so it styles them by slot.
// The cell radius is important: the vendor rounds the ends of a range through :has(), of equal weight.
export const DarkOneRangeCalendar = createDarkOneControl(RangeCalendar, 'DarkOneRangeCalendar', [
  '**:data-[slot=range-calendar-trigger]:rounded-(--darkone-radius) **:data-[slot=range-calendar-trigger]:focus-visible:ring-ring',
  '[&_[data-slot=range-calendar-cell]]:rounded-(--darkone-radius)!',
  '**:data-[slot=range-calendar-head-cell]:tracking-(--darkone-tracking) **:data-[slot=range-calendar-head-cell]:uppercase',
  '**:data-[slot=range-calendar-heading]:text-xs **:data-[slot=range-calendar-heading]:tracking-(--darkone-tracking) **:data-[slot=range-calendar-heading]:uppercase',
  '**:data-[slot=range-calendar-prev-button]:size-(--darkone-action-height) **:data-[slot=range-calendar-prev-button]:rounded-(--darkone-radius) **:data-[slot=range-calendar-prev-button]:shadow-none',
  '**:data-[slot=range-calendar-next-button]:size-(--darkone-action-height) **:data-[slot=range-calendar-next-button]:rounded-(--darkone-radius) **:data-[slot=range-calendar-next-button]:shadow-none',
]);

// The same look part by part, for a calendar composed on Reka's RangeCalendarRoot.
export const DarkOneRangeCalendarCell = createDarkOneControl(
  RangeCalendarCell,
  'DarkOneRangeCalendarCell',
  'first:[&:has([data-selected])]:rounded-l-(--darkone-radius) last:[&:has([data-selected])]:rounded-r-(--darkone-radius) [&:has([data-selected][data-selection-end])]:rounded-r-(--darkone-radius) [&:has([data-selected][data-selection-start])]:rounded-l-(--darkone-radius)',
);
export const DarkOneRangeCalendarCellTrigger = createDarkOneControl(RangeCalendarCellTrigger, 'DarkOneRangeCalendarCellTrigger', 'rounded-(--darkone-radius)');
export const DarkOneRangeCalendarHeadCell = createDarkOneControl(RangeCalendarHeadCell, 'DarkOneRangeCalendarHeadCell', 'rounded-(--darkone-radius) tracking-(--darkone-tracking) uppercase');
export const DarkOneRangeCalendarHeading = createDarkOneControl(RangeCalendarHeading, 'DarkOneRangeCalendarHeading', 'text-xs tracking-(--darkone-tracking) uppercase');
export const DarkOneRangeCalendarNextButton = createDarkOneControl(RangeCalendarNextButton, 'DarkOneRangeCalendarNextButton', 'size-(--darkone-action-height) rounded-(--darkone-radius) shadow-none');
export const DarkOneRangeCalendarPrevButton = createDarkOneControl(RangeCalendarPrevButton, 'DarkOneRangeCalendarPrevButton', 'size-(--darkone-action-height) rounded-(--darkone-radius) shadow-none');
