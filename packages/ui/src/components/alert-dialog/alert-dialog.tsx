import type { ComponentProps } from 'react';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import type { ButtonProps } from '@/components/button/button';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/button/button';

import { defaultSize, sizeClasses } from './alert-dialog.variants';

// Root renders no element of its own, so there is nothing to wrap
const AlertDialog = AlertDialogPrimitive.Root;

function AlertDialogTrigger(props: ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
    return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal(props: ComponentProps<typeof AlertDialogPrimitive.Portal>) {
    return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

function AlertDialogOverlay({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
    return (
        <AlertDialogPrimitive.Overlay
            data-slot="alert-dialog-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-overlay data-[state=closed]:motion-safe:animate-fade-out data-[state=open]:motion-safe:animate-fade-in',
                className,
            )}
            {...props}
        />
    );
}

type AlertDialogContentProps = ComponentProps<typeof AlertDialogPrimitive.Content> & {
    /** Width of the alert dialog. */
    size?: keyof typeof sizeClasses;
};

function AlertDialogContent({ size = defaultSize, className, ...props }: AlertDialogContentProps) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />
            <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                className={cn(
                    'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-md border border-border bg-popover p-6 text-base text-popover-foreground outline-none data-[state=closed]:motion-safe:animate-zoom-out data-[state=open]:motion-safe:animate-zoom-in',
                    sizeClasses[size],
                    className,
                )}
                {...props}
            />
        </AlertDialogPortal>
    );
}

function AlertDialogHeader({ className, ...props }: ComponentProps<'div'>) {
    return <div data-slot="alert-dialog-header" className={cn('flex flex-col gap-2', className)} {...props} />;
}

function AlertDialogFooter({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-dialog-footer"
            className={cn(
                '-mx-6 -mb-6 flex flex-col-reverse gap-2 rounded-b-md border-t border-border bg-muted p-4 sm:flex-row sm:justify-end',
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogTitle({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn('text-lg font-semibold', className)}
            {...props}
        />
    );
}

function AlertDialogDescription({ className, ...props }: ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
}

type AlertDialogButtonProps = Pick<ButtonProps, 'variant' | 'size'>;

/** Confirms the action and closes the dialog. Pass `variant="destructive"` when the action deletes something. */
function AlertDialogAction({
    variant,
    size,
    ...props
}: ComponentProps<typeof AlertDialogPrimitive.Action> & AlertDialogButtonProps) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Action data-slot="alert-dialog-action" {...props} />
        </Button>
    );
}

/** Closes the dialog without doing anything. It also receives focus when the dialog opens. */
function AlertDialogCancel({
    variant = 'outline',
    size,
    ...props
}: ComponentProps<typeof AlertDialogPrimitive.Cancel> & AlertDialogButtonProps) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Cancel data-slot="alert-dialog-cancel" {...props} />
        </Button>
    );
}

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
};
export type { AlertDialogContentProps };
