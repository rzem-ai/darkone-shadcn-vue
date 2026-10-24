<script setup lang="ts">
import { DarkOneInput, DarkOneLabel } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Above a control">
    <div class="flex w-64 flex-col gap-1">
      <DarkOneLabel for="ks-label-input">Negative prompt</DarkOneLabel>
      <DarkOneInput id="ks-label-input" placeholder="Blurry, low contrast" />
    </div>
  </SpecimenRow>
</template>
