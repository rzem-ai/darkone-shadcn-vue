<script setup lang="ts">
import { CheckIcon, CircleDashedIcon, FileCodeIcon, FlaskConicalIcon, XIcon } from '@lucide/vue';
import { computed } from 'vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneCodeBlock, DarkOneCodeBlockContent } from '@/components/darkone/code-block';
import { DarkOneMessage, DarkOneMessageContent } from '@/components/darkone/message';
import {
  DarkOneTrace,
  DarkOneTraceCollapsible,
  DarkOneTraceCollapsibleContent,
  DarkOneTraceCollapsibleTrigger,
  DarkOneTraceIcon,
  DarkOneTraceLine,
  DarkOneTraceTitle,
} from '@/components/darkone/trace';

export interface TestCase {
  name: string;
  status: 'passed' | 'failed' | 'skipped';
  error?: string;
}

export interface TestSuite {
  name: string;
  tests: TestCase[];
}

/** A test-run tool part, in the AI SDK's shape. */
export interface TestRunPart {
  toolCallId: string;
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
  input: { command: string };
  output?: { suites: TestSuite[] };
}

const props = defineProps<{
  part?: TestRunPart;
  question?: string;
  answer?: string;
  /** The chat is streaming, so a run with no output is running rather than failed. */
  streaming?: boolean;
}>();

function countTests(tests: TestCase[]) {
  return {
    total: tests.length,
    failed: tests.filter((test) => test.status === 'failed').length,
    skipped: tests.filter((test) => test.status === 'skipped').length,
  };
}

function formatCounts({ total, failed, skipped }: ReturnType<typeof countTests>) {
  return [`${total} tests`, failed > 0 && `${failed} failed`, skipped > 0 && `${skipped} skipped`].filter(Boolean).join(', ');
}

const suites = computed(() => (props.part?.output?.suites ?? []).map((suite) => ({ ...suite, counts: countTests(suite.tests) })));
const summary = computed(() => countTests(suites.value.flatMap((suite) => suite.tests)));
const running = computed(() => props.streaming && props.part?.state !== 'output-error');
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-4 text-sm">
    <DarkOneMessage v-if="props.question" align="end">
      <DarkOneMessageContent>
        <DarkOneBubble align="end" variant="muted">
          <DarkOneBubbleContent>{{ props.question }}</DarkOneBubbleContent>
        </DarkOneBubble>
      </DarkOneMessageContent>
    </DarkOneMessage>
    <DarkOneMessage v-if="props.part || props.answer">
      <DarkOneMessageContent class="gap-4">
        <DarkOneTrace v-if="props.part">
          <!-- Kept mounted when shut, so a suite's open state survives closing the run. -->
          <DarkOneTraceCollapsible v-if="props.part.state === 'output-available'" :default-open="summary.failed > 0" :unmount-on-hide="false">
            <DarkOneTraceCollapsibleTrigger>
              <DarkOneTraceLine :status="summary.failed > 0 ? 'error' : undefined">
                <DarkOneTraceIcon><FlaskConicalIcon /></DarkOneTraceIcon>
                <DarkOneTraceTitle>Ran {{ formatCounts(summary) }}</DarkOneTraceTitle>
              </DarkOneTraceLine>
            </DarkOneTraceCollapsibleTrigger>
            <DarkOneTraceCollapsibleContent>
              <DarkOneTrace>
                <DarkOneTraceCollapsible v-for="suite in suites" :key="suite.name" :default-open="suite.counts.failed > 0" :unmount-on-hide="false">
                  <DarkOneTraceCollapsibleTrigger>
                    <DarkOneTraceLine :status="suite.counts.failed > 0 ? 'error' : undefined">
                      <DarkOneTraceIcon><FileCodeIcon /></DarkOneTraceIcon>
                      <DarkOneTraceTitle>{{ suite.name }}, {{ formatCounts(suite.counts) }}</DarkOneTraceTitle>
                    </DarkOneTraceLine>
                  </DarkOneTraceCollapsibleTrigger>
                  <DarkOneTraceCollapsibleContent>
                    <DarkOneTrace>
                      <template v-for="test in suite.tests" :key="test.name">
                        <DarkOneTraceCollapsible v-if="test.status === 'failed'" default-open>
                          <DarkOneTraceCollapsibleTrigger>
                            <DarkOneTraceLine status="error">
                              <DarkOneTraceIcon><XIcon /></DarkOneTraceIcon>
                              <DarkOneTraceTitle>{{ test.name }}</DarkOneTraceTitle>
                            </DarkOneTraceLine>
                          </DarkOneTraceCollapsibleTrigger>
                          <DarkOneTraceCollapsibleContent>
                            <DarkOneCodeBlock size="sm">
                              <DarkOneCodeBlockContent wrap class="max-h-64">{{ test.error }}</DarkOneCodeBlockContent>
                            </DarkOneCodeBlock>
                          </DarkOneTraceCollapsibleContent>
                        </DarkOneTraceCollapsible>
                        <DarkOneTraceLine v-else>
                          <DarkOneTraceIcon>
                            <CircleDashedIcon v-if="test.status === 'skipped'" />
                            <CheckIcon v-else />
                          </DarkOneTraceIcon>
                          <DarkOneTraceTitle>{{ test.status === 'skipped' ? `Skipped ${test.name}` : test.name }}</DarkOneTraceTitle>
                        </DarkOneTraceLine>
                      </template>
                    </DarkOneTrace>
                  </DarkOneTraceCollapsibleContent>
                </DarkOneTraceCollapsible>
              </DarkOneTrace>
            </DarkOneTraceCollapsibleContent>
          </DarkOneTraceCollapsible>
          <DarkOneTraceLine v-else :status="running ? 'running' : 'error'">
            <DarkOneTraceIcon><FlaskConicalIcon /></DarkOneTraceIcon>
            <DarkOneTraceTitle>{{ running ? 'Running' : 'Failed to run' }} {{ props.part.input.command }}</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTrace>
        <p v-if="props.answer" class="whitespace-pre-wrap">{{ props.answer }}</p>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </div>
</template>
