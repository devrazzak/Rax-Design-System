# Component conventions

## Files

Each component lives in its own folder under `packages/ui/src/components/<name>/`:

| File                 | Purpose                                         |
| -------------------- | ----------------------------------------------- |
| `<name>.tsx`         | The component and its props type                |
| `<name>.variants.ts` | Class maps, default variants and the name lists |
| `<name>.stories.tsx` | Storybook stories                               |
| `<name>.test.tsx`    | Jest tests                                      |

Create `<name>.variants.ts` only when the component has variant dimensions (variant, size, color). A component without them does not need it.

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

## Tests

- Loop over the name lists (`it.each(COMPONENT_VARIANTS)`) so new variants are covered automatically.
- Write defaults and key behavior as literals (`toHaveClass('size-4')`). They are the spec, so changing one should fail a test.

## Server Components

A component that attaches an event handler cannot be rendered from a Server Component with that handler active. Button with `loading` is one example, so render it from a Client Component.
