/**
 * Padding of the whole card, set once through `--card-spacing`. Every part reads it, so the card grows together.
 * The card sets no text size and no gap between its parts, each child decides its own.
 */
export const paddingClasses = {
    sm: '[--card-spacing:--spacing(3)]',
    md: '[--card-spacing:--spacing(4)]',
    lg: '[--card-spacing:--spacing(6)]',
    xl: '[--card-spacing:--spacing(8)]',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const CARD_PADDINGS = Object.keys(paddingClasses) as (keyof typeof paddingClasses)[];

export const defaultPadding: keyof typeof paddingClasses = 'md';

/** Corner radius of the card. The values follow the radius tokens: md 8px, lg 12px, xl 16px. */
export const radiusClasses = {
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
};

export const CARD_RADII = Object.keys(radiusClasses) as (keyof typeof radiusClasses)[];

export const defaultRadius: keyof typeof radiusClasses = 'xl';
