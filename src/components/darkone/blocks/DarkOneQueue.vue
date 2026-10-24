<script setup lang="ts">
import { CircleCheckIcon, CircleDotIcon, CircleIcon, ListChecksIcon, ListTodoIcon } from '@lucide/vue';
import { computed } from 'vue';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceIcon,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

export interface QueueTodo {
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
}

const props = defineProps<{
  /** The whole list, as the agent last wrote it. */
  todos: QueueTodo[];
  /** The agent is still working, so the todo in progress shimmers. */
  streaming?: boolean;
}>();

const sections = computed(() => {
  const pending = props.todos.filter((todo) => todo.status !== 'completed');
  const completed = props.todos.filter((todo) => todo.status === 'completed');
  return [
    { id: 'pending', icon: ListTodoIcon, title: `${pending.length} to do`, todos: pending },
    { id: 'completed', icon: ListChecksIcon, title: `${completed.length} completed`, todos: completed },
  ].filter((section) => section.todos.length > 0);
});
</script>

<template>
  <DarkOneTrace v-if="props.todos.length > 0">
    <DarkOneTraceCollapsible v-for="section in sections" :key="section.id" default-open>
      <DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceLine>
          <DarkOneTraceIcon><component :is="section.icon" /></DarkOneTraceIcon>
          <DarkOneTraceTitle>{{ section.title }}</DarkOneTraceTitle>
        </DarkOneTraceLine>
      </DarkOneTraceCollapsibleTrigger>
      <DarkOneTraceCollapsibleContent>
        <DarkOneTrace>
          <DarkOneTraceLine v-for="todo in section.todos" :key="todo.content" :status="props.streaming && todo.status === 'in_progress' ? 'running' : undefined">
            <DarkOneTraceIcon>
              <CircleCheckIcon v-if="todo.status === 'completed'" />
              <CircleDotIcon v-else-if="todo.status === 'in_progress'" />
              <CircleIcon v-else />
            </DarkOneTraceIcon>
            <DarkOneTraceTitle>{{ todo.content }}</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTrace>
      </DarkOneTraceCollapsibleContent>
    </DarkOneTraceCollapsible>
  </DarkOneTrace>
</template>
