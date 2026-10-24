<script setup lang="ts">
import { ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import { DarkOneSheet, DarkOneSheetClose, DarkOneSheetContent, DarkOneSheetDescription, DarkOneSheetFooter, DarkOneSheetHeader, DarkOneSheetTitle, DarkOneSheetTrigger } from '@/components/darkone/sheet';
import SpecimenRow from '../SpecimenRow.vue';

const steps = ref(30);
const cfg = ref(7);
const loras = ['Film grain v2', 'Ink wash', 'Isometric rooms', 'Detail tweaker'];
</script>

<template>
  <SpecimenRow label="Right">
    <DarkOneSheet>
      <DarkOneSheetTrigger as-child>
        <DarkOneButton>Run settings</DarkOneButton>
      </DarkOneSheetTrigger>
      <DarkOneSheetContent>
        <DarkOneSheetHeader>
          <DarkOneSheetTitle>Run settings</DarkOneSheetTitle>
          <DarkOneSheetDescription>Applied to the next run in the queue.</DarkOneSheetDescription>
        </DarkOneSheetHeader>
        <div class="grid gap-3 px-4">
          <DarkOneField label="Steps" for="ks-sheet-steps">
            <DarkOneInput id="ks-sheet-steps" v-model="steps" />
          </DarkOneField>
          <DarkOneField label="CFG scale" for="ks-sheet-cfg">
            <DarkOneInput id="ks-sheet-cfg" v-model="cfg" />
          </DarkOneField>
        </div>
        <DarkOneSheetFooter>
          <DarkOneSheetClose as-child>
            <DarkOneButton variant="default">Apply</DarkOneButton>
          </DarkOneSheetClose>
        </DarkOneSheetFooter>
      </DarkOneSheetContent>
    </DarkOneSheet>
  </SpecimenRow>
  <SpecimenRow label="Left">
    <DarkOneSheet>
      <DarkOneSheetTrigger as-child>
        <DarkOneButton>LoRA library</DarkOneButton>
      </DarkOneSheetTrigger>
      <DarkOneSheetContent side="left">
        <DarkOneSheetHeader>
          <DarkOneSheetTitle>LoRA library</DarkOneSheetTitle>
          <DarkOneSheetDescription>4 installed for SDXL.</DarkOneSheetDescription>
        </DarkOneSheetHeader>
        <ul class="grid px-4 text-sm">
          <li v-for="lora in loras" :key="lora" class="border-b py-1.5 last:border-b-0">{{ lora }}</li>
        </ul>
      </DarkOneSheetContent>
    </DarkOneSheet>
  </SpecimenRow>
</template>
