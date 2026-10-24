import { Skeleton } from '@/components/ui/skeleton';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneSkeleton = createDarkOneControl(Skeleton, 'DarkOneSkeleton', 'rounded-(--darkone-radius)');
