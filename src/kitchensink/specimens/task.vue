<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneTask, { type TaskItem } from '@/components/darkone/blocks/DarkOneTask.vue';
import SpecimenRow from '../SpecimenRow.vue';

// Each title and step reads in progress, then done.
const SCRIPT = [
  {
    id: 'models',
    title: ['Finding the models', 'Found the models'],
    steps: [
      ['Searching models/ for sdxl', 'Searched models/ for sdxl'],
      ['Reading the film-grain-v2 model card', 'Read the film-grain-v2 model card'],
    ],
  },
  {
    id: 'workflow',
    title: ['Building the workflow', 'Built the workflow'],
    steps: [
      ['Adding a LoraLoader at 0.6', 'Added a LoraLoader at 0.6'],
      ['Setting the sampler to DPM++ 2M Karras', 'Set the sampler to DPM++ 2M Karras'],
      ['Writing workflows/dusk-portrait.json', 'Wrote workflows/dusk-portrait.json'],
    ],
  },
];

function taskAt(task: (typeof SCRIPT)[number], done: number): TaskItem {
  return {
    id: task.id,
    title: task.title[done < task.steps.length ? 0 : 1]!,
    steps: task.steps.slice(0, done + 1).map(([running, finished], index) => ({
      title: (index < done ? finished : running)!,
      status: index < done ? 'done' : 'running',
    })),
  };
}

const finished = SCRIPT.map((task) => taskAt(task, task.steps.length));

const failed: TaskItem[] = [
  finished[0]!,
  {
    id: 'render',
    title: 'Rendering the batch',
    steps: [
      { title: 'Queued 8 renders at 1024x1536', status: 'done' },
      { title: 'CUDA out of memory at batch 8', status: 'error' },
    ],
  },
];

// The live row replays the agent writing each task again as its steps finish.
const tasks = ref<TaskItem[]>([]);
const streaming = ref(false);
let run = 0;
onBeforeUnmount(() => run++);

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => setTimeout(() => resolve(id === run), ms));
}

async function replay() {
  const id = ++run;
  tasks.value = [];
  streaming.value = true;
  for (const [index, task] of SCRIPT.entries()) {
    for (let done = 0; done <= task.steps.length; done++) {
      tasks.value = [...tasks.value.slice(0, index), taskAt(task, done)];
      if (!(await wait(900, id))) return;
    }
  }
  streaming.value = false;
}

onMounted(replay);
</script>

<template>
  <SpecimenRow label="Running">
    <div class="flex w-full max-w-md flex-col items-start gap-3">
      <DarkOneTask :tasks="tasks" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" size="sm" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done">
    <div class="w-full max-w-md">
      <DarkOneTask :tasks="finished" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="A step failed">
    <div class="w-full max-w-md">
      <DarkOneTask :tasks="failed" />
    </div>
  </SpecimenRow>
</template>
