<script setup lang="ts">
import { ref } from 'vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import { DarkOneNativeSelect, DarkOneNativeSelectOptGroup, DarkOneNativeSelectOption } from '@/components/darkone/native-select';
import SpecimenRow from '../SpecimenRow.vue';

const scheduler = ref('karras');
const sampler = ref('euler_a');
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneNativeSelect v-model="scheduler" class="w-44" aria-label="Scheduler">
      <DarkOneNativeSelectOption value="normal">Normal</DarkOneNativeSelectOption>
      <DarkOneNativeSelectOption value="karras">Karras</DarkOneNativeSelectOption>
      <DarkOneNativeSelectOption value="exponential">Exponential</DarkOneNativeSelectOption>
    </DarkOneNativeSelect>
    <span class="font-mono text-xs text-muted-foreground">{{ scheduler }}</span>
  </SpecimenRow>
  <SpecimenRow label="In a field, grouped">
    <DarkOneField label="Sampler" for="ks-native-sampler" class="w-56">
      <DarkOneNativeSelect id="ks-native-sampler" v-model="sampler">
        <DarkOneNativeSelectOptGroup label="Ancestral">
          <DarkOneNativeSelectOption value="euler_a">Euler a</DarkOneNativeSelectOption>
          <DarkOneNativeSelectOption value="dpm_2s_a">DPM++ 2S a</DarkOneNativeSelectOption>
        </DarkOneNativeSelectOptGroup>
        <DarkOneNativeSelectOptGroup label="Deterministic">
          <DarkOneNativeSelectOption value="ddim">DDIM</DarkOneNativeSelectOption>
          <DarkOneNativeSelectOption value="dpm_2m">DPM++ 2M</DarkOneNativeSelectOption>
        </DarkOneNativeSelectOptGroup>
      </DarkOneNativeSelect>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Invalid">
    <DarkOneNativeSelect model-value="" class="w-44" aria-label="VAE" aria-invalid="true">
      <DarkOneNativeSelectOption value="" disabled>Choose a VAE</DarkOneNativeSelectOption>
      <DarkOneNativeSelectOption value="sdxl_vae">sdxl_vae</DarkOneNativeSelectOption>
    </DarkOneNativeSelect>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneNativeSelect model-value="fp16" class="w-44" aria-label="Precision" disabled>
      <DarkOneNativeSelectOption value="fp16">fp16</DarkOneNativeSelectOption>
    </DarkOneNativeSelect>
  </SpecimenRow>
</template>
