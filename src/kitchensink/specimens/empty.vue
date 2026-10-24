<script setup lang="ts">
import { ImagesIcon, SearchXIcon } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneEmpty, DarkOneEmptyContent, DarkOneEmptyDescription, DarkOneEmptyHeader, DarkOneEmptyMedia, DarkOneEmptyTitle } from '@/components/darkone/empty';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="With an action">
    <DarkOneEmpty class="max-w-md border">
      <DarkOneEmptyHeader>
        <DarkOneEmptyMedia variant="icon">
          <ImagesIcon />
        </DarkOneEmptyMedia>
        <DarkOneEmptyTitle>No runs yet</DarkOneEmptyTitle>
        <DarkOneEmptyDescription>Queue a prompt and its images collect here, newest first.</DarkOneEmptyDescription>
      </DarkOneEmptyHeader>
      <DarkOneEmptyContent>
        <DarkOneButton variant="default">New run</DarkOneButton>
      </DarkOneEmptyContent>
    </DarkOneEmpty>
  </SpecimenRow>
  <SpecimenRow label="Unbordered, no match">
    <DarkOneEmpty class="max-w-md">
      <DarkOneEmptyHeader>
        <DarkOneEmptyMedia>
          <SearchXIcon class="size-5 text-muted-foreground" />
        </DarkOneEmptyMedia>
        <DarkOneEmptyTitle>No LoRAs match "watercolour"</DarkOneEmptyTitle>
        <DarkOneEmptyDescription>Check the spelling, or <a href="#darkone-empty">browse every LoRA</a>.</DarkOneEmptyDescription>
      </DarkOneEmptyHeader>
    </DarkOneEmpty>
  </SpecimenRow>
</template>
