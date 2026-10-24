<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneReasoning, { type ReasoningPart } from '@/components/darkone/blocks/DarkOneReasoning.vue';
import SpecimenRow from '../SpecimenRow.vue';

const REASONING =
  'The brief asks for a 35mm film look at dusk. DPM++ 2M Karras settles by 28 steps on SDXL, where Euler a is still drifting at 40, so the grain would shift between seeds.\n\nfilm-grain-v2 at 0.8 crushes the shadows at CFG 7. At 0.6 with CFG 6 the skin keeps its texture.';

const done: ReasoningPart[] = [{ text: REASONING, state: 'done', duration: 6 }];

// The live row replays a stream: the caller owns the parts and appends to them.
const parts = ref<ReasoningPart[]>([]);
const streaming = ref(false);
let run = 0;
onBeforeUnmount(() => run++);

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => setTimeout(() => resolve(id === run), ms));
}

async function replay() {
  const id = ++run;
  const part = reactive<ReasoningPart>({ text: '', state: 'streaming' });
  parts.value = [part];
  streaming.value = true;
  if (!(await wait(600, id))) return;
  for (const chunk of REASONING.match(/\S+\s*/g) ?? []) {
    part.text += chunk;
    if (!(await wait(40, id))) return;
  }
  part.state = 'done';
  part.duration = 6;
  streaming.value = false;
}

onMounted(replay);
</script>

<template>
  <SpecimenRow label="Streaming">
    <div class="flex w-full max-w-md flex-col items-start gap-3">
      <DarkOneReasoning :parts="parts" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" size="sm" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Before the first token">
    <div class="w-full max-w-md">
      <DarkOneReasoning :parts="[{ text: '', state: 'streaming' }]" streaming />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done, open">
    <div class="w-full max-w-md">
      <DarkOneReasoning :parts="done" default-open />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done, collapsed">
    <div class="w-full max-w-md">
      <DarkOneReasoning :parts="done" />
    </div>
  </SpecimenRow>
</template>
