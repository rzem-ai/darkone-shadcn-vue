<script setup lang="ts">
import { DarkOneAspectRatio } from '@/components/darkone/aspect-ratio';
import SpecimenRow from '../SpecimenRow.vue';

const frames = [
  { label: 'Square', ratio: 1, size: '1024 × 1024', width: 'w-32' },
  { label: 'Portrait', ratio: 2 / 3, size: '832 × 1216', width: 'w-28' },
  { label: 'Landscape', ratio: 16 / 9, size: '1344 × 768', width: 'w-48' },
];
</script>

<template>
  <SpecimenRow v-for="frame in frames" :key="frame.label" :label="frame.label">
    <div :class="frame.width">
      <DarkOneAspectRatio :ratio="frame.ratio" class="flex items-center justify-center border border-darkone-field-border bg-darkone-field">
        <span class="font-mono text-xs text-muted-foreground">{{ frame.size }}</span>
      </DarkOneAspectRatio>
    </div>
  </SpecimenRow>
</template>
