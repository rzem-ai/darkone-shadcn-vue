<script setup lang="ts">
import { ref } from 'vue';
import { BoldIcon, LockIcon } from '@lucide/vue';
import { DarkOneToggle } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const locked = ref(true);
</script>

<template>
  <SpecimenRow label="Variants">
    <DarkOneToggle v-model="locked" aria-label="Lock seed"><LockIcon /></DarkOneToggle>
    <DarkOneToggle variant="outline" aria-label="Bold"><BoldIcon /></DarkOneToggle>
    <DarkOneToggle variant="outline">With text</DarkOneToggle>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneToggle disabled aria-label="Locked"><LockIcon /></DarkOneToggle>
  </SpecimenRow>
</template>
