import type { PropDef } from '@/types/docs';

export const inputGroupProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Height, side padding and font size of the group. Matches the Input sizes.',
    },
] as const satisfies readonly PropDef[];

export const inputGroupButtonProps = [
    {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'surface' | 'white' | 'ghost' | 'destructive' | 'link' | 'linkWhite'",
        default: "'ghost'",
        description: 'Passed to Button.',
    },
    {
        name: 'size',
        type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'xs'",
        description: 'Passed to Button.',
    },
    {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        default: "'button'",
        description: 'Passed to Button.',
    },
] as const satisfies readonly PropDef[];
