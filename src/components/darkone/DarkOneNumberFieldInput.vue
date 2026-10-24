<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { NumberFieldInput } from '@/components/ui/number-field';
import { cn } from '@/lib/utils';
import { useDarkOneControl } from './fieldContext';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
const control = useDarkOneControl();
</script>

<template>
  <NumberFieldInput :class="cn('rounded-(--darkone-radius) py-0 tabular-nums shadow-none', control.classes.value, props.class)" />
</template>
