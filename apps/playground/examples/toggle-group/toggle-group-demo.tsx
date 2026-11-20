import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupDemo() {
    return (
        <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
            <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRightIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
