import type { ComponentProps } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

import { defaultVariants, variantClasses } from './alert.variants';

const alertVariants = cva(
    "group/alert relative grid w-full gap-0.5 rounded-md border px-4 py-3 text-left text-sm has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-3 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg:not([class*='size-'])]:size-4",
    {
        variants: {
            variant: variantClasses,
        },
        defaultVariants,
    },
);

type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>;

function Alert({ className, variant = defaultVariants.variant, ...props }: AlertProps) {
    return (
        <div
            data-slot="alert"
            data-variant={variant}
            role="alert"
            className={cn(alertVariants({ variant }), className)}
            {...props}
        />
    );
}

function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-title"
            className={cn(
                'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
                className,
            )}
            {...props}
        />
    );
}

function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-description"
            className={cn(
                'text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
                className,
            )}
            {...props}
        />
    );
}

/** Sits in the top-right corner of the alert, e.g. a close button. */
function AlertAction({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="alert-action" className={cn('absolute top-3 right-3', className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants };
export type { AlertProps };
