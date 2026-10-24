<script setup lang="ts">
import { ref } from 'vue';
import type { EffortOption, ModelProvider } from '@/components/darkone/blocks/DarkOneModelSelector.vue';
import DarkOnePromptInput, { type PromptAttachment, type PromptSubmission } from '@/components/darkone/blocks/DarkOnePromptInput.vue';
import SpecimenRow from '../SpecimenRow.vue';

const providers: ModelProvider[] = [
  {
    name: 'Stability AI',
    models: [
      { id: 'sdxl-base-1.0', name: 'SDXL base' },
      { id: 'sdxl-refiner-1.0', name: 'SDXL refiner' },
    ],
  },
  {
    name: 'Black Forest Labs',
    models: [{ id: 'flux-dev', name: 'Flux dev' }],
  },
];
const efforts: EffortOption[] = [
  { id: 'low', name: 'Low' },
  { id: 'medium', name: 'Medium' },
  { id: 'high', name: 'High' },
];

const text = ref('');
const attachments = ref<PromptAttachment[]>([]);
const model = ref('sdxl-base-1.0');
const effort = ref('medium');
const sent = ref<PromptSubmission | null>(null);

const draft = ref('Match the lighting in the reference pose, then run the refiner at 0.3');
const draftAttachments = ref<PromptAttachment[]>([
  { id: 'pose', name: 'reference-pose.png' },
  { id: 'workflow', name: 'portrait.json' },
]);
const draftModel = ref('flux-dev');
</script>

<template>
  <SpecimenRow label="Empty">
    <div class="flex w-full max-w-lg flex-col gap-2">
      <DarkOnePromptInput
        v-model="text"
        v-model:attachments="attachments"
        v-model:model="model"
        v-model:effort="effort"
        :providers="providers"
        :efforts="efforts"
        accept="image/*,.json"
        placeholder="Ask the studio agent..."
        @submit="sent = $event" />
      <p v-if="sent" class="text-xs text-muted-foreground">Sent "{{ sent.text }}" with {{ sent.attachments.length }} attachments</p>
    </div>
  </SpecimenRow>
  <SpecimenRow label="With attachments">
    <DarkOnePromptInput v-model="draft" v-model:attachments="draftAttachments" v-model:model="draftModel" :providers="providers" class="w-full max-w-lg" />
  </SpecimenRow>
  <SpecimenRow label="No model menu">
    <DarkOnePromptInput placeholder="Rename the outputs by seed..." class="w-full max-w-lg" />
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOnePromptInput model-value="Queue four seeds at 1024 x 1024" model="sdxl-base-1.0" :providers="providers" disabled class="w-full max-w-lg" />
  </SpecimenRow>
</template>
