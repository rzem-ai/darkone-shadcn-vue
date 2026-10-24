<script setup lang="ts">
import { FileCodeIcon } from '@lucide/vue';
import {
  DarkOneCodeBlock,
  DarkOneCodeBlockActions,
  DarkOneCodeBlockContent,
  DarkOneCodeBlockCopyButton,
  DarkOneCodeBlockHeader,
  DarkOneCodeBlockLine,
  DarkOneCodeBlockTitle,
  DarkOneCodeBlockToken,
  useHighlightedCode,
} from '@/components/darkone/code-block';
import SpecimenRow from '../SpecimenRow.vue';

const workflow = `{
  "sampler": "euler_ancestral",
  "steps": 28,
  "cfg": 6.5,
  "seed": 1024
}`;
const lines = useHighlightedCode(workflow, 'json');
const diff = useHighlightedCode('steps: 20\nsteps: 28', 'yaml');
</script>

<template>
  <SpecimenRow label="With a header">
    <DarkOneCodeBlock class="max-w-md">
      <DarkOneCodeBlockHeader>
        <DarkOneCodeBlockTitle>
          <FileCodeIcon />
          workflows/portrait.json
        </DarkOneCodeBlockTitle>
        <DarkOneCodeBlockActions>
          <DarkOneCodeBlockCopyButton :value="workflow" />
        </DarkOneCodeBlockActions>
      </DarkOneCodeBlockHeader>
      <DarkOneCodeBlockContent line-numbers>
        <DarkOneCodeBlockLine v-for="(line, index) in lines" :key="index" :variant="index === 2 ? 'highlighted' : 'default'">
          <DarkOneCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </DarkOneCodeBlockLine>
      </DarkOneCodeBlockContent>
    </DarkOneCodeBlock>
  </SpecimenRow>
  <SpecimenRow label="Diff, small">
    <DarkOneCodeBlock size="sm" class="max-w-md">
      <DarkOneCodeBlockContent>
        <DarkOneCodeBlockLine v-for="(line, index) in diff" :key="index" :variant="index === 0 ? 'removed' : 'added'">
          <DarkOneCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </DarkOneCodeBlockLine>
      </DarkOneCodeBlockContent>
    </DarkOneCodeBlock>
  </SpecimenRow>
  <SpecimenRow label="Destructive">
    <DarkOneCodeBlock variant="destructive" size="sm" class="max-w-md">
      <DarkOneCodeBlockContent>CUDA out of memory: tried to allocate 2.00 GiB</DarkOneCodeBlockContent>
    </DarkOneCodeBlock>
  </SpecimenRow>
</template>
