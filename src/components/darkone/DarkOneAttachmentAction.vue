<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '@/components/ui/button';
import DarkOneButton from './DarkOneButton.vue';

// The vendor's action forwards neither its class nor as-child, so it cannot be restyled
// from outside; this is the same ghost icon button, drawn as a DarkOne action.
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      variant?: ButtonVariants['variant'];
      size?: ButtonVariants['size'];
      class?: HTMLAttributes['class'];
    }
  >(),
  { variant: 'ghost', size: 'icon-xs' },
);
</script>

<template>
  <DarkOneButton data-slot="attachment-action" :as="props.as" :as-child="props.asChild" :variant="props.variant" :size="props.size" :class="props.class">
    <slot />
  </DarkOneButton>
</template>
