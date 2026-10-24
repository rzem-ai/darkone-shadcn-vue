<script setup lang="ts">
import { ref } from 'vue';
import DarkOneSuggestion, { type SuggestionTurn } from '@/components/darkone/blocks/DarkOneSuggestion.vue';
import SpecimenRow from '../SpecimenRow.vue';

const replies: Record<string, string> = {
  'Upscale the last render': 'Upscaled run 7c2f to 4096 with RealESRGAN x4plus. It is in the gallery as 7c2f-upscaled.',
  'Try four more seeds': 'Queued seeds 1834920575 to 1834920578 on the same workflow. They will land in about 50s.',
  'Switch to DPM++ 2M Karras': 'Swapped the KSampler to DPM++ 2M Karras and raised the steps from 20 to 30.',
  'Add a film-grain LoRA': 'Added a LoraLoader for film-grain at 0.6 between the checkpoint and the sampler.',
  'Compare CFG 5 and 7': 'Rendered seed 1834920573 at CFG 5 and 7. At 7 the skin goes waxy; 5 keeps the texture.',
  'Export the workflow': 'Saved the graph as workflows/portrait-v3.json, with the LoRA and sampler changes.',
};
const suggestions = Object.keys(replies);

const turn = ref<SuggestionTurn | null>(null);

function send(prompt: string) {
  turn.value = { prompt, reply: replies[prompt] ?? 'This specimen only knows the suggestions. Pick one.' };
}
</script>

<template>
  <SpecimenRow label="Pick or type a prompt">
    <div class="w-full max-w-lg">
      <DarkOneSuggestion :suggestions="suggestions" :turn="turn" placeholder="Ask the studio agent..." @select="send" @send="send" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Before a pick">
    <div class="w-full max-w-lg">
      <DarkOneSuggestion :suggestions="suggestions.slice(0, 3)" placeholder="Ask the studio agent..." />
    </div>
  </SpecimenRow>
</template>
