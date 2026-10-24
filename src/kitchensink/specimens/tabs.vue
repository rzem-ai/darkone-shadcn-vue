<script setup lang="ts">
import { DarkOneTabs, DarkOneTabsContent, DarkOneTabsList, DarkOneTabsTrigger } from '@/components/darkone/tabs';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Tabs">
    <DarkOneTabs default-value="prompt" class="w-full max-w-md">
      <DarkOneTabsList>
        <DarkOneTabsTrigger value="prompt">Prompt</DarkOneTabsTrigger>
        <DarkOneTabsTrigger value="settings">Settings</DarkOneTabsTrigger>
        <DarkOneTabsTrigger value="history" disabled>History</DarkOneTabsTrigger>
      </DarkOneTabsList>
      <DarkOneTabsContent value="prompt" class="pt-2 text-sm text-muted-foreground">What to make.</DarkOneTabsContent>
      <DarkOneTabsContent value="settings" class="pt-2 text-sm text-muted-foreground">How to make it.</DarkOneTabsContent>
    </DarkOneTabs>
  </SpecimenRow>
</template>
