import { Calendar, CalendarCell, CalendarCellTrigger, CalendarHeadCell, CalendarHeading, CalendarNextButton, CalendarPrevButton } from '@/components/ui/calendar';
import { createDarkOneControl } from './createDarkOneControl';

// Grid structure only, and the layout type.
export {
  CalendarGrid as DarkOneCalendarGrid,
  CalendarGridBody as DarkOneCalendarGridBody,
  CalendarGridHead as DarkOneCalendarGridHead,
  CalendarGridRow as DarkOneCalendarGridRow,
  CalendarHeader as DarkOneCalendarHeader,
  type LayoutTypes,
} from '@/components/ui/calendar';

// The vendor root renders its own vendor parts, which a wrapper cannot swap, so it styles them by slot.
// The selected cell's radius is important: the vendor sets it through :has(), of equal weight.
export const DarkOneCalendar = createDarkOneControl(Calendar, 'DarkOneCalendar', [
  '**:data-[slot=calendar-cell-trigger]:rounded-(--darkone-radius) **:data-[slot=calendar-cell-trigger]:focus-visible:ring-ring',
  '[&_[data-slot=calendar-cell]]:rounded-(--darkone-radius)!',
  '**:data-[slot=calendar-head-cell]:tracking-(--darkone-tracking) **:data-[slot=calendar-head-cell]:uppercase',
  '**:data-[slot=calendar-heading]:text-xs **:data-[slot=calendar-heading]:tracking-(--darkone-tracking) **:data-[slot=calendar-heading]:uppercase',
  '**:data-[slot=calendar-prev-button]:size-(--darkone-action-height) **:data-[slot=calendar-prev-button]:rounded-(--darkone-radius) **:data-[slot=calendar-prev-button]:shadow-none',
  '**:data-[slot=calendar-next-button]:size-(--darkone-action-height) **:data-[slot=calendar-next-button]:rounded-(--darkone-radius) **:data-[slot=calendar-next-button]:shadow-none',
  '**:data-[slot=native-select]:rounded-(--darkone-radius) **:data-[slot=native-select]:shadow-none',
]);

// The same look part by part, for a calendar composed on Reka's CalendarRoot.
export const DarkOneCalendarCell = createDarkOneControl(CalendarCell, 'DarkOneCalendarCell', '[&:has([data-selected])]:rounded-(--darkone-radius)');
export const DarkOneCalendarCellTrigger = createDarkOneControl(CalendarCellTrigger, 'DarkOneCalendarCellTrigger', 'rounded-(--darkone-radius)');
export const DarkOneCalendarHeadCell = createDarkOneControl(CalendarHeadCell, 'DarkOneCalendarHeadCell', 'rounded-(--darkone-radius) tracking-(--darkone-tracking) uppercase');
export const DarkOneCalendarHeading = createDarkOneControl(CalendarHeading, 'DarkOneCalendarHeading', 'text-xs tracking-(--darkone-tracking) uppercase');
export const DarkOneCalendarNextButton = createDarkOneControl(CalendarNextButton, 'DarkOneCalendarNextButton', 'size-(--darkone-action-height) rounded-(--darkone-radius) shadow-none');
export const DarkOneCalendarPrevButton = createDarkOneControl(CalendarPrevButton, 'DarkOneCalendarPrevButton', 'size-(--darkone-action-height) rounded-(--darkone-radius) shadow-none');
