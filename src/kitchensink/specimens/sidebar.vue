<script setup lang="ts">
import { BoxIcon, ChevronRightIcon, HistoryIcon, ImageUpIcon, LayersIcon, MoreHorizontalIcon, PlusIcon, SettingsIcon, SparklesIcon, WandSparklesIcon } from '@lucide/vue';
import { DarkOneCollapsible, DarkOneCollapsibleContent, DarkOneCollapsibleTrigger } from '@/components/darkone/collapsible';
import {
  DarkOneSidebar,
  DarkOneSidebarContent,
  DarkOneSidebarFooter,
  DarkOneSidebarGroup,
  DarkOneSidebarGroupAction,
  DarkOneSidebarGroupContent,
  DarkOneSidebarGroupLabel,
  DarkOneSidebarHeader,
  DarkOneSidebarInput,
  DarkOneSidebarInset,
  DarkOneSidebarMenu,
  DarkOneSidebarMenuAction,
  DarkOneSidebarMenuBadge,
  DarkOneSidebarMenuButton,
  DarkOneSidebarMenuItem,
  DarkOneSidebarMenuSkeleton,
  DarkOneSidebarMenuSub,
  DarkOneSidebarMenuSubButton,
  DarkOneSidebarMenuSubItem,
  DarkOneSidebarProvider,
  DarkOneSidebarRail,
  DarkOneSidebarSeparator,
  DarkOneSidebarTrigger,
} from '@/components/darkone/sidebar';
import SpecimenRow from '../SpecimenRow.vue';

const create = [
  { title: 'Generate', icon: WandSparklesIcon, active: true },
  { title: 'Img2img', icon: ImageUpIcon, active: false },
  { title: 'Upscale', icon: SparklesIcon, active: false },
];
const models = ['SDXL base', 'SDXL refiner', 'Flux dev'];
</script>

<template>
  <SpecimenRow label="Collapsible to icons">
    <!-- Bounded for the kitchensink: the panel is absolute in this box, where an app lets it fill the viewport. -->
    <div class="relative h-[28rem] w-full max-w-3xl overflow-hidden border">
      <DarkOneSidebarProvider class="h-full min-h-0">
        <DarkOneSidebar collapsible="icon" class="absolute h-full">
          <DarkOneSidebarHeader>
            <DarkOneSidebarInput placeholder="Search runs" aria-label="Search runs" class="group-data-[collapsible=icon]:hidden" />
          </DarkOneSidebarHeader>
          <DarkOneSidebarContent>
            <DarkOneSidebarGroup>
              <DarkOneSidebarGroupLabel>Create</DarkOneSidebarGroupLabel>
              <DarkOneSidebarGroupAction title="New run"><PlusIcon /><span class="sr-only">New run</span></DarkOneSidebarGroupAction>
              <DarkOneSidebarGroupContent>
                <DarkOneSidebarMenu>
                  <DarkOneSidebarMenuItem v-for="item in create" :key="item.title">
                    <DarkOneSidebarMenuButton :is-active="item.active" :tooltip="item.title">
                      <component :is="item.icon" />
                      <span>{{ item.title }}</span>
                    </DarkOneSidebarMenuButton>
                  </DarkOneSidebarMenuItem>
                </DarkOneSidebarMenu>
              </DarkOneSidebarGroupContent>
            </DarkOneSidebarGroup>
            <DarkOneSidebarSeparator />
            <DarkOneSidebarGroup>
              <DarkOneSidebarGroupLabel>Library</DarkOneSidebarGroupLabel>
              <DarkOneSidebarGroupContent>
                <DarkOneSidebarMenu>
                  <DarkOneCollapsible as-child default-open class="group/collapsible">
                    <DarkOneSidebarMenuItem>
                      <DarkOneCollapsibleTrigger as-child>
                        <DarkOneSidebarMenuButton tooltip="Models">
                          <BoxIcon />
                          <span>Models</span>
                          <ChevronRightIcon class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </DarkOneSidebarMenuButton>
                      </DarkOneCollapsibleTrigger>
                      <DarkOneCollapsibleContent>
                        <DarkOneSidebarMenuSub>
                          <DarkOneSidebarMenuSubItem v-for="(model, index) in models" :key="model">
                            <DarkOneSidebarMenuSubButton href="#darkone-sidebar" :is-active="index === 0">
                              <span>{{ model }}</span>
                            </DarkOneSidebarMenuSubButton>
                          </DarkOneSidebarMenuSubItem>
                        </DarkOneSidebarMenuSub>
                      </DarkOneCollapsibleContent>
                    </DarkOneSidebarMenuItem>
                  </DarkOneCollapsible>
                  <DarkOneSidebarMenuItem>
                    <DarkOneSidebarMenuButton tooltip="LoRAs">
                      <LayersIcon />
                      <span>LoRAs</span>
                    </DarkOneSidebarMenuButton>
                    <DarkOneSidebarMenuBadge>14</DarkOneSidebarMenuBadge>
                  </DarkOneSidebarMenuItem>
                  <DarkOneSidebarMenuItem>
                    <DarkOneSidebarMenuButton tooltip="Runs">
                      <HistoryIcon />
                      <span>Runs</span>
                    </DarkOneSidebarMenuButton>
                    <DarkOneSidebarMenuAction show-on-hover><MoreHorizontalIcon /><span class="sr-only">Run options</span></DarkOneSidebarMenuAction>
                  </DarkOneSidebarMenuItem>
                </DarkOneSidebarMenu>
              </DarkOneSidebarGroupContent>
            </DarkOneSidebarGroup>
            <DarkOneSidebarGroup>
              <DarkOneSidebarGroupLabel>Loading</DarkOneSidebarGroupLabel>
              <DarkOneSidebarMenu>
                <DarkOneSidebarMenuItem v-for="row in 3" :key="row"><DarkOneSidebarMenuSkeleton show-icon /></DarkOneSidebarMenuItem>
              </DarkOneSidebarMenu>
            </DarkOneSidebarGroup>
          </DarkOneSidebarContent>
          <DarkOneSidebarFooter>
            <DarkOneSidebarMenu>
              <DarkOneSidebarMenuItem>
                <DarkOneSidebarMenuButton tooltip="Settings">
                  <SettingsIcon />
                  <span>Settings</span>
                </DarkOneSidebarMenuButton>
              </DarkOneSidebarMenuItem>
            </DarkOneSidebarMenu>
          </DarkOneSidebarFooter>
          <DarkOneSidebarRail />
        </DarkOneSidebar>
        <DarkOneSidebarInset>
          <header class="flex shrink-0 items-center gap-2 border-b p-1">
            <DarkOneSidebarTrigger />
            <span class="text-xs tracking-(--darkone-tracking) text-muted-foreground uppercase">Generate</span>
          </header>
          <div class="p-3 text-sm text-muted-foreground">The canvas. Collapse the sidebar to icons with the trigger or the rail.</div>
        </DarkOneSidebarInset>
      </DarkOneSidebarProvider>
    </div>
  </SpecimenRow>
</template>
