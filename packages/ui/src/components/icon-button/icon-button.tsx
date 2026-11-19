import type { ButtonProps } from '@/components/button/button';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/button/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/tooltip/tooltip';

import { defaultRounded, defaultSize, roundedClasses, sizeClasses } from './icon-button.variants';

type IconButtonProps = Omit<ButtonProps, 'asChild' | 'aria-label' | 'size'> & {
    /** Accessible name and tooltip text. Required, because an icon alone has no name. */
    label: string;
    /** Shows the label in a tooltip on hover and focus. The tooltip needs a `TooltipProvider` above it. */
    tooltip?: boolean;
    size?: keyof typeof sizeClasses;
    rounded?: keyof typeof roundedClasses;
};

function IconButton({
    label,
    tooltip = true,
    size = defaultSize,
    rounded = defaultRounded,
    className,
    ...props
}: IconButtonProps) {
    const button = (
        <Button
            data-slot="icon-button"
            aria-label={label}
            size={size}
            className={cn(sizeClasses[size], roundedClasses[rounded], className)}
            {...props}
        />
    );

    if (!tooltip) return button;

    return (
        <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
    );
}

export { IconButton };
export type { IconButtonProps };
