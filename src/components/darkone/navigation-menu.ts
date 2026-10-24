import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { createDarkOneControl, SOLID_FOCUS } from './createDarkOneControl';

// The item and the list are layout only, so they keep their exact identity and context.
export { NavigationMenuItem as DarkOneNavigationMenuItem, NavigationMenuList as DarkOneNavigationMenuList } from '@/components/ui/navigation-menu';

const TRIGGER = 'h-(--darkone-action-height) rounded-(--darkone-radius) px-2.5 py-0 text-xs font-normal tracking-(--darkone-tracking)';
const SURFACE = 'rounded-(--darkone-radius) shadow-none';

/** The trigger look for a top-level link, which is a DarkOneNavigationMenuLink rather than a trigger.
 * It carries the solid ring itself: passed as a class, it merges after the link's own. */
export function darkOneNavigationMenuTriggerStyle() {
  return cn(navigationMenuTriggerStyle(), SOLID_FOCUS, TRIGGER);
}

// The root renders its own vendor viewport, which no class prop reaches.
export const DarkOneNavigationMenu = createDarkOneControl(
  NavigationMenu,
  'DarkOneNavigationMenu',
  '[&_[data-slot=navigation-menu-viewport]]:rounded-(--darkone-radius) [&_[data-slot=navigation-menu-viewport]]:shadow-none',
);
export const DarkOneNavigationMenuTrigger = createDarkOneControl(NavigationMenuTrigger, 'DarkOneNavigationMenuTrigger', TRIGGER);
// Without a viewport, the content draws the popover itself.
export const DarkOneNavigationMenuContent = createDarkOneControl(
  NavigationMenuContent,
  'DarkOneNavigationMenuContent',
  'p-1 pr-1 group-data-[viewport=false]/navigation-menu:rounded-(--darkone-radius) group-data-[viewport=false]/navigation-menu:shadow-none',
);
export const DarkOneNavigationMenuLink = createDarkOneControl(NavigationMenuLink, 'DarkOneNavigationMenuLink', 'gap-0.5 rounded-(--darkone-radius) px-2 py-1.5');
export const DarkOneNavigationMenuViewport = createDarkOneControl(NavigationMenuViewport, 'DarkOneNavigationMenuViewport', SURFACE);
export const DarkOneNavigationMenuIndicator = createDarkOneControl(NavigationMenuIndicator, 'DarkOneNavigationMenuIndicator', '[&>div]:rounded-(--darkone-radius) [&>div]:shadow-none');
