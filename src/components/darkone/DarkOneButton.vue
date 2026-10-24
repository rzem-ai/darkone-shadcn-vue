<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';
import { Button, type ButtonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** The vendor sizes, plus `icon-action`: a square at the action height, to sit in a row of DarkOne actions and fields. */
export type DarkOneButtonSize = ButtonVariants['size'] | 'icon-action';

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: ButtonVariants['variant'];
      size?: DarkOneButtonSize;
      class?: HTMLAttributes['class'];
    }
  >(),
  { variant: 'outline' },
);
/** `icon-action` draws on the vendor's icon square, resized to the DarkOne token. */
const vendorSize = computed(() => (props.size === 'icon-action' ? 'icon' : props.size));
</script>

<template>
  <Button
    :as="props.as"
    :as-child="props.asChild"
    :variant="props.variant"
    :size="vendorSize"
    :class="
      cn(
        // Sentence case, as the text is written, so an action reads apart from the uppercase
        // field labels beside it.
        'gap-1.5 rounded-(--darkone-radius) text-xs tracking-(--darkone-tracking) disabled:opacity-40',
        !props.size && 'h-(--darkone-action-height)',
        props.size === 'icon-action' && 'size-(--darkone-action-height)',
        props.size?.startsWith('icon') ? 'p-0' : 'px-2.5 py-0',
        props.variant === 'default' && 'border border-primary',
        // The vendor ring is ring/50, about 2:1 on the dark surfaces, and its destructive
        // variant adds dark:...destructive/40, which outranks a plain class.
        'focus-visible:ring-ring dark:focus-visible:ring-ring',
        props.class,
      )
    ">
    <slot />
  </Button>
</template>
