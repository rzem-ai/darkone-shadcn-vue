<script setup lang="ts">
import { DarkOneProgress } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Values">
    <div class="flex w-full max-w-sm flex-col gap-3">
      <DarkOneProgress :model-value="12" aria-label="12 percent" />
      <DarkOneProgress :model-value="64" aria-label="64 percent" />
      <DarkOneProgress :model-value="100" aria-label="Complete" />
    </div>
  </SpecimenRow>
</template>
