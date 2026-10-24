<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { getLocalTimeZone, today } from '@internationalized/date';
import type { DateRange } from 'reka-ui';
import { DarkOneRangeCalendar } from '@/components/darkone/range-calendar';
import SpecimenRow from '../SpecimenRow.vue';

const start = today(getLocalTimeZone());
const usage = ref({ start: start.subtract({ days: 6 }), end: start }) as Ref<DateRange>;
</script>

<template>
  <SpecimenRow label="Usage window">
    <DarkOneRangeCalendar v-model="usage" class="border" />
    <span class="font-mono text-xs text-muted-foreground">{{ usage.start?.toString() }} to {{ usage.end?.toString() }}</span>
  </SpecimenRow>
  <SpecimenRow label="Two months">
    <DarkOneRangeCalendar :default-value="{ start: start, end: start.add({ days: 10 }) }" :number-of-months="2" class="border" />
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneRangeCalendar :default-value="{ start: start, end: start.add({ days: 3 }) }" disabled class="border" />
  </SpecimenRow>
</template>
