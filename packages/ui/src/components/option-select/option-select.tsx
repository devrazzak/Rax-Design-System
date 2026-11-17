import type { ComponentProps } from 'react';

import type { SelectTriggerProps } from '@/components/select/select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select/select';

interface OptionSelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

type OptionSelectProps = Omit<ComponentProps<typeof Select>, 'children'> &
    Pick<
        SelectTriggerProps,
        'size' | 'className' | 'id' | 'aria-invalid' | 'aria-label' | 'aria-labelledby' | 'aria-describedby'
    > & {
        options: OptionSelectOption[];
        placeholder?: string;
    };

/** A Select built from an `options` array. Use the Select parts directly for groups or custom items. */
function OptionSelect({
    options,
    placeholder,
    size,
    className,
    id,
    'aria-invalid': ariaInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...props
}: OptionSelectProps) {
    return (
        <Select {...props}>
            <SelectTrigger
                size={size}
                className={className}
                id={id}
                aria-invalid={ariaInvalid}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledby}
                aria-describedby={ariaDescribedby}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export { OptionSelect };
export type { OptionSelectOption, OptionSelectProps };
