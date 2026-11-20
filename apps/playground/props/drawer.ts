import type { PropDef } from '@/types/docs';

export const drawerProps = [
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
        description: 'When true the rest of the page is inert while the drawer is open.',
    },
] as const satisfies readonly PropDef[];

export const drawerContentProps = [
    {
        name: 'side',
        type: "'right' | 'left' | 'top' | 'bottom'",
        default: "'right'",
        description: 'The edge of the screen the drawer is attached to.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",
        default: "'md'",
        description:
            'The maximum width of a left or right drawer on screens wider than a phone. Top and bottom drawers always fill the width.',
    },
    {
        name: 'showCloseButton',
        type: 'boolean',
        default: 'true',
        description: 'Shows the close button in the top-right corner.',
    },
    {
        name: 'closeOnOutsideClick',
        type: 'boolean',
        default: 'true',
        description:
            'Set it to false to keep the drawer open when the user clicks outside it. Escape and the close controls still work.',
    },
] as const satisfies readonly PropDef[];
