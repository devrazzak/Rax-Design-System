import type { PropDef } from '@/types/docs';

export const switchProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The size of the track and the thumb.',
    },
    {
        name: 'checked',
        type: 'boolean',
        description: 'The on state, for controlled usage. Use it with onCheckedChange.',
    },
    {
        name: 'defaultChecked',
        type: 'boolean',
        description: 'The initial state for uncontrolled usage.',
    },
    {
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
        description: 'Called when the state changes.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents interaction.',
    },
    {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marks the switch as required in a form.',
    },
    {
        name: 'name, value',
        type: 'string',
        description: 'Used when the switch is submitted with a form.',
    },
] as const satisfies readonly PropDef[];
