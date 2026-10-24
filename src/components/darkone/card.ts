import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneCard = createDarkOneControl(Card, 'DarkOneCard', 'gap-3 rounded-(--darkone-radius) py-3 shadow-none');
export const DarkOneCardHeader = createDarkOneControl(CardHeader, 'DarkOneCardHeader', 'px-3 [.border-b]:pb-3');
export const DarkOneCardTitle = createDarkOneControl(CardTitle, 'DarkOneCardTitle', 'text-sm');
export const DarkOneCardDescription = createDarkOneControl(CardDescription, 'DarkOneCardDescription', 'text-sm');
export const DarkOneCardContent = createDarkOneControl(CardContent, 'DarkOneCardContent', 'px-3');
export const DarkOneCardFooter = createDarkOneControl(CardFooter, 'DarkOneCardFooter', 'px-3');
