/** Both variants highlight a pressed toggle with the accent color, so pressed and hovered look different. */
export const variantClasses = {
    default: 'bg-transparent',
    outline: 'border-border bg-card',
};

/** Height follows the Button scale. `min-w` equals the height, so an icon-only toggle is a square. */
export const sizeClasses = {
    sm: 'h-10 min-w-10 gap-1.5 px-3 text-sm',
    md: 'h-12 min-w-12 gap-1.5 px-4 text-base',
    lg: 'h-14 min-w-14 gap-2 px-5 text-lg',
    xl: 'h-16 min-w-16 gap-2 px-6 text-xl',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const TOGGLE_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const TOGGLE_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultVariants = { variant: 'default', size: 'md' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};
