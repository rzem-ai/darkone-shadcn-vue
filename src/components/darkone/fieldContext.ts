import { computed, inject, type InjectionKey, type ComputedRef } from 'vue';

/** Only DarkOne controls opt into a field well. Unrelated descendants are never restyled. */
export const darkOneFieldKey: InjectionKey<ComputedRef<boolean>> = Symbol('darkone-field-compact');

/** Outside a DarkOneField, a control draws its own recessed well; inside one, the field owns the border and ring. */
export function useDarkOneControl() {
  const compact = inject(darkOneFieldKey, null);
  const height = computed(() => (compact?.value ? 'h-[calc(var(--darkone-field-compact-height)-2px)]' : 'h-[calc(var(--darkone-field-height)-2px)]'));
  const classes = computed(() =>
    compact === null ?
      'border-darkone-field-border bg-darkone-field dark:bg-darkone-field h-(--darkone-field-height) px-2.5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring'
    : `border-0 bg-transparent dark:bg-transparent px-0 has-[>svg]:px-0 shadow-none focus-visible:ring-0 ${height.value}`,
  );
  return { inField: compact !== null, compact, height, classes };
}
