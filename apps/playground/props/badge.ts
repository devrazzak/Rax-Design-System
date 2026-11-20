import type { PropDef } from '@/types/docs';

export const badgeProps = [
    {
        name: 'variant',
        type: "'primary' | 'secondary' | 'destructive' | 'outline' | 'white'",
        default: "'primary'",
        description: 'The visual style. white is a white pill for photos and dark backgrounds.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, padding and font size: 20px, 24px, 28px and 32px high.',
    },
    {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description:
            'Renders the child element instead of a span, for example a Next.js Link. Hover colors apply only to links.',
    },
] as const satisfies readonly PropDef[];
