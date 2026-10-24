<script setup lang="ts">
import { ref } from 'vue';
import {
  DarkOneMenubar,
  DarkOneMenubarCheckboxItem,
  DarkOneMenubarContent,
  DarkOneMenubarItem,
  DarkOneMenubarLabel,
  DarkOneMenubarMenu,
  DarkOneMenubarRadioGroup,
  DarkOneMenubarRadioItem,
  DarkOneMenubarSeparator,
  DarkOneMenubarShortcut,
  DarkOneMenubarSub,
  DarkOneMenubarSubContent,
  DarkOneMenubarSubTrigger,
  DarkOneMenubarTrigger,
} from '@/components/darkone/menubar';
import SpecimenRow from '../SpecimenRow.vue';

const showGrid = ref(true);
const showMetadata = ref(false);
const thumbnails = ref('medium');
</script>

<template>
  <SpecimenRow label="Studio">
    <DarkOneMenubar>
      <DarkOneMenubarMenu>
        <DarkOneMenubarTrigger>Run</DarkOneMenubarTrigger>
        <DarkOneMenubarContent>
          <DarkOneMenubarItem>New run<DarkOneMenubarShortcut>⌘N</DarkOneMenubarShortcut></DarkOneMenubarItem>
          <DarkOneMenubarItem>Run again<DarkOneMenubarShortcut>⌘R</DarkOneMenubarShortcut></DarkOneMenubarItem>
          <DarkOneMenubarSub>
            <DarkOneMenubarSubTrigger>Recent presets</DarkOneMenubarSubTrigger>
            <DarkOneMenubarSubContent>
              <DarkOneMenubarItem>Portrait, soft light</DarkOneMenubarItem>
              <DarkOneMenubarItem>Isometric room</DarkOneMenubarItem>
            </DarkOneMenubarSubContent>
          </DarkOneMenubarSub>
          <DarkOneMenubarSeparator />
          <DarkOneMenubarItem variant="destructive">Cancel queue</DarkOneMenubarItem>
        </DarkOneMenubarContent>
      </DarkOneMenubarMenu>
      <DarkOneMenubarMenu>
        <DarkOneMenubarTrigger>Model</DarkOneMenubarTrigger>
        <DarkOneMenubarContent>
          <DarkOneMenubarLabel>Checkpoint</DarkOneMenubarLabel>
          <DarkOneMenubarItem>SDXL base 1.0</DarkOneMenubarItem>
          <DarkOneMenubarItem>SD 1.5</DarkOneMenubarItem>
          <DarkOneMenubarSeparator />
          <DarkOneMenubarItem disabled>Load LoRA (none installed)</DarkOneMenubarItem>
        </DarkOneMenubarContent>
      </DarkOneMenubarMenu>
      <DarkOneMenubarMenu>
        <DarkOneMenubarTrigger>View</DarkOneMenubarTrigger>
        <DarkOneMenubarContent>
          <DarkOneMenubarCheckboxItem v-model="showGrid">Grid</DarkOneMenubarCheckboxItem>
          <DarkOneMenubarCheckboxItem v-model="showMetadata">Metadata</DarkOneMenubarCheckboxItem>
          <DarkOneMenubarSeparator />
          <DarkOneMenubarLabel>Thumbnails</DarkOneMenubarLabel>
          <DarkOneMenubarRadioGroup v-model="thumbnails">
            <DarkOneMenubarRadioItem value="small">Small</DarkOneMenubarRadioItem>
            <DarkOneMenubarRadioItem value="medium">Medium</DarkOneMenubarRadioItem>
            <DarkOneMenubarRadioItem value="large">Large</DarkOneMenubarRadioItem>
          </DarkOneMenubarRadioGroup>
        </DarkOneMenubarContent>
      </DarkOneMenubarMenu>
    </DarkOneMenubar>
  </SpecimenRow>
</template>
