import { Textarea } from '@rax-ds/ui';

export default function TextareaAutoGrow() {
    return (
        <Textarea
            aria-label="Notes"
            className="w-full max-w-sm"
            defaultValue={
                'Order 1042 shipped on Monday.\nOrder 1041 is waiting for payment.\nOrder 1040 was returned.\nOrder 1039 shipped on Friday.\nOrder 1038 was delivered.'
            }
        />
    );
}
