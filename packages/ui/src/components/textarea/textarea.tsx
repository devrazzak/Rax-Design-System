import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils/cn';
import { fieldClasses } from '@/lib/utils/field-classes';

import { defaultSize, sizeClasses } from './textarea.variants';

type TextareaProps = ComponentProps<'textarea'> & {
    size?: keyof typeof sizeClasses;
};

function Textarea({ size = defaultSize, className, ...props }: TextareaProps) {
    return (
        <textarea
            data-slot="textarea"
            className={cn('field-sizing-content max-h-80', fieldClasses, sizeClasses[size], className)}
            {...props}
        />
    );
}

export { Textarea };
export type { TextareaProps };
