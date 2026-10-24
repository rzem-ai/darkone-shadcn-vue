<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'reka-ui';
import { DarkOneCommand } from './command';
import { DarkOneDialog, DarkOneDialogContent, DarkOneDialogDescription, DarkOneDialogHeader, DarkOneDialogTitle } from './dialog';

// The vendor palette builds on the vendor dialog and command with no class to reach them,
// so it is composed again from the DarkOne parts.
const props = withDefaults(defineProps<DialogRootProps & { title?: string; description?: string }>(), {
  title: 'Command Palette',
  description: 'Search for a command to run...',
});
const emits = defineEmits<DialogRootEmits>();
const forwarded = useForwardPropsEmits(reactiveOmit(props, 'title', 'description'), emits);
</script>

<template>
  <DarkOneDialog v-slot="slotProps" v-bind="forwarded">
    <DarkOneDialogContent class="overflow-hidden p-0">
      <DarkOneDialogHeader class="sr-only">
        <DarkOneDialogTitle>{{ props.title }}</DarkOneDialogTitle>
        <DarkOneDialogDescription>{{ props.description }}</DarkOneDialogDescription>
      </DarkOneDialogHeader>
      <DarkOneCommand>
        <slot v-bind="slotProps" />
      </DarkOneCommand>
    </DarkOneDialogContent>
  </DarkOneDialog>
</template>
