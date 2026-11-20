import type { PropDef } from '@/types/docs';

export const rowProps = [
    {
        name: 'gap',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Space between the children: 0, 8px, 16px, 24px and 32px.',
    },
    {
        name: 'align',
        type: "'start' | 'center' | 'end' | 'stretch'",
        default: "'center'",
        description: 'Vertical alignment of the children.',
    },
    {
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'between'",
        default: "'start'",
        description: 'Horizontal distribution of the children.',
    },
    {
        name: 'wrap',
        type: 'boolean',
        default: 'false',
        description: 'Moves the children to the next line when they do not fit.',
    },
] as const satisfies readonly PropDef[];
