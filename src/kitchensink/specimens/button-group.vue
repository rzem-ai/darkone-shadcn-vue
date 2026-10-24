<script setup lang="ts">
import { ref } from 'vue';
import { Minus, Plus, Redo2, Trash2, Undo2 } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneButtonGroup, DarkOneButtonGroupSeparator, DarkOneButtonGroupText } from '@/components/darkone/button-group';
import SpecimenRow from '../SpecimenRow.vue';

const batch = ref(4);
</script>

<template>
  <SpecimenRow label="Joined actions">
    <DarkOneButtonGroup aria-label="History">
      <DarkOneButton><Undo2 />Undo</DarkOneButton>
      <DarkOneButton><Redo2 />Redo</DarkOneButton>
      <DarkOneButton><Trash2 />Clear canvas</DarkOneButton>
    </DarkOneButtonGroup>
  </SpecimenRow>
  <SpecimenRow label="With text">
    <DarkOneButtonGroup aria-label="Batch size">
      <DarkOneButtonGroupText>Batch</DarkOneButtonGroupText>
      <DarkOneButton size="icon-action" aria-label="Fewer" :disabled="batch <= 1" @click="batch--"><Minus /></DarkOneButton>
      <DarkOneButtonGroupText class="min-w-8 justify-center font-mono">{{ batch }}</DarkOneButtonGroupText>
      <DarkOneButton size="icon-action" aria-label="More" :disabled="batch >= 8" @click="batch++"><Plus /></DarkOneButton>
    </DarkOneButtonGroup>
  </SpecimenRow>
  <SpecimenRow label="Split, with separator">
    <DarkOneButtonGroup aria-label="Queue">
      <DarkOneButton variant="default">Queue prompt</DarkOneButton>
      <DarkOneButtonGroupSeparator />
      <DarkOneButton variant="default">Queue 4</DarkOneButton>
    </DarkOneButtonGroup>
  </SpecimenRow>
  <SpecimenRow label="Vertical">
    <DarkOneButtonGroup orientation="vertical" aria-label="Zoom">
      <DarkOneButton>Fit</DarkOneButton>
      <DarkOneButton>100%</DarkOneButton>
      <DarkOneButton>200%</DarkOneButton>
    </DarkOneButtonGroup>
  </SpecimenRow>
  <SpecimenRow label="Nested">
    <DarkOneButtonGroup aria-label="Canvas tools">
      <DarkOneButtonGroup>
        <DarkOneButton>Txt2img</DarkOneButton>
        <DarkOneButton>Img2img</DarkOneButton>
      </DarkOneButtonGroup>
      <DarkOneButtonGroup>
        <DarkOneButton>Inpaint</DarkOneButton>
      </DarkOneButtonGroup>
    </DarkOneButtonGroup>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneButtonGroup aria-label="Export">
      <DarkOneButton disabled>PNG</DarkOneButton>
      <DarkOneButton disabled>WebP</DarkOneButton>
    </DarkOneButtonGroup>
  </SpecimenRow>
</template>
