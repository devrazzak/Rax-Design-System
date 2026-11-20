import type { PropDef } from '@/types/docs';

export const textareaProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description:
            'Minimum height, padding and font size. The field grows with its content up to a maximum height, then it scrolls.',
    },
] as const satisfies readonly PropDef[];
