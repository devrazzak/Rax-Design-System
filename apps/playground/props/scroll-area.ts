import type { PropDef } from '@/types/docs';

export const scrollAreaProps = [
    {
        name: 'type',
        type: "'auto' | 'always' | 'scroll' | 'hover'",
        default: "'hover'",
        description:
            'When the scrollbar is visible. hover shows it while the pointer is over the area, scroll while scrolling, always all the time, and auto only when the content overflows.',
    },
    {
        name: 'scrollHideDelay',
        type: 'number',
        default: '600',
        description: 'Milliseconds before the scrollbar hides, for the hover and scroll types.',
    },
    {
        name: 'dir',
        type: "'ltr' | 'rtl'",
        description: 'The reading direction. Inherited from the document when not set.',
    },
] as const satisfies readonly PropDef[];

export const scrollBarProps = [
    {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description:
            'Which scrollbar to render. ScrollArea already renders a vertical one, so add a horizontal ScrollBar as a child.',
    },
    {
        name: 'forceMount',
        type: 'boolean',
        description:
            'Keeps the scrollbar in the DOM even when it is hidden, for example to control it with animations.',
    },
] as const satisfies readonly PropDef[];
