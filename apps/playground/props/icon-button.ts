import type { PropDef } from '@/types/docs';

export const iconButtonProps = [
    {
        name: 'label',
        type: 'string',
        description: 'Required. The accessible name (aria-label) and the tooltip text.',
    },
    {
        name: 'tooltip',
        type: 'boolean',
        default: 'true',
        description: 'Shows the label in a tooltip on hover and focus.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Width and height. The button is a square that matches the Button of the same size.',
    },
    {
        name: 'rounded',
        type: "'md' | 'full'",
        default: "'md'",
        description: 'The corner shape. full makes a circle.',
    },
    {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'surface' | 'white' | 'ghost' | 'destructive' | 'link' | 'linkWhite'",
        default: "'primary'",
        description: 'Passed to Button. See the Button page.',
    },
    {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Passed to Button. Shows a spinner and blocks clicks, and keeps keyboard focus.',
    },
    {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Renders the child element instead of a button element, for example a Next.js Link.',
    },
] as const satisfies readonly PropDef[];
