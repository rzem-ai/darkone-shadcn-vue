<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneLabel, DarkOneSwitch } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const enabled = ref(true);
</script>

<template>
  <SpecimenRow label="States">
    <div class="flex items-center gap-2"><DarkOneSwitch id="ks-sw-1" v-model="enabled" /><DarkOneLabel for="ks-sw-1">{{ enabled ? 'On' : 'Off' }}</DarkOneLabel></div>
    <div class="flex items-center gap-2"><DarkOneSwitch id="ks-sw-2" /><DarkOneLabel for="ks-sw-2">Off</DarkOneLabel></div>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneSwitch disabled :model-value="true" aria-label="Locked on" />
    <DarkOneSwitch disabled aria-label="Locked off" />
  </SpecimenRow>
</template>
