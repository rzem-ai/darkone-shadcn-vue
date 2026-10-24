<script setup lang="ts">
import { ArrowUpRightIcon, CircleAlertIcon, CircleCheckIcon, GlobeIcon, LoaderCircleIcon } from '@lucide/vue';
import { createReusableTemplate } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import { DarkOneBadge } from '@/components/darkone/badge';
import { DarkOneCodeBlock, DarkOneCodeBlockContent } from '@/components/darkone/code-block';
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

export interface ChainOfThoughtLink {
  title: string;
  url: string;
}

/** What a step returned: a log, a list of pages, or a list of files. */
export type ChainOfThoughtOutput = { type: 'text'; text: string } | { type: 'links'; links: ChainOfThoughtLink[] } | { type: 'files'; files: string[] };

/** One title, or one per status, since a step reads "Searching" until it has "Searched". */
export type ChainOfThoughtTitle = string | { running: string; done: string; error: string };

export interface ChainOfThoughtStep {
  id: string;
  title: ChainOfThoughtTitle;
  state: 'input-available' | 'output-available' | 'output-error';
  output?: ChainOfThoughtOutput;
  errorText?: string;
  /** Whether the step's output starts open. */
  defaultOpen?: boolean;
}

type Status = 'running' | 'error' | undefined;

const props = defineProps<{
  steps: ChainOfThoughtStep[];
  /** The agent is still researching. A step still waiting on output after that never got it, so it reads as an error. */
  streaming?: boolean;
  /** Whether the summary starts open once research is done. */
  defaultOpen?: boolean;
}>();

// The open state the person set on the summary. Until then, it is open while research runs.
const openState = ref<boolean>();
watch(
  () => props.streaming,
  (streaming) => {
    if (streaming) openState.value = undefined;
  },
);

const summary = computed(() => {
  const failed = props.steps.filter((step) => step.state === 'output-error').length;
  const status: Status =
    props.streaming ? 'running'
    : failed > 0 ? 'error'
    : undefined;
  const title = props.streaming ? 'Researching' : `Researched in ${props.steps.length} ${props.steps.length === 1 ? 'step' : 'steps'}${failed > 0 ? `, ${failed} failed` : ''}`;
  return { status, title };
});

function stepStatus(step: ChainOfThoughtStep): Status {
  if (step.state === 'output-available') return undefined;
  return step.state === 'output-error' || !props.streaming ? 'error' : 'running';
}

function stepTitle(step: ChainOfThoughtStep) {
  if (typeof step.title === 'string') return step.title;
  return step.title[stepStatus(step) ?? 'done'];
}

const [DefineLine, ReuseLine] = createReusableTemplate<{ title: string; status: Status }>();
</script>

<template>
  <DefineLine v-slot="{ title, status: lineStatus }">
    <DarkOneTraceLine :status="lineStatus">
      <DarkOneTraceIcon>
        <LoaderCircleIcon v-if="lineStatus === 'running'" class="animate-spin" />
        <CircleAlertIcon v-else-if="lineStatus === 'error'" />
        <CircleCheckIcon v-else />
      </DarkOneTraceIcon>
      <DarkOneTraceTitle>{{ title }}</DarkOneTraceTitle>
    </DarkOneTraceLine>
  </DefineLine>

  <DarkOneTrace v-if="props.steps.length > 0">
    <DarkOneTraceCollapsible
      :open="openState ?? (props.streaming || !!props.defaultOpen)"
      :unmount-on-hide="false"
      @update:open="openState = $event">
      <DarkOneTraceCollapsibleTrigger>
        <ReuseLine :title="summary.title" :status="summary.status" />
      </DarkOneTraceCollapsibleTrigger>
      <DarkOneTraceCollapsibleContent>
        <DarkOneTrace>
          <template v-for="step in props.steps" :key="step.id">
            <ReuseLine v-if="step.state === 'input-available'" :title="stepTitle(step)" :status="stepStatus(step)" />
            <DarkOneTraceCollapsible v-else :default-open="step.defaultOpen">
              <DarkOneTraceCollapsibleTrigger>
                <ReuseLine :title="stepTitle(step)" :status="stepStatus(step)" />
              </DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceCollapsibleContent>
                <DarkOneCodeBlock v-if="step.state === 'output-error'" size="sm" variant="destructive">
                  <DarkOneCodeBlockContent wrap class="max-h-64">{{ step.errorText }}</DarkOneCodeBlockContent>
                </DarkOneCodeBlock>
                <DarkOneTrace v-else-if="step.output?.type === 'links'">
                  <a v-for="link in step.output.links" :key="link.url" :href="safeHref(link.url)" target="_blank" rel="noreferrer">
                    <DarkOneTraceLine>
                      <DarkOneTraceIcon><GlobeIcon /></DarkOneTraceIcon>
                      <DarkOneTraceTitle>
                        {{ link.title }}
                        <span class="sr-only"> (opens in a new tab)</span>
                      </DarkOneTraceTitle>
                      <DarkOneTraceIcon><ArrowUpRightIcon /></DarkOneTraceIcon>
                    </DarkOneTraceLine>
                  </a>
                </DarkOneTrace>
                <DarkOneCodeBlock v-else-if="step.output?.type === 'text'" size="sm">
                  <DarkOneCodeBlockContent wrap class="max-h-64">{{ step.output.text }}</DarkOneCodeBlockContent>
                </DarkOneCodeBlock>
                <div v-else-if="step.output?.type === 'files'" class="flex flex-wrap gap-1.5">
                  <DarkOneBadge v-for="file in step.output.files" :key="file" variant="secondary" class="font-mono">{{ file }}</DarkOneBadge>
                </div>
              </DarkOneTraceCollapsibleContent>
            </DarkOneTraceCollapsible>
          </template>
        </DarkOneTrace>
      </DarkOneTraceCollapsibleContent>
    </DarkOneTraceCollapsible>
  </DarkOneTrace>
</template>
