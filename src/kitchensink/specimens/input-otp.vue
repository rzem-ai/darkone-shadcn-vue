<script setup lang="ts">
import { ref } from 'vue';
import { DarkOneInputOTP, DarkOneInputOTPGroup, DarkOneInputOTPSeparator, DarkOneInputOTPSlot } from '@/components/darkone/input-otp';
import SpecimenRow from '../SpecimenRow.vue';

const code = ref('');
</script>

<template>
  <SpecimenRow label="Six digits">
    <DarkOneInputOTP v-model="code" :maxlength="6" aria-label="Workspace sign-in code">
      <DarkOneInputOTPGroup>
        <DarkOneInputOTPSlot v-for="index in 3" :key="index" :index="index - 1" />
      </DarkOneInputOTPGroup>
      <DarkOneInputOTPSeparator />
      <DarkOneInputOTPGroup>
        <DarkOneInputOTPSlot v-for="index in 3" :key="index" :index="index + 2" />
      </DarkOneInputOTPGroup>
    </DarkOneInputOTP>
    <span class="font-mono text-xs text-muted-foreground">{{ code || 'empty' }}</span>
  </SpecimenRow>
  <SpecimenRow label="Invalid">
    <DarkOneInputOTP model-value="4821" :maxlength="4" aria-label="Expired code">
      <DarkOneInputOTPGroup>
        <DarkOneInputOTPSlot v-for="index in 4" :key="index" :index="index - 1" aria-invalid="true" />
      </DarkOneInputOTPGroup>
    </DarkOneInputOTP>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOneInputOTP model-value="90" :maxlength="4" disabled aria-label="Locked code">
      <DarkOneInputOTPGroup>
        <DarkOneInputOTPSlot v-for="index in 4" :key="index" :index="index - 1" />
      </DarkOneInputOTPGroup>
    </DarkOneInputOTP>
  </SpecimenRow>
</template>
