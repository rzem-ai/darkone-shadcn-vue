<script setup lang="ts">
import { MoonIcon, SunIcon } from '@lucide/vue';
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { useTheme } from '@/composables/useTheme';
import { entries, installCommand, navigation } from '@/kitchensink/catalogue';
import Specimen from '@/kitchensink/Specimen.vue';

const { theme, toggle } = useTheme();
const sections = [
  { title: 'Components', links: navigation('component') },
  { title: 'Blocks', links: navigation('block') },
].filter((section) => section.links.length);
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-4 border-b bg-background px-4 py-3 sm:px-5">
      <div class="flex min-w-0 items-baseline gap-2">
        <h1 class="text-sm font-semibold">DarkOne</h1>
        <span class="truncate font-mono text-xs text-muted-foreground">shadcn-vue wrappers, kitchensink</span>
      </div>
      <DarkOneButton variant="ghost" size="icon" :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggle">
        <SunIcon v-if="theme === 'dark'" class="size-4" />
        <MoonIcon v-else class="size-4" />
      </DarkOneButton>
    </header>

    <div class="flex min-h-0 flex-1">
      <nav aria-label="Components" class="sticky top-[49px] hidden h-[calc(100vh-49px)] w-52 shrink-0 overflow-y-auto border-r p-3 md:block">
        <div v-for="section in sections" :key="section.title" class="flex flex-col gap-1 pb-4">
          <h2 class="px-2 text-xs tracking-(--darkone-tracking) text-muted-foreground uppercase">{{ section.title }}</h2>
          <ul class="flex flex-col">
            <li v-for="link in section.links" :key="link.title">
              <a :href="link.href" class="block px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">{{ link.title }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <main class="flex min-w-0 flex-1 flex-col gap-10 px-4 py-6 sm:px-8">
        <section class="flex max-w-3xl flex-col gap-2 text-sm text-muted-foreground">
          <div>
            Square, tracked wrappers around the vendored shadcn-vue components. The wrappers style the vendor through classes and theme tokens; nothing in
            <code class="font-mono text-xs">components/ui</code>
            is edited. Every section installs on its own, or take them all:
          </div>
          <code class="bg-muted px-2 py-1 font-mono text-xs break-all select-all">{{ installCommand('darkone') }}</code>
        </section>
        <Specimen v-for="entry in entries.filter((entry) => entry.kind === 'component')" :key="entry.name" :entry="entry" />
        <h2 v-if="sections.length > 1" class="text-xs tracking-(--darkone-tracking) text-muted-foreground uppercase">Blocks</h2>
        <Specimen v-for="entry in entries.filter((entry) => entry.kind === 'block')" :key="entry.name" :entry="entry" />
      </main>
    </div>
  </div>
</template>
