<script setup lang="ts">
import DarkOneContext, { type ContextUsageRow } from '@/components/darkone/blocks/DarkOneContext.vue';
import SpecimenRow from '../SpecimenRow.vue';

const early: ContextUsageRow[] = [
  { label: 'Input', tokens: 8420 },
  { label: 'Output', tokens: 1260 },
  { label: 'Reasoning', tokens: 980 },
];
const late: ContextUsageRow[] = [
  { label: 'Input', tokens: 104200 },
  { label: 'Output', tokens: 9800 },
  { label: 'Reasoning', tokens: 4100 },
];
const costed: ContextUsageRow[] = [
  { label: 'Input', tokens: 31400, cost: 0.0942 },
  { label: 'Cached input', tokens: 22000, cost: 0.0066 },
  { label: 'Output', tokens: 3900, cost: 0.0585 },
];
</script>

<template>
  <SpecimenRow label="Early in a run">
    <DarkOneContext :used-tokens="10660" :max-tokens="128000" :usage="early" />
  </SpecimenRow>
  <SpecimenRow label="Near the limit">
    <DarkOneContext :used-tokens="118100" :max-tokens="128000" :usage="late" />
  </SpecimenRow>
  <SpecimenRow label="With cost">
    <DarkOneContext :used-tokens="57300" :max-tokens="200000" :usage="costed" />
  </SpecimenRow>
  <SpecimenRow label="Totals only">
    <DarkOneContext :used-tokens="2400" :max-tokens="32000" />
  </SpecimenRow>
</template>
