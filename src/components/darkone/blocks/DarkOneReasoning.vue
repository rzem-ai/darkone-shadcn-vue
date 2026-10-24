<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

export interface ReasoningPart {
  text: string;
  state: 'streaming' | 'done';
  /** Seconds spent thinking, for the title once done. */
  duration?: number;
}

const props = defineProps<{
  parts: ReasoningPart[];
  /** The message is still streaming. A part left `streaming` after the stream ends reads as done. */
  streaming?: boolean;
  /** Whether a finished part starts open. */
  defaultOpen?: boolean;
}>();

// The open state the person set on each part. Until then, a part is open while it runs.
const openState = ref<Record<number, boolean | undefined>>({});
watch(
  () => props.streaming,
  (streaming) => {
    if (streaming) openState.value = {};
  },
);

function running(part: ReasoningPart) {
  return !!props.streaming && part.state === 'streaming';
}

function title(part: ReasoningPart) {
  if (running(part)) return 'Thinking';
  return part.duration ? `Thought for ${part.duration}s` : 'Thought';
}
</script>

<template>
  <DarkOneTrace v-if="props.parts.length > 0">
    <template v-for="(part, index) in props.parts" :key="index">
      <DarkOneTraceLine v-if="part.text.length === 0" :status="running(part) ? 'running' : undefined">
        <DarkOneTraceTitle>{{ title(part) }}</DarkOneTraceTitle>
      </DarkOneTraceLine>
      <DarkOneTraceCollapsible v-else :open="openState[index] ?? (running(part) || !!props.defaultOpen)" @update:open="openState[index] = $event">
        <DarkOneTraceCollapsibleTrigger>
          <DarkOneTraceLine :status="running(part) ? 'running' : undefined">
            <DarkOneTraceTitle>{{ title(part) }}</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceCollapsibleContent class="whitespace-pre-wrap">{{ part.text }}</DarkOneTraceCollapsibleContent>
      </DarkOneTraceCollapsible>
    </template>
  </DarkOneTrace>
</template>
