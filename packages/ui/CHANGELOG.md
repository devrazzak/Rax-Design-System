# @rax-ds/ui

## 0.13.2

### Patch Changes

- 2aa6a9f: Link the docs site from the npm page and improve the README
- Updated dependencies [2aa6a9f]
  - @rax-ds/tokens@0.6.1

## 0.13.1

### Patch Changes

- aba1418: Add the `asChild` prop to IconButton, for an icon-only link.

## 0.13.0

### Minor Changes

- 5139147: Remove the `display`, `align` and `justify` props from Text. Use `className` or the Row and Stack components for layout.

### Patch Changes

- b11d96f: Button `link` and `linkWhite` variants no longer have a fixed height or padding, only the font size of their size.
- bf68c20: Tooltip and IconButton no longer need a `TooltipProvider` above them. Set `delayDuration` on the Tooltip, because a provider above it is ignored.

## 0.12.0

### Minor Changes

- 3e7429d: Rename the Button variant `linkInverse` to `linkWhite`. It now turns primary on hover and has no underline.

## 0.11.1

### Patch Changes

- 36fe521: Add the List and ListItem components, with `disc`, `decimal` and `none` markers and an icon option.

## 0.11.0

### Minor Changes

- ed34fef: Heading size `base` is renamed to `md`, the same as Text. Add the `textTransform` prop to Heading.
- 67708ca: Add the IconButton component, an icon-only Button with a tooltip and a `rounded` option.

### Patch Changes

- cd832ba: Grid `columns` also accepts an object per breakpoint, for example `{ base: 1, md: 2, lg: 4 }`.
- 42793c7: Add a `foreground` tone to Section.

## 0.10.1

### Patch Changes

- 2304fff: Add a `surface` variant to Button.

## 0.10.0

### Minor Changes

- 7265aa1: Add a `white` variant to Button.
- 17d4990: Add `display`, `textAlign`, `textTransform`, `tracking`, `align` and `justify` props to Text.

## 0.9.0

### Minor Changes

- 3145e6a: Add the `none` spacing to Section. Section now has no vertical spacing by default, pass `spacing="md"` to keep the old padding.

## 0.8.0

### Minor Changes

- a9ae87e: Add the Container component, a centered wrapper with a max width and fluid side padding.
- 37c8236: Add the Grid and GridItem components, a responsive column grid with a shared gap scale and column spans.
- 37c8236: Add the Row component, a horizontal flex layout with gap, alignment, justify and wrap.
- d706a3c: Add the Section component, a page section with responsive vertical spacing and a background tone.
- 37c8236: Add the Stack component, a vertical flex layout with a shared gap scale and alignment.

## 0.7.1

### Patch Changes

- c29eb1b: Add the `"use client"` directive to interactive components (Button, Accordion, AlertDialog, Avatar, Checkbox, Dialog, Drawer, DropdownMenu, InputOTP, Label, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Switch, Tabs, Toggle, ToggleGroup and Tooltip), so they work in the Next.js App Router without a wrapper file.

## 0.7.0

### Minor Changes

- 474c3b6: Add the OptionSelect component, a Select built from an array of `{ value, label }` options.

## 0.6.0

### Minor Changes

- 82f0df2: Add Card, Separator, Skeleton, Alert, Progress, Tabs, Tooltip, Popover, ScrollArea, ToggleGroup and Table. Components now use the larger radius scale from `@rax-ds/tokens`.

### Patch Changes

- Updated dependencies [82f0df2]
  - @rax-ds/tokens@0.6.0

## 0.5.0

### Minor Changes

- e3af4f0: Add InputOTP, Accordion, Dialog and DropdownMenu components. Add the XIcon icon and shared fade and zoom animations. Select content now uses the zoom animation and a `rounded-md` radius.

### Patch Changes

- 65276c7: BREAKING: Label and Text size "base" is now "md", to match the other components.
- Updated dependencies [e3af4f0]
  - @rax-ds/tokens@0.5.0

## 0.4.1

### Patch Changes

- c3a40d3: Update the README with setup, dark mode, components list and form usage.
- Updated dependencies [c3a40d3]
  - @rax-ds/tokens@0.4.1

## 0.4.0

### Minor Changes

- c802d5f: Add Textarea, Checkbox, RadioGroup, Switch, Field and InputGroup components. Add destructive-subtle tokens and a unified size scale (sm, md, lg, xl) across form fields. BREAKING: Button size "default" is now "md".

### Patch Changes

- Updated dependencies [c802d5f]
  - @rax-ds/tokens@0.4.0

## 0.3.0

### Minor Changes

- 34898a5: Summary: Add Heading, Text, Label and Input components

### Patch Changes

- Updated dependencies [34898a5]
  - @rax-ds/tokens@0.3.0

## 0.2.0

### Minor Changes

- ffcb763: Add Spinner component and a loading state for Button (loading, loadingPosition, asChild support)

### Patch Changes

- Updated dependencies [ffcb763]
  - @rax-ds/tokens@0.2.0

## 0.1.0

### Minor Changes

- 64aceca: Initial release: design tokens with light and dark themes, and Button component with loading state

### Patch Changes

- Updated dependencies [64aceca]
  - @rax-ds/tokens@0.1.0
