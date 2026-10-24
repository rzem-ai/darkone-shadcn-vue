<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneTool, { type ToolApprovalResponse, type ToolPart } from '@/components/darkone/blocks/DarkOneTool.vue';
import SpecimenRow from '../SpecimenRow.vue';

const QUESTION = 'Which custom node packs are installed?';
const ANSWER = 'ComfyUI 0.3.40 with Impact Pack and KJNodes. The WAS Node Suite is not installed.';

const SCRIPT: ({ command: string; stdout: string } | { command: string; error: string })[] = [
  { command: 'comfy --version', stdout: 'ComfyUI 0.3.40' },
  { command: 'comfy node list --installed', stdout: 'ComfyUI-Impact-Pack  8.4.1\nComfyUI-KJNodes      1.1.2' },
  { command: 'comfy node show was-node-suite', error: 'Node pack not installed: was-node-suite' },
];

function finish(step: (typeof SCRIPT)[number], index: number): ToolPart {
  const part: ToolPart = { toolCallId: `call-${index}`, state: 'input-available', input: { command: step.command } };
  if ('error' in step) return { ...part, state: 'output-error', errorText: step.error };
  return { ...part, state: 'output-available', output: { stdout: step.stdout } };
}

const finished = SCRIPT.map(finish);

// The chat streams in the caller; the block only renders each part's state.
const parts = ref<ToolPart[]>(finished);
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
  answer.value = '';
  for (const [index, step] of SCRIPT.entries()) {
    parts.value = [...parts.value, { toolCallId: `call-${index}`, state: 'input-available', input: { command: step.command } }];
    if (!(await wait(900, id))) return;
    parts.value = [...parts.value.slice(0, -1), finish(step, index)];
  }
  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id))) return;
    answer.value += word;
  }
  streaming.value = false;
}

const running: ToolPart[] = [
  finished[0]!,
  { toolCallId: 'call-1', state: 'input-available', input: { command: 'comfy run --workflow workflows/portrait.json --queue sdxl' } },
];

const approval = ref<ToolPart[]>([
  {
    toolCallId: 'download',
    state: 'approval-requested',
    input: { command: 'comfy model download sdxl_refiner_1.0.safetensors' },
    approval: { id: 'approval-download' },
  },
]);

function respond({ approved }: ToolApprovalResponse) {
  const [part] = approval.value;
  approval.value = [
    approved ? { ...part!, state: 'output-available', output: { stdout: 'Saved models/checkpoints/sdxl_refiner_1.0.safetensors (6.1 GB)' } } : { ...part!, state: 'output-denied' },
  ];
}
</script>

<template>
  <SpecimenRow label="Finished, with a failure">
    <div class="flex w-full max-w-sm flex-col gap-4">
      <DarkOneTool :question="QUESTION" :parts="parts" :answer="answer" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" class="self-start" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Running">
    <DarkOneTool class="max-w-sm" :parts="running" streaming />
  </SpecimenRow>
  <SpecimenRow label="Stopped mid-call">
    <DarkOneTool class="max-w-sm" :parts="running" />
  </SpecimenRow>
  <SpecimenRow label="Awaiting approval">
    <DarkOneTool class="max-w-sm" :parts="approval" @respond="respond" />
  </SpecimenRow>
  <SpecimenRow label="Denied">
    <DarkOneTool class="max-w-sm" :parts="[{ toolCallId: 'purge', state: 'output-denied', input: { command: 'rm -rf output/renders' } }]" />
  </SpecimenRow>
</template>
