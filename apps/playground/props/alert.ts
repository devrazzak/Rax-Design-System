import type { PropDef } from '@/types/docs';

export const alertProps = [
    {
        name: 'variant',
        type: "'default' | 'destructive' | 'info' | 'warning' | 'destructive-subtle' | 'info-subtle' | 'warning-subtle'",
        default: "'default'",
        description:
            'The color. The plain ones keep the card background and color the text and icon. The subtle ones fill the alert with a light tint.',
    },
] as const satisfies readonly PropDef[];
