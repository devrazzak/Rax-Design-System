import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@rax-ds/ui';

// A small inline image, so the example works without a network
const photo =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%2394a3b8'/><circle cx='32' cy='24' r='12' fill='white'/><circle cx='32' cy='64' r='22' fill='white'/></svg>";

export default function CardWithImage() {
    return (
        <Card className="w-full max-w-sm">
            {/* A native img, because the design system has no image component. The card removes its top padding for it. */}
            <img src={photo} alt="Team members at the offsite" className="h-40 w-full object-cover" />
            <CardHeader>
                <CardTitle>Team offsite</CardTitle>
                <CardDescription>Photos from the last team trip.</CardDescription>
            </CardHeader>
            <CardContent>24 photos added.</CardContent>
        </Card>
    );
}
