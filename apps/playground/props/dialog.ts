import type { PropDef } from '@/types/docs';

export const dialogProps = [
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
        default: "'true'",
        description: 'When true the rest of the page is inert while the dialog is open.',
    },
] as const satisfies readonly PropDef[];

export const dialogContentProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'md'",
        description:
            'The maximum width on screens wider than a phone. full fills the screen width and keeps a small margin.',
    },
    {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        description: 'Shows the close button in the top-right corner.',
    },
    {
        name: 'onEscapeKeyDown',
        type: '(event: KeyboardEvent) => void',
        description: 'Called when Escape is pressed. Call event.preventDefault() to keep the dialog open.',
    },
    {
        name: 'onInteractOutside',
        type: '(event: Event) => void',
        description:
            'Called when the user clicks or focuses outside. Call event.preventDefault() to keep the dialog open.',
    },
    {
        name: 'onOpenAutoFocus',
        type: '(event: Event) => void',
        description:
            'Called when focus moves into the dialog on open. Call event.preventDefault() to choose the focused element yourself.',
    },
    {
        name: 'onCloseAutoFocus',
        type: '(event: Event) => void',
        description: 'Called when focus returns to the trigger on close.',
    },
] as const satisfies readonly PropDef[];
