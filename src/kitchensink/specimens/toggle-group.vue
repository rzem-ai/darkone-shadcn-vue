<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneToggleGroup, DarkOneToggleGroupItem } from '@/components/darkone/toggle-group';
import SpecimenRow from '../SpecimenRow.vue';

const view = ref('grid');
const filters = ref(['images']);
</script>

<template>
  <SpecimenRow label="Single, joined">
    <DarkOneToggleGroup v-model="view" type="single" variant="outline" aria-label="View">
      <DarkOneToggleGroupItem value="grid">Grid</DarkOneToggleGroupItem>
      <DarkOneToggleGroupItem value="list">List</DarkOneToggleGroupItem>
      <DarkOneToggleGroupItem value="board">Board</DarkOneToggleGroupItem>
    </DarkOneToggleGroup>
  </SpecimenRow>
  <SpecimenRow label="Multiple, spaced">
    <DarkOneToggleGroup v-model="filters" type="multiple" variant="outline" :spacing="2" aria-label="Filters">
      <DarkOneToggleGroupItem value="images">Images</DarkOneToggleGroupItem>
      <DarkOneToggleGroupItem value="video">Video</DarkOneToggleGroupItem>
      <DarkOneToggleGroupItem value="audio">Audio</DarkOneToggleGroupItem>
    </DarkOneToggleGroup>
  </SpecimenRow>
</template>
