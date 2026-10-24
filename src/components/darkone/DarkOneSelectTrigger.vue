<script setup lang="ts">
import type { SelectTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'reka-ui';
import { SelectTrigger } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class']; size?: 'sm' | 'default' }>();
const forwarded = useForwardProps(reactiveOmit(props, 'class'));
const control = useDarkOneControl();
</script>

<template>
  <SelectTrigger
    v-bind="forwarded"
    :class="
      cn(
        'w-full min-w-0 rounded-(--darkone-radius) py-0 font-normal shadow-none',
        control.classes.value,
        control.inField ?
          [
            'dark:hover:bg-transparent',
            control.compact?.value ?
              'data-[size=default]:h-[calc(var(--darkone-field-compact-height)-2px)] data-[size=sm]:h-[calc(var(--darkone-field-compact-height)-2px)]'
            : 'data-[size=default]:h-[calc(var(--darkone-field-height)-2px)] data-[size=sm]:h-[calc(var(--darkone-field-height)-2px)]',
          ]
        : 'data-[size=default]:h-(--darkone-field-height) data-[size=sm]:h-(--darkone-field-compact-height)',
        props.class,
      )
    ">
    <slot />
  </SelectTrigger>
</template>
