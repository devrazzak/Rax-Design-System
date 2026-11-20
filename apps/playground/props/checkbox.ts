import type { PropDef } from '@/types/docs';

export const checkboxProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The size of the box and the check mark: 16px, 20px, 24px and 28px.',
    },
    {
        name: 'checked',
        type: "boolean | 'indeterminate'",
        description: 'The checked state, for controlled usage. Use it with onCheckedChange.',
    },
    {
        name: 'defaultChecked',
        type: "boolean | 'indeterminate'",
        description: 'The initial state for uncontrolled usage.',
    },
    {
        name: 'onCheckedChange',
        type: "(checked: boolean | 'indeterminate') => void",
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
        description: 'Marks the checkbox as required in a form.',
    },
    {
        name: 'name, value',
        type: 'string',
        description: 'Used when the checkbox is submitted with a form.',
    },
] as const satisfies readonly PropDef[];
