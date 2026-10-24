<script setup lang="ts">
import { PlusIcon, Trash2Icon } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Variants">
    <DarkOneButton>Outline</DarkOneButton>
    <DarkOneButton variant="default">Default</DarkOneButton>
    <DarkOneButton variant="secondary">Secondary</DarkOneButton>
    <DarkOneButton variant="ghost">Ghost</DarkOneButton>
    <DarkOneButton variant="destructive">Destructive</DarkOneButton>
    <DarkOneButton variant="link">Link</DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="With icon">
    <DarkOneButton><PlusIcon />Add model</DarkOneButton>
    <DarkOneButton size="icon" aria-label="Delete"><Trash2Icon /></DarkOneButton>
    <DarkOneButton size="icon-sm" aria-label="Add"><PlusIcon /></DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="Vendor sizes">
    <DarkOneButton size="xs">Extra small</DarkOneButton>
    <DarkOneButton size="sm">Small</DarkOneButton>
    <DarkOneButton size="default">Default</DarkOneButton>
    <DarkOneButton size="lg">Large</DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneButton disabled>Outline</DarkOneButton>
    <DarkOneButton variant="default" disabled>Default</DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="As a link">
    <DarkOneButton as-child><a href="#darkone-button">Anchor, styled as an action</a></DarkOneButton>
  </SpecimenRow>
</template>
