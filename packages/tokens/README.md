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

- Color: `--rax-color-primary`, `--rax-color-background`, `--rax-color-foreground`, ...
- Font: `--rax-font-family-sans`, `--rax-font-family-mono`
- Radius: `--rax-radius-sm` to `--rax-radius-2xl`

## License

[MIT](./LICENSE)
