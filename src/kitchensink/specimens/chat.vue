<script setup lang="ts">
import { FileJsonIcon, ImageIcon, LayersIcon } from '@lucide/vue';
import { computed, onBeforeUnmount, ref } from 'vue';
import DarkOneChat, { type ChatContextOption, type ChatPart, type ChatStatus, type ChatTurn } from '@/components/darkone/blocks/DarkOneChat.vue';
import SpecimenRow from '../SpecimenRow.vue';

type Step = { type: 'reasoning'; text: string } | { type: 'sleep'; ms: number } | { type: 'tool'; command: string; ms: number; stdout: string } | { type: 'text'; text: string };

const script: { user: string; steps: Step[] }[] = [
  {
    user: 'Render workflows/portrait.json at 1024 on SDXL.',
    steps: [
      { type: 'reasoning', text: 'The portrait workflow was built for 768. I should check the latent size before I queue it, or SDXL will render at the wrong resolution.' },
      { type: 'sleep', ms: 400 },
      { type: 'tool', command: 'comfy inspect workflows/portrait.json --node EmptyLatentImage', ms: 800, stdout: 'EmptyLatentImage  width=768  height=768  batch_size=1' },
      { type: 'sleep', ms: 400 },
      {
        type: 'text',
        text: 'The latent was 768 square, so I set it to 1024 and queued run 7c2f.\n\n- Sampler: DPM++ 2M Karras, 30 steps, CFG 6.5\n- Seed: 1834920571\n- LoRA: film-grain at 0.6',
      },
    ],
  },
  {
    user: 'Try four seeds and keep the sharpest.',
    steps: [
      { type: 'tool', command: 'comfy queue workflows/portrait.json --seeds 1834920571..1834920574', ms: 1400, stdout: 'queued 4 jobs\n✓ 1834920571  12.4s\n✓ 1834920572  12.1s\n✓ 1834920573  12.6s\n✓ 1834920574  12.2s' },
      { type: 'sleep', ms: 400 },
      { type: 'text', text: 'Seed 1834920573 is the sharpest: the refiner held the eyelashes the other three smeared. I starred it in the gallery.' },
    ],
  },
  {
    user: 'Drop the film-grain LoRA and render that seed again.',
    steps: [
      { type: 'reasoning', text: 'Removing the LoRA node leaves the sampler wired to the base model directly. Same seed and sampler, so the only difference is the grain.' },
      { type: 'sleep', ms: 400 },
      { type: 'tool', command: 'comfy queue workflows/portrait.json --seed 1834920573 --bypass LoraLoader', ms: 900, stdout: 'queued 1 job\n✓ 1834920573  11.8s' },
      { type: 'sleep', ms: 400 },
      { type: 'text', text: 'Rendered without the LoRA as run 7c31. The skin reads cleaner, but the background banding is back. Both versions are side by side in the gallery.' },
    ],
  },
];
const fallback = 'This specimen only knows the scripted turns. Press reset to start over.';

const contextOptions: ChatContextOption[] = [
  { value: 'image', label: 'Reference image', icon: ImageIcon },
  { value: 'workflow', label: 'Workflow file', icon: FileJsonIcon },
  { value: 'lora', label: 'LoRA', icon: LayersIcon },
];

const messages = ref<ChatTurn[]>([]);
const status = ref<ChatStatus>('ready');
const sent = computed(() => messages.value.filter((message) => message.role === 'user').length);

// Reset and unmount bump `run`, so a running script stops at its next wait.
let run = 0;
const timers = new Set<ReturnType<typeof setTimeout>>();

function sleep(ms: number, id: number) {
  return new Promise<boolean>((resolve) => {
    const timer = setTimeout(() => {
      timers.delete(timer);
      resolve(id === run);
    }, ms);
    timers.add(timer);
  });
}

function cancel() {
  run++;
  for (const timer of timers) clearTimeout(timer);
  timers.clear();
}

onBeforeUnmount(cancel);

async function stream(value: string, write: (text: string) => void, id: number) {
  for (let cursor = 0; cursor < value.length; ) {
    cursor = Math.min(value.length, cursor + 3);
    write(value.slice(0, cursor));
    if (!(await sleep(16, id))) return false;
  }
  return true;
}

async function respond(steps: Step[]) {
  const id = run;
  status.value = 'submitted';
  if (!(await sleep(600, id))) return;

  messages.value.push({ id: `assistant-${Date.now()}`, role: 'assistant', parts: [] });
  const message = messages.value.at(-1)!;
  status.value = 'streaming';

  for (const step of steps) {
    if (step.type === 'sleep') {
      if (!(await sleep(step.ms, id))) return;
    } else if (step.type === 'reasoning') {
      message.parts.push({ type: 'reasoning', text: '', state: 'streaming' });
      const part = message.parts.at(-1) as Extract<ChatPart, { type: 'reasoning' }>;
      if (!(await stream(step.text, (value) => (part.text = value), id))) return;
      part.state = 'done';
    } else if (step.type === 'tool') {
      message.parts.push({ type: 'tool-runCommand', state: 'input-available', input: { command: step.command } });
      const part = message.parts.at(-1) as Extract<ChatPart, { type: 'tool-runCommand' }>;
      if (!(await sleep(step.ms, id))) return;
      part.output = { stdout: step.stdout };
      part.state = 'output-available';
    } else {
      message.parts.push({ type: 'text', text: '' });
      const part = message.parts.at(-1) as Extract<ChatPart, { type: 'text' }>;
      if (!(await stream(step.text, (value) => (part.text = value), id))) return;
    }
  }
  status.value = 'ready';
}

function send(text: string) {
  const turn = script[sent.value];
  messages.value.push({ id: `user-${Date.now()}`, role: 'user', parts: [{ type: 'text', text }] });
  respond(turn && turn.user === text ? turn.steps : [{ type: 'text', text: fallback }]);
}

function reset() {
  cancel();
  messages.value = [];
  status.value = 'ready';
}

const finished: ChatTurn[] = [
  { id: 'f1', role: 'user', parts: [{ type: 'text', text: 'Upscale run 7c2f to 4x.' }] },
  {
    id: 'f2',
    role: 'assistant',
    parts: [
      { type: 'reasoning', text: 'The 4x-UltraSharp model is the one the gallery workflows use. I will try it first.', state: 'done' },
      {
        type: 'tool-runCommand',
        state: 'output-error',
        input: { command: 'comfy queue workflows/upscale.json --model 4x-UltraSharp' },
        errorText: 'error: model not found: models/upscale_models/4x-UltraSharp.pth',
      },
      { type: 'tool-runCommand', state: 'output-available', input: { command: 'comfy queue workflows/upscale.json --model RealESRGAN_x4plus' }, output: { stdout: 'queued 1 job\n✓ 7c2f-upscaled  4096x4096  38.2s' } },
      { type: 'text', text: '4x-UltraSharp is not installed, so I upscaled with RealESRGAN x4plus instead. The 4096 render is in the gallery as 7c2f-upscaled.' },
    ],
  },
];
</script>

<template>
  <SpecimenRow label="Scripted, streams replies">
    <div class="h-[32rem] w-full max-w-xl border border-darkone-field-border">
      <DarkOneChat
        :messages="messages"
        :status="status"
        :prompt="script[sent]?.user"
        title="New render"
        description="Ask the studio agent to queue, inspect or change a workflow."
        empty-title="What should we render?"
        empty-description="The agent can read workflow files, queue renders on SDXL and compare seeds. Press send to start."
        placeholder="Ask the studio agent..."
        :context-options="contextOptions"
        @send="send"
        @reset="reset" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="A failed command, then a fallback">
    <div class="h-[28rem] w-full max-w-xl border border-darkone-field-border">
      <DarkOneChat :messages="finished" title="Upscale 7c2f" description="Ask the studio agent to queue, inspect or change a workflow." placeholder="Ask the studio agent..." />
    </div>
  </SpecimenRow>
</template>
