import type { ComponentProps } from 'react';

import { Icon } from './icon';

function SearchIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </Icon>
    );
}

export { SearchIcon };
