<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState, RowSelectionState, SortingState, Updater, VisibilityState } from '@tanstack/vue-table';
import { ChevronDown } from '@lucide/vue';
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table';
import { computed, ref, type Ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import {
  DarkOneDropdownMenu,
  DarkOneDropdownMenuCheckboxItem,
  DarkOneDropdownMenuContent,
  DarkOneDropdownMenuLabel,
  DarkOneDropdownMenuTrigger,
} from '@/components/darkone/dropdown-menu';
import { DarkOneTable, DarkOneTableBody, DarkOneTableCell, DarkOneTableEmpty, DarkOneTableHead, DarkOneTableHeader, DarkOneTableRow } from '@/components/darkone/table';

const props = withDefaults(
  defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    /** The id of the column the filter input searches. Absent, no filter input. */
    filterColumn?: string;
    filterPlaceholder?: string;
    pageSize?: number;
  }>(),
  { pageSize: 10 },
);

// Local rather than imported: components/ui/table/utils is not reachable through DarkOne.
function valueUpdater<T>(updaterOrValue: Updater<T>, state: Ref<T>) {
  state.value = typeof updaterOrValue === 'function' ? (updaterOrValue as (old: T) => T)(state.value) : updaterOrValue;
}

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref<RowSelectionState>({});

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  initialState: { pagination: { pageSize: props.pageSize } },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updater) => valueUpdater(updater, sorting),
  onColumnFiltersChange: (updater) => valueUpdater(updater, columnFilters),
  onColumnVisibilityChange: (updater) => valueUpdater(updater, columnVisibility),
  onRowSelectionChange: (updater) => valueUpdater(updater, rowSelection),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
});

const filtered = computed(() => (props.filterColumn ? table.getColumn(props.filterColumn) : undefined));
</script>

<template>
  <div class="grid w-full gap-3">
    <div class="flex items-center gap-2">
      <DarkOneInput
        v-if="filtered"
        class="max-w-sm"
        :placeholder="props.filterPlaceholder ?? `Filter ${props.filterColumn}`"
        :model-value="(filtered.getFilterValue() as string | undefined) ?? ''"
        @update:model-value="filtered.setFilterValue($event)" />
      <DarkOneDropdownMenu>
        <DarkOneDropdownMenuTrigger as-child>
          <DarkOneButton class="ml-auto">
            Columns
            <ChevronDown class="size-3.5" />
          </DarkOneButton>
        </DarkOneDropdownMenuTrigger>
        <DarkOneDropdownMenuContent align="end">
          <DarkOneDropdownMenuLabel>Columns</DarkOneDropdownMenuLabel>
          <DarkOneDropdownMenuCheckboxItem
            v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
            :key="column.id"
            class="capitalize"
            :model-value="column.getIsVisible()"
            @update:model-value="(value: boolean) => column.toggleVisibility(!!value)">
            {{ column.id }}
          </DarkOneDropdownMenuCheckboxItem>
        </DarkOneDropdownMenuContent>
      </DarkOneDropdownMenu>
    </div>
    <div class="rounded-(--darkone-radius) border">
      <DarkOneTable>
        <DarkOneTableHeader>
          <DarkOneTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <DarkOneTableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </DarkOneTableHead>
          </DarkOneTableRow>
        </DarkOneTableHeader>
        <DarkOneTableBody>
          <template v-if="table.getRowModel().rows.length">
            <DarkOneTableRow v-for="row in table.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() ? 'selected' : undefined">
              <DarkOneTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </DarkOneTableCell>
            </DarkOneTableRow>
          </template>
          <DarkOneTableEmpty v-else :colspan="table.getVisibleLeafColumns().length">No results.</DarkOneTableEmpty>
        </DarkOneTableBody>
      </DarkOneTable>
    </div>
    <div class="flex items-center gap-2">
      <div class="flex-1 text-xs text-muted-foreground tabular-nums">
        {{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <DarkOneButton :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">Previous</DarkOneButton>
      <DarkOneButton :disabled="!table.getCanNextPage()" @click="table.nextPage()">Next</DarkOneButton>
    </div>
  </div>
</template>
