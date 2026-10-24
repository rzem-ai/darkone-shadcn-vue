<script setup lang="ts">
import { ref } from 'vue';
import { Check, ChevronsUpDown } from '@lucide/vue';
import DarkOneField from '@/components/darkone/DarkOneField.vue';
import {
  DarkOneCombobox,
  DarkOneComboboxAnchor,
  DarkOneComboboxEmpty,
  DarkOneComboboxGroup,
  DarkOneComboboxInput,
  DarkOneComboboxItem,
  DarkOneComboboxItemIndicator,
  DarkOneComboboxList,
  DarkOneComboboxSeparator,
  DarkOneComboboxTrigger,
} from '@/components/darkone/combobox';
import SpecimenRow from '../SpecimenRow.vue';

interface Option {
  value: string;
  label: string;
}

const checkpoints: Record<string, Option[]> = {
  SDXL: [
    { value: 'sdxl-base', label: 'SDXL Base 1.0' },
    { value: 'juggernaut-xl', label: 'Juggernaut XL v9' },
    { value: 'dreamshaper-xl', label: 'DreamShaper XL' },
  ],
  'SD 1.5': [
    { value: 'sd15', label: 'Stable Diffusion 1.5' },
    { value: 'realistic-vision', label: 'Realistic Vision 6' },
  ],
};
const loras: Option[] = [
  { value: 'detail-tweaker', label: 'Detail Tweaker XL' },
  { value: 'film-grain', label: 'Film Grain' },
  { value: 'lineart', label: 'Lineart Style' },
];

const checkpoint = ref<Option>(checkpoints.SDXL![1]!);
const lora = ref<Option>();
const label = (option: unknown) => (option as Option | undefined)?.label ?? '';
</script>

<template>
  <SpecimenRow label="Standalone, grouped">
    <DarkOneCombobox v-model="checkpoint" by="value">
      <DarkOneComboboxAnchor class="w-64">
        <DarkOneComboboxInput :display-value="label" placeholder="Search checkpoints" aria-label="Checkpoint" />
        <DarkOneComboboxTrigger aria-label="Show checkpoints"><ChevronsUpDown class="size-4 opacity-50" /></DarkOneComboboxTrigger>
      </DarkOneComboboxAnchor>
      <DarkOneComboboxList>
        <DarkOneComboboxEmpty>No checkpoint matches.</DarkOneComboboxEmpty>
        <template v-for="(options, family, index) in checkpoints" :key="family">
          <DarkOneComboboxSeparator v-if="index > 0" />
          <DarkOneComboboxGroup :heading="family">
            <DarkOneComboboxItem v-for="option in options" :key="option.value" :value="option">
              {{ option.label }}
              <DarkOneComboboxItemIndicator><Check /></DarkOneComboboxItemIndicator>
            </DarkOneComboboxItem>
          </DarkOneComboboxGroup>
        </template>
      </DarkOneComboboxList>
    </DarkOneCombobox>
  </SpecimenRow>
  <SpecimenRow label="In a field">
    <DarkOneField label="LoRA" for="ks-combobox-lora" class="w-64">
      <DarkOneCombobox v-model="lora" by="value">
        <DarkOneComboboxAnchor>
          <DarkOneComboboxInput id="ks-combobox-lora" :display-value="label" placeholder="Add a LoRA" />
          <DarkOneComboboxTrigger aria-label="Show LoRAs"><ChevronsUpDown class="size-4 opacity-50" /></DarkOneComboboxTrigger>
        </DarkOneComboboxAnchor>
        <DarkOneComboboxList>
          <DarkOneComboboxEmpty>No LoRA matches.</DarkOneComboboxEmpty>
          <DarkOneComboboxGroup>
            <DarkOneComboboxItem v-for="option in loras" :key="option.value" :value="option">
              {{ option.label }}
              <DarkOneComboboxItemIndicator><Check /></DarkOneComboboxItemIndicator>
            </DarkOneComboboxItem>
          </DarkOneComboboxGroup>
        </DarkOneComboboxList>
      </DarkOneCombobox>
    </DarkOneField>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneCombobox :model-value="checkpoints.SDXL![0]" by="value" disabled>
      <DarkOneComboboxAnchor class="w-64">
        <DarkOneComboboxInput :display-value="label" aria-label="Locked checkpoint" />
        <DarkOneComboboxTrigger aria-label="Show checkpoints"><ChevronsUpDown class="size-4 opacity-50" /></DarkOneComboboxTrigger>
      </DarkOneComboboxAnchor>
    </DarkOneCombobox>
  </SpecimenRow>
</template>
