import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@rax-ds/ui';

export default function ToggleGroupMultiple() {
    return (
        <ToggleGroup type="multiple" defaultValue={['bold']} aria-label="Text formatting">
            <ToggleGroupItem value="bold" aria-label="Bold">
                <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
                <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
                <UnderlineIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
