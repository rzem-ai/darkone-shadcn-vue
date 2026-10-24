<script setup lang="ts">
import { computed } from 'vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneHoverCard, DarkOneHoverCardContent, DarkOneHoverCardTrigger } from '@/components/darkone/hover-card';
import { DarkOneProgress } from '@/components/darkone/progress';

export interface ContextUsageRow {
  label: string;
  tokens: number;
  /** In `currency`; give it on every row or on none. */
  cost?: number;
}

const props = withDefaults(
  defineProps<{
    usedTokens: number;
    /** The model's context window. The model's provider rarely reports it, so the caller sets it. */
    maxTokens: number;
    /** Where the used tokens went: input, output, reasoning and so on. */
    usage?: ContextUsageRow[];
    currency?: string;
  }>(),
  { usage: () => [], currency: 'USD' },
);

const percent = computed(() => (props.maxTokens > 0 ? Math.round((props.usedTokens / props.maxTokens) * 100) : 0));
const costed = computed(() => props.usage.length > 0 && props.usage.every((row) => row.cost !== undefined));
const totalCost = computed(() => props.usage.reduce((sum, row) => sum + (row.cost ?? 0), 0));
// Fractions of a cent are common per request, so keep up to four places.
const money = computed(() => new Intl.NumberFormat('en', { style: 'currency', currency: props.currency, maximumFractionDigits: 4 }));

function formatTokens(value: number) {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
}
</script>

<template>
  <DarkOneHoverCard :open-delay="10" :close-delay="100">
    <DarkOneHoverCardTrigger as-child>
      <DarkOneButton variant="outline">{{ percent }}% context</DarkOneButton>
    </DarkOneHoverCardTrigger>
    <DarkOneHoverCardContent class="flex w-64 flex-col gap-3">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="font-medium">Context</span>
        <span class="text-muted-foreground">{{ formatTokens(props.usedTokens) }} / {{ formatTokens(props.maxTokens) }}</span>
      </div>
      <DarkOneProgress :model-value="Math.min(percent, 100)" aria-label="Context used" />
      <div v-if="props.usage.length" class="flex flex-col gap-1 text-sm">
        <div v-for="row in props.usage" :key="row.label" class="flex justify-between gap-3">
          <span class="text-muted-foreground">{{ row.label }}</span>
          <span>
            {{ formatTokens(row.tokens) }}
            <span v-if="costed" class="text-muted-foreground">· {{ money.format(row.cost!) }}</span>
          </span>
        </div>
      </div>
      <div v-if="costed" class="flex justify-between gap-3 border-t pt-2 text-sm">
        <span class="text-muted-foreground">Cost</span>
        <span>{{ money.format(totalCost) }}</span>
      </div>
    </DarkOneHoverCardContent>
  </DarkOneHoverCard>
</template>
