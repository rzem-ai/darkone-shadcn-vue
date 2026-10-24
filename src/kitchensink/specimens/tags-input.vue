<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneTagsInput, DarkOneTagsInputInput, DarkOneTagsInputItem, DarkOneTagsInputItemDelete, DarkOneTagsInputItemText } from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';

const tags = ref(['portrait', 'studio']);
</script>

<template>
  <SpecimenRow label="Editable">
    <DarkOneTagsInput v-model="tags" class="w-full max-w-md">
      <DarkOneTagsInputItem v-for="tag in tags" :key="tag" :value="tag">
        <DarkOneTagsInputItemText />
        <DarkOneTagsInputItemDelete />
      </DarkOneTagsInputItem>
      <DarkOneTagsInputInput placeholder="Add a tag" aria-label="Add a tag" />
    </DarkOneTagsInput>
  </SpecimenRow>
</template>
