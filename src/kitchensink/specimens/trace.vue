<script setup lang="ts">
import { CircleAlertIcon, CircleCheckIcon, CircleIcon, FileCodeIcon, ImageIcon, LoaderCircleIcon, SearchIcon, TerminalIcon } from '@lucide/vue';
import { DarkOneCodeBlock, DarkOneCodeBlockContent } from '@/components/darkone/code-block';
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
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Statuses">
    <DarkOneTrace class="max-w-sm">
      <DarkOneTraceLine>
        <DarkOneTraceIcon><CircleCheckIcon /></DarkOneTraceIcon>
        <DarkOneTraceTitle>Loaded sdxl_base_1.0.safetensors</DarkOneTraceTitle>
      </DarkOneTraceLine>
      <DarkOneTraceLine status="error">
        <DarkOneTraceIcon><CircleAlertIcon /></DarkOneTraceIcon>
        <DarkOneTraceTitle>LoRA film-grain-v2 not found</DarkOneTraceTitle>
      </DarkOneTraceLine>
      <DarkOneTraceLine status="running">
        <DarkOneTraceIcon><LoaderCircleIcon class="animate-spin" /></DarkOneTraceIcon>
        <DarkOneTraceTitle>Sampling, step 14 of 28</DarkOneTraceTitle>
      </DarkOneTraceLine>
      <DarkOneTraceLine status="pending">
        <DarkOneTraceIcon><CircleIcon /></DarkOneTraceIcon>
        <DarkOneTraceTitle>Upscale with 4x-UltraSharp</DarkOneTraceTitle>
      </DarkOneTraceLine>
    </DarkOneTrace>
  </SpecimenRow>
  <SpecimenRow label="An agent run">
    <DarkOneTrace class="max-w-md">
      <button type="button">
        <DarkOneTraceLine>
          <DarkOneTraceIcon><FileCodeIcon /></DarkOneTraceIcon>
          <DarkOneTraceTitle>Read workflows/portrait.json</DarkOneTraceTitle>
          <DarkOneTraceDescription>14 nodes</DarkOneTraceDescription>
        </DarkOneTraceLine>
      </button>
      <DarkOneTraceLine>
        <DarkOneTraceIcon><SearchIcon /></DarkOneTraceIcon>
        <DarkOneTraceTitle>Searched models for "film grain"</DarkOneTraceTitle>
        <DarkOneTraceDescription>3 matches</DarkOneTraceDescription>
      </DarkOneTraceLine>
      <DarkOneTraceLine>
        <DarkOneTraceIcon><ImageIcon /></DarkOneTraceIcon>
        <DarkOneTraceTitle>Queued 4 renders, seeds 1024 to 1027</DarkOneTraceTitle>
        <DarkOneTraceDescription>0.4s</DarkOneTraceDescription>
      </DarkOneTraceLine>
      <DarkOneTraceLine status="running">
        <DarkOneTraceIcon><LoaderCircleIcon class="animate-spin" /></DarkOneTraceIcon>
        <DarkOneTraceTitle>Waiting on run 4e1a</DarkOneTraceTitle>
        <DarkOneTraceDescription>12s</DarkOneTraceDescription>
      </DarkOneTraceLine>
    </DarkOneTrace>
  </SpecimenRow>
  <SpecimenRow label="Collapsible, tool output">
    <div class="w-full max-w-md">
      <DarkOneTraceCollapsible default-open>
        <DarkOneTraceCollapsibleTrigger>
          <DarkOneTraceLine>
            <DarkOneTraceIcon><TerminalIcon /></DarkOneTraceIcon>
            <DarkOneTraceTitle>Ran comfy node list --installed</DarkOneTraceTitle>
            <DarkOneTraceDescription>1.2s</DarkOneTraceDescription>
          </DarkOneTraceLine>
        </DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceCollapsibleContent>
          <DarkOneCodeBlock size="sm">
            <DarkOneCodeBlockContent>{{ 'ComfyUI-Impact-Pack  8.4.1\nComfyUI-KJNodes      1.1.2\nrgthree-comfy        1.0.0' }}</DarkOneCodeBlockContent>
          </DarkOneCodeBlock>
        </DarkOneTraceCollapsibleContent>
      </DarkOneTraceCollapsible>
      <DarkOneTraceCollapsible>
        <DarkOneTraceCollapsibleTrigger>
          <DarkOneTraceLine status="error">
            <DarkOneTraceIcon><CircleAlertIcon /></DarkOneTraceIcon>
            <DarkOneTraceTitle>Ran render --workflow portrait --batch 8</DarkOneTraceTitle>
          </DarkOneTraceLine>
        </DarkOneTraceCollapsibleTrigger>
        <DarkOneTraceCollapsibleContent>CUDA out of memory at batch 8. Retrying the batch at 4 halves VRAM use.</DarkOneTraceCollapsibleContent>
      </DarkOneTraceCollapsible>
    </div>
  </SpecimenRow>
</template>
