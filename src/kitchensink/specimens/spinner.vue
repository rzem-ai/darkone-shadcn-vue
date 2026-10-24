<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneSpinner } from '@/components/darkone/spinner';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Sizes">
    <DarkOneSpinner class="size-3" />
    <DarkOneSpinner />
    <DarkOneSpinner class="size-6" />
  </SpecimenRow>
  <SpecimenRow label="With a status">
    <div class="flex items-center gap-2 text-xs text-muted-foreground">
      <DarkOneSpinner class="size-3.5" />
      Sampling, step 14 of 28
    </div>
  </SpecimenRow>
  <SpecimenRow label="In a button">
    <DarkOneButton variant="default" disabled>
      <DarkOneSpinner />
      Rendering
    </DarkOneButton>
    <DarkOneButton disabled>
      <DarkOneSpinner />
      Loading model
    </DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="Colour">
    <DarkOneSpinner class="text-primary" />
    <DarkOneSpinner class="text-chart-3" />
    <DarkOneSpinner class="text-muted-foreground" />
  </SpecimenRow>
</template>
