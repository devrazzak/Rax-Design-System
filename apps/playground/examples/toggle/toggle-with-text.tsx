import { BookmarkIcon } from 'lucide-react';

import { Toggle } from '@rax-ds/ui';

export default function ToggleWithText() {
    return (
        <Toggle variant="outline">
            <BookmarkIcon />
            Bookmark
        </Toggle>
    );
}
