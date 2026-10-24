<script setup lang="ts">
import { ref } from 'vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import DarkOneTextarea from '@/components/darkone/DarkOneTextarea.vue';
import SpecimenRow from '../SpecimenRow.vue';

const prompt = ref('Soft window light, a quiet room.');
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneTextarea v-model="prompt" class="max-w-md" aria-label="Prompt" />
  </SpecimenRow>
  <SpecimenRow label="In a field">
    <DarkOneField label="Prompt" for="ks-textarea" help="The well grows with the text." class="w-full max-w-md">
      <template #default="{ helpId }">
        <DarkOneTextarea id="ks-textarea" v-model="prompt" :aria-describedby="helpId" />
      </template>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneTextarea class="max-w-md" aria-label="Locked" disabled model-value="Not editable" />
  </SpecimenRow>
</template>
