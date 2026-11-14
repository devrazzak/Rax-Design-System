import type * as React from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils/cn';
import { Spinner } from '@/components/spinner/spinner';

import { defaultVariants, sizeClasses, variantClasses } from './button.variants';

const buttonVariants = cva(
    "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium cursor-pointer whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: variantClasses,
            size: sizeClasses,
        },
        defaultVariants,
    },
);

type ButtonProps = React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        /** Render the child element instead of a <button>, e.g. a Next.js <Link>. */
        asChild?: boolean;
        /**
         * Shows a spinner, blocks clicks and form submission, and keeps keyboard focus.
         * Every icon passed as children is hidden while loading, so only the spinner shows.
         */
        loading?: boolean;
        /** Which side of the label the spinner appears on while loading. */
        loadingPosition?: 'start' | 'end';
    };

// Hides every icon from the children, but not the spinner's own svg
const loadingStyles = 'cursor-wait [&_svg:not([data-slot=spinner-icon])]:hidden';

function Button({
    className,
    variant = defaultVariants.variant,
    size = defaultVariants.size,
    asChild = false,
    loading = false,
    loadingPosition = 'end',
    type,
    onClick,
    children,
    ...props
}: ButtonProps) {
    const Comp = asChild ? Slot.Root : 'button';

    const spinner = loading ? <Spinner size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} /> : null;

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            data-loading={loading || undefined}
            aria-busy={loading || undefined}
            aria-disabled={loading || undefined}
            type={asChild ? undefined : (type ?? 'button')}
            onClick={loading ? event => event.preventDefault() : onClick}
            className={cn(buttonVariants({ variant, size }), loading && loadingStyles, className)}
            {...props}
        >
            {/* Slottable keeps the spinner next to the child element's content when asChild is used */}
            {loadingPosition === 'start' && spinner}
            <Slot.Slottable>{children}</Slot.Slottable>
            {loadingPosition === 'end' && spinner}
        </Comp>
    );
}

export { Button, buttonVariants };
export type { ButtonProps };
