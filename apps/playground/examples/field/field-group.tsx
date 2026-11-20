import { Button, Field, FieldGroup, FieldLabel, Input, Textarea } from '@rax-ds/ui';

export default function FieldGroupExample() {
    return (
        <FieldGroup className="w-full max-w-sm">
            <Field>
                <FieldLabel htmlFor="field-group-name">Name</FieldLabel>
                <Input id="field-group-name" placeholder="Your name" />
            </Field>
            <Field>
                <FieldLabel htmlFor="field-group-email">Email</FieldLabel>
                <Input id="field-group-email" type="email" placeholder="name@example.com" />
            </Field>
            <Field>
                <FieldLabel htmlFor="field-group-message">Message</FieldLabel>
                <Textarea id="field-group-message" placeholder="How can we help?" />
            </Field>
            <Button type="submit">Send</Button>
        </FieldGroup>
    );
}
