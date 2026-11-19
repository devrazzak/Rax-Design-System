export const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export type HeadingTag = (typeof HEADING_TAGS)[number];

export const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-lg lg:text-xl',
    '2xl': 'text-xl lg:text-2xl',
    '3xl': 'text-2xl lg:text-3xl',
    '4xl': 'text-3xl lg:text-4xl',
    '5xl': 'text-4xl lg:text-5xl',
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

/** Used when no size is passed, so the tag alone gives a sensible look. */
export const defaultSizeByTag: Record<HeadingTag, keyof typeof sizeClasses> = {
    h1: '5xl',
    h2: '4xl',
    h3: '3xl',
    h4: '2xl',
    h5: 'xl',
    h6: 'lg',
};

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const HEADING_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
export const HEADING_WEIGHTS = Object.keys(weightClasses) as (keyof typeof weightClasses)[];
export const HEADING_COLORS = Object.keys(colorClasses) as (keyof typeof colorClasses)[];
export const HEADING_TEXT_TRANSFORMS = Object.keys(textTransformClasses) as (keyof typeof textTransformClasses)[];

export const defaultTag: HeadingTag = 'h2';
export const defaultWeight: keyof typeof weightClasses = 'semibold';
export const defaultColor: keyof typeof colorClasses = 'foreground';
