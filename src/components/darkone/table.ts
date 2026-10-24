import { TableCaption, TableCell, TableEmpty, TableHead } from '@/components/ui/table';
import { createDarkOneControl } from './createDarkOneControl';

// The table, its sections and rows carry only borders and hover, which DarkOne keeps.
export { Table as DarkOneTable, TableBody as DarkOneTableBody, TableFooter as DarkOneTableFooter, TableHeader as DarkOneTableHeader, TableRow as DarkOneTableRow } from '@/components/ui/table';
// Uppercase and tracked, as a field label is, so the header reads apart from the values under it.
export const DarkOneTableHead = createDarkOneControl(TableHead, 'DarkOneTableHead', 'h-(--darkone-row-height) text-xs font-normal tracking-(--darkone-tracking) text-muted-foreground uppercase');
export const DarkOneTableCell = createDarkOneControl(TableCell, 'DarkOneTableCell', 'h-(--darkone-row-height) py-0');
export const DarkOneTableCaption = createDarkOneControl(TableCaption, 'DarkOneTableCaption', 'mt-2 text-xs');
export const DarkOneTableEmpty = createDarkOneControl(TableEmpty, 'DarkOneTableEmpty', 'text-muted-foreground');
