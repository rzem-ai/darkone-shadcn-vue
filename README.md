# darkone-shadcn-vue

Square, tracked wrappers around [shadcn-vue](https://shadcn-vue.com), in the Atom One Dark palette of [`dark-one-vue-template`](https://github.com/rzem-ai/dark-one-vue-template). Published as a shadcn-vue registry, with a kitchensink that shows every component in every state.

It is fathom's Studio layer, lifted out so any project can install it.

## Installing

One component, or all of them:

```bash
pnpm dlx shadcn-vue@latest add https://rzem-ai.github.io/darkone-shadcn-vue/r/darkone-button.json
pnpm dlx shadcn-vue@latest add https://rzem-ai.github.io/darkone-shadcn-vue/r/darkone.json
```

Each item pulls in the shadcn-vue components it wraps and `darkone-core` (the control factory, the field context, and the tokens, which the CLI merges into your stylesheet). Files land in `components/darkone/`:

```ts
import DarkOneButton from '@/components/darkone/DarkOneButton.vue';
import { DarkOneCheckbox } from '@/components/darkone/checkbox';
```

The kitchensink lists every item with its install command: https://rzem-ai.github.io/darkone-shadcn-vue/

## How a wrapper works

Nothing in `components/ui` is edited. A wrapper renders the vendor component and adds classes.

- **Most are one line.** `createDarkOneControl(Checkbox, 'DarkOneCheckbox', 'rounded-(--darkone-radius) ...')` keeps the vendor's runtime props, emits, slots and TypeScript type, and merges a class string over the vendor's.
- **A few are components.** `DarkOneButton` changes defaults; `DarkOneField` is a labelled well that, through `provide`, tells the DarkOne controls inside it to give up their own border and ring.
- **Tokens** live in `src/components/darkone/tokens.css`, the one copy. The kitchensink imports it; the registry build turns it into `darkone-core`'s `cssVars`.

### Write geometry against the variable

Use `rounded-(--darkone-radius)` and `h-(--darkone-field-height)`, not a token-named `rounded-darkone`. The vendor component does the final merge with the consumer's `cn`, whose tailwind-merge does not know DarkOne names: it drops `rounded-md` for `rounded-(--darkone-radius)`, but keeps it beside `rounded-darkone` and lets stylesheet order pick, which `rounded-md` wins. Colours (`bg-darkone-field`) merge either way. A test fails on a token-named geometry utility.

## Adding a component

1. Add the wrapper to `src/components/darkone/`, usually a one-line `createDarkOneControl` in a file named for the family, and export it from `index.ts`.
2. Add an item to `registry.json`: its files, the shadcn-vue components it wraps, `darkone-core`, and any packages it imports. Add it to the `darkone` aggregate.
3. Add `src/kitchensink/specimens/<family>.vue`, showing its states with `SpecimenRow`.

`pnpm test` fails until all three agree: the tests read each item's imports and compare them with what it declares.

## Scripts

```bash
pnpm dev              # the kitchensink
pnpm test             # registry integrity, the build script, wrapper behaviour
pnpm registry:build   # registry.json -> public/r
pnpm build            # registry, typecheck, kitchensink
```

`REGISTRY_URL` points local dependencies somewhere other than Pages, such as a directory, for an install test: `REGISTRY_URL=$PWD/public/r pnpm registry:build`, then `shadcn-vue add $PWD/public/r/darkone.json` in another project.

## Refreshing the vendored components

As in the template, `components/ui` is frozen at the versions installed. Update deliberately with `pnpm dlx shadcn-vue@latest add --overwrite <component>`, then `pnpm build && pnpm test`. Consumers get upstream's current component when they install; the kitchensink shows the vendored one.
