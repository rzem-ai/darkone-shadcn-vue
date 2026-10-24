<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneChainOfThought, { type ChainOfThoughtStep } from '@/components/darkone/blocks/DarkOneChainOfThought.vue';
import SpecimenRow from '../SpecimenRow.vue';

// The steps the agent takes to find why a render is slow, in order, with their output.
const SCRIPT: Omit<ChainOfThoughtStep, 'state'>[] = [
  {
    id: 'log',
    title: { running: 'Reading the run log for job 4e1a', done: 'Read the run log for job 4e1a', error: 'Failed to read the run log for job 4e1a' },
    output: { type: 'text', text: 'load model    6.2s\nsample x28   41.0s\nvae decode   38.4s' },
    defaultOpen: true,
  },
  {
    id: 'web',
    title: { running: 'Searching the web for SDXL VAE decode slow', done: 'Searched the web for SDXL VAE decode slow', error: 'Failed to search the web' },
    output: {
      type: 'links',
      links: [
        { title: 'sdxl-vae-fp16-fix | huggingface.co', url: 'https://huggingface.co/madebyollin/sdxl-vae-fp16-fix' },
        { title: 'stable-diffusion-xl-base-1.0 | huggingface.co', url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0' },
      ],
    },
  },
  {
    id: 'workflows',
    title: { running: 'Searching the workflows for VAEDecode', done: 'Searched the workflows for VAEDecode', error: 'Failed to search the workflows' },
    output: { type: 'files', files: ['workflows/portrait.json', 'workflows/upscale.json'] },
  },
];

const done: ChainOfThoughtStep[] = SCRIPT.map((step) => ({ ...step, state: 'output-available' }));

const failed: ChainOfThoughtStep[] = [
  done[0]!,
  { ...SCRIPT[1]!, output: undefined, state: 'output-error', errorText: 'Search provider timed out after 10s.' },
  done[2]!,
];

// The live row replays the research: each step waits on its output, then shows it.
const steps = ref<ChainOfThoughtStep[]>([]);
const streaming = ref(false);
let run = 0;
onBeforeUnmount(() => run++);

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => setTimeout(() => resolve(id === run), ms));
}

async function replay() {
  const id = ++run;
  steps.value = [];
  streaming.value = true;
  for (const { output, ...rest } of SCRIPT) {
    const step = reactive<ChainOfThoughtStep>({ ...rest, state: 'input-available' });
    steps.value.push(step);
    if (!(await wait(900, id))) return;
    step.output = output;
    step.state = 'output-available';
  }
  streaming.value = false;
}

onMounted(replay);
</script>

<template>
  <SpecimenRow label="Researching">
    <div class="flex w-full max-w-md flex-col items-start gap-3">
      <DarkOneChainOfThought :steps="steps" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" size="sm" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done, open">
    <div class="w-full max-w-md">
      <DarkOneChainOfThought :steps="done" default-open />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done, collapsed">
    <div class="w-full max-w-md">
      <DarkOneChainOfThought :steps="done" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="A step failed">
    <div class="w-full max-w-md">
      <DarkOneChainOfThought :steps="failed" default-open />
    </div>
  </SpecimenRow>
</template>
