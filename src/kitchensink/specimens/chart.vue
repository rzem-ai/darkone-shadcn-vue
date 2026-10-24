<script setup lang="ts">
import { VisAxis, VisGroupedBar, VisLine, VisXYContainer } from '@unovis/vue';
import {
  componentToString,
  DarkOneChartContainer,
  DarkOneChartCrosshair,
  DarkOneChartLegendContent,
  DarkOneChartTooltip,
  DarkOneChartTooltipContent,
  type ChartConfig,
} from '@/components/darkone/chart';
import SpecimenRow from '../SpecimenRow.vue';

interface Day {
  day: string;
  renders: number;
}
const renders: Day[] = [
  { day: 'Mon', renders: 186 },
  { day: 'Tue', renders: 305 },
  { day: 'Wed', renders: 237 },
  { day: 'Thu', renders: 412 },
  { day: 'Fri', renders: 298 },
  { day: 'Sat', renders: 96 },
  { day: 'Sun', renders: 54 },
];
const rendersConfig = { renders: { label: 'Renders', color: 'var(--chart-2)' } } satisfies ChartConfig;

interface Sample {
  minute: number;
  allocated: number;
  reserved: number;
}
const vram: Sample[] = [
  { minute: 0, allocated: 2.1, reserved: 2.4 },
  { minute: 1, allocated: 6.9, reserved: 7.8 },
  { minute: 2, allocated: 9.4, reserved: 10.2 },
  { minute: 3, allocated: 11.8, reserved: 12.6 },
  { minute: 4, allocated: 10.9, reserved: 12.6 },
  { minute: 5, allocated: 14.2, reserved: 15.1 },
  { minute: 6, allocated: 7.3, reserved: 15.1 },
];
const vramConfig = {
  allocated: { label: 'Allocated, GB', color: 'var(--chart-1)' },
  reserved: { label: 'Reserved, GB', color: 'var(--chart-3)' },
} satisfies ChartConfig;

const rendersTooltip = componentToString(rendersConfig, DarkOneChartTooltipContent, { labelFormatter: (x) => renders[Number(x)]?.day ?? '' });
const vramTooltip = componentToString(vramConfig, DarkOneChartTooltipContent, { labelFormatter: (x) => `Minute ${x}` });
</script>

<template>
  <SpecimenRow label="Bars, renders per day">
    <DarkOneChartContainer :config="rendersConfig" class="aspect-auto h-44 w-full max-w-md">
      <VisXYContainer :data="renders" :y-domain="[0, undefined]">
        <VisGroupedBar :x="(_: Day, i: number) => i" :y="[(d: Day) => d.renders]" :color="[rendersConfig.renders.color]" :rounded-corners="0" :bar-padding="0.25" />
        <VisAxis type="x" :tick-line="false" :domain-line="false" :grid-line="false" :num-ticks="renders.length" :tick-format="(i: number) => renders[i]?.day ?? ''" />
        <VisAxis type="y" :num-ticks="3" :tick-line="false" :domain-line="false" />
        <DarkOneChartTooltip />
        <DarkOneChartCrosshair :template="rendersTooltip" :y="(d: Day) => d.renders" color="#0000" />
      </VisXYContainer>
    </DarkOneChartContainer>
  </SpecimenRow>
  <SpecimenRow label="Lines, VRAM over a run">
    <DarkOneChartContainer :config="vramConfig" cursor class="aspect-auto h-52 w-full max-w-md">
      <VisXYContainer :data="vram" :y-domain="[0, 16]">
        <VisLine :x="(d: Sample) => d.minute" :y="[(d: Sample) => d.allocated, (d: Sample) => d.reserved]" :color="[vramConfig.allocated.color, vramConfig.reserved.color]" />
        <VisAxis type="x" :tick-line="false" :domain-line="false" :grid-line="false" :tick-format="(m: number) => `${m}m`" />
        <VisAxis type="y" :num-ticks="4" :tick-line="false" :domain-line="false" />
        <DarkOneChartTooltip />
        <DarkOneChartCrosshair :template="vramTooltip" :y="[(d: Sample) => d.allocated, (d: Sample) => d.reserved]" :color="[vramConfig.allocated.color, vramConfig.reserved.color]" />
      </VisXYContainer>
      <DarkOneChartLegendContent />
    </DarkOneChartContainer>
  </SpecimenRow>
</template>
