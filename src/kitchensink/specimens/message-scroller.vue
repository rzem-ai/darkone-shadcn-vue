<script setup lang="ts">
import { ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneMessage, DarkOneMessageContent } from '@/components/darkone/message';
import {
  DarkOneMessageScroller,
  DarkOneMessageScrollerButton,
  DarkOneMessageScrollerContent,
  DarkOneMessageScrollerItem,
  DarkOneMessageScrollerProvider,
  DarkOneMessageScrollerViewport,
} from '@/components/darkone/message-scroller';
import SpecimenRow from '../SpecimenRow.vue';

interface Turn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const turns = ref<Turn[]>([
  { id: 't1', role: 'user', text: 'Load workflows/portrait.json.' },
  { id: 't2', role: 'assistant', text: 'Loaded. 14 nodes: SDXL base, the refiner, two LoRAs and a 4x upscale.' },
  { id: 't3', role: 'user', text: 'Render four seeds from 1024.' },
  { id: 't4', role: 'assistant', text: 'Queued seeds 1024 to 1027 as run 4e1a, 28 steps with Euler a.' },
  { id: 't5', role: 'user', text: 'Which one came out sharpest?' },
  { id: 't6', role: 'assistant', text: 'Seed 1026. The refiner caught the hair detail the others smeared.' },
]);
let seed = 1028;

function queue() {
  turns.value.push(
    { id: `u${seed}`, role: 'user', text: `Render seed ${seed} at CFG 7.` },
    { id: `a${seed}`, role: 'assistant', text: `Queued seed ${seed}. It will land in the gallery in about 40s.` },
  );
  seed += 1;
}
</script>

<template>
  <SpecimenRow label="Bounded, follows new turns">
    <div class="flex w-full max-w-md flex-col gap-2">
      <DarkOneMessageScrollerProvider auto-scroll>
        <div class="h-64 border border-darkone-field-border">
          <DarkOneMessageScroller>
            <DarkOneMessageScrollerViewport>
              <DarkOneMessageScrollerContent class="p-3">
                <DarkOneMessageScrollerItem v-for="turn in turns" :key="turn.id" :message-id="turn.id" :scroll-anchor="turn.role === 'user'">
                  <DarkOneMessage :align="turn.role === 'user' ? 'end' : 'start'">
                    <DarkOneMessageContent>
                      <DarkOneBubble :variant="turn.role === 'user' ? 'default' : 'muted'"><DarkOneBubbleContent>{{ turn.text }}</DarkOneBubbleContent></DarkOneBubble>
                    </DarkOneMessageContent>
                  </DarkOneMessage>
                </DarkOneMessageScrollerItem>
              </DarkOneMessageScrollerContent>
            </DarkOneMessageScrollerViewport>
            <DarkOneMessageScrollerButton />
          </DarkOneMessageScroller>
        </div>
      </DarkOneMessageScrollerProvider>
      <DarkOneButton class="self-start" @click="queue">Queue another seed</DarkOneButton>
    </div>
  </SpecimenRow>
</template>
