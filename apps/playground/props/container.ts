import type { PropDef } from '@/types/docs';

export const containerProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'xl'",
        description:
            'The maximum width. It stops at the matching Tailwind breakpoint (sm, md, lg, xl). full has no maximum width.',
    },
] as const satisfies readonly PropDef[];
