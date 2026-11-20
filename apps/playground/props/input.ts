import type { PropDef } from '@/types/docs';

export const inputProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, padding and font size: 40px, 48px, 56px and 64px. Replaces the native size attribute.',
    },
] as const satisfies readonly PropDef[];
