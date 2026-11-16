import type { ComponentProps } from 'react';

import { Icon } from './icon';

function EllipsisIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M5 12h.01M12 12h.01M19 12h.01" />
        </Icon>
    );
}

export { EllipsisIcon };
