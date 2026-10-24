<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'reka-ui';
import { ComboboxAnchor } from '@/components/ui/combobox';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<ComboboxAnchorProps & { class?: HTMLAttributes['class'] }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
const control = useDarkOneControl();
// The anchor is the well, so it rings on focus-within: focus lands on the input inside it.
// The vendor input brings its own command-style wrapper, with a bottom border, which is right in a list and wrong here.
</script>

<template>
  <ComboboxAnchor
    v-bind="forwarded"
    :class="
      cn(
        'flex w-full min-w-0 items-center gap-1.5 rounded-(--darkone-radius) text-sm',
        '[&_[data-slot=command-input-wrapper]]:h-full [&_[data-slot=command-input-wrapper]]:flex-1 [&_[data-slot=command-input-wrapper]]:border-0 [&_[data-slot=command-input-wrapper]]:px-0',
        control.inField ?
          ['border-0 bg-transparent px-0', control.height.value]
        : 'h-(--darkone-field-height) border border-darkone-field-border bg-darkone-field px-2.5 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring',
        props.class,
      )
    ">
    <slot />
  </ComboboxAnchor>
</template>
