import type { PropDef } from '@/types/docs';

export const toggleProps = [
    {
        name: 'variant',
        type: "'default' | 'outline'",
        default: "'default'",
        description: 'The visual style. outline adds a border and a card background.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, padding and font size. An icon-only toggle is a square.',
    },
    {
        name: 'pressed',
        type: 'boolean',
        description: 'The pressed state, for controlled usage. Use it with onPressedChange.',
    },
    {
        name: 'defaultPressed',
        type: 'boolean',
        default: 'false',
        description: 'The initial state for uncontrolled usage.',
    },
    {
        name: 'onPressedChange',
        type: '(pressed: boolean) => void',
        description: 'Called when the state changes.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction.',
    },
] as const satisfies readonly PropDef[];
