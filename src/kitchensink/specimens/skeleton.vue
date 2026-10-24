<script setup lang="ts">
import { DarkOneSkeleton } from '@/components/darkone/skeleton';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="A loading card">
    <div class="flex items-center gap-3">
      <DarkOneSkeleton class="size-12" />
      <div class="flex flex-col gap-2">
        <DarkOneSkeleton class="h-4 w-48" />
        <DarkOneSkeleton class="h-4 w-32" />
      </div>
    </div>
  </SpecimenRow>
</template>
