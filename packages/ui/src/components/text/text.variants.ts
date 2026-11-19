export const TEXT_TAGS = ['p', 'span', 'div'] as const;

export type TextTag = (typeof TEXT_TAGS)[number];

export const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
};

export const weightClasses = {
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

export const colorClasses = {
    foreground: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
};

export const textTransformClasses = {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
};

export const textAlignClasses = {
    start: 'text-start',
    center: 'text-center',
    end: 'text-end',
    justify: 'text-justify',
};

export const trackingClasses = {
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const TEXT_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
export const TEXT_WEIGHTS = Object.keys(weightClasses) as (keyof typeof weightClasses)[];
export const TEXT_COLORS = Object.keys(colorClasses) as (keyof typeof colorClasses)[];
export const TEXT_TRANSFORMS = Object.keys(textTransformClasses) as (keyof typeof textTransformClasses)[];
export const TEXT_TEXT_ALIGNS = Object.keys(textAlignClasses) as (keyof typeof textAlignClasses)[];
export const TEXT_TRACKINGS = Object.keys(trackingClasses) as (keyof typeof trackingClasses)[];
export const defaultTag: TextTag = 'p';
export const defaultSize: keyof typeof sizeClasses = 'md';
export const defaultWeight: keyof typeof weightClasses = 'regular';
export const defaultColor: keyof typeof colorClasses = 'foreground';
