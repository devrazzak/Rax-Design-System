/** Where the drawer attaches to the screen, and the distance its slide animation travels. */
export const sideClasses = {
    right: 'inset-y-0 right-0 h-full w-3/4 border-l [--slide-offset:100%_0]',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r [--slide-offset:-100%_0]',
    top: 'inset-x-0 top-0 h-auto border-b [--slide-offset:0_-100%]',
    bottom: 'inset-x-0 bottom-0 h-auto border-t [--slide-offset:0_100%]',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const DRAWER_SIDES = Object.keys(sideClasses) as (keyof typeof sideClasses)[];

export const defaultSide: keyof typeof sideClasses = 'right';

/** Width of a left or right drawer on screens wider than a phone. Top and bottom drawers always fill the width. */
export const sizeClasses = {
    sm: 'data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
    md: 'data-[side=left]:sm:max-w-md data-[side=right]:sm:max-w-md',
    lg: 'data-[side=left]:sm:max-w-lg data-[side=right]:sm:max-w-lg',
    xl: 'data-[side=left]:sm:max-w-xl data-[side=right]:sm:max-w-xl',
    full: 'data-[side=left]:sm:max-w-[calc(100%-2rem)] data-[side=right]:sm:max-w-[calc(100%-2rem)]',
};

export const DRAWER_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';
