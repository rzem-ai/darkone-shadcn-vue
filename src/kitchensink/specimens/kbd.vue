<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneKbd, DarkOneKbdGroup } from '@/components/darkone/kbd';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Keys">
    <DarkOneKbd>Esc</DarkOneKbd>
    <DarkOneKbd>R</DarkOneKbd>
    <DarkOneKbd>⌘</DarkOneKbd>
    <DarkOneKbd>Shift</DarkOneKbd>
  </SpecimenRow>
  <SpecimenRow label="Chord">
    <DarkOneKbdGroup>
      <DarkOneKbd>Ctrl</DarkOneKbd>
      <span class="text-xs text-muted-foreground">+</span>
      <DarkOneKbd>Enter</DarkOneKbd>
    </DarkOneKbdGroup>
  </SpecimenRow>
  <SpecimenRow label="In text">
    <p class="text-sm text-muted-foreground">Press <DarkOneKbd>Space</DarkOneKbd> to compare against the previous seed.</p>
  </SpecimenRow>
  <SpecimenRow label="In a button">
    <DarkOneButton variant="default">
      Queue
      <DarkOneKbdGroup>
        <DarkOneKbd>⌘</DarkOneKbd>
        <DarkOneKbd>Enter</DarkOneKbd>
      </DarkOneKbdGroup>
    </DarkOneButton>
  </SpecimenRow>
</template>
