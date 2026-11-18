'use client';

import type { ComponentProps } from 'react';

import { ChevronDownIcon } from '@/icons';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils/cn';

import { defaultSize, sizeClasses } from './accordion.variants';

type AccordionProps = ComponentProps<typeof AccordionPrimitive.Root> & {
    /** Trigger height and text size of every item. Matches the Input sizes. */
    size?: keyof typeof sizeClasses;
};

function Accordion({ size = defaultSize, className, ...props }: AccordionProps) {
    return (
        <AccordionPrimitive.Root
            data-slot="accordion"
            className={cn('flex w-full flex-col gap-2', sizeClasses[size], className)}
            {...props}
        />
    );
}

function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn('rounded-md border border-border bg-card text-card-foreground', className)}
            {...props}
        />
    );
}

function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header data-slot="accordion-header" className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    'group/accordion-trigger flex flex-1 cursor-pointer items-center justify-between gap-4 rounded-md px-4 py-2 text-left font-semibold transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
                    className,
                )}
                {...props}
            >
                {children}
                <ChevronDownIcon
                    data-slot="accordion-trigger-icon"
                    className="pointer-events-none shrink-0 text-muted-foreground transition-transform group-data-[state=open]/accordion-trigger:rotate-180 motion-safe:duration-200"
                />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

/** The className goes on the inner box, because the outer one is the part that animates its height. */
function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="overflow-hidden data-[state=closed]:motion-safe:animate-accordion-up data-[state=open]:motion-safe:animate-accordion-down"
            {...props}
        >
            <div className={cn('px-4 pb-4', className)}>{children}</div>
        </AccordionPrimitive.Content>
    );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
export type { AccordionProps };
