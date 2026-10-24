<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner';
import { computed } from 'vue';
// vue-sonner 2 no longer injects its stylesheet, and without it a toast is an unstyled list item.
import 'vue-sonner/style.css';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const props = defineProps<ToasterProps>();

// The sonner stylesheet is unlayered, so it outranks any layered utility; these are marked important.
const toastOptions = computed(() => {
  const classes = props.toastOptions?.classes;
  return {
    ...props.toastOptions,
    classes: {
      ...classes,
      toast: cn('shadow-none!', classes?.toast),
      actionButton: cn('rounded-(--darkone-radius)! tracking-(--darkone-tracking)', classes?.actionButton),
      cancelButton: cn('rounded-(--darkone-radius)! tracking-(--darkone-tracking)', classes?.cancelButton),
      closeButton: cn('rounded-(--darkone-radius)!', classes?.closeButton),
    },
  };
});
</script>

<template>
  <Toaster v-bind="props" :style="{ '--border-radius': 'var(--darkone-radius)', ...props.style }" :toast-options="toastOptions" />
</template>
