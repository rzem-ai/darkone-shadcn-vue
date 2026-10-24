<script setup lang="ts">
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import { DarkOneLabel } from '@/components/darkone/label';
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
