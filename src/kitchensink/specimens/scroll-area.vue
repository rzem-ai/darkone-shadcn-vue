<script setup lang="ts">
import { DarkOneScrollArea, DarkOneScrollBar } from '@/components/darkone/scroll-area';
import SpecimenRow from '../SpecimenRow.vue';

const runs = Array.from({ length: 40 }, (_, index) => ({ id: `run-${String(412 - index).padStart(4, '0')}`, seed: 1184 + index * 37 }));
const variants = Array.from({ length: 12 }, (_, index) => 1184 + index);
</script>

<template>
  <SpecimenRow label="Vertical">
    <DarkOneScrollArea class="h-48 w-64 border">
      <div class="flex flex-col">
        <div v-for="run in runs" :key="run.id" class="flex h-(--darkone-row-height) items-center justify-between border-b px-2 font-mono text-xs last:border-b-0">
          <span>{{ run.id }}</span>
          <span class="text-muted-foreground">{{ run.seed }}</span>
        </div>
      </div>
    </DarkOneScrollArea>
  </SpecimenRow>
  <SpecimenRow label="Horizontal">
    <DarkOneScrollArea class="w-96 max-w-full border whitespace-nowrap">
      <div class="flex w-max gap-2 p-2">
        <div v-for="seed in variants" :key="seed" class="flex size-24 shrink-0 items-end border border-darkone-field-border bg-darkone-field p-1.5 font-mono text-xs text-muted-foreground">{{ seed }}</div>
      </div>
      <DarkOneScrollBar orientation="horizontal" />
    </DarkOneScrollArea>
  </SpecimenRow>
</template>
