<script setup lang="ts">
import {
  DarkOneNavigationMenu,
  DarkOneNavigationMenuContent,
  DarkOneNavigationMenuItem,
  DarkOneNavigationMenuLink,
  DarkOneNavigationMenuList,
  DarkOneNavigationMenuTrigger,
  darkOneNavigationMenuTriggerStyle,
} from '@/components/darkone/navigation-menu';
import SpecimenRow from '../SpecimenRow.vue';

const models = [
  { name: 'SDXL base', note: 'General purpose at 1024 pixels.' },
  { name: 'SDXL refiner', note: 'A second pass for fine detail.' },
  { name: 'Flux dev', note: 'Strong prompt adherence, slower.' },
];
const tools = [
  { name: 'Img2img', note: 'Start from an image and a strength.' },
  { name: 'Inpaint', note: 'Repaint a masked region.' },
  { name: 'Upscale', note: '2x or 4x with ESRGAN.' },
];
</script>

<template>
  <SpecimenRow label="With viewport">
    <DarkOneNavigationMenu>
      <DarkOneNavigationMenuList>
        <DarkOneNavigationMenuItem>
          <DarkOneNavigationMenuTrigger>Models</DarkOneNavigationMenuTrigger>
          <DarkOneNavigationMenuContent>
            <ul class="grid w-72 gap-px">
              <li v-for="model in models" :key="model.name">
                <DarkOneNavigationMenuLink href="#darkone-navigation-menu">
                  <div class="text-sm">{{ model.name }}</div>
                  <div class="text-xs text-muted-foreground">{{ model.note }}</div>
                </DarkOneNavigationMenuLink>
              </li>
            </ul>
          </DarkOneNavigationMenuContent>
        </DarkOneNavigationMenuItem>
        <DarkOneNavigationMenuItem>
          <DarkOneNavigationMenuTrigger>Tools</DarkOneNavigationMenuTrigger>
          <DarkOneNavigationMenuContent>
            <ul class="grid w-80 grid-cols-2 gap-px">
              <li v-for="tool in tools" :key="tool.name">
                <DarkOneNavigationMenuLink href="#darkone-navigation-menu">
                  <div class="text-sm">{{ tool.name }}</div>
                  <div class="text-xs text-muted-foreground">{{ tool.note }}</div>
                </DarkOneNavigationMenuLink>
              </li>
            </ul>
          </DarkOneNavigationMenuContent>
        </DarkOneNavigationMenuItem>
        <DarkOneNavigationMenuItem>
          <DarkOneNavigationMenuLink href="#darkone-navigation-menu" :class="darkOneNavigationMenuTriggerStyle()">Gallery</DarkOneNavigationMenuLink>
        </DarkOneNavigationMenuItem>
      </DarkOneNavigationMenuList>
    </DarkOneNavigationMenu>
  </SpecimenRow>
  <SpecimenRow label="Without viewport">
    <DarkOneNavigationMenu :viewport="false">
      <DarkOneNavigationMenuList>
        <DarkOneNavigationMenuItem>
          <DarkOneNavigationMenuTrigger>Runs</DarkOneNavigationMenuTrigger>
          <DarkOneNavigationMenuContent>
            <ul class="grid w-48 gap-px">
              <li><DarkOneNavigationMenuLink href="#darkone-navigation-menu">Queued</DarkOneNavigationMenuLink></li>
              <li><DarkOneNavigationMenuLink href="#darkone-navigation-menu">Finished</DarkOneNavigationMenuLink></li>
              <li><DarkOneNavigationMenuLink href="#darkone-navigation-menu">Failed</DarkOneNavigationMenuLink></li>
            </ul>
          </DarkOneNavigationMenuContent>
        </DarkOneNavigationMenuItem>
        <DarkOneNavigationMenuItem>
          <DarkOneNavigationMenuTrigger disabled>Training</DarkOneNavigationMenuTrigger>
        </DarkOneNavigationMenuItem>
      </DarkOneNavigationMenuList>
    </DarkOneNavigationMenu>
  </SpecimenRow>
</template>
