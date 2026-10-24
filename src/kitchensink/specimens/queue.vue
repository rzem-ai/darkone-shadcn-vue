<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneQueue, { type QueueTodo } from '@/components/darkone/blocks/DarkOneQueue.vue';
import SpecimenRow from '../SpecimenRow.vue';

const TODOS = ['Queue seed 1024 on SDXL', 'Queue seed 1025 on SDXL', 'Queue seed 1026 with the refiner', 'Upscale the best render 2x'];

function todosAt(current: number): QueueTodo[] {
  return TODOS.map((content, index) => ({
    content,
    status:
      index < current ? 'completed'
      : index === current ? 'in_progress'
      : 'pending',
  }));
}

// The live row replays the agent sending the whole list again as each job finishes.
const todos = ref<QueueTodo[]>([]);
const streaming = ref(false);
let run = 0;
onBeforeUnmount(() => run++);

function wait(ms: number, id: number) {
  return new Promise<boolean>((resolve) => setTimeout(() => resolve(id === run), ms));
}

async function replay() {
  const id = ++run;
  streaming.value = true;
  for (let index = 0; index < TODOS.length; index++) {
    todos.value = todosAt(index);
    if (!(await wait(1400, id))) return;
  }
  todos.value = todosAt(TODOS.length);
  streaming.value = false;
}

onMounted(replay);
</script>

<template>
  <SpecimenRow label="In progress">
    <div class="flex w-full max-w-md flex-col items-start gap-3">
      <DarkOneQueue :todos="todos" :streaming="streaming" />
      <DarkOneButton v-if="!streaming" size="sm" @click="replay">Replay</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Half done">
    <div class="w-full max-w-md">
      <DarkOneQueue :todos="todosAt(2)" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Done">
    <div class="w-full max-w-md">
      <DarkOneQueue :todos="todosAt(TODOS.length)" />
    </div>
  </SpecimenRow>
</template>
