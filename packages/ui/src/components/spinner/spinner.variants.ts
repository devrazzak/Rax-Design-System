export const sizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-8',
    xl: 'size-12',
};

export const colorClasses = {
    current: 'text-current',
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground',
    inverse: 'text-white',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const SPINNER_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
export const SPINNER_COLORS = Object.keys(colorClasses) as (keyof typeof colorClasses)[];

export const defaultVariants = { size: 'md', color: 'current' } as const satisfies {
    size: keyof typeof sizeClasses;
    color: keyof typeof colorClasses;
};
