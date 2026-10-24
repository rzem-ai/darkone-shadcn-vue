<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneHoverCard, DarkOneHoverCardContent, DarkOneHoverCardTrigger } from '@/components/darkone/hover-card';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Model preview">
    <DarkOneHoverCard>
      <DarkOneHoverCardTrigger as-child>
        <DarkOneButton variant="link" class="px-0">sdxl-base-1.0</DarkOneButton>
      </DarkOneHoverCardTrigger>
      <DarkOneHoverCardContent class="grid gap-1">
        <div class="text-sm font-medium">SDXL base 1.0</div>
        <p class="text-sm text-muted-foreground">A general model at 1024 pixels. Pairs with the refiner for detail.</p>
        <div class="text-xs text-muted-foreground">6.9 GB, used in 214 runs</div>
      </DarkOneHoverCardContent>
    </DarkOneHoverCard>
  </SpecimenRow>
  <SpecimenRow label="Side, delayed">
    <DarkOneHoverCard :open-delay="400">
      <DarkOneHoverCardTrigger as-child>
        <DarkOneButton variant="link" class="px-0">film-grain-v2</DarkOneButton>
      </DarkOneHoverCardTrigger>
      <DarkOneHoverCardContent side="right" class="grid gap-1">
        <div class="text-sm font-medium">Film grain v2</div>
        <p class="text-sm text-muted-foreground">A LoRA for 35 mm grain and halation. Weight 0.6 to 0.8.</p>
      </DarkOneHoverCardContent>
    </DarkOneHoverCard>
  </SpecimenRow>
</template>
