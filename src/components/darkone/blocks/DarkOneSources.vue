<script setup lang="ts">
import { ArrowUpRightIcon, GlobeIcon } from '@lucide/vue';
import { computed } from 'vue';
import { safeHref } from '@/components/darkone/safeHref';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceIcon,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

export interface Source {
  url: string;
  title?: string;
}

const props = withDefaults(
  defineProps<{
    sources: Source[];
    defaultOpen?: boolean;
  }>(),
  { defaultOpen: true },
);

// An agent can cite the same page twice; it is listed once.
const unique = computed(() => props.sources.filter((source, index, all) => all.findIndex((other) => other.url === source.url) === index));

function hostname(url: string) {
  return new URL(url).hostname;
}
</script>

<template>
  <DarkOneTrace v-if="unique.length > 0">
    <DarkOneTraceCollapsible :default-open="props.defaultOpen">
      <DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceLine>
          <DarkOneTraceIcon><GlobeIcon /></DarkOneTraceIcon>
          <DarkOneTraceTitle>Used {{ unique.length }} {{ unique.length === 1 ? 'source' : 'sources' }}</DarkOneTraceTitle>
        </DarkOneTraceLine>
      </DarkOneTraceCollapsibleTrigger>
      <DarkOneTraceCollapsibleContent>
        <DarkOneTrace>
          <a v-for="source in unique" :key="source.url" :href="safeHref(source.url)" target="_blank" rel="noreferrer">
            <DarkOneTraceLine>
              <DarkOneTraceTitle>
                {{ source.title ?? hostname(source.url) }}
                <span class="sr-only"> (opens in a new tab)</span>
              </DarkOneTraceTitle>
              <DarkOneTraceIcon><ArrowUpRightIcon /></DarkOneTraceIcon>
            </DarkOneTraceLine>
          </a>
        </DarkOneTrace>
      </DarkOneTraceCollapsibleContent>
    </DarkOneTraceCollapsible>
  </DarkOneTrace>
</template>
