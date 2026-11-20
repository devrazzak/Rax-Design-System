import type { DocSection } from '@/types/docs';

/**
 * Single source of truth for every docs page.
 * Sidebar, search, prev/next links, metadata and static params are all built from this list.
 * Each item needs a matching MDX file: `content/docs/<slug>.mdx` (`index.mdx` for the empty slug).
 */
export const docsNav: readonly DocSection[] = [
    {
        title: 'Getting Started',
        items: [
            {
                slug: '',
                title: 'Introduction',
                description: 'What the design system is, what it includes and how it is built.',
            },
            {
                slug: 'installation',
                title: 'Installation',
                description: 'Install the packages and set up Tailwind CSS and the styles.',
            },
            {
                slug: 'theming',
                title: 'Theming',
                description: 'Override design tokens to apply your own brand.',
            },
            {
                slug: 'dark-mode',
                title: 'Dark Mode',
                description: 'Switch themes with a class or attribute, without a flash on load.',
            },
        ],
    },
    {
        title: 'Foundations',
        items: [
            {
                slug: 'foundations/colors',
                title: 'Colors',
                description: 'Semantic color tokens for surfaces, text, brand and status, in light and dark.',
            },
            {
                slug: 'foundations/typography',
                title: 'Typography',
                description: 'Font families and the Heading and Text size scales.',
            },
            {
                slug: 'foundations/radius',
                title: 'Radius',
                description: 'The corner radius scale used by every component.',
            },
        ],
    },
    {
        title: 'Inputs',
        items: [
            {
                slug: 'components/button',
                title: 'Button',
                description: 'Triggers an action. Comes with variants, sizes, icons and a loading state.',
            },
        ],
    },
];
