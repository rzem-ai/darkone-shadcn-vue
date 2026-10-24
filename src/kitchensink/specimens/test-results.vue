<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneTestResults, { type TestRunPart, type TestSuite } from '@/components/darkone/blocks/DarkOneTestResults.vue';
import SpecimenRow from '../SpecimenRow.vue';

const QUESTION = 'Run the tests for the studio custom nodes.';
const ANSWER = 'One test failed. FilmGrain does not clamp its strength input, so 1.4 reaches the sampler unchanged.';
const COMMAND = 'pytest custom_nodes/studio';

const SUITES: TestSuite[] = [
  {
    name: 'test_prompt_loader.py',
    tests: [
      { name: 'loads a prompt from a workflow', status: 'passed' },
      { name: 'keeps the negative prompt', status: 'passed' },
      { name: 'reads a LoRA trigger word', status: 'skipped' },
    ],
  },
  {
    name: 'test_film_grain.py',
    tests: [
      { name: 'adds grain to an SDXL latent', status: 'passed' },
      {
        name: 'clamps strength to 1.0',
        status: 'failed',
        error: 'assert 1.4 <= 1.0\n\n  at test_strength_clamps (tests/test_film_grain.py:58)',
      },
    ],
  },
];

const passing: TestSuite[] = [{ name: 'test_prompt_loader.py', tests: SUITES[0]!.tests.map((test) => ({ ...test, status: 'passed' })) }];

const part = ref<TestRunPart | undefined>({ toolCallId: 'tests', state: 'output-available', input: { command: COMMAND }, output: { suites: SUITES } });
const answer = ref(ANSWER);
const streaming = ref(false);
let run = 0;
onBeforeUnmount(() => run++);

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => setTimeout(() => resolve(id === run), ms));
}

async function replay() {
  const id = ++run;
  streaming.value = true;
  answer.value = '';
  part.value = { toolCallId: 'tests', state: 'input-available', input: { command: COMMAND } };
  if (!(await wait(1500, id))) return;
  part.value = { ...part.value, state: 'output-available', output: { suites: SUITES } };
  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id))) return;
    answer.value += word;
  }
  streaming.value = false;
}
</script>

<template>
  <SpecimenRow label="A failure">
    <div class="flex w-full max-w-sm flex-col gap-4">
      <DarkOneTestResults :question="QUESTION" :part="part" :answer="answer" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" class="self-start" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="All passing">
    <DarkOneTestResults class="max-w-sm" :part="{ toolCallId: 'tests', state: 'output-available', input: { command: COMMAND }, output: { suites: passing } }" />
  </SpecimenRow>
  <SpecimenRow label="Running">
    <DarkOneTestResults class="max-w-sm" :part="{ toolCallId: 'tests', state: 'input-available', input: { command: COMMAND } }" streaming />
  </SpecimenRow>
  <SpecimenRow label="Failed to run">
    <DarkOneTestResults class="max-w-sm" :part="{ toolCallId: 'tests', state: 'output-error', input: { command: COMMAND } }" />
  </SpecimenRow>
</template>
