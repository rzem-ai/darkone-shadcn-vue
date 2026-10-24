<script setup lang="ts">
import { ref } from 'vue';
import { ChevronsUpDownIcon } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneCollapsible, DarkOneCollapsibleContent, DarkOneCollapsibleTrigger } from '@/components/darkone/collapsible';
import SpecimenRow from '../SpecimenRow.vue';

const open = ref(false);
const settings = [
  { name: 'CFG scale', value: '7.0' },
  { name: 'Steps', value: '30' },
  { name: 'Clip skip', value: '2' },
];
</script>

<template>
  <SpecimenRow label="Closed">
    <DarkOneCollapsible v-model:open="open" class="flex w-64 flex-col gap-1">
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm">Advanced settings</span>
        <DarkOneCollapsibleTrigger as-child>
          <DarkOneButton variant="ghost" size="icon" :aria-label="open ? 'Hide advanced settings' : 'Show advanced settings'">
            <ChevronsUpDownIcon class="size-4" />
          </DarkOneButton>
        </DarkOneCollapsibleTrigger>
      </div>
      <DarkOneCollapsibleContent class="flex flex-col gap-px">
        <div v-for="setting in settings" :key="setting.name" class="flex h-(--darkone-row-height) items-center justify-between border px-2 text-xs">
          <span class="text-muted-foreground">{{ setting.name }}</span>
          <span class="font-mono">{{ setting.value }}</span>
        </div>
      </DarkOneCollapsibleContent>
    </DarkOneCollapsible>
  </SpecimenRow>
  <SpecimenRow label="Open by default">
    <DarkOneCollapsible default-open class="flex w-64 flex-col gap-1">
      <DarkOneCollapsibleTrigger as-child>
        <DarkOneButton class="justify-between">
          Seed 1184 for 4 images
          <ChevronsUpDownIcon class="size-3.5" />
        </DarkOneButton>
      </DarkOneCollapsibleTrigger>
      <DarkOneCollapsibleContent class="flex flex-col gap-px font-mono text-xs">
        <div v-for="offset in 4" :key="offset" class="flex h-(--darkone-row-height) items-center border px-2">{{ 1183 + offset }}</div>
      </DarkOneCollapsibleContent>
    </DarkOneCollapsible>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneCollapsible disabled class="w-64">
      <DarkOneCollapsibleTrigger as-child>
        <DarkOneButton class="w-full justify-between" disabled>
          Refiner pass
          <ChevronsUpDownIcon class="size-3.5" />
        </DarkOneButton>
      </DarkOneCollapsibleTrigger>
      <DarkOneCollapsibleContent class="pt-1 text-xs text-muted-foreground">Needs the SDXL refiner.</DarkOneCollapsibleContent>
    </DarkOneCollapsible>
  </SpecimenRow>
</template>
