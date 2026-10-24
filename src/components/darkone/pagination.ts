import { PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { createDarkOneControl } from './createDarkOneControl';

// The root and the list are layout only, so they keep their exact identity and context.
export { Pagination as DarkOnePagination, PaginationContent as DarkOnePaginationContent } from '@/components/ui/pagination';

/** As DarkOneButton is: square, action height, sentence case. An icon size stays square. */
function action(props: Record<string, unknown>) {
  const icon = typeof props.size === 'string' && props.size.startsWith('icon');
  return [
    'gap-1 rounded-(--darkone-radius) text-xs tracking-(--darkone-tracking) shadow-none disabled:opacity-40',
    icon ? 'size-(--darkone-action-height) p-0' : 'h-(--darkone-action-height) px-2.5 py-0 has-[>svg]:px-2.5 sm:pr-2.5',
  ];
}

export const DarkOnePaginationItem = createDarkOneControl(PaginationItem, 'DarkOnePaginationItem', (props) => [action(props), 'tabular-nums']);
export const DarkOnePaginationFirst = createDarkOneControl(PaginationFirst, 'DarkOnePaginationFirst', action);
export const DarkOnePaginationPrevious = createDarkOneControl(PaginationPrevious, 'DarkOnePaginationPrevious', action);
export const DarkOnePaginationNext = createDarkOneControl(PaginationNext, 'DarkOnePaginationNext', action);
export const DarkOnePaginationLast = createDarkOneControl(PaginationLast, 'DarkOnePaginationLast', action);
export const DarkOnePaginationEllipsis = createDarkOneControl(PaginationEllipsis, 'DarkOnePaginationEllipsis', 'size-(--darkone-action-height)');
