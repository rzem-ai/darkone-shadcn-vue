<script setup lang="ts">
import { ref } from 'vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import DarkOneInput from '@/components/darkone/DarkOneInput.vue';
import { DarkOneFormControl, DarkOneFormDescription, DarkOneFormField, DarkOneFormItem, DarkOneFormLabel, DarkOneFormMessage } from '@/components/darkone/form';
import { DarkOneNativeSelect, DarkOneNativeSelectOption } from '@/components/darkone/native-select';
import { DarkOneNumberField, DarkOneNumberFieldContent, DarkOneNumberFieldDecrement, DarkOneNumberFieldIncrement, DarkOneNumberFieldInput } from '@/components/darkone/number-field';
import SpecimenRow from '../SpecimenRow.vue';

const schema = toTypedSchema(
  z.object({
    name: z.string().min(3, 'At least three characters.'),
    steps: z.number({ invalid_type_error: 'A whole number.' }).int().min(10, 'Ten steps or more.').max(150, 'At most 150.'),
    sampler: z.string().min(1, 'Pick a sampler.'),
  }),
);

const { handleSubmit, resetForm } = useForm({ validationSchema: schema, initialValues: { name: '', steps: 4, sampler: '' } });
const saved = ref<string>();
const onSubmit = handleSubmit((values) => {
  saved.value = `${values.name}: ${values.steps} steps, ${values.sampler}`;
});
</script>

<template>
  <SpecimenRow label="Validated preset">
    <form class="grid w-full max-w-xs gap-3" novalidate @submit="onSubmit">
      <DarkOneFormField v-slot="{ componentField }" name="name">
        <DarkOneFormItem>
          <DarkOneFormLabel>Preset name</DarkOneFormLabel>
          <DarkOneFormControl><DarkOneInput placeholder="Portrait, soft light" v-bind="componentField" /></DarkOneFormControl>
          <DarkOneFormMessage />
        </DarkOneFormItem>
      </DarkOneFormField>
      <DarkOneFormField v-slot="{ value, handleChange }" name="steps">
        <DarkOneFormItem>
          <DarkOneFormLabel>Steps</DarkOneFormLabel>
          <DarkOneNumberField :model-value="value" :min="1" class="w-36" @update:model-value="handleChange">
            <DarkOneNumberFieldContent>
              <DarkOneNumberFieldDecrement />
              <DarkOneFormControl><DarkOneNumberFieldInput /></DarkOneFormControl>
              <DarkOneNumberFieldIncrement />
            </DarkOneNumberFieldContent>
          </DarkOneNumberField>
          <DarkOneFormDescription>More steps, more detail, slower runs.</DarkOneFormDescription>
          <DarkOneFormMessage />
        </DarkOneFormItem>
      </DarkOneFormField>
      <DarkOneFormField v-slot="{ componentField }" name="sampler">
        <DarkOneFormItem>
          <DarkOneFormLabel>Sampler</DarkOneFormLabel>
          <DarkOneFormControl>
            <DarkOneNativeSelect class="w-full" v-bind="componentField">
              <DarkOneNativeSelectOption value="" disabled>Choose a sampler</DarkOneNativeSelectOption>
              <DarkOneNativeSelectOption value="Euler a">Euler a</DarkOneNativeSelectOption>
              <DarkOneNativeSelectOption value="DPM++ 2M Karras">DPM++ 2M Karras</DarkOneNativeSelectOption>
              <DarkOneNativeSelectOption value="DDIM">DDIM</DarkOneNativeSelectOption>
            </DarkOneNativeSelect>
          </DarkOneFormControl>
          <DarkOneFormMessage />
        </DarkOneFormItem>
      </DarkOneFormField>
      <div class="flex items-center gap-2">
        <DarkOneButton type="submit" variant="default">Save preset</DarkOneButton>
        <DarkOneButton type="button" @click="resetForm(); saved = undefined">Reset</DarkOneButton>
      </div>
      <span v-if="saved" class="font-mono text-xs text-muted-foreground">{{ saved }}</span>
    </form>
  </SpecimenRow>
</template>
