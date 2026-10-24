<script setup lang="ts">
import {
  DarkOneAlertDialog,
  DarkOneAlertDialogAction,
  DarkOneAlertDialogCancel,
  DarkOneAlertDialogContent,
  DarkOneAlertDialogDescription,
  DarkOneAlertDialogFooter,
  DarkOneAlertDialogHeader,
  DarkOneAlertDialogTitle,
  DarkOneAlertDialogTrigger,
  DarkOneButton,
} from '@/components/darkone';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Confirm">
    <DarkOneAlertDialog>
      <DarkOneAlertDialogTrigger as-child>
        <DarkOneButton variant="destructive">Delete run</DarkOneButton>
      </DarkOneAlertDialogTrigger>
      <DarkOneAlertDialogContent>
        <DarkOneAlertDialogHeader>
          <DarkOneAlertDialogTitle>Delete this run?</DarkOneAlertDialogTitle>
          <DarkOneAlertDialogDescription>Its 12 images go with it. This cannot be undone.</DarkOneAlertDialogDescription>
        </DarkOneAlertDialogHeader>
        <DarkOneAlertDialogFooter>
          <DarkOneAlertDialogCancel>Keep it</DarkOneAlertDialogCancel>
          <DarkOneAlertDialogAction>Delete</DarkOneAlertDialogAction>
        </DarkOneAlertDialogFooter>
      </DarkOneAlertDialogContent>
    </DarkOneAlertDialog>
  </SpecimenRow>
</template>
