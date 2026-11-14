const iconSlide = [
    '[&_svg[data-icon=inline-end]]:transition-transform',
    '[&_svg[data-icon=inline-end]]:duration-200',
    'motion-safe:hover:[&_svg[data-icon=inline-end]]:translate-x-0.5',
    'motion-safe:focus-visible:[&_svg[data-icon=inline-end]]:translate-x-0.5',
];

export const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
    secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
    outline:
        'border-border bg-card text-foreground hover:border-primary-outline-hover hover:text-primary-outline-hover aria-expanded:border-primary-outline-hover aria-expanded:text-primary-outline-hover',
    ghost: 'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
    destructive:
        'bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
    link: ['text-link hover:text-link-hover aria-expanded:text-link-hover', iconSlide],
    linkInverse: ['text-white underline-offset-4 hover:underline', iconSlide],
};

export const sizeClasses = {
    default: 'h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
    xs: "h-6 gap-1 rounded-md px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
    sm: "h-8 gap-1 rounded-md px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
    lg: 'h-12 gap-1.5 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const BUTTON_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const BUTTON_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultVariants = { variant: 'primary', size: 'default' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};
