/** Height, side padding (same as Input), font size, and the icon size inside addons. */
export const sizeClasses = {
    sm: "h-10 px-3 text-sm [&_[data-slot=input-group-addon]>svg:not([class*='size-'])]:size-4",
    md: "h-12 px-4 text-base [&_[data-slot=input-group-addon]>svg:not([class*='size-'])]:size-5",
    lg: "h-14 px-5 text-lg [&_[data-slot=input-group-addon]>svg:not([class*='size-'])]:size-5",
    xl: "h-16 px-6 text-xl [&_[data-slot=input-group-addon]>svg:not([class*='size-'])]:size-6",
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const INPUT_GROUP_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
