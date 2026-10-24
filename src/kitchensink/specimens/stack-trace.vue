<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneStackTrace, { type StackTracePart } from '@/components/darkone/blocks/DarkOneStackTrace.vue';
import SpecimenRow from '../SpecimenRow.vue';

const QUESTION = 'Load the portrait workflow and queue a render.';
const ANSWER = 'The workflow loaded, but the render failed in loadLora. The film-grain LoRA has no file on disk, so lora.path is undefined.';

const STACK = `TypeError: Cannot read properties of undefined (reading 'path')
    at loadLora (src/studio/loras.ts:42:28)
    at buildGraph (src/studio/graph.ts:117:15)
    at queueRender (src/studio/queue.ts:31:9)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async ComfyClient.prompt (node_modules/@comfyorg/client/dist/index.js:812:20)`;

const LOAD_OUTPUT = `Loaded workflows/portrait.json
  14 nodes, 2 groups
  checkpoint sdxl_base_1.0.safetensors
  loras film-grain-v2, soft-light-v1`;

const load: StackTracePart = { toolCallId: 'load', state: 'output-available', input: { command: 'studio workflow load portrait' }, output: { stdout: LOAD_OUTPUT } };
const render: StackTracePart = { toolCallId: 'render', state: 'output-error', input: { command: 'studio render portrait --seed 1024' }, errorText: STACK };

const parts = ref<StackTracePart[]>([load, render]);
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
  parts.value = [{ toolCallId: load.toolCallId, state: 'input-available', input: load.input }];
  if (!(await wait(900, id))) return;
  parts.value = [load, { toolCallId: render.toolCallId, state: 'input-available', input: render.input }];
  if (!(await wait(1200, id))) return;
  parts.value = [load, render];
  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id))) return;
    answer.value += word;
  }
  streaming.value = false;
}
</script>

<template>
  <SpecimenRow label="Failed, with frames">
    <div class="flex w-full max-w-sm flex-col gap-4">
      <DarkOneStackTrace :question="QUESTION" :parts="parts" :answer="answer" :streaming="streaming" :frame-href="(frame) => `vscode://file/${frame.file}:${frame.lineNumber}`" />
      <DarkOneButton v-if="!streaming" class="self-start" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Running">
    <DarkOneStackTrace class="max-w-sm" :parts="[load, { toolCallId: 'render', state: 'input-available', input: render.input }]" streaming />
  </SpecimenRow>
</template>
