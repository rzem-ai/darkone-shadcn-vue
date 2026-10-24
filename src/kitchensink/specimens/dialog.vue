<script setup lang="ts">
import { ref } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import {
  DarkOneDialog,
  DarkOneDialogClose,
  DarkOneDialogContent,
  DarkOneDialogDescription,
  DarkOneDialogFooter,
  DarkOneDialogHeader,
  DarkOneDialogScrollContent,
  DarkOneDialogTitle,
  DarkOneDialogTrigger,
} from '@/components/darkone/dialog';
import SpecimenRow from '../SpecimenRow.vue';

const preset = ref('Portrait, soft light');
const log = Array.from({ length: 40 }, (_, step) => `Step ${step + 1} of 40, euler a, ${(0.42 + step * 0.05).toFixed(2)} s`);
</script>

<template>
  <SpecimenRow label="Form">
    <DarkOneDialog>
      <DarkOneDialogTrigger as-child>
        <DarkOneButton>Save as preset</DarkOneButton>
      </DarkOneDialogTrigger>
      <DarkOneDialogContent>
        <DarkOneDialogHeader>
          <DarkOneDialogTitle>Save as preset</DarkOneDialogTitle>
          <DarkOneDialogDescription>Keeps the model, sampler, steps and CFG scale. The prompt and seed stay with the run.</DarkOneDialogDescription>
        </DarkOneDialogHeader>
        <DarkOneField label="Name" for="ks-dialog-preset">
          <DarkOneInput id="ks-dialog-preset" v-model="preset" />
        </DarkOneField>
        <DarkOneDialogFooter>
          <DarkOneDialogClose as-child>
            <DarkOneButton>Cancel</DarkOneButton>
          </DarkOneDialogClose>
          <DarkOneDialogClose as-child>
            <DarkOneButton variant="default">Save</DarkOneButton>
          </DarkOneDialogClose>
        </DarkOneDialogFooter>
      </DarkOneDialogContent>
    </DarkOneDialog>
  </SpecimenRow>
  <SpecimenRow label="Scrolling">
    <DarkOneDialog>
      <DarkOneDialogTrigger as-child>
        <DarkOneButton>View run log</DarkOneButton>
      </DarkOneDialogTrigger>
      <DarkOneDialogScrollContent>
        <DarkOneDialogHeader>
          <DarkOneDialogTitle>Run 2041</DarkOneDialogTitle>
          <DarkOneDialogDescription>SDXL base, seed 1873402, 1024 by 1024.</DarkOneDialogDescription>
        </DarkOneDialogHeader>
        <ol class="font-mono text-xs text-muted-foreground">
          <li v-for="line in log" :key="line" class="py-0.5">{{ line }}</li>
        </ol>
      </DarkOneDialogScrollContent>
    </DarkOneDialog>
  </SpecimenRow>
</template>
