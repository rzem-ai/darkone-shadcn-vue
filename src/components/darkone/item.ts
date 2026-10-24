import { Item, ItemMedia } from '@/components/ui/item';
import { createDarkOneControl } from './createDarkOneControl';

// The text, layout and separator parts draw no corner, so they keep their exact identity.
export {
  ItemActions as DarkOneItemActions,
  ItemContent as DarkOneItemContent,
  ItemDescription as DarkOneItemDescription,
  ItemFooter as DarkOneItemFooter,
  ItemGroup as DarkOneItemGroup,
  ItemHeader as DarkOneItemHeader,
  ItemSeparator as DarkOneItemSeparator,
  ItemTitle as DarkOneItemTitle,
  itemMediaVariants,
  itemVariants,
} from '@/components/ui/item';
export type { ItemMediaVariants, ItemVariants } from '@/components/ui/item';
// Denser than the vendor's p-4, so a list of items reads as rows rather than cards.
export const DarkOneItem = createDarkOneControl(Item, 'DarkOneItem', (props) => ['rounded-(--darkone-radius)', props.size === 'sm' ? 'gap-2 p-2.5 py-1.5' : 'gap-3 p-3 py-2.5']);
export const DarkOneItemMedia = createDarkOneControl(ItemMedia, 'DarkOneItemMedia', 'rounded-(--darkone-radius)');
