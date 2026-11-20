import type { PropDef } from '@/types/docs';

export const accordionProps = [
    {
        name: 'type',
        type: "'single' | 'multiple'",
        description: 'Required. single opens one item at a time, multiple lets several stay open.',
    },
    {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description: 'With type single, lets the user close the open item. Not used with multiple.',
    },
    {
        name: 'value',
        type: 'string | string[]',
        description: 'The open items, for controlled usage. A string for single, an array for multiple.',
    },
    {
        name: 'defaultValue',
        type: 'string | string[]',
        description: 'The items open at first, for uncontrolled usage.',
    },
    {
        name: 'onValueChange',
        type: '(value: string | string[]) => void',
        description: 'Called when the open items change.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Trigger height, text size and chevron size of every item: 40px, 48px, 56px and 64px.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables every item.',
    },
] as const satisfies readonly PropDef[];

export const accordionItemProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. A unique value for the item.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables this item.',
    },
] as const satisfies readonly PropDef[];
