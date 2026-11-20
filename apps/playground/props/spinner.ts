import type { PropDef } from '@/types/docs';

export const spinnerProps = [
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'page'",
        default: "'md'",
        description:
            'The diameter: 12px, 16px, 20px, 24px, 28px, 64px and 192px. The line gets thinner as the spinner grows.',
    },
    {
        name: 'color',
        type: "'current' | 'primary' | 'secondary' | 'muted' | 'inverse'",
        default: "'current'",
        description:
            'The color. current takes the text color of the parent. inverse is white, for colored backgrounds.',
    },
    {
        name: 'label',
        type: 'string',
        description:
            'Text announced to screen readers, for example Loading results. Without it the spinner is hidden from assistive technology.',
    },
] as const satisfies readonly PropDef[];
