<script setup lang="ts">
import { DarkOneCarousel, DarkOneCarouselContent, DarkOneCarouselItem, DarkOneCarouselNext, DarkOneCarouselPrevious } from '@/components/darkone/carousel';
import SpecimenRow from '../SpecimenRow.vue';

const seeds = [1184, 1185, 1186, 1187, 1188, 1189];
</script>

<template>
  <SpecimenRow label="One a view">
    <DarkOneCarousel class="mx-12 w-48">
      <DarkOneCarouselContent>
        <DarkOneCarouselItem v-for="seed in seeds" :key="seed">
          <div class="flex aspect-square items-end border border-darkone-field-border bg-darkone-field p-2 font-mono text-xs text-muted-foreground">seed {{ seed }}</div>
        </DarkOneCarouselItem>
      </DarkOneCarouselContent>
      <DarkOneCarouselPrevious />
      <DarkOneCarouselNext />
    </DarkOneCarousel>
  </SpecimenRow>
  <SpecimenRow label="Three a view">
    <DarkOneCarousel :opts="{ align: 'start' }" class="mx-12 w-80">
      <DarkOneCarouselContent class="-ml-2">
        <DarkOneCarouselItem v-for="seed in seeds" :key="seed" class="basis-1/3 pl-2">
          <div class="flex aspect-[2/3] items-end border border-darkone-field-border bg-darkone-field p-1.5 font-mono text-xs text-muted-foreground">{{ seed }}</div>
        </DarkOneCarouselItem>
      </DarkOneCarouselContent>
      <DarkOneCarouselPrevious />
      <DarkOneCarouselNext />
    </DarkOneCarousel>
  </SpecimenRow>
  <SpecimenRow label="Vertical">
    <DarkOneCarousel orientation="vertical" :opts="{ align: 'start' }" class="my-12 w-48">
      <DarkOneCarouselContent class="-mt-2 h-40">
        <DarkOneCarouselItem v-for="seed in seeds" :key="seed" class="basis-1/2 pt-2">
          <div class="flex h-full items-center border border-darkone-field-border bg-darkone-field px-2 font-mono text-xs text-muted-foreground">seed {{ seed }}</div>
        </DarkOneCarouselItem>
      </DarkOneCarouselContent>
      <DarkOneCarouselPrevious />
      <DarkOneCarouselNext />
    </DarkOneCarousel>
  </SpecimenRow>
</template>
