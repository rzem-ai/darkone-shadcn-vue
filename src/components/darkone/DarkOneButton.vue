<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { Button, type ButtonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: ButtonVariants['variant'];
      size?: ButtonVariants['size'];
      class?: HTMLAttributes['class'];
    }
  >(),
  { variant: 'outline' },
);
</script>

<template>
  <Button
    :as="props.as"
    :as-child="props.asChild"
    :variant="props.variant"
    :size="props.size"
    :class="
      cn(
        // Sentence case, as the text is written, so an action reads apart from the uppercase
        // field labels beside it.
        'gap-1.5 rounded-(--darkone-radius) text-xs tracking-(--darkone-tracking) disabled:opacity-40',
        !props.size && 'h-(--darkone-action-height)',
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
