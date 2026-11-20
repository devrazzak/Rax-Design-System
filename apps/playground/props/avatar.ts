import type { PropDef } from '@/types/docs';

export const avatarProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description:
            'The diameter and the text size of the initials: 32px, 40px, 48px and 64px. The badge grows with it.',
    },
] as const satisfies readonly PropDef[];

export const avatarImageProps = [
    {
        name: 'src',
        type: 'string',
        description: 'The image URL. While it loads or when it fails, AvatarFallback is shown.',
    },
    {
        name: 'alt',
        type: 'string',
        description: 'Alternative text for the image. Use the name of the person.',
    },
] as const satisfies readonly PropDef[];

export const avatarGroupCountProps = [
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Use the same size as the avatars in the group.',
    },
] as const satisfies readonly PropDef[];
