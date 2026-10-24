<script setup lang="ts">
import DarkOneSources, { type Source } from '@/components/darkone/blocks/DarkOneSources.vue';
import SpecimenRow from '../SpecimenRow.vue';

// The agent cites the SDXL model card twice; it is listed once.
const sources: Source[] = [
  { url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0', title: 'stable-diffusion-xl-base-1.0 | huggingface.co' },
  { url: 'https://huggingface.co/madebyollin/sdxl-vae-fp16-fix', title: 'sdxl-vae-fp16-fix | huggingface.co' },
  { url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0', title: 'stable-diffusion-xl-base-1.0 | huggingface.co' },
  { url: 'https://huggingface.co/docs/diffusers/training/lora', title: 'LoRA | Diffusers docs' },
  { url: 'https://github.com/comfyanonymous/ComfyUI' },
];
</script>

<template>
  <SpecimenRow label="Model cards and docs">
    <div class="w-full max-w-md">
      <DarkOneSources :sources="sources" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="Collapsed">
    <div class="w-full max-w-md">
      <DarkOneSources :sources="sources" :default-open="false" />
    </div>
  </SpecimenRow>
  <SpecimenRow label="One source">
    <div class="w-full max-w-md">
      <DarkOneSources :sources="sources.slice(1, 2)" />
    </div>
  </SpecimenRow>
</template>
