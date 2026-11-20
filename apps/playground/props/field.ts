import type { PropDef } from '@/types/docs';

export const fieldProps = [
    {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description:
            'vertical puts the label above the control. horizontal puts them side by side, for checkboxes, radios and switches.',
    },
    {
        name: 'data-invalid',
        type: 'boolean',
        description: 'Set it to true to turn the text of the field red, for example the label.',
    },
] as const satisfies readonly PropDef[];

export const fieldLabelProps = [
    {
        name: 'htmlFor',
        type: 'string',
        description: 'The id of the control. Field does not connect them for you.',
    },
    {
        name: 'size',
        type: "'sm' | 'md'",
        default: "'md'",
        description: 'The font size, as on Label.',
    },
] as const satisfies readonly PropDef[];
