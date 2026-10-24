<script setup lang="ts">
import {
  DarkOneBreadcrumb,
  DarkOneBreadcrumbEllipsis,
  DarkOneBreadcrumbItem,
  DarkOneBreadcrumbLink,
  DarkOneBreadcrumbList,
  DarkOneBreadcrumbPage,
  DarkOneBreadcrumbSeparator,
} from '@/components/darkone/breadcrumb';
import SpecimenRow from '../SpecimenRow.vue';
</script>

<template>
  <SpecimenRow label="Path">
    <DarkOneBreadcrumb>
      <DarkOneBreadcrumbList>
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbLink href="#darkone-breadcrumb">Studio</DarkOneBreadcrumbLink></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator />
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbLink href="#darkone-breadcrumb">Runs</DarkOneBreadcrumbLink></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator />
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbPage class="font-mono">run-0412</DarkOneBreadcrumbPage></DarkOneBreadcrumbItem>
      </DarkOneBreadcrumbList>
    </DarkOneBreadcrumb>
  </SpecimenRow>
  <SpecimenRow label="Collapsed">
    <DarkOneBreadcrumb>
      <DarkOneBreadcrumbList>
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbLink href="#darkone-breadcrumb">Studio</DarkOneBreadcrumbLink></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator />
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbEllipsis /></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator />
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbLink href="#darkone-breadcrumb">LoRAs</DarkOneBreadcrumbLink></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator />
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbPage>film-grain-v2</DarkOneBreadcrumbPage></DarkOneBreadcrumbItem>
      </DarkOneBreadcrumbList>
    </DarkOneBreadcrumb>
  </SpecimenRow>
  <SpecimenRow label="Custom separator">
    <DarkOneBreadcrumb>
      <DarkOneBreadcrumbList class="font-mono">
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbLink href="#darkone-breadcrumb">models</DarkOneBreadcrumbLink></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator>/</DarkOneBreadcrumbSeparator>
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbLink href="#darkone-breadcrumb">checkpoints</DarkOneBreadcrumbLink></DarkOneBreadcrumbItem>
        <DarkOneBreadcrumbSeparator>/</DarkOneBreadcrumbSeparator>
        <DarkOneBreadcrumbItem><DarkOneBreadcrumbPage>sdxl-base-1.0.safetensors</DarkOneBreadcrumbPage></DarkOneBreadcrumbItem>
      </DarkOneBreadcrumbList>
    </DarkOneBreadcrumb>
  </SpecimenRow>
</template>
