import type { PropDef } from '@/types/docs';

export const radioGroupProps = [
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
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        description:
            'Lays the items out in a row when horizontal. It also sets the arrow keys that move between items.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables every item.',
    },
    {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marks the group as required in a form.',
    },
    {
        name: 'name',
        type: 'string',
        description: 'The name used when the group is submitted with a form.',
    },
] as const satisfies readonly PropDef[];

export const radioGroupItemProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. The value of the item.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The size of the circle and the dot: 16px, 20px, 24px and 28px.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables this item.',
    },
] as const satisfies readonly PropDef[];
