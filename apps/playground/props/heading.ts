import type { PropDef } from '@/types/docs';

export const headingProps = [
    {
        name: 'as',
        type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'",
        default: "'h2'",
        description: 'The heading tag to render. The size follows the tag unless size is passed.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'",
        default: 'By tag: h1 5xl, h2 4xl, h3 3xl, h4 2xl, h5 xl, h6 lg',
        description: 'The visual size only. It does not change the tag. From xl up the size grows on large screens.',
    },
    {
        name: 'weight',
        type: "'regular' | 'medium' | 'semibold' | 'bold'",
        default: "'semibold'",
        description: 'The font weight.',
    },
    {
        name: 'color',
        type: "'foreground' | 'muted' | 'primary' | 'secondary' | 'white'",
        default: "'foreground'",
        description: 'The text color. white is for colored or dark backgrounds.',
    },
    {
        name: 'textTransform',
        type: "'uppercase' | 'lowercase' | 'capitalize'",
        description: 'Changes the letter case. Not set by default.',
    },
] as const satisfies readonly PropDef[];
