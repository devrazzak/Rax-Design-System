import type { PropDef } from '@/types/docs';

export const gridProps = [
    {
        name: 'columns',
        type: '1 | 2 | 3 | 4 | 6 | 12 | { base?: Columns; sm?: Columns; md?: Columns; lg?: Columns; xl?: Columns }',
        default: '2',
        description:
            'A number applies from the md breakpoint up, and the grid is one column below it. An object sets the count per breakpoint. A missing breakpoint keeps the one before it, and base defaults to 1. Columns is 1, 2, 3, 4, 6 or 12.',
    },
    {
        name: 'gap',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Space between the items: 0, 8px, 16px, 24px and 32px.',
    },
] as const satisfies readonly PropDef[];

export const gridItemProps = [
    {
        name: 'span',
        type: '1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12',
        description:
            'How many columns the item covers from the md breakpoint up. Below md every item takes the full row. Without span the item covers one column.',
    },
] as const satisfies readonly PropDef[];
