<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneCheckbox } from '@/components/darkone/checkbox';
import { DarkOneLabel } from '@/components/darkone/label';
import SpecimenRow from '../SpecimenRow.vue';

const checked = ref<boolean | 'indeterminate'>(true);
</script>

<template>
  <SpecimenRow label="States">
    <div class="flex items-center gap-2"><DarkOneCheckbox id="ks-cb-1" v-model="checked" /><DarkOneLabel for="ks-cb-1">Upscale</DarkOneLabel></div>
    <div class="flex items-center gap-2"><DarkOneCheckbox id="ks-cb-2" /><DarkOneLabel for="ks-cb-2">Unchecked</DarkOneLabel></div>
    <div class="flex items-center gap-2"><DarkOneCheckbox id="ks-cb-3" model-value="indeterminate" /><DarkOneLabel for="ks-cb-3">Indeterminate</DarkOneLabel></div>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <div class="flex items-center gap-2"><DarkOneCheckbox id="ks-cb-4" disabled :model-value="true" /><DarkOneLabel for="ks-cb-4">Locked on</DarkOneLabel></div>
  </SpecimenRow>
</template>
