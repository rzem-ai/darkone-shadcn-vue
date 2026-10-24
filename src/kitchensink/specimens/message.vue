<script setup lang="ts">
import { BotIcon, CopyIcon, RotateCcwIcon } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneBubble, DarkOneBubbleContent } from '@/components/darkone/bubble';
import { DarkOneMessage, DarkOneMessageAvatar, DarkOneMessageContent, DarkOneMessageFooter, DarkOneMessageGroup, DarkOneMessageHeader } from '@/components/darkone/message';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Header and footer">
    <div class="flex w-full max-w-md flex-col gap-4">
      <DarkOneMessage align="end">
        <DarkOneMessageContent>
          <DarkOneBubble><DarkOneBubbleContent>Render the portrait workflow with four seeds.</DarkOneBubbleContent></DarkOneBubble>
          <DarkOneMessageFooter>Sent 14:02</DarkOneMessageFooter>
        </DarkOneMessageContent>
      </DarkOneMessage>
      <DarkOneMessage>
        <DarkOneMessageAvatar class="size-6"><BotIcon class="size-3.5" /></DarkOneMessageAvatar>
        <DarkOneMessageContent>
          <DarkOneMessageHeader>Studio agent</DarkOneMessageHeader>
          <DarkOneBubble variant="muted"><DarkOneBubbleContent>Queued seeds 1024 to 1027 on SDXL base, 28 steps.</DarkOneBubbleContent></DarkOneBubble>
          <DarkOneMessageFooter>
            <DarkOneButton variant="ghost" size="icon-xs" aria-label="Copy"><CopyIcon /></DarkOneButton>
            <DarkOneButton variant="ghost" size="icon-xs" aria-label="Retry"><RotateCcwIcon /></DarkOneButton>
          </DarkOneMessageFooter>
        </DarkOneMessageContent>
      </DarkOneMessage>
    </div>
  </SpecimenRow>
  <SpecimenRow label="Grouped">
    <DarkOneMessageGroup class="w-full max-w-md">
      <DarkOneMessage>
        <DarkOneMessageContent>
          <DarkOneMessageHeader>Studio agent</DarkOneMessageHeader>
          <DarkOneBubble variant="muted"><DarkOneBubbleContent>Run 4e1a finished in 38s.</DarkOneBubbleContent></DarkOneBubble>
        </DarkOneMessageContent>
      </DarkOneMessage>
      <DarkOneMessage>
        <DarkOneMessageContent>
          <DarkOneBubble variant="muted"><DarkOneBubbleContent>Seed 1026 scored highest on the aesthetic model.</DarkOneBubbleContent></DarkOneBubble>
        </DarkOneMessageContent>
      </DarkOneMessage>
    </DarkOneMessageGroup>
  </SpecimenRow>
  <SpecimenRow label="Ghost reply">
    <DarkOneMessage class="max-w-md">
      <DarkOneMessageContent>
        <DarkOneMessageHeader>Studio agent</DarkOneMessageHeader>
        <DarkOneBubble variant="ghost">
          <DarkOneBubbleContent>The portrait workflow chains SDXL base into the refiner at step 22, then upscales 4x. Swapping the sampler to DPM++ 2M Karras would cut it to 20 steps.</DarkOneBubbleContent>
        </DarkOneBubble>
      </DarkOneMessageContent>
    </DarkOneMessage>
  </SpecimenRow>
</template>
