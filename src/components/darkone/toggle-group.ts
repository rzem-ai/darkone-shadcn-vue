import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneToggleGroup = createDarkOneControl(ToggleGroup, 'DarkOneToggleGroup', 'rounded-(--darkone-radius) shadow-none');
export const DarkOneToggleGroupItem = createDarkOneControl(
  ToggleGroupItem,
  'DarkOneToggleGroupItem',
  'rounded-(--darkone-radius) shadow-none data-[spacing=0]:first:rounded-l-(--darkone-radius) data-[spacing=0]:last:rounded-r-(--darkone-radius)',
);
