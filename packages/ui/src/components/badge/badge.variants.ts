/** Hover colors apply only when the badge is a link (`asChild` with an <a>), so a plain badge never looks clickable. */
export const variantClasses = {
    primary:
        'bg-primary text-primary-foreground focus-visible:border-primary focus-visible:ring-primary/40 [a&]:hover:bg-primary-hover',
    secondary:
        'bg-secondary text-secondary-foreground focus-visible:border-secondary focus-visible:ring-secondary/40 [a&]:hover:bg-secondary-hover',
    destructive:
        'bg-destructive-subtle text-destructive-subtle-foreground focus-visible:border-destructive focus-visible:ring-destructive/40 [a&]:hover:bg-destructive-subtle-hover',
    outline:
        'border-border bg-card text-foreground focus-visible:border-primary focus-visible:ring-primary/40 [a&]:hover:border-primary-outline-hover [a&]:hover:text-primary-outline-hover',
    /** White pill with primary text. Made for the corner of a photo or a dark card, where the other variants blend in. */
    white: 'bg-white text-primary focus-visible:border-primary focus-visible:ring-primary/40',
};

/** The text is small and wide-spaced, so even the largest badge stays a label. */
export const sizeClasses = {
    sm: 'h-5 gap-1 px-2.5 text-[10px]',
    md: 'h-6 gap-1 px-3 text-[10px]',
    lg: 'h-7 gap-1.5 px-3.5 text-xs',
    xl: 'h-8 gap-1.5 px-4 text-sm',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const BADGE_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const BADGE_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultVariants = { variant: 'primary', size: 'md' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};
