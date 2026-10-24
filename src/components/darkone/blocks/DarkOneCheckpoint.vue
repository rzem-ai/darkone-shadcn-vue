<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneMarker, DarkOneMarkerContent } from '@/components/darkone/marker';
import { DarkOneMessage, DarkOneMessageContent } from '@/components/darkone/message';

// A checkpoint is data on the agent's turn, so the thread and its restore points are one list.
export interface CheckpointMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  checkpoint?: { label: string };
}

const props = defineProps<{ messages: CheckpointMessage[] }>();
const emit = defineEmits<{ restore: [messageId: string] }>();
</script>

<template>
  <div class="flex w-full flex-col gap-4 text-sm">
    <template v-for="(message, index) in props.messages" :key="message.id">
      <DarkOneMessage v-if="message.role === 'user'" align="end">
        <DarkOneMessageContent>
          <DarkOneBubble align="end" variant="muted">
            <DarkOneBubbleContent>{{ message.text }}</DarkOneBubbleContent>
          </DarkOneBubble>
        </DarkOneMessageContent>
      </DarkOneMessage>
      <DarkOneMessage v-else>
        <DarkOneMessageContent>
          <p>{{ message.text }}</p>
        </DarkOneMessageContent>
      </DarkOneMessage>
      <DarkOneMarker v-if="message.checkpoint" variant="separator">
        <DarkOneMarkerContent class="inline-flex items-center gap-2">
          {{ message.checkpoint.label }}
          <!-- The latest checkpoint is where the thread already is, so it has nothing to restore. -->
          <DarkOneButton
            v-if="index < props.messages.length - 1"
            size="xs"
            :aria-label="`Restore to ${message.checkpoint.label}`"
            @click="emit('restore', message.id)">
            Restore
          </DarkOneButton>
        </DarkOneMarkerContent>
      </DarkOneMarker>
    </template>
  </div>
</template>
