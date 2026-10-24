<script setup lang="ts">
import { ref } from 'vue';
import { Box, Layers, Play, Shuffle, Sparkles } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import {
  DarkOneCommand,
  DarkOneCommandDialog,
  DarkOneCommandEmpty,
  DarkOneCommandGroup,
  DarkOneCommandInput,
  DarkOneCommandItem,
  DarkOneCommandList,
  DarkOneCommandSeparator,
  DarkOneCommandShortcut,
} from '@/components/darkone/command';
import SpecimenRow from '../SpecimenRow.vue';

const open = ref(false);
</script>

<template>
  <SpecimenRow label="Inline">
    <DarkOneCommand class="w-80 border">
      <DarkOneCommandInput placeholder="Search models and actions" />
      <DarkOneCommandList>
        <DarkOneCommandEmpty>Nothing matches.</DarkOneCommandEmpty>
        <DarkOneCommandGroup heading="Models">
          <DarkOneCommandItem value="sdxl"><Box />SDXL base 1.0</DarkOneCommandItem>
          <DarkOneCommandItem value="sd15"><Box />SD 1.5</DarkOneCommandItem>
          <DarkOneCommandItem value="film-grain"><Layers />Film grain v2</DarkOneCommandItem>
        </DarkOneCommandGroup>
        <DarkOneCommandSeparator />
        <DarkOneCommandGroup heading="Actions">
          <DarkOneCommandItem value="run"><Play />Run again<DarkOneCommandShortcut>⌘R</DarkOneCommandShortcut></DarkOneCommandItem>
          <DarkOneCommandItem value="seed"><Shuffle />New seed<DarkOneCommandShortcut>⌘S</DarkOneCommandShortcut></DarkOneCommandItem>
          <DarkOneCommandItem value="upscale" disabled><Sparkles />Upscale (refiner busy)</DarkOneCommandItem>
        </DarkOneCommandGroup>
      </DarkOneCommandList>
    </DarkOneCommand>
  </SpecimenRow>
  <SpecimenRow label="Palette">
    <DarkOneButton @click="open = true">Open palette</DarkOneButton>
    <DarkOneCommandDialog v-model:open="open" title="Studio palette" description="Search models, presets and actions.">
      <DarkOneCommandInput placeholder="Type a command" />
      <DarkOneCommandList>
        <DarkOneCommandEmpty>Nothing matches.</DarkOneCommandEmpty>
        <DarkOneCommandGroup heading="Presets">
          <DarkOneCommandItem value="portrait">Portrait, soft light</DarkOneCommandItem>
          <DarkOneCommandItem value="isometric">Isometric room</DarkOneCommandItem>
        </DarkOneCommandGroup>
        <DarkOneCommandGroup heading="Actions">
          <DarkOneCommandItem value="run" @select="open = false"><Play />Run again<DarkOneCommandShortcut>⌘R</DarkOneCommandShortcut></DarkOneCommandItem>
        </DarkOneCommandGroup>
      </DarkOneCommandList>
    </DarkOneCommandDialog>
  </SpecimenRow>
</template>
