<script setup lang="ts">
import { computed } from 'vue';
import { ChevronDownIcon } from '@lucide/vue';
import {
  DarkOneDropdownMenu,
  DarkOneDropdownMenuContent,
  DarkOneDropdownMenuGroup,
  DarkOneDropdownMenuLabel,
  DarkOneDropdownMenuRadioGroup,
  DarkOneDropdownMenuRadioItem,
  DarkOneDropdownMenuSeparator,
  DarkOneDropdownMenuTrigger,
} from '@/components/darkone/dropdown-menu';
import { DarkOneInputGroupButton } from '@/components/darkone/input-group';

export interface ModelOption {
  id: string;
  name: string;
}

export interface ModelProvider {
  name: string;
  models: ModelOption[];
}

export interface EffortOption {
  id: string;
  name: string;
}

// Two buttons and no wrapper, so they sit in an input group addon beside its other actions.
const props = defineProps<{
  providers: ModelProvider[];
  /** Leave out for a model that takes no effort setting, and the second menu goes with it. */
  efforts?: EffortOption[];
}>();

const model = defineModel<string>({ required: true });
const effort = defineModel<string>('effort');

const models = computed(() => props.providers.flatMap((provider) => provider.models));
const currentModel = computed(() => models.value.find((item) => item.id === model.value) ?? models.value[0]);
const currentEffort = computed(() => props.efforts?.find((item) => item.id === effort.value) ?? props.efforts?.[0]);
</script>

<template>
  <DarkOneDropdownMenu>
    <DarkOneDropdownMenuTrigger as-child>
      <DarkOneInputGroupButton size="sm" variant="outline" :aria-label="`Model: ${currentModel?.name}`" class="ml-auto">
        {{ currentModel?.name }}
        <ChevronDownIcon />
      </DarkOneInputGroupButton>
    </DarkOneDropdownMenuTrigger>
    <DarkOneDropdownMenuContent align="start" class="w-48">
      <DarkOneDropdownMenuRadioGroup v-model="model">
        <template v-for="(provider, index) in props.providers" :key="provider.name">
          <DarkOneDropdownMenuSeparator v-if="index > 0" />
          <DarkOneDropdownMenuGroup>
            <DarkOneDropdownMenuLabel>{{ provider.name }}</DarkOneDropdownMenuLabel>
            <DarkOneDropdownMenuRadioItem v-for="item in provider.models" :key="item.id" :value="item.id">
              {{ item.name }}
            </DarkOneDropdownMenuRadioItem>
          </DarkOneDropdownMenuGroup>
        </template>
      </DarkOneDropdownMenuRadioGroup>
    </DarkOneDropdownMenuContent>
  </DarkOneDropdownMenu>
  <DarkOneDropdownMenu v-if="props.efforts?.length">
    <DarkOneDropdownMenuTrigger as-child>
      <DarkOneInputGroupButton size="sm" variant="outline" :aria-label="`Effort: ${currentEffort?.name}`">
        <span class="text-muted-foreground">Effort</span>
        {{ currentEffort?.name }}
        <ChevronDownIcon />
      </DarkOneInputGroupButton>
    </DarkOneDropdownMenuTrigger>
    <DarkOneDropdownMenuContent align="start" class="w-36">
      <DarkOneDropdownMenuGroup>
        <DarkOneDropdownMenuLabel>Effort</DarkOneDropdownMenuLabel>
        <DarkOneDropdownMenuRadioGroup v-model="effort">
          <DarkOneDropdownMenuRadioItem v-for="item in props.efforts" :key="item.id" :value="item.id">
            {{ item.name }}
          </DarkOneDropdownMenuRadioItem>
        </DarkOneDropdownMenuRadioGroup>
      </DarkOneDropdownMenuGroup>
    </DarkOneDropdownMenuContent>
  </DarkOneDropdownMenu>
</template>
