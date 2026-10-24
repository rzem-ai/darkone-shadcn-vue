<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowUpIcon, FileTextIcon, PlusIcon, XIcon } from '@lucide/vue';
import { useFileDialog } from '@vueuse/core';
import {
  DarkOneAttachment,
  DarkOneAttachmentAction,
  DarkOneAttachmentActions,
  DarkOneAttachmentContent,
  DarkOneAttachmentMedia,
  DarkOneAttachmentTitle,
} from '@/components/darkone/attachment';
import { DarkOneInputGroup, DarkOneInputGroupAddon, DarkOneInputGroupButton, DarkOneInputGroupTextarea } from '@/components/darkone/input-group';
import DarkOneModelSelector, { type EffortOption, type ModelProvider } from '@/components/darkone/blocks/DarkOneModelSelector.vue';

export interface PromptAttachment {
  id: string;
  name: string;
  /** Present for a file picked here; the caller uploads it. */
  file?: File;
}

export interface PromptSubmission {
  text: string;
  attachments: PromptAttachment[];
}

const props = withDefaults(
  defineProps<{
    /** Leave empty for a prompt with no model menu. */
    providers?: ModelProvider[];
    efforts?: EffortOption[];
    placeholder?: string;
    /** Passed to the file dialog, as on an input's accept. */
    accept?: string;
    disabled?: boolean;
  }>(),
  { providers: () => [], placeholder: 'Ask the agent...' },
);

const emit = defineEmits<{ submit: [submission: PromptSubmission] }>();

const text = defineModel<string>({ default: '' });
const attachments = defineModel<PromptAttachment[]>('attachments', { default: () => [] });
const model = defineModel<string>('model', { default: '' });
const effort = defineModel<string>('effort');

const formRef = ref<HTMLFormElement | null>(null);
const canSend = computed(() => !props.disabled && text.value.trim().length > 0);

function onSubmit() {
  if (!canSend.value) return;
  emit('submit', { text: text.value, attachments: attachments.value });
  text.value = '';
  attachments.value = [];
}

// `reset` clears the dialog's input on open, so the same file can be picked again.
const fileDialog = useFileDialog({ multiple: true, reset: true });

fileDialog.onChange((selected) => {
  if (!selected) return;
  attachments.value = [...attachments.value, ...Array.from(selected, (file) => ({ id: crypto.randomUUID(), name: file.name, file }))];
});

function removeAttachment(id: string) {
  attachments.value = attachments.value.filter((item) => item.id !== id);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    formRef.value?.requestSubmit();
  }
}
</script>

<template>
  <form ref="formRef" @submit.prevent="onSubmit">
    <DarkOneInputGroup :data-disabled="props.disabled || undefined">
      <DarkOneInputGroupAddon v-if="attachments.length > 0" align="block-start" class="flex-wrap">
        <DarkOneAttachment v-for="item in attachments" :key="item.id" size="sm">
          <DarkOneAttachmentMedia><FileTextIcon /></DarkOneAttachmentMedia>
          <DarkOneAttachmentContent>
            <DarkOneAttachmentTitle>{{ item.name }}</DarkOneAttachmentTitle>
          </DarkOneAttachmentContent>
          <DarkOneAttachmentActions>
            <DarkOneAttachmentAction :aria-label="`Remove ${item.name}`" @click="removeAttachment(item.id)"><XIcon /></DarkOneAttachmentAction>
          </DarkOneAttachmentActions>
        </DarkOneAttachment>
      </DarkOneInputGroupAddon>
      <DarkOneInputGroupTextarea v-model="text" :placeholder="props.placeholder" :disabled="props.disabled" aria-label="Message" @keydown="onKeydown" />
      <DarkOneInputGroupAddon align="block-end">
        <DarkOneInputGroupButton size="icon-sm" variant="outline" aria-label="Attach files" :disabled="props.disabled" @click="fileDialog.open({ accept: props.accept })">
          <PlusIcon />
        </DarkOneInputGroupButton>
        <DarkOneModelSelector v-if="props.providers.length" v-model="model" v-model:effort="effort" :providers="props.providers" :efforts="props.efforts" />
        <DarkOneInputGroupButton type="submit" size="icon-sm" variant="default" :class="!props.providers.length && 'ml-auto'" :disabled="!canSend" aria-label="Send">
          <ArrowUpIcon />
        </DarkOneInputGroupButton>
      </DarkOneInputGroupAddon>
    </DarkOneInputGroup>
  </form>
</template>
