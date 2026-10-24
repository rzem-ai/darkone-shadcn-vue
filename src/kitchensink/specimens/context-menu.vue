<script setup lang="ts">
import { ref } from 'vue';
import { Copy, Play, Trash2 } from '@lucide/vue';
import {
  DarkOneContextMenu,
  DarkOneContextMenuCheckboxItem,
  DarkOneContextMenuContent,
  DarkOneContextMenuItem,
  DarkOneContextMenuLabel,
  DarkOneContextMenuRadioGroup,
  DarkOneContextMenuRadioItem,
  DarkOneContextMenuSeparator,
  DarkOneContextMenuShortcut,
  DarkOneContextMenuSub,
  DarkOneContextMenuSubContent,
  DarkOneContextMenuSubTrigger,
  DarkOneContextMenuTrigger,
} from '@/components/darkone/context-menu';
import SpecimenRow from '../SpecimenRow.vue';

const favourite = ref(false);
const rating = ref('none');
</script>

<template>
  <SpecimenRow label="On an image">
    <DarkOneContextMenu>
      <DarkOneContextMenuTrigger
        class="flex h-32 w-56 items-center justify-center border border-dashed border-darkone-field-border bg-darkone-field text-xs text-muted-foreground">
        Right-click image 3 of run 2041
      </DarkOneContextMenuTrigger>
      <DarkOneContextMenuContent class="w-56">
        <DarkOneContextMenuItem><Play />Vary this image<DarkOneContextMenuShortcut>V</DarkOneContextMenuShortcut></DarkOneContextMenuItem>
        <DarkOneContextMenuItem><Copy />Copy seed<DarkOneContextMenuShortcut>⌘C</DarkOneContextMenuShortcut></DarkOneContextMenuItem>
        <DarkOneContextMenuSub>
          <DarkOneContextMenuSubTrigger>Send to</DarkOneContextMenuSubTrigger>
          <DarkOneContextMenuSubContent>
            <DarkOneContextMenuItem>Img2img</DarkOneContextMenuItem>
            <DarkOneContextMenuItem>Inpaint</DarkOneContextMenuItem>
            <DarkOneContextMenuItem>Upscaler</DarkOneContextMenuItem>
          </DarkOneContextMenuSubContent>
        </DarkOneContextMenuSub>
        <DarkOneContextMenuSeparator />
        <DarkOneContextMenuCheckboxItem v-model="favourite">Favourite</DarkOneContextMenuCheckboxItem>
        <DarkOneContextMenuLabel>Rating</DarkOneContextMenuLabel>
        <DarkOneContextMenuRadioGroup v-model="rating">
          <DarkOneContextMenuRadioItem value="none">Unrated</DarkOneContextMenuRadioItem>
          <DarkOneContextMenuRadioItem value="keep">Keep</DarkOneContextMenuRadioItem>
          <DarkOneContextMenuRadioItem value="reject">Reject</DarkOneContextMenuRadioItem>
        </DarkOneContextMenuRadioGroup>
        <DarkOneContextMenuSeparator />
        <DarkOneContextMenuItem variant="destructive"><Trash2 />Delete image</DarkOneContextMenuItem>
      </DarkOneContextMenuContent>
    </DarkOneContextMenu>
  </SpecimenRow>
</template>
