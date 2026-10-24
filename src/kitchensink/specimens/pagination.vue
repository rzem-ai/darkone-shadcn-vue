<script setup lang="ts">
import { ref } from 'vue';
import {
  DarkOnePagination,
  DarkOnePaginationContent,
  DarkOnePaginationEllipsis,
  DarkOnePaginationFirst,
  DarkOnePaginationItem,
  DarkOnePaginationLast,
  DarkOnePaginationNext,
  DarkOnePaginationPrevious,
} from '@/components/darkone/pagination';
import SpecimenRow from '../SpecimenRow.vue';

const runs = ref(4);
</script>

<template>
  <SpecimenRow label="Runs, 12 a page">
    <DarkOnePagination v-slot="{ page }" v-model:page="runs" :total="240" :items-per-page="12" :sibling-count="1" show-edges class="mx-0 w-auto">
      <DarkOnePaginationContent v-slot="{ items }">
        <DarkOnePaginationPrevious />
        <template v-for="(item, index) in items" :key="index">
          <DarkOnePaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">{{ item.value }}</DarkOnePaginationItem>
          <DarkOnePaginationEllipsis v-else :index="index" />
        </template>
        <DarkOnePaginationNext />
      </DarkOnePaginationContent>
    </DarkOnePagination>
  </SpecimenRow>
  <SpecimenRow label="On the first page, with first and last">
    <DarkOnePagination v-slot="{ page }" :total="36" :items-per-page="12" :default-page="1" class="mx-0 w-auto">
      <DarkOnePaginationContent v-slot="{ items }">
        <DarkOnePaginationFirst />
        <DarkOnePaginationPrevious />
        <template v-for="(item, index) in items" :key="index">
          <DarkOnePaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">{{ item.value }}</DarkOnePaginationItem>
        </template>
        <DarkOnePaginationNext />
        <DarkOnePaginationLast />
      </DarkOnePaginationContent>
    </DarkOnePagination>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOnePagination :total="120" :items-per-page="12" :default-page="2" disabled class="mx-0 w-auto">
      <DarkOnePaginationContent>
        <DarkOnePaginationPrevious />
        <DarkOnePaginationNext />
      </DarkOnePaginationContent>
    </DarkOnePagination>
  </SpecimenRow>
</template>
