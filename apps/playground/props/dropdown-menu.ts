import type { PropDef } from '@/types/docs';

export const dropdownMenuProps = [
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
        description: 'When true the rest of the page is inert while the menu is open.',
    },
] as const satisfies readonly PropDef[];

export const dropdownMenuContentProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Text size and vertical padding of every item. Set it once here.',
    },
    {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        default: "'start'",
        description: 'How the menu aligns to the trigger.',
    },
    {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        default: "'bottom'",
        description: 'The preferred side of the trigger. It flips when there is not enough room.',
    },
    {
        name: 'sideOffset',
        type: 'number',
        default: '4',
        description: 'Distance in pixels between the trigger and the menu.',
    },
] as const satisfies readonly PropDef[];

export const dropdownMenuItemProps = [
    {
        name: 'variant',
        type: "'default' | 'destructive'",
        default: "'default'",
        description: 'Use destructive for actions that delete or cannot be undone.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents the item from being selected.',
    },
    {
        name: 'onSelect',
        type: '(event: Event) => void',
        description: 'Called when the item is selected. Call event.preventDefault() to keep the menu open.',
    },
] as const satisfies readonly PropDef[];

export const dropdownMenuCheckboxItemProps = [
    {
        name: 'checked',
        type: "boolean | 'indeterminate'",
        description: 'The checked state. Use it with onCheckedChange.',
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
        description: 'Prevents the item from being selected.',
    },
] as const satisfies readonly PropDef[];

export const dropdownMenuRadioGroupProps = [
    {
        name: 'value',
        type: 'string',
        description: 'The value of the selected item. Use it with onValueChange.',
    },
    {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Called when another item is selected.',
    },
] as const satisfies readonly PropDef[];

export const dropdownMenuRadioItemProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. The value of the item.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents the item from being selected.',
    },
] as const satisfies readonly PropDef[];
