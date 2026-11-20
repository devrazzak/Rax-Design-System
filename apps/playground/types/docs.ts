export interface DocItem {
    /** Path after `/docs`. Empty string is the introduction page at `/docs`. */
    slug: string;
    title: string;
    /** Used for the page meta description, search results and the page header. */
    description: string;
}

export interface DocSection {
    title: string;
    items: readonly DocItem[];
}
