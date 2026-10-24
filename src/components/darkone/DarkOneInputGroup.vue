<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { InputGroup } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const control = useDarkOneControl();
// The group, not its input, is the well: the vendor draws focus with has-[...], since the input inside gives up its own ring.
</script>

<template>
  <InputGroup
    :class="
      cn(
        'rounded-(--darkone-radius) shadow-none',
        control.inField ?
          [
            'border-0 bg-transparent dark:bg-transparent has-[[data-slot=input-group-control]:focus-visible]:ring-0',
            '[&>[data-align=inline-start]]:pl-0 [&>[data-align=inline-end]]:pr-0',
            control.height.value,
          ]
        : 'h-(--darkone-field-height) border-darkone-field-border bg-darkone-field dark:bg-darkone-field has-[[data-slot=input-group-control]:focus-visible]:ring-ring',
        props.class,
      )
    ">
    <slot />
  </InputGroup>
</template>
