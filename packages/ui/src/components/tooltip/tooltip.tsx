import type { ComponentProps } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { arrowClasses, defaultVariants, sizeClasses, variantClasses } from './tooltip.variants';

// Radix waits 700ms before it shows a tooltip, which feels slow, so the default here is no delay
function TooltipProvider({ delayDuration = 0, ...props }: ComponentProps<typeof TooltipPrimitive.Provider>) {
    return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

// Root renders no element of its own, so there is nothing to wrap
const Tooltip = TooltipPrimitive.Root;

function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
    return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

// A tooltip opens as `delayed-open` or `instant-open` (when another one was just open), never as `open`.
// Only the delayed open is animated, so moving between tooltips stays quick.
const tooltipContentVariants = cva(
    'z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) rounded-md font-medium shadow-md data-[state=closed]:motion-safe:animate-zoom-out data-[state=delayed-open]:motion-safe:animate-zoom-in',
    {
        variants: {
            variant: variantClasses,
            size: sizeClasses,
        },
        defaultVariants,
    },
);

type TooltipContentProps = ComponentProps<typeof TooltipPrimitive.Content> &
    VariantProps<typeof tooltipContentVariants>;

function TooltipContent({
    className,
    variant = defaultVariants.variant,
    size = defaultVariants.size,
    sideOffset = 0,
    children,
    ...props
}: TooltipContentProps) {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                data-slot="tooltip-content"
                data-variant={variant}
                data-size={size}
                sideOffset={sideOffset}
                className={cn(tooltipContentVariants({ variant, size }), className)}
                {...props}
            >
                {children}
                <TooltipPrimitive.Arrow
                    className={cn(
                        'z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]',
                        arrowClasses[variant ?? defaultVariants.variant],
                    )}
                />
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
export type { TooltipContentProps };
