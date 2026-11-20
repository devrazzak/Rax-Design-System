import { Textarea } from '@rax-ds/ui';

export default function TextareaDisabled() {
    return <Textarea disabled placeholder="Write a note" aria-label="Note" className="w-full max-w-sm" />;
}
