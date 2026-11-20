import type { PropDef } from '@/types/docs';

export const selectProps = [
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
        name: 'open',
        type: 'boolean',
        description: 'Whether the list is open, for controlled usage. Use it with onOpenChange.',
    },
    {
        name: 'defaultOpen',
        type: 'boolean',
        description: 'Whether the list is open at first.',
    },
    {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Called when the list opens or closes.',
    },
    {
        name: 'name',
        type: 'string',
        description: 'The name of the hidden form field, so the value is submitted with a form.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the whole select.',
    },
    {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Marks the select as required in a form.',
    },
] as const satisfies readonly PropDef[];

export const selectTriggerProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, padding and font size. Matches the Input sizes.',
    },
] as const satisfies readonly PropDef[];

export const selectContentProps = [
    {
        name: 'position',
        type: "'popper' | 'item-aligned'",
        default: "'popper'",
        description: 'popper places the list next to the trigger and gives it at least the trigger width.',
    },
    {
        name: 'sideOffset',
        type: 'number',
        default: '4',
        description: 'Distance in pixels between the trigger and the list.',
    },
] as const satisfies readonly PropDef[];

export const selectItemProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. The value of the item. It cannot be an empty string.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents the item from being selected.',
    },
    {
        name: 'textValue',
        type: 'string',
        description: 'Text used for typeahead when the children are not plain text.',
    },
] as const satisfies readonly PropDef[];
