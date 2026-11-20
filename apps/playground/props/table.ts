import type { PropDef } from '@/types/docs';

export const tableProps = [
    {
        name: 'className',
        type: 'string',
        description: 'Goes on the table element, not on the scroll container around it.',
    },
] as const satisfies readonly PropDef[];
