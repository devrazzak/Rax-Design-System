export const siteConfig = {
    name: 'Rax Design System',
    // Used for absolute URLs in metadata, the sitemap and robots.txt. Set it in the deploy environment.
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    description: 'Accessible React components built on Radix UI and Tailwind CSS, themed with design tokens.',
    links: {
        github: 'https://github.com/devrazzak/Rax-Design-System',
        npm: 'https://www.npmjs.com/package/@rax-ds/ui',
    },
} as const;
