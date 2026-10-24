import {
  Sidebar,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarTrigger,
  sidebarMenuButtonVariants,
  type SidebarMenuButtonVariants,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { createDarkOneControl } from './createDarkOneControl';

// The provider, the layout regions, the items, the rail and the separator draw nothing DarkOne changes,
// so they keep their exact identity and the sidebar context.
export {
  SidebarContent as DarkOneSidebarContent,
  SidebarFooter as DarkOneSidebarFooter,
  SidebarGroup as DarkOneSidebarGroup,
  SidebarGroupContent as DarkOneSidebarGroupContent,
  SidebarHeader as DarkOneSidebarHeader,
  SidebarMenuItem as DarkOneSidebarMenuItem,
  SidebarMenuSubItem as DarkOneSidebarMenuSubItem,
  SidebarProvider as DarkOneSidebarProvider,
  SidebarRail as DarkOneSidebarRail,
  SidebarSeparator as DarkOneSidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
export type { SidebarProps, SidebarMenuButtonVariants } from '@/components/ui/sidebar';

/** Centres a 1.25rem action or badge on a row, where the vendor's offsets assume its 2rem button.
 * Spelled out in full so Tailwind's scanner finds every variant. */
const ON_ROW =
  'top-[calc((var(--darkone-row-height)-1.25rem)/2)] peer-data-[size=default]/menu-button:top-[calc((var(--darkone-row-height)-1.25rem)/2)] peer-data-[size=sm]/menu-button:top-[calc((var(--darkone-row-height)-1.25rem)/2)]';

/** A menu button is a row; the lg size keeps its height for a two-line header entry. */
function menuButton(size: unknown) {
  return [
    'rounded-(--darkone-radius)',
    size !== 'lg' && 'h-(--darkone-row-height) py-0 group-data-[collapsible=icon]:size-(--darkone-row-height)! group-data-[collapsible=icon]:p-1!',
  ];
}

/** The menu-button look for an element that is not a DarkOneSidebarMenuButton. */
export function darkOneSidebarMenuButtonVariants(props: SidebarMenuButtonVariants = {}) {
  return cn(sidebarMenuButtonVariants(props), menuButton(props.size));
}

// The class lands on the panel; the floating variant draws its card one level in.
export const DarkOneSidebar = createDarkOneControl(
  Sidebar,
  'DarkOneSidebar',
  'group-data-[variant=floating]:[&>[data-sidebar=sidebar]]:rounded-(--darkone-radius) group-data-[variant=floating]:[&>[data-sidebar=sidebar]]:shadow-none',
);
export const DarkOneSidebarInset = createDarkOneControl(SidebarInset, 'DarkOneSidebarInset', 'md:peer-data-[variant=inset]:rounded-(--darkone-radius) md:peer-data-[variant=inset]:shadow-none');
export const DarkOneSidebarTrigger = createDarkOneControl(SidebarTrigger, 'DarkOneSidebarTrigger', 'size-(--darkone-action-height) rounded-(--darkone-radius)');
export const DarkOneSidebarInput = createDarkOneControl(
  SidebarInput,
  'DarkOneSidebarInput',
  'h-(--darkone-field-compact-height) rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field px-2.5 text-sm shadow-none md:text-sm dark:bg-darkone-field',
);
export const DarkOneSidebarGroupLabel = createDarkOneControl(
  SidebarGroupLabel,
  'DarkOneSidebarGroupLabel',
  'h-(--darkone-row-height) rounded-(--darkone-radius) font-normal tracking-(--darkone-tracking) uppercase group-data-[collapsible=icon]:mt-[calc(var(--darkone-row-height)*-1)]',
);
export const DarkOneSidebarGroupAction = createDarkOneControl(
  SidebarGroupAction,
  'DarkOneSidebarGroupAction',
  'top-[calc(0.5rem+(var(--darkone-row-height)-1.25rem)/2)] rounded-(--darkone-radius)',
);
export const DarkOneSidebarMenu = createDarkOneControl(SidebarMenu, 'DarkOneSidebarMenu', 'gap-px');
export const DarkOneSidebarMenuButton = createDarkOneControl(SidebarMenuButton, 'DarkOneSidebarMenuButton', (props) => menuButton(props.size));
export const DarkOneSidebarMenuAction = createDarkOneControl(
  SidebarMenuAction,
  'DarkOneSidebarMenuAction',
  ['rounded-(--darkone-radius)', ON_ROW],
);
export const DarkOneSidebarMenuBadge = createDarkOneControl(
  SidebarMenuBadge,
  'DarkOneSidebarMenuBadge',
  ['rounded-(--darkone-radius)', ON_ROW],
);
export const DarkOneSidebarMenuSkeleton = createDarkOneControl(SidebarMenuSkeleton, 'DarkOneSidebarMenuSkeleton', 'h-(--darkone-row-height) rounded-(--darkone-radius) *:rounded-(--darkone-radius)');
export const DarkOneSidebarMenuSub = createDarkOneControl(SidebarMenuSub, 'DarkOneSidebarMenuSub', 'gap-px');
export const DarkOneSidebarMenuSubButton = createDarkOneControl(SidebarMenuSubButton, 'DarkOneSidebarMenuSubButton', 'h-(--darkone-row-height) rounded-(--darkone-radius)');
