'use client';

import type { ComponentProps, MouseEvent } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/cn';

export const buttonVariants = cva(
    [
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    ],
    {
        variants: {
            variant: {
                primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                // Outline style on purpose: primary is also red, so a solid red button would look identical
                destructive:
                    'border border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground',
            },
            size: {
                sm: 'h-8 px-3 text-xs',
                md: 'h-9 px-4',
                lg: 'h-10 px-6',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

type ButtonBaseProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

type NativeButtonProps = ButtonBaseProps & {
    asChild?: false;
    /** Shows a spinner, blocks clicks and form submission, and keeps keyboard focus. */
    loading?: boolean;
};

type AsChildButtonProps = ButtonBaseProps & {
    /** Render the child element instead of a <button>, e.g. a Next.js <Link>. */
    asChild: true;
    /** Not supported with asChild: links and custom elements cannot be put into a busy state. */
    loading?: never;
};

export type ButtonProps = NativeButtonProps | AsChildButtonProps;

function Spinner({ className }: { className?: string }) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={cn('animate-spin', className)}>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" className="opacity-75" />
        </svg>
    );
}

export function Button(props: ButtonProps) {
    if (props.asChild) {
        const { asChild: _asChild, loading: _loading, className, variant, size, ...rest } = props;
        return <Slot.Root data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...rest} />;
    }

    const { asChild: _asChild, loading = false, className, variant, size, type, onClick, children, ...rest } = props;

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (loading) {
            // Stops both the click handler and form submission while busy
            event.preventDefault();
            return;
        }
        onClick?.(event);
    };

    return (
        <button
            // The native default is type="submit", which causes accidental form submissions
            type={type ?? 'button'}
            data-slot="button"
            data-loading={loading || undefined}
            aria-busy={loading || undefined}
            aria-disabled={loading || undefined}
            onClick={handleClick}
            className={cn(buttonVariants({ variant, size }), loading && 'relative cursor-wait', className)}
            {...rest}
        >
            {loading ? (
                <>
                    {/* Keeps the original width so the layout does not jump */}
                    <span className="inline-flex items-center justify-center gap-2 opacity-0">{children}</span>
                    <Spinner className="absolute inset-0 m-auto" />
                </>
            ) : (
                children
            )}
        </button>
    );
}
