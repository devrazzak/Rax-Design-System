/**
 * Token names shown on the Foundations pages. Values are not copied here: swatches read the live
 * CSS variables, so they always show the current theme. When a token is added to @rax-ds/tokens, add its name here.
 */
export const colorTokens = {
    base: [
        'background',
        'foreground',
        'card',
        'card-foreground',
        'popover',
        'popover-foreground',
        'border',
        'input',
        'ring',
        'overlay',
    ],
    brand: [
        'primary',
        'primary-hover',
        'primary-outline-hover',
        'primary-foreground',
        'secondary',
        'secondary-hover',
        'secondary-foreground',
        'link',
        'link-hover',
    ],
    neutral: ['muted', 'muted-foreground', 'accent', 'accent-foreground', 'skeleton'],
    status: [
        'destructive',
        'destructive-foreground',
        'destructive-subtle',
        'destructive-subtle-hover',
        'destructive-subtle-foreground',
        'info',
        'info-subtle',
        'info-subtle-foreground',
        'warning',
        'warning-subtle',
        'warning-subtle-foreground',
    ],
} as const;

export type ColorTokenGroup = keyof typeof colorTokens;

export const radiusTokens = [
    { name: 'none', value: '0' },
    { name: 'sm', value: '4px' },
    { name: 'md', value: '8px' },
    { name: 'lg', value: '12px' },
    { name: 'xl', value: '16px' },
    { name: '2xl', value: '20px' },
    { name: 'full', value: '9999px' },
] as const;
