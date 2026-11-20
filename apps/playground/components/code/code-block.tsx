import { cn } from '@rax-ds/ui';

import { highlight } from '@/lib/highlight';

import { CopyButton } from './copy-button';

interface CodeBlockProps {
    code: string;
    lang?: string;
    className?: string;
}

/** The design system has no code block, so this surface is built here. */
export async function CodeBlock({ code, lang = 'tsx', className }: CodeBlockProps) {
    const html = await highlight(code, lang);

    return (
        <div className={cn('relative rounded-xl border border-border bg-muted', className)}>
            <div
                className="[&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:pr-12 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-6"
                // Safe: the HTML comes from Shiki, which escapes the code it is given
                dangerouslySetInnerHTML={{ __html: html }}
            />
            <CopyButton value={code} className="absolute top-2 right-2" />
        </div>
    );
}
