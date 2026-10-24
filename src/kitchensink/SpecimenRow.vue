<script setup lang="ts">
/** One state of a component: a caption, and the component in that state. */
const props = defineProps<{ label: string }>();
</script>

<template>
  <div class="grid gap-2 sm:grid-cols-[10rem_1fr] sm:items-start" data-specimen-row>
    <div class="pt-1.5 text-xs text-muted-foreground">{{ props.label }}</div>
    <div class="flex min-w-0 flex-wrap items-center gap-3">
      <slot />
    </div>
  </div>
</template>
