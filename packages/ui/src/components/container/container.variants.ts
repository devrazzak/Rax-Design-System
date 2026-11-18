/** The width follows the screen smoothly and stops at the Tailwind breakpoint of the chosen size. */
export const sizeClasses = {
    sm: 'max-w-(--breakpoint-sm)',
    md: 'max-w-(--breakpoint-md)',
    lg: 'max-w-(--breakpoint-lg)',
    xl: 'max-w-(--breakpoint-xl)',
    full: 'max-w-none',
};

export const defaultSize: keyof typeof sizeClasses = 'xl';

/** Names are read from the object above, so stories and tests never drift from the component. */
export const CONTAINER_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];
