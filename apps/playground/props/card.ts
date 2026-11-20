import type { PropDef } from '@/types/docs';

export const cardProps = [
    {
        name: 'padding',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The padding of the whole card, set once for every part: 12px, 16px, 24px and 32px.',
    },
    {
        name: 'radius',
        type: "'md' | 'lg' | 'xl'",
        default: "'xl'",
        description: 'The corner radius: 8px, 12px and 16px.',
    },
] as const satisfies readonly PropDef[];
