# rax-design-system: TODO (project audit, 18 Nov 2026)

পুরো project analyze করে যা পাওয়া গেছে। কোনো জরুরি bug নেই, কিন্তু production-এর আগে নিচের কাজগুলো করা দরকার। Order: উপর থেকে নিচে।

**যা verify করা হয়েছে:** Prettier, ESLint (`--max-warnings=0`), `tsc` (ui ও playground) সব clean। `npm pack --dry-run`: tarball 75 kB, শুধু `dist`, `src/styles`, LICENSE, README, notices। **Jest চালানো হয়নি** (Linux shell-এ Mac-এর `@swc/jest` binding load হয় না), তাই পুরো suite নিজে `pnpm test` চালিয়ে দেখতে হবে।

Version তখন: `@rax-ds/ui` 0.8.0, `@rax-ds/tokens` 0.6.0।

---

## 1. জরুরি (production-এর আগে)

- [ ] **CI যোগ করো।** `.github/` folder-ই নেই। Husky শুধু local-এ চলে, `--no-verify` দিয়ে bypass করা যায়, push বা PR-এ কোনো check হয় না।
    - ফাইল: `.github/workflows/ci.yml`
    - Trigger: `pull_request` ও `push` (main)
    - Steps: checkout, `pnpm/action-setup`, `actions/setup-node` (`.nvmrc` = 24), `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`
    - Commit: `ci: add CI workflow`
    - পরে (optional): `changesets/action` দিয়ে release PR automatic, npm provenance
- [ ] **`pnpm release`-এ check gate যোগ করো।** এখন `release` = `pnpm build && changeset publish`, মানে test/lint/typecheck ছাড়াই publish হয়, আর publish করা version বদলানো যায় না।
    - ফাইল: root `package.json`
    - Change: `"release": "pnpm lint && pnpm typecheck && pnpm test && pnpm build && changeset publish"`
    - Commit: `chore(repo): run checks before release`

## 2. Convention mismatch (public API)

- [ ] **Spinner-এর `color="inverse"` → `white`।** `COMPONENT-CONVENTIONS.md` বলে fixed white-এর নাম `white`, `inverse` না। `Heading`, `Text`, `Badge` সব `white` ব্যবহার করে, শুধু Spinner-এ `inverse`।
    - ফাইল: `spinner.variants.ts` (`colorClasses`), `spinner.stories.tsx` (line 43 ও 49, `color === 'inverse'`), spinner test (literal থাকলে), README (থাকলে)
    - Button-এ `inverse` ব্যবহার হয় না (grep করা হয়েছে)
    - 0.x-এ breaking, তাই changeset `minor`
    - Commits: `refactor(ui): rename Spinner inverse color to white`, `chore(repo): add Spinner color changeset`

## 3. Version drift (playground vs ui)

- [ ] **Version এক জায়গায় রাখো।** pnpm `catalog:` ব্যবহার করলে `pnpm-workspace.yaml`-এ এক জায়গায় থাকে।

| Package           | playground     | ui      |
| ----------------- | -------------- | ------- |
| react / react-dom | 19.3.0 (exact) | 19.3.1  |
| tailwindcss       | 4.3.3 (exact)  | ^4.3.5  |
| typescript        | ^5             | ^6.0.3  |
| @types/node       | ^20            | ^26.6.6 |

- এখন `node_modules`-এ React-এর দুটো copy আছে। Next.js নিজের bundled React ব্যবহার করে, তাই এখন সমস্যা দেখা যায় না, কিন্তু পরে "শুধু এক machine-এ হয়" ধরনের bug-এর কারণ হতে পারে।
- Commit: `chore(deps): align versions across workspace`

## 4. ছোট বিষয় (সময় পেলে)

- [ ] **`exports`-এ `default` condition।** এখন শুধু `import`, তাই CJS tooling (consumer-এর Jest config) resolve করতে পারে না। `packages/ui/package.json`-এর `"."` entry-তে `"default": "./dist/index.js"` যোগ করলে ক্ষতি নেই।
- [ ] **Sourcemap।** `.js.map` ship হয় কিন্তু `src` ship হয় না, তাই map source খুঁজে পায় না। হয় `src` ship করো, নয় `vite.lib.config.ts`-এ `sourcemap: false`।
- [ ] **`Dialog` ও `Drawer`-এর close button:** `aria-label="Close"` hardcoded English। International market-এর জন্য `closeLabel` prop লাগতে পারে। Simple রাখতে চাইলে আপাতত skip (সিদ্ধান্ত নেওয়া বাকি)।
- [ ] **Jest coverage threshold।** `test:coverage` আছে কিন্তু কোনো limit enforce হয় না। `jest.config.js`-এ `coverageThreshold` দেওয়া যায়।
- [ ] **Spinner-এর import style।** `import type * as React from 'react'`, বাকি component-এ `import type { ComponentProps } from 'react'`। Bug না, শুধু style mismatch।

---

## যা ভালো আছে (বদলানোর দরকার নেই)

Strict TypeScript (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`), ESLint `strictTypeChecked` ও jsx-a11y, সব component-এ axe test ও `className` override test, `any` ও `@ts-ignore` নেই, `dark:` class নেই, `"use client"` প্রতিটি module-এ থাকে (`preserveModules`), token build-এ light/dark parity check, dependencies external, `sideEffects` ঠিক, changesets ও commitlint scope ঠিক, সব component-এ `.tsx`, stories ও test আছে।

## Release-এর আগে মনে রাখো

- `packages/ui/README.md`-এর Components table update হয়েছে (Container, Section, Stack, Row, Grid)। পরের component-এও করতে হবে।
- Release commands: `docs/RAX-COMMANDS.txt` section 8।
