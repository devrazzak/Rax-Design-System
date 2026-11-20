import type { PropDef } from '@/types/docs';

export const alertDialogProps = [
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
] as const satisfies readonly PropDef[];

export const alertDialogContentProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description:
            'The maximum width on screens wider than a phone. There is no full size, because confirmations are short.',
    },
    {
        name: 'onEscapeKeyDown',
        type: '(event: KeyboardEvent) => void',
        description: 'Called when Escape is pressed.',
    },
    {
        name: 'onOpenAutoFocus',
        type: '(event: Event) => void',
        description: 'Called when focus moves into the dialog on open. By default the Cancel button gets focus.',
    },
] as const satisfies readonly PropDef[];

export const alertDialogButtonProps = [
    {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'surface' | 'white' | 'ghost' | 'destructive' | 'link' | 'linkWhite'",
        default: "Action: the Button default (primary). Cancel: 'outline'",
        description: 'The Button variant. Use destructive on the action when it deletes something.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        description: 'The Button size.',
    },
] as const satisfies readonly PropDef[];
