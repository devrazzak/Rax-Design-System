import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { Label } from '@/components/label/label';

import { defaultOrientation, orientationClasses } from './field.variants';

type FieldProps = ComponentProps<'div'> & {
    orientation?: keyof typeof orientationClasses;
};

/** One control with its label, hint and error. Set `data-invalid` to turn the label red. */
function Field({ orientation = defaultOrientation, className, ...props }: FieldProps) {
    return (
        <div
            data-slot="field"
            data-orientation={orientation}
            className={cn(
                'flex w-full gap-2 data-[invalid=true]:text-destructive',
                orientationClasses[orientation],
                className,
            )}
            {...props}
        />
    );
}

/** Stacks the label and the hint next to a horizontal control. */
function FieldContent({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="field-content" className={cn('flex flex-1 flex-col gap-0.5', className)} {...props} />;
}

function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) {
    return <Label data-slot="field-label" className={cn('leading-snug', className)} {...props} />;
}

function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
    return <p data-slot="field-description" className={cn('text-sm text-muted-foreground', className)} {...props} />;
}

/** Renders nothing when it has no children, so it can always stay in the markup. */
function FieldError({ className, children, ...props }: ComponentProps<'div'>) {
    if (!children) {
        return null;
    }

    return (
        <div role="alert" data-slot="field-error" className={cn('text-sm text-destructive', className)} {...props}>
            {children}
        </div>
    );
}

/** Spaces several fields apart. */
function FieldGroup({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="field-group" className={cn('flex w-full flex-col gap-5', className)} {...props} />;
}

/** Wraps related controls, such as a radio group, so screen readers announce the legend first. */
function FieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
    return <fieldset data-slot="field-set" className={cn('flex flex-col gap-3', className)} {...props} />;
}

function FieldLegend({ className, ...props }: ComponentProps<'legend'>) {
    return <legend data-slot="field-legend" className={cn('mb-1.5 font-medium', className)} {...props} />;
}

export { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet };
export type { FieldProps };
