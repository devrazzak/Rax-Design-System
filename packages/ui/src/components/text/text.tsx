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
    weightClasses,
} from './text.variants';

type TextProps = ComponentProps<'p'> & {
    /** Which tag to render. Use `span` for inline text. */
    as?: TextTag;
    size?: keyof typeof sizeClasses;
    weight?: keyof typeof weightClasses;
    color?: keyof typeof colorClasses;
};

function Text({
    as = defaultTag,
    size = defaultSize,
    weight = defaultWeight,
    color = defaultColor,
    className,
    ...props
}: TextProps) {
    const Comp: ElementType = as;

    return (
        <Comp
            data-slot="text"
            className={cn(sizeClasses[size], weightClasses[weight], colorClasses[color], className)}
            {...props}
        />
    );
}

export { Text };
export type { TextProps };
