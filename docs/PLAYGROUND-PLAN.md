# Playground → Docs site: A–Z plan

`apps/playground`-কে shadcn/MUI-এর মতো একটা production-grade docs site বানানো: header, grouped sidebar, প্রতিটি component-এর page, live preview + code + copy, props table, ToC, Cmd+K search।

**Scope:** শুধু `apps/playground` (আর এই plan file)। `packages/*`-এ কোনো change হবে না। একটাই branch। প্রতিটি step শেষে commit command দেওয়া হবে, তুমি নিজে চালাবে। এক step শেষ → তুমি "ok" বললে পরের step।

---

## নিয়ম: সবসময় নিজেদের component (সবার আগে পড়ো)

এই app-এর প্রতিটি file-এ (layout, page, MDX mapping, example) **`@rax-ds/ui`-তে যে component আছে সেটাই ব্যবহার করতে হবে।** নিজে HTML element + Tailwind class দিয়ে বানানো যাবে শুধু তখন, যখন DS-এ সেই জিনিস নেই।

| দরকার                                                               | ব্যবহার করো                                            | নয়                          |
| ------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------- |
| Page width + side padding                                           | `Container`                                           | `mx-auto max-w-* px-*`      |
| Vertical padding, `section`/`article`/`aside`/`header`/`footer` tag | `Section` (`as`, `spacing`, `tone`)                   | native tag + `py-*`         |
| Flex column                                                         | `Stack` (`gap`, `align`)                              | `flex flex-col gap-*`       |
| Flex row                                                            | `Row` (`gap`, `align`, `justify`, `wrap`)             | `flex items-center gap-*`   |
| Grid                                                                | `Grid` / `GridItem`                                   | `grid grid-cols-*`          |
| Heading                                                             | `Heading` (`as`, `size`, `weight`, `color`)           | `<h2 className="text-*">`   |
| Paragraph / text                                                    | `Text`                                                | `<p className="text-*">`    |
| List                                                                | `List` / `ListItem` (`marker="none"` for plain lists) | `<ul className="flex ...">` |
| Divider                                                             | `Separator`                                           | `<hr>` / `border-t` div     |
| Button, icon button, toggle                                         | `Button`, `IconButton`, `Toggle`                      | custom `<button>`           |
| Table, Tabs, Dialog, Drawer, Tooltip, ScrollArea ...                | DS version                                            | নিজে বানানো                 |

- Spacing DS-এর scale থেকে নিতে হবে (`gap`: `none | sm 8px | md 16px | lg 24px | xl 32px`; `List` gap-এ `xs 4px`)। Scale-এর বাইরের `gap-10`, `gap-1` ধরনের মান নয়।
- **যেখানে DS-এ নেই, শুধু সেখানে native element** — আর সেখানে একটা ছোট English comment দিয়ে কারণ লেখা থাকবে। এখনকার exception:
    - `<main>` আর `<nav>` landmark (`Section`-এর `as`-এ এগুলো নেই)
    - `next/link` (navigation-এর জন্য), link-এর style class
    - MDX-এর inline `code`
    - MDX table-এর বাইরের margin wrapper (`Table`-এর `className` `<table>`-এ যায়, scroll container-এ না)
- নতুন exception দরকার হলে আগে owner-কে জানাতে হবে। DS-এ নতুন prop বা component যোগ করার প্রস্তাব দেওয়া যাবে, কিন্তু `packages/`-এ নিজে change করা যাবে না।

---

## 0. নেওয়া সিদ্ধান্ত (তোমার উত্তর অনুযায়ী)

| বিষয়         | সিদ্ধান্ত                                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Content      | MDX (`@next/mdx`), নিজের setup, কোনো docs framework না                                                                                             |
| Example code | প্রতিটি example একটা real `.tsx` file। Preview আর "Code" tab দুটোই সেই এক file থেকে আসে, তাই কখনো mismatch হয় না                                     |
| Props table  | App-এর ভেতরে হাতে লেখা typed data                                                                                                                  |
| v1 features  | Header, sidebar, preview/code tabs, copy button, dark mode, Installation, Foundations pages, right-side ToC, Cmd+K search, mobile sidebar (Drawer) |
| Docs UI      | যতটা সম্ভব `@rax-ds/ui` দিয়েই বানানো (dogfooding)। যা DS-এ নেই (code block, ToC, command menu) তা app-এর ভেতরে                                      |

### কেন এই approach (বিকল্পগুলোর সাথে তুলনা)

**Content: MDX vs TSX-only vs Fumadocs/Nextra**

- MDX: লেখা সহজ (markdown + JSX), shadcn এটাই করে। Setup একটু লাগে (`@next/mdx`, `mdx-components.tsx`)। ✅ বেছে নেওয়া
- TSX-only: dependency কম, কিন্তু লম্বা লেখা (description, notes) JSX-এ লেখা কষ্টকর আর review করা কঠিন
- Fumadocs/Nextra: দ্রুত, কিন্তু framework-এর নিয়মে বাঁধা, আর নিজের architecture শেখা হয় না

**Code দেখানোর source: real file vs string copy vs Storybook stories reuse**

- Real file (server-এ `fs` দিয়ে পড়া): এক source of truth ✅
- String হাতে লেখা: preview আর code আলাদা হয়ে যায় (classic docs bug)
- Stories reuse: stories-এ `args`/controls থাকে, user-কে দেখানোর মতো clean code না। Storybook dev/test workbench হিসেবেই থাকবে; docs site consumer-দের জন্য

**Syntax highlight: Shiki (server) vs Prism/highlight.js (client)**

- Shiki server-এ build time-এ HTML বানায়, browser-এ কোনো JS যায় না, VS Code-এর মতো নির্ভুল highlight, light/dark দুটো theme CSS variable দিয়ে ✅
- Client highlighter: bundle বড়, hydration-এর পরে রং আসে

**Search: `cmdk` vs নিজে বানানো**

- `cmdk`: combobox keyboard navigation আর a11y ready, ছোট library ✅ (DS-এর `Dialog`-এর ভেতরে বসবে)
- নিজে বানানো: listbox keyboard nav আর aria ঠিক করা ভুল-প্রবণ
- v1-এ search শুধু title/description/section-এ (full-text না)। পরে দরকার হলে full-text index যোগ করা যাবে

---

## 1. Routes

| URL                            | Page                                                              |
| ------------------------------ | ----------------------------------------------------------------- |
| `/`                            | ছোট landing (hero, "Get started", "Components" link)              |
| `/docs`                        | Introduction                                                      |
| `/docs/installation`           | Installation (pnpm/npm/yarn/bun tabs, CSS import, Tailwind setup) |
| `/docs/theming`                | Tokens override, brand color project-এ রাখা, scoped override      |
| `/docs/dark-mode`              | `.dark` class / `data-theme`, flash ছাড়া theme script             |
| `/docs/foundations/colors`     | Semantic color tokens (swatch + CSS variable name)                |
| `/docs/foundations/typography` | Font, Heading/Text scale                                          |
| `/docs/foundations/radius`     | Radius scale                                                      |
| `/docs/components/[slug]`      | প্রতিটি component (৪২টা)                                           |

সব route build time-এ static (`generateStaticParams`)। অচেনা URL-এ page নিজে `notFound()` দেয় → 404। (`cacheComponents` চালু থাকলে `dynamicParams` export করা যায় না, build fail করে।)

---

## 2. Folder structure

```txt
apps/playground/
├── app/
│   ├── layout.tsx                 # html, theme script, font, TooltipProvider
│   ├── globals.css                # tailwind + @rax-ds/ui styles + shiki + prose styles
│   ├── page.tsx                   # landing
│   ├── not-found.tsx
│   └── docs/
│       ├── layout.tsx             # header + sidebar + content + toc shell
│       └── [[...slug]]/
│           └── page.tsx           # one dynamic route for every doc page
├── content/
│   └── docs/                      # MDX only (what to say)
│       ├── index.mdx
│       ├── installation.mdx
│       ├── theming.mdx
│       ├── dark-mode.mdx
│       ├── foundations/{colors,typography,radius}.mdx
│       └── components/{button,input,...}.mdx
├── examples/                      # live examples (what to show)
│   ├── button/
│   │   ├── button-demo.tsx
│   │   ├── button-variants.tsx
│   │   └── button-sizes.tsx
│   ├── ...
│   └── registry.ts                # name -> lazy import (bundler needs static imports)
├── props/                         # API tables data, one file per component
│   ├── button.ts
│   └── ...
├── components/                    # docs-site UI only (not part of the design system)
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── sidebar-nav.tsx
│   │   ├── mobile-nav.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── table-of-contents.tsx
│   │   └── doc-pager.tsx
│   ├── search/
│   │   └── command-menu.tsx
│   ├── code/
│   │   ├── code-block.tsx         # server: highlight
│   │   ├── copy-button.tsx        # client
│   │   └── install-command.tsx    # pnpm/npm/yarn/bun tabs
│   └── docs/
│       ├── component-preview.tsx  # server: loads example + source, DS Tabs for Preview | Code
│       ├── props-table.tsx
│       ├── color-swatches.tsx     # foundations
│       └── radius-scale.tsx       # foundations
├── config/
│   ├── site.ts                    # name, description, repo url, npm url
│   └── docs-nav.ts                # THE single source: sidebar, search, pager, metadata, static params
├── lib/
│   ├── docs.ts                    # getDocBySlug, getPrevNext, flatten nav
│   ├── highlight.ts               # shiki, 'use cache'
│   └── example-source.ts          # read example file text
├── types/
│   └── docs.ts                    # DocItem, NavSection, PropDef
├── mdx-components.tsx             # required by @next/mdx (App Router)
└── next.config.ts
```

### প্রতিটি layer-এর দায়িত্ব (separation of concerns)

- `config/docs-nav.ts` = **data**: কোন page আছে, title, description, section, order। Sidebar, search, prev/next, `generateMetadata`, `generateStaticParams` সব এখান থেকে পড়ে। নতুন page = এখানে এক entry + এক MDX file
- `content/` = **লেখা**। Frontmatter নেই (metadata config-এ, typed থাকে; frontmatter-এ type-safety নেই আর আলাদা plugin লাগে)
- `examples/` = **চলমান code**। শুধু `@rax-ds/ui`, `react`, `next`, `lucide-react` import করা যাবে, কারণ user ঠিক এটাই copy করবে। `@/` alias examples-এ নিষেধ
- `props/` = **API data**
- `components/` = docs site-এর নিজের UI। এগুলো design system-এর অংশ না, package-এ যাবে না
- `lib/` = pure helper (I/O, highlight, lookup)

---

## 3. মূল mechanism-গুলো কীভাবে কাজ করবে

### 3.1 Docs route

```tsx
// app/docs/[[...slug]]/page.tsx (shape only)
export function generateStaticParams() {
    return getAllDocs().map(doc => ({ slug: doc.slug === '' ? [] : doc.slug.split('/') }));
}

export async function generateMetadata({ params }: PageProps<'/docs/[[...slug]]'>) {
    /* title + description from config */
}

export default async function DocPage({ params }: PageProps<'/docs/[[...slug]]'>) {
    const { slug } = await params;
    const doc = getDocBySlug(slug); // notFound() if missing
    const { default: Content } = await import(`@/content/docs/${doc.file}.mdx`);
    return <Content />;
}
```

Next 16-এ `params` একটা Promise, তাই `await` লাগে।

### 3.2 Example preview + code

MDX-এ:

```mdx
<ComponentPreview name="button/button-variants" />
```

`ComponentPreview` (server component):

1. `registry[name]` থেকে component load করে। অচেনা name → `throw` → **build fail** (fail fast, ভুল নাম production-এ যায় না)
2. `examples/<name>.tsx` file text পড়ে (`fs`)
3. Shiki দিয়ে highlight করে (`'use cache'`, তাই build-এ একবার)
4. DS `Tabs`-এ Preview আর Code দেখায়। `Tabs` নিজেই client component, তাই আলাদা client wrapper লাগে না

যে example-এ state লাগে (controlled Dialog, Tabs value) সেটার উপরে `'use client'` থাকবে, code tab-এও সেটা দেখাবে (user-এর জন্য সঠিক তথ্য)।

### 3.3 MDX-এর ভেতরের code block (` ```tsx `)

`mdx-components.tsx`-এ `pre`-কে আমাদের `CodeBlock`-এ map করা হবে, তাই example code আর MDX code block **একই** Shiki pipeline দিয়ে যায়। (বিকল্প `rehype-pretty-code`; কিন্তু তখন দুটো highlight পথ হয়ে যায়।)

MDX plugin: শুধু `remark-gfm` (markdown table) আর `rehype-slug` (heading-এ `id`, ToC ও anchor link-এর জন্য)।

### 3.4 Props table

```ts
// props/button.ts
import type { PropDef } from '@/types/docs';

export const buttonProps = [
    {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'",
        default: "'primary'",
    },
    { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'" },
    { name: 'loading', type: 'boolean', default: 'false', description: '...' },
    { name: 'asChild', type: 'boolean', default: 'false', description: '...' },
] satisfies PropDef[];
```

Compound component (Dialog, Select) হলে প্রতিটি part-এর আলাদা table।

### 3.5 ToC

Server-এ তৈরি হয় (`lib/toc.ts`): MDX file-এর `##`/`###` heading পড়ে, `rehype-slug`-এর মতো একই `github-slugger` দিয়ে id বানায়, তাই link আর heading id সবসময় মেলে। ফলে ToC প্রথম HTML-এই থাকে, কোনো flash নেই। Client component (`TableOfContents`) শুধু `IntersectionObserver` দিয়ে active heading highlight করে। শুধু `xl` screen-এ দেখায়।

### 3.6 Search

`docs-nav.ts` থেকে `{ title, description, section, href }` list → client `CommandMenu` (`cmdk` + DS `Dialog`)। `⌘K` / `Ctrl+K` দিয়ে খোলে। Select করলে `router.push`।

### 3.7 Theme

এখনকার inline script approach-ই থাকবে (Next 16-এর official "preventing flash before hydration" pattern)। Toggle শুধু `.dark` class বদলায়; component-এ কোনো `dark:` class নেই, সব token দিয়ে।

### 3.8 Font

Token-এ font family `Inter`। App-এ `next/font` দিয়ে Inter load করে `--rax-font-sans` override করা হবে (app-level override, package-এ change নেই)।

---

## 4. Component page template (সব page একই order)

1. **Title + description** (config থেকে, auto)
2. **Hero preview**: `<name>-demo`
3. **Installation**: ছোট `InstallCommand` + full guide-এর link
4. **Usage**: import line + সবচেয়ে ছোট usage
5. **Examples** (প্রতিটি `###` heading + এক লাইনের ব্যাখ্যা + preview): variants, sizes, states (disabled, loading, invalid), with icon, `asChild`, controlled, composition — যেটা যে component-এ খাটে
6. **Accessibility**: keyboard, aria, label দেওয়ার নিয়ম
7. **API reference**: props table(s)

Sidebar group (MUI-style, কারণ ৪২টা component flat list-এ খোঁজা কষ্ট):

- **Layout:** Container, Section, Stack, Row, Grid, Separator, ScrollArea
- **Typography:** Heading, Text, List
- **Inputs:** Button, IconButton, Input, Textarea, Select, OptionSelect, Checkbox, RadioGroup, Switch, Toggle, ToggleGroup, InputOTP, InputGroup, Label, Field
- **Feedback:** Alert, Badge, Progress, Skeleton, Spinner
- **Overlay:** Dialog, AlertDialog, Drawer, Popover, Tooltip, DropdownMenu
- **Data display:** Avatar, Card, Table, Accordion, Tabs
- **Navigation:** Breadcrumb

---

## 5. Dependencies (শুধু `apps/playground`-এ)

| Package                                                      | কেন                                                                                                            |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx` | MDX                                                                                                            |
| `remark-gfm`, `rehype-slug`                                  | Markdown table, heading id                                                                                     |
| `shiki`                                                      | Server-side highlight                                                                                          |
| `cmdk`                                                       | Command menu                                                                                                   |
| `lucide-react`                                               | Docs UI আর examples-এর icon (`@rax-ds/ui`-এর icons public export না, আর user নিজের icon library-ই ব্যবহার করবে) |

---

## 6. আগে থেকে জানা সমস্যা, limit আর side effect

1. **Turbopack + MDX plugin:** Turbopack-এ remark/rehype plugin **string নাম** দিয়ে দিতে হয়, option serializable হতে হবে (function দেওয়া যায় না)। তাই custom JS plugin এড়ানো হয়েছে
2. **`cacheComponents: true`:** async কাজ (Shiki highlight) `'use cache'` ছাড়া রাখলে build error ("uncached data outside Suspense") হতে পারে। তাই `highlight.ts` ও `example-source.ts`-এ `'use cache'`
3. **`@rax-ds/ui` build আগে লাগে:** playground package-এর `dist` পড়ে। `pnpm playground` এটা করে দেয়। Package-এ change করার সময় আলাদা terminal-এ `pnpm --filter @rax-ds/ui dev` (watch) চালাতে হবে
4. **Overlay animation নেই:** search dialog আর mobile drawer animation ছাড়া খুলবে, কারণ DS-এ ইচ্ছা করে বাদ রাখা আছে। Overlay animation set যোগ হলে docs-এ automatically আসবে
5. **Props table হাতে লেখা → drift-এর ঝুঁকি:** কোনো component-এর prop বদলালে `apps/playground/props/<name>.ts`-ও update করতে হবে। Final step-এ এটা `COMPONENT-CONVENTIONS.md`/`CLAUDE.md`-এর checklist-এ যোগ করার প্রস্তাব দেব (তোমার অনুমতি নিয়ে)
6. **ToC server-এ MDX source পড়ে বানানো হয়:** heading-এ JSX component বা অদ্ভুত markdown থাকলে id না মিলতে পারে। Heading-এ শুধু সাধারণ text, inline code বা link রাখো
7. **Search v1 শুধু title/description-এ**
8. **DS-এ `Command`, `Kbd` নেই:** app-এর ভেতরে বানানো হবে, package-এ না
9. **Version drift:** playground-এ `typescript ^5`, root-এ `^6`; `react 19.3.0` বনাম ui-তে `19.3.1`। Step 0-এ শুধু playground-এর `package.json` align করার প্রস্তাব (package-এ হাত না দিয়ে)
10. **Deploy (Vercel ধরে):** build command-এ আগে tokens আর ui build লাগবে: `pnpm --filter @rax-ds/tokens build && pnpm --filter @rax-ds/ui build && pnpm --filter playground build`। Root `package.json`-এ script যোগ করতে চাইলে সেটা তোমার সিদ্ধান্ত (এটা `packages/` না, কিন্তু app-এর বাইরে)
11. **কাজের পরিমাণ:** ৪২টা component × গড়ে ৪–৬ example ≈ ২০০ example file। তাই infrastructure আগে, তারপর component এক এক করে
12. **কোনো single project/client-এর নাম docs, example বা commit-এ থাকবে না**

---

## 7. Implementation steps (এক step = এক "ok")

প্রতিটি step-এর শেষে: `pnpm --filter playground build`, `pnpm lint`, `pnpm typecheck`, `pnpm format:check` (তুমি চালাবে), তারপর commit command।

### Phase A: Foundation

- **Step 1: Setup.** Dependencies যোগ, playground-এ `typecheck` script, version align, `next.config.ts`-এ MDX (`pageExtensions`, `createMDX`, string plugins), root `mdx-components.tsx`। Commits: `chore(playground): add docs dependencies`, `chore(playground): set up MDX`
- **Step 2: Types + config.** `types/docs.ts`, `config/site.ts`, `config/docs-nav.ts` (সব page entry, শুরুতে শুধু getting-started), `lib/docs.ts`। Commit: `feat(playground): add docs navigation config`
- **Step 3: App shell.** Root layout (font, theme script, TooltipProvider), `docs/layout.tsx`, `SiteHeader`, `SidebarNav` (active link), `ThemeToggle`, `MobileNav` (DS `Drawer`, `side="left"`)। Commit: `feat(playground): add docs layout`
- **Step 4: Docs route.** `[[...slug]]/page.tsx`, `generateStaticParams`, `generateMetadata`, `not-found.tsx`, prose styling (MDX element → DS `Heading`/`Text`/`List`)। Commit: `feat(playground): add docs page route`

### Phase B: Content engine

- **Step 5: Code block.** `lib/highlight.ts`, `CodeBlock`, `CopyButton`, `pre` mapping, `InstallCommand`। Commit: `feat(playground): add code block with copy`
- **Step 6: Component preview.** `examples/registry.ts`, `lib/example-source.ts`, `ComponentPreview`। Commit: `feat(playground): add component preview`
- **Step 7: Props table + Alert in MDX.** Callout আলাদা বানানো হয়নি, DS-এর `Alert` MDX-এ register করা হয়েছে। Commit: `feat(playground): add props table`
- **Step 8: ToC + prev/next pager.** Commit: `feat(playground): add table of contents and pager`
- **Step 9: Search.** `CommandMenu`, header-এ trigger + `⌘K`। Commit: `feat(playground): add command menu search`

### Phase C: Content

- **Step 10: Getting started pages.** Introduction, Installation, Theming, Dark mode। পুরনো playground demo (scoped brand override, server-component Button) এখানে example হয়ে যাবে। Commit: `docs(playground): add getting started pages`
- **Step 11: Foundations.** Colors, Typography, Radius। Commit: `docs(playground): add foundations pages`
- **Step 12 → 53: Components, এক step-এ একটা।** Button প্রথমে (template হিসেবে, তুমি review করে approve করলে বাকিগুলো একই pattern-এ), তারপর sidebar group order-এ। প্রতিটির জন্য: MDX + examples + registry entry + props + nav entry। Commit: `docs(playground): add <name> docs`

### Phase D: Finish

- **Step 54: Landing page + পুরনো file cleanup** (`loading-demo.tsx`, `loading-states.tsx` ইত্যাদি, content migrate হওয়ার পরে)। Commit: `feat(playground): add landing page`
- **Step 55: SEO + QA.** `sitemap.ts`, `robots.ts`, metadata check; keyboard-only navigation, dark mode, mobile, Lighthouse (performance, a11y)। Commit: `chore(playground): add sitemap and robots`
- **Step 56: Docs/README update.** `apps/playground/README.md` (কীভাবে নতুন component page যোগ করতে হয়), conventions checklist (অনুমতি নিয়ে)। Commit: `docs(playground): document adding a component page`

Changeset লাগবে না: `playground` private, কোনো published package বদলাচ্ছে না।

---

## 8. নতুন component page যোগ করার নিয়ম (final workflow)

1. `examples/<name>/<name>-demo.tsx` আর অন্যান্য example
2. `examples/registry.ts`-এ entry
3. `props/<name>.ts`
4. `content/docs/components/<name>.mdx` (section 4-এর template)
5. `config/docs-nav.ts`-এ entry (group অনুযায়ী)

Build pass করলেই নিশ্চিত: সব example name ঠিক, সব MDX compile হয়েছে, সব route তৈরি।

---

## 9. Status

Step 1–12 শেষ (infrastructure, Getting Started, Foundations, Button page)। Button page বাকি সব component page-এর **template**।

## 10. বাকি component page-এর জন্য Claude Code prompt

একবারে একটা sidebar group দাও। প্রতিটি batch-এর পরে diff review, `pnpm typecheck && pnpm lint && pnpm format:check && pnpm playground:build`, browser-এ দেখা, তারপর commit।

```text
Read CLAUDE.md, docs/COMPONENT-CONVENTIONS.md and docs/PLAYGROUND-PLAN.md first (the "নিয়ম" section and sections 2-4, 8).
Work only inside apps/playground. Do not change anything in packages/.

Add docs pages for these components: <list, e.g. Layout group: Container, Section, Stack, Row, Grid, Separator, ScrollArea>.

Use the Button page as the exact template:
- content/docs/components/button.mdx (section order: hero preview, Installation, Usage, Examples, Accessibility, API reference)
- examples/button/*.tsx (one file per example, default export, imports only from @rax-ds/ui, react, next, lucide-react; no @/ alias)
- examples/registry.ts (add every example, keep keys sorted)
- props/button.ts (PropDef list; read the real props, defaults and comments from packages/ui/src/components/<name>/; no backticks in descriptions)
- config/docs-nav.ts (add the page to its sidebar group, create the group if missing, in the order of section 4 of the plan)

Rules:
- Always use design system components (Row, Stack, Grid, Section, Heading, Text, ...) in examples and pages. Native elements only where the plan lists an exception.
- Examples must look like real product usage, with realistic labels. Never mention a specific project or client.
- Cover every variant, size and state the component supports, plus controlled usage and asChild where they exist.
- Write the Accessibility section from the component source and Radix behaviour; do not invent keyboard support.
- Code comments in English. Keep code simple, no extra helpers.
- Do not commit. When done, list the files changed and anything you were unsure about.
```
