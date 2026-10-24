<script setup lang="ts">
import { computed, provide, useId } from 'vue';
import { darkOneFieldKey } from './fieldContext';

export type DarkOneFieldTone = 'positive' | 'caution' | 'negative';

/** Theme tokens only: the success and destructive hues, and the chart hue that stands in for amber, which the palette lacks. */
const BORDER: Record<DarkOneFieldTone, string> = {
  positive: 'border-chart-4',
  caution: 'border-chart-3',
  negative: 'border-destructive',
};

/** The well owns the border and focus ring; DarkOne controls opt in through context. */
const props = withDefaults(
  defineProps<{
    /** The label above the well; absent where a heading or a number beside the well names it instead. */
    label?: string;
    /** Read-only text drawn in the well when no control is slotted. */
    value?: string;
    help?: string;
    mono?: boolean;
    compact?: boolean;
    for?: string;
    /** A state the well's border carries in its tone. Absent, the plain field border. */
    tone?: DarkOneFieldTone;
    /** The label is read by assistive technology but not drawn, for a well whose section header already names it. */
    labelHidden?: boolean;
  }>(),
  { mono: false, compact: false, labelHidden: false },
);

provide(
  darkOneFieldKey,
  computed(() => props.compact),
);
const id = useId();
const helpId = computed(() => (props.help ? id : undefined));
/** A toned well keeps its colour while focused, so the state stays visible; the ring still marks focus. */
const border = computed(() => (props.tone ? BORDER[props.tone] : 'border-darkone-field-border focus-within:border-ring'));
defineSlots<{ default?: (props: { helpId: string | undefined }) => unknown }>();
</script>

<template>
  <div data-darkone-field class="flex min-w-0 flex-col gap-1">
    <component
      :is="props.for ? 'label' : 'div'"
      v-if="props.label"
      :for="props.for"
      data-darkone-field-label
      class="text-xs tracking-(--darkone-tracking) text-muted-foreground uppercase"
      :class="props.labelHidden && 'sr-only'">
      {{ props.label }}
    </component>
    <div
      data-darkone-well
      :data-tone="props.tone"
      class="flex min-w-0 items-center justify-between gap-2 rounded-(--darkone-radius) border bg-darkone-field px-2.5 text-sm focus-within:ring-3 focus-within:ring-ring has-[textarea]:h-auto [&>*]:min-w-0 [&>*]:flex-1"
      :class="[border, props.compact ? 'h-(--darkone-field-compact-height)' : 'h-(--darkone-field-height)']">
      <slot :help-id="helpId">
        <span data-darkone-field-value class="min-w-0 flex-1" :class="props.mono && 'font-mono text-xs'">{{ props.value }}</span>
      </slot>
    </div>
    <div v-if="props.help" :id="helpId" data-darkone-field-help class="text-xs text-muted-foreground">{{ props.help }}</div>
  </div>
</template>
