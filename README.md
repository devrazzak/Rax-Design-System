# Rax Design System

A React design system built on shadcn/ui patterns, Radix UI, Tailwind CSS v4 and Style Dictionary.

## Packages

| Package                               | Description                                            |
| ------------------------------------- | ------------------------------------------------------ |
| [`@rax-ds/ui`](./packages/ui)         | React components                                       |
| [`@rax-ds/tokens`](./packages/tokens) | Design tokens as CSS variables (light and dark themes) |

## Requirements

- Node.js 22 or later
- pnpm (version pinned in `package.json`)

## Development

```bash
pnpm install          # installs dependencies and builds tokens
pnpm dev              # Storybook at http://localhost:6006
pnpm playground       # Next.js test app at http://localhost:3000
```

## Scripts

| Command          | Description                      |
| ---------------- | -------------------------------- |
| `pnpm build`     | Build all packages               |
| `pnpm test`      | Run unit and accessibility tests |
| `pnpm lint`      | Lint all files                   |
| `pnpm typecheck` | Type-check all packages          |
| `pnpm format`    | Format all files                 |

## Releasing

1. Add a changeset with every change that affects a published package: `pnpm changeset`
2. Bump versions and write changelogs: `pnpm version-packages`
3. Publish: `pnpm release`

## Credits

- Component patterns are based on [shadcn/ui](https://github.com/shadcn-ui/ui), licensed under the MIT License.
- Built on [Radix UI](https://github.com/radix-ui/primitives) primitives and [class-variance-authority](https://github.com/joe-bell/cva).

## License

[MIT](./LICENSE)
