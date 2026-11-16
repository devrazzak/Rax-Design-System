import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';

import { defaultPadding, defaultRadius, paddingClasses, radiusClasses } from './card.variants';

type CardProps = ComponentProps<'div'> & {
    /** Padding of the whole card. */
    padding?: keyof typeof paddingClasses;
    /** Corner radius of the card. */
    radius?: keyof typeof radiusClasses;
};

function Card({ className, padding = defaultPadding, radius = defaultRadius, ...props }: CardProps) {
    return (
        <div
            data-slot="card"
            data-padding={padding}
            data-radius={radius}
            className={cn(
                'flex flex-col overflow-hidden border border-border bg-card py-(--card-spacing) text-card-foreground has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0',
                radiusClasses[radius],
                paddingClasses[padding],
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                'grid auto-rows-min items-start gap-1 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)',
                className,
            )}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="card-title" className={cn('text-lg leading-snug font-semibold', className)} {...props} />;
}

function CardDescription({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="card-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

/** Sits in the top-right corner of the header, e.g. a button or a menu. */
function CardAction({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-action"
            className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-footer"
            className={cn('flex items-center border-t border-border p-(--card-spacing)', className)}
            {...props}
        />
    );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
export type { CardProps };
