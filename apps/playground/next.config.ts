import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
    cacheComponents: true,
    partialPrefetching: true,
    turbopack: {
        rules: {
            '*.css': {
                loaders: ['@tailwindcss/turbopack'],
                as: '*.css',
            },
        },
    },
};

// MDX files are imported from content/, not used as routes, so pageExtensions stays default.
// Turbopack only accepts plugins by name with serializable options.
const withMDX = createMDX({
    options: {
        remarkPlugins: ['remark-gfm'],
        rehypePlugins: ['rehype-slug'],
    },
});

export default withMDX(nextConfig);
