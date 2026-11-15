import type { ComponentProps } from 'react';

import { Icon } from './icon';

function XIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M18 6L6 18M6 6l12 12" />
        </Icon>
    );
}

export { XIcon };
