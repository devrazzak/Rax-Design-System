import { Avatar, AvatarBadge, AvatarFallback, Row } from '@rax-ds/ui';

export default function AvatarWithBadge() {
    return (
        <Row gap="md" wrap justify="center">
            <Avatar size="md">
                <AvatarFallback>AM</AvatarFallback>
                <AvatarBadge role="img" aria-label="Online" />
            </Avatar>
            <Avatar size="xl">
                <AvatarFallback>JL</AvatarFallback>
                <AvatarBadge role="img" aria-label="Online" />
            </Avatar>
        </Row>
    );
}
