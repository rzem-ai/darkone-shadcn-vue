<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

/** Styles the plain HTML slotted into it, so rendered markdown needs no classes of its own. */
const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <div
    data-darkone-typography
    :class="
      cn(
        'text-sm leading-7 text-foreground',
        '[&_h1]:scroll-m-20 [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:tracking-tight [&_h1]:text-balance',
        '[&_h2]:mt-10 [&_h2]:scroll-m-20 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2:first-child]:mt-0',
        '[&_h3]:mt-8 [&_h3]:scroll-m-20 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight',
        // h4 and small read as field labels do, so a minor heading sits apart from the prose without shouting.
        '[&_h4]:mt-6 [&_h4]:scroll-m-20 [&_h4]:text-xs [&_h4]:font-normal [&_h4]:tracking-(--darkone-tracking) [&_h4]:text-muted-foreground [&_h4]:uppercase',
        '[&_small]:text-xs [&_small]:leading-none [&_small]:tracking-(--darkone-tracking) [&_small]:uppercase',
        '[&_p]:leading-7 [&_p:not(:first-child)]:mt-6',
        '[&_.lead]:text-xl [&_.lead]:text-muted-foreground [&_.muted]:text-sm [&_.muted]:text-muted-foreground',
        '[&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
        '[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic',
        '[&_ul]:my-6 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:my-6 [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mt-2',
        // Inline code only: a fenced block's code sits in a pre, which brings its own surface.
        '[&_:not(pre)>code]:rounded-(--darkone-radius) [&_:not(pre)>code]:bg-darkone-field [&_:not(pre)>code]:px-[0.3rem] [&_:not(pre)>code]:py-[0.2rem] [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-xs',
        '[&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_tr]:border-t [&_tr:nth-child(even)]:bg-muted',
        '[&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:text-xs [&_th]:font-normal [&_th]:tracking-(--darkone-tracking) [&_th]:text-muted-foreground [&_th]:uppercase',
        '[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left [&_[align=center]]:text-center [&_[align=right]]:text-right',
        props.class,
      )
    ">
    <slot />
  </div>
</template>
