# @rax-ds/ui

React components for the Rax design system, built on Radix UI and Tailwind CSS v4.

## Requirements

- React 19
- Tailwind CSS v4

## Install

```bash
pnpm add @rax-ds/ui
```

`@rax-ds/tokens` is installed automatically.

## Setup

In your global CSS file:

```css
@import 'tailwindcss';
@import '@rax-ds/ui/styles.css';
```

### Dark mode

Toggle the `dark` class on `<html>`, for example with [`next-themes`](https://github.com/pacocoursey/next-themes):

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
</ThemeProvider>
```

## Usage

```tsx
import Link from 'next/link';

import { Button } from '@rax-ds/ui';

export function Example() {
    return (
        <>
            <Button>Save</Button>
            <Button variant="outline">Cancel</Button>
            <Button loading>Saving</Button>
            <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
            </Button>
        </>
    );
}
```

### Button

| Prop      | Type                                                                          | Default     |
| --------- | ----------------------------------------------------------------------------- | ----------- |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' \| 'destructive'` | `'primary'` |
| `size`    | `'sm' \| 'md' \| 'lg' \| 'icon'`                                              | `'md'`      |
| `loading` | `boolean`                                                                     | `false`     |
| `asChild` | `boolean`                                                                     | `false`     |

`type` defaults to `"button"`. Set `type="submit"` explicitly for submit buttons.

## Theming

Override semantic tokens in your own CSS:

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
