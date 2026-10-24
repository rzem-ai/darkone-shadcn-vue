<script setup lang="ts">
import { ArrowUpIcon, PlusIcon } from '@lucide/vue';
import { computed, ref, useTemplateRef } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneInputGroup, DarkOneInputGroupAddon, DarkOneInputGroupButton, DarkOneInputGroupTextarea } from '@/components/darkone/input-group';
import { DarkOneMessage, DarkOneMessageContent } from '@/components/darkone/message';

export interface SuggestionTurn {
  prompt: string;
  reply: string;
}

const props = withDefaults(defineProps<{ suggestions: string[]; turn?: SuggestionTurn | null; placeholder?: string }>(), {
  turn: null,
  placeholder: 'Ask the agent...',
});
const emit = defineEmits<{ select: [suggestion: string]; send: [text: string]; attach: [] }>();

const text = ref('');
const form = useTemplateRef<HTMLFormElement>('form');
const canSend = computed(() => text.value.trim().length > 0);

function onSubmit() {
  if (!canSend.value) return;
  emit('send', text.value.trim());
  text.value = '';
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.value?.requestSubmit();
  }
}
</script>

<template>
  <div class="flex w-full flex-col gap-6 text-sm">
    <div v-if="props.turn" class="flex flex-col gap-4">
      <DarkOneMessage align="end">
        <DarkOneMessageContent>
          <DarkOneBubble align="end" variant="muted">
            <DarkOneBubbleContent>{{ props.turn.prompt }}</DarkOneBubbleContent>
          </DarkOneBubble>
        </DarkOneMessageContent>
      </DarkOneMessage>
      <DarkOneMessage>
        <DarkOneMessageContent>
          <p>{{ props.turn.reply }}</p>
        </DarkOneMessageContent>
      </DarkOneMessage>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none]">
        <DarkOneButton v-for="suggestion in props.suggestions" :key="suggestion" class="shrink-0" @click="emit('select', suggestion)">
          {{ suggestion }}
        </DarkOneButton>
      </div>
      <form ref="form" @submit.prevent="onSubmit">
        <DarkOneInputGroup>
          <DarkOneInputGroupTextarea v-model="text" :placeholder="props.placeholder" aria-label="Message" @keydown="onKeydown" />
          <DarkOneInputGroupAddon align="block-end">
            <DarkOneInputGroupButton type="button" size="icon-sm" variant="outline" aria-label="Attach files" @click="emit('attach')">
              <PlusIcon />
            </DarkOneInputGroupButton>
            <DarkOneInputGroupButton type="submit" size="icon-sm" variant="default" class="ml-auto" :disabled="!canSend" aria-label="Send">
              <ArrowUpIcon />
            </DarkOneInputGroupButton>
          </DarkOneInputGroupAddon>
        </DarkOneInputGroup>
      </form>
    </div>
  </div>
</template>
