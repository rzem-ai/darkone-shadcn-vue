<script setup lang="ts">
import { TerminalIcon } from '@lucide/vue';
import { computed } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneCodeBlock, DarkOneCodeBlockContent } from '@/components/darkone/code-block';
import { DarkOneItem, DarkOneItemActions, DarkOneItemContent, DarkOneItemMedia, DarkOneItemTitle } from '@/components/darkone/item';
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

/** A runCommand tool part, in the AI SDK's shape. */
export interface ToolPart {
  toolCallId: string;
  state: 'input-streaming' | 'input-available' | 'approval-requested' | 'approval-responded' | 'output-available' | 'output-error' | 'output-denied';
  input: { command: string };
  output?: { stdout: string };
  errorText?: string;
  approval?: { id: string; approved?: boolean };
}

export interface ToolApprovalResponse {
  id: string;
  approved: boolean;
}

const props = withDefaults(
  defineProps<{
    parts?: ToolPart[];
    question?: string;
    answer?: string;
    /** The chat is streaming, so a call with no output is running rather than failed. */
    streaming?: boolean;
  }>(),
  { parts: () => [] },
);

const emit = defineEmits<{ respond: [response: ToolApprovalResponse] }>();

// A pending approval is a question for the person, not a step the agent took, so it sits outside the trace.
const lines = computed(() => props.parts.filter((part) => part.state !== 'approval-requested'));
const approvals = computed(() => props.parts.filter((part) => part.state === 'approval-requested'));

function isDenied(part: ToolPart) {
  return part.state === 'output-denied' || (part.state === 'approval-responded' && part.approval?.approved === false);
}

function respond(part: ToolPart, approved: boolean) {
  emit('respond', { id: part.approval?.id ?? part.toolCallId, approved });
}
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
        <DarkOneTrace v-if="lines.length > 0">
          <template v-for="part in lines" :key="part.toolCallId">
            <DarkOneTraceLine v-if="isDenied(part)">
              <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
              <DarkOneTraceTitle>Denied {{ part.input.command }}</DarkOneTraceTitle>
            </DarkOneTraceLine>
            <!-- A finished transcript opens on its failure; a call that fails while streaming stays shut. -->
            <DarkOneTraceCollapsible
              v-else-if="part.state === 'output-available' || part.state === 'output-error'"
              :default-open="!props.streaming && part.state === 'output-error'">
              <DarkOneTraceCollapsibleTrigger>
                <DarkOneTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                  <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
                  <DarkOneTraceTitle>{{ part.state === 'output-error' ? 'Failed to run' : 'Ran' }} {{ part.input.command }}</DarkOneTraceTitle>
                </DarkOneTraceLine>
              </DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceCollapsibleContent>
                <DarkOneCodeBlock size="sm">
                  <DarkOneCodeBlockContent wrap class="max-h-64">{{ part.state === 'output-error' ? part.errorText : part.output?.stdout }}</DarkOneCodeBlockContent>
                </DarkOneCodeBlock>
              </DarkOneTraceCollapsibleContent>
            </DarkOneTraceCollapsible>
            <DarkOneTraceLine v-else :status="props.streaming ? 'running' : 'error'">
              <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
              <DarkOneTraceTitle>{{ props.streaming ? 'Running' : 'Failed to run' }} {{ part.input.command }}</DarkOneTraceTitle>
            </DarkOneTraceLine>
          </template>
        </DarkOneTrace>
        <DarkOneItem v-for="part in approvals" :key="part.toolCallId" variant="outline" size="sm">
          <DarkOneItemMedia variant="icon"><TerminalIcon /></DarkOneItemMedia>
          <DarkOneItemContent>
            <DarkOneItemTitle>Run {{ part.input.command }}?</DarkOneItemTitle>
          </DarkOneItemContent>
          <DarkOneItemActions>
            <DarkOneButton @click="respond(part, false)">Deny</DarkOneButton>
            <DarkOneButton variant="default" @click="respond(part, true)">Approve</DarkOneButton>
          </DarkOneItemActions>
        </DarkOneItem>
        <p v-if="props.answer" class="whitespace-pre-wrap">{{ props.answer }}</p>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </div>
</template>
