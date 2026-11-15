import type { ComponentProps } from 'react';

import { Icon } from './icon';

function CheckIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M5 12l5 5L20 7" />
        </Icon>
    );
}

export { CheckIcon };
