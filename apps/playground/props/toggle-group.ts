import type { PropDef } from '@/types/docs';

export const toggleGroupProps = [
    {
        name: 'type',
        type: "'single' | 'multiple'",
        description: 'Required. single allows one pressed item, multiple allows any number.',
    },
    {
        name: 'value',
        type: 'string | string[]',
        description: 'The pressed items, for controlled usage. A string for single, an array for multiple.',
    },
    {
        name: 'defaultValue',
        type: 'string | string[]',
        description: 'The initially pressed items for uncontrolled usage.',
    },
    {
        name: 'onValueChange',
        type: '(value: string | string[]) => void',
        description:
            'Called when the pressed items change. With single it receives an empty string when the item is unpressed.',
    },
    {
        name: 'variant',
        type: "'default' | 'outline'",
        default: "'default'",
        description: 'The style of every item.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'The size of every item.',
    },
    {
        name: 'spacing',
        type: "'default' | 'none'",
        default: "'default'",
        description: 'none joins the items into one connected bar.',
    },
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The direction of the items.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables every item.',
    },
] as const satisfies readonly PropDef[];

export const toggleGroupItemProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. The value of the item.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables this item.',
    },
] as const satisfies readonly PropDef[];
