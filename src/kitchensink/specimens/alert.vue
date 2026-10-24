<script setup lang="ts">
import { CircleCheckIcon, InfoIcon, OctagonXIcon, TriangleAlertIcon } from '@lucide/vue';
import { DarkOneAlert, DarkOneAlertDescription, DarkOneAlertTitle } from '@/components/darkone/alert';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Default">
    <DarkOneAlert class="max-w-md">
      <InfoIcon />
      <DarkOneAlertTitle>The refiner is off</DarkOneAlertTitle>
      <DarkOneAlertDescription>SDXL base renders alone at 1024 pixels. Turn the refiner on for finer skin and fabric.</DarkOneAlertDescription>
    </DarkOneAlert>
  </SpecimenRow>
  <SpecimenRow label="Positive">
    <DarkOneAlert tone="positive" class="max-w-md">
      <CircleCheckIcon />
      <DarkOneAlertTitle>Run 1042 finished</DarkOneAlertTitle>
      <DarkOneAlertDescription>12 images in 3 min 41 s, saved to outputs/portraits.</DarkOneAlertDescription>
    </DarkOneAlert>
  </SpecimenRow>
  <SpecimenRow label="Caution">
    <DarkOneAlert tone="caution" class="max-w-md">
      <TriangleAlertIcon />
      <DarkOneAlertTitle>VRAM is near its limit</DarkOneAlertTitle>
      <DarkOneAlertDescription>15.1 of 16 GB reserved. A larger batch may fall back to tiled decoding.</DarkOneAlertDescription>
    </DarkOneAlert>
  </SpecimenRow>
  <SpecimenRow label="Destructive">
    <DarkOneAlert variant="destructive" class="max-w-md">
      <OctagonXIcon />
      <DarkOneAlertTitle>CUDA out of memory</DarkOneAlertTitle>
      <DarkOneAlertDescription>Tried to allocate 2.00 GiB. Lower the batch size or the resolution.</DarkOneAlertDescription>
    </DarkOneAlert>
  </SpecimenRow>
  <SpecimenRow label="Title only">
    <DarkOneAlert class="max-w-md">
      <DarkOneAlertTitle>Seed locked at 1024</DarkOneAlertTitle>
    </DarkOneAlert>
  </SpecimenRow>
</template>
