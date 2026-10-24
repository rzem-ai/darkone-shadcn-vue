<script setup lang="ts">
import { ref } from 'vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import { DarkOneNumberField, DarkOneNumberFieldContent, DarkOneNumberFieldDecrement, DarkOneNumberFieldIncrement, DarkOneNumberFieldInput } from '@/components/darkone/number-field';
import SpecimenRow from '../SpecimenRow.vue';

const steps = ref(30);
const cfg = ref(7.5);
const denoise = ref(0.65);
</script>

<template>
  <SpecimenRow label="Standalone">
    <DarkOneNumberField v-model="steps" :min="1" :max="150" class="w-36">
      <DarkOneNumberFieldContent>
        <DarkOneNumberFieldDecrement />
        <DarkOneNumberFieldInput aria-label="Steps" />
        <DarkOneNumberFieldIncrement />
      </DarkOneNumberFieldContent>
    </DarkOneNumberField>
  </SpecimenRow>
  <SpecimenRow label="In a field">
    <DarkOneField label="CFG scale" for="ks-number-cfg" class="w-36">
      <DarkOneNumberField id="ks-number-cfg" v-model="cfg" :min="1" :max="30" :step="0.5">
        <DarkOneNumberFieldContent>
          <DarkOneNumberFieldDecrement />
          <DarkOneNumberFieldInput />
          <DarkOneNumberFieldIncrement />
        </DarkOneNumberFieldContent>
      </DarkOneNumberField>
    </DarkOneField>
    <DarkOneField label="Denoise" compact for="ks-number-denoise" class="w-32">
      <DarkOneNumberField id="ks-number-denoise" v-model="denoise" :min="0" :max="1" :step="0.05" :format-options="{ minimumFractionDigits: 2 }">
        <DarkOneNumberFieldContent>
          <DarkOneNumberFieldDecrement />
          <DarkOneNumberFieldInput />
          <DarkOneNumberFieldIncrement />
        </DarkOneNumberFieldContent>
      </DarkOneNumberField>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Invalid">
    <DarkOneNumberField :default-value="0" class="w-36">
      <DarkOneNumberFieldContent>
        <DarkOneNumberFieldDecrement />
        <DarkOneNumberFieldInput aria-label="Batch size" aria-invalid="true" />
        <DarkOneNumberFieldIncrement />
      </DarkOneNumberFieldContent>
    </DarkOneNumberField>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneNumberField :default-value="1024" disabled class="w-36">
      <DarkOneNumberFieldContent>
        <DarkOneNumberFieldDecrement />
        <DarkOneNumberFieldInput aria-label="Width" />
        <DarkOneNumberFieldIncrement />
      </DarkOneNumberFieldContent>
    </DarkOneNumberField>
  </SpecimenRow>
</template>
