import type { PropDef } from '@/types/docs';

export const separatorProps = [
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description:
            'The direction of the line. A vertical separator stretches to the height of its parent, so the parent needs a height.',
    },
    {
        name: 'decorative',
        type: 'boolean',
        default: 'true',
        description:
            'When true the separator is hidden from assistive technology. Set it to false when the line divides content in a meaningful way.',
    },
] as const satisfies readonly PropDef[];
