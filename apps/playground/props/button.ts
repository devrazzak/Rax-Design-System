import type { PropDef } from '@/types/docs';

export const buttonProps = [
    {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'surface' | 'white' | 'ghost' | 'destructive' | 'link' | 'linkWhite'",
        default: "'primary'",
        description: 'The visual style. white and linkWhite are for colored or dark backgrounds.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, padding, font size and icon size.',
    },
    {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Shows a spinner, blocks clicks and form submission, and keeps keyboard focus. Icons are hidden.',
    },
    {
        name: 'loadingPosition',
        type: "'start' | 'end'",
        default: "'end'",
        description: 'Which side of the label the spinner appears on.',
    },
    {
        name: 'asChild',
        type: 'boolean',
        default: 'false',
        description: 'Renders the child element instead of a button element, for example a Next.js Link.',
    },
    {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        default: "'button'",
        description: 'Defaults to button, so a button inside a form never submits by accident.',
    },
] as const satisfies readonly PropDef[];
