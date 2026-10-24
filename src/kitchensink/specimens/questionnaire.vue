<script setup lang="ts">
import { ref } from 'vue';
import {
  DarkOneQuestionnaire,
  DarkOneQuestionnaireActions,
  DarkOneQuestionnaireChoice,
  DarkOneQuestionnaireChoiceDescription,
  DarkOneQuestionnaireChoices,
  DarkOneQuestionnaireDescription,
  DarkOneQuestionnaireError,
  DarkOneQuestionnaireInput,
  DarkOneQuestionnaireItem,
  DarkOneQuestionnaireNext,
  DarkOneQuestionnairePrevious,
  DarkOneQuestionnaireProgress,
  DarkOneQuestionnaireSkip,
  DarkOneQuestionnaireSubmit,
  DarkOneQuestionnaireTitle,
  type QuestionnaireItemDefinition,
} from '@/components/darkone/questionnaire';
import SpecimenRow from '../SpecimenRow.vue';

const items: QuestionnaireItemDefinition[] = [
  { name: 'model', required: true, choices: [{ value: 'sdxl' }, { value: 'sdxl-refiner' }, { value: 'flux' }] },
  { name: 'vary', choices: [{ value: 'seed' }, { value: 'cfg' }, { value: 'sampler' }, { value: 'lora' }] },
  { name: 'when', required: true, choices: [{ value: 'now' }, { value: 'idle' }] },
];
const saved = ref('');

function submit(event: Event) {
  event.preventDefault();
  const answers = new FormData(event.target as HTMLFormElement);
  saved.value = `Model ${answers.get('model')}, varying ${answers.getAll('vary').join(', ') || 'nothing'}, queued ${answers.get('when')}.`;
}
</script>

<template>
  <SpecimenRow label="Stepped, with shortcuts">
    <div class="flex w-full max-w-md flex-col gap-3">
      <DarkOneQuestionnaire default-item="model" :items="items" shortcuts="letters" @submit="submit">
        <DarkOneQuestionnaireProgress />
        <DarkOneQuestionnaireItem name="model" required>
          <DarkOneQuestionnaireTitle>Which model should the batch use?</DarkOneQuestionnaireTitle>
          <DarkOneQuestionnaireDescription>Pick one, or name a checkpoint.</DarkOneQuestionnaireDescription>
          <DarkOneQuestionnaireChoices>
            <DarkOneQuestionnaireChoice value="sdxl">
              SDXL base
              <DarkOneQuestionnaireChoiceDescription>General purpose, 1024 pixels.</DarkOneQuestionnaireChoiceDescription>
            </DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireChoice value="sdxl-refiner">
              SDXL with the refiner
              <DarkOneQuestionnaireChoiceDescription>Finer detail, about 30% slower.</DarkOneQuestionnaireChoiceDescription>
            </DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireChoice value="flux">
              Flux dev
              <DarkOneQuestionnaireChoiceDescription>Better text in images, 12 GB of VRAM.</DarkOneQuestionnaireChoiceDescription>
            </DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireInput aria-label="Another checkpoint" placeholder="Another checkpoint" />
          </DarkOneQuestionnaireChoices>
          <DarkOneQuestionnaireError />
        </DarkOneQuestionnaireItem>
        <DarkOneQuestionnaireItem name="vary" multiple>
          <DarkOneQuestionnaireTitle>What should vary across renders?</DarkOneQuestionnaireTitle>
          <DarkOneQuestionnaireDescription>Choose any, or skip to vary only the seed.</DarkOneQuestionnaireDescription>
          <DarkOneQuestionnaireChoices>
            <DarkOneQuestionnaireChoice value="seed">Seed</DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireChoice value="cfg">CFG scale</DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireChoice value="sampler">Sampler</DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireChoice value="lora">LoRA weight</DarkOneQuestionnaireChoice>
          </DarkOneQuestionnaireChoices>
        </DarkOneQuestionnaireItem>
        <DarkOneQuestionnaireItem name="when" required>
          <DarkOneQuestionnaireTitle>When should it run?</DarkOneQuestionnaireTitle>
          <DarkOneQuestionnaireChoices>
            <DarkOneQuestionnaireChoice value="now">Queue now</DarkOneQuestionnaireChoice>
            <DarkOneQuestionnaireChoice value="idle">When the GPU is idle</DarkOneQuestionnaireChoice>
          </DarkOneQuestionnaireChoices>
          <DarkOneQuestionnaireError />
        </DarkOneQuestionnaireItem>
        <DarkOneQuestionnaireActions>
          <DarkOneQuestionnairePrevious />
          <DarkOneQuestionnaireSkip />
          <DarkOneQuestionnaireNext />
          <DarkOneQuestionnaireSubmit>Queue batch</DarkOneQuestionnaireSubmit>
        </DarkOneQuestionnaireActions>
      </DarkOneQuestionnaire>
      <p v-if="saved" class="text-xs text-muted-foreground" role="status">{{ saved }}</p>
    </div>
  </SpecimenRow>
</template>
