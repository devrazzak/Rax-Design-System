import type { PropDef } from '@/types/docs';

export const sectionProps = [
    {
        name: 'as',
        type: "'section' | 'article' | 'aside' | 'header' | 'footer'",
        default: "'section'",
        description: 'The HTML tag to render.',
    },
    {
        name: 'spacing',
        type: "'none' | 'sm' | 'md' | 'lg' | 'xl'",
        default: "'none'",
        description: 'Vertical padding. It grows with the screen width between a minimum and a maximum.',
    },
    {
        name: 'tone',
        type: "'default' | 'muted' | 'primary' | 'secondary' | 'foreground'",
        default: "'default'",
        description: 'The background color, taken from the semantic tokens, so dark mode follows.',
    },
] as const satisfies readonly PropDef[];
