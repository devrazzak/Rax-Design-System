import type { ComponentProps } from 'react';

import { Icon } from './icon';

function MinusIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M5 12h14" />
        </Icon>
    );
}

export { MinusIcon };
