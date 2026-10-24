<script setup lang="ts">
import { FileCodeIcon, LayersIcon, TerminalIcon } from '@lucide/vue';
import { computed } from 'vue';
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

/** A runCommand tool part, in the AI SDK's shape. A failure's errorText is the stack. */
export type StackTracePart =
  | { toolCallId: string; state: 'input-streaming' | 'input-available'; input: { command: string } }
  | { toolCallId: string; state: 'output-available'; input: { command: string }; output: { stdout: string } }
  | { toolCallId: string; state: 'output-error'; input: { command: string }; errorText: string };

export interface StackFrame {
  line: string;
  name?: string;
  file?: string;
  lineNumber?: string;
  internal: boolean;
}

const props = withDefaults(
  defineProps<{
    parts?: StackTracePart[];
    question?: string;
    answer?: string;
    /** The chat is streaming, so a call with no output is running rather than failed. */
    streaming?: boolean;
    /** Where an app frame links to. Bound as written, so an editor scheme such as vscode:// works;
     * the frame's file comes from the error, so build the URL from it rather than passing it through. */
    frameHref?: (frame: StackFrame) => string;
  }>(),
  { parts: () => [], frameHref: (frame: StackFrame) => `#${frame.file}:${frame.lineNumber}` },
);

function parseFrame(line: string): StackFrame {
  const match = line.match(/^at (.+) \((.+):(\d+):(\d+)\)$/);
  return {
    line,
    name: match?.[1],
    file: match?.[2],
    lineNumber: match?.[3],
    internal: line.includes('node_modules') || line.includes('node:'),
  };
}

function parseStack(stack: string) {
  const [error, ...lines] = stack.split('\n').map((line) => line.trim());
  const frames = lines.map(parseFrame);
  return {
    error,
    appFrames: frames.filter((frame) => !frame.internal),
    internalFrames: frames.filter((frame) => frame.internal),
  };
}

const parsed = computed(() => props.parts.map((part) => (part.state === 'output-error' ? { ...part, error: parseStack(part.errorText) } : part)));
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
    <DarkOneMessage v-if="props.parts.length > 0 || props.answer">
      <DarkOneMessageContent class="gap-4">
        <DarkOneTrace v-if="props.parts.length > 0">
          <template v-for="part in parsed" :key="part.toolCallId">
            <DarkOneTraceCollapsible v-if="part.state === 'output-error'" default-open>
              <DarkOneTraceCollapsibleTrigger>
                <DarkOneTraceLine status="error">
                  <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
                  <DarkOneTraceTitle>Failed: {{ part.error.error }}</DarkOneTraceTitle>
                </DarkOneTraceLine>
              </DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceCollapsibleContent class="flex flex-col gap-2">
                <p class="font-mono text-xs text-destructive">{{ part.error.error }}</p>
                <DarkOneTrace>
                  <a v-for="frame in part.error.appFrames" :key="frame.line" :href="props.frameHref(frame)">
                    <DarkOneTraceLine>
                      <DarkOneTraceIcon><FileCodeIcon /></DarkOneTraceIcon>
                      <DarkOneTraceTitle>{{ frame.name }} in {{ frame.file }}:{{ frame.lineNumber }}</DarkOneTraceTitle>
                    </DarkOneTraceLine>
                  </a>
                  <DarkOneTraceCollapsible v-if="part.error.internalFrames.length > 0">
                    <DarkOneTraceCollapsibleTrigger>
                      <DarkOneTraceLine>
                        <DarkOneTraceIcon><LayersIcon /></DarkOneTraceIcon>
                        <DarkOneTraceTitle>{{ part.error.internalFrames.length }} framework frames</DarkOneTraceTitle>
                      </DarkOneTraceLine>
                    </DarkOneTraceCollapsibleTrigger>
                    <DarkOneTraceCollapsibleContent>
                      <!-- The same recessed well as the code block, as a list, one frame per line. -->
                      <ol class="flex flex-col gap-1 overflow-x-auto rounded-(--darkone-radius) border border-darkone-field-border bg-darkone-field p-2.5 font-mono text-xs">
                        <li v-for="frame in part.error.internalFrames" :key="frame.line" class="whitespace-nowrap">{{ frame.line }}</li>
                      </ol>
                    </DarkOneTraceCollapsibleContent>
                  </DarkOneTraceCollapsible>
                </DarkOneTrace>
              </DarkOneTraceCollapsibleContent>
            </DarkOneTraceCollapsible>
            <DarkOneTraceCollapsible v-else-if="part.state === 'output-available'">
              <DarkOneTraceCollapsibleTrigger>
                <DarkOneTraceLine>
                  <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
                  <DarkOneTraceTitle>Ran {{ part.input.command }}</DarkOneTraceTitle>
                </DarkOneTraceLine>
              </DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceCollapsibleContent>
                <DarkOneCodeBlock size="sm">
                  <DarkOneCodeBlockContent wrap class="max-h-64">{{ part.output.stdout }}</DarkOneCodeBlockContent>
                </DarkOneCodeBlock>
              </DarkOneTraceCollapsibleContent>
            </DarkOneTraceCollapsible>
            <DarkOneTraceLine v-else :status="props.streaming ? 'running' : 'error'">
              <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
              <DarkOneTraceTitle>{{ props.streaming ? 'Running' : 'Failed to run' }} {{ part.input.command }}</DarkOneTraceTitle>
            </DarkOneTraceLine>
          </template>
        </DarkOneTrace>
        <p v-if="props.answer" class="whitespace-pre-wrap">{{ props.answer }}</p>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </div>
</template>
