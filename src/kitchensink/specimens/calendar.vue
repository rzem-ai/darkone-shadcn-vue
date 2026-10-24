<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { getLocalTimeZone, isWeekend, today, type DateValue } from '@internationalized/date';
import { DarkOneCalendar } from '@/components/darkone/calendar';
import SpecimenRow from '../SpecimenRow.vue';

const start = today(getLocalTimeZone());
const scheduled = ref(start.add({ days: 2 })) as Ref<DateValue>;
const retrain = ref(start.add({ months: 1 })) as Ref<DateValue>;
const weekendOnly = (date: DateValue) => !isWeekend(date, 'en-AU');
</script>

<template>
  <SpecimenRow label="Scheduled run">
    <DarkOneCalendar v-model="scheduled" class="border" />
    <span class="font-mono text-xs text-muted-foreground">{{ scheduled?.toString() }}</span>
  </SpecimenRow>
  <SpecimenRow label="Month and year">
    <DarkOneCalendar v-model="retrain" layout="month-and-year" class="border" />
  </SpecimenRow>
  <SpecimenRow label="Unavailable days">
    <DarkOneCalendar :default-value="start" :min-value="start" :is-date-unavailable="weekendOnly" class="border" />
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneCalendar :default-value="start" disabled class="border" />
  </SpecimenRow>
</template>
