export interface DocItem {
    /** Path after `/docs`. Empty string is the introduction page at `/docs`. */
    slug: string;
    title: string;
    /** Used for the page meta description, search results and the page header. */
    description: string;
    /** The Radix primitive the component is built on, as in its docs URL (for example `dropdown-menu`). */
    radix?: string;
}

export interface DocSection {
    title: string;
    items: readonly DocItem[];
}

export interface PropDef {
    name: string;
    /** The TypeScript type as the reader should see it, for example `'sm' | 'md'`. */
    type: string;
    default?: string;
    description?: string;
}

export interface TocItem {
    /** Same id rehype-slug gives the heading. */
    id: string;
    title: string;
    level: 2 | 3;
}
