import { Checkbox, Label, Row } from '@rax-ds/ui';

export default function LabelDisabled() {
    return (
        <Row gap="sm">
            <Checkbox id="label-disabled-terms" disabled />
            <Label htmlFor="label-disabled-terms">Accept terms and conditions</Label>
        </Row>
    );
}
