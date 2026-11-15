import type { ComponentProps } from 'react';

import { Icon } from './icon';

function ChevronDownIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M6 9l6 6 6-6" />
        </Icon>
    );
}

export { ChevronDownIcon };
