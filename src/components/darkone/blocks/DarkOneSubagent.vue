<script setup lang="ts">
import { CircleAlertIcon, CircleCheckIcon, LoaderCircleIcon } from '@lucide/vue';
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

/** A part of the subagent's own message: its report, or a command it ran. */
export type SubagentPart =
  | { type: 'text'; text: string }
  | { type: 'tool-runCommand'; toolCallId: string; state: 'input-available'; input: { command: string } }
  | { type: 'tool-runCommand'; toolCallId: string; state: 'output-available'; input: { command: string }; output: { stdout: string } };

/** The agent tool part that runs the subagent. Its output streams as preliminary results until the run ends. */
export interface SubagentRunPart {
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
  preliminary?: boolean;
  output?: { parts: SubagentPart[] };
}

const props = withDefaults(
  defineProps<{
    agent?: SubagentRunPart;
    /** The subagent, as the title names it: "Ran the research subagent". */
    name?: string;
    question?: string;
    answer?: string;
    /** The chat is streaming, so an unfinished run is running rather than failed. */
    streaming?: boolean;
  }>(),
  { name: 'subagent' },
);

const row = computed(() => {
  const part = props.agent;
  if (!part) return undefined;
  const done = part.state === 'output-available' && !part.preliminary;
  const running = !done && part.state !== 'output-error' && props.streaming;
  const parts = part.state === 'output-available' ? (part.output?.parts ?? []) : [];
  return {
    done,
    running,
    status: done ? undefined : running ? ('running' as const) : ('error' as const),
    title: `${done ? 'Ran' : running ? 'Running' : 'Failed to run'} the ${props.name}`,
    steps: parts.filter((agentPart) => agentPart.type === 'tool-runCommand'),
    hasParts: parts.length > 0,
    report: parts.map((agentPart) => (agentPart.type === 'text' ? agentPart.text : '')).join(''),
  };
});
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
    <DarkOneMessage v-if="row || props.answer">
      <DarkOneMessageContent class="gap-4">
        <DarkOneTrace v-if="row">
          <DarkOneTraceCollapsible v-if="row.hasParts" default-open :unmount-on-hide="false">
            <DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceLine :status="row.status">
                <DarkOneTraceIcon>
                  <CircleCheckIcon v-if="row.done" />
                  <LoaderCircleIcon v-else-if="row.running" class="animate-spin" />
                  <CircleAlertIcon v-else />
                </DarkOneTraceIcon>
                <DarkOneTraceTitle>{{ row.title }}</DarkOneTraceTitle>
              </DarkOneTraceLine>
            </DarkOneTraceCollapsibleTrigger>
            <DarkOneTraceCollapsibleContent class="flex flex-col gap-3">
              <DarkOneTrace>
                <template v-for="step in row.steps" :key="step.toolCallId">
                  <DarkOneTraceCollapsible v-if="step.state === 'output-available'">
                    <DarkOneTraceCollapsibleTrigger>
                      <DarkOneTraceLine>
                        <DarkOneTraceIcon><CircleCheckIcon /></DarkOneTraceIcon>
                        <DarkOneTraceTitle>Ran {{ step.input.command }}</DarkOneTraceTitle>
                      </DarkOneTraceLine>
                    </DarkOneTraceCollapsibleTrigger>
                    <DarkOneTraceCollapsibleContent>
                      <DarkOneCodeBlock size="sm">
                        <DarkOneCodeBlockContent wrap class="max-h-64">{{ step.output.stdout }}</DarkOneCodeBlockContent>
                      </DarkOneCodeBlock>
                    </DarkOneTraceCollapsibleContent>
                  </DarkOneTraceCollapsible>
                  <DarkOneTraceLine v-else :status="row.running ? 'running' : 'error'">
                    <DarkOneTraceIcon>
                      <LoaderCircleIcon v-if="row.running" class="animate-spin" />
                      <CircleAlertIcon v-else />
                    </DarkOneTraceIcon>
                    <DarkOneTraceTitle>{{ row.running ? 'Running' : 'Failed to run' }} {{ step.input.command }}</DarkOneTraceTitle>
                  </DarkOneTraceLine>
                </template>
              </DarkOneTrace>
              <p v-if="row.report" class="whitespace-pre-wrap">{{ row.report }}</p>
            </DarkOneTraceCollapsibleContent>
          </DarkOneTraceCollapsible>
          <DarkOneTraceLine v-else :status="row.status">
            <DarkOneTraceIcon>
              <CircleCheckIcon v-if="row.done" />
              <LoaderCircleIcon v-else-if="row.running" class="animate-spin" />
              <CircleAlertIcon v-else />
            </DarkOneTraceIcon>
            <DarkOneTraceTitle>{{ row.title }}</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTrace>
        <p v-if="props.answer" class="whitespace-pre-wrap">{{ props.answer }}</p>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </div>
</template>
