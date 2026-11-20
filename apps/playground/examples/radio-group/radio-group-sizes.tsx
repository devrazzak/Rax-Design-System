import { RadioGroup, RadioGroupItem, Row } from '@rax-ds/ui';

export default function RadioGroupSizes() {
    return (
        <RadioGroup defaultValue="md" orientation="horizontal" aria-label="Sizes">
            <Row gap="md" wrap>
                <RadioGroupItem value="sm" size="sm" aria-label="Small" />
                <RadioGroupItem value="md" size="md" aria-label="Medium" />
                <RadioGroupItem value="lg" size="lg" aria-label="Large" />
                <RadioGroupItem value="xl" size="xl" aria-label="Extra large" />
            </Row>
        </RadioGroup>
    );
}
