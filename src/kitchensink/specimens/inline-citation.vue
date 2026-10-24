<script setup lang="ts">
import DarkOneInlineCitation, { type CitationSource } from '@/components/darkone/blocks/DarkOneInlineCitation.vue';
import SpecimenRow from '../SpecimenRow.vue';

const sources = {
  sdxl: {
    url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
    title: 'SDXL base 1.0',
    description: 'The model card: a base at 1024 pixels, meant to hand off to the refiner.',
  },
  refiner: {
    url: 'https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0',
    title: 'SDXL refiner 1.0',
    description: 'Denoises the last steps of a base latent for finer detail.',
  },
  flux: {
    url: 'https://huggingface.co/black-forest-labs/FLUX.1-dev',
    title: 'FLUX.1 dev',
    description: 'A guidance-distilled model, so it runs at a CFG of 1.',
  },
  comfy: {
    url: 'https://docs.comfy.org/tutorials/basic/lora',
    title: 'LoRA',
    description: 'Load a LoRA between the checkpoint and the sampler.',
  },
} satisfies Record<string, CitationSource>;
</script>

<template>
  <SpecimenRow label="In a reply">
    <div class="flex max-w-md flex-col gap-3 text-sm leading-relaxed">
      <p>
        SDXL renders at 1024 pixels, and does its best work when the refiner takes the last fifth of the steps.
        <DarkOneInlineCitation :source="sources.sdxl" />
        <DarkOneInlineCitation :source="sources.refiner" />
      </p>
      <p>
        Flux dev needs no negative prompt, and a CFG above 1 burns the image. <DarkOneInlineCitation :source="sources.flux" /> The film grain LoRA loads
        after the checkpoint, at 0.6 to 0.8. <DarkOneInlineCitation :source="sources.comfy" />
      </p>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Numbered">
    <p class="max-w-md text-sm leading-relaxed">
      The refiner adds detail but shifts colour a little, so run it at a low denoise.
      <DarkOneInlineCitation :source="sources.refiner">1</DarkOneInlineCitation>
    </p>
  </SpecimenRow>
</template>
