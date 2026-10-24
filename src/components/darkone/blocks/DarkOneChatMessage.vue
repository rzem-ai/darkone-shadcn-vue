<script setup lang="ts">
import { CheckIcon, CopyIcon, PencilIcon, RefreshCcwIcon, ThumbsDownIcon, ThumbsUpIcon } from '@lucide/vue';
import { useClipboard } from '@vueuse/core';
import { type Component, computed } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneMessage, DarkOneMessageContent, DarkOneMessageFooter } from '@/components/darkone/message';
import { DarkOneTooltip, DarkOneTooltipContent, DarkOneTooltipProvider, DarkOneTooltipTrigger } from '@/components/darkone/tooltip';

export type ChatMessageRole = 'user' | 'assistant';
export type ChatMessageFeedback = 'like' | 'dislike' | null;

const props = defineProps<{ role: ChatMessageRole; text: string }>();
const emit = defineEmits<{ edit: []; retry: [] }>();
const feedback = defineModel<ChatMessageFeedback>('feedback', { default: null });

const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true });

interface Action {
  label: string;
  icon: Component;
  pressed?: boolean;
  fill?: boolean;
  onClick: () => void;
}

const actions = computed<Action[]>(() => {
  const copyAction: Action = { label: copied.value ? 'Copied' : 'Copy', icon: copied.value ? CheckIcon : CopyIcon, onClick: () => copy(props.text) };
  if (props.role === 'user') return [copyAction, { label: 'Edit', icon: PencilIcon, onClick: () => emit('edit') }];
  return [
    copyAction,
    { label: 'Good response', icon: ThumbsUpIcon, pressed: feedback.value === 'like', fill: true, onClick: () => (feedback.value = feedback.value === 'like' ? null : 'like') },
    { label: 'Bad response', icon: ThumbsDownIcon, pressed: feedback.value === 'dislike', fill: true, onClick: () => (feedback.value = feedback.value === 'dislike' ? null : 'dislike') },
    { label: 'Retry', icon: RefreshCcwIcon, onClick: () => emit('retry') },
  ];
});
</script>

<template>
  <DarkOneTooltipProvider>
    <DarkOneMessage :align="props.role === 'user' ? 'end' : 'start'">
      <DarkOneMessageContent class="gap-2">
        <DarkOneBubble v-if="props.role === 'user'" align="end" variant="muted">
          <DarkOneBubbleContent class="whitespace-pre-wrap">{{ props.text }}</DarkOneBubbleContent>
        </DarkOneBubble>
        <p v-else class="whitespace-pre-wrap">{{ props.text }}</p>
        <DarkOneMessageFooter :class="props.role === 'assistant' && 'px-0'">
          <!-- Keyed by position: Copy relabels itself to Copied, and its tooltip should stay open through that. -->
          <DarkOneTooltip v-for="(action, index) in actions" :key="index">
            <DarkOneTooltipTrigger as-child>
              <DarkOneButton variant="ghost" size="icon-sm" :aria-label="action.label" :aria-pressed="action.pressed" @click="action.onClick">
                <component :is="action.icon" :class="action.fill && action.pressed ? 'fill-current' : undefined" />
              </DarkOneButton>
            </DarkOneTooltipTrigger>
            <DarkOneTooltipContent>
              <p>{{ action.label }}</p>
            </DarkOneTooltipContent>
          </DarkOneTooltip>
        </DarkOneMessageFooter>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </DarkOneTooltipProvider>
</template>
