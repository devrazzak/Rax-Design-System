/** Padding and font match Input at each size. Height comes from the content, so only a minimum is set. */
export const sizeClasses = {
    sm: 'min-h-20 px-3 py-2 text-sm',
    md: 'min-h-24 px-4 py-3 text-base',
    lg: 'min-h-28 px-5 py-3.5 text-lg',
    xl: 'min-h-32 px-6 py-4 text-xl',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const TEXTAREA_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
