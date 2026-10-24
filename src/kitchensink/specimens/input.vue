<script setup lang="ts">
import { ref } from 'vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import SpecimenRow from '../SpecimenRow.vue';

const name = ref('Portrait study');
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneInput v-model="name" class="max-w-xs" aria-label="Name" />
    <span class="font-mono text-xs text-muted-foreground">{{ name }}</span>
  </SpecimenRow>
  <SpecimenRow label="Placeholder">
    <DarkOneInput class="max-w-xs" placeholder="Search models" aria-label="Search models" />
  </SpecimenRow>
  <SpecimenRow label="In a field">
    <DarkOneField label="Name" for="ks-input-name" class="w-full max-w-xs">
      <DarkOneInput id="ks-input-name" v-model="name" />
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Invalid">
    <DarkOneInput class="max-w-xs" aria-label="Seed" aria-invalid="true" model-value="not a number" />
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneInput class="max-w-xs" aria-label="Locked" disabled model-value="Locked" />
  </SpecimenRow>
</template>
