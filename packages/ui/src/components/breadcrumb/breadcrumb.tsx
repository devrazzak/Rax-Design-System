import type { ComponentProps } from 'react';

import { ChevronRightIcon, EllipsisIcon } from '@/icons';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './breadcrumb.variants';

type BreadcrumbProps = ComponentProps<'nav'> & {
    /** Text size of the whole trail. */
    size?: keyof typeof sizeClasses;
};

function Breadcrumb({ className, size = defaultSize, ...props }: BreadcrumbProps) {
    return (
        <nav
            aria-label="breadcrumb"
            data-slot="breadcrumb"
            data-size={size}
            className={cn(sizeClasses[size], className)}
            {...props}
        />
    );
}

function BreadcrumbList({ className, ...props }: ComponentProps<'ol'>) {
    return (
        <ol
            data-slot="breadcrumb-list"
            className={cn('flex flex-wrap items-center gap-1.5 wrap-break-word text-muted-foreground', className)}
            {...props}
        />
    );
}

function BreadcrumbItem({ className, ...props }: ComponentProps<'li'>) {
    return <li data-slot="breadcrumb-item" className={cn('inline-flex items-center gap-1', className)} {...props} />;
}

function BreadcrumbLink({
    asChild,
    className,
    ...props
}: ComponentProps<'a'> & {
    /** Render the child element instead of an <a>, e.g. a Next.js <Link>. */
    asChild?: boolean;
}) {
    const Comp = asChild ? Slot.Root : 'a';

    return (
        <Comp
            data-slot="breadcrumb-link"
            className={cn('transition-colors hover:text-foreground', className)}
            {...props}
        />
    );
}

function BreadcrumbPage({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-page"
            role="link"
            aria-disabled="true"
            aria-current="page"
            className={cn('font-normal text-foreground', className)}
            {...props}
        />
    );
}

function BreadcrumbSeparator({ children, className, ...props }: ComponentProps<'li'>) {
    return (
        <li
            data-slot="breadcrumb-separator"
            role="presentation"
            aria-hidden="true"
            className={cn(className)}
            {...props}
        >
            {children ?? <ChevronRightIcon />}
        </li>
    );
}

function BreadcrumbEllipsis({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span
            data-slot="breadcrumb-ellipsis"
            role="presentation"
            aria-hidden="true"
            className={cn('flex items-center justify-center', className)}
            {...props}
        >
            <EllipsisIcon />
            <span className="sr-only">More</span>
        </span>
    );
}

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
export type { BreadcrumbProps };
