/** `default` is the inverted pair, dark on light and light on dark. The others follow the brand colors. */
export const variantClasses = {
    default: 'bg-foreground text-background',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
};

/** The arrow is part of the tooltip, so it takes the color of its variant. */
export const arrowClasses = {
    default: 'bg-foreground fill-foreground',
    primary: 'bg-primary fill-primary',
    secondary: 'bg-secondary fill-secondary',
    destructive: 'bg-destructive fill-destructive',
};

export const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-5 py-2.5 text-lg',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const TOOLTIP_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const TOOLTIP_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultVariants = { variant: 'default', size: 'md' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};
