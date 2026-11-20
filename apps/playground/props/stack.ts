import type { PropDef } from '@/types/docs';

export const stackProps = [
    {
        name: 'gap',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Space between the children: 0, 8px, 16px, 24px and 32px.',
    },
    {
        name: 'align',
        type: "'start' | 'center' | 'end' | 'stretch'",
        default: "'stretch'",
        description: 'Horizontal alignment of the children.',
    },
] as const satisfies readonly PropDef[];
