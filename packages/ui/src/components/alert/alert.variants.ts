/**
 * Two styles for each color. The plain one keeps the card background and colors only the text and icon.
 * The `-subtle` one fills the alert with a light tint.
 * The description takes the same color, so it stays readable on a colored alert.
 */
export const variantClasses = {
    default: 'bg-card text-card-foreground',
    destructive: 'bg-card text-destructive *:data-[slot=alert-description]:text-destructive',
    info: 'bg-card text-info *:data-[slot=alert-description]:text-info',
    warning: 'bg-card text-warning *:data-[slot=alert-description]:text-warning',
    'destructive-subtle':
        'border-transparent bg-destructive-subtle text-destructive-subtle-foreground *:data-[slot=alert-description]:text-destructive-subtle-foreground',
    'info-subtle':
        'border-transparent bg-info-subtle text-info-subtle-foreground *:data-[slot=alert-description]:text-info-subtle-foreground',
    'warning-subtle':
        'border-transparent bg-warning-subtle text-warning-subtle-foreground *:data-[slot=alert-description]:text-warning-subtle-foreground',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const ALERT_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];

export const defaultVariants = { variant: 'default' } as const satisfies {
    variant: keyof typeof variantClasses;
};
