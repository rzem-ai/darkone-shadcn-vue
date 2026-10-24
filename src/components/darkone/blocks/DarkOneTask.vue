<script setup lang="ts">
import { CircleAlertIcon, CircleCheckIcon, LoaderCircleIcon } from '@lucide/vue';
import { computed, ref, watch } from 'vue';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceIcon,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

export interface TaskStep {
  title: string;
  status: 'done' | 'running' | 'error';
}

export interface TaskItem {
  id: string;
  title: string;
  steps: TaskStep[];
}

type Status = 'running' | 'error' | undefined;

const props = defineProps<{
  tasks: TaskItem[];
  /** The agent is still working. A step left `running` after that never finished, so it reads as an error. */
  streaming?: boolean;
}>();

// The open state the person set on each task. Until then, a task is open while it runs.
const openState = ref<Record<string, boolean | undefined>>({});
watch(
  () => props.streaming,
  (streaming) => {
    if (streaming) openState.value = {};
  },
);

function stepStatus(status: TaskStep['status']): Status {
  if (status === 'done') return undefined;
  return status === 'running' && props.streaming ? 'running' : 'error';
}

const rows = computed(() =>
  props.tasks.map((task) => {
    const steps = task.steps.map((step) => ({ title: step.title, status: stepStatus(step.status) }));
    const status: Status =
      steps.some((step) => step.status === 'error') ? 'error'
      : steps.some((step) => step.status === 'running') ? 'running'
      : undefined;
    return { id: task.id, title: task.title, steps, status };
  }),
);
</script>

<template>
  <DarkOneTrace v-if="rows.length > 0">
    <DarkOneTraceCollapsible
      v-for="task in rows"
      :key="task.id"
      :open="openState[task.id] ?? task.status === 'running'"
      :unmount-on-hide="false"
      @update:open="openState[task.id] = $event">
      <DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceLine :status="task.status">
          <DarkOneTraceIcon>
            <LoaderCircleIcon v-if="task.status === 'running'" class="animate-spin" />
            <CircleAlertIcon v-else-if="task.status === 'error'" />
            <CircleCheckIcon v-else />
          </DarkOneTraceIcon>
          <DarkOneTraceTitle>{{ task.title }}</DarkOneTraceTitle>
        </DarkOneTraceLine>
      </DarkOneTraceCollapsibleTrigger>
      <DarkOneTraceCollapsibleContent>
        <DarkOneTrace>
          <DarkOneTraceLine v-for="step in task.steps" :key="step.title" :status="step.status">
            <DarkOneTraceTitle>{{ step.title }}</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTrace>
      </DarkOneTraceCollapsibleContent>
    </DarkOneTraceCollapsible>
  </DarkOneTrace>
</template>
