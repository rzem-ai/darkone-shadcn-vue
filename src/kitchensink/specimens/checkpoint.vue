<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneCheckpoint, { type CheckpointMessage } from '@/components/darkone/blocks/DarkOneCheckpoint.vue';
import SpecimenRow from '../SpecimenRow.vue';

const transcript: CheckpointMessage[] = [
  { id: 'm1', role: 'user', text: 'Swap the sampler in portrait.json to DPM++ 2M Karras.' },
  { id: 'm2', role: 'assistant', text: 'Switched the KSampler from Euler a to DPM++ 2M Karras and raised the steps to 30.', checkpoint: { label: 'Sampler swapped' } },
  { id: 'm3', role: 'user', text: 'Add the film-grain LoRA at 0.6.' },
  { id: 'm4', role: 'assistant', text: 'Added a LoraLoader for film-grain at 0.6 between the checkpoint and the sampler.', checkpoint: { label: 'LoRA added' } },
  { id: 'm5', role: 'user', text: 'Render seed 1834920571.' },
  { id: 'm6', role: 'assistant', text: 'Queued seed 1834920571 as run 7c2f. It will land in the gallery in about 12s.' },
];

const messages = ref<CheckpointMessage[]>(transcript.slice(0, 4).map((message) => ({ ...message })));
const busy = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;

// The next scripted message the person can send.
const next = computed(() => {
  const message = transcript[messages.value.length];
  return message?.role === 'user' ? message : undefined;
});

function stop() {
  clearInterval(timer);
  busy.value = false;
}

onBeforeUnmount(stop);

function restore(messageId: string) {
  const index = messages.value.findIndex((message) => message.id === messageId);
  if (index === -1) return;
  stop();
  messages.value = messages.value.slice(0, index + 1);
}

// Sends the next message, then streams the scripted reply a few characters at a time.
function send(message: CheckpointMessage) {
  const reply = transcript[messages.value.length + 1];
  messages.value.push({ ...message });
  if (reply?.role !== 'assistant') return;

  messages.value.push({ ...reply, text: '' });
  const target = messages.value.at(-1)!;
  let cursor = 0;
  busy.value = true;
  timer = setInterval(() => {
    cursor = Math.min(reply.text.length, cursor + 3);
    target.text = reply.text.slice(0, cursor);
    if (cursor >= reply.text.length) stop();
  }, 20);
}

const latest: CheckpointMessage[] = transcript.slice(0, 2);
</script>

<template>
  <SpecimenRow label="Restore an earlier turn">
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4">
      <DarkOneCheckpoint :messages="messages" @restore="restore" />
      <DarkOneButton v-if="!busy && next" class="mt-auto self-start" @click="send(next)">Continue</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Latest checkpoint, nothing to restore">
    <div class="w-full max-w-sm">
      <DarkOneCheckpoint :messages="latest" />
    </div>
  </SpecimenRow>
</template>
