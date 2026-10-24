<script setup lang="ts">
import { ref } from 'vue';
import DarkOneChatMessage, { type ChatMessageFeedback } from '@/components/darkone/blocks/DarkOneChatMessage.vue';
import SpecimenRow from '../SpecimenRow.vue';

const reply = `Lower the CFG to 5 and add a FreeU node after the checkpoint loader.

  comfy queue workflows/portrait.json --cfg 5 --insert FreeU_V2

At CFG 7 SDXL overcooks skin into wax. FreeU brings back the texture the lower CFG gives up, and the seed stays 1834920571, so you can compare the two side by side.`;

const feedback = ref<ChatMessageFeedback>(null);
const retries = ref(0);
const editing = ref(false);
</script>

<template>
  <SpecimenRow label="User, copy and edit">
    <div class="flex w-full max-w-md flex-col gap-2 text-sm">
      <DarkOneChatMessage role="user" text="Why do my SDXL portraits look waxy? It's worse above CFG 7." @edit="editing = true" />
      <p v-if="editing" class="text-xs text-muted-foreground">Edit requested</p>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Agent, feedback and retry">
    <div class="flex w-full max-w-md flex-col gap-2 text-sm">
      <DarkOneChatMessage v-model:feedback="feedback" role="assistant" :text="reply" @retry="retries++" />
      <p class="text-xs text-muted-foreground">Feedback: {{ feedback ?? 'none' }}, retries: {{ retries }}</p>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Rated">
    <div class="w-full max-w-md text-sm">
      <DarkOneChatMessage role="assistant" text="Queued seeds 1024 to 1027 as run 4e1a, 28 steps with Euler a." feedback="like" />
    </div>
  </SpecimenRow>
</template>
