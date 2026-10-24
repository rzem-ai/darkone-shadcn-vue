<script setup lang="ts">
import { Copy, Download, Play, Trash2 } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneTooltip, DarkOneTooltipContent, DarkOneTooltipProvider, DarkOneTooltipTrigger } from '@/components/darkone/tooltip';
import SpecimenRow from '../SpecimenRow.vue';

const actions = [
  { label: 'Run again', icon: Play },
  { label: 'Copy seed', icon: Copy },
  { label: 'Download', icon: Download },
];
</script>

<template>
  <DarkOneTooltipProvider>
    <SpecimenRow label="Icon actions">
      <div class="flex gap-1">
        <DarkOneTooltip v-for="action in actions" :key="action.label">
          <DarkOneTooltipTrigger as-child>
            <DarkOneButton size="icon-sm" :aria-label="action.label"><component :is="action.icon" class="size-3.5" /></DarkOneButton>
          </DarkOneTooltipTrigger>
          <DarkOneTooltipContent>{{ action.label }}</DarkOneTooltipContent>
        </DarkOneTooltip>
      </div>
    </SpecimenRow>
    <SpecimenRow label="Side, with detail">
      <DarkOneTooltip>
        <DarkOneTooltipTrigger as-child>
          <DarkOneButton variant="destructive" size="icon-sm" aria-label="Delete run"><Trash2 class="size-3.5" /></DarkOneButton>
        </DarkOneTooltipTrigger>
        <DarkOneTooltipContent side="right">Delete run and its 12 images</DarkOneTooltipContent>
      </DarkOneTooltip>
    </SpecimenRow>
  </DarkOneTooltipProvider>
</template>
