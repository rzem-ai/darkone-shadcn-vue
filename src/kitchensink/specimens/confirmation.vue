<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneConfirmation, { type ConfirmationMessage, type ConfirmationTextPart, type ConfirmationToolPart } from '@/components/darkone/blocks/DarkOneConfirmation.vue';
import SpecimenRow from '../SpecimenRow.vue';

const QUESTION = 'Clear the output folder before the next batch.';
const REASONING = 'The renders live in output/portrait. Deleting them cannot be undone, and the gallery only keeps thumbnails, so I should ask first.';
const COMMAND = 'rm -rf output/portrait';

function thread(state: ConfirmationToolPart['state'], approved?: boolean, reply?: string): ConfirmationMessage[] {
  const parts: ConfirmationMessage['parts'] = [
    { type: 'reasoning', text: REASONING, state: 'done' },
    { type: 'tool-runCommand', toolCallId: 'call-1', state, input: { command: COMMAND }, approval: { id: 'approval-1', approved } },
  ];
  if (reply) parts.push({ type: 'text', text: reply });
  return [
    { id: 'user', role: 'user', parts: [{ type: 'text', text: QUESTION }] },
    { id: 'assistant', role: 'assistant', parts },
  ];
}

const messages = ref<ConfirmationMessage[]>(thread('approval-requested'));
const busy = ref(false);
const timers = new Set<ReturnType<typeof setTimeout>>();

function later(ms: number, run: () => void) {
  const timer = setTimeout(() => {
    timers.delete(timer);
    run();
  }, ms);
  timers.add(timer);
}

function cancel() {
  for (const timer of timers) clearTimeout(timer);
  timers.clear();
  busy.value = false;
}

onBeforeUnmount(cancel);

// Answers the approval, then continues the turn with a streamed reply.
function respond(part: ConfirmationToolPart, approved: boolean) {
  const message = messages.value.at(-1)!;
  const tool = message.parts.find((candidate): candidate is ConfirmationToolPart => candidate.type === 'tool-runCommand' && candidate.toolCallId === part.toolCallId)!;
  tool.state = 'approval-responded';
  tool.approval.approved = approved;
  busy.value = true;

  later(600, () => {
    tool.state = approved ? 'output-available' : 'output-denied';
    message.parts.push({ type: 'text', text: '' });
    const text = message.parts.at(-1) as ConfirmationTextPart;
    const words = (approved ? 'Cleared output/portrait. The next batch starts from an empty folder.' : 'Okay, I left output/portrait in place.').match(/\S+\s*/g) ?? [];
    const step = () => {
      text.text += words.shift() ?? '';
      if (words.length) later(20, step);
      else busy.value = false;
    };
    step();
  });
}

function reset() {
  cancel();
  messages.value = thread('approval-requested');
}

const approved = thread('output-available', true, 'Cleared output/portrait. The next batch starts from an empty folder.');
const denied = thread('output-denied', false, 'Okay, I left output/portrait in place.');
const running = thread('approval-responded', true);
</script>

<template>
  <SpecimenRow label="Awaiting approval">
    <div class="flex w-full max-w-sm flex-col gap-4">
      <DarkOneConfirmation :messages="messages" @approve="respond($event, true)" @deny="respond($event, false)" />
      <DarkOneButton v-if="!busy && messages[1]?.parts.length === 3" class="self-start" @click="reset">Reset</DarkOneButton>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Approved">
    <div class="w-full max-w-sm">
      <DarkOneConfirmation :messages="approved" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Denied">
    <div class="w-full max-w-sm">
      <DarkOneConfirmation :messages="denied" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Running, after approval">
    <div class="w-full max-w-sm">
      <DarkOneConfirmation :messages="running" />
    </div>
  </SpecimenRow>
</template>
