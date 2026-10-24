<script setup lang="ts">
import { ref } from 'vue';
import { Dices } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import { DarkOnePopover, DarkOnePopoverContent, DarkOnePopoverTrigger } from '@/components/darkone/popover';
import SpecimenRow from '../SpecimenRow.vue';

const seed = ref('1873402');
</script>

<template>
  <SpecimenRow label="With a field">
    <DarkOnePopover>
      <DarkOnePopoverTrigger as-child>
        <DarkOneButton>Seed {{ seed }}</DarkOneButton>
      </DarkOnePopoverTrigger>
      <DarkOnePopoverContent class="grid gap-3">
        <DarkOneField label="Seed" for="ks-popover-seed">
          <DarkOneInput id="ks-popover-seed" v-model="seed" />
        </DarkOneField>
        <DarkOneButton class="justify-self-start" @click="seed = String(Math.floor(Math.random() * 1e7))">
          <Dices class="size-3.5" />
          Randomise
        </DarkOneButton>
      </DarkOnePopoverContent>
    </DarkOnePopover>
  </SpecimenRow>
  <SpecimenRow label="Text, aligned start">
    <DarkOnePopover>
      <DarkOnePopoverTrigger as-child>
        <DarkOneButton variant="ghost">What is CFG?</DarkOneButton>
      </DarkOnePopoverTrigger>
      <DarkOnePopoverContent align="start" class="text-sm">
        How closely the image follows the prompt. Around 7 suits SDXL; higher values sharpen the prompt but burn the colours.
      </DarkOnePopoverContent>
    </DarkOnePopover>
  </SpecimenRow>
</template>
