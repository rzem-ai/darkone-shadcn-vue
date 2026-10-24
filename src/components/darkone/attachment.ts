import { Attachment, AttachmentGroup, AttachmentMedia } from '@/components/ui/attachment';
import { createDarkOneControl } from './createDarkOneControl';

// The text and layout parts carry no DarkOne styling, so they keep their exact identity.
export {
  AttachmentActions as DarkOneAttachmentActions,
  AttachmentContent as DarkOneAttachmentContent,
  AttachmentDescription as DarkOneAttachmentDescription,
  AttachmentTitle as DarkOneAttachmentTitle,
  attachmentMediaVariants,
  attachmentVariants,
} from '@/components/ui/attachment';
export type { AttachmentMediaVariants, AttachmentVariants } from '@/components/ui/attachment';
export { default as DarkOneAttachmentAction } from './DarkOneAttachmentAction.vue';
export { default as DarkOneAttachmentTrigger } from './DarkOneAttachmentTrigger.vue';
export const DarkOneAttachment = createDarkOneControl(Attachment, 'DarkOneAttachment', 'rounded-(--darkone-radius) border-darkone-field-border shadow-none');
// At xs the media rounds itself again under the size modifier, which a plain radius would not replace.
export const DarkOneAttachmentMedia = createDarkOneControl(
  AttachmentMedia,
  'DarkOneAttachmentMedia',
  'rounded-(--darkone-radius) group-data-[size=xs]/attachment:rounded-(--darkone-radius) bg-darkone-field',
);
export const DarkOneAttachmentGroup = createDarkOneControl(AttachmentGroup, 'DarkOneAttachmentGroup', 'gap-2');
