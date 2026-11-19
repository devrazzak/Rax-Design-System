/** Width equals the Button height of the same size, so the button is a square (a circle with `rounded="full"`). */
export const sizeClasses = {
    xs: 'w-8 px-0',
    sm: 'w-10 px-0',
    md: 'w-12 px-0',
    lg: 'w-14 px-0',
    xl: 'w-16 px-0',
};

export const roundedClasses = {
    md: 'rounded-md',
    full: 'rounded-full',
};

export const defaultSize: keyof typeof sizeClasses = 'md';
export const defaultRounded: keyof typeof roundedClasses = 'md';

/** Names are read from the objects above, so stories and tests never drift from the component. */
export const ICON_BUTTON_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
export const ICON_BUTTON_ROUNDEDS = Object.keys(roundedClasses) as (keyof typeof roundedClasses)[];
