<script setup lang="ts">
import { DarkOneResizableHandle, DarkOneResizablePanel, DarkOneResizablePanelGroup } from '@/components/darkone/resizable';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Horizontal, with a grip">
    <div class="h-40 w-full max-w-xl border">
      <DarkOneResizablePanelGroup direction="horizontal">
        <DarkOneResizablePanel :default-size="35" :min-size="20" class="p-2 text-xs text-muted-foreground">Prompt</DarkOneResizablePanel>
        <DarkOneResizableHandle with-handle />
        <DarkOneResizablePanel :default-size="65" class="flex items-center justify-center p-2 font-mono text-xs text-muted-foreground">1024 × 1024</DarkOneResizablePanel>
      </DarkOneResizablePanelGroup>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Vertical">
    <div class="h-56 w-full max-w-xl border">
      <DarkOneResizablePanelGroup direction="vertical">
        <DarkOneResizablePanel :default-size="70" class="p-2 text-xs text-muted-foreground">Canvas</DarkOneResizablePanel>
        <DarkOneResizableHandle />
        <DarkOneResizablePanel :default-size="30" :min-size="15" class="p-2 text-xs text-muted-foreground">Queue, 3 runs waiting</DarkOneResizablePanel>
      </DarkOneResizablePanelGroup>
    </div>
  </SpecimenRow>
</template>
