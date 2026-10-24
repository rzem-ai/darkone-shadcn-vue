<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<{ modelValue?: string | number; defaultValue?: string | number; class?: HTMLAttributes['class'] }>();
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();
const control = useDarkOneControl();
// h-auto comes after the control classes, so a textarea grows rather than taking the single-line field height.
</script>

<template>
  <Textarea
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :class="cn('rounded-(--darkone-radius) text-sm shadow-none md:text-sm', control.classes.value, 'h-auto py-1.5', props.class)"
    @update:model-value="emit('update:modelValue', $event)" />
</template>
