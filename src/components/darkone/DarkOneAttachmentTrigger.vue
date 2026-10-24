<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

// The vendor's trigger renders <Primitive> without importing it, so it mounts as an unknown
// element. This is the same full-bleed hit area, rendered through Reka; the attachment's
// focus-within ring shows its focus.
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes['class'] }>(), { as: 'button' });
</script>

<template>
  <Primitive
    data-slot="attachment-trigger"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('absolute inset-0 z-10 rounded-(--darkone-radius) outline-none', props.class)">
    <slot />
  </Primitive>
</template>
