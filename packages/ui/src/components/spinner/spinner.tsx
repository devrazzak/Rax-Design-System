import type * as React from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

import { colorClasses, defaultVariants, sizeClasses } from './spinner.variants';

const spinnerVariants = cva('relative inline-flex shrink-0', {
    variants: {
        size: sizeClasses,
        color: colorClasses,
    },
    defaultVariants,
});

type SpinnerProps = Omit<React.ComponentProps<'span'>, 'color'> &
    VariantProps<typeof spinnerVariants> & {
        /**
         * Accessible text announced to screen readers, e.g. "Loading results".
         * Without it the spinner is decorative (aria-hidden): use that inside elements
         * that already expose their own busy state, like Button.
         */
        label?: string;
    };

function Spinner({ className, size, color, label, ...props }: SpinnerProps) {
    return (
        <span
            data-slot="spinner"
            role={label ? 'status' : undefined}
            aria-hidden={label ? undefined : true}
            className={cn(spinnerVariants({ size, color }), className)}
            {...props}
        >
            <svg
                data-slot="spinner-icon"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="size-full motion-safe:animate-spin"
            >
                <path d="M21 12a9 9 0 1 1-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {label ? <span className="sr-only">{label}</span> : null}
        </span>
    );
}

export { Spinner, spinnerVariants };
export type { SpinnerProps };
