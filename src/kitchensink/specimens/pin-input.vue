<script setup lang="ts">
import { ref } from 'vue';
import { DarkOnePinInput, DarkOnePinInputGroup, DarkOnePinInputSeparator, DarkOnePinInputSlot } from '@/components/darkone/pin-input';
import SpecimenRow from '../SpecimenRow.vue';

const pin = ref<string[]>([]);
</script>

<template>
  <SpecimenRow label="Pairing code">
    <DarkOnePinInput id="ks-pin-pair" v-model="pin" placeholder="○" aria-label="Render node pairing code">
      <DarkOnePinInputGroup>
        <DarkOnePinInputSlot v-for="index in 3" :key="index" :index="index - 1" />
      </DarkOnePinInputGroup>
      <DarkOnePinInputSeparator />
      <DarkOnePinInputGroup>
        <DarkOnePinInputSlot v-for="index in 3" :key="index" :index="index + 2" />
      </DarkOnePinInputGroup>
    </DarkOnePinInput>
    <span class="font-mono text-xs text-muted-foreground">{{ pin.join('') || 'empty' }}</span>
  </SpecimenRow>
  <SpecimenRow label="Invalid">
    <DarkOnePinInput :model-value="['7', '2', '0', '4']" aria-label="Rejected code">
      <DarkOnePinInputGroup>
        <DarkOnePinInputSlot v-for="index in 4" :key="index" :index="index - 1" aria-invalid="true" />
      </DarkOnePinInputGroup>
    </DarkOnePinInput>
  </SpecimenRow>
  <SpecimenRow label="Disabled">
    <DarkOnePinInput :model-value="['3', '1']" disabled aria-label="Locked code">
      <DarkOnePinInputGroup>
        <DarkOnePinInputSlot v-for="index in 4" :key="index" :index="index - 1" />
      </DarkOnePinInputGroup>
    </DarkOnePinInput>
  </SpecimenRow>
</template>
