<script setup lang="ts">
import { ref } from 'vue';
import { CheckIcon, CopyIcon } from '@lucide/vue';
import { DarkOneTabs, DarkOneTabsContent, DarkOneTabsList, DarkOneTabsTrigger } from '@/components/darkone/tabs';
import type { Entry } from './catalogue';
import SourceView from './SourceView.vue';

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
  <section :id="props.entry.name" :aria-labelledby="`${props.entry.name}-title`" class="flex scroll-mt-16 flex-col gap-4 border-b pb-10" data-specimen>
    <header class="flex flex-col gap-1">
      <h2 :id="`${props.entry.name}-title`" class="text-base font-semibold">{{ props.entry.title }}</h2>
      <div class="text-sm text-muted-foreground">{{ props.entry.description }}</div>
      <div v-for="alias in props.entry.aliases" :key="alias" class="text-sm text-muted-foreground">{{ alias }}</div>
      <div class="mt-1 flex min-w-0 items-center gap-2 bg-muted px-2 py-1 font-mono text-xs">
        <code class="min-w-0 flex-1 truncate select-all">{{ props.entry.install }}</code>
        <button type="button" class="shrink-0 text-muted-foreground hover:text-foreground" :aria-label="`Copy the install command for ${props.entry.title}`" @click="copy">
          <CheckIcon v-if="copied" class="size-3.5" />
          <CopyIcon v-else class="size-3.5" />
        </button>
      </div>
    </header>
    <!-- Hidden panels unmount, so a file is highlighted only when someone opens it. -->
    <DarkOneTabs default-value="preview">
      <DarkOneTabsList :aria-label="`${props.entry.title} views`">
        <DarkOneTabsTrigger value="preview">Preview</DarkOneTabsTrigger>
        <DarkOneTabsTrigger value="usage">Usage</DarkOneTabsTrigger>
        <DarkOneTabsTrigger value="source">Source</DarkOneTabsTrigger>
      </DarkOneTabsList>
      <DarkOneTabsContent value="preview" class="flex flex-col gap-5 pt-2">
        <component :is="props.entry.specimen" />
      </DarkOneTabsContent>
      <DarkOneTabsContent value="usage" class="pt-2">
        <SourceView :file="props.entry.usage" />
      </DarkOneTabsContent>
      <DarkOneTabsContent value="source" class="flex flex-col gap-3 pt-2">
        <SourceView v-for="file in props.entry.sources" :key="file.path" :file="file" />
      </DarkOneTabsContent>
    </DarkOneTabs>
  </section>
</template>
