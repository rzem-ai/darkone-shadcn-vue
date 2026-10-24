import { Progress } from '@/components/ui/progress';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneProgress = createDarkOneControl(Progress, 'DarkOneProgress', 'rounded-(--darkone-radius) [&_[data-slot=progress-indicator]]:rounded-(--darkone-radius)');
