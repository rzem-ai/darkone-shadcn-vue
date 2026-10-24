<script setup lang="ts">
import { CircleCheckIcon, CircleDotIcon, CircleIcon, RouteIcon } from '@lucide/vue';
import { computed } from 'vue';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceDescription,
  DarkOneTraceIcon,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

export interface PlanStep {
  title: string;
  status: 'done' | 'running' | 'pending';
}

const props = defineProps<{
  title: string;
  steps: PlanStep[];
  /** The agent is still working. A step left `running` after that is shown without the shimmer. */
  streaming?: boolean;
}>();

const done = computed(() => props.steps.filter((step) => step.status === 'done').length);
</script>

<template>
  <DarkOneTrace>
    <DarkOneTraceCollapsible default-open>
      <DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceLine :status="props.streaming && done < props.steps.length ? 'running' : undefined">
          <DarkOneTraceIcon><RouteIcon /></DarkOneTraceIcon>
          <DarkOneTraceTitle>{{ props.title }}</DarkOneTraceTitle>
          <DarkOneTraceDescription>{{ done }} of {{ props.steps.length }} done</DarkOneTraceDescription>
        </DarkOneTraceLine>
      </DarkOneTraceCollapsibleTrigger>
      <DarkOneTraceCollapsibleContent>
        <DarkOneTrace>
          <DarkOneTraceLine
            v-for="step in props.steps"
            :key="step.title"
            :status="
              step.status === 'pending' ? 'pending'
              : props.streaming && step.status === 'running' ? 'running'
              : undefined
            ">
            <DarkOneTraceIcon>
              <CircleCheckIcon v-if="step.status === 'done'" />
              <CircleDotIcon v-else-if="step.status === 'running'" />
              <CircleIcon v-else />
            </DarkOneTraceIcon>
            <DarkOneTraceTitle>{{ step.title }}</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTrace>
      </DarkOneTraceCollapsibleContent>
    </DarkOneTraceCollapsible>
  </DarkOneTrace>
</template>
