# Rax Design System

pnpm monorepo: `@rax-ds/tokens` (Style Dictionary), `@rax-ds/ui` (React, Radix, Tailwind v4) and `apps/playground`.
Component details live in [docs/COMPONENT-CONVENTIONS.md](docs/COMPONENT-CONVENTIONS.md). Read it before touching a component.

## Rules

- This is a general design system. Never mention any single project or client in code, docs, stories, examples or commits.
- Use pnpm inside the repo, never npm. Run `npm whoami` and `npm view` outside the repo (the root `devEngines` requires pnpm).
- Code comments are always English.
- Keep code simple. No extra logic, helpers or props beyond what the feature needs.
- Do not start a new component on your own. The owner copies the shadcn code and gives instructions. There is no `components.json` and no shadcn CLI.
- Overlay animations (Select, Dialog, Dropdown Menu, Popover, Tooltip) are left out on purpose until the overlay components exist. Then add one shared animation set.
- Do not publish or release unless asked. Add a changeset for every change users of the package can see.

## Commands

| Command                                | What it does                                   |
| -------------------------------------- | ---------------------------------------------- |
| `pnpm dev`                             | Build tokens, then start Storybook             |
| `pnpm playground`                      | Build tokens and ui, then start the playground |
| `pnpm typecheck`                       | Type check every package                       |
| `pnpm lint`                            | ESLint, no warnings allowed                    |
| `pnpm test`                            | Jest in every package                          |
| `pnpm format:check`                    | Prettier check                                 |
| `pnpm --filter @rax-ds/ui test <name>` | Run the tests of one component                 |
| `pnpm --filter @rax-ds/tokens build`   | Rebuild tokens after editing token JSON        |

More commands are in `docs/RAX-COMMANDS.txt`.

## Commits

- Conventional Commits: `type(scope): subject`. Scopes: `ui`, `tokens`, `playground`, `repo`, `deps`, `ci`, `docs`, `release`.
- One short, meaningful line. No body unless it is really needed.
- A new component is split into separate commits, in this order:
    1. dependency or icons it needs (`chore(ui): add ...`, `feat(ui): add ... icon`)
    2. `feat(ui): add <name> component`
    3. `feat(ui): export <name>`
    4. `docs(ui): add <name> stories`
    5. `test(ui): add <name> tests`
- Husky, lint-staged and commitlint run on commit. If one fails, fix the problem and commit again.

## Tokens and theming

- Colors, font and radius are our own primitive and semantic tokens. Everything else comes from Tailwind defaults.
- Primitive tokens are JSON in `packages/tokens/src/primitive`, semantic tokens (light and dark) are in `packages/tokens/src/semantic`.
- Dark mode works only through tokens. Never use `dark:` classes in components, because more themes will be added later.
- Brand values of a project (for example its primary color) live in that project, not here.
