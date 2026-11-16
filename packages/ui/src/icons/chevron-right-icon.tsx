import type { ComponentProps } from 'react';

import { Icon } from './icon';

function ChevronRightIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M9 6l6 6-6 6" />
        </Icon>
    );
}

export { ChevronRightIcon };
