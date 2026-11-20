import { Badge, Section } from '@rax-ds/ui';

export default function BadgeOnColor() {
    return (
        <Section tone="foreground" className="rounded-md p-8">
            <Badge variant="white">Featured</Badge>
        </Section>
    );
}
