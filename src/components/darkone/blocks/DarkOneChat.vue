<script setup lang="ts">
import { ArrowUpIcon, CircleCheckIcon, LoaderCircleIcon, MessageCircleDashedIcon, PlusIcon, RotateCwIcon, TerminalIcon } from '@lucide/vue';
import { type Component, computed, reactive, ref, useTemplateRef, watch } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneCodeBlock, DarkOneCodeBlockContent } from '@/components/darkone/code-block';
import { DarkOneDropdownMenu, DarkOneDropdownMenuContent, DarkOneDropdownMenuItem, DarkOneDropdownMenuTrigger } from '@/components/darkone/dropdown-menu';
import { DarkOneEmpty, DarkOneEmptyDescription, DarkOneEmptyHeader, DarkOneEmptyMedia, DarkOneEmptyTitle } from '@/components/darkone/empty';
import { DarkOneInputGroup, DarkOneInputGroupAddon, DarkOneInputGroupButton, DarkOneInputGroupTextarea } from '@/components/darkone/input-group';
import { DarkOneMessage, DarkOneMessageContent } from '@/components/darkone/message';
import {
  DarkOneMessageScroller,
  DarkOneMessageScrollerButton,
  DarkOneMessageScrollerContent,
  DarkOneMessageScrollerItem,
  DarkOneMessageScrollerProvider,
  DarkOneMessageScrollerViewport,
} from '@/components/darkone/message-scroller';
import { DarkOneTooltip, DarkOneTooltipContent, DarkOneTooltipProvider, DarkOneTooltipTrigger } from '@/components/darkone/tooltip';
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
export type ChatPart =
  | { type: 'reasoning'; text: string; state: 'streaming' | 'done' }
  | {
      type: 'tool-runCommand';
      state: 'input-available' | 'output-available' | 'output-error';
      input: { command: string };
      output?: { stdout: string };
      errorText?: string;
    }
  | { type: 'text'; text: string };

export interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  parts: ChatPart[];
}

export type ChatStatus = 'ready' | 'submitted' | 'streaming';

/** An entry in the add-context menu; choosing it emits `context` with its value. */
export interface ChatContextOption {
  value: string;
  label: string;
  icon?: Component;
}

type ToolPart = Extract<ChatPart, { type: 'tool-runCommand' }>;
type StepPart = Exclude<ChatPart, { type: 'text' }>;

const props = withDefaults(
  defineProps<{
    messages: ChatTurn[];
    status?: ChatStatus;
    title?: string;
    description?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    placeholder?: string;
    /** Fills the input until the person types, so a first message is one press away. */
    prompt?: string;
    contextOptions?: ChatContextOption[];
  }>(),
  {
    status: 'ready',
    title: 'New Thread',
    description: 'Ask the agent to change your code.',
    emptyTitle: 'What should we build?',
    emptyDescription: 'The agent can read your code, run commands and make changes. Press send to start.',
    placeholder: 'Ask the agent...',
    prompt: '',
    contextOptions: () => [],
  },
);
const emit = defineEmits<{ send: [text: string]; reset: []; context: [value: string] }>();

const draft = ref<string | null>(null);
const form = useTemplateRef<HTMLFormElement>('form');
// Open state of each reasoning row, set once the person toggles it.
const reasoningOpen = reactive<Record<string, boolean | undefined>>({});

const busy = computed(() => props.status !== 'ready');
const text = computed({
  get: () => draft.value ?? props.prompt,
  set: (value: string) => {
    draft.value = value;
  },
});
const canSend = computed(() => text.value.trim().length > 0 && !busy.value);

// A cleared thread starts over, so the rows it remembered opening go with it.
watch(
  () => props.messages.length === 0,
  (empty) => {
    if (!empty) return;
    for (const key in reasoningOpen) delete reasoningOpen[key];
  },
);

function onSubmit() {
  if (!canSend.value) return;
  emit('send', text.value.trim());
  draft.value = null;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.value?.requestSubmit();
  }
}

function reset() {
  draft.value = null;
  emit('reset');
}

function getMessageText(message: ChatTurn) {
  return message.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
}

function getSteps(message: ChatTurn) {
  return message.parts.filter((part): part is StepPart => part.type !== 'text');
}

function isStreaming(message: ChatTurn) {
  return busy.value && message === props.messages.at(-1);
}

function isFinished(part: ToolPart) {
  return part.state === 'output-available' || part.state === 'output-error';
}
</script>

<template>
  <DarkOneTooltipProvider>
    <DarkOneMessageScrollerProvider>
      <div class="flex h-full min-h-0 w-full flex-col gap-4">
        <div class="flex items-start justify-between gap-4 p-4 pb-0">
          <div class="flex flex-col gap-1">
            <div class="font-medium">{{ props.title }}</div>
            <div class="text-sm text-muted-foreground">{{ props.description }}</div>
          </div>
          <DarkOneTooltip>
            <DarkOneTooltipTrigger as-child>
              <DarkOneButton size="icon" aria-label="Reset conversation" :disabled="busy" @click="reset">
                <RotateCwIcon />
              </DarkOneButton>
            </DarkOneTooltipTrigger>
            <DarkOneTooltipContent>
              <p>Reset</p>
            </DarkOneTooltipContent>
          </DarkOneTooltip>
        </div>
        <div class="min-h-0 flex-1">
          <DarkOneEmpty v-if="props.messages.length === 0" class="h-full">
            <DarkOneEmptyHeader>
              <DarkOneEmptyMedia variant="icon">
                <MessageCircleDashedIcon />
              </DarkOneEmptyMedia>
              <DarkOneEmptyTitle>{{ props.emptyTitle }}</DarkOneEmptyTitle>
              <DarkOneEmptyDescription>{{ props.emptyDescription }}</DarkOneEmptyDescription>
            </DarkOneEmptyHeader>
          </DarkOneEmpty>
          <DarkOneMessageScroller v-else>
            <DarkOneMessageScrollerViewport>
              <DarkOneMessageScrollerContent :aria-busy="busy" class="gap-6 px-4 py-0">
                <template v-for="message in props.messages" :key="message.id">
                  <DarkOneMessageScrollerItem v-if="message.role === 'user'" :message-id="message.id" scroll-anchor>
                    <DarkOneMessage align="end">
                      <DarkOneMessageContent>
                        <DarkOneBubble align="end" variant="muted">
                          <DarkOneBubbleContent class="whitespace-pre-wrap">{{ getMessageText(message) }}</DarkOneBubbleContent>
                        </DarkOneBubble>
                      </DarkOneMessageContent>
                    </DarkOneMessage>
                  </DarkOneMessageScrollerItem>
                  <DarkOneMessageScrollerItem v-else :message-id="message.id">
                    <DarkOneMessage>
                      <DarkOneMessageContent class="gap-3">
                        <DarkOneTrace v-if="getSteps(message).length > 0">
                          <template v-for="(part, index) in getSteps(message)" :key="index">
                            <DarkOneTraceCollapsible
                              v-if="part.type === 'reasoning'"
                              :open="reasoningOpen[`${message.id}-${index}`] ?? part.state === 'streaming'"
                              @update:open="reasoningOpen[`${message.id}-${index}`] = $event">
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
                            <DarkOneTraceCollapsible v-else-if="isFinished(part)">
                              <DarkOneTraceCollapsibleTrigger>
                                <DarkOneTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                                  <DarkOneTraceIcon>
                                    <TerminalIcon />
                                  </DarkOneTraceIcon>
                                  <DarkOneTraceTitle>{{ part.state === 'output-error' ? 'Failed to run' : 'Ran' }} {{ part.input.command }}</DarkOneTraceTitle>
                                </DarkOneTraceLine>
                              </DarkOneTraceCollapsibleTrigger>
                              <DarkOneTraceCollapsibleContent>
                                <DarkOneCodeBlock size="sm">
                                  <DarkOneCodeBlockContent wrap class="max-h-64">{{
                                    part.state === 'output-error' ? part.errorText : part.output?.stdout
                                  }}</DarkOneCodeBlockContent>
                                </DarkOneCodeBlock>
                              </DarkOneTraceCollapsibleContent>
                            </DarkOneTraceCollapsible>
                            <!-- Unfinished: running while the turn streams, failed if the turn ended without output. -->
                            <DarkOneTraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                              <DarkOneTraceIcon>
                                <TerminalIcon />
                              </DarkOneTraceIcon>
                              <DarkOneTraceTitle>{{ isStreaming(message) ? 'Running' : 'Failed to run' }} {{ part.input.command }}</DarkOneTraceTitle>
                            </DarkOneTraceLine>
                          </template>
                        </DarkOneTrace>
                        <p v-if="getMessageText(message)" class="whitespace-pre-wrap">{{ getMessageText(message) }}</p>
                      </DarkOneMessageContent>
                    </DarkOneMessage>
                  </DarkOneMessageScrollerItem>
                </template>
              </DarkOneMessageScrollerContent>
            </DarkOneMessageScrollerViewport>
            <DarkOneMessageScrollerButton />
          </DarkOneMessageScroller>
        </div>
        <div class="p-4 pt-0">
          <form ref="form" class="w-full" @submit.prevent="onSubmit">
            <DarkOneInputGroup>
              <DarkOneInputGroupTextarea v-model="text" :placeholder="props.placeholder" aria-label="Message" class="min-h-14" @keydown="onKeydown" />
              <DarkOneInputGroupAddon align="block-end" class="pt-1">
                <DarkOneDropdownMenu v-if="props.contextOptions.length > 0">
                  <DarkOneDropdownMenuTrigger as-child>
                    <DarkOneInputGroupButton aria-label="Add context" type="button" size="icon-sm" variant="outline">
                      <PlusIcon />
                    </DarkOneInputGroupButton>
                  </DarkOneDropdownMenuTrigger>
                  <DarkOneDropdownMenuContent align="start" side="top" class="w-44">
                    <DarkOneDropdownMenuItem v-for="option in props.contextOptions" :key="option.value" @select="emit('context', option.value)">
                      <component :is="option.icon" v-if="option.icon" />
                      {{ option.label }}
                    </DarkOneDropdownMenuItem>
                  </DarkOneDropdownMenuContent>
                </DarkOneDropdownMenu>
                <DarkOneInputGroupButton type="submit" variant="default" size="icon-sm" :disabled="!canSend" class="ml-auto">
                  <ArrowUpIcon />
                  <span class="sr-only">Send</span>
                </DarkOneInputGroupButton>
              </DarkOneInputGroupAddon>
            </DarkOneInputGroup>
          </form>
        </div>
      </div>
    </DarkOneMessageScrollerProvider>
  </DarkOneTooltipProvider>
</template>
