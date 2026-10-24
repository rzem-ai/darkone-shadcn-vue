<script setup lang="ts">
import { DarkOneSeparator } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Horizontal">
    <div class="w-full max-w-sm text-sm">
      <div>Above</div>
      <DarkOneSeparator class="my-2" />
      <div>Below</div>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Vertical">
    <div class="flex h-5 items-center gap-3 text-sm">
      <span>Images</span>
      <DarkOneSeparator orientation="vertical" />
      <span>Video</span>
      <DarkOneSeparator orientation="vertical" />
      <span>Audio</span>
    </div>
  </SpecimenRow>
</template>
