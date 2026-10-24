<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue';
import { computed, ref, watch } from 'vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneCodeBlock, DarkOneCodeBlockContent } from '@/components/darkone/code-block';
import { DarkOneMessage, DarkOneMessageContent } from '@/components/darkone/message';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceIcon,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

/** A shell tool part, in the AI SDK's shape. Its output streams separately, as data parts. */
export interface TerminalPart {
  toolCallId: string;
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
  input: { command: string };
  output?: { exitCode: number };
  errorText?: string;
}

const props = withDefaults(
  defineProps<{
    parts?: TerminalPart[];
    /** The data-terminal parts, keyed by the tool call id. */
    outputs?: Record<string, string>;
    question?: string;
    answer?: string;
    /** The chat is streaming, so a command with no exit code is running rather than failed. */
    streaming?: boolean;
  }>(),
  { parts: () => [], outputs: () => ({}) },
);

// Open the last command when the transcript is not streaming; a new run starts with every row following its output.
const openState = ref<Record<string, boolean>>(!props.streaming && props.parts.length > 0 ? { [props.parts.at(-1)!.toolCallId]: true } : {});
watch(
  () => props.streaming,
  (streaming) => {
    if (streaming) openState.value = {};
  },
);

function getTitle(part: TerminalPart, running: boolean) {
  const command = part.input.command;
  if (part.state === 'output-available') return part.output?.exitCode === 0 ? `Ran ${command}` : `${command} exited with code ${part.output?.exitCode}`;
  return running ? `Running ${command}` : `Failed to run ${command}`;
}

const rows = computed(() =>
  props.parts.map((part) => {
    const output = props.outputs[part.toolCallId] ?? '';
    const running = props.streaming && (part.state === 'input-streaming' || part.state === 'input-available');
    const failed = !running && (part.state !== 'output-available' || part.output?.exitCode !== 0);
    return {
      id: part.toolCallId,
      title: getTitle(part, running),
      status: running ? ('running' as const) : failed ? ('error' as const) : undefined,
      open: openState.value[part.toolCallId] ?? (running && output.length > 0),
      output: part.state === 'output-error' ? part.errorText : output,
    };
  }),
);
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-4 text-sm">
    <DarkOneMessage v-if="props.question" align="end">
      <DarkOneMessageContent>
        <DarkOneBubble align="end" variant="muted">
          <DarkOneBubbleContent>{{ props.question }}</DarkOneBubbleContent>
        </DarkOneBubble>
      </DarkOneMessageContent>
    </DarkOneMessage>
    <DarkOneMessage v-if="rows.length > 0 || props.answer">
      <DarkOneMessageContent class="gap-4">
        <DarkOneTrace v-if="rows.length > 0">
          <DarkOneTraceCollapsible v-for="row in rows" :key="row.id" :open="row.open" @update:open="openState[row.id] = $event">
            <DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceLine :status="row.status">
                <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
                <DarkOneTraceTitle>{{ row.title }}</DarkOneTraceTitle>
              </DarkOneTraceLine>
            </DarkOneTraceCollapsibleTrigger>
            <DarkOneTraceCollapsibleContent>
              <DarkOneCodeBlock size="sm">
                <DarkOneCodeBlockContent wrap class="max-h-64">{{ row.output }}</DarkOneCodeBlockContent>
              </DarkOneCodeBlock>
            </DarkOneTraceCollapsibleContent>
          </DarkOneTraceCollapsible>
        </DarkOneTrace>
        <p v-if="props.answer" class="whitespace-pre-wrap">{{ props.answer }}</p>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </div>
</template>
