/** Shared by every kind of menu item: layout and the disabled look. Text size and padding come from the size. */
export const itemClasses =
    'relative flex cursor-default items-center gap-1.5 rounded-md pl-1.5 outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0';

/**
 * Text size and vertical padding of every item, set once on the content. `[data-slot$=-item]` matches the item,
 * the checkbox item and the radio item. Icons from `@/icons` follow the text size on their own.
 */
export const sizeClasses = {
    sm: '[&_[data-slot$=-item]]:py-1 [&_[data-slot$=-item]]:text-sm',
    md: '[&_[data-slot$=-item]]:py-1 [&_[data-slot$=-item]]:text-base',
    lg: '[&_[data-slot$=-item]]:py-1.5 [&_[data-slot$=-item]]:text-lg',
    xl: '[&_[data-slot$=-item]]:py-2 [&_[data-slot$=-item]]:text-xl',
};

export const DROPDOWN_MENU_SIZES = Object.keys(sizeClasses) as (keyof typeof sizeClasses)[];

export const defaultSize: keyof typeof sizeClasses = 'md';

/** Look of the highlighted item (hover or keyboard), shared by the checkbox and radio items. */
export const highlightClasses = 'focus:bg-accent focus:text-accent-foreground';

export const variantClasses = {
    default: highlightClasses,
    destructive: 'text-destructive focus:bg-destructive-subtle focus:text-destructive-subtle-foreground',
};

/** Names are read from the object above, so stories and tests never drift from the component. */
export const DROPDOWN_MENU_VARIANTS = Object.keys(variantClasses) as (keyof typeof variantClasses)[];

export const defaultVariant: keyof typeof variantClasses = 'default';
