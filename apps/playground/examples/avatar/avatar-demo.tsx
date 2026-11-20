import { Avatar, AvatarFallback, AvatarImage } from '@rax-ds/ui';

// A small inline image, so the example works without a network
const photo =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%2394a3b8'/><circle cx='32' cy='24' r='12' fill='white'/><circle cx='32' cy='64' r='22' fill='white'/></svg>";

export default function AvatarDemo() {
    return (
        <Avatar>
            <AvatarImage src={photo} alt="Alex Morgan" />
            <AvatarFallback>AM</AvatarFallback>
        </Avatar>
    );
}
