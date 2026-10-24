<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Alert, type AlertVariants } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

export type DarkOneAlertTone = 'positive' | 'caution';

/** The field's tone hues: the success token, and the chart hue that stands in for amber. Negative is the vendor's destructive variant.
 * Like the field, a tone colours a 2px left edge alone; the other three are the plain border. */
const TONE: Record<DarkOneAlertTone, string> = {
  positive: 'border-l-2 border-l-chart-4 [&>svg]:text-chart-4',
  caution: 'border-l-2 border-l-chart-3 [&>svg]:text-chart-3',
};

const props = defineProps<{
  class?: HTMLAttributes['class'];
  variant?: AlertVariants['variant'];
  /** A state the left edge and icon carry, while the text stays readable in the foreground colour. */
  tone?: DarkOneAlertTone;
}>();
</script>

<template>
  <Alert
    :variant="props.variant"
    :class="cn('rounded-(--darkone-radius) px-3 py-2', props.variant === 'destructive' && 'border-l-2 border-l-destructive', props.tone && TONE[props.tone], props.class)">
    <slot />
  </Alert>
</template>
