<script setup lang="ts">
import { CheckIcon } from '@lucide/vue';
import {
  DarkOneStepper,
  DarkOneStepperDescription,
  DarkOneStepperIndicator,
  DarkOneStepperItem,
  DarkOneStepperSeparator,
  DarkOneStepperTitle,
  DarkOneStepperTrigger,
} from '@/components/darkone/stepper';
import SpecimenRow from '../SpecimenRow.vue';

const steps = [
  { step: 1, title: 'Load model', description: 'SDXL base, 6.9 GB' },
  { step: 2, title: 'Encode prompt', description: 'Two text encoders' },
  { step: 3, title: 'Sample', description: '28 steps, euler_ancestral' },
  { step: 4, title: 'Decode', description: 'VAE, tiled' },
  { step: 5, title: 'Upscale', description: 'Not in this workflow', disabled: true },
];
</script>

<template>
  <SpecimenRow label="Completed, active, pending, disabled">
    <DarkOneStepper :default-value="3" class="w-full max-w-2xl items-start">
      <DarkOneStepperItem v-for="item in steps" :key="item.step" v-slot="{ state }" :step="item.step" :disabled="item.disabled" class="flex-1 items-start">
        <DarkOneStepperTrigger>
          <DarkOneStepperIndicator>
            <CheckIcon v-if="state === 'completed'" class="size-3.5" />
            <span v-else>{{ item.step }}</span>
          </DarkOneStepperIndicator>
          <DarkOneStepperTitle>{{ item.title }}</DarkOneStepperTitle>
          <DarkOneStepperDescription>{{ item.description }}</DarkOneStepperDescription>
        </DarkOneStepperTrigger>
        <DarkOneStepperSeparator v-if="item.step !== steps.length" class="mt-4 h-px flex-1" />
      </DarkOneStepperItem>
    </DarkOneStepper>
  </SpecimenRow>
  <SpecimenRow label="Vertical">
    <DarkOneStepper :default-value="2" orientation="vertical" class="flex-col">
      <DarkOneStepperItem v-for="item in steps.slice(0, 3)" :key="item.step" v-slot="{ state }" :step="item.step">
        <DarkOneStepperTrigger class="flex-row">
          <DarkOneStepperIndicator>
            <CheckIcon v-if="state === 'completed'" class="size-3.5" />
            <span v-else>{{ item.step }}</span>
          </DarkOneStepperIndicator>
          <DarkOneStepperTitle>{{ item.title }}</DarkOneStepperTitle>
        </DarkOneStepperTrigger>
      </DarkOneStepperItem>
    </DarkOneStepper>
  </SpecimenRow>
</template>
