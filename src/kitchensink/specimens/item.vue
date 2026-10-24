<script setup lang="ts">
import { BoxIcon, ChevronRightIcon, LayersIcon } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import {
  DarkOneItem,
  DarkOneItemActions,
  DarkOneItemContent,
  DarkOneItemDescription,
  DarkOneItemGroup,
  DarkOneItemMedia,
  DarkOneItemSeparator,
  DarkOneItemTitle,
} from '@/components/darkone/item';
import SpecimenRow from '../SpecimenRow.vue';

const loras = [
  { name: 'film-grain-v2', weight: '0.6' },
  { name: 'soft-rim-light', weight: '0.4' },
  { name: 'ink-wash', weight: '0.8' },
];
</script>

<template>
  <SpecimenRow label="Outline, with actions">
    <DarkOneItem variant="outline" class="max-w-md">
      <DarkOneItemMedia variant="icon">
        <BoxIcon />
      </DarkOneItemMedia>
      <DarkOneItemContent>
        <DarkOneItemTitle>SDXL base 1.0</DarkOneItemTitle>
        <DarkOneItemDescription>6.9 GB, 1024 pixels. Last used yesterday.</DarkOneItemDescription>
      </DarkOneItemContent>
      <DarkOneItemActions>
        <DarkOneButton>Load</DarkOneButton>
      </DarkOneItemActions>
    </DarkOneItem>
  </SpecimenRow>
  <SpecimenRow label="Muted, small">
    <DarkOneItem variant="muted" size="sm" class="max-w-md">
      <DarkOneItemContent>
        <DarkOneItemTitle>Sampler</DarkOneItemTitle>
      </DarkOneItemContent>
      <DarkOneItemContent class="font-mono text-xs text-muted-foreground">euler_ancestral, 28 steps</DarkOneItemContent>
    </DarkOneItem>
  </SpecimenRow>
  <SpecimenRow label="As a link">
    <DarkOneItem variant="outline" size="sm" as-child class="max-w-md">
      <a href="#darkone-item">
        <DarkOneItemMedia>
          <LayersIcon class="size-4" />
        </DarkOneItemMedia>
        <DarkOneItemContent>
          <DarkOneItemTitle>Workflow: portrait, two pass</DarkOneItemTitle>
        </DarkOneItemContent>
        <DarkOneItemActions>
          <ChevronRightIcon class="size-4" />
        </DarkOneItemActions>
      </a>
    </DarkOneItem>
  </SpecimenRow>
  <SpecimenRow label="Group, active LoRAs">
    <DarkOneItemGroup class="w-full max-w-md rounded-(--darkone-radius) border">
      <template v-for="(lora, index) in loras" :key="lora.name">
        <DarkOneItemSeparator v-if="index > 0" />
        <DarkOneItem size="sm">
          <DarkOneItemContent>
            <DarkOneItemTitle class="font-mono text-xs">{{ lora.name }}</DarkOneItemTitle>
          </DarkOneItemContent>
          <DarkOneItemContent class="text-xs text-muted-foreground tabular-nums">{{ lora.weight }}</DarkOneItemContent>
        </DarkOneItem>
      </template>
    </DarkOneItemGroup>
  </SpecimenRow>
</template>
