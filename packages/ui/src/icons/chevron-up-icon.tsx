import type { ComponentProps } from 'react';

import { Icon } from './icon';

function ChevronUpIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M6 15l6-6 6 6" />
        </Icon>
    );
}

export { ChevronUpIcon };
