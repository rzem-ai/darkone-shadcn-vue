<script setup lang="ts">
import { DarkOneBadge } from '@/components/darkone/badge';
import {
  DarkOneTable,
  DarkOneTableBody,
  DarkOneTableCaption,
  DarkOneTableCell,
  DarkOneTableEmpty,
  DarkOneTableFooter,
  DarkOneTableHead,
  DarkOneTableHeader,
  DarkOneTableRow,
} from '@/components/darkone/table';
import SpecimenRow from '../SpecimenRow.vue';

const runs = [
  { id: 1042, model: 'SDXL base', sampler: 'euler_ancestral', steps: 28, seed: 1024, images: 12, duration: '3:41', status: 'Done' },
  { id: 1041, model: 'SDXL base', sampler: 'dpmpp_2m', steps: 30, seed: 88213, images: 4, duration: '1:12', status: 'Done' },
  { id: 1040, model: 'SD 1.5', sampler: 'ddim', steps: 50, seed: 7, images: 8, duration: '2:05', status: 'Failed' },
  { id: 1039, model: 'Flux dev', sampler: 'euler', steps: 20, seed: 5150, images: 2, duration: '0:58', status: 'Done' },
];
</script>

<template>
  <SpecimenRow label="Runs">
    <DarkOneTable class="max-w-2xl">
      <DarkOneTableCaption>The last four runs on this machine.</DarkOneTableCaption>
      <DarkOneTableHeader>
        <DarkOneTableRow>
          <DarkOneTableHead>Run</DarkOneTableHead>
          <DarkOneTableHead>Model</DarkOneTableHead>
          <DarkOneTableHead>Sampler</DarkOneTableHead>
          <DarkOneTableHead class="text-right">Steps</DarkOneTableHead>
          <DarkOneTableHead class="text-right">Seed</DarkOneTableHead>
          <DarkOneTableHead class="text-right">Images</DarkOneTableHead>
          <DarkOneTableHead class="text-right">Time</DarkOneTableHead>
          <DarkOneTableHead>Status</DarkOneTableHead>
        </DarkOneTableRow>
      </DarkOneTableHeader>
      <DarkOneTableBody>
        <DarkOneTableRow v-for="run in runs" :key="run.id" :data-state="run.id === 1042 ? 'selected' : undefined">
          <DarkOneTableCell class="font-mono text-xs">#{{ run.id }}</DarkOneTableCell>
          <DarkOneTableCell>{{ run.model }}</DarkOneTableCell>
          <DarkOneTableCell class="font-mono text-xs">{{ run.sampler }}</DarkOneTableCell>
          <DarkOneTableCell class="text-right tabular-nums">{{ run.steps }}</DarkOneTableCell>
          <DarkOneTableCell class="text-right font-mono text-xs">{{ run.seed }}</DarkOneTableCell>
          <DarkOneTableCell class="text-right tabular-nums">{{ run.images }}</DarkOneTableCell>
          <DarkOneTableCell class="text-right tabular-nums">{{ run.duration }}</DarkOneTableCell>
          <DarkOneTableCell>
            <DarkOneBadge :variant="run.status === 'Failed' ? 'destructive' : 'secondary'">{{ run.status }}</DarkOneBadge>
          </DarkOneTableCell>
        </DarkOneTableRow>
      </DarkOneTableBody>
      <DarkOneTableFooter>
        <DarkOneTableRow>
          <DarkOneTableCell :colspan="5">Total</DarkOneTableCell>
          <DarkOneTableCell class="text-right tabular-nums">26</DarkOneTableCell>
          <DarkOneTableCell class="text-right tabular-nums">7:56</DarkOneTableCell>
          <DarkOneTableCell />
        </DarkOneTableRow>
      </DarkOneTableFooter>
    </DarkOneTable>
  </SpecimenRow>
  <SpecimenRow label="Empty">
    <DarkOneTable class="max-w-2xl">
      <DarkOneTableHeader>
        <DarkOneTableRow>
          <DarkOneTableHead>Run</DarkOneTableHead>
          <DarkOneTableHead>Model</DarkOneTableHead>
          <DarkOneTableHead>Seed</DarkOneTableHead>
        </DarkOneTableRow>
      </DarkOneTableHeader>
      <DarkOneTableBody>
        <DarkOneTableEmpty :colspan="3">No runs queued.</DarkOneTableEmpty>
      </DarkOneTableBody>
    </DarkOneTable>
  </SpecimenRow>
</template>
