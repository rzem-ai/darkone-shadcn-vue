<script setup lang="ts">
import { ChevronRightIcon, FileIcon, FolderIcon } from '@lucide/vue';
import { DarkOneCollapsible, DarkOneCollapsibleContent, DarkOneCollapsibleTrigger } from '@/components/darkone/collapsible';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import type { FileTreeNode } from './DarkOneFileTree.vue';

const props = defineProps<{
  node: FileTreeNode;
  expanded: Set<string>;
  selected?: string;
}>();

const emit = defineEmits<{
  toggle: [path: string, open: boolean];
  select: [path: string];
}>();
</script>

<template>
  <DarkOneCollapsible v-if="props.node.type === 'folder'" :open="props.expanded.has(props.node.path)" @update:open="emit('toggle', props.node.path, $event)">
    <DarkOneCollapsibleTrigger as-child>
      <DarkOneButton variant="ghost" class="w-full justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50">
        <ChevronRightIcon class="transition-transform" :class="props.expanded.has(props.node.path) && 'rotate-90'" />
        <FolderIcon />
        {{ props.node.name }}
      </DarkOneButton>
    </DarkOneCollapsibleTrigger>
    <DarkOneCollapsibleContent>
      <div class="ml-4 flex flex-col">
        <DarkOneFileTreeNode
          v-for="child in props.node.children"
          :key="child.path"
          :node="child"
          :expanded="props.expanded"
          :selected="props.selected"
          @toggle="(path, open) => emit('toggle', path, open)"
          @select="emit('select', $event)" />
      </div>
    </DarkOneCollapsibleContent>
  </DarkOneCollapsible>
  <DarkOneButton
    v-else
    variant="ghost"
    class="w-full justify-start font-normal"
    :class="props.selected === props.node.path && 'bg-accent text-accent-foreground'"
    :aria-current="props.selected === props.node.path ? 'true' : undefined"
    @click="emit('select', props.node.path)">
    <FileIcon />
    {{ props.node.name }}
  </DarkOneButton>
</template>
