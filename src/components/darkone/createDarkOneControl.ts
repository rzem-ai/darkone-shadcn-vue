import { camelize, defineComponent, getCurrentInstance, h, toHandlerKey, type Component, type ComponentOptions } from 'vue';
import type { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

/** The vendor draws focus as ring/50, about 2:1 on the dark surfaces, and a destructive
 * variant adds dark:...destructive/40; the solid token is 3:1 or better. Ring colour under
 * focus only, so a control with no focus ring, and the slider thumb's hover ring, are unchanged. */
export const SOLID_FOCUS = 'focus-visible:ring-ring dark:focus-visible:ring-ring focus-within:ring-ring [&_[data-slot=slider-thumb]]:focus-visible:ring-ring';

/** A styled boundary, not a second implementation of the control. Preserve the
 * vendor's runtime props, emits and slots as well as its public TypeScript type. */
export function createDarkOneControl<T extends Component>(component: T, name: string, styling: ClassValue | ((props: Record<string, unknown>) => ClassValue)): T {
  const options = component as ComponentOptions;
  const events = Array.isArray(options.emits) ? options.emits : Object.keys(options.emits ?? {});
  return defineComponent({
    name,
    inheritAttrs: false,
    props: options.props,
    emits: events,
    setup(props, { attrs, slots, emit }) {
      const instance = getCurrentInstance();
      const defaults = new Set(
        Object.entries(options.props ?? {})
          .filter(([, definition]) => definition && typeof definition === 'object' && 'default' in definition && definition.default !== undefined)
          .map(([name]) => name),
      );
      const listeners = Object.fromEntries(events.map((event) => [toHandlerKey(event), (...args: unknown[]) => emit(event, ...args)]));
      return () => {
        // Do not turn an absent optional Boolean into an explicitly controlled
        // false value. Re-evaluate assigned keys each render as well: callers
        // can add a prop later, rather than merely change a key present at mount.
        const assigned = new Set(Object.keys(instance?.vnode.props ?? {}).map(camelize));
        // Keep declaration keys present as undefined when omitted. Nested
        // vendor forwarders then observe a later value without treating an
        // absent Boolean as false at the initial render.
        const supplied = Object.fromEntries(Object.entries(props).map(([name, value]) => [name, assigned.has(name) || defaults.has(name) ? value : undefined]));
        const forwarded = { ...supplied, ...attrs };
        return h(
          component,
          {
            ...forwarded,
            ...listeners,
            class: cn(SOLID_FOCUS, typeof styling === 'function' ? styling(forwarded) : styling, forwarded.class as ClassValue),
          },
          slots,
        );
      };
    },
  }) as unknown as T;
}
