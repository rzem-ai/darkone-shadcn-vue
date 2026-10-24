<script setup lang="ts">
import { ref } from 'vue';
import { Dices, Search } from '@lucide/vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import { DarkOneInputGroup, DarkOneInputGroupAddon, DarkOneInputGroupButton, DarkOneInputGroupInput, DarkOneInputGroupText, DarkOneInputGroupTextarea } from '@/components/darkone/input-group';
import SpecimenRow from '../SpecimenRow.vue';

const seed = ref('1834920571');
const prompt = ref('A lighthouse at dusk, volumetric fog, 35mm');

function reroll() {
  seed.value = String(Math.floor(Math.random() * 4294967295));
}
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneInputGroup class="max-w-xs">
      <DarkOneInputGroupAddon><Search /></DarkOneInputGroupAddon>
      <DarkOneInputGroupInput placeholder="Search LoRAs" aria-label="Search LoRAs" />
    </DarkOneInputGroup>
  </SpecimenRow>
  <SpecimenRow label="With a button">
    <DarkOneInputGroup class="max-w-xs">
      <DarkOneInputGroupInput v-model="seed" class="font-mono text-xs md:text-xs" aria-label="Seed" />
      <DarkOneInputGroupAddon align="inline-end">
        <DarkOneInputGroupButton size="icon-xs" aria-label="Random seed" @click="reroll"><Dices /></DarkOneInputGroupButton>
      </DarkOneInputGroupAddon>
    </DarkOneInputGroup>
  </SpecimenRow>
  <SpecimenRow label="In a field">
    <DarkOneField label="CFG scale" for="ks-input-group-cfg" class="w-48">
      <DarkOneInputGroup>
        <DarkOneInputGroupInput id="ks-input-group-cfg" model-value="7.5" />
        <DarkOneInputGroupAddon align="inline-end"><DarkOneInputGroupText>× guidance</DarkOneInputGroupText></DarkOneInputGroupAddon>
      </DarkOneInputGroup>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Textarea, footer">
    <DarkOneInputGroup class="max-w-md">
      <DarkOneInputGroupTextarea v-model="prompt" rows="3" aria-label="Prompt" />
      <DarkOneInputGroupAddon align="block-end">
        <DarkOneInputGroupText class="font-mono text-xs">{{ prompt.length }} / 400</DarkOneInputGroupText>
        <DarkOneInputGroupButton size="xs" class="ml-auto">Enhance</DarkOneInputGroupButton>
      </DarkOneInputGroupAddon>
    </DarkOneInputGroup>
  </SpecimenRow>
  <SpecimenRow label="Invalid">
    <DarkOneInputGroup class="max-w-xs">
      <DarkOneInputGroupAddon><DarkOneInputGroupText>px</DarkOneInputGroupText></DarkOneInputGroupAddon>
      <DarkOneInputGroupInput model-value="1023" aria-label="Width" aria-invalid="true" />
    </DarkOneInputGroup>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneInputGroup class="max-w-xs" data-disabled="true">
      <DarkOneInputGroupAddon><Search /></DarkOneInputGroupAddon>
      <DarkOneInputGroupInput placeholder="Index rebuilding" aria-label="Search checkpoints" disabled />
    </DarkOneInputGroup>
  </SpecimenRow>
</template>
