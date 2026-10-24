<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<{ modelValue?: string | number; defaultValue?: string | number; class?: HTMLAttributes['class'] }>();
const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>();
const control = useDarkOneControl();
</script>

<template>
  <Input
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :class="cn('rounded-(--darkone-radius) text-sm shadow-none md:text-sm', control.classes.value, props.class)"
    @update:model-value="emit('update:modelValue', $event)" />
</template>
