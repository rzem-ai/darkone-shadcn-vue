<script setup lang="ts">
import { ref } from 'vue';
import DarkOneFileTree, { type FileTreeNode } from '@/components/darkone/blocks/DarkOneFileTree.vue';
import SpecimenRow from '../SpecimenRow.vue';

const workspace: FileTreeNode[] = [
  {
    type: 'folder',
    name: 'workflows',
    path: 'workflows',
    children: [
      { type: 'file', name: 'portrait.json', path: 'workflows/portrait.json' },
      { type: 'file', name: 'upscale-4x.json', path: 'workflows/upscale-4x.json' },
    ],
  },
  {
    type: 'folder',
    name: 'models',
    path: 'models',
    children: [
      {
        type: 'folder',
        name: 'loras',
        path: 'models/loras',
        children: [
          { type: 'file', name: 'film-grain-v2.safetensors', path: 'models/loras/film-grain-v2.safetensors' },
          { type: 'file', name: 'soft-light.safetensors', path: 'models/loras/soft-light.safetensors' },
        ],
      },
    ],
  },
  {
    type: 'folder',
    name: 'outputs',
    path: 'outputs',
    children: [
      { type: 'file', name: 'portrait_00012.png', path: 'outputs/portrait_00012.png' },
      { type: 'file', name: 'portrait_00013.png', path: 'outputs/portrait_00013.png' },
    ],
  },
];

const selected = ref('models/loras/film-grain-v2.safetensors');
const browsing = ref<string>();
</script>

<template>
  <SpecimenRow label="Changed files">
    <DarkOneFileTree v-model="selected" :nodes="workspace" class="max-w-xs" />
  </SpecimenRow>
  <SpecimenRow label="Partly collapsed">
    <DarkOneFileTree v-model="browsing" :nodes="workspace" :default-expanded="['workflows']" class="max-w-xs" />
  </SpecimenRow>
</template>
