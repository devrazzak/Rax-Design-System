import type { ComponentType } from 'react';

/**
 * Every live example, by name. The name is the file path under `examples/` without `.tsx`,
 * so the preview and the code shown next to it always come from the same file.
 * Bundlers need static import paths, which is why each example is listed here by hand.
 */
export const examples = {
    'button/button-as-child': () => import('./button/button-as-child'),
    'button/button-demo': () => import('./button/button-demo'),
    'button/button-disabled': () => import('./button/button-disabled'),
    'button/button-loading': () => import('./button/button-loading'),
    'button/button-on-color': () => import('./button/button-on-color'),
    'button/button-sizes': () => import('./button/button-sizes'),
    'button/button-variants': () => import('./button/button-variants'),
    'button/button-with-icon': () => import('./button/button-with-icon'),
    'theming/scoped-brand-color': () => import('./theming/scoped-brand-color'),
    'typography/heading-sizes': () => import('./typography/heading-sizes'),
    'typography/text-sizes': () => import('./typography/text-sizes'),
} satisfies Record<string, () => Promise<{ default: ComponentType }>>;

export type ExampleName = keyof typeof examples;

export function isExampleName(name: string): name is ExampleName {
    return Object.hasOwn(examples, name);
}
