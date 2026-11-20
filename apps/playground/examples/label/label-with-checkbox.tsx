import { Checkbox, Label, Row } from '@rax-ds/ui';

export default function LabelWithCheckbox() {
    return (
        <Row gap="sm">
            <Checkbox id="label-with-checkbox-terms" />
            <Label htmlFor="label-with-checkbox-terms">Accept terms and conditions</Label>
        </Row>
    );
}
