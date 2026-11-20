import type { PropDef } from '@/types/docs';

export const optionSelectProps = [
    {
        name: 'options',
        type: '{ value: string; label: string; disabled?: boolean }[]',
        description: 'Required. The items of the list. Values are strings, so convert an id with String(id).',
    },
    {
        name: 'placeholder',
        type: 'string',
        description: 'Text shown when nothing is selected.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, padding and font size of the trigger.',
    },
    {
        name: 'value',
        type: 'string',
        description: 'The selected value, for controlled usage. Use it with onValueChange.',
    },
    {
        name: 'defaultValue',
        type: 'string',
        description: 'The initial value for uncontrolled usage.',
    },
    {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Called when the selected value changes.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the whole select.',
    },
    {
        name: 'id, className, aria-invalid, aria-label, aria-labelledby, aria-describedby',
        type: 'as on the native element',
        description:
            'Passed to the trigger button. The other Select root props (name, required, open and so on) are passed to Select.',
    },
] as const satisfies readonly PropDef[];
