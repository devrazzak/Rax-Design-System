import type { ComponentProps } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultVariants, sizeClasses, variantClasses } from './badge.variants';

const badgeVariants = cva(
    'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-transparent font-bold tracking-[0.16em] whitespace-nowrap uppercase transition-colors outline-none focus-visible:ring-3 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    {
        variants: {
            variant: variantClasses,
            size: sizeClasses,
        },
        defaultVariants,
    },
);

type BadgeProps = ComponentProps<'span'> &
    VariantProps<typeof badgeVariants> & {
        /** Render the child element instead of a <span>, e.g. a Next.js <Link>. */
        asChild?: boolean;
    };

function Badge({
    className,
    variant = defaultVariants.variant,
    size = defaultVariants.size,
    asChild = false,
    ...props
}: BadgeProps) {
    const Comp = asChild ? Slot.Root : 'span';

    return (
        <Comp
            data-slot="badge"
            data-variant={variant}
            data-size={size}
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
export type { BadgeProps };
