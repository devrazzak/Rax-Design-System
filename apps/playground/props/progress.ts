import type { PropDef } from '@/types/docs';

export const progressProps = [
    {
        name: 'value',
        type: 'number | null',
        description: 'How much is done, between 0 and max. The filled share is kept between 0 and 100 percent.',
    },
    {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'The value that means done.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The thickness of the bar: 4px, 8px, 12px and 16px.',
    },
    {
        name: 'getValueLabel',
        type: '(value: number, max: number) => string',
        description: 'Builds the text version of the value for screen readers. The default is a percentage.',
    },
] as const satisfies readonly PropDef[];
