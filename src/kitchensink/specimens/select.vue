<script setup lang="ts">
import { ref } from 'vue';
import {
  DarkOneField,
  DarkOneSelect,
  DarkOneSelectContent,
  DarkOneSelectGroup,
  DarkOneSelectItem,
  DarkOneSelectLabel,
  DarkOneSelectSeparator,
  DarkOneSelectTrigger,
  DarkOneSelectValue,
} from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const mode = ref('balanced');
const sampler = ref('euler');
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneSelect v-model="mode">
      <DarkOneSelectTrigger class="w-48" aria-label="Mode"><DarkOneSelectValue /></DarkOneSelectTrigger>
      <DarkOneSelectContent>
        <DarkOneSelectItem value="balanced">Balanced</DarkOneSelectItem>
        <DarkOneSelectItem value="quality">Quality</DarkOneSelectItem>
        <DarkOneSelectItem value="speed">Speed</DarkOneSelectItem>
      </DarkOneSelectContent>
    </DarkOneSelect>
  </SpecimenRow>
  <SpecimenRow label="In a field, grouped">
    <DarkOneField label="Sampler" for="ks-select-sampler" class="w-56">
      <DarkOneSelect v-model="sampler">
        <DarkOneSelectTrigger id="ks-select-sampler"><DarkOneSelectValue /></DarkOneSelectTrigger>
        <DarkOneSelectContent>
          <DarkOneSelectGroup>
            <DarkOneSelectLabel>Ancestral</DarkOneSelectLabel>
            <DarkOneSelectItem value="euler">Euler a</DarkOneSelectItem>
            <DarkOneSelectItem value="dpm">DPM++ 2S a</DarkOneSelectItem>
          </DarkOneSelectGroup>
          <DarkOneSelectSeparator />
          <DarkOneSelectGroup>
            <DarkOneSelectLabel>Deterministic</DarkOneSelectLabel>
            <DarkOneSelectItem value="ddim">DDIM</DarkOneSelectItem>
          </DarkOneSelectGroup>
        </DarkOneSelectContent>
      </DarkOneSelect>
    </DarkOneField>
    <DarkOneField label="Compact" compact for="ks-select-compact" class="w-40">
      <DarkOneSelect v-model="mode">
        <DarkOneSelectTrigger id="ks-select-compact"><DarkOneSelectValue /></DarkOneSelectTrigger>
        <DarkOneSelectContent>
          <DarkOneSelectItem value="balanced">Balanced</DarkOneSelectItem>
          <DarkOneSelectItem value="quality">Quality</DarkOneSelectItem>
        </DarkOneSelectContent>
      </DarkOneSelect>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneSelect disabled model-value="balanced">
      <DarkOneSelectTrigger class="w-48" aria-label="Locked mode"><DarkOneSelectValue /></DarkOneSelectTrigger>
      <DarkOneSelectContent><DarkOneSelectItem value="balanced">Balanced</DarkOneSelectItem></DarkOneSelectContent>
    </DarkOneSelect>
  </SpecimenRow>
</template>
