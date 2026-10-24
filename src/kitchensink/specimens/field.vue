<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneField, DarkOneInput } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const key = ref('sk-live-••••••••');
</script>

<template>
  <SpecimenRow label="Read-only value">
    <DarkOneField label="Backend" value="ComfyUI, local" class="w-64" />
    <DarkOneField label="Hash" value="9f2c41e7" mono class="w-40" />
  </SpecimenRow>
  <SpecimenRow label="With help">
    <DarkOneField label="API key" for="ks-field-key" help="Stored in the keychain, never in settings." class="w-72">
      <template #default="{ helpId }"><DarkOneInput id="ks-field-key" v-model="key" :aria-describedby="helpId" /></template>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Tones">
    <DarkOneField label="Positive" value="Verified" tone="positive" class="w-40" />
    <DarkOneField label="Caution" value="Expires soon" tone="caution" class="w-40" />
    <DarkOneField label="Negative" value="Rejected" tone="negative" class="w-40" />
  </SpecimenRow>
  <SpecimenRow label="Compact">
    <DarkOneField label="Steps" compact for="ks-field-steps" class="w-32"><DarkOneInput id="ks-field-steps" model-value="30" /></DarkOneField>
    <DarkOneField label="Regular" for="ks-field-cfg" class="w-32"><DarkOneInput id="ks-field-cfg" model-value="7.5" /></DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Hidden label">
    <DarkOneField label="Search" label-hidden for="ks-field-search" class="w-64"><DarkOneInput id="ks-field-search" placeholder="Label read, not drawn" /></DarkOneField>
  </SpecimenRow>
</template>
