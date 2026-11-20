import type { PropDef } from '@/types/docs';

export const tabsProps = [
    {
        name: 'value',
        type: 'string',
        description: 'The active tab, for controlled usage. Use it with onValueChange.',
    },
    {
        name: 'defaultValue',
        type: 'string',
        description: 'The tab that is active at first, for uncontrolled usage.',
    },
    {
        name: 'onValueChange',
        type: '(value: string) => void',
        description: 'Called when the active tab changes.',
    },
    {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'The direction of the tab list. It also sets the arrow keys that move between tabs.',
    },
    {
        name: 'activationMode',
        type: "'automatic' | 'manual'",
        default: "'automatic'",
        description: 'automatic activates a tab when it gets focus. manual waits for Enter or Space.',
    },
] as const satisfies readonly PropDef[];

export const tabsListProps = [
    {
        name: 'variant',
        type: "'default' | 'line'",
        default: "'default'",
        description:
            'default puts the tabs on a muted background. line has no background and marks the active tab with a line.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Text size and the height of every tab: 32px, 40px, 48px and 56px.',
    },
] as const satisfies readonly PropDef[];

export const tabsTriggerProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. The value that connects the tab to its TabsContent.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents the tab from being activated.',
    },
] as const satisfies readonly PropDef[];

export const tabsContentProps = [
    {
        name: 'value',
        type: 'string',
        description: 'Required. The value of the TabsTrigger it belongs to.',
    },
    {
        name: 'forceMount',
        type: 'boolean',
        description: 'Keeps the panel in the DOM when it is not active.',
    },
] as const satisfies readonly PropDef[];
