<script setup lang="ts">
import { DarkOneButton, DarkOneCard, DarkOneCardContent, DarkOneCardDescription, DarkOneCardFooter, DarkOneCardHeader, DarkOneCardTitle } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Full">
    <DarkOneCard class="w-full max-w-sm">
      <DarkOneCardHeader>
        <DarkOneCardTitle>SDXL base</DarkOneCardTitle>
        <DarkOneCardDescription>6.9 GB, last used yesterday</DarkOneCardDescription>
      </DarkOneCardHeader>
      <DarkOneCardContent class="text-sm text-muted-foreground">A general model at 1024 pixels. Pairs with the refiner for detail.</DarkOneCardContent>
      <DarkOneCardFooter class="gap-2">
        <DarkOneButton variant="default">Use</DarkOneButton>
        <DarkOneButton>Details</DarkOneButton>
      </DarkOneCardFooter>
    </DarkOneCard>
  </SpecimenRow>
</template>
