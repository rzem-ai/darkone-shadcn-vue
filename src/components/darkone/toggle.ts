import { Toggle } from '@/components/ui/toggle';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneToggle = createDarkOneControl(Toggle, 'DarkOneToggle', 'rounded-(--darkone-radius) shadow-none');
