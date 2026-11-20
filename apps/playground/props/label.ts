import type { PropDef } from '@/types/docs';

export const labelProps = [
    {
        name: 'size',
        type: "'sm' | 'md'",
        default: "'md'",
        description: 'The font size.',
    },
    {
        name: 'htmlFor',
        type: 'string',
        description: 'The id of the control the label belongs to.',
    },
    {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Renders the child element instead of a label element.',
    },
] as const satisfies readonly PropDef[];
