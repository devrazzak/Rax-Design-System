import type { PropDef } from '@/types/docs';

export const listProps = [
    {
        name: 'as',
        type: "'ul' | 'ol'",
        default: "'ul'",
        description: 'The tag to render. Use ol for an ordered list.',
    },
    {
        name: 'marker',
        type: "'disc' | 'decimal' | 'none'",
        default: "'disc' for ul, 'decimal' for ol",
        description:
            'The marker before each item. With none the list gets role="list" so screen readers still announce it.',
    },
    {
        name: 'gap',
        type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'sm'",
        description: 'Space between the items: 0, 4px, 8px, 16px, 24px and 32px.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        description: 'The font size. Not set by default, so the list inherits it.',
    },
    {
        name: 'color',
        type: "'foreground' | 'muted' | 'primary' | 'secondary' | 'white'",
        description: 'The text color. Not set by default, so the list inherits it.',
    },
] as const satisfies readonly PropDef[];

export const listItemProps = [
    {
        name: 'icon',
        type: 'ReactNode',
        description:
            'An icon shown before the text, for example a check mark. It is hidden from screen readers and sized to the font. Use it with marker none on the List.',
    },
] as const satisfies readonly PropDef[];
