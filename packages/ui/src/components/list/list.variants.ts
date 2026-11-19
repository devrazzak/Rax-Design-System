export const LIST_TAGS = ['ul', 'ol'] as const;

export type ListTag = (typeof LIST_TAGS)[number];

/** Padding makes room for the marker. `none` has no marker, so it needs none. */
export const markerClasses = {
    disc: 'list-disc pl-6',
    decimal: 'list-decimal pl-6',
    none: 'list-none',
};

/**
 * Space between the items. It uses margins instead of `gap`, because `flex` and `grid` turn the items into
 * blocks and the markers disappear. The scale matches the shared gap scale.
 */
export const gapClasses = {
    none: 'space-y-0',
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
};

export const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
};

export const colorClasses = {
    foreground: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
};

/** Used when no marker is passed, so the tag alone gives a sensible look. */
export const defaultMarkerByTag: Record<ListTag, keyof typeof markerClasses> = {
    ul: 'disc',
    ol: 'decimal',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const LIST_MARKERS = Object.keys(markerClasses) as (keyof typeof markerClasses)[];
export const LIST_GAPS = Object.keys(gapClasses) as (keyof typeof gapClasses)[];
export const LIST_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
export const LIST_COLORS = Object.keys(colorClasses) as (keyof typeof colorClasses)[];

export const defaultTag: ListTag = 'ul';
export const defaultGap: keyof typeof gapClasses = 'sm';
