<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOnePlan, { type PlanStep } from '@/components/darkone/blocks/DarkOnePlan.vue';
import SpecimenRow from '../SpecimenRow.vue';

const TITLE = 'Plan: render the dusk portrait set';
const STEPS = ['Load sdxl_base_1.0 and the refiner', 'Apply film-grain-v2 at 0.6', 'Queue 4 seeds at 1024x1536', 'Upscale the keeper with 4x-UltraSharp'];

function planAt(current: number): PlanStep[] {
  return STEPS.map((title, index) => ({
    title,
    status:
      index < current ? 'done'
      : index === current ? 'running'
      : 'pending',
  }));
}

// The live row replays the agent rewriting the plan as each step finishes.
const steps = ref<PlanStep[]>(planAt(0));
const streaming = ref(false);
let run = 0;
onBeforeUnmount(() => run++);

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => setTimeout(() => resolve(id === run), ms));
}

async function replay() {
  const id = ++run;
  streaming.value = true;
  for (let index = 0; index <= STEPS.length; index++) {
    steps.value = planAt(index);
    if (index < STEPS.length && !(await wait(1200, id))) return;
  }
  streaming.value = false;
}

onMounted(replay);
</script>

<template>
  <SpecimenRow label="Running">
    <div class="flex w-full max-w-md flex-col items-start gap-3">
      <DarkOnePlan :title="TITLE" :steps="steps" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" size="sm" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done">
    <div class="w-full max-w-md">
      <DarkOnePlan :title="TITLE" :steps="planAt(STEPS.length)" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Stopped partway">
    <div class="w-full max-w-md">
      <DarkOnePlan :title="TITLE" :steps="planAt(2)" />
    </div>
  </SpecimenRow>
</template>
