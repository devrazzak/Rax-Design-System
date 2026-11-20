import type { PropDef } from '@/types/docs';

export const popoverProps = [
    {
        name: 'open',
        type: 'boolean',
        description: 'Whether it is open, for controlled usage. Use it with onOpenChange.',
    },
    {
        name: 'defaultOpen',
        type: 'boolean',
        description: 'Whether it is open at first, for uncontrolled usage.',
    },
    {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Called when it opens or closes.',
    },
    {
        name: 'modal',
        type: 'boolean',
        default: "'false'",
        description: 'When true the rest of the page is inert while the popover is open.',
    },
] as const satisfies readonly PropDef[];

export const popoverContentProps = [
    {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        default: "'bottom'",
        description: 'The preferred side of the trigger. It flips when there is not enough room.',
    },
    {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        default: "'center'",
        description: 'How the popover aligns to the trigger.',
    },
    {
        name: 'sideOffset',
        type: 'number',
        default: '4',
        description: 'Distance in pixels between the trigger and the popover.',
    },
] as const satisfies readonly PropDef[];
