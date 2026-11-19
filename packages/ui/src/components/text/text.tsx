import type { ComponentProps, ElementType } from 'react';

import { cn } from '@/lib/utils/cn';

import type { TextTag } from './text.variants';
import {
    alignClasses,
    colorClasses,
    defaultColor,
    defaultSize,
    defaultTag,
    defaultWeight,
    displayClasses,
    justifyClasses,
    sizeClasses,
    textAlignClasses,
    textTransformClasses,
    trackingClasses,
    weightClasses,
} from './text.variants';

type TextProps = ComponentProps<'p'> & {
    /** Which tag to render. Use `span` for inline text. */
    as?: TextTag;
    size?: keyof typeof sizeClasses;
    weight?: keyof typeof weightClasses;
    color?: keyof typeof colorClasses;
    /** Sets the CSS display. Not set by default, so `span` stays inline and `p` stays block. */
    display?: keyof typeof displayClasses;
    /** Horizontal text alignment. Uses `start` and `end`, so it follows the reading direction. */
    textAlign?: keyof typeof textAlignClasses;
    textTransform?: keyof typeof textTransformClasses;
    /** Letter spacing. */
    tracking?: keyof typeof trackingClasses;
    /** Aligns the children on the cross axis. Only works with `display="flex"` or `display="inlineFlex"`. */
    align?: keyof typeof alignClasses;
    /** Distributes the children on the main axis. Only works with `display="flex"` or `display="inlineFlex"`. */
    justify?: keyof typeof justifyClasses;
};

function Text({
    as = defaultTag,
    size = defaultSize,
    weight = defaultWeight,
    color = defaultColor,
    display,
    textAlign,
    textTransform,
    tracking,
    align,
    justify,
    className,
    ...props
}: TextProps) {
    const Comp: ElementType = as;

    return (
        <Comp
            data-slot="text"
            className={cn(
                sizeClasses[size],
                weightClasses[weight],
                colorClasses[color],
                display && displayClasses[display],
                textAlign && textAlignClasses[textAlign],
                textTransform && textTransformClasses[textTransform],
                tracking && trackingClasses[tracking],
                align && alignClasses[align],
                justify && justifyClasses[justify],
                className,
            )}
            {...props}
        />
    );
}

export { Text };
export type { TextProps };
