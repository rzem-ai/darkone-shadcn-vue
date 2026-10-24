import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import { Checkbox } from '../src/components/ui/checkbox';
import { safeHref } from '../src/components/darkone/safeHref';
import { DarkOneAlert } from '../src/components/darkone/alert';
import { DarkOneButton, DarkOneCheckbox, DarkOneField, DarkOneInput, DarkOneSwitch, DarkOneTextarea, createDarkOneControl } from '../src/components/darkone';

describe('DarkOneButton', () => {
  it('is a square outline action that keeps its variants and caller overrides', async () => {
    const action = mount(DarkOneButton, { attrs: { type: 'submit' }, slots: { default: 'Save' } });
    expect(action.element.tagName).toBe('BUTTON');
    expect(action.attributes('type')).toBe('submit');
    expect(action.classes()).toEqual(expect.arrayContaining(['rounded-(--darkone-radius)', 'h-(--darkone-action-height)', 'border']));
    // The vendor's own radius and height are merged away, not left to race in the stylesheet.
    expect(action.classes()).not.toContain('rounded-md');
    expect(action.classes()).not.toContain('h-9');
    await action.trigger('click');
    expect(action.emitted('click')).toHaveLength(1);
    action.unmount();

    const override = mount(DarkOneButton, { props: { variant: 'default', class: 'h-10' } });
    expect(override.classes()).toEqual(expect.arrayContaining(['h-10', 'bg-primary']));
    expect(override.classes()).not.toContain('h-(--darkone-action-height)');
    override.unmount();
  });

  it('keeps as-child links on the vendored primitive', () => {
    const action = mount(DarkOneButton, { props: { asChild: true }, slots: { default: () => h('a', { href: '/models' }, 'Models') } });
    expect(action.element.tagName).toBe('A');
    expect(action.attributes('data-slot')).toBe('button');
    action.unmount();
  });
});

describe('DarkOneField', () => {
  it.each([DarkOneInput, DarkOneTextarea])('forwards model values, native attributes and updates', async (control) => {
    const field = mount(control, { props: { modelValue: 'Before' }, attrs: { 'id': 'draft', 'aria-describedby': 'help' } });
    expect((field.element as HTMLInputElement).value).toBe('Before');
    expect(field.attributes()).toMatchObject({ 'id': 'draft', 'aria-describedby': 'help' });
    await field.setValue('After');
    expect(field.emitted('update:modelValue')?.at(-1)).toEqual(['After']);
    field.unmount();
  });

  it('associates its label and help, and takes the border from controls inside it', () => {
    const field = mount(DarkOneField, {
      props: { label: 'Name', for: 'name', help: 'A readable name.' },
      slots: { default: ({ helpId }: { helpId: string | undefined }) => h(DarkOneInput, { 'id': 'name', 'aria-describedby': helpId }) },
    });
    expect(field.get('label').attributes('for')).toBe('name');
    expect(field.get('input').attributes('aria-describedby')).toBe(field.get('[data-darkone-field-help]').attributes('id'));
    expect(field.get('input').classes()).toEqual(expect.arrayContaining(['border-0', 'bg-transparent', 'focus-visible:ring-0']));
    expect(field.get('[data-darkone-well]').classes()).toContain('focus-within:ring-3');
    field.unmount();
  });

  it('keeps compact reactive without touching a standalone control beside it', async () => {
    const host = mount(
      defineComponent({
        components: { DarkOneField, DarkOneInput },
        data: () => ({ compact: false }),
        template: '<div><DarkOneField label="Name" :compact="compact"><DarkOneInput /></DarkOneField><DarkOneInput data-standalone /></div>',
      }),
    );
    expect(host.get('[data-darkone-well]').classes()).toContain('h-(--darkone-field-height)');
    host.vm.compact = true;
    await nextTick();
    expect(host.get('[data-darkone-well]').classes()).toContain('h-(--darkone-field-compact-height)');
    expect(host.findAll('input')[0]!.classes()).toContain('h-[calc(var(--darkone-field-compact-height)-2px)]');
    expect(host.get('[data-standalone]').classes()).toContain('bg-darkone-field');
    expect(host.get('[data-standalone]').classes()).not.toContain('border-0');
    host.unmount();
  });

  it('carries a tone on the left edge alone, the rest the plain field border', () => {
    const field = mount(DarkOneField, { props: { label: 'Key', value: 'Rejected', tone: 'negative' } });
    const well = field.get('[data-darkone-well]').classes();
    expect(well).toEqual(expect.arrayContaining(['border-darkone-field-border', 'focus-within:border-ring', 'border-l-2', 'border-l-destructive', 'focus-within:border-l-destructive']));
    expect(well).not.toContain('border-destructive');
    expect(field.get('[data-darkone-field-value]').text()).toBe('Rejected');
    field.unmount();
  });
});

describe('DarkOneAlert', () => {
  it.each([
    [{ tone: 'positive' }, 'border-l-chart-4'],
    [{ tone: 'caution' }, 'border-l-chart-3'],
    [{ variant: 'destructive' }, 'border-l-destructive'],
  ] as const)('carries %o on a 2px left edge alone', (props, edge) => {
    const alert = mount(DarkOneAlert, { props, slots: { default: 'Run 1042 finished' } });
    expect(alert.classes()).toEqual(expect.arrayContaining(['border', 'border-l-2', edge]));
    expect(alert.classes()).not.toEqual(expect.arrayContaining([expect.stringMatching(/^border-(chart-\d|destructive)$/)]));
    alert.unmount();
  });

  it('keeps the plain border all round without a tone', () => {
    const alert = mount(DarkOneAlert, { slots: { default: 'The refiner is off' } });
    expect(alert.classes()).toContain('border');
    expect(alert.classes()).not.toContain('border-l-2');
    alert.unmount();
  });
});

describe('createDarkOneControl', () => {
  it('keeps the vendor runtime props and emits, under its own name', () => {
    const options = Checkbox as unknown as { props: object; emits: string[] };
    const wrapped = DarkOneCheckbox as unknown as { name: string; props: object; emits: string[] };
    expect(wrapped.name).toBe('DarkOneCheckbox');
    expect(wrapped.props).toBe(options.props);
    expect(wrapped.emits).toEqual(Array.isArray(options.emits) ? options.emits : Object.keys(options.emits));
  });

  it('forwards v-model, merges its class over the vendor and lets the caller win', async () => {
    const host = mount(
      defineComponent({ components: { DarkOneSwitch }, data: () => ({ on: false }), template: '<DarkOneSwitch v-model="on" class="w-12" aria-label="Upscale" />' }),
    );
    const button = host.get('button');
    expect(button.attributes('aria-label')).toBe('Upscale');
    expect(button.classes()).toEqual(expect.arrayContaining(['rounded-(--darkone-radius)', 'w-12', 'focus-visible:ring-ring']));
    expect(button.classes()).not.toContain('rounded-full');
    await button.trigger('click');
    expect(host.vm.on).toBe(true);
    host.unmount();
  });

  it('does not turn an absent optional boolean into a controlled false', async () => {
    const Probe = defineComponent({ name: 'Probe', props: { open: { type: Boolean, default: undefined } }, setup: (props) => () => h('div', { 'data-open': String(props.open) }) });
    const Wrapped = createDarkOneControl(Probe, 'WrappedProbe', 'x');
    const absent = mount(Wrapped);
    expect(absent.get('div').attributes('data-open')).toBe('undefined');
    const given = mount(Wrapped, { props: { open: false } });
    expect(given.get('div').attributes('data-open')).toBe('false');
    absent.unmount();
    given.unmount();
  });

  it('passes a function styling the forwarded props', () => {
    const Probe = defineComponent({ props: { align: String }, setup: (_, { attrs }) => () => h('span', attrs) });
    const Wrapped = createDarkOneControl(Probe, 'Aligned', (props) => props.align === 'end' && 'justify-end');
    expect(mount(Wrapped, { props: { align: 'end' } }).classes()).toContain('justify-end');
    expect(mount(Wrapped, { props: { align: 'start' } }).classes()).not.toContain('justify-end');
  });
});

describe('safeHref', () => {
  it('keeps http(s) links from data and drops every other scheme', () => {
    expect(safeHref('https://huggingface.co/stabilityai/sdxl')).toBe('https://huggingface.co/stabilityai/sdxl');
    expect(safeHref('http://localhost:8188/')).toBe('http://localhost:8188/');
    expect(safeHref('javascript:alert(1)')).toBeUndefined();
    expect(safeHref(' JavaScript:alert(1)')).toBeUndefined();
    expect(safeHref('data:text/html,<script>alert(1)</script>')).toBeUndefined();
    expect(safeHref('not a url')).toBeUndefined();
    expect(safeHref(undefined)).toBeUndefined();
  });
});
