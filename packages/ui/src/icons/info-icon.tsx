import type { ComponentProps } from 'react';

import { Icon } from './icon';

function InfoIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
        </Icon>
    );
}

export { InfoIcon };
