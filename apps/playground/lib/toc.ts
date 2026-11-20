import { readFile } from 'node:fs/promises';
import path from 'node:path';

import GithubSlugger from 'github-slugger';

import type { TocItem } from '@/types/docs';

/**
 * Builds the "On this page" list from the `##` and `###` headings of an MDX file, on the server.
 * Ids come from the same slugger rehype-slug uses, so the links match the heading ids.
 */
export async function getTableOfContents(file: string): Promise<TocItem[]> {
    'use cache';

    const source = await readFile(path.join(process.cwd(), 'content', 'docs', `${file}.mdx`), 'utf8');
    const slugger = new GithubSlugger();
    const items: TocItem[] = [];
    let inCodeFence = false;

    for (const line of source.split('\n')) {
        if (line.startsWith('```')) inCodeFence = !inCodeFence;

        const match = inCodeFence ? null : /^(#{1,6}) (.+)$/.exec(line);
        if (!match) continue;

        // The heading text without inline code marks or link syntax, as rehype-slug sees it
        const title = match[2]
            .replace(/`/g, '')
            .replace(/\[(.+?)\]\(.+?\)/g, '$1')
            .trim();
        // Every heading goes through the slugger, so duplicate ids get the same -1, -2 suffixes as rehype-slug gives them
        const id = slugger.slug(title);

        if (match[1] === '##' || match[1] === '###') {
            items.push({ id, title, level: match[1] === '##' ? 2 : 3 });
        }
    }

    return items;
}
