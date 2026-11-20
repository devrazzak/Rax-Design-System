import type { ComponentProps } from 'react';
import { isValidElement } from 'react';

import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

import {
    Heading,
    List,
    ListItem,
    Separator,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Text,
} from '@rax-ds/ui';

import { CodeBlock } from '@/components/code/code-block';
import { InstallCommand } from '@/components/code/install-command';

const linkClassName = 'font-medium text-primary underline underline-offset-4';

// Markdown elements mapped to design system components, so docs pages look like the rest of the site.
// rehype-slug adds an `id` to every heading; it passes through with the props.
// The HTML `color` attribute is a string and clashes with the typed DS `color` prop. Markdown never sets it, so it is dropped.
const components: MDXComponents = {
    h2: ({ color: _color, ...props }: ComponentProps<'h2'>) => (
        <Heading as="h2" size="2xl" className="mt-12 mb-4 scroll-mt-20 border-b border-border pb-2" {...props} />
    ),
    h3: ({ color: _color, ...props }: ComponentProps<'h3'>) => (
        <Heading as="h3" size="xl" className="mt-8 mb-3 scroll-mt-20" {...props} />
    ),
    p: ({ color: _color, ...props }: ComponentProps<'p'>) => <Text className="my-4 leading-7" {...props} />,
    ul: ({ color: _color, ...props }: ComponentProps<'ul'>) => <List className="my-4" {...props} />,
    ol: ({ color: _color, ...props }: ComponentProps<'ol'>) => <List as="ol" className="my-4" {...props} />,
    li: (props: ComponentProps<'li'>) => <ListItem className="leading-7" {...props} />,
    hr: () => <Separator className="my-8" />,
    a: ({ href = '', children, ...props }: ComponentProps<'a'>) =>
        // Internal links use client-side navigation, external ones open in a new tab
        href.startsWith('/') ? (
            <Link href={href} className={linkClassName} {...props}>
                {children}
            </Link>
        ) : (
            <a href={href} className={linkClassName} target="_blank" rel="noreferrer" {...props}>
                {children}
            </a>
        ),
    // A fenced block arrives as <pre><code className="language-tsx">text</code></pre>
    pre: ({ children }: ComponentProps<'pre'>) => {
        if (!isValidElement<ComponentProps<'code'>>(children) || typeof children.props.children !== 'string') {
            return <pre>{children}</pre>;
        }

        const lang = /language-(\w+)/.exec(children.props.className ?? '')?.[1] ?? 'text';

        return <CodeBlock code={children.props.children.trimEnd()} lang={lang} className="my-6" />;
    },
    // Inline code only; fenced code is handled by `pre` above
    code: (props: ComponentProps<'code'>) => (
        <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-sm" {...props} />
    ),
    // Table puts className on <table>, not on its scroll container, so the outer margin needs a wrapper
    table: (props: ComponentProps<'table'>) => (
        <div className="my-6">
            <Table {...props} />
        </div>
    ),
    thead: TableHeader,
    tbody: TableBody,
    tr: TableRow,
    th: TableHead,
    td: TableCell,
    // Custom components that MDX files can use without importing them
    InstallCommand,
};

export function useMDXComponents(): MDXComponents {
    return components;
}
