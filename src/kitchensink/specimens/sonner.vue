<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneToaster, toast } from '@/components/darkone/sonner';
import SpecimenRow from '../SpecimenRow.vue';

function deleteRun() {
  toast('Run 1040 deleted', { action: { label: 'Undo', onClick: () => toast('Run 1040 restored') } });
}

function upscale() {
  toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
    loading: 'Upscaling 4 images to 2048 pixels',
    success: 'Upscaled, saved to outputs/upscaled',
    error: 'Upscale failed',
  });
}
</script>

<template>
  <DarkOneToaster />
  <SpecimenRow label="Types">
    <DarkOneButton @click="toast('Queued 4 images', { description: 'SDXL base, seed 1024' })">Default</DarkOneButton>
    <DarkOneButton @click="toast.success('Run 1042 finished', { description: '12 images in 3 min 41 s' })">Success</DarkOneButton>
    <DarkOneButton @click="toast.info('The refiner is off')">Info</DarkOneButton>
    <DarkOneButton @click="toast.warning('VRAM is near its limit', { description: '15.1 of 16 GB reserved' })">Warning</DarkOneButton>
    <DarkOneButton @click="toast.error('CUDA out of memory', { description: 'Tried to allocate 2.00 GiB' })">Error</DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="With an action">
    <DarkOneButton @click="deleteRun">Delete run</DarkOneButton>
  </SpecimenRow>
  <SpecimenRow label="Promise">
    <DarkOneButton @click="upscale">Upscale</DarkOneButton>
  </SpecimenRow>
</template>
