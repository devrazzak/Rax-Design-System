import type { ComponentProps } from 'react';

/**
 * Base for every icon. Size comes from the surrounding font size (1em) and no `size-*` class is added,
 * so parent rules like `[&_svg:not([class*='size-'])]:size-4` can still size it.
 */
function Icon({ children, ...props }: ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            data-slot="icon"
            {...props}
        >
            {children}
        </svg>
    );
}

export { Icon };
