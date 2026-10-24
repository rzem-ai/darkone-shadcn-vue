<script setup lang="ts">
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent, DarkOneBubbleGroup, DarkOneBubbleReactions } from '@/components/darkone/bubble';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Variants">
    <div class="flex w-full max-w-sm flex-col gap-2">
      <DarkOneBubble><DarkOneBubbleContent>Render the portrait at 1024 with Euler a.</DarkOneBubbleContent></DarkOneBubble>
      <DarkOneBubble variant="secondary"><DarkOneBubbleContent>Queued as run 4e1a.</DarkOneBubbleContent></DarkOneBubble>
      <DarkOneBubble variant="muted"><DarkOneBubbleContent>Seed 1024, 28 steps, CFG 6.5.</DarkOneBubbleContent></DarkOneBubble>
      <DarkOneBubble variant="tinted"><DarkOneBubbleContent>The refiner adds detail at the last 20% of steps.</DarkOneBubbleContent></DarkOneBubble>
      <DarkOneBubble variant="outline"><DarkOneBubbleContent>Two LoRAs are loaded.</DarkOneBubbleContent></DarkOneBubble>
      <DarkOneBubble variant="ghost"><DarkOneBubbleContent>Ghost text runs full width, with no surface, as an assistant reply often does.</DarkOneBubbleContent></DarkOneBubble>
      <DarkOneBubble variant="destructive"><DarkOneBubbleContent>CUDA out of memory at batch 8.</DarkOneBubbleContent></DarkOneBubble>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Aligned, grouped">
    <div class="flex w-full max-w-sm flex-col gap-3">
      <DarkOneBubbleGroup>
        <DarkOneBubble align="end"><DarkOneBubbleContent>Try four seeds.</DarkOneBubbleContent></DarkOneBubble>
        <DarkOneBubble align="end"><DarkOneBubbleContent>And drop the film grain LoRA.</DarkOneBubbleContent></DarkOneBubble>
      </DarkOneBubbleGroup>
      <DarkOneBubble variant="muted"><DarkOneBubbleContent>Queued seeds 1024 to 1027 without film-grain-v2.</DarkOneBubbleContent></DarkOneBubble>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Reactions">
    <div class="flex w-full max-w-sm flex-col gap-8 py-4">
      <DarkOneBubble variant="muted" align="end">
        <DarkOneBubbleContent>Seed 1026 is the keeper.</DarkOneBubbleContent>
        <DarkOneBubbleReactions align="start" role="img" aria-label="Reactions: 2 approvals">+2</DarkOneBubbleReactions>
      </DarkOneBubble>
      <DarkOneBubble variant="destructive">
        <DarkOneBubbleContent>This deletes 112 cached latents. Run it?</DarkOneBubbleContent>
        <DarkOneBubbleReactions>
          <DarkOneButton variant="ghost">Yes, delete</DarkOneButton>
        </DarkOneBubbleReactions>
      </DarkOneBubble>
    </div>
  </SpecimenRow>
  <SpecimenRow label="As a button">
    <DarkOneBubble variant="outline">
      <DarkOneBubbleContent as="button" type="button">Show the 4 renders</DarkOneBubbleContent>
    </DarkOneBubble>
  </SpecimenRow>
</template>
