import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@rax-ds/ui';

export default function AvatarGroupExample() {
    return (
        <AvatarGroup>
            <Avatar>
                <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <Avatar>
                <AvatarFallback>SK</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
    );
}
