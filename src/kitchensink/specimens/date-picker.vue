<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import DarkOneDatePicker from '@/components/darkone/blocks/DarkOneDatePicker.vue';
import SpecimenRow from '../SpecimenRow.vue';

const start = today(getLocalTimeZone());
const scheduled = ref() as Ref<DateValue | undefined>;
const retrain = ref(start.add({ days: 14 })) as Ref<DateValue>;
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneDatePicker v-model="scheduled" placeholder="Schedule a run" locale="en-AU" class="w-60" />
    <span class="font-mono text-xs text-muted-foreground">{{ scheduled?.toString() ?? 'unset' }}</span>
  </SpecimenRow>
  <SpecimenRow label="In a field">
    <DarkOneField label="Retrain LoRA on" for="ks-date-picker-retrain" help="Not before today." class="w-60">
      <DarkOneDatePicker id="ks-date-picker-retrain" v-model="retrain" :min-value="start" locale="en-AU" />
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneDatePicker :model-value="start" disabled locale="en-AU" class="w-60" />
  </SpecimenRow>
</template>
