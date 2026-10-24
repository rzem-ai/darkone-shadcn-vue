import { Switch } from '@/components/ui/switch';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneSwitch = createDarkOneControl(Switch, 'DarkOneSwitch', 'rounded-(--darkone-radius) shadow-none [&_[data-slot=switch-thumb]]:rounded-(--darkone-radius)');
