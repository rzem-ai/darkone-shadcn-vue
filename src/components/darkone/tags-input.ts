import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '@/components/ui/tags-input';
import { createDarkOneControl } from './createDarkOneControl';

export const DarkOneTagsInput = createDarkOneControl(TagsInput, 'DarkOneTagsInput', 'min-h-(--darkone-field-height) rounded-(--darkone-radius) border-darkone-field-border bg-darkone-field shadow-none');
export const DarkOneTagsInputInput = createDarkOneControl(TagsInputInput, 'DarkOneTagsInputInput', 'rounded-(--darkone-radius)');
export const DarkOneTagsInputItem = createDarkOneControl(TagsInputItem, 'DarkOneTagsInputItem', 'rounded-(--darkone-radius)');
export const DarkOneTagsInputItemText = createDarkOneControl(TagsInputItemText, 'DarkOneTagsInputItemText', 'rounded-(--darkone-radius)');
export const DarkOneTagsInputItemDelete = createDarkOneControl(TagsInputItemDelete, 'DarkOneTagsInputItemDelete', 'rounded-(--darkone-radius)');
