<h1 align="center">@rax-ds/ui</h1>

<p align="center">
    Accessible React components for the Rax design system.<br />
    Built on Radix UI and Tailwind CSS v4, themed with CSS variables, light and dark out of the box.
</p>

<p align="center">
    <a href="https://rax-design-system.vercel.app"><strong>Documentation</strong></a> ·
    <a href="https://rax-design-system.vercel.app/docs/installation">Installation</a> ·
    <a href="https://rax-design-system.vercel.app/docs/components">Components</a> ·
    <a href="https://rax-design-system.vercel.app/docs/theming">Theming</a> ·
    <a href="https://github.com/devrazzak/Rax-Design-System">GitHub</a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@rax-ds/ui"><img alt="npm version" src="https://img.shields.io/npm/v/@rax-ds/ui?color=blue" /></a>
    <a href="https://www.npmjs.com/package/@rax-ds/ui"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rax-ds/ui" /></a>
    <a href="./LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@rax-ds/ui" /></a>
</p>

## Documentation

The docs site has a live preview, copyable code and a props table for every component: **[rax-design-system.vercel.app](https://rax-design-system.vercel.app)**.

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

| Component                                                                                                                                                                                                                              | Use it for                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [`Button`](https://rax-design-system.vercel.app/docs/components/button)                                                                                                                                                                | Actions. Variants, sizes, loading state, `asChild`. |
| [`Toggle`](https://rax-design-system.vercel.app/docs/components/toggle), [`ToggleGroup`](https://rax-design-system.vercel.app/docs/components/toggle-group)                                                                            | Buttons that stay pressed, alone or in a group.     |
| [`IconButton`](https://rax-design-system.vercel.app/docs/components/icon-button)                                                                                                                                                       | A button that shows only an icon.                   |
| [`Spinner`](https://rax-design-system.vercel.app/docs/components/spinner)                                                                                                                                                              | A loading indicator.                                |
| [`Skeleton`](https://rax-design-system.vercel.app/docs/components/skeleton)                                                                                                                                                            | A placeholder shape while content loads.            |
| [`Progress`](https://rax-design-system.vercel.app/docs/components/progress)                                                                                                                                                            | How far a task has come.                            |
| [`Heading`](https://rax-design-system.vercel.app/docs/components/heading), [`Text`](https://rax-design-system.vercel.app/docs/components/text)                                                                                         | Typography.                                         |
| [`Container`](https://rax-design-system.vercel.app/docs/components/container), [`Section`](https://rax-design-system.vercel.app/docs/components/section)                                                                               | A centered page width, and a page section.          |
| [`Stack`](https://rax-design-system.vercel.app/docs/components/stack), [`Row`](https://rax-design-system.vercel.app/docs/components/row), [`Grid`](https://rax-design-system.vercel.app/docs/components/grid)                          | Vertical, horizontal and grid layouts.              |
| [`List`](https://rax-design-system.vercel.app/docs/components/list)                                                                                                                                                                    | An ordered or unordered list.                       |
| [`Label`](https://rax-design-system.vercel.app/docs/components/label)                                                                                                                                                                  | A label for a form control.                         |
| [`Input`](https://rax-design-system.vercel.app/docs/components/input), [`Textarea`](https://rax-design-system.vercel.app/docs/components/textarea), [`Select`](https://rax-design-system.vercel.app/docs/components/select)            | Text and choice fields.                             |
| [`OptionSelect`](https://rax-design-system.vercel.app/docs/components/option-select)                                                                                                                                                   | A `Select` built from an array of options.          |
| [`Checkbox`](https://rax-design-system.vercel.app/docs/components/checkbox), [`RadioGroup`](https://rax-design-system.vercel.app/docs/components/radio-group), [`Switch`](https://rax-design-system.vercel.app/docs/components/switch) | Yes/no and one-of-many controls.                    |
| [`InputGroup`](https://rax-design-system.vercel.app/docs/components/input-group)                                                                                                                                                       | An input with icons, text or buttons beside it.     |
| [`Field`](https://rax-design-system.vercel.app/docs/components/field)                                                                                                                                                                  | A control with its label, hint and error message.   |
| [`InputOTP`](https://rax-design-system.vercel.app/docs/components/input-o-t-p)                                                                                                                                                         | A one-time code split into separate slots.          |
| [`Card`](https://rax-design-system.vercel.app/docs/components/card)                                                                                                                                                                    | A bordered surface that groups related content.     |
| [`Avatar`](https://rax-design-system.vercel.app/docs/components/avatar), [`Badge`](https://rax-design-system.vercel.app/docs/components/badge)                                                                                         | A person's picture and a short status label.        |
| [`Alert`](https://rax-design-system.vercel.app/docs/components/alert)                                                                                                                                                                  | A message inline in the page. Info, warning, error. |
| [`Table`](https://rax-design-system.vercel.app/docs/components/table)                                                                                                                                                                  | Rows and columns of data.                           |
| [`Separator`](https://rax-design-system.vercel.app/docs/components/separator)                                                                                                                                                          | A thin line between content.                        |
| [`Breadcrumb`](https://rax-design-system.vercel.app/docs/components/breadcrumb)                                                                                                                                                        | The path to the current page.                       |
| [`Tabs`](https://rax-design-system.vercel.app/docs/components/tabs)                                                                                                                                                                    | Switch between views in the same place.             |
| [`Accordion`](https://rax-design-system.vercel.app/docs/components/accordion)                                                                                                                                                          | Sections that expand and collapse.                  |
| [`ScrollArea`](https://rax-design-system.vercel.app/docs/components/scroll-area)                                                                                                                                                       | A scrollable region with a styled scrollbar.        |
| [`Dialog`](https://rax-design-system.vercel.app/docs/components/dialog), [`AlertDialog`](https://rax-design-system.vercel.app/docs/components/alert-dialog)                                                                            | A modal window, and one that needs a decision.      |
| [`Drawer`](https://rax-design-system.vercel.app/docs/components/drawer)                                                                                                                                                                | A panel that slides in from an edge.                |
| [`DropdownMenu`](https://rax-design-system.vercel.app/docs/components/dropdown-menu)                                                                                                                                                   | A menu of actions opened from a button.             |
| [`Popover`](https://rax-design-system.vercel.app/docs/components/popover)                                                                                                                                                              | A floating panel opened from a button.              |
| [`Tooltip`](https://rax-design-system.vercel.app/docs/components/tooltip)                                                                                                                                                              | A short hint on hover or focus.                     |

Most components come in four sizes: `sm`, `md` (default), `lg` and `xl`. `Dialog` and `Drawer` use the same names for their width, plus `full`. `Card` sets `padding` and `radius` instead of a size, and `Button` and `Spinner` have extra sizes.

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

`OptionSelect` takes an `options` array of `{ value, label }` instead of `SelectItem` children. The values are strings, so convert an id with `String(id)`. For groups or custom items, use the `Select` parts directly:

```tsx
import { OptionSelect } from '@rax-ds/ui';

const options = [
    { value: 'news', label: 'News' },
    { value: 'events', label: 'Events' },
];

export function CategoryField() {
    return <OptionSelect options={options} placeholder="Select a category" onValueChange={console.log} />;
}
```

`FieldError` renders nothing when it has no message. The package does not depend on a form library, so use it with React Hook Form, TanStack Form or plain state.

### Dialog

`DialogTrigger` opens the dialog and returns focus to itself when the dialog closes. Every dialog needs a `DialogTitle` and a `DialogDescription` for screen readers:

```tsx
import {
    Button,
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@rax-ds/ui';

export function DeleteDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent size="sm">
                <DialogHeader>
                    <DialogTitle>Delete this item?</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive">Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
```

### Dropdown menu

Set `size` once on `DropdownMenuContent`. Every item follows it:

```tsx
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@rax-ds/ui';

export function RowActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent size="sm">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
```

To open a `Dialog` from a menu item, keep the `Dialog` next to the menu (not inside the menu content) and set `modal={false}` on `DropdownMenu`. See the `OpensDialog` story.

### Tooltip and popover

`Tooltip` works on its own, with no provider needed. A tooltip is a short hint only, so put anything the user must read or click in a `Popover`. Wrap several tooltips in one `TooltipProvider` only if you want to change the shared delay:

```tsx
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@rax-ds/ui';

export function Example() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>Add to library</TooltipContent>
            </Tooltip>

            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline">Open</Button>
                </PopoverTrigger>
                <PopoverContent aria-label="Dimensions">Set the dimensions for the layer.</PopoverContent>
            </Popover>
        </TooltipProvider>
    );
}
```

`PopoverContent` has the `dialog` role, so give it an `aria-label` (or `aria-labelledby`) for screen readers.

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
