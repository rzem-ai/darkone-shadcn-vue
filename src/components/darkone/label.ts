import { Label } from '@/components/ui/label';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneLabel = createDarkOneControl(Label, 'DarkOneLabel', 'text-muted-foreground text-xs tracking-(--darkone-tracking) uppercase');
