<script setup lang="ts">
import { DarkOneBadge } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Variants">
    <DarkOneBadge>Default</DarkOneBadge>
    <DarkOneBadge variant="secondary">Secondary</DarkOneBadge>
    <DarkOneBadge variant="outline">Outline</DarkOneBadge>
    <DarkOneBadge variant="destructive">Destructive</DarkOneBadge>
  </SpecimenRow>
</template>
