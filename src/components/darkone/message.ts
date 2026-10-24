import { MessageAvatar, MessageContent, MessageFooter, MessageHeader } from '@/components/ui/message';
import { createDarkOneControl } from './createDarkOneControl';

// The row and the group only lay messages out, so they keep their exact identity and alignment context.
export { Message as DarkOneMessage, MessageGroup as DarkOneMessageGroup } from '@/components/ui/message';
export const DarkOneMessageAvatar = createDarkOneControl(MessageAvatar, 'DarkOneMessageAvatar', 'rounded-(--darkone-radius) bg-darkone-field');
export const DarkOneMessageContent = createDarkOneControl(MessageContent, 'DarkOneMessageContent', 'gap-1.5');
// Inset to the DarkOne bubble's padding, so the name sits over the text, not the edge.
export const DarkOneMessageHeader = createDarkOneControl(MessageHeader, 'DarkOneMessageHeader', 'gap-1.5 px-2.5 tracking-(--darkone-tracking) uppercase');
// Sentence case: a footer carries actions and timestamps, which read apart from the label above.
export const DarkOneMessageFooter = createDarkOneControl(MessageFooter, 'DarkOneMessageFooter', 'gap-1.5 px-2.5 font-normal tracking-(--darkone-tracking) tabular-nums');
