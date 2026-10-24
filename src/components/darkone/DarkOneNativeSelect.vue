<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { NativeSelect } from '@/components/ui/native-select';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<{ modelValue?: AcceptableValue | AcceptableValue[]; class?: HTMLAttributes['class'] }>();
const emit = defineEmits<{ 'update:modelValue': [value: AcceptableValue | AcceptableValue[]] }>();
const control = useDarkOneControl();
// pr-8 comes after the control classes, whose px would otherwise run the text under the chevron.
// The vendor declares its emit as a bare type, not a tuple, so the payload arrives typed as undefined.
const update = (...args: unknown[]) => emit('update:modelValue', args[0] as AcceptableValue);
</script>

<template>
  <NativeSelect
    :model-value="props.modelValue"
    :class="cn('rounded-(--darkone-radius) py-0 text-sm shadow-none', control.classes.value, 'pr-8', control.inField && 'dark:hover:bg-transparent', props.class)"
    @update:model-value="update">
    <slot />
  </NativeSelect>
</template>
