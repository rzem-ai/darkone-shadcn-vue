import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createDarkOneControl } from './createDarkOneControl';

// The root carries no visible surface, so it keeps its exact identity and context.
export { Tabs as DarkOneTabs } from '@/components/ui/tabs';
export const DarkOneTabsList = createDarkOneControl(TabsList, 'DarkOneTabsList', 'h-(--darkone-field-height) rounded-(--darkone-radius)');
export const DarkOneTabsTrigger = createDarkOneControl(TabsTrigger, 'DarkOneTabsTrigger', 'rounded-(--darkone-radius) data-[state=active]:shadow-none');
export const DarkOneTabsContent = createDarkOneControl(TabsContent, 'DarkOneTabsContent', 'rounded-(--darkone-radius)');
