<script setup lang="ts">
import { ref } from 'vue';
import { ArrowUpIcon } from '@lucide/vue';
import DarkOneModelSelector, { type EffortOption, type ModelProvider } from '@/components/darkone/blocks/DarkOneModelSelector.vue';
import { DarkOneInputGroup, DarkOneInputGroupAddon, DarkOneInputGroupButton, DarkOneInputGroupTextarea } from '@/components/darkone/input-group';
import SpecimenRow from '../SpecimenRow.vue';

const providers: ModelProvider[] = [
  {
    name: 'Stability AI',
    models: [
      { id: 'sdxl-base-1.0', name: 'SDXL base' },
      { id: 'sdxl-refiner-1.0', name: 'SDXL refiner' },
    ],
  },
  {
    name: 'Black Forest Labs',
    models: [
      { id: 'flux-dev', name: 'Flux dev' },
      { id: 'flux-schnell', name: 'Flux schnell' },
    ],
  },
];
const efforts: EffortOption[] = [
  { id: 'low', name: 'Low' },
  { id: 'medium', name: 'Medium' },
  { id: 'high', name: 'High' },
];

const model = ref('sdxl-base-1.0');
const effort = ref('medium');
const fluxOnly = ref('flux-dev');
const prompt = ref('');
</script>

<template>
  <SpecimenRow label="Model and effort">
    <DarkOneInputGroup class="max-w-lg">
      <DarkOneInputGroupTextarea v-model="prompt" placeholder="Describe the image..." aria-label="Prompt" />
      <DarkOneInputGroupAddon align="block-end">
        <DarkOneModelSelector v-model="model" v-model:effort="effort" :providers="providers" :efforts="efforts" />
        <DarkOneInputGroupButton type="submit" size="icon-sm" variant="default" :disabled="!prompt.trim()" aria-label="Send"><ArrowUpIcon /></DarkOneInputGroupButton>
      </DarkOneInputGroupAddon>
    </DarkOneInputGroup>
  </SpecimenRow>
  <SpecimenRow label="Model only">
    <DarkOneInputGroup class="max-w-lg">
      <DarkOneInputGroupTextarea placeholder="Describe the image..." aria-label="Prompt" />
      <DarkOneInputGroupAddon align="block-end">
        <DarkOneModelSelector v-model="fluxOnly" :providers="providers.slice(1)" />
        <DarkOneInputGroupButton type="submit" size="icon-sm" variant="default" disabled aria-label="Send"><ArrowUpIcon /></DarkOneInputGroupButton>
      </DarkOneInputGroupAddon>
    </DarkOneInputGroup>
  </SpecimenRow>
</template>
