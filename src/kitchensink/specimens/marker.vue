<script setup lang="ts">
import { GitBranchIcon, LoaderCircleIcon, SearchIcon } from '@lucide/vue';
import { DarkOneMarker, DarkOneMarkerContent, DarkOneMarkerIcon } from '@/components/darkone/marker';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="With an icon">
    <div class="flex w-full max-w-sm flex-col">
      <DarkOneMarker>
        <DarkOneMarkerIcon><GitBranchIcon /></DarkOneMarkerIcon>
        <DarkOneMarkerContent>Branched from run 4e1a</DarkOneMarkerContent>
      </DarkOneMarker>
      <DarkOneMarker>
        <DarkOneMarkerIcon><SearchIcon /></DarkOneMarkerIcon>
        <DarkOneMarkerContent>Explored 3 workflow files</DarkOneMarkerContent>
      </DarkOneMarker>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Status">
    <DarkOneMarker role="status" class="max-w-sm">
      <DarkOneMarkerIcon><LoaderCircleIcon class="animate-spin" /></DarkOneMarkerIcon>
      <DarkOneMarkerContent>Thinking</DarkOneMarkerContent>
    </DarkOneMarker>
  </SpecimenRow>
  <SpecimenRow label="Separator">
    <DarkOneMarker variant="separator" class="max-w-sm">
      <DarkOneMarkerContent>Conversation compacted</DarkOneMarkerContent>
    </DarkOneMarker>
  </SpecimenRow>
  <SpecimenRow label="Border, with a link">
    <DarkOneMarker variant="border" class="max-w-sm">
      <DarkOneMarkerContent>Switched to SDXL refiner. <a href="#models">Model details</a></DarkOneMarkerContent>
    </DarkOneMarker>
  </SpecimenRow>
</template>
