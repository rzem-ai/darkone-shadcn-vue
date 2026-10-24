<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneSlider } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const strength = ref([40]);
const range = ref([20, 80]);
</script>

<template>
  <SpecimenRow label="Single">
    <DarkOneSlider v-model="strength" :max="100" class="max-w-xs" aria-label="Strength" />
    <span class="font-mono text-xs text-muted-foreground">{{ strength[0] }}</span>
  </SpecimenRow>
  <SpecimenRow label="Range">
    <DarkOneSlider v-model="range" :max="100" class="max-w-xs" aria-label="Range" />
    <span class="font-mono text-xs text-muted-foreground">{{ range.join(' to ') }}</span>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneSlider :model-value="[60]" disabled class="max-w-xs" aria-label="Locked" />
  </SpecimenRow>
</template>
