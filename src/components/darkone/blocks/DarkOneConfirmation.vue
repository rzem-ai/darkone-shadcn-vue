<script setup lang="ts">
import { CircleCheckIcon, LoaderCircleIcon, TerminalIcon } from '@lucide/vue';
import { ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneItem, DarkOneItemActions, DarkOneItemContent, DarkOneItemDescription, DarkOneItemMedia, DarkOneItemTitle } from '@/components/darkone/item';
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

// The parts of an agent turn, shaped like AI SDK UI message parts.
export interface ConfirmationToolPart {
  type: 'tool-runCommand';
  toolCallId: string;
  state: 'approval-requested' | 'approval-responded' | 'output-available' | 'output-denied';
  input: { command: string };
  approval: { id: string; approved?: boolean };
}

export interface ConfirmationReasoningPart {
  type: 'reasoning';
  text: string;
  state: 'streaming' | 'done';
}

export interface ConfirmationTextPart {
  type: 'text';
  text: string;
}

export type ConfirmationPart = ConfirmationToolPart | ConfirmationReasoningPart | ConfirmationTextPart;

export interface ConfirmationMessage {
  id: string;
  role: 'user' | 'assistant';
  parts: ConfirmationPart[];
}

const props = withDefaults(defineProps<{ messages: ConfirmationMessage[]; description?: string }>(), {
  description: 'The command runs in this project.',
});
const emit = defineEmits<{ approve: [part: ConfirmationToolPart]; deny: [part: ConfirmationToolPart] }>();

// The open state of each reasoning line, once the person opens or closes it.
const openState = ref<Record<string, boolean | undefined>>({});

function getText(message: ConfirmationMessage) {
  return message.parts
    .filter((part): part is ConfirmationTextPart => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

function isDenied(part: ConfirmationToolPart) {
  return part.state === 'output-denied' || (part.state === 'approval-responded' && !part.approval.approved);
}
</script>

<template>
  <div class="flex w-full flex-col gap-4 text-sm">
    <template v-for="message in props.messages" :key="message.id">
      <DarkOneMessage v-if="message.role === 'user'" align="end">
        <DarkOneMessageContent>
          <DarkOneBubble align="end" variant="muted">
            <DarkOneBubbleContent>{{ getText(message) }}</DarkOneBubbleContent>
          </DarkOneBubble>
        </DarkOneMessageContent>
      </DarkOneMessage>
      <DarkOneMessage v-else>
        <DarkOneMessageContent class="gap-4">
          <template v-for="(part, index) in message.parts" :key="index">
            <p v-if="part.type === 'text'" class="whitespace-pre-wrap">{{ part.text }}</p>
            <DarkOneTrace v-else-if="part.type === 'reasoning'">
              <DarkOneTraceCollapsible
                :open="openState[`${message.id}-${index}`] ?? part.state === 'streaming'"
                @update:open="openState[`${message.id}-${index}`] = $event">
                <DarkOneTraceCollapsibleTrigger>
                  <DarkOneTraceLine :status="part.state === 'streaming' ? 'running' : undefined">
                    <DarkOneTraceIcon>
                      <LoaderCircleIcon v-if="part.state === 'streaming'" class="animate-spin" />
                      <CircleCheckIcon v-else />
                    </DarkOneTraceIcon>
                    <DarkOneTraceTitle>{{ part.state === 'streaming' ? 'Thinking' : 'Thought' }}</DarkOneTraceTitle>
                  </DarkOneTraceLine>
                </DarkOneTraceCollapsibleTrigger>
                <DarkOneTraceCollapsibleContent class="whitespace-pre-wrap">{{ part.text }}</DarkOneTraceCollapsibleContent>
              </DarkOneTraceCollapsible>
            </DarkOneTrace>
            <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
            <DarkOneItem v-else-if="part.state === 'approval-requested'" variant="outline" size="sm">
              <DarkOneItemMedia variant="icon">
                <TerminalIcon />
              </DarkOneItemMedia>
              <DarkOneItemContent>
                <DarkOneItemTitle>Run {{ part.input.command }}?</DarkOneItemTitle>
                <DarkOneItemDescription>{{ props.description }}</DarkOneItemDescription>
              </DarkOneItemContent>
              <DarkOneItemActions>
                <DarkOneButton @click="emit('deny', part)">Deny</DarkOneButton>
                <DarkOneButton variant="default" @click="emit('approve', part)">Approve</DarkOneButton>
              </DarkOneItemActions>
            </DarkOneItem>
            <DarkOneTrace v-else>
              <DarkOneTraceLine :status="!isDenied(part) && part.state !== 'output-available' ? 'running' : undefined">
                <DarkOneTraceIcon>
                  <TerminalIcon />
                </DarkOneTraceIcon>
                <DarkOneTraceTitle>
                  {{ isDenied(part) ? 'Denied' : part.state === 'output-available' ? 'Ran' : 'Running' }}
                  {{ part.input.command }}
                </DarkOneTraceTitle>
              </DarkOneTraceLine>
            </DarkOneTrace>
          </template>
        </DarkOneMessageContent>
      </DarkOneMessage>
    </template>
  </div>
</template>
