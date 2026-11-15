import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/button/button';

import { defaultSize, sizeClasses } from './input-group.variants';

type InputGroupProps = ComponentProps<'div'> & {
    size?: keyof typeof sizeClasses;
};

/** One field box that holds an input with icons, text or buttons beside it. The box owns the border and focus. */
function InputGroup({ size = defaultSize, className, ...props }: InputGroupProps) {
    return (
        <div
            data-slot="input-group"
            className={cn(
                'flex w-full min-w-0 items-center gap-2 rounded-md border border-input transition-colors has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[input:focus-visible]:not-has-[input[aria-invalid=true]]:border-ring has-[input[aria-invalid=true]]:border-destructive',
                sizeClasses[size],
                className,
            )}
            {...props}
        />
    );
}

/** An icon or short text such as "https://". Its side depends on where it sits next to the input. */
function InputGroupAddon({ className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            data-slot="input-group-addon"
            className={cn('flex shrink-0 items-center gap-2 text-muted-foreground select-none', className)}
            {...props}
        />
    );
}

function InputGroupInput({ className, ...props }: ComponentProps<'input'>) {
    return (
        <input
            data-slot="input-group-input"
            className={cn(
                'h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed',
                className,
            )}
            {...props}
        />
    );
}

function InputGroupButton({
    type = 'button',
    variant = 'ghost',
    size = 'xs',
    ...props
}: ComponentProps<typeof Button>) {
    return <Button data-slot="input-group-button" type={type} variant={variant} size={size} {...props} />;
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput };
export type { InputGroupProps };
