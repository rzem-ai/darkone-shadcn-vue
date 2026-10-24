<script setup lang="ts">
import { ref } from 'vue';
import DarkOneFileTreeNode from './DarkOneFileTreeNode.vue';

export type FileTreeNode = { type: 'file'; name: string; path: string } | { type: 'folder'; name: string; path: string; children: FileTreeNode[] };

const props = defineProps<{
  nodes: FileTreeNode[];
  /** Folder paths open at mount. Leave out to open every folder. */
  defaultExpanded?: string[];
}>();

const selected = defineModel<string>();

function folders(nodes: FileTreeNode[]): string[] {
  return nodes.flatMap((node) => (node.type === 'folder' ? [node.path, ...folders(node.children)] : []));
}

// Held here rather than in each collapsible, so a folder keeps its state when the nodes prop is replaced.
const expanded = ref(new Set(props.defaultExpanded ?? folders(props.nodes)));

function toggle(path: string, open: boolean) {
  const next = new Set(expanded.value);
  if (open) next.add(path);
  else next.delete(path);
  expanded.value = next;
}
</script>

<template>
  <div class="flex w-full flex-col text-sm">
    <DarkOneFileTreeNode v-for="node in props.nodes" :key="node.path" :node="node" :expanded="expanded" :selected="selected" @toggle="toggle" @select="selected = $event" />
  </div>
</template>
