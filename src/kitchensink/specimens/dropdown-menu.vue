<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Download, Ellipsis, Play, Trash2 } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import {
  DarkOneDropdownMenu,
  DarkOneDropdownMenuCheckboxItem,
  DarkOneDropdownMenuContent,
  DarkOneDropdownMenuGroup,
  DarkOneDropdownMenuItem,
  DarkOneDropdownMenuLabel,
  DarkOneDropdownMenuRadioGroup,
  DarkOneDropdownMenuRadioItem,
  DarkOneDropdownMenuSeparator,
  DarkOneDropdownMenuShortcut,
  DarkOneDropdownMenuSub,
  DarkOneDropdownMenuSubContent,
  DarkOneDropdownMenuSubTrigger,
  DarkOneDropdownMenuTrigger,
} from '@/components/darkone/dropdown-menu';
import SpecimenRow from '../SpecimenRow.vue';

const showSeeds = ref(true);
const showPrompts = ref(false);
const sort = ref('newest');
</script>

<template>
  <SpecimenRow label="Actions">
    <DarkOneDropdownMenu>
      <DarkOneDropdownMenuTrigger as-child>
        <DarkOneButton size="icon-sm" aria-label="Run actions"><Ellipsis class="size-3.5" /></DarkOneButton>
      </DarkOneDropdownMenuTrigger>
      <DarkOneDropdownMenuContent align="start" class="w-52">
        <DarkOneDropdownMenuLabel>Run 2041</DarkOneDropdownMenuLabel>
        <DarkOneDropdownMenuGroup>
          <DarkOneDropdownMenuItem><Play />Run again<DarkOneDropdownMenuShortcut>⌘R</DarkOneDropdownMenuShortcut></DarkOneDropdownMenuItem>
          <DarkOneDropdownMenuItem><Copy />Copy seed<DarkOneDropdownMenuShortcut>⌘C</DarkOneDropdownMenuShortcut></DarkOneDropdownMenuItem>
          <DarkOneDropdownMenuSub>
            <DarkOneDropdownMenuSubTrigger><Download />Download as</DarkOneDropdownMenuSubTrigger>
            <DarkOneDropdownMenuSubContent>
              <DarkOneDropdownMenuItem>PNG with metadata</DarkOneDropdownMenuItem>
              <DarkOneDropdownMenuItem>WebP</DarkOneDropdownMenuItem>
              <DarkOneDropdownMenuItem>Workflow JSON</DarkOneDropdownMenuItem>
            </DarkOneDropdownMenuSubContent>
          </DarkOneDropdownMenuSub>
          <DarkOneDropdownMenuItem disabled>Upscale (refiner busy)</DarkOneDropdownMenuItem>
        </DarkOneDropdownMenuGroup>
        <DarkOneDropdownMenuSeparator />
        <DarkOneDropdownMenuItem variant="destructive"><Trash2 />Delete run</DarkOneDropdownMenuItem>
      </DarkOneDropdownMenuContent>
    </DarkOneDropdownMenu>
  </SpecimenRow>
  <SpecimenRow label="Checkbox and radio">
    <DarkOneDropdownMenu>
      <DarkOneDropdownMenuTrigger as-child>
        <DarkOneButton>View</DarkOneButton>
      </DarkOneDropdownMenuTrigger>
      <DarkOneDropdownMenuContent align="start" class="w-48">
        <DarkOneDropdownMenuLabel>Show</DarkOneDropdownMenuLabel>
        <DarkOneDropdownMenuCheckboxItem v-model="showSeeds">Seeds</DarkOneDropdownMenuCheckboxItem>
        <DarkOneDropdownMenuCheckboxItem v-model="showPrompts">Prompts</DarkOneDropdownMenuCheckboxItem>
        <DarkOneDropdownMenuSeparator />
        <DarkOneDropdownMenuLabel>Sort</DarkOneDropdownMenuLabel>
        <DarkOneDropdownMenuRadioGroup v-model="sort">
          <DarkOneDropdownMenuRadioItem value="newest">Newest first</DarkOneDropdownMenuRadioItem>
          <DarkOneDropdownMenuRadioItem value="oldest">Oldest first</DarkOneDropdownMenuRadioItem>
          <DarkOneDropdownMenuRadioItem value="steps">Most steps</DarkOneDropdownMenuRadioItem>
        </DarkOneDropdownMenuRadioGroup>
      </DarkOneDropdownMenuContent>
    </DarkOneDropdownMenu>
  </SpecimenRow>
</template>
