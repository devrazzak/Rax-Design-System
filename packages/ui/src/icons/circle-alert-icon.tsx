import type { ComponentProps } from 'react';

import { Icon } from './icon';

function CircleAlertIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
        </Icon>
    );
}

export { CircleAlertIcon };
