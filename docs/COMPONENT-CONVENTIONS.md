# Component conventions

Every component follows these rules. New components are added often, so the pattern must stay the same.

## Files

Each component lives in its own folder under `packages/ui/src/components/<name>/`:

| File                 | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| `<name>.tsx`         | The component and its props type                |
| `<name>.variants.ts` | Class maps, default variants and the name lists |
| `<name>.stories.tsx` | Storybook stories                               |
| `<name>.test.tsx`    | Jest tests                                      |

Create `<name>.variants.ts` only when the component has variant dimensions (variant, size, color). A component without them does not need it.

Export the component and its props type from `packages/ui/src/index.ts`.

## Variants file

```ts
export const variantClasses = { primary: '...', secondary: '...' };
export const sizeClasses = { sm: '...', md: '...' };

export const defaultVariants = { variant: 'primary', size: 'md' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};

export const COMPONENT_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const COMPONENT_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
```

The component passes these to `cva`. Stories and tests read the name lists, so adding a variant is one line in `variantClasses` and everything else follows.

A component with only a size (Input) exports `sizeClasses`, `defaultSize` and the `INPUT_SIZES` list, and indexes `sizeClasses[size]` directly. It does not need `cva`.

## Props

- `size` is the same scale everywhere: `sm`, `md`, `lg`, `xl`, with `md` as the default. Button also has `xs`.
- For form fields `size` sets the height, and the font size grows with it:

| size | height | font        |
| ---- | ------ | ----------- |
| `sm` | `h-10` | `text-sm`   |
| `md` | `h-12` | `text-base` |
| `lg` | `h-14` | `text-lg`   |
| `xl` | `h-16` | `text-xl`   |

- For typography (Label, Text, Heading) `size` sets the font size, never a height.
- When a native attribute has the same name (`<input size>`), remove it with `Omit<ComponentProps<'input'>, 'size'>`.
- Color props use semantic tokens. The fixed white value is named `white`, not `inverse`.
- Props are spread onto the root element, and `className` is merged last with `cn` so callers can override.
- Every root element gets a `data-slot="<name>"` attribute.

## Styling and tokens

- No `dark:` classes. A value that changes by theme must come from a token. If it needs a new color, add a token, do not use opacity tricks.
- Anything that depends on a color (focus ring color, destructive tint, text on a tint) lives in each variant, not in the base classes, so every variant matches its own color.
- Icon size is set per `size` in `sizeClasses`.
- Radius is `rounded-md` for Button, Input and Select.
- Do not hard-code colors, use the semantic tokens.

## Form fields

- Input, Select, Textarea and every future field must look identical: placeholder, disabled, invalid and focus.
- The shared look lives in one place, `src/lib/utils/field-classes.ts`. It also holds `w-full min-w-0`, so fields are full width by default.
- Focus uses the `ring` token. Invalid is a `border-destructive` only, with no ring or shadow.
- Every field needs an invalid state (`aria-invalid`) and an `Invalid` story.
- Textarea grows with CSS `field-sizing-content` and has a maximum height, then it scrolls.

## Icons

Icons live in the internal `src/icons` folder and are imported only through `@/icons`. This keeps the later move to a separate icons package a one-line import swap.

## Components copied from shadcn

- Copy the code in by hand, then trim every class and wrapper the design system does not need.
- Keep the Radix accessibility behavior. Do not rewrite it.
- Apply the rules above (size scale, tokens, no `dark:`).

## Stories

- `title: 'Components/<Name>'`, `tags: ['autodocs']`.
- `argTypes` for `size` and `variant` use the name lists from the variants file.
- Cover at least: `Default`, `Sizes`, `Disabled`, and `Invalid` for form fields.

## Tests

- Group with `describe`: `behavior`, `accessibility`, `size`/`variant`, `customization`.
- Loop over the name lists (`it.each(COMPONENT_VARIANTS)`) so new variants are covered automatically.
- Write defaults and key behavior as literals (`toHaveClass('size-5')`). They are the spec, so changing one should fail a test.
- Every component has an axe test (`jest-axe`) and a test that `className` can override the defaults.

## Server Components

A component that attaches an event handler cannot be rendered from a Server Component with that handler active. Button with `loading` is one example, so render it from a Client Component.

## Checklist for a new component

1. Folder with `.tsx`, `.variants.ts` (if needed), `.stories.tsx`, `.test.tsx`.
2. `size` follows the shared scale, colors come from tokens, no `dark:`.
3. Form field: uses the shared field classes and has an invalid state and story.
4. Exported from `src/index.ts`.
5. `pnpm typecheck`, `pnpm lint` and `pnpm test` pass.
6. Changeset added if the public API changed.
7. Commits split as described in `CLAUDE.md`.
