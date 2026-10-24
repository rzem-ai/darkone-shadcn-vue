import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { createDarkOneControl } from './createDarkOneControl';

// The image fills the avatar, which clips it, so it keeps its exact identity.
export { AvatarImage as DarkOneAvatarImage } from '@/components/ui/avatar';
export const DarkOneAvatar = createDarkOneControl(Avatar, 'DarkOneAvatar', 'rounded-(--darkone-radius)');
export const DarkOneAvatarFallback = createDarkOneControl(AvatarFallback, 'DarkOneAvatarFallback', 'rounded-(--darkone-radius) text-xs tracking-(--darkone-tracking)');
