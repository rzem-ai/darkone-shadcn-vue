<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DateFormatter, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
import { CalendarIcon } from '@lucide/vue';
import { computed, ref } from 'vue';
import { DarkOneCalendar } from '@/components/darkone/calendar';
import { useDarkOneControl } from '@/components/darkone/fieldContext';
import { DarkOnePopover, DarkOnePopoverContent, DarkOnePopoverTrigger } from '@/components/darkone/popover';
import { cn } from '@/lib/utils';

// The popover root renders no element, so attributes such as a field label's target id go to the trigger.
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    disabled?: boolean;
    locale?: string;
    minValue?: DateValue;
    maxValue?: DateValue;
    class?: HTMLAttributes['class'];
  }>(),
  { placeholder: 'Pick a date', disabled: false, locale: 'en-US' },
);
const model = defineModel<DateValue | undefined>();

const open = ref(false);
const control = useDarkOneControl();
const formatter = computed(() => new DateFormatter(props.locale, { dateStyle: 'long' }));
const label = computed(() => (model.value ? formatter.value.format(model.value.toDate(getLocalTimeZone())) : props.placeholder));

function pick(value: DateValue | DateValue[] | undefined) {
  model.value = Array.isArray(value) ? value[0] : value;
  open.value = false;
}
</script>

<template>
  <DarkOnePopover v-model:open="open">
    <DarkOnePopoverTrigger as-child>
      <button
        v-bind="$attrs"
        type="button"
        :disabled="props.disabled"
        :class="
          cn(
            'flex w-full min-w-0 items-center gap-2 rounded-(--darkone-radius) border py-0 text-left text-sm font-normal whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-40 [&_svg]:shrink-0',
            control.classes.value,
            !model && 'text-muted-foreground',
            props.class,
          )
        ">
        <CalendarIcon class="size-3.5 text-muted-foreground" />
        <span class="min-w-0 flex-1 truncate">{{ label }}</span>
      </button>
    </DarkOnePopoverTrigger>
    <DarkOnePopoverContent class="w-auto p-0" align="start">
      <DarkOneCalendar
        :model-value="model"
        :default-placeholder="model ?? today(getLocalTimeZone())"
        :min-value="props.minValue"
        :max-value="props.maxValue"
        :locale="props.locale"
        layout="month-and-year"
        initial-focus
        @update:model-value="pick" />
    </DarkOnePopoverContent>
  </DarkOnePopover>
</template>
