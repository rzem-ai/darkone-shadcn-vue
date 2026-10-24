import { Checkbox } from '@/components/ui/checkbox';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneCheckbox = createDarkOneControl(Checkbox, 'DarkOneCheckbox', 'rounded-(--darkone-radius) border-darkone-field-border shadow-none');
