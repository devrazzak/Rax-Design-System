const iconSlide = [
    '[&_svg[data-icon=inline-end]]:transition-transform',
    '[&_svg[data-icon=inline-end]]:duration-200',
    'motion-safe:hover:[&_svg[data-icon=inline-end]]:translate-x-0.5',
    'motion-safe:focus-visible:[&_svg[data-icon=inline-end]]:translate-x-0.5',
];

/** A link is plain text: it keeps the font size and gap of its size, but has no fixed height or padding. */
const linkBox = 'h-auto p-0 has-data-[icon=inline-end]:pr-0 has-data-[icon=inline-start]:pl-0';

export const variantClasses = {
    primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover aria-expanded:bg-primary-hover focus-visible:border-primary focus-visible:ring-primary/40',
    secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover aria-expanded:bg-secondary-hover focus-visible:border-secondary focus-visible:ring-secondary/40',
    outline:
        'bg-transparent text-foreground border-foreground hover:border-primary-outline-hover hover:text-primary-outline-hover aria-expanded:border-primary-outline-hover aria-expanded:text-primary-outline-hover focus-visible:border-primary focus-visible:ring-primary/40',
    surface:
        'bg-card text-foreground border-border hover:border-primary-outline-hover hover:text-primary-outline-hover aria-expanded:border-primary-outline-hover aria-expanded:text-primary-outline-hover focus-visible:border-primary focus-visible:ring-primary/40',
    white: 'bg-transparent text-white border-white hover:border-primary hover:text-primary aria-expanded:border-primary aria-expanded:text-primary focus-visible:border-primary focus-visible:ring-primary/40',
    ghost: 'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground focus-visible:border-primary focus-visible:ring-primary/40',
    destructive:
        'bg-destructive-subtle text-destructive-subtle-foreground hover:bg-destructive-subtle-hover aria-expanded:bg-destructive-subtle-hover focus-visible:border-destructive focus-visible:ring-destructive/40',
    link: [
        'text-link hover:text-link-hover aria-expanded:text-link-hover focus-visible:ring-link/40',
        linkBox,
        iconSlide,
    ],
    linkWhite: [
        'text-white hover:text-primary aria-expanded:text-primary focus-visible:ring-white/50',
        linkBox,
        iconSlide,
    ],
};

export const sizeClasses = {
    xs: "h-8 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
    sm: "h-10 gap-1 px-4 text-sm has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
    md: "h-12 gap-1.5 px-6 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
    lg: "h-14 gap-1.5 px-8 text-lg has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-5",
    xl: "h-16 gap-2 px-10 text-xl has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5 [&_svg:not([class*='size-'])]:size-6",
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const BUTTON_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];
export const BUTTON_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultVariants = { variant: 'primary', size: 'md' } as const satisfies {
    variant: keyof typeof variantClasses;
    size: keyof typeof sizeClasses;
};
