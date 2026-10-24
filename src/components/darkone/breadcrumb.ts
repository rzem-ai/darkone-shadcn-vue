import { BreadcrumbEllipsis, BreadcrumbList } from '@/components/ui/breadcrumb';
import { createDarkOneControl } from './createDarkOneControl';

// The landmark, items, links, page and separators are plain text, so they keep their exact identity.
export {
  Breadcrumb as DarkOneBreadcrumb,
  BreadcrumbItem as DarkOneBreadcrumbItem,
  BreadcrumbLink as DarkOneBreadcrumbLink,
  BreadcrumbPage as DarkOneBreadcrumbPage,
  BreadcrumbSeparator as DarkOneBreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
export const DarkOneBreadcrumbList = createDarkOneControl(BreadcrumbList, 'DarkOneBreadcrumbList', 'gap-1.5 text-xs sm:gap-1.5');
// The vendor's size-9 would stand taller than the row the path sits in.
export const DarkOneBreadcrumbEllipsis = createDarkOneControl(BreadcrumbEllipsis, 'DarkOneBreadcrumbEllipsis', 'size-(--darkone-row-height)');
