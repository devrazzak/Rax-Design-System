import type { PropDef } from '@/types/docs';

export const textProps = [
    {
        name: 'as',
        type: "'p' | 'span' | 'div'",
        default: "'p'",
        description: 'The tag to render. Use span for inline text.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The font size.',
    },
    {
        name: 'weight',
        type: "'regular' | 'medium' | 'semibold' | 'bold'",
        default: "'regular'",
        description: 'The font weight.',
    },
    {
        name: 'color',
        type: "'foreground' | 'muted' | 'primary' | 'secondary' | 'white'",
        default: "'foreground'",
        description: 'The text color. white is for colored or dark backgrounds.',
    },
    {
        name: 'textAlign',
        type: "'start' | 'center' | 'end' | 'justify'",
        description: 'Horizontal alignment. start and end follow the reading direction. Not set by default.',
    },
    {
        name: 'textTransform',
        type: "'uppercase' | 'lowercase' | 'capitalize'",
        description: 'Changes the letter case. Not set by default.',
    },
    {
        name: 'tracking',
        type: "'tight' | 'normal' | 'wide' | 'wider' | 'widest'",
        description: 'The letter spacing. Not set by default.',
    },
] as const satisfies readonly PropDef[];
