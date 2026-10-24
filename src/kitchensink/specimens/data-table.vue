<script setup lang="ts">
import type { Column, ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';
import { ArrowUpDown, MoreHorizontal } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBadge } from '@/components/darkone/badge';
import DarkOneDataTable from '@/components/darkone/blocks/DarkOneDataTable.vue';
import { DarkOneCheckbox } from '@/components/darkone/checkbox';
import {
  DarkOneDropdownMenu,
  DarkOneDropdownMenuContent,
  DarkOneDropdownMenuItem,
  DarkOneDropdownMenuLabel,
  DarkOneDropdownMenuSeparator,
  DarkOneDropdownMenuTrigger,
} from '@/components/darkone/dropdown-menu';
import SpecimenRow from '../SpecimenRow.vue';

interface Run {
  id: number;
  model: string;
  sampler: string;
  steps: number;
  status: 'queued' | 'running' | 'done' | 'failed';
  /** Seconds. */
  duration: number;
}

const runs: Run[] = [
  { id: 1052, model: 'Flux dev', sampler: 'euler', steps: 20, status: 'running', duration: 41 },
  { id: 1051, model: 'SDXL base', sampler: 'dpmpp_2m', steps: 30, status: 'queued', duration: 0 },
  { id: 1050, model: 'SDXL base', sampler: 'euler_ancestral', steps: 28, status: 'done', duration: 221 },
  { id: 1049, model: 'SD 1.5', sampler: 'ddim', steps: 50, status: 'failed', duration: 125 },
  { id: 1048, model: 'Flux schnell', sampler: 'euler', steps: 4, status: 'done', duration: 9 },
  { id: 1047, model: 'SDXL turbo', sampler: 'lcm', steps: 6, status: 'done', duration: 14 },
  { id: 1046, model: 'SDXL base', sampler: 'dpmpp_2m_sde', steps: 35, status: 'done', duration: 262 },
  { id: 1045, model: 'SD 3.5 large', sampler: 'dpmpp_2m', steps: 28, status: 'done', duration: 188 },
  { id: 1044, model: 'Flux dev', sampler: 'heun', steps: 24, status: 'failed', duration: 63 },
  { id: 1043, model: 'SD 1.5', sampler: 'euler_ancestral', steps: 25, status: 'done', duration: 47 },
  { id: 1042, model: 'SDXL base', sampler: 'euler_ancestral', steps: 28, status: 'done', duration: 219 },
  { id: 1041, model: 'Flux schnell', sampler: 'euler', steps: 4, status: 'done', duration: 8 },
];

const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

// A header that sorts its column, toggling ascending and descending.
const sortable =
  (label: string) =>
  ({ column }: { column: Column<Run, unknown> }) =>
    h(DarkOneButton, { variant: 'ghost', class: '-ml-2.5 font-normal uppercase', onClick: () => column.toggleSorting(column.getIsSorted() === 'asc') }, () => [label, h(ArrowUpDown, { class: 'size-3' })]);

const columns: ColumnDef<Run>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(DarkOneCheckbox, {
        modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(DarkOneCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: 'id', header: 'Run', cell: ({ row }) => h('span', { class: 'font-mono text-xs' }, `#${row.original.id}`) },
  { accessorKey: 'model', header: sortable('Model') },
  { accessorKey: 'sampler', header: 'Sampler', cell: ({ row }) => h('span', { class: 'font-mono text-xs' }, row.original.sampler) },
  {
    accessorKey: 'steps',
    header: sortable('Steps'),
    cell: ({ row }) => h('span', { class: 'tabular-nums' }, row.original.steps),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => h(DarkOneBadge, { variant: row.original.status === 'failed' ? 'destructive' : 'secondary', class: 'capitalize' }, () => row.original.status),
  },
  {
    accessorKey: 'duration',
    header: () => h('div', { class: 'text-right' }, 'Time'),
    cell: ({ row }) => h('div', { class: 'text-right tabular-nums' }, row.original.duration ? formatDuration(row.original.duration) : '-'),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) =>
      h(DarkOneDropdownMenu, () => [
        h(DarkOneDropdownMenuTrigger, { asChild: true }, () =>
          h(DarkOneButton, { variant: 'ghost', size: 'icon', class: 'size-(--darkone-action-height)' }, () => [h('span', { class: 'sr-only' }, 'Open menu'), h(MoreHorizontal, { class: 'size-3.5' })]),
        ),
        h(DarkOneDropdownMenuContent, { align: 'end' }, () => [
          h(DarkOneDropdownMenuLabel, () => 'Actions'),
          h(DarkOneDropdownMenuItem, { onClick: () => navigator.clipboard?.writeText(String(row.original.id)) }, () => 'Copy run ID'),
          h(DarkOneDropdownMenuSeparator),
          h(DarkOneDropdownMenuItem, () => 'Open outputs'),
          h(DarkOneDropdownMenuItem, () => 'Rerun with same seed'),
        ]),
      ]),
  },
];
</script>

<template>
  <SpecimenRow label="Runs">
    <DarkOneDataTable :columns="columns" :data="runs" filter-column="model" filter-placeholder="Filter models" class="max-w-3xl" />
  </SpecimenRow>
  <SpecimenRow label="Five a page">
    <DarkOneDataTable :columns="columns" :data="runs" :page-size="5" class="max-w-3xl" />
  </SpecimenRow>
  <SpecimenRow label="Empty">
    <DarkOneDataTable :columns="columns" :data="[]" filter-column="model" filter-placeholder="Filter models" class="max-w-3xl" />
  </SpecimenRow>
</template>
