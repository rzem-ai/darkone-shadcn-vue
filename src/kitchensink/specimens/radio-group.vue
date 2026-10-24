<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneLabel, DarkOneRadioGroup, DarkOneRadioGroupItem } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const size = ref('square');
</script>

<template>
  <SpecimenRow label="Group">
    <DarkOneRadioGroup v-model="size" aria-label="Aspect">
      <div v-for="option in ['square', 'portrait', 'landscape']" :key="option" class="flex items-center gap-2">
        <DarkOneRadioGroupItem :id="`ks-radio-${option}`" :value="option" />
        <DarkOneLabel :for="`ks-radio-${option}`">{{ option }}</DarkOneLabel>
      </div>
    </DarkOneRadioGroup>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneRadioGroup model-value="a" disabled aria-label="Locked" class="flex">
      <DarkOneRadioGroupItem value="a" aria-label="Chosen" />
      <DarkOneRadioGroupItem value="b" aria-label="Other" />
    </DarkOneRadioGroup>
  </SpecimenRow>
</template>
