import type { ComponentProps, ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

import type { ListTag } from './list.variants';
import {
    colorClasses,
    defaultGap,
    defaultMarkerByTag,
    defaultTag,
    gapClasses,
    markerClasses,
    sizeClasses,
} from './list.variants';

type ListProps = ComponentProps<'ul'> & {
    /** Which tag to render. Use `ol` for an ordered list. */
    as?: ListTag;
    /** The marker follows the tag (`disc` for `ul`, `decimal` for `ol`) unless `marker` is passed. */
    marker?: keyof typeof markerClasses;
    /** Space between the items. */
    gap?: keyof typeof gapClasses;
    /** Font size. Not set by default, so the list inherits it. */
    size?: keyof typeof sizeClasses;
    /** Text color. Not set by default, so the list inherits it. */
    color?: keyof typeof colorClasses;
};

type ListItemProps = ComponentProps<'li'> & {
    /** An icon shown before the text, for example a check mark. Use it with `marker="none"` on the List. */
    icon?: ReactNode;
};

function List({
    as = defaultTag,
    marker = defaultMarkerByTag[as],
    gap = defaultGap,
    size,
    color,
    className,
    ...props
}: ListProps) {
    const Comp: ElementType = as;

    return (
        <Comp
            data-slot="list"
            // Safari with VoiceOver stops reading a list as a list when its markers are removed
            role={marker === 'none' ? 'list' : undefined}
            className={cn(
                markerClasses[marker],
                gapClasses[gap],
                size && sizeClasses[size],
                color && colorClasses[color],
                className,
            )}
            {...props}
        />
    );
}

function ListItem({ icon, className, children, ...props }: ListItemProps) {
    return (
        <li data-slot="list-item" className={cn(icon && 'flex gap-2', className)} {...props}>
            {icon && (
                // The icon is as tall as the first line of text and as big as the font, so it follows the List size
                <span
                    aria-hidden="true"
                    className="flex h-lh shrink-0 items-center [&_svg:not([class*='size-'])]:size-[1em]"
                >
                    {icon}
                </span>
            )}
            {/* Without the wrapper, text and inline elements would each become a separate flex item */}
            {icon ? <span>{children}</span> : children}
        </li>
    );
}

export { List, ListItem };
export type { ListItemProps, ListProps };
