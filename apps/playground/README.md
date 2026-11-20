# Playground

The documentation site of the design system. It shows every component with a live preview, the code, examples, accessibility notes and a props table. It is a Next.js app built with MDX, and it uses `@rax-ds/ui` for all of its own UI.

## Run it

Run these from the repository root. Both build `@rax-ds/tokens` and `@rax-ds/ui` first, because the app reads their `dist` folders.

| Command                 | What it does                                |
| ----------------------- | ------------------------------------------- |
| `pnpm playground`       | Builds the packages, starts the dev server  |
| `pnpm playground:build` | Builds the packages and the production site |

While you change `@rax-ds/ui`, run `pnpm --filter @rax-ds/ui dev` in a second terminal so the app sees the changes.

Set `NEXT_PUBLIC_SITE_URL` in the deploy environment to the public URL of the site. It is used for metadata, the sitemap and `robots.txt`, and falls back to `http://localhost:3000`.

## Folder structure

```txt
app/                  Routes: landing page, docs route, sitemap, robots
components/           UI of the docs site only (layout, code blocks, search)
config/
  site.ts             Name, description, links, site URL
  docs-nav.ts         The single list of docs pages. Sidebar, search, pager, metadata and sitemap read it
content/docs/         MDX pages (what to say)
examples/             Live examples, one file each, plus registry.ts (what to show)
lib/                  Helpers for docs lookup, highlighting and the table of contents
props/                Props table data, one file per component
types/                Shared types
mdx-components.tsx    Maps Markdown to design system components and lists what MDX can use without importing
```

## Add a component page

1. Create `examples/<name>/<name>-demo.tsx` and one file per other example.
2. Add every example to `examples/registry.ts`, with the keys sorted alphabetically.
3. Create `props/<name>.ts`.
4. Create `content/docs/components/<name>.mdx`. Follow the order of the Button page: preview, Installation, Usage, Examples, Accessibility, API reference.
5. Add the page to `config/docs-nav.ts`, in its sidebar group. The components overview page lists it automatically.

`pnpm playground:build` fails on an unknown example name or an MDX error, so a passing build confirms the page works.

## Rules

- Use design system components for everything, in pages and in examples. Use a native element only when the design system has no equivalent, and add a short comment that says why.
- Examples import only from `@rax-ds/ui`, `react`, `next` and `lucide-react`. Never use the `@/` alias, because users copy this code into their own projects.
- Add `'use client'` to an example only when it uses state or event handlers.
- When the props of a component change, update `props/<name>.ts` and the page in the same change. The props tables are written by hand.
- Do not change `packages/` from this app.
- Do not mention a specific project, client or brand in any page, example or commit.
- Code comments are in English.
