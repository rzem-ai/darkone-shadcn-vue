<script setup lang="ts">
import { FileCodeIcon } from '@lucide/vue';
import { computed } from 'vue';
import { DarkOneCodeBlock, DarkOneCodeBlockActions, DarkOneCodeBlockContent, DarkOneCodeBlockCopyButton, DarkOneCodeBlockHeader, DarkOneCodeBlockLine, DarkOneCodeBlockTitle, DarkOneCodeBlockToken, useHighlightedCode } from '@/components/darkone/code-block';
import type { SourceFile } from './catalogue';

/** One file, highlighted, with its path and a copy action. */
const props = defineProps<{ file: SourceFile }>();
const language = computed(() => (props.file.path.endsWith('.vue') ? 'vue' : 'ts'));
const lines = useHighlightedCode(() => props.file.code, language);
</script>

<template>
  <DarkOneCodeBlock size="sm">
    <DarkOneCodeBlockHeader>
      <DarkOneCodeBlockTitle>
        <FileCodeIcon />
        {{ props.file.path }}
      </DarkOneCodeBlockTitle>
      <DarkOneCodeBlockActions>
        <DarkOneCodeBlockCopyButton :value="props.file.code" />
      </DarkOneCodeBlockActions>
    </DarkOneCodeBlockHeader>
    <DarkOneCodeBlockContent line-numbers class="max-h-[32rem]">
      <DarkOneCodeBlockLine v-for="(line, index) in lines" :key="index">
        <DarkOneCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
      </DarkOneCodeBlockLine>
    </DarkOneCodeBlockContent>
  </DarkOneCodeBlock>
</template>
