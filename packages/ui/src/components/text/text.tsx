import type { ComponentProps, ElementType } from 'react';

import { cn } from '@/lib/utils/cn';

import type { TextTag } from './text.variants';
import {
    colorClasses,
    defaultColor,
    defaultSize,
    defaultTag,
    defaultWeight,
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
    /** Horizontal text alignment. Uses `start` and `end`, so it follows the reading direction. */
    textAlign?: keyof typeof textAlignClasses;
    textTransform?: keyof typeof textTransformClasses;
    /** Letter spacing. */
    tracking?: keyof typeof trackingClasses;
};

function Text({
    as = defaultTag,
    size = defaultSize,
    weight = defaultWeight,
    color = defaultColor,
    textAlign,
    textTransform,
    tracking,
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
                textAlign && textAlignClasses[textAlign],
                textTransform && textTransformClasses[textTransform],
                tracking && trackingClasses[tracking],
                className,
            )}
            {...props}
        />
    );
}

export { Text };
export type { TextProps };
