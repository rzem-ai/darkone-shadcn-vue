<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneDrawer, DarkOneDrawerClose, DarkOneDrawerContent, DarkOneDrawerDescription, DarkOneDrawerFooter, DarkOneDrawerHeader, DarkOneDrawerTitle, DarkOneDrawerTrigger } from '@/components/darkone/drawer';
import SpecimenRow from '../SpecimenRow.vue';

const queue = [
  { run: 'Run 2042', detail: 'SDXL base, 4 images, step 12 of 30' },
  { run: 'Run 2043', detail: 'SDXL base + refiner, 2 images, waiting' },
  { run: 'Run 2044', detail: 'SD 1.5, 8 images, waiting' },
];
</script>

<template>
  <SpecimenRow label="Bottom">
    <DarkOneDrawer>
      <DarkOneDrawerTrigger as-child>
        <DarkOneButton>Show queue</DarkOneButton>
      </DarkOneDrawerTrigger>
      <DarkOneDrawerContent>
        <div class="mx-auto w-full max-w-md">
          <DarkOneDrawerHeader>
            <DarkOneDrawerTitle>Queue</DarkOneDrawerTitle>
            <DarkOneDrawerDescription>3 runs, about 4 minutes.</DarkOneDrawerDescription>
          </DarkOneDrawerHeader>
          <ul class="grid px-4 text-sm">
            <li v-for="entry in queue" :key="entry.run" class="flex justify-between gap-4 border-b py-1.5 last:border-b-0">
              <span>{{ entry.run }}</span>
              <span class="text-muted-foreground">{{ entry.detail }}</span>
            </li>
          </ul>
          <DarkOneDrawerFooter>
            <DarkOneButton variant="destructive">Clear queue</DarkOneButton>
            <DarkOneDrawerClose as-child>
              <DarkOneButton>Close</DarkOneButton>
            </DarkOneDrawerClose>
          </DarkOneDrawerFooter>
        </div>
      </DarkOneDrawerContent>
    </DarkOneDrawer>
  </SpecimenRow>
  <SpecimenRow label="Right">
    <DarkOneDrawer direction="right">
      <DarkOneDrawerTrigger as-child>
        <DarkOneButton>Image details</DarkOneButton>
      </DarkOneDrawerTrigger>
      <DarkOneDrawerContent>
        <DarkOneDrawerHeader>
          <DarkOneDrawerTitle>Image 3 of run 2041</DarkOneDrawerTitle>
          <DarkOneDrawerDescription>Seed 1873404, 30 steps, euler a, CFG 7.</DarkOneDrawerDescription>
        </DarkOneDrawerHeader>
        <DarkOneDrawerFooter>
          <DarkOneButton variant="default">Upscale</DarkOneButton>
          <DarkOneDrawerClose as-child>
            <DarkOneButton>Close</DarkOneButton>
          </DarkOneDrawerClose>
        </DarkOneDrawerFooter>
      </DarkOneDrawerContent>
    </DarkOneDrawer>
  </SpecimenRow>
</template>
