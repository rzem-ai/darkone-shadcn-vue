<script setup lang="ts">
import { CheckIcon, ClockIcon, FileCodeIcon, FileWarningIcon, LoaderCircleIcon, RefreshCwIcon, XIcon } from '@lucide/vue';
import {
  DarkOneAttachment,
  DarkOneAttachmentAction,
  DarkOneAttachmentActions,
  DarkOneAttachmentContent,
  DarkOneAttachmentDescription,
  DarkOneAttachmentGroup,
  DarkOneAttachmentMedia,
  DarkOneAttachmentTitle,
  DarkOneAttachmentTrigger,
} from '@/components/darkone/attachment';
import SpecimenRow from '../SpecimenRow.vue';

// Stand-ins for rendered outputs, so the specimen needs no image files.
const render = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 55% 55%)"/><stop offset="1" stop-color="hsl(${hue + 60} 45% 25%)"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/></svg>`)}`;
const outputs = [
  { seed: 1024, hue: 210 },
  { seed: 1025, hue: 280 },
  { seed: 1026, hue: 20 },
  { seed: 1027, hue: 140 },
];
</script>

<template>
  <SpecimenRow label="States">
    <div class="flex w-full max-w-sm flex-col gap-2">
      <DarkOneAttachment state="idle" class="w-full">
        <DarkOneAttachmentMedia><ClockIcon /></DarkOneAttachmentMedia>
        <DarkOneAttachmentContent>
          <DarkOneAttachmentTitle>portrait-mask.png</DarkOneAttachmentTitle>
          <DarkOneAttachmentDescription>Ready to upload</DarkOneAttachmentDescription>
        </DarkOneAttachmentContent>
        <DarkOneAttachmentActions>
          <DarkOneAttachmentAction aria-label="Remove portrait-mask.png"><XIcon /></DarkOneAttachmentAction>
        </DarkOneAttachmentActions>
      </DarkOneAttachment>
      <DarkOneAttachment state="uploading" class="w-full">
        <DarkOneAttachmentMedia><LoaderCircleIcon class="animate-spin" /></DarkOneAttachmentMedia>
        <DarkOneAttachmentContent>
          <DarkOneAttachmentTitle>film-grain-v2.safetensors</DarkOneAttachmentTitle>
          <DarkOneAttachmentDescription>Uploading, 64%</DarkOneAttachmentDescription>
        </DarkOneAttachmentContent>
        <DarkOneAttachmentActions>
          <DarkOneAttachmentAction aria-label="Cancel upload"><XIcon /></DarkOneAttachmentAction>
        </DarkOneAttachmentActions>
      </DarkOneAttachment>
      <DarkOneAttachment state="processing" class="w-full">
        <DarkOneAttachmentMedia><FileCodeIcon /></DarkOneAttachmentMedia>
        <DarkOneAttachmentContent>
          <DarkOneAttachmentTitle>portrait.json</DarkOneAttachmentTitle>
          <DarkOneAttachmentDescription>Reading 14 nodes</DarkOneAttachmentDescription>
        </DarkOneAttachmentContent>
      </DarkOneAttachment>
      <DarkOneAttachment state="error" class="w-full">
        <DarkOneAttachmentMedia><FileWarningIcon /></DarkOneAttachmentMedia>
        <DarkOneAttachmentContent>
          <DarkOneAttachmentTitle>upscale-4x.pth</DarkOneAttachmentTitle>
          <DarkOneAttachmentDescription>Unsupported format</DarkOneAttachmentDescription>
        </DarkOneAttachmentContent>
        <DarkOneAttachmentActions>
          <DarkOneAttachmentAction aria-label="Retry upload"><RefreshCwIcon /></DarkOneAttachmentAction>
          <DarkOneAttachmentAction aria-label="Remove upscale-4x.pth"><XIcon /></DarkOneAttachmentAction>
        </DarkOneAttachmentActions>
      </DarkOneAttachment>
      <DarkOneAttachment class="w-full">
        <DarkOneAttachmentMedia><CheckIcon /></DarkOneAttachmentMedia>
        <DarkOneAttachmentContent>
          <DarkOneAttachmentTitle>reference-pose.png</DarkOneAttachmentTitle>
          <DarkOneAttachmentDescription>Uploaded, 1.8 MB</DarkOneAttachmentDescription>
        </DarkOneAttachmentContent>
        <DarkOneAttachmentActions>
          <DarkOneAttachmentAction aria-label="Remove reference-pose.png"><XIcon /></DarkOneAttachmentAction>
        </DarkOneAttachmentActions>
      </DarkOneAttachment>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Sizes">
    <DarkOneAttachment v-for="size in ['default', 'sm', 'xs'] as const" :key="size" :size="size">
      <DarkOneAttachmentMedia><FileCodeIcon /></DarkOneAttachmentMedia>
      <DarkOneAttachmentContent>
        <DarkOneAttachmentTitle>portrait.json</DarkOneAttachmentTitle>
        <DarkOneAttachmentDescription>{{ size }}</DarkOneAttachmentDescription>
      </DarkOneAttachmentContent>
    </DarkOneAttachment>
  </SpecimenRow>
  <SpecimenRow label="Outputs, openable">
    <DarkOneAttachmentGroup class="w-full max-w-md">
      <DarkOneAttachment v-for="output in outputs" :key="output.seed" orientation="vertical">
        <DarkOneAttachmentMedia variant="image"><img :src="render(output.hue)" :alt="`Render, seed ${output.seed}`" /></DarkOneAttachmentMedia>
        <DarkOneAttachmentContent>
          <DarkOneAttachmentTitle>seed {{ output.seed }}</DarkOneAttachmentTitle>
          <DarkOneAttachmentDescription>1024 x 1024</DarkOneAttachmentDescription>
        </DarkOneAttachmentContent>
        <DarkOneAttachmentTrigger :aria-label="`Open seed ${output.seed}`" />
      </DarkOneAttachment>
    </DarkOneAttachmentGroup>
  </SpecimenRow>
</template>
