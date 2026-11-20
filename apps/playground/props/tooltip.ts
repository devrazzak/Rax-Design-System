import type { PropDef } from '@/types/docs';

export const tooltipProps = [
    {
        name: 'open',
        type: 'boolean',
        description: 'Whether the tooltip is open, for controlled usage. Use it with onOpenChange.',
    },
    {
        name: 'defaultOpen',
        type: 'boolean',
        description: 'Whether it is open at first.',
    },
    {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        description: 'Called when it opens or closes.',
    },
    {
        name: 'delayDuration',
        type: 'number',
        default: '0',
        description:
            'Milliseconds before the tooltip opens on hover. Set it here, because a TooltipProvider higher up is ignored.',
    },
] as const satisfies readonly PropDef[];

export const tooltipContentProps = [
    {
        name: 'variant',
        type: "'default' | 'primary' | 'secondary' | 'destructive'",
        default: "'default'",
        description: 'The color. default is dark on light and light on dark. The arrow follows the variant.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Padding and font size.',
    },
    {
        name: 'side',
        type: "'top' | 'right' | 'bottom' | 'left'",
        default: "'top'",
        description: 'The preferred side of the trigger. It flips when there is not enough room.',
    },
    {
        name: 'align',
        type: "'start' | 'center' | 'end'",
        default: "'center'",
        description: 'How the tooltip aligns to the trigger.',
    },
    {
        name: 'sideOffset',
        type: 'number',
        default: '0',
        description: 'Distance in pixels between the trigger and the tooltip.',
    },
] as const satisfies readonly PropDef[];
