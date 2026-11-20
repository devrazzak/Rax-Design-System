import type { PropDef } from '@/types/docs';

export const inputOtpProps = [
    {
        name: 'maxLength',
        type: 'number',
        description: 'Required. The number of characters in the code. It should match the number of slots.',
    },
    {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl'",
        default: "'md'",
        description: 'Slot size and font size: 40px, 48px, 56px and 64px.',
    },
    {
        name: 'value',
        type: 'string',
        description: 'The code, for controlled usage. Use it with onChange.',
    },
    {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Called with the new code on every change.',
    },
    {
        name: 'onComplete',
        type: '(...args: any[]) => void',
        description: 'Called when every slot is filled.',
    },
    {
        name: 'pattern',
        type: 'string',
        description:
            'A regular expression every character must match. Use REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS or REGEXP_ONLY_DIGITS_AND_CHARS.',
    },
    {
        name: 'pasteTransformer',
        type: '(pasted: string) => string',
        description: 'Changes pasted text before it is used, for example to remove dashes.',
    },
    {
        name: 'pushPasswordManagerStrategy',
        type: "'increase-width' | 'none'",
        description: 'How the input makes room for password manager badges.',
    },
    {
        name: 'containerClassName',
        type: 'string',
        description: 'Class names for the wrapper around the slots. className goes to the hidden input.',
    },
    {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Prevents input and dims the slots.',
    },
] as const satisfies readonly PropDef[];

export const inputOtpSlotProps = [
    {
        name: 'index',
        type: 'number',
        description: 'Required. The position of the character this slot shows, starting at 0.',
    },
] as const satisfies readonly PropDef[];
