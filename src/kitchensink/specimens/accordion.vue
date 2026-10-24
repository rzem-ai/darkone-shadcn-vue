<script setup lang="ts">
import { DarkOneAccordion, DarkOneAccordionContent, DarkOneAccordionItem, DarkOneAccordionTrigger } from '@/components/darkone/accordion';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Single, collapsible">
    <DarkOneAccordion type="single" collapsible default-value="sampler" class="w-full max-w-md">
      <DarkOneAccordionItem value="sampler">
        <DarkOneAccordionTrigger>Sampler</DarkOneAccordionTrigger>
        <DarkOneAccordionContent class="text-muted-foreground">Euler a at 30 steps. Ancestral samplers add noise each step, so the same seed drifts as steps change.</DarkOneAccordionContent>
      </DarkOneAccordionItem>
      <DarkOneAccordionItem value="loras">
        <DarkOneAccordionTrigger>LoRAs</DarkOneAccordionTrigger>
        <DarkOneAccordionContent class="text-muted-foreground">film-grain-v2 at 0.6, isometric-rooms at 0.8.</DarkOneAccordionContent>
      </DarkOneAccordionItem>
      <DarkOneAccordionItem value="seed">
        <DarkOneAccordionTrigger>Seed</DarkOneAccordionTrigger>
        <DarkOneAccordionContent class="font-mono text-muted-foreground">1184</DarkOneAccordionContent>
      </DarkOneAccordionItem>
    </DarkOneAccordion>
  </SpecimenRow>
  <SpecimenRow label="Multiple, with a disabled item">
    <DarkOneAccordion type="multiple" :default-value="['prompt', 'negative']" class="w-full max-w-md">
      <DarkOneAccordionItem value="prompt">
        <DarkOneAccordionTrigger>Prompt</DarkOneAccordionTrigger>
        <DarkOneAccordionContent class="text-muted-foreground">A lighthouse at dusk, volumetric fog, 35mm.</DarkOneAccordionContent>
      </DarkOneAccordionItem>
      <DarkOneAccordionItem value="negative">
        <DarkOneAccordionTrigger>Negative prompt</DarkOneAccordionTrigger>
        <DarkOneAccordionContent class="text-muted-foreground">Blurry, watermark, extra limbs.</DarkOneAccordionContent>
      </DarkOneAccordionItem>
      <DarkOneAccordionItem value="refiner" disabled>
        <DarkOneAccordionTrigger>Refiner</DarkOneAccordionTrigger>
        <DarkOneAccordionContent class="text-muted-foreground">Not loaded.</DarkOneAccordionContent>
      </DarkOneAccordionItem>
    </DarkOneAccordion>
  </SpecimenRow>
</template>
