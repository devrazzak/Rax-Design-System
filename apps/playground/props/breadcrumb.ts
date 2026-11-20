import type { PropDef } from '@/types/docs';

export const breadcrumbProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The text size of the whole trail. The separator and the ellipsis follow it.',
    },
] as const satisfies readonly PropDef[];

export const breadcrumbLinkProps = [
    {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Renders the child element instead of an a element, for example a Next.js Link.',
    },
] as const satisfies readonly PropDef[];
