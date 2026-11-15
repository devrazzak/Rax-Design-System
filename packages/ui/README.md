# @rax-ds/ui

React components for the Rax design system, built on Radix UI and Tailwind CSS v4.

## Requirements

- React 19
- Tailwind CSS v4

## Install

```bash
pnpm add @rax-ds/ui
# or
npm install @rax-ds/ui
```

`@rax-ds/tokens` is installed automatically.

## Setup

Add two lines to your global CSS file:

```css
@import 'tailwindcss';
@import '@rax-ds/ui/styles.css';
```

That is all. The second line brings the design tokens and tells Tailwind where to find the component classes, so you do not need a `@source` rule.

### Dark mode

Dark mode follows the `dark` class on `<html>` (or `data-theme="dark"`), not the operating system setting. Add or remove the class from your own code:

```ts
document.documentElement.classList.toggle('dark');
```

Any theme library that sets the `dark` class works too, for example [`next-themes`](https://github.com/pacocoursey/next-themes).

## Components

| Component                          | Use it for                                          |
| ---------------------------------- | --------------------------------------------------- |
| `Button`                           | Actions. Variants, sizes, loading state, `asChild`. |
| `Spinner`                          | A loading indicator.                                |
| `Heading`, `Text`                  | Typography.                                         |
| `Label`                            | A label for a form control.                         |
| `Input`, `Textarea`, `Select`      | Text and choice fields.                             |
| `Checkbox`, `RadioGroup`, `Switch` | Yes/no and one-of-many controls.                    |
| `InputGroup`                       | An input with icons, text or buttons beside it.     |
| `Field`                            | A control with its label, hint and error message.   |

Form controls come in four sizes: `sm`, `md` (default), `lg` and `xl`.

## Usage

### Buttons

```tsx
import Link from 'next/link';

import { Button, Spinner } from '@rax-ds/ui';

export function Example() {
    return (
        <>
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
            <Button loading>Saving</Button>
            <Spinner label="Loading results" />
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </>
    );
}
```

`type` defaults to `"button"`. Set `type="submit"` explicitly for submit buttons.

### Forms

`Field` lays out a label, a control, a hint and an error. It does not connect them for you, so pass `id`, `aria-invalid` and `aria-describedby` to the control yourself:

```tsx
import { Button, Field, FieldDescription, FieldError, FieldLabel, Input } from '@rax-ds/ui';

export function EmailField({ error }: { error?: string }) {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" aria-invalid={!!error} aria-describedby="email-hint email-error" />
            <FieldDescription id="email-hint">We never share your email.</FieldDescription>
            <FieldError id="email-error">{error}</FieldError>
        </Field>
    );
}
```

`FieldError` renders nothing when it has no message. The package does not depend on a form library, so use it with React Hook Form, TanStack Form or plain state.

## Theming

Override semantic tokens in your own CSS. See [`@rax-ds/tokens`](https://www.npmjs.com/package/@rax-ds/tokens) for the full list:

```css
:root {
    --rax-color-primary: oklch(0.55 0.2 260);
}

.dark {
    --rax-color-primary: oklch(0.62 0.19 260);
}
```

## Credits

- Component patterns are based on [shadcn/ui](https://github.com/shadcn-ui/ui), licensed under the MIT License. See [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
- Built on [Radix UI](https://github.com/radix-ui/primitives) primitives and [class-variance-authority](https://github.com/joe-bell/cva).

## License

[MIT](./LICENSE)
