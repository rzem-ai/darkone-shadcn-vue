import { MessageScrollerButton, MessageScrollerContent, MessageScrollerViewport } from '@/components/ui/message-scroller';
import { createDarkOneControl } from './createDarkOneControl';

// The provider, the frame and the item hold scroll state and anchoring, not a surface, so they
// keep their exact identity and context. The composables read that context as they are.
export {
  MessageScroller as DarkOneMessageScroller,
  MessageScrollerItem as DarkOneMessageScrollerItem,
  MessageScrollerProvider as DarkOneMessageScrollerProvider,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from '@/components/ui/message-scroller';
export type {
  MessageScrollerButtonDirection,
  MessageScrollerDefaultScrollPosition,
  MessageScrollerProviderProps,
  MessageScrollerScrollable,
  MessageScrollerScrollAlign,
  MessageScrollerScrollOptions,
  MessageScrollerVisibilityState,
} from '@/components/ui/message-scroller';
// The viewport takes focus to scroll by keyboard, and the vendor draws no ring for it.
export const DarkOneMessageScrollerViewport = createDarkOneControl(
  MessageScrollerViewport,
  'DarkOneMessageScrollerViewport',
  'outline-none focus-visible:ring-1 focus-visible:ring-inset',
);
export const DarkOneMessageScrollerContent = createDarkOneControl(MessageScrollerContent, 'DarkOneMessageScrollerContent', 'gap-4');
export const DarkOneMessageScrollerButton = createDarkOneControl(
  MessageScrollerButton,
  'DarkOneMessageScrollerButton',
  'size-(--darkone-action-height) rounded-(--darkone-radius) border border-darkone-field-border bg-darkone-action shadow-none hover:bg-muted',
);
