import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar, AvatarFallback } from '@/components/avatar/avatar';
import { Badge } from '@/components/badge/badge';
import { Button } from '@/components/button/button';
import { Input } from '@/components/input/input';
import { Label } from '@/components/label/label';

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { CARD_PADDINGS, CARD_RADII } from './card.variants';

const meta = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        padding: { control: 'inline-radio', options: CARD_PADDINGS },
        radius: { control: 'inline-radio', options: CARD_RADII },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* stories */
export const Default: Story = {
    render: args => (
        <Card {...args} className="w-96">
            <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
                <CardAction>
                    <Button variant="outline" size="sm">
                        Sign up
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="mt-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="card-email">Email</Label>
                    <Input id="card-email" type="email" placeholder="m@example.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="card-password">Password</Label>
                    <Input id="card-password" type="password" />
                </div>
            </CardContent>
            <CardFooter className="mt-4 flex-col gap-2">
                <Button className="w-full">Login</Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </CardFooter>
        </Card>
    ),
};

/** `padding` sets the space inside the card. Text size and the space between parts are up to the content. */
export const Padding: Story = {
    render: args => (
        <div className="flex flex-wrap items-start gap-4">
            {CARD_PADDINGS.map(padding => (
                <Card key={padding} {...args} padding={padding} className="w-72">
                    <CardHeader>
                        <CardTitle>Monthly report</CardTitle>
                        <CardDescription>Padding {padding}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-4">
                        Revenue grew by 12% compared to last month, driven by new sign-ups.
                    </CardContent>
                    <CardFooter className="mt-4 justify-between">
                        <span className="text-sm text-muted-foreground">Updated today</span>
                        <Button size="sm" variant="outline">
                            View
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    ),
};

/** The default radius is `xl` (16px). Pick a smaller one for denser layouts. */
export const Radius: Story = {
    render: args => (
        <div className="flex flex-wrap items-start gap-4">
            {CARD_RADII.map(radius => (
                <Card key={radius} {...args} radius={radius} className="w-72">
                    <CardHeader>
                        <CardTitle>Upcoming event</CardTitle>
                        <CardDescription>Radius {radius}</CardDescription>
                        <CardAction>
                            <Badge variant="secondary">New</Badge>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="mt-4">
                        Join the community meetup this Saturday and meet other members.
                    </CardContent>
                    <CardFooter className="mt-4 justify-end">
                        <Button size="sm">Register</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    ),
};

/** `CardAction` sits in the top-right corner of the header. */
export const WithAction: Story = {
    render: args => (
        <Card {...args} className="w-96">
            <CardHeader>
                <CardTitle>Team members</CardTitle>
                <CardDescription>Invite your team to collaborate</CardDescription>
                <CardAction>
                    <Badge variant="secondary">3 active</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="mt-4 flex flex-col gap-4">
                {[
                    ['Abdur Razzak', 'Owner', 'AR'],
                    ['Sadia Rahman', 'Editor', 'SR'],
                    ['Tanvir Hasan', 'Viewer', 'TH'],
                ].map(([name, role, initials]) => (
                    <div key={name} className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-medium">{name}</span>
                            <span className="text-sm text-muted-foreground">{role}</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    ),
};

/** The footer sits flush with the bottom edge, on a muted background. */
export const WithFooter: Story = {
    render: args => (
        <Card {...args} className="w-96">
            <CardHeader>
                <CardTitle>Delete project</CardTitle>
                <CardDescription>This removes every file in the project</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">You can restore it from the trash within 30 days.</CardContent>
            <CardFooter className="mt-4 justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete</Button>
            </CardFooter>
        </Card>
    ),
};

/** An image as the first child sits flush with the top edge. */
export const WithImage: Story = {
    render: args => (
        <Card {...args} className="w-96">
            <img
                alt="Community event"
                className="aspect-video w-full object-cover"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%2394a3b8'/%3E%3C/svg%3E"
            />
            <CardHeader className="mt-4">
                <CardTitle>Annual community meetup</CardTitle>
                <CardDescription>Saturday, 10 AM - Dhaka</CardDescription>
                <CardAction>
                    <Badge>Ongoing</Badge>
                </CardAction>
            </CardHeader>
            <CardContent className="mt-4">
                Join us for a full day of talks, workshops and good food with the community.
            </CardContent>
            <CardFooter className="mt-4 justify-between">
                <span className="text-sm text-muted-foreground">120 going</span>
                <Button size="sm">Join event</Button>
            </CardFooter>
        </Card>
    ),
};
