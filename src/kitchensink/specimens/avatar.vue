<script setup lang="ts">
import { DarkOneAvatar, DarkOneAvatarFallback, DarkOneAvatarImage } from '@/components/darkone/avatar';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Image">
    <DarkOneAvatar>
      <DarkOneAvatarImage src="https://github.com/rzem-ai.png" alt="rzem-ai" />
      <DarkOneAvatarFallback>RA</DarkOneAvatarFallback>
    </DarkOneAvatar>
  </SpecimenRow>
  <SpecimenRow label="Fallback">
    <DarkOneAvatar>
      <DarkOneAvatarFallback>JK</DarkOneAvatarFallback>
    </DarkOneAvatar>
    <DarkOneAvatar>
      <DarkOneAvatarImage src="/missing.png" alt="Mira T." />
      <DarkOneAvatarFallback>MT</DarkOneAvatarFallback>
    </DarkOneAvatar>
  </SpecimenRow>
  <SpecimenRow label="Sizes">
    <DarkOneAvatar class="size-6">
      <DarkOneAvatarFallback>S</DarkOneAvatarFallback>
    </DarkOneAvatar>
    <DarkOneAvatar>
      <DarkOneAvatarFallback>MD</DarkOneAvatarFallback>
    </DarkOneAvatar>
    <DarkOneAvatar class="size-10">
      <DarkOneAvatarFallback>LG</DarkOneAvatarFallback>
    </DarkOneAvatar>
  </SpecimenRow>
  <SpecimenRow label="Group, a run's collaborators">
    <div class="flex -space-x-1">
      <DarkOneAvatar v-for="initials in ['JK', 'MT', 'AR', 'LS']" :key="initials" class="ring-2 ring-background">
        <DarkOneAvatarFallback>{{ initials }}</DarkOneAvatarFallback>
      </DarkOneAvatar>
    </div>
  </SpecimenRow>
</template>
