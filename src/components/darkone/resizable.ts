import { ResizableHandle } from '@/components/ui/resizable';
import { createDarkOneControl } from './createDarkOneControl';

// The group and panels are layout only, so they keep their exact identity and context.
export { ResizablePanel as DarkOneResizablePanel, ResizablePanelGroup as DarkOneResizablePanelGroup } from '@/components/ui/resizable';
export const DarkOneResizableHandle = createDarkOneControl(ResizableHandle, 'DarkOneResizableHandle', '[&>div]:rounded-(--darkone-radius)');
