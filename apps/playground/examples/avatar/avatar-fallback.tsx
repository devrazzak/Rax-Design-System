import { Avatar, AvatarFallback, AvatarImage } from '@rax-ds/ui';

export default function AvatarFallbackExample() {
    return (
        <Avatar>
            {/* The image fails to load, so the fallback shows */}
            <AvatarImage src="/missing-photo.png" alt="Jordan Lee" />
            <AvatarFallback>JL</AvatarFallback>
        </Avatar>
    );
}
