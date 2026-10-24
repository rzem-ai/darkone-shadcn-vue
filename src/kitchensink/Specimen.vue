<script setup lang="ts">
import { ref } from 'vue';
import { CheckIcon, CopyIcon } from '@lucide/vue';
import type { Entry } from './catalogue';

const props = defineProps<{ entry: Entry }>();
const copied = ref(false);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.entry.install);
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  } catch {
    // Clipboard access is refused outside a secure context; the command stays selectable.
  }
}
</script>

<template>
  <section :id="props.entry.name" :aria-labelledby="`${props.entry.name}-title`" class="flex scroll-mt-4 flex-col gap-4 border-b pb-10" data-specimen>
    <header class="flex flex-col gap-1">
      <h2 :id="`${props.entry.name}-title`" class="text-base font-semibold">{{ props.entry.title }}</h2>
      <div class="text-sm text-muted-foreground">{{ props.entry.description }}</div>
      <div class="mt-1 flex min-w-0 items-center gap-2 bg-muted px-2 py-1 font-mono text-xs">
        <code class="min-w-0 flex-1 truncate select-all">{{ props.entry.install }}</code>
        <button type="button" class="shrink-0 text-muted-foreground hover:text-foreground" :aria-label="`Copy the install command for ${props.entry.title}`" @click="copy">
          <CheckIcon v-if="copied" class="size-3.5" />
          <CopyIcon v-else class="size-3.5" />
        </button>
      </div>
    </header>
    <div class="flex flex-col gap-5">
      <component :is="props.entry.specimen" />
    </div>
  </section>
</template>
