/**
 * Diameter and the text size of the initials, set once on the avatar. The badge size is set here too, with a
 * child selector, so it grows with the avatar. AvatarGroupCount reuses this map to match the avatars next to it.
 */
export const sizeClasses = {
    sm: 'size-8 text-xs [&_[data-slot=avatar-badge]]:size-2.5',
    md: 'size-10 text-sm [&_[data-slot=avatar-badge]]:size-3',
    lg: 'size-12 text-base [&_[data-slot=avatar-badge]]:size-3.5',
    xl: 'size-16 text-xl [&_[data-slot=avatar-badge]]:size-4',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const AVATAR_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
