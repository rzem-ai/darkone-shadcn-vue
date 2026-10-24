<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneSubagent, { type SubagentPart, type SubagentRunPart } from '@/components/darkone/blocks/DarkOneSubagent.vue';
import SpecimenRow from '../SpecimenRow.vue';

const QUESTION = 'Why does every portrait render reload the checkpoint?';
const REPORT = 'The workflow sets unload_models on its last node, so ComfyUI drops the 6.9 GB checkpoint after each render.';
const ANSWER = 'Each render reloads SDXL because the workflow unloads its models when it finishes. Turn off unload_models on the SaveImage node, and the checkpoint stays in VRAM between renders.';

const STEPS = [
  { command: 'grep -n unload_models workflows/portrait.json', stdout: '212:      "unload_models": true' },
  { command: 'jq ".nodes[13].type" workflows/portrait.json', stdout: '"SaveImage"' },
  { command: 'du -h models/checkpoints/sdxl_base_1.0.safetensors', stdout: '6.9G\tmodels/checkpoints/sdxl_base_1.0.safetensors' },
];

function subagentParts(done: number, report?: string): SubagentPart[] {
  const parts: SubagentPart[] = STEPS.slice(0, done).map((step, index) => ({
    type: 'tool-runCommand',
    toolCallId: `step-${index}`,
    state: 'output-available',
    input: { command: step.command },
    output: { stdout: step.stdout },
  }));
  if (done < STEPS.length) parts.push({ type: 'tool-runCommand', toolCallId: `step-${done}`, state: 'input-available', input: { command: STEPS[done]!.command } });
  if (report) parts.push({ type: 'text', text: report });
  return parts;
}

const agent = ref<SubagentRunPart | undefined>({ state: 'output-available', output: { parts: subagentParts(STEPS.length, REPORT) } });
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
  agent.value = { state: 'input-available' };
  if (!(await wait(600, id))) return;
  // Each step arrives as a preliminary output, until the subagent reports.
  for (let index = 0; index < STEPS.length; index++) {
    agent.value = { state: 'output-available', preliminary: true, output: { parts: subagentParts(index) } };
    if (!(await wait(1000, id))) return;
  }
  agent.value = { state: 'output-available', output: { parts: subagentParts(STEPS.length, REPORT) } };
  if (!(await wait(400, id))) return;
  for (const word of ANSWER.split(/(?<= )/)) {
    if (!(await wait(20, id))) return;
    answer.value += word;
  }
  streaming.value = false;
}

const midRun: SubagentRunPart = { state: 'output-available', preliminary: true, output: { parts: subagentParts(1) } };
</script>

<template>
  <SpecimenRow label="Finished">
    <div class="flex w-full max-w-sm flex-col gap-4">
      <DarkOneSubagent name="research subagent" :question="QUESTION" :agent="agent" :answer="answer" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" class="self-start" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Running">
    <DarkOneSubagent class="max-w-sm" name="research subagent" :agent="midRun" streaming />
  </SpecimenRow>
  <SpecimenRow label="Starting">
    <DarkOneSubagent class="max-w-sm" name="research subagent" :agent="{ state: 'input-available' }" streaming />
  </SpecimenRow>
  <SpecimenRow label="Stopped mid-run">
    <DarkOneSubagent class="max-w-sm" name="research subagent" :agent="midRun" />
  </SpecimenRow>
</template>
