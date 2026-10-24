<script setup lang="ts">
import { computed } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneHoverCard, DarkOneHoverCardContent, DarkOneHoverCardTrigger } from '@/components/darkone/hover-card';
import { safeHref } from '@/components/darkone/safeHref';

export interface CitationSource {
  url: string;
  title: string;
  description?: string;
}

// The default slot replaces the hostname, for a numbered or named citation.
const props = defineProps<{ source: CitationSource }>();

const hostname = computed(() => new URL(props.source.url).hostname.replace(/^www\./, ''));
</script>

<template>
  <DarkOneHoverCard :open-delay="10" :close-delay="100">
    <DarkOneHoverCardTrigger as-child>
      <DarkOneButton variant="secondary" size="xs"><slot>{{ hostname }}</slot></DarkOneButton>
    </DarkOneHoverCardTrigger>
    <DarkOneHoverCardContent class="flex w-64 flex-col gap-1">
      <div class="font-medium">{{ props.source.title }}</div>
      <p v-if="props.source.description" class="text-muted-foreground">{{ props.source.description }}</p>
      <a :href="safeHref(props.source.url)" target="_blank" rel="noreferrer" class="text-xs text-muted-foreground underline-offset-4 hover:underline">
        {{ hostname }}
        <span class="sr-only"> (opens in a new tab)</span>
      </a>
    </DarkOneHoverCardContent>
  </DarkOneHoverCard>
</template>
