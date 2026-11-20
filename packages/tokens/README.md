<h1 align="center">@rax-ds/tokens</h1>

<p align="center">
    Design tokens for the Rax design system, as CSS variables with light and dark themes.
</p>

<p align="center">
    <a href="https://rax-design-system.vercel.app"><strong>Documentation</strong></a> ·
    <a href="https://rax-design-system.vercel.app/docs/foundations/colors">Colors</a> ·
    <a href="https://rax-design-system.vercel.app/docs/foundations/radius">Radius</a> ·
    <a href="https://rax-design-system.vercel.app/docs/theming">Theming</a> ·
    <a href="https://github.com/devrazzak/Rax-Design-System">GitHub</a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@rax-ds/tokens"><img alt="npm version" src="https://img.shields.io/npm/v/@rax-ds/tokens?color=blue" /></a>
    <a href="https://www.npmjs.com/package/@rax-ds/tokens"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rax-ds/tokens" /></a>
    <a href="./LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@rax-ds/tokens" /></a>
</p>

Built with Style Dictionary. See every color, the radius scale and a live theme customizer in the [docs](https://rax-design-system.vercel.app/docs/foundations/colors).

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
