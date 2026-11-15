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

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const TEXT_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
export const TEXT_WEIGHTS = Object.keys(weightClasses) as (keyof typeof weightClasses)[];
export const TEXT_COLORS = Object.keys(colorClasses) as (keyof typeof colorClasses)[];

export const defaultTag: TextTag = 'p';
export const defaultSize: keyof typeof sizeClasses = 'md';
export const defaultWeight: keyof typeof weightClasses = 'regular';
export const defaultColor: keyof typeof colorClasses = 'foreground';
