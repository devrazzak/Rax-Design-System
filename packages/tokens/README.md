# @rax-ds/tokens

Design tokens for the Rax design system, generated with Style Dictionary as CSS variables.

Usually installed automatically by `@rax-ds/ui`. Use this package directly only if you need the variables without the components.

## Usage

```css
@import '@rax-ds/tokens/tokens.css';
```

## Themes

| Theme | Selector                        |
| ----- | ------------------------------- |
| Light | `:root`, `[data-theme="light"]` |
| Dark  | `.dark`, `[data-theme="dark"]`  |

## Tokens

All variables use the `--rax-` prefix.

- Color: `--rax-color-primary`, `--rax-color-background`, `--rax-color-foreground`, `--rax-color-overlay` (dialog backdrop), ...
- Status color: `--rax-color-destructive`, `--rax-color-info`, `--rax-color-warning`. Each has a `-subtle` and a `-subtle-foreground` version for soft backgrounds.
- Loading placeholder: `--rax-color-skeleton`
- Font: `--rax-font-family-sans`, `--rax-font-family-mono`
- Radius: `--rax-radius-sm` to `--rax-radius-2xl`

| Token              | Value |
| ------------------ | ----- |
| `--rax-radius-sm`  | 4px   |
| `--rax-radius-md`  | 8px   |
| `--rax-radius-lg`  | 12px  |
| `--rax-radius-xl`  | 16px  |
| `--rax-radius-2xl` | 20px  |

## License

[MIT](./LICENSE)
