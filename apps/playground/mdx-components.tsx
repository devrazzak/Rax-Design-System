import type { MDXComponents } from 'mdx/types';

// Required by @next/mdx in the App Router. Element mappings are added in later steps.
const components: MDXComponents = {};

export function useMDXComponents(): MDXComponents {
    return components;
}
