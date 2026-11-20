import { Avatar, AvatarFallback, Row } from '@rax-ds/ui';

export default function AvatarSizes() {
    return (
        <Row gap="md" wrap justify="center">
            <Avatar size="sm">
                <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar size="md">
                <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
                <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
                <AvatarFallback>AM</AvatarFallback>
            </Avatar>
        </Row>
    );
}
