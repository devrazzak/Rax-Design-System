export const sizeClasses = {
    xs: 'size-3',
    sm: 'size-4 [&_path]:[stroke-width:1.5]',
    md: 'size-5 [&_path]:[stroke-width:1.5]',
    lg: 'size-6 [&_path]:[stroke-width:1.5]',
    xl: 'size-7 [&_path]:[stroke-width:1.5]',
    '2xl': 'size-16 [&_path]:[stroke-width:0.8]',
    page: 'size-48 [&_path]:[stroke-width:0.3]',
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
