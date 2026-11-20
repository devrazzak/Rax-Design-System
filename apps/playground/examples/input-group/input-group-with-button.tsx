import { InputGroup, InputGroupButton, InputGroupInput } from '@rax-ds/ui';

export default function InputGroupWithButton() {
    return (
        <InputGroup className="w-full max-w-sm">
            <InputGroupInput defaultValue="https://example.com/invite/abc123" readOnly aria-label="Invite link" />
            <InputGroupButton>Copy</InputGroupButton>
        </InputGroup>
    );
}
