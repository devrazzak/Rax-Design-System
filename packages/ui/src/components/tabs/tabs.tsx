import type { ComponentProps } from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultVariants, sizeClasses, variantClasses } from './tabs.variants';

type TabsProps = ComponentProps<typeof TabsPrimitive.Root>;

// Radix sets `data-orientation` on the root only, so the other parts read it through the `tabs` group.
// A tab is `flex-1` to share the width when horizontal, but `flex-none` when vertical, or its height would be ignored.
function Tabs({ className, ...props }: TabsProps) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('group/tabs flex gap-2 data-[orientation=horizontal]:flex-col', className)}
            {...props}
        />
    );
}

const tabsListVariants = cva(
    'group/tabs-list inline-flex w-fit items-center justify-center rounded-md group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col',
    {
        variants: {
            variant: variantClasses,
            size: sizeClasses,
        },
        defaultVariants,
    },
);

type TabsListProps = ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>;

function TabsList({
    className,
    variant = defaultVariants.variant,
    size = defaultVariants.size,
    ...props
}: TabsListProps) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            data-variant={variant}
            data-size={size}
            className={cn(tabsListVariants({ variant, size }), className)}
            {...props}
        />
    );
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "relative inline-flex h-(--tabs-trigger-height) flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-4 font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:flex-none group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                'group-data-[variant=default]/tabs-list:data-[state=active]:bg-card group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm',
                'after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-0 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:right-0 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100',
                className,
            )}
            {...props}
        />
    );
}

// The panel can be reached with the keyboard, so it keeps a visible focus outline
function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn(
                'flex-1 rounded-md outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                className,
            )}
            {...props}
        />
    );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
export type { TabsProps, TabsListProps };
