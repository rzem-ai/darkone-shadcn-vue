import { BubbleContent, BubbleReactions } from '@/components/ui/bubble';
import { createDarkOneControl } from './createDarkOneControl';

// The root only lays out and colours its content through the variant, and the group only
// stacks bubbles; the content is the surface, so these keep their exact identity.
export { Bubble as DarkOneBubble, BubbleGroup as DarkOneBubbleGroup, bubbleReactionsVariants, bubbleVariants } from '@/components/ui/bubble';
export type { BubbleReactionsVariants, BubbleVariants } from '@/components/ui/bubble';
// Square and flat like every other DarkOne surface: a bubble is a block of text, not a balloon.
export const DarkOneBubbleContent = createDarkOneControl(
  BubbleContent,
  'DarkOneBubbleContent',
  'rounded-(--darkone-radius) px-2.5 py-1.5 [button,a]:focus-visible:ring-ring',
);
export const DarkOneBubbleReactions = createDarkOneControl(BubbleReactions, 'DarkOneBubbleReactions', 'rounded-(--darkone-radius) ring-2 px-1 text-xs');
