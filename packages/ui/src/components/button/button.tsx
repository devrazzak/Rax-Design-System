import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
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

export type ButtonProps = ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        /** Render the child element instead of a <button>, e.g. a Next.js <Link>. */
        asChild?: boolean;
    };

export function Button({ className, variant, size, asChild = false, type, ...props }: ButtonProps) {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (asChild) {
        return <Slot.Root data-slot="button" className={classes} {...props} />;
    }

    // The native default is type="submit", which causes accidental form submissions
    return <button type={type ?? 'button'} data-slot="button" className={classes} {...props} />;
}
