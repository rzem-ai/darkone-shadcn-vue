<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneTerminal, { type TerminalPart } from '@/components/darkone/blocks/DarkOneTerminal.vue';
import SpecimenRow from '../SpecimenRow.vue';

const QUESTION = 'Lint the custom nodes, test them, then queue the portrait batch.';
const ANSWER = 'Lint and tests pass, and four portrait renders are queued on SDXL.';

const COMMANDS = [
  { id: 'lint', command: 'ruff check custom_nodes/studio', output: ['All checks passed!'] },
  {
    id: 'test',
    command: 'pytest custom_nodes/studio',
    output: ['============ test session starts ============', 'collected 18 items', '', 'tests/test_film_grain.py ......     [ 33%]', 'tests/test_prompt_loader.py ............ [100%]', '', '============ 18 passed in 2.41s ============'],
  },
  {
    id: 'queue',
    command: 'comfy run --workflow workflows/portrait.json --batch 4',
    output: ['Loaded workflows/portrait.json (14 nodes)', 'Model sdxl_base_1.0.safetensors', 'Queued prompt 4e1a, seed 1024', 'Queued prompt 4e1b, seed 1025', 'Queued prompt 4e1c, seed 1026', 'Queued prompt 4e1d, seed 1027'],
  },
];

const finishedParts = (): TerminalPart[] => COMMANDS.map(({ id, command }) => ({ toolCallId: id, state: 'output-available', input: { command }, output: { exitCode: 0 } }));
const finishedOutputs = () => Object.fromEntries(COMMANDS.map(({ id, output }) => [id, output.join('\n')]));

const parts = ref<TerminalPart[]>(finishedParts());
const outputs = ref<Record<string, string>>(finishedOutputs());
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
  parts.value = [];
  outputs.value = {};
  answer.value = '';
  for (const { id: toolCallId, command, output } of COMMANDS) {
    parts.value = [...parts.value, { toolCallId, state: 'input-available', input: { command } }];
    // The tool streams its output as a data part with the tool call's id.
    for (let index = 0; index < output.length; index++) {
      outputs.value = { ...outputs.value, [toolCallId]: output.slice(0, index + 1).join('\n') };
      if (!(await wait(200, id))) return;
    }
    parts.value = parts.value.map((part) => (part.toolCallId === toolCallId ? { ...part, state: 'output-available', output: { exitCode: 0 } } : part));
  }
  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id))) return;
    answer.value += word;
  }
  streaming.value = false;
}

const streamingParts: TerminalPart[] = [{ toolCallId: 'test', state: 'input-available', input: { command: 'pytest custom_nodes/studio' } }];
const streamingOutputs = { test: COMMANDS[1]!.output.slice(0, 4).join('\n') };

const failedParts: TerminalPart[] = [{ toolCallId: 'test', state: 'output-available', input: { command: 'pytest custom_nodes/studio' }, output: { exitCode: 1 } }];
const failedOutputs = {
  test: 'collected 18 items\n\ntests/test_film_grain.py ..F...     [ 33%]\n\nFAILED tests/test_film_grain.py::test_strength_clamps - assert 1.4 <= 1.0\n============ 1 failed, 17 passed in 2.58s ============',
};
</script>

<template>
  <SpecimenRow label="Finished">
    <div class="flex w-full max-w-sm flex-col gap-4">
      <DarkOneTerminal :question="QUESTION" :parts="parts" :outputs="outputs" :answer="answer" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" class="self-start" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Streaming output">
    <DarkOneTerminal class="max-w-sm" :parts="streamingParts" :outputs="streamingOutputs" streaming />
  </SpecimenRow>
  <SpecimenRow label="Non-zero exit">
    <DarkOneTerminal class="max-w-sm" :parts="failedParts" :outputs="failedOutputs" />
  </SpecimenRow>
</template>
